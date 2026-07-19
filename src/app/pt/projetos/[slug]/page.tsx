import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/project-detail";
import { StructuredData } from "@/components/structured-data";
import {
  getProjectAlternates,
  getProjectBySlug,
  getProjectRoute,
  getProjects,
} from "@/content/site";
import { createPageMetadata } from "@/lib/metadata";
import { absoluteUrl } from "@/lib/site-url";

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects("pt").map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug("pt", slug);
  if (!project) return {};
  return createPageMetadata({
    locale: "pt",
    title: project.seo.title,
    description: project.seo.description,
    alternates: getProjectAlternates("pt", project),
    image: project.images[0].src,
  });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug("pt", slug);
  if (!project) notFound();
  const projects = getProjects("pt");
  const index = projects.findIndex((item) => item.id === project.id);
  const nextProject = projects[(index + 1) % projects.length];

  return (
    <>
      <StructuredData data={{
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: project.title,
        description: project.summary,
        abstract: project.statement.join(" "),
        url: absoluteUrl(getProjectRoute("pt", project)),
        image: project.images.map((image) => absoluteUrl(image.src)),
        inLanguage: "pt-BR",
        keywords: project.themes.join(", "),
        creativeWorkStatus: "Conceitual · Não construído",
      }} />
      <ProjectDetail locale="pt" project={project} nextProject={nextProject} />
    </>
  );
}
