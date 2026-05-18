"use client";

import { type ChangeEvent, type ReactNode, useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Copy } from "lucide-react";
import siteConfig from "@/lib/metadata";
import { type Lang } from "@/lib/i18n";
import { Reveal } from "@/components/reveal";
import { MontesClarosMap } from "@/components/montes-claros-map";

const copy = {
  pt: {
    eyebrow: "Contato",
    titleTop: "Vamos",
    titleBottom: "conversar",
    intro: "Conte brevemente o projeto.",
    directTitle: "Contato direto",
    directIntro: "Copiar",
    mapLabel: "Montes Claros · MG · Brasil",
    formTag: "Nova conversa",
    name: "Nome",
    message: "Mensagem",
    placeholderName: "Seu nome",
    placeholderMessage: "Projeto, imóvel ou ideia inicial.",
    sendTitle: "Enviar mensagem",
    whatsappAction: "WhatsApp",
    emailAction: "E-mail",
    instagramAction: "Instagram",
    instagramHint:
      "O Instagram não aceita mensagem pré-preenchida de forma confiável. Copiamos o texto para você colar na DM.",
    needMessage: "Escreva uma mensagem antes de enviar.",
    whatsappReady: "Abrimos o WhatsApp com a mensagem pronta para envio.",
    instagramReady: "Mensagem copiada para colar na DM. Abrimos o Instagram em seguida.",
    emailReady: "Abrimos o Gmail com a mensagem pronta para envio.",
    copyHint: "Clique para copiar",
    sendViaWhatsapp: "Enviar para WhatsApp",
    sendViaEmail: "Enviar para E-mail",
    sendViaInstagram: "Enviar para Instagram",
    base: "Base",
  },
  en: {
    eyebrow: "Contact",
    titleTop: "Let's",
    titleBottom: "talk",
    intro: "Share a short note about the project.",
    directTitle: "Direct contact",
    directIntro: "Copy",
    mapLabel: "Montes Claros · MG · Brazil",
    formTag: "New conversation",
    name: "Name",
    message: "Message",
    placeholderName: "Your name",
    placeholderMessage: "Project, property, or initial idea.",
    sendTitle: "Send message",
    whatsappAction: "WhatsApp",
    emailAction: "E-mail",
    instagramAction: "Instagram",
    instagramHint:
      "Instagram does not reliably support prefilled messages. We copied the text so you can paste it into the DM.",
    needMessage: "Write a message before sending.",
    whatsappReady: "WhatsApp was opened with your message ready to send.",
    instagramReady: "Message copied for the DM. Instagram was opened right after.",
    emailReady: "Gmail was opened with the message ready to send.",
    copyHint: "Click to copy",
    sendViaWhatsapp: "Send via WhatsApp",
    sendViaEmail: "Send via email",
    sendViaInstagram: "Send via Instagram",
    base: "Base",
  },
} as const;

type ContactFormState = {
  name: string;
  message: string;
};

type FeedbackTone = "neutral" | "success" | "error";

const initialFormState: ContactFormState = {
  name: "",
  message: "",
};

function maybeReveal(children: ReactNode, animated: boolean, delay = 0) {
  if (!animated) return <>{children}</>;
  return <Reveal delay={delay}>{children}</Reveal>;
}

function composeOutboundMessage(lang: Lang, form: ContactFormState) {
  const intro =
    lang === "pt"
      ? "Olá Julia! Vim pelo site e gostaria de conversar sobre um projeto."
      : "Hello Julia! I found your website and would like to talk about a project.";

  const details = [
    form.name.trim() ? `${lang === "pt" ? "Nome" : "Name"}: ${form.name.trim()}` : null,
    "",
    `${lang === "pt" ? "Mensagem" : "Message"}:`,
    form.message.trim(),
  ].filter(Boolean);

  return [intro, "", ...details].join("\n");
}

function composeEmailSubject(lang: Lang, form: ContactFormState) {
  const fallback = lang === "pt" ? "Contato pelo site" : "Website contact";
  return form.name.trim() ? `${fallback} - ${form.name.trim()}` : fallback;
}

