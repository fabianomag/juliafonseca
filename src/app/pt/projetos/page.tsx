import type { Metadata } from "next";
import { ProjectsIndex } from "@/components/projects-index";
import { StructuredData } from "@/components/structured-data";
import { getProjectRoute, getSiteContent } from "@/content/site";
import { createStaticPageMetadata } from "@/lib/metadata";
import { absoluteUrl } from "@/lib/site-url";

export const metadata: Metadata = createStaticPageMetadata("pt", "projects");

export default function ProjectsPage() {
  const content = getSiteContent("pt");
  return (
    <>
      <StructuredData data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: content.projectsIndex.seo.title,
        description: content.projectsIndex.seo.description,
        url: absoluteUrl("/pt/projetos"),
        inLanguage: "pt-BR",
        hasPart: content.projects.map((project) => ({
          "@type": "CreativeWork",
          name: project.title,
          url: absoluteUrl(getProjectRoute("pt", project)),
        })),
      }} />
      <ProjectsIndex locale="pt" projects={content.projects} copy={content.projectsIndex} />
    </>
  );
}
