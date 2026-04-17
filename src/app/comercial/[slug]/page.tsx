import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjectBySlug, getProjectsBySection, getRelatedProjects } from "@/lib/projects";
import { ProjectPage } from "@/components/project-page";
import { resolveLang } from "@/lib/i18n";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return getProjectsBySection("comercial").map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const project = getProjectBySlug("comercial", params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      images: [{ url: project.cover, width: 1600, height: 900 }],
    },
  };
}

export default function Page({
  params,
  searchParams,
}: Props & {
  searchParams?: { lang?: string };
}) {
  const project = getProjectBySlug("comercial", params.slug);
  if (!project) notFound();

  const relatedProjects = getRelatedProjects("comercial", project.slug);
  const lang = resolveLang(searchParams?.lang);

  return <ProjectPage project={project} relatedProjects={relatedProjects} lang={lang} />;
}