function composeInstagramMessage(lang: Lang, form: ContactFormState) {
  const intro =
    lang === "pt"
      ? "Olá Julia! Vim pelo site e gostaria de conversar sobre um projeto."
      : "Hello Julia! I found your website and would like to talk about a project.";

  return [intro, "", form.message.trim()].join("\n");
}

function openExternal(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

function ContactField({
  label,
  name,
  value,
  placeholder,
  onChange,
  multiline = false,
}: {
  label: string;
  name: keyof ContactFormState;
  value: string;
  placeholder: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  multiline?: boolean;
}) {
  const baseClass =
    "mt-3 w-full bg-transparent font-sans text-[1.24rem] leading-relaxed text-black/84 outline-none placeholder:text-black/28";

  return (
    <label className="block pb-3">
      <span className="font-display text-[0.76rem] uppercase tracking-[0.2em] text-black/42">
        {label}
      </span>
      {multiline ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={5}
          className={`${baseClass} min-h-[8.25rem] resize-y`}
        />
      ) : (
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={baseClass}
        />
      )}
    </label>
  );
}

function SendChannelButton({
  label,
  sendLabel,
  copyLabel,
  copiedLabel,
  onSend,
  onCopy,
  isCopied,
}: {
  label: string;
  sendLabel: string;
  copyLabel: string;
  copiedLabel: string;
  onSend: () => void;
  onCopy: () => void;
  isCopied: boolean;
}) {
  const cursorAttrs = {
    string: "cursor",
    "string-cursor-class": `jf-copy-target${isCopied ? " jf-copy-target--copied" : ""}`,
    "string-cursor-target-style-disable": "",
    "data-copy-cursor-label": copyLabel,
    "data-copy-cursor-copied-label": copiedLabel,
  } as const;
  const sendCursorAttrs = {
    string: "cursor",
    "string-cursor-class": "jf-copy-target",
    "string-cursor-target-style-disable": "",
    "data-copy-cursor-label": sendLabel,
    "data-copy-cursor-copied-label": copiedLabel,
  } as const;

  return (
    <div className="contact-send-option group/option">
      <button
        {...sendCursorAttrs}
        type="button"
        onClick={onSend}
        className="contact-send-option__send"
        aria-label={sendLabel}
      >
        <span className="contact-send-option__label">{label}</span>
        <span className="contact-send-option__arrow">
          <ArrowRight size={18} strokeWidth={1.65} />
        </span>
      </button>

      <button
        {...cursorAttrs}
        type="button"
        onClick={onCopy}
        className="contact-send-option__copy"
        aria-label={copyLabel}
      >
        <span className="contact-send-option__copyIcon">
          {isCopied ? <Check size={17} strokeWidth={1.8} /> : <Copy size={17} strokeWidth={1.8} />}
        </span>
      </button>
    </div>
  );
}

