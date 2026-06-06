"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
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
    all: "Todos",
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
    all: "All",
    empty: "No projects found for the selected filters.",
  },
} as const;

const VALID_CATEGORIES = ["residencial", "comercial", "interiores"];
const VALID_STATUSES: ProjectStatus[] = ["completed", "in_progress"];

export function ProjectsFilter({
  projects,
  lang = "pt",
}: Omit<ProjectsFilterProps, "initialCategory" | "initialStatus">) {
  const searchParams = useSearchParams();
  const rawCategory = searchParams.get("categoria");
  const rawStatus = searchParams.get("status") as ProjectStatus | null;
  const urlCategory = rawCategory && VALID_CATEGORIES.includes(rawCategory) ? rawCategory : null;
  const urlStatus = rawStatus && VALID_STATUSES.includes(rawStatus) ? rawStatus : null;

  const controlsRef = useRef<HTMLDivElement | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(urlCategory);
  const [activeStatus, setActiveStatus] = useState<ProjectStatus | null>(urlStatus);
  const labels = copy[lang];

  // Sincroniza o state com a URL sempre que os search params mudarem
  useEffect(() => {
    setActiveCategory(urlCategory);
    setActiveStatus(urlStatus);
  }, [urlCategory, urlStatus]);

  // Scroll automático para os filtros quando chega com filtro ativo via URL
  const didScrollRef = useRef(false);
  useEffect(() => {
    if (didScrollRef.current) return;
    if (!urlCategory && !urlStatus) return;
    didScrollRef.current = true;
    const timer = setTimeout(() => {
      const el = controlsRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: "auto" });
    }, 180);
    return () => clearTimeout(timer);
  }, [urlCategory, urlStatus]);

  useEffect(() => {
    if (!activeCategory && !activeStatus) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      // em touch, não deseleciona ao clicar fora — o botão "Todos" faz esse papel
      if (event.pointerType === "touch") return;
      // não deseleciona se clicou nos controles de filtro
      if (controlsRef.current?.contains(event.target as Node)) return;
      // não deseleciona se clicou num link ou filho de link (card de projeto)
      const target = event.target as HTMLElement;
      if (target.closest("a")) return;

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
        id="filtros"
        className="section-padding mx-auto mb-10 flex max-w-[74rem] flex-wrap items-center justify-center gap-3 md:mb-14 md:gap-4"
      >
        {/* Botão "Todos" — só mobile, para limpar filtro sem depender de clicar fora */}
        {(activeCategory || activeStatus) && (
          <button
            type="button"
            onClick={() => { setActiveCategory(null); setActiveStatus(null); }}
            className="md:hidden min-w-[9.3rem] border border-ambient-cyan bg-transparent px-4 py-3 text-[0.98rem] uppercase tracking-[0.14em] text-ambient-cyan transition-colors"
          >
            {labels.all}
          </button>
        )}

        {labels.categories.map((cat) => (
          <button
            key={cat.label}
            type="button"
            onClick={() => setActiveCategory((current) => (current === cat.value ? null : cat.value))}
            className={`min-w-[9.3rem] border px-4 py-3 text-[0.98rem] uppercase tracking-[0.14em] transition-colors md:min-w-[9.7rem] md:px-5 md:text-[1.02rem] ${
              activeCategory === cat.value
                ? "border-ambient-cyan bg-ambient-cyan text-black"
                : "border-white/20 bg-transparent text-white/55 hover:border-white/50 hover:text-white"
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
                ? "border-ambient-cyan bg-ambient-cyan text-black"
                : "border-white/20 bg-transparent text-white/55 hover:border-white/50 hover:text-white"
            }`}
          >
            {st.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-x-0 gap-y-5 py-3 sm:grid-cols-2 sm:gap-y-6 sm:py-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-y-7 xl:py-5">
        {filtered.map((project, i) => (
          <div key={project.slug}>
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
