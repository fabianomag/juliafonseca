"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";
import { useEffect, useRef, useState } from "react";
import styles from "@/components/contact-showcase.module.css";
import type { Locale, LocalizedSiteContent } from "@/content/site";

type FormState = "idle" | "submitting" | "success" | "error";

function ArrowIcon() {
  return (
    <svg aria-hidden="true" width="42" height="42" viewBox="0 0 42 42" fill="none">
      <path d="M7 21H35" stroke="currentColor" strokeWidth="1.5" />
      <path d="M25 11L35 21L25 31" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function ContactForm({
  locale,
  copy,
}: {
  locale: Locale;
  copy: LocalizedSiteContent["contact"]["form"];
}) {
  const startedAtRef = useRef(0);
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    const projectType = String(formData.get("projectType") ?? "other");
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      company: String(formData.get("company") ?? ""),
      projectType,
      budget: String(formData.get("budget") ?? ""),
      message: String(formData.get("message") ?? ""),
      consent: formData.get("consent") === "on",
      locale,
      website: String(formData.get("website") ?? ""),
      startedAt: startedAtRef.current,
      submissionId: window.crypto.randomUUID(),
    };

    setState("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => null)) as { message?: string } | null;

      if (!response.ok) {
        throw new Error(result?.message || copy.errorBody);
      }

      setState("success");
      setMessage(result?.message || copy.successBody);
      track("lead_submitted", { locale, project_type: projectType });
      form.reset();
      startedAtRef.current = Date.now();
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : copy.errorBody);
    }
  }

  const fields = copy.fields;
  const buttonLabel = state === "submitting" ? copy.submitting : copy.submit;
  const activeButtonLabel =
    state === "submitting"
      ? copy.submitting
      : locale === "pt"
        ? "Enviar com segurança"
        : "Send securely";

  return (
    <form
      className={styles.form}
      aria-label={locale === "pt" ? "Formulário de contato" : "Contact form"}
      onSubmit={submit}
    >
      <div className={styles.formBody}>
        <div className={styles.formRow}>
          <div className={styles.field}>
            <label htmlFor="lead-name">{fields.name.label}</label>
            <input id="lead-name" name="name" type="text" autoComplete="name" minLength={2} maxLength={100} placeholder={fields.name.placeholder} required />
          </div>
          <div className={styles.field}>
            <label htmlFor="lead-email">{fields.email.label}</label>
            <input id="lead-email" name="email" type="email" autoComplete="email" maxLength={254} placeholder={fields.email.placeholder} required />
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="lead-message">{fields.message.label}</label>
          <textarea id="lead-message" name="message" minLength={20} maxLength={5000} placeholder={fields.message.placeholder} required />
        </div>

        <input name="projectType" type="hidden" defaultValue="other" />

        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor="lead-website">Website</label>
          <input id="lead-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <label className={styles.consent} htmlFor="lead-consent">
          <input id="lead-consent" name="consent" type="checkbox" required />
          <span>
            {fields.consent.label} {" "}
            <Link href={fields.consent.privacyHref}>{fields.consent.privacyLinkLabel}</Link>
          </span>
        </label>
      </div>

      <button
        className={styles.submitDock}
        type="submit"
        disabled={state === "submitting"}
        aria-busy={state === "submitting"}
      >
        <span className={styles.dockFill} aria-hidden="true" />
        <span className={styles.dockPrimer}>
          <span className={styles.dockArrow}><ArrowIcon /></span>
          <span>{buttonLabel}</span>
        </span>
        <span className={styles.dockAction} aria-hidden="true">
          <span>{activeButtonLabel}</span>
          <span className={styles.dockArrow}><ArrowIcon /></span>
        </span>
      </button>

      <div className={styles.statusRegion} aria-live="polite" aria-atomic="true">
        {state === "success" && (
          <p className={styles.status}><strong>{copy.successTitle}</strong> {message}</p>
        )}
        {state === "error" && (
          <p className={styles.error} role="alert"><strong>{copy.errorTitle}</strong> {message}</p>
        )}
      </div>
    </form>
  );
}
