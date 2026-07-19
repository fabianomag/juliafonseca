import Link from "next/link";
import { getSiteContent, type Locale } from "@/content/site";
import { creator } from "@/content/creator";
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
        <p>
          {content.footer.caseCredit}{" "}
          <a
            href={creator.linkedin}
            target="_blank"
            rel="author external noopener"
            aria-label={
              locale === "pt"
                ? "Fabiano Mag no LinkedIn — abre em nova aba"
                : "Fabiano Mag on LinkedIn — opens in a new tab"
            }
          >
            {creator.handle}
          </a>
          .
        </p>
        <Link href={content.footer.privacyHref}>{content.footer.privacyLabel}</Link>
        <p>
          © {new Date().getFullYear()}{" "}
          <a
            href={creator.github}
            target="_blank"
            rel="author external noopener"
            aria-label={
              locale === "pt"
                ? "Fabiano Mag no GitHub — abre em nova aba"
                : "Fabiano Mag on GitHub — opens in a new tab"
            }
          >
            {creator.handle}
          </a>
        </p>
      </div>
    </footer>
  );
}
