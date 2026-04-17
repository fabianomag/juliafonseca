import { permanentRedirect } from "next/navigation";
import { resolveLang, withLang } from "@/lib/i18n";

export default function ProdutosRedirectPage({
  searchParams,
}: {
  searchParams?: { lang?: string };
}) {
  const lang = resolveLang(searchParams?.lang);

  permanentRedirect(withLang("/galeria-trefle", lang));
}
