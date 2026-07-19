import { NextResponse } from "next/server";
import { render } from "@react-email/render";
import { Resend } from "resend";
import { z } from "zod";

import {
  buildLeadNotificationText,
  LeadNotificationEmail,
  type LeadLocale,
  type LeadNotificationData,
} from "@/emails/lead-notification";
import { getConfiguredPublicOrigin } from "@/lib/site-url";

export const runtime = "nodejs";

const MAX_PAYLOAD_BYTES = 16_384;
const MIN_SUBMISSION_TIME_MS = 3_000;
const MAX_SUBMISSION_AGE_MS = 24 * 60 * 60 * 1_000;
const MAX_CLOCK_SKEW_MS = 60_000;
const projectTypeSchema = z.enum([
  "editorial-site",
  "product-frontend",
  "frontend-review",
  "other",
]);

const projectTypeLabels = {
  en: {
    "editorial-site": "Editorial or portfolio site",
    "product-frontend": "Product frontend",
    "frontend-review": "Frontend review or rescue",
    other: "Something else",
  },
  pt: {
    "editorial-site": "Site editorial ou portfólio",
    "product-frontend": "Frontend de produto",
    "frontend-review": "Revisão ou resgate frontend",
    other: "Outro contexto",
  },
} as const;

const optionalShortText = (maxLength: number) =>
  z.preprocess(
    (value) =>
      typeof value === "string" && value.trim() === "" ? undefined : value,
    z.string().trim().max(maxLength).optional(),
  );

const leadSchema = z
  .object({
    name: z.string().trim().min(2).max(100),
    email: z.string().trim().toLowerCase().email().max(254),
    company: optionalShortText(120),
    projectType: projectTypeSchema,
    budget: optionalShortText(80),
    message: z.string().trim().min(20).max(5_000),
    consent: z.literal(true),
    locale: z.enum(["en", "pt"]),
    website: z.string().max(500).optional().default(""),
    startedAt: z.number().int().positive(),
    submissionId: z.string().uuid(),
  })
  .strict();

type LeadPayload = z.infer<typeof leadSchema>;

type ApiCopy = {
  accepted: string;
  invalidContentType: string;
  invalidJson: string;
  invalidPayload: string;
  invalidOrigin: string;
  tooLarge: string;
  tooFast: string;
  expired: string;
  unavailable: string;
  sendFailed: string;
};

class PayloadTooLargeError extends Error {}

let resendClient: Resend | null = null;

function getCopy(locale: LeadLocale): ApiCopy {
  return locale === "pt"
    ? {
        accepted: "Recebemos seu contato. Obrigado por compartilhar o projeto.",
        invalidContentType: "Envie os dados no formato JSON.",
        invalidJson: "Não foi possível ler os dados enviados.",
        invalidPayload: "Revise os campos do formulário e tente novamente.",
        invalidOrigin: "Não foi possível validar a origem do envio.",
        tooLarge: "A mensagem excede o limite permitido.",
        tooFast: "Aguarde um instante antes de enviar o formulário.",
        expired: "O formulário expirou. Recarregue a página e tente novamente.",
        unavailable: "O envio está temporariamente indisponível.",
        sendFailed: "Não foi possível enviar agora. Tente novamente em instantes.",
      }
    : {
        accepted: "We received your inquiry. Thank you for sharing the project.",
        invalidContentType: "Send the form data as JSON.",
        invalidJson: "We could not read the submitted data.",
        invalidPayload: "Review the form fields and try again.",
        invalidOrigin: "We could not validate the request origin.",
        tooLarge: "The message exceeds the allowed size.",
        tooFast: "Wait a moment before submitting the form.",
        expired: "The form expired. Reload the page and try again.",
        unavailable: "Submission is temporarily unavailable.",
        sendFailed: "We could not send this now. Please try again shortly.",
      };
}

function inferLocale(request: Request, payload?: unknown): LeadLocale {
  if (
    payload &&
    typeof payload === "object" &&
    "locale" in payload &&
    (payload.locale === "en" || payload.locale === "pt")
  ) {
    return payload.locale;
  }

  return request.headers.get("accept-language")?.toLowerCase().startsWith("pt")
    ? "pt"
    : "en";
}

function jsonResponse(
  body: Record<string, unknown>,
  status: number,
  headers?: HeadersInit,
) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      ...headers,
    },
  });
}

function accepted(copy: ApiCopy) {
  return jsonResponse({ ok: true, message: copy.accepted }, 202);
}

function rejected(
  code: string,
  message: string,
  status: number,
  headers?: HeadersInit,
) {
  return jsonResponse({ ok: false, code, message }, status, headers);
}

async function readJsonWithinLimit(request: Request): Promise<unknown> {
  const contentLength = request.headers.get("content-length");

  if (contentLength && /^\d+$/.test(contentLength)) {
    const declaredBytes = Number(contentLength);

    if (Number.isSafeInteger(declaredBytes) && declaredBytes > MAX_PAYLOAD_BYTES) {
      throw new PayloadTooLargeError();
    }
  }

  if (!request.body) {
    throw new SyntaxError("Missing request body.");
  }

  const reader = request.body.getReader();
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let totalBytes = 0;
  let text = "";

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      totalBytes += value.byteLength;

      if (totalBytes > MAX_PAYLOAD_BYTES) {
        await reader.cancel();
        throw new PayloadTooLargeError();
      }

      text += decoder.decode(value, { stream: true });
    }

    text += decoder.decode();
  } finally {
    reader.releaseLock();
  }

  return JSON.parse(text) as unknown;
}

function isPlainRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isHoneypotFilled(payload: unknown): boolean {
  return (
    isPlainRecord(payload) &&
    typeof payload.website === "string" &&
    payload.website.trim().length > 0
  );
}

