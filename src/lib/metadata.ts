import type { Metadata } from "next";
import {
  getPageAlternates,
  getSiteContent,
  localeDetails,
  type Locale,
  type RouteAlternates,
  type StaticRouteKey,
} from "@/content/site";
import { absoluteUrl, getSiteUrl } from "@/lib/site-url";
import { creator } from "@/content/creator";

const socialImages: Record<Locale, string> = {
  en: absoluteUrl("/social-card.png?v=20260721-license"),
  pt: absoluteUrl("/social-card-pt.png?v=20260721-license"),
};

export function createRootMetadata(locale: Locale): Metadata {
  const content = getSiteContent(locale);
  const alternates = getPageAlternates(locale, "home");
  const socialImage = socialImages[locale];

  return {
    metadataBase: getSiteUrl(),
    title: content.home.seo.title,
    description: content.home.seo.description,
    applicationName: content.brand.name,
    authors: [{ name: creator.name, url: creator.linkedin }],
    creator: creator.name,
    publisher: content.brand.name,
    category: "Design and frontend engineering",
    alternates,
    openGraph: {
      type: "website",
      siteName: content.brand.name,
      title: content.home.seo.title,
      description: content.home.seo.description,
      url: alternates.canonical,
      locale: localeDetails[locale].htmlLang.replace("-", "_"),
      images: [{ url: socialImage, width: 1200, height: 630, alt: content.brand.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: content.home.seo.title,
      description: content.home.seo.description,
      images: [socialImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export function createPageMetadata({
  locale,
  title,
  description,
  alternates,
  image,
}: {
  locale: Locale;
  title: string;
  description: string;
  alternates: RouteAlternates;
  image?: string;
}): Metadata {
  const content = getSiteContent(locale);
  const social = image ? absoluteUrl(image) : socialImages[locale];

  return {
    metadataBase: getSiteUrl(),
    title,
    description,
    alternates,
    openGraph: {
      type: "website",
      siteName: content.brand.name,
      title,
      description,
      url: alternates.canonical,
      locale: localeDetails[locale].htmlLang.replace("-", "_"),
      images: [{ url: social, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [social],
    },
  };
}

export function createStaticPageMetadata(locale: Locale, route: StaticRouteKey): Metadata {
  const content = getSiteContent(locale);
  const seoByRoute = {
    home: content.home.seo,
    projects: content.projectsIndex.seo,
    studio: content.studio.seo,
    contact: content.contact.seo,
    privacy: content.privacy.seo,
  } as const;
  const seo = seoByRoute[route];
  return createPageMetadata({
    locale,
    title: seo.title,
    description: seo.description,
    alternates: getPageAlternates(locale, route),
  });
}
