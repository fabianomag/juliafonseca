import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import { withLang, type Lang } from "@/lib/i18n";

interface ProjectCardProps {
  project: Project;
  index?: number;
  size?: "default" | "large";
  lang?: Lang;
}

export function ProjectCard({ project, index = 0, lang = "pt" }: ProjectCardProps) {
  const isNew = Number.parseInt(project.year, 10) >= 2024;
  const sectionLabel =
    lang === "en"
      ? {
          residencial: "Residential",
          comercial: "Commercial",
          interiores: "Interiors",
        }[project.section]
      : project.category;

  return (
    <Link href={withLang(`/${project.section}/${project.slug}`, lang)} className="group block">
      <div className="relative aspect-[1.86/1] overflow-hidden bg-ambient-linen">
        <Image
          src={project.cover}
          alt={`${project.title} — ${project.category}`}
          fill
          className="object-cover transition-all duration-700 ease-out group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 33vw"
          loading={index < 3 ? "eager" : "lazy"}
        />
      </div>

      <div className="bg-white px-7 pb-8 pt-6 md:px-8 md:pb-9 md:pt-7">
        <h3 className="font-display text-[2.25rem] uppercase leading-[0.82] tracking-[0.04em] text-ambient-dark transition-colors group-hover:text-ambient-electric sm:text-[2.55rem]">
          {project.title}
        </h3>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.78rem] uppercase tracking-[0.16em] text-ambient-muted">
          {isNew && (
            <span className="inline-flex bg-ambient-electric px-2 py-1 text-white">
              {lang === "pt" ? "Novo" : "New"}
            </span>
          )}
          <span>{sectionLabel}</span>
          <span>|</span>
          <span>{project.year}</span>
        </div>
      </div>
    </Link>
  );
}