function validateOrigin(request: Request): "allowed" | "forbidden" | "misconfigured" {
  let configuredOrigin: string | null;

  try {
    configuredOrigin = getConfiguredPublicOrigin();
  } catch {
    return "misconfigured";
  }

  if (!configuredOrigin) {
    return process.env.NODE_ENV === "production"
      ? "misconfigured"
      : "allowed";
  }

  const requestOrigin = request.headers.get("origin");

  if (!requestOrigin) {
    return "forbidden";
  }

  try {
    return new URL(requestOrigin).origin === configuredOrigin
      ? "allowed"
      : "forbidden";
  } catch {
    return "forbidden";
  }
}

function getEmailConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();

  if (
    !apiKey ||
    !to ||
    !from ||
    /[\r\n]/.test(to) ||
    /[\r\n]/.test(from) ||
    !z.string().email().safeParse(to).success ||
    !isValidFromAddress(from)
  ) {
    return null;
  }

  if (!resendClient) {
    resendClient = new Resend(apiKey);
  }

  return { resend: resendClient, to, from };
}

function isValidFromAddress(value: string): boolean {
  if (z.string().email().safeParse(value).success) {
    return true;
  }

  const displayAddress = value.match(/^[^<>\r\n]{1,100}<([^<>\r\n]+)>$/);
  return Boolean(
    displayAddress &&
      z.string().email().safeParse(displayAddress[1].trim()).success,
  );
}

function toNotificationData(payload: LeadPayload): LeadNotificationData {
  return {
    name: payload.name,
    email: payload.email,
    company: payload.company,
    projectType: projectTypeLabels[payload.locale][payload.projectType],
    budget: payload.budget,
    message: payload.message,
    locale: payload.locale,
  };
}

function logDeliveryResult(
  result: "accepted" | "configuration_error" | "provider_error" | "exception",
  submissionId: string,
  durationMs: number,
  providerStatus?: number,
) {
  const entry = JSON.stringify({
    event: "lead_delivery",
    result,
    submissionId,
    durationMs,
    ...(providerStatus ? { providerStatus } : {}),
  });

  if (result === "accepted") {
    console.info(entry);
  } else {
    console.error(entry);
  }
}

export async function POST(request: Request) {
  const fallbackLocale = inferLocale(request);
  let copy = getCopy(fallbackLocale);

  const mediaType = request.headers
    .get("content-type")
    ?.split(";", 1)[0]
    .trim()
    .toLowerCase();

  if (mediaType !== "application/json") {
    return rejected("unsupported_media_type", copy.invalidContentType, 415);
  }

  const originResult = validateOrigin(request);

  if (originResult === "misconfigured") {
    return rejected("service_unavailable", copy.unavailable, 503);
  }

  if (originResult === "forbidden") {
    return rejected("invalid_origin", copy.invalidOrigin, 403);
  }

  let rawPayload: unknown;

  try {
    rawPayload = await readJsonWithinLimit(request);
  } catch (error) {
    if (error instanceof PayloadTooLargeError) {
      return rejected("payload_too_large", copy.tooLarge, 413);
    }

    return rejected("invalid_json", copy.invalidJson, 400);
  }

  copy = getCopy(inferLocale(request, rawPayload));

  // Return an indistinguishable success response to simple form-filling bots.
  if (isHoneypotFilled(rawPayload)) {
    return accepted(copy);
  }

  const parsed = leadSchema.safeParse(rawPayload);

  if (!parsed.success) {
    return rejected("invalid_payload", copy.invalidPayload, 400);
  }

  const lead = parsed.data;
  const now = Date.now();
  const elapsed = now - lead.startedAt;

  if (elapsed < -MAX_CLOCK_SKEW_MS || elapsed > MAX_SUBMISSION_AGE_MS) {
    return rejected("expired_form", copy.expired, 400);
  }

  if (elapsed < MIN_SUBMISSION_TIME_MS) {
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((MIN_SUBMISSION_TIME_MS - elapsed) / 1_000),
    );

    return rejected("submission_too_fast", copy.tooFast, 429, {
      "Retry-After": String(retryAfterSeconds),
    });
  }

  const startedSendingAt = Date.now();
  const emailConfig = getEmailConfig();

  if (!emailConfig) {
    logDeliveryResult(
      "configuration_error",
      lead.submissionId,
      Date.now() - startedSendingAt,
    );
    return rejected("service_unavailable", copy.unavailable, 503);
  }

  const notification = toNotificationData(lead);
  const subject =
    lead.locale === "pt"
      ? "Novo contato de projeto digital"
      : "New digital project inquiry";

  try {
    const html = await render(LeadNotificationEmail({ lead: notification }));
    const { error } = await emailConfig.resend.emails.send(
      {
        from: emailConfig.from,
        to: [emailConfig.to],
        replyTo: lead.email,
        subject,
        html,
        text: buildLeadNotificationText(notification),
      },
      {
        idempotencyKey: `studio-flamboyant/lead/${lead.submissionId}`,
      },
    );

    if (error) {
      const providerStatus =
        "statusCode" in error && typeof error.statusCode === "number"
          ? error.statusCode
          : undefined;

      logDeliveryResult(
        "provider_error",
        lead.submissionId,
        Date.now() - startedSendingAt,
        providerStatus,
      );
      return rejected("send_failed", copy.sendFailed, 502);
    }

    logDeliveryResult(
      "accepted",
      lead.submissionId,
      Date.now() - startedSendingAt,
    );
    return accepted(copy);
  } catch {
    logDeliveryResult(
      "exception",
      lead.submissionId,
      Date.now() - startedSendingAt,
    );
    return rejected("send_failed", copy.sendFailed, 502);
  }
}
