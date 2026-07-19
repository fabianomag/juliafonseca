import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import {
  getSiteContent,
  localeDetails,
  routeMaps,
  type Locale,
} from "@/content/site";
import { LocaleSuggestion } from "@/components/locale-suggestion";
import { Navigation } from "@/components/navigation";
import { RouteFooter } from "@/components/route-footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { StructuredData } from "@/components/structured-data";
import { absoluteUrl } from "@/lib/site-url";

const isVercelDeployment = process.env.VERCEL === "1";

export function LocaleRoot({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const content = getSiteContent(locale);
  const siteUrl = absoluteUrl(routeMaps[locale].home);

  return (
    <html lang={localeDetails[locale].htmlLang}>
      <body>
        <StructuredData
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": `${siteUrl}#website`,
            name: content.brand.name,
            description: content.brand.disclosure,
            inLanguage: localeDetails[locale].htmlLang,
            url: siteUrl,
          }}
        />
        <a className="skip-link" href="#main-content">
          {content.global.skipToContent}
        </a>
        <SmoothScroll />
        <Navigation locale={locale} />
        <main id="main-content">{children}</main>
        <RouteFooter locale={locale} />
        <LocaleSuggestion locale={locale} />
        {isVercelDeployment ? <Analytics /> : null}
        {isVercelDeployment ? <SpeedInsights /> : null}
      </body>
    </html>
  );
}
