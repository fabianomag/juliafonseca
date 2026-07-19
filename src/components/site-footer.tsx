import Link from "next/link";
import { getSiteContent, type Locale } from "@/content/site";
import { BrandWordmark } from "@/components/brand-wordmark";

export function SiteFooter({ locale }: { locale: Locale }) {
  const content = getSiteContent(locale);

  return (
    <footer className="site-footer">
      <Link
        className="site-footer__wordmark"
        href={locale === "pt" ? "/pt" : "/"}
        aria-label={locale === "pt" ? "Flamboyant — início" : "Flamboyant — home"}
      >
        <BrandWordmark />
      </Link>
      <div className="site-footer__meta">
        <span>{content.footer.caseCredit}</span>
        <Link href={content.footer.privacyHref}>{content.footer.privacyLabel}</Link>
        <span>© {new Date().getFullYear()} Fabiano Frank</span>
      </div>
    </footer>
  );
}
