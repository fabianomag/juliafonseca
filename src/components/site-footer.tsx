import Link from "next/link";
import { getSiteContent, type Locale } from "@/content/site";

export function SiteFooter({ locale }: { locale: Locale }) {
  const content = getSiteContent(locale);

  return (
    <footer className="site-footer">
      <div>
        <p className="eyebrow">{content.brand.caseLabel}</p>
        <p className="site-footer__title">
          {locale === "pt" ? "Forma digital, " : "Digital form, "}
          <em>{locale === "pt" ? "presença real." : "real presence."}</em>
        </p>
      </div>
      <div className="site-footer__meta">
        <span>{content.footer.caseCredit}</span>
        <span>{content.footer.disclosure}</span>
        <Link href={content.footer.privacyHref}>{content.footer.privacyLabel}</Link>
        <span>© {new Date().getFullYear()} Fabiano Frank</span>
      </div>
    </footer>
  );
}
