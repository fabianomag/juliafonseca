"use client";

import { useState } from "react";
import { Check, Copy, Instagram, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

type Lang = "pt" | "en";

type Row = {
  label: string;
  value: string;
  hint: string;
  icon: "whatsapp" | "email" | "instagram";
  copyValue: string;
};

const iconMap = {
  whatsapp: FaWhatsapp,
  email: Mail,
  instagram: Instagram,
} as const;

export function ContactActionRows({
  lang,
  rows,
}: {
  lang: Lang;
  rows: Row[];
}) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = async (value: string, key: string) => {
    const resetCopiedState = () => {
      setCopiedKey((current) => (current === key ? null : current));
      window.dispatchEvent(new CustomEvent("jf:copy-cursor", { detail: { copied: false } }));
    };

    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      window.dispatchEvent(new CustomEvent("jf:copy-cursor", { detail: { copied: true } }));
      window.setTimeout(resetCopiedState, 1800);
    } catch {
      setCopiedKey(key);
      window.dispatchEvent(new CustomEvent("jf:copy-cursor", { detail: { copied: true } }));
      window.setTimeout(resetCopiedState, 1800);
    }
  };

  const copiedHint = lang === "pt" ? "Copiado" : "Copied";

  return (
    <div className="grid flex-1 divide-y divide-black/12 lg:grid-rows-3">
      {rows.map((row) => {
        const Icon = iconMap[row.icon];
        const rowKey = `${row.label}-${row.value}`;
        const isCopied = copiedKey === rowKey;
        const cursorAttrs = {
          string: "cursor",
          "string-cursor-class": `jf-copy-target${isCopied ? " jf-copy-target--copied" : ""}`,
          "string-cursor-target-style-disable": "",
        };

        return (
          <button
            {...cursorAttrs}
            key={rowKey}
            type="button"
            onClick={() => handleCopy(row.copyValue, rowKey)}
            className="group grid h-full w-full grid-cols-[1.55rem_minmax(0,1fr)] items-center gap-3.5 py-4 text-left transition-colors hover:bg-black/[0.018] lg:py-5"
          >
            <span className="text-black/58 transition-colors group-hover:text-black">
              <Icon size={18} strokeWidth={1.65} />
            </span>

            <span className="min-w-0">
              <span
                className="block truncate font-sans text-[0.96rem] font-medium leading-[1.18] tracking-[0.005em] text-black sm:text-[1rem] lg:text-[0.98rem]"
                title={row.copyValue}
              >
                {row.value}
              </span>
              <span className="mt-1.5 inline-flex items-center gap-1.5 font-display text-[0.58rem] uppercase tracking-[0.16em] text-black/34 sm:hidden">
                {isCopied ? <Check size={11} /> : <Copy size={11} />}
                {isCopied ? copiedHint : row.hint}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