function SendActionDock({
  title,
  whatsappLabel,
  emailLabel,
  instagramLabel,
  whatsappSendLabel,
  emailSendLabel,
  instagramSendLabel,
  onWhatsApp,
  onEmail,
  onInstagram,
  onCopyWhatsApp,
  onCopyEmail,
  onCopyInstagram,
  copiedKey,
  copyLabels,
}: {
  title: string;
  whatsappLabel: string;
  emailLabel: string;
  instagramLabel: string;
  whatsappSendLabel: string;
  emailSendLabel: string;
  instagramSendLabel: string;
  onWhatsApp: () => void;
  onEmail: () => void;
  onInstagram: () => void;
  onCopyWhatsApp: () => void;
  onCopyEmail: () => void;
  onCopyInstagram: () => void;
  copiedKey: string | null;
  copyLabels: {
    whatsapp: string;
    email: string;
    instagram: string;
    copied: string;
  };
}) {
  return (
    <div className="contact-send-dock group/send">
      <div className="contact-send-primer" aria-hidden="true">
        <ArrowRight size={32} strokeWidth={1.25} />
        <span>{title}</span>
      </div>

      <div className="contact-send-fill" aria-hidden="true" />

      <div className="contact-send-options" aria-label={title}>
        <SendChannelButton
          label={whatsappLabel}
          sendLabel={whatsappSendLabel}
          copyLabel={copyLabels.whatsapp}
          copiedLabel={copyLabels.copied}
          onSend={onWhatsApp}
          onCopy={onCopyWhatsApp}
          isCopied={copiedKey === "whatsapp"}
        />
        <SendChannelButton
          label={emailLabel}
          sendLabel={emailSendLabel}
          copyLabel={copyLabels.email}
          copiedLabel={copyLabels.copied}
          onSend={onEmail}
          onCopy={onCopyEmail}
          isCopied={copiedKey === "email"}
        />
        <SendChannelButton
          label={instagramLabel}
          sendLabel={instagramSendLabel}
          copyLabel={copyLabels.instagram}
          copiedLabel={copyLabels.copied}
          onSend={onInstagram}
          onCopy={onCopyInstagram}
          isCopied={copiedKey === "instagram"}
        />
      </div>
    </div>
  );
}

