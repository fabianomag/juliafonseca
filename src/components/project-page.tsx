"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Project } from "@/lib/projects";
import { Reveal } from "./reveal";
import { ParallaxGallery } from "./parallax-gallery";
import type { Lang } from "@/lib/i18n";
import { ProjectStripCarousel } from "./project-strip-carousel";
import { getImageBlurDataURL } from "@/lib/image-placeholder";

interface ProjectPageProps {
  project: Project;
  relatedProjects?: Project[];
  lang?: Lang;
}

const copy = {
  pt: {
    scroll: "Desça para explorar",
    year: "Ano",
    location: "Localização",
    area: "Área",
    type: "Tipologia",
  },
  en: {
    scroll: "Scroll to explore",
    year: "Year",
    location: "Location",
    area: "Area",
    type: "Type",
  },
} as const;

const brazilianStates: Record<string, string> = {
  AC: "Acre",
  AL: "Alagoas",
  AP: "Amapá",
  AM: "Amazonas",
  BA: "Bahia",
  CE: "Ceará",
  DF: "Distrito Federal",
  ES: "Espírito Santo",
  GO: "Goiás",
  MA: "Maranhão",
  MT: "Mato Grosso",
  MS: "Mato Grosso do Sul",
  MG: "Minas Gerais",
  PA: "Pará",
  PB: "Paraíba",
  PR: "Paraná",
  PE: "Pernambuco",
  PI: "Piauí",
  RJ: "Rio de Janeiro",
  RN: "Rio Grande do Norte",
  RS: "Rio Grande do Sul",
  RO: "Rondônia",
  RR: "Roraima",
  SC: "Santa Catarina",
  SP: "São Paulo",
  SE: "Sergipe",
  TO: "Tocantins",
};

function getLocationParts(location: string) {
  const [city = location, state = ""] = location.split(",").map((part) => part.trim());
  return {
    city,
    state: brazilianStates[state.toUpperCase()] ?? state,
  };
}

export function ProjectPage({ project, relatedProjects = [], lang = "pt" }: ProjectPageProps) {
  const heroRef = useRef<HTMLElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const heroOverlayRef = useRef<HTMLDivElement>(null);
  const t = copy[lang];
  const categoryLabel =
    lang === "en"
      ? {
        Residencial: "Residential",
        Comercial: "Commercial",
        Interiores: "Interiors",
      }[project.category] ?? project.category
      : project.category;
  const projectMeta = [
    { label: t.year, value: project.year },
    { label: t.type, value: categoryLabel },
    { label: t.area, value: project.area },
    { label: t.location, value: project.location },
  ].filter((item) => item.value);
  const locationParts = getLocationParts(project.location);

  useEffect(() => {
    const hero = heroRef.current;
    const image = heroImageRef.current;
    const overlay = heroOverlayRef.current;

    if (!hero || !image || !overlay) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const updateHero = () => {
      const rect = hero.getBoundingClientRect();
      const scrollable = Math.max(rect.height - window.innerHeight, 1);
      const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1);
      const shift = -6 + progress * 16;

      image.style.transform = `translate3d(0, ${shift}svh, 0) scale(1.025)`;
      overlay.style.opacity = `${0.28 + progress * 0.34}`;
    };

    const requestUpdate = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateHero);
    };

    updateHero();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <div className="project-blueprint-surface min-h-screen bg-black text-white selection:bg-ambient-electric/18">
      <section ref={heroRef} className="relative min-h-[180svh] overflow-hidden bg-black text-white">
        <div
          ref={heroImageRef}
          className="absolute inset-x-0 top-[-5svh] h-[110%] origin-center will-change-transform"
        >
          <Image
            src={project.cover}
            alt={project.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
            placeholder="blur"
            blurDataURL={getImageBlurDataURL()}
          />
        </div>
        <div ref={heroOverlayRef} className="absolute inset-0 bg-[#080807] opacity-[0.28]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/6 via-transparent to-black/62" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/28 via-transparent to-black/10" />

        <div className="relative z-10 mx-auto flex min-h-[180svh] w-full max-w-none flex-col px-5 md:px-8">
          <div className="flex min-h-screen flex-col justify-end pb-7 pt-28 md:pb-8 lg:pt-32">
            <Reveal delay={0.08}>
              <h1 className="max-w-[10ch] font-display text-[clamp(5.6rem,19vw,9rem)] font-[530] uppercase leading-[0.86] tracking-normal text-white md:text-[clamp(7rem,8.8vw,9rem)]">
                {project.title}
              </h1>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="mt-10 grid w-full gap-4 font-display text-[0.76rem] font-[650] uppercase tracking-normal text-white sm:grid-cols-3 md:mt-12 lg:text-[0.9rem]">
                <p className="justify-self-start">{locationParts.city}</p>
                <p className="justify-self-start sm:justify-self-center">{locationParts.state}</p>
                <p className="justify-self-start sm:justify-self-end">({t.scroll})</p>
              </div>
            </Reveal>
          </div>

          <div className="relative min-h-[80svh] pb-12 pt-0 lg:absolute lg:inset-x-0 lg:top-[100svh] lg:h-[80svh] lg:min-h-0 lg:px-8">
            <Reveal delay={0.16}>
              <div className="relative h-full">
                <div className="max-w-[40rem] text-[1.25rem] font-[500] leading-[1.18] text-white sm:text-[1.45rem] lg:absolute lg:left-[50.2%] lg:top-[34svh] lg:text-[1.58rem]">
                  <div className="space-y-6 lg:space-y-7">
                    {project.description && <p>{project.description}</p>}
                    <p>
                      A narrativa do projeto se constrói por proporção, materialidade e sequência
                      de espaços, valorizando o que a arquitetura tem de mais silencioso e marcante.
                    </p>
                    <p>
                      Cada imagem reforça a passagem entre presença, atmosfera e detalhe,
                      preservando a leitura do conjunto antes do ornamento.
                    </p>
                  </div>
                </div>

                <dl className="mt-12 grid max-w-[44rem] gap-x-20 gap-y-9 text-white sm:grid-cols-2 lg:absolute lg:bottom-[5.5svh] lg:left-[50.2%] lg:mt-0 lg:w-[42rem]">
                  {projectMeta.map((item) => (
                    <div key={item.label}>
                      <dt className="font-display text-[0.74rem] font-[530] uppercase tracking-normal text-white/76 lg:text-[0.86rem]">
                        {item.label}
                      </dt>
                      <dd className="mt-3 font-display text-[0.82rem] font-[650] uppercase leading-tight text-white lg:text-[0.96rem]">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {project.images.length > 1 && (
        <section className="bg-transparent pb-20">
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
