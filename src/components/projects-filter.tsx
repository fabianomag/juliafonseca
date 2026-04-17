"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Project, ProjectStatus } from "@/lib/projects";
import { ProjectCard } from "./project-card";
import type { Lang } from "@/lib/i18n";

interface ProjectsFilterProps {
  projects: Project[];
  initialCategory?: string | null;
  initialStatus?: ProjectStatus | null;
  lang?: Lang;
}

const copy = {
  pt: {
    categories: [
      { value: "residencial", label: "Residencial" },
      { value: "comercial", label: "Comercial" },
      { value: "interiores", label: "Interiores" },
    ],
    statuses: [
      { value: "completed" as ProjectStatus, label: "Concluídos" },
      { value: "in_progress" as ProjectStatus, label: "Em andamento" },
    ],
    empty: "Nenhum projeto encontrado com os filtros selecionados.",
  },
  en: {
    categories: [
      { value: "residencial", label: "Residential" },
      { value: "comercial", label: "Commercial" },
      { value: "interiores", label: "Interiors" },
    ],
    statuses: [
      { value: "completed" as ProjectStatus, label: "Completed" },
      { value: "in_progress" as ProjectStatus, label: "In progress" },
    ],
    empty: "No projects found for the selected filters.",
  },
} as const;

export function ProjectsFilter({
  projects,
  initialCategory = null,
  initialStatus = null,
  lang = "pt",
}: ProjectsFilterProps) {
  const controlsRef = useRef<HTMLDivElement | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(initialCategory);
  const [activeStatus, setActiveStatus] = useState<ProjectStatus | null>(initialStatus);
  const labels = copy[lang];

  useEffect(() => {
    if (!activeCategory && !activeStatus) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (controlsRef.current?.contains(event.target as Node)) {
        return;
      }

      setActiveCategory(null);
      setActiveStatus(null);
    };

    window.addEventListener("pointerdown", handlePointerDown);
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, [activeCategory, activeStatus]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (activeCategory && p.section !== activeCategory) return false;
      if (activeStatus && p.status !== activeStatus) return false;
      return true;
    });
  }, [projects, activeCategory, activeStatus]);

  return (
    <div>
      <div
        ref={controlsRef}
        className="section-padding mx-auto mb-16 flex max-w-[74rem] flex-wrap items-center justify-center gap-3 md:mb-20 md:gap-4"
      >
        {labels.categories.map((cat) => (
          <button
            key={cat.label}
            type="button"
            onClick={() => setActiveCategory((current) => (current === cat.value ? null : cat.value))}
            className={`min-w-[9.3rem] border px-4 py-3 text-[0.98rem] uppercase tracking-[0.14em] transition-colors md:min-w-[9.7rem] md:px-5 md:text-[1.02rem] ${
              activeCategory === cat.value
                ? "border-ambient-electric bg-white text-ambient-electric"
                : "border-transparent bg-[#e8e8e8] text-ambient-dark/68 hover:bg-[#dddddd]"
            }`}
          >
            {cat.label}
          </button>
        ))}
        {labels.statuses.map((st) => (
          <button
            key={st.label}
            type="button"
            onClick={() => setActiveStatus((current) => (current === st.value ? null : st.value))}
            className={`min-w-[10rem] border px-4 py-3 text-[0.98rem] uppercase tracking-[0.14em] transition-colors md:min-w-[10.4rem] md:px-5 md:text-[1.02rem] ${
              activeStatus === st.value
                ? "border-ambient-electric bg-white text-ambient-electric"
                : "border-transparent bg-[#e8e8e8] text-ambient-dark/68 hover:bg-[#dddddd]"
            }`}
          >
            {st.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-0 border-t border-ambient-stone/15 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((project, i) => (
          <div key={project.slug} className="border-b border-ambient-stone/15">
            <ProjectCard project={project} index={i} lang={lang} />
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-32 text-center">
          <p className="text-lg text-ambient-muted">{labels.empty}</p>
        </div>
      )}
    </div>
  );
}
