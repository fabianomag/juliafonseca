"use client";

import { useState } from "react";
import { Check, Copy, ExternalLink, Instagram, Mail, MessageCircle } from "lucide-react";

type Lang = "pt" | "en";
type Action = {
  type: "copy" | "link";
  label: string;
  value?: string;
  href?: string;
};

type Row = {
  label: string;
  value: string;
  hint: string;
  icon: "whatsapp" | "email" | "instagram";
  copyValue: string;
  actions: Action[];
};

const iconMap = {
  whatsapp: MessageCircle,
  email: Mail,
  instagram: Instagram,
} as const;

function ActionButton({
  action,
  copied,
  onCopy,
  copiedLabel,
}: {
  action: Action;
  copied: boolean;
  onCopy: (value: string) => void;
  copiedLabel: string;
}) {
  if (action.type === "link" && action.href) {
    return (
      <a
        href={action.href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full border border-ambient-stone px-4 py-2 text-xs uppercase tracking-[0.18em] text-ambient-dark transition-colors hover:border-ambient-electric hover:text-ambient-electric"
      >
        <ExternalLink size={14} />
        {action.label}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={() => action.value && onCopy(action.value)}
      className={copied
        ? "inline-flex items-center gap-2 rounded-full border border-ambient-electric bg-ambient-electric px-4 py-2 text-xs uppercase tracking-[0.18em] text-white transition-colors"
        : "inline-flex items-center gap-2 rounded-full border border-ambient-stone px-4 py-2 text-xs uppercase tracking-[0.18em] text-ambient-dark transition-colors hover:border-ambient-electric hover:text-ambient-electric"}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      {copied ? copiedLabel : action.label}
    </button>
  );
}

export function ContactActionRows({
  lang,
  rows,
}: {
  lang: Lang;
  rows: Row[];
}) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = async (value: string, key: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      window.setTimeout(() => setCopiedKey((current) => (current === key ? null : current)), 1800);
    } catch {
      setCopiedKey(key);
      window.setTimeout(() => setCopiedKey((current) => (current === key ? null : current)), 1800);
    }
  };

  const copiedLabel = lang === "pt" ? "Copiado" : "Copied";

  return (
    <div className="mt-24 border-t border-ambient-stone/50">
      {rows.map((row) => {
        const Icon = iconMap[row.icon];
        const rowKey = `${row.label}-${row.value}`;
        const isCopied = copiedKey === rowKey;

        return (
          <div
            key={rowKey}
            className="grid gap-6 border-b border-ambient-stone/50 py-8 lg:grid-cols-[1.25fr_0.75fr]"
          >
            <button
              type="button"
              onClick={() => handleCopy(row.copyValue, rowKey)}
              className="group flex w-full items-start gap-5 text-left"
            >
              <span className="mt-1 rounded-full border border-ambient-stone p-3 text-ambient-muted transition-colors group-hover:border-ambient-electric group-hover:text-ambient-electric">
                <Icon size={18} strokeWidth={1.6} />
              </span>
              <span className="block">
                <span className="block text-xs uppercase tracking-[0.3em] text-ambient-canyon/50">{row.label}</span>
                <span className="mt-3 block font-display text-[2rem] uppercase leading-[0.84] tracking-[-0.05em] text-ambient-dark transition-colors duration-500 group-hover:text-ambient-electric sm:text-[3.3rem] lg:text-[4.2rem]">
                  {row.value}
                </span>
                <span className="mt-3 inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.22em] text-ambient-muted">
                  {isCopied ? (
                    <>
                      <Check size={13} />
                      {lang === "pt" ? "Copiado para a área de transferência" : "Copied to clipboard"}
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      {row.hint}
                    </>
                  )}
                </span>
              </span>
            </button>

            <div className="flex flex-wrap items-center gap-3 lg:justify-end">
              {row.actions.map((action) => (
                <ActionButton
                  key={`${rowKey}-${action.label}`}
                  action={action}
                  copied={action.type === "copy" && isCopied}
                  onCopy={(value) => handleCopy(value, rowKey)}
                  copiedLabel={copiedLabel}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
