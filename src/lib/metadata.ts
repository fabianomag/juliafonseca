import type { Metadata } from "next";

const siteConfig = {
  name: "Julia Fonseca Arquitetura",
  description:
    "Arquitetura residencial, comercial e interiores de alto padr\u00e3o. Projetos que contam hist\u00f3rias atrav\u00e9s de espa\u00e7os.",
  url: "https://www.juliafonsecaarq.com",
  email: "juliafonseca.arquiteta@gmail.com",
  phone: "+553899266-5556",
  whatsapp: "553899266-5556",
  instagram: "https://www.instagram.com/juliafonseca.arq",
  locale: "pt_BR",
  location: {
    city: "Montes Claros",
    state: "MG",
    country: "BR",
  },
};

export default siteConfig;

export function createMetadata(overrides: Partial<Metadata> = {}): Metadata {
  return {
    title: {
      default: siteConfig.name,
      template: `%s \u2014 ${siteConfig.name}`,
    },
    description: siteConfig.description,
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
    },
    robots: {
      index: true,
      follow: true,
    },
    ...overrides,
  };
}
