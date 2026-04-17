"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Project } from "@/lib/projects";
import { Reveal } from "./reveal";
import { ParallaxGallery } from "./parallax-gallery";
import { withLang, type Lang } from "@/lib/i18n";
import { ProjectStripCarousel } from "./project-strip-carousel";

interface ProjectPageProps {
  project: Project;
  relatedProjects?: Project[];
  lang?: Lang;
}

const copy = {
  pt: {
    allProjects: "Todos os projetos",
    info: "Informações",
    year: "Ano",
    location: "Localização",
    area: "Área",
    type: "Tipologia",
    narrativeTitleTop: "Matéria, luz",
    narrativeTitleBottom: "e permanência.",
  },
  en: {
    allProjects: "All projects",
    info: "Information",
    year: "Year",
    location: "Location",
    area: "Area",
    type: "Type",
    narrativeTitleTop: "Matter, light",
    narrativeTitleBottom: "and permanence.",
  },
} as const;

export function ProjectPage({ project, relatedProjects = [], lang = "pt" }: ProjectPageProps) {
  const t = copy[lang];
  const categoryLabel =
    lang === "en"
      ? {
        Residencial: "Residential",
        Comercial: "Commercial",
        Interiores: "Interiors",
      }[project.category] ?? project.category
      : project.category;

  return (
    <div className="min-h-screen bg-ambient-micro text-ambient-dark selection:bg-ambient-canyon/20">
      <section className="relative flex min-h-[84vh] w-full items-end overflow-hidden border-b border-ambient-stone/40 bg-ambient-linen pb-12 section-padding md:min-h-[94vh]">
        <Image
          src={project.cover}
          alt={project.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ambient-dark/40 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-ambient-micro/30 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-end">
          <Reveal>
            <Link
              href={withLang("/projetos", lang)}
              className="group mb-10 inline-flex items-center gap-4 text-detail uppercase text-ambient-micro transition-colors hover:text-ambient-linen"
            >
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-2" /> {t.allProjects}
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="max-w-5xl">
              <p className="mb-4 text-label uppercase text-ambient-micro/85">{categoryLabel}</p>
              <h1 className="font-display text-[18vw] uppercase leading-[0.8] tracking-[-0.06em] text-ambient-micro sm:text-[13vw] lg:text-[9rem]">
                {project.title}
              </h1>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ambient-micro py-24 section-padding md:py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div className="self-start border-t border-ambient-stone/50 pt-6 lg:sticky lg:top-32">
            <Reveal>
              <h3 className="mb-6 text-label uppercase text-ambient-canyon/60">{t.info}</h3>
              <dl className="grid grid-cols-2 gap-y-8 gap-x-6 lg:grid-cols-1">
                {[
                  { label: t.year, value: project.year },
                  { label: t.location, value: project.location },
                  { label: t.area, value: project.area },
                  { label: t.type, value: categoryLabel },
                ].map((item) => (
                  <div key={item.label}>
                    <dt className="mb-2 text-[0.74rem] uppercase tracking-[0.18em] text-ambient-canyon/55">
                      {item.label}
                    </dt>
                    <dd className="text-lg text-ambient-dark">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <div className="max-w-3xl">
            <Reveal delay={0.2}>
              <div className="mb-10 h-[1px] w-16 bg-ambient-stone" />
              <h2 className="mb-8 font-display text-4xl uppercase leading-[0.88] tracking-[-0.05em] text-ambient-dark sm:text-[4.8rem]">
                {t.narrativeTitleTop}
                <span className="block italic text-ambient-electric">{t.narrativeTitleBottom}</span>
              </h2>
              <div className="space-y-6 text-lg leading-relaxed text-ambient-canyon/85 md:text-xl">
                <p>{project.description}</p>
                <p>
                  A narrativa do projeto se constrói por proporção, materialidade e sequência de
                  espaços, valorizando o que a arquitetura tem de mais silencioso e marcante.
                </p>
                <p>
                  Cada imagem reforça a passagem entre presença, atmosfera e detalhe, preservando
                  a leitura do conjunto antes do ornamento.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {project.images.length > 1 && (
        <section className="bg-ambient-micro pb-20">
          <Reveal>
            <ParallaxGallery images={project.images.slice(1)} />
          </Reveal>
        </section>
      )}

      {relatedProjects.length > 0 && (
        <ProjectStripCarousel projects={relatedProjects} lang={lang} />
      )}
    </div>
  );
}
