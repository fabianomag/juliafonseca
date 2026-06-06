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
  const viewLabel = lang === "pt" ? "Ver projeto" : "View project";

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

        <div className="absolute inset-0 bg-gradient-to-t from-ambient-dark/70 via-ambient-dark/18 to-transparent opacity-70 transition-opacity duration-500 ease-out group-hover:opacity-100" />

        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-7">
          <div className="relative z-10">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-ambient-micro/80 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
              {sectionLabel}
              {isNew && <span className="ml-3 text-ambient-cyan">{lang === "pt" ? "Novo" : "New"}</span>}
            </p>
            <h3 className="mt-1.5 font-display text-[1.45rem] uppercase leading-[1.1] tracking-[-0.03em] text-ambient-micro md:text-[1.55rem]">
              {project.title}
            </h3>
            <span className="mt-4 inline-flex translate-y-2 items-center gap-3 text-[0.72rem] uppercase tracking-[0.18em] text-ambient-micro opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
              <span className="block h-[1px] w-8 bg-white/60" />
              {viewLabel}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
