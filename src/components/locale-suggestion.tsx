"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getSiteContent, routeMaps, type Locale } from "@/content/site";

const localePreferenceKey = "studio-flamboyant-locale";

export function LocaleSuggestion({ locale }: { locale: Locale }) {
  const [visible, setVisible] = useState(false);
  const copy = getSiteContent(locale).global.localeSuggestion;

  useEffect(() => {
    if (locale === "pt") {
      window.localStorage.setItem(localePreferenceKey, "pt");
      return;
    }

    if (window.localStorage.getItem(localePreferenceKey)) return;

    const controller = new AbortController();
    fetch("/api/locale-hint", { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((result: { suggestPortuguese?: boolean } | null) => {
        if (result?.suggestPortuguese) setVisible(true);
      })
      .catch(() => undefined);

    return () => controller.abort();
  }, [locale]);

  if (!visible) return null;

  const choose = (choice: Locale) => {
    window.localStorage.setItem(localePreferenceKey, choice);
    setVisible(false);
  };

  return (
    <aside className="locale-suggestion" aria-label={copy.message}>
      <p>{copy.message}</p>
      <Link href={routeMaps.pt.home} hrefLang="pt-BR" onClick={() => choose("pt")}>
        {copy.action}
      </Link>
      <button type="button" onClick={() => choose("en")}>
        {copy.dismiss}
      </button>
    </aside>
  );
}
