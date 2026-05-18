import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import { withLang, type Lang } from "@/lib/i18n";
import { getImageBlurDataURL } from "@/lib/image-placeholder";

interface ProjectCardProps {
  project: Project;
  index?: number;
  size?: "default" | "large";
  lang?: Lang;
}

export function ProjectCard({ project, index = 0, lang = "pt" }: ProjectCardProps) {
  const isNew = Number.parseInt(project.year, 10) >= 2025;
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
      <div className="relative aspect-[16/9] overflow-hidden bg-black">
        <Image
          src={project.cover}
          alt={`${project.title} — ${project.category}`}
          fill
          className="object-cover grayscale transition-all duration-700 ease-out group-hover:scale-[1.02] group-hover:grayscale-0"
          sizes="(max-width: 768px) 100vw, 33vw"
          loading={index < 3 ? "eager" : "lazy"}
          placeholder="blur"
          blurDataURL={getImageBlurDataURL()}
        />

        {/* Gradiente + título sempre visível */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white/60">
            {sectionLabel}{isNew && <span className="ml-3 text-ambient-cyan">{lang === "pt" ? "Novo" : "New"}</span>}
          </p>
          <h3 className="mt-1 font-display text-[1.6rem] uppercase leading-[0.88] tracking-[-0.02em] text-white transition-colors duration-500 group-hover:text-ambient-cyan sm:text-[1.82rem]">
            {project.title}
          </h3>
          <p className="mt-1.5 text-[0.72rem] uppercase tracking-[0.18em] text-white/45">
            {project.year}
          </p>
        </div>
      </div>
    </Link>
  );
}
