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
    country: "Brasil",
    year: "Ano",
    type: "Tipologia",
    collaborators: "Colaboradores",
    photography: "Fotografia",
  },
  en: {
    scroll: "Scroll to explore",
    country: "Brazil",
    year: "Year",
    type: "Project Type",
    collaborators: "Collaborators",
    photography: "Photography",
  },
} as const;

function getDescriptionParagraphs(
  project: Project,
  categoryLabel: string,
  location: string,
  lang: Lang,
) {
  const paragraphs = project.description
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  if (paragraphs.length > 0) {
    return paragraphs;
  }

  return [
    lang === "en"
      ? `${categoryLabel} project in ${location}.`
      : `${categoryLabel} em ${location}.`,
  ];
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

  const descriptionParagraphs = getDescriptionParagraphs(project, categoryLabel, project.location, lang);
  const galleryImages = Array.from(new Set(project.images.filter((image) => image && image !== project.cover)));

  const detailMeta = [
    { label: t.year, value: project.year },
    { label: t.type, value: categoryLabel },
    { label: t.collaborators, value: "Julia Fonseca Arquitetura" },
    { label: t.photography, value: "Julia Fonseca Arquitetura" },
  ].filter((item) => item.value);

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
      const shift = -4 + progress * 12;

      image.style.transform = `translate3d(0, ${shift}svh, 0) scale(1.018)`;
      overlay.style.opacity = `${0.16 + progress * 0.24}`;
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
    <div className="relative min-h-screen bg-[#1a1d21] text-white selection:bg-ambient-electric/18">
      {/* ══════ HERO ══════ */}
      <section ref={heroRef} className="relative h-[175svh] overflow-hidden text-white">
        <div
          ref={heroImageRef}
          className="absolute inset-x-0 top-[-4svh] h-[108%] origin-center will-change-transform"
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
        <div ref={heroOverlayRef} className="absolute inset-0 bg-[#090909] opacity-[0.2]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/3 via-transparent to-black/48" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/6" />

        {/* Content wrapper — same side padding as global site */}
        <div className="site-shell-padding relative z-10 flex h-[175svh] w-full flex-col">

          {/* ── VIEWPORT 1: Title + Footer bar ── */}
          <div className="flex h-[100svh] flex-col justify-end">
            {/* Title */}
            <Reveal delay={0.08} clip={false}>
              <h1 className="mb-[clamp(2.8rem,2rem+3vw,5.5rem)] max-w-[12ch] font-display text-[clamp(4rem,9vw,12rem)] font-[500] uppercase leading-[0.92] tracking-[-0.04em] text-white [text-box-trim:trim-both]">
                {project.title}
              </h1>
            </Reveal>

            <div className="site-chrome-grid site-chrome-grid--end pb-8 font-display text-[0.92rem] font-[530] uppercase leading-none tracking-[0.02em] text-white md:pb-10 md:text-[0.98rem] lg:pb-12 lg:text-[1.03rem]">
              <p className="min-w-0 justify-self-start">{project.location}</p>
              <p className="site-chrome-main justify-self-start">{t.country}</p>
              <p className="justify-self-end text-right whitespace-nowrap">({t.scroll})</p>
            </div>
          </div>

          {/* ── VIEWPORT 2: description + metadata — shared center column with country ── */}
          <div className="flex h-[75svh] flex-col">
            <Reveal delay={0.16}>
              <div className="site-chrome-grid site-chrome-grid--end h-full content-start pt-[5svh] max-lg:grid-cols-1 lg:pt-[7svh]">
                <div aria-hidden className="hidden lg:block" />
                <div className="site-chrome-main">
                  <div className="max-w-[32ch] text-[1.32rem] font-[400] leading-[1.34] tracking-[-0.01em] text-white sm:text-[1.38rem] lg:text-[1.48rem] lg:leading-[1.32] xl:max-w-[34ch]">
                    <div className="space-y-6 lg:space-y-7">
                      {descriptionParagraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>

                  <div className="my-11 h-px w-full bg-white/28 lg:my-14" />

                  <dl className="grid max-w-[34rem] gap-x-16 gap-y-9 sm:grid-cols-2 lg:gap-y-11">
                    {detailMeta.map((item) => (
                      <div key={item.label} className="flex flex-col gap-2">
                        <dt className="font-display text-[0.98rem] font-[400] capitalize tracking-[-0.005em] text-white/62 lg:text-[1.05rem]">
                          {item.label}
                        </dt>
                        <dd className="font-display text-[1.02rem] font-[700] uppercase leading-[1.22] tracking-[0.02em] text-white lg:text-[1.08rem]">
                          {item.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div aria-hidden className="hidden lg:block" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════ GALLERY ══════ */}
      {galleryImages.length > 0 && (
        <section>
          <ParallaxGallery images={galleryImages} />
        </section>
      )}

      {/* ══════ RELATED PROJECTS ══════ */}
      {relatedProjects.length > 0 && (
        <ProjectStripCarousel projects={relatedProjects} lang={lang} />
      )}
    </div>
  );
}
