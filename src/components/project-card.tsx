import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
  index?: number;
  size?: "default" | "large";
}

export function ProjectCard({ project, index = 0, size = "default" }: ProjectCardProps) {
  const isLarge = size === "large";

  return (
    <Link
      href={`/${project.section}/${project.slug}`}
      className="group block"
    >
      <div
        className={`image-hover relative ${isLarge ? "aspect-[4/3]" : "aspect-[3/4]"} bg-stone-200`}
      >
        <Image
          src={project.cover}
          alt={`${project.title} — ${project.category}`}
          fill
          className="object-cover"
          sizes={isLarge ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
          loading={index < 3 ? "eager" : "lazy"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <p className="text-white/70 text-xs tracking-widest uppercase mb-1">
            {project.location} &middot; {project.year}
          </p>
          <p className="text-white text-sm leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>
      </div>
      <div className="mt-4 flex items-baseline justify-between">
        <h3 className="font-display text-lg text-stone-900 group-hover:text-stone-600 transition-colors">
          {project.title}
        </h3>
        <span className="text-xs text-stone-400 tracking-wider uppercase">
          {project.area}
        </span>
      </div>
    </Link>
  );
}
