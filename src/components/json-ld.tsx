/**
 * JSON-LD Structured Data Components
 *
 * Provides schema.org markup for SEO and GEO (Generative Engine Optimization).
 * These schemas help Google, ChatGPT, Perplexity and other AI engines
 * understand the content and surface it in search results and AI responses.
 */

import siteConfig from "@/lib/metadata";
import type { Project } from "@/lib/projects";

// --- Organization / LocalBusiness ---

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["Architect", "ProfessionalService", "LocalBusiness"],
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.state,
      addressCountry: siteConfig.location.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -16.7352,
      longitude: -43.8615,
    },
    areaServed: [
      {
        "@type": "City",
        name: "Montes Claros",
        containedInPlace: {
          "@type": "State",
          name: "Minas Gerais",
        },
      },
    ],
    sameAs: [siteConfig.instagram],
    image: `${siteConfig.url}/og-image.jpg`,
    priceRange: "$$$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phone,
      contactType: "customer service",
      availableLanguage: "Portuguese",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// --- WebSite with SearchAction ---

export function WebSiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "pt-BR",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// --- CreativeWork for individual projects ---

export function ProjectJsonLd({ project }: { project: Project }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    creator: {
      "@type": "Person",
      name: "Julia Fonseca",
      jobTitle: "Arquiteta",
      worksFor: {
        "@type": "Organization",
        name: siteConfig.name,
      },
    },
    dateCreated: project.year,
    locationCreated: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: project.location.split(",")[0]?.trim(),
        addressRegion: project.location.split(",")[1]?.trim(),
      },
    },
    genre: project.category,
    url: `${siteConfig.url}/${project.section}/${project.slug}`,
    image: project.cover,
    thumbnailUrl: project.cover,
    inLanguage: "pt-BR",
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// --- BreadcrumbList ---

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// --- CollectionPage for section listings ---

export function CollectionJsonLd({
  name,
  description,
  url,
  projects,
}: {
  name: string;
  description: string;
  url: string;
  projects: Project[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteConfig.url}/${project.section}/${project.slug}`,
        name: project.title,
      })),
    },
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