export function ContactShowcase({
  lang,
  variant = "page",
  animated = variant === "page",
}: {
  lang: Lang;
  variant?: "page" | "panel";
  animated?: boolean;
}) {
  const t = copy[lang];
  const isPanel = variant === "panel";
  const shellClass = isPanel
    ? "isolate relative h-full overflow-hidden bg-black text-white"
    : "isolate relative min-h-screen overflow-hidden bg-black text-white";
  const overlayClass =
    "absolute inset-0 z-10 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0)_0%,rgba(0,0,0,0.08)_46%,rgba(0,0,0,0.42)_100%)] lg:bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.2)_58%,rgba(0,0,0,0.58)_100%)]";
  const sectionClass = isPanel
    ? "relative z-20 flex h-full items-start overflow-y-auto px-4 pb-[46vh] pt-24 sm:px-8 sm:pt-28 lg:items-center lg:py-12 lg:pl-[20rem] lg:pr-10 xl:pl-[24rem]"
    : "relative z-20 flex min-h-screen items-start overflow-y-auto px-4 pb-16 pt-24 sm:px-8 sm:pt-28 lg:items-center lg:justify-center lg:px-20 lg:py-24";
  const contentClass = isPanel
    ? "mx-auto w-full max-w-[32rem] lg:max-w-[46rem]"
    : "mx-auto w-full max-w-[32rem] lg:max-w-[50rem]";
  const cardPaddingClass = isPanel ? "px-5 py-7 sm:px-8 sm:py-9 lg:px-12 lg:py-12" : "px-5 py-8 sm:px-8 sm:py-10 lg:px-14 lg:py-13";
  const [form, setForm] = useState<ContactFormState>(initialFormState);
  const [feedback, setFeedback] = useState<{ tone: FeedbackTone; message: string } | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const copyResetRef = useRef<number | null>(null);

  useEffect(() => {
    if (!feedback) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setFeedback(null);
    }, 3600);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [feedback]);

  useEffect(() => {
    return () => {
      if (copyResetRef.current) {
        window.clearTimeout(copyResetRef.current);
      }
    };
  }, []);

  const handleFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleWhatsApp = () => {
    if (!form.message.trim()) {
      setFeedback({ tone: "error", message: t.needMessage });
      return;
    }

    const message = composeOutboundMessage(lang, form);
    openExternal(`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`);
    setFeedback({ tone: "success", message: t.whatsappReady });
  };

  const handleInstagram = async () => {
    if (!form.message.trim()) {
      setFeedback({ tone: "error", message: t.needMessage });
      return;
    }

    const message = composeInstagramMessage(lang, form);

    try {
      await navigator.clipboard.writeText(message);
      openExternal(siteConfig.instagramDm);
      setFeedback({ tone: "success", message: t.instagramReady });
    } catch {
      openExternal(siteConfig.instagramDm);
      setFeedback({ tone: "neutral", message: t.instagramHint });
    }
  };

  const handleEmail = async () => {
    if (!form.message.trim()) {
      setFeedback({ tone: "error", message: t.needMessage });
      return;
    }

    const subject = encodeURIComponent(composeEmailSubject(lang, form));
    const body = encodeURIComponent(composeOutboundMessage(lang, form));
    openExternal(`https://mail.google.com/mail/?view=cm&fs=1&to=${siteConfig.email}&su=${subject}&body=${body}`);
    setFeedback({ tone: "success", message: t.emailReady });
  };

  const handleCopyContact = async (value: string, key: "whatsapp" | "email" | "instagram") => {
    if (copyResetRef.current) {
      window.clearTimeout(copyResetRef.current);
    }

    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Keep the copied state even if clipboard is blocked so the interaction stays coherent.
    }

    setCopiedKey(key);
    window.dispatchEvent(new CustomEvent("jf:copy-cursor", { detail: { copied: true } }));

    copyResetRef.current = window.setTimeout(() => {
      setCopiedKey((current) => (current === key ? null : current));
      window.dispatchEvent(new CustomEvent("jf:copy-cursor", { detail: { copied: false } }));
      copyResetRef.current = null;
    }, 1800);
  };

  const copyLabels = {
    whatsapp: lang === "pt" ? "Copiar WhatsApp" : "Copy WhatsApp",
    email: lang === "pt" ? "Copiar e-mail" : "Copy email",
    instagram: lang === "pt" ? "Copiar Instagram" : "Copy Instagram",
    copied: lang === "pt" ? "Copiado" : "Copied",
  };

  return (
    <div className={shellClass}>
      <MontesClarosMap />
      <div className={overlayClass} />

      <section className={sectionClass}>
        <div className={contentClass}>
          {maybeReveal(
            <article className="relative isolate w-full overflow-hidden bg-white text-black shadow-[0_24px_90px_rgba(0,0,0,0.42)] [transform:translateZ(0)]">
              <div className={cardPaddingClass}>
                <div className="space-y-5">
                  <ContactField
                    label={t.name}
                    name="name"
                    value={form.name}
                    placeholder={t.placeholderName}
                    onChange={handleFieldChange}
                  />

                  <ContactField
                    label={t.message}
                    name="message"
                    value={form.message}
                    placeholder={t.placeholderMessage}
                    onChange={handleFieldChange}
                    multiline
                  />
                </div>
              </div>

              <SendActionDock
                title={t.sendTitle}
                whatsappLabel={t.whatsappAction}
                emailLabel={t.emailAction}
                instagramLabel={t.instagramAction}
                whatsappSendLabel={t.sendViaWhatsapp}
                emailSendLabel={t.sendViaEmail}
                instagramSendLabel={t.sendViaInstagram}
                onWhatsApp={handleWhatsApp}
                onEmail={handleEmail}
                onInstagram={handleInstagram}
                onCopyWhatsApp={() => handleCopyContact(siteConfig.phone, "whatsapp")}
                onCopyEmail={() => handleCopyContact(siteConfig.email, "email")}
                onCopyInstagram={() => handleCopyContact("@juliafonseca.arq", "instagram")}
                copiedKey={copiedKey}
                copyLabels={copyLabels}
              />

              {feedback && (
                <p
                  className={
                    feedback.tone === "success"
                      ? "border-t border-black/12 px-5 py-3 font-display text-[0.62rem] uppercase tracking-[0.16em] text-ambient-electric sm:px-7"
                      : feedback.tone === "error"
                        ? "border-t border-black/12 px-5 py-3 font-display text-[0.62rem] uppercase tracking-[0.16em] text-red-700 sm:px-7"
                        : "border-t border-black/12 px-5 py-3 font-display text-[0.62rem] uppercase tracking-[0.16em] text-black/54 sm:px-7"
                  }
                >
                  {feedback.message}
                </p>
              )}
            </article>,
            animated,
            0.05,
          )}
        </div>
      </section>
    </div>
  );
}
