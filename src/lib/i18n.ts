export type Lang = "pt" | "en";

export function resolveLang(value?: string | null): Lang {
  return value === "en" ? "en" : "pt";
}

export function withLang(href: string, lang: Lang): string {
  const [path, hash] = href.split("#");
  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}lang=${lang}${hash ? `#${hash}` : ""}`;
}
