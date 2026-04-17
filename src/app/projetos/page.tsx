import type { Metadata } from "next";
import { getAllProjects } from "@/lib/projects";
import siteConfig from "@/lib/metadata";
import { ProjectsFilter } from "@/components/projects-filter";
import { CollectionJsonLd } from "@/components/json-ld";
import { resolveLang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Projetos",
  description:
    "Projetos de arquitetura residencial, comercial e interiores de alto padrao por Julia Fonseca Arquitetura em Montes Claros, MG.",
};

const copy = {
  pt: {
    intro:
      "Ao longo dos projetos do escritório, a arquitetura é tratada como presença, permanência e atmosfera. Confira aqui uma seleção de projetos residenciais, comerciais e de interiores, e use os filtros para descobrir mais detalhes.",
  },
  en: {
    intro:
      "Across the studio work, architecture is treated as presence, permanence and atmosphere. Explore a selection of residential, commercial and interior projects and use the filters to discover more details.",
  },
} as const;

export default function ProjetosPage({
  searchParams,
}: {
  searchParams?: { lang?: string; categoria?: string; status?: string };
}) {
  const projects = getAllProjects();
  const lang = resolveLang(searchParams?.lang);
  const t = copy[lang];
  const initialCategory =
    searchParams?.categoria && ["residencial", "comercial", "interiores"].includes(searchParams.categoria)
      ? searchParams.categoria
      : null;
  const initialStatus =
    searchParams?.status === "completed" || searchParams?.status === "in_progress"
      ? searchParams.status
      : null;

  return (
    <>
      <CollectionJsonLd
        name="Projetos — Julia Fonseca Arquitetura"
        description="Portfolio completo de projetos residenciais, comerciais e interiores."
        url={`${siteConfig.url}/projetos`}
        projects={projects}
      />

      <section className="section-padding pb-20 pt-44 md:pb-24 md:pt-48">
        <div className="mx-auto max-w-[68rem]">
          <div className="mx-auto max-w-5xl">
            <p className="quiet-serif">{t.intro}</p>
          </div>
        </div>
      </section>

      <section className="pb-32 md:pb-40">
        <ProjectsFilter
          projects={projects}
          lang={lang}
          initialCategory={initialCategory}
          initialStatus={initialStatus}
        />
      </section>
    </>
  );
}
