import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjectBySlug, getProjectsBySection } from "@/lib/projects";
import { ProjectPage } from "@/components/project-page";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return getProjectsBySection("residencial").map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const project = getProjectBySlug("residencial", params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      images: [{ url: project.cover, width: 1600, height: 900 }],
    },
  };
}

export default function Page({ params }: Props) {
  const project = getProjectBySlug("residencial", params.slug);
  if (!project) notFound();

  const allInSection = getProjectsBySection("residencial");
  const currentIndex = allInSection.findIndex((p) => p.slug === project.slug);
  const nextProject = allInSection[(currentIndex + 1) % allInSection.length];

  return <ProjectPage project={project} nextProject={nextProject} />;
}
