import type { Metadata } from "next";
import { getFeaturedProjects } from "@/lib/projects";
import { resolveLang } from "@/lib/i18n";
import { PublicationsGallery, type PublicationItem } from "@/components/publications-gallery";

export const metadata: Metadata = {
  title: "Publicações",
  description:
    "Publicações, documentos do escritório e aparições na mídia de Julia Fonseca Arquitetura.",
};

export default function PublicacoesPage({
  searchParams,
}: {
  searchParams?: { lang?: string };
}) {
  const lang = resolveLang(searchParams?.lang);
  const featured = getFeaturedProjects();

  const items: PublicationItem[] = [
    {
      slug: "julia-studio-notes-01",
      title: "Julia Studio Notes",
      date: "07/2025",
      type: "studio",
      href: "/publicacoes",
    },
    {
      slug: "manera",
      title: "Manera",
      date: "07/2025",
      type: "midia",
      cover: featured[0]?.cover,
      href: "/publicacoes",
    },
    {
      slug: "hoom-magazine",
      title: "Hoom Magazine",
      date: "03/2025",
      type: "midia",
      cover: featured[1]?.cover ?? featured[0]?.cover,
      href: "/publicacoes",
    },
    {
      slug: "casa-vogue",
      title: "Casa Vogue",
      date: "02/2025",
      type: "referencias",
      cover: featured[2]?.cover ?? featured[0]?.cover,
      href: "/publicacoes",
    },
    {
      slug: "projeto",
      title: "Projeto",
      date: "11/2024",
      type: "referencias",
      cover: featured[3]?.cover ?? featured[0]?.cover,
      href: "/publicacoes",
    },
    {
      slug: "ek-magazine",
      title: "EK Magazine",
      date: "03/2025",
      type: "midia",
      cover: featured[4]?.cover ?? featured[1]?.cover ?? featured[0]?.cover,
      href: "/publicacoes",
    },
  ];

  return <PublicationsGallery items={items} lang={lang} initialType="studio" />;
}
