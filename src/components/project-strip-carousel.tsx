"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import { withLang, type Lang } from "@/lib/i18n";
import { getImageBlurDataURL } from "@/lib/image-placeholder";

const copy = {
  pt: { view: "Ver projeto" },
  en: { view: "View project" },
} as const;

export function ProjectStripCarousel({
  projects,
  lang,
}: {
  projects: Project[];
  lang: Lang;
}) {
  const labels = copy[lang];
  const viewportRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const scrollByCard = useCallback((direction: -1 | 1) => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const card = viewport.querySelector<HTMLElement>("[data-project-strip-card]");
    const distance = card ? card.offsetWidth + 16 : viewport.clientWidth * 0.72;
    viewport.scrollBy({ left: distance * direction, behavior: "auto" });
  }, []);

  if (projects.length === 0) return null;

  return (
    <section
      className="border-t project-blueprint-rule pb-10 pt-0 md:pb-12"
      onMouseLeave={() => {
        setHoveredIndex(null);
      }}
    >
      <div className="relative">
        {/* Seta esquerda */}
        <button
          type="button"
          aria-label={lang === "pt" ? "Anterior" : "Previous"}
          onClick={() => scrollByCard(-1)}
          className="absolute left-0 top-0 z-20 flex h-full w-14 items-center justify-center bg-gradient-to-r from-black/42 via-black/16 to-transparent text-white/34 transition-colors hover:text-ambient-electric"
        >
          <ChevronLeft size={26} strokeWidth={1.7} />
        </button>

        <div
          ref={viewportRef}
          className="overflow-x-auto px-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div
            className="flex w-max gap-3 pb-4 md:gap-4"
            style={{ width: "max-content" }}
          >
            {projects.map((item, index) => {
              const isHovered = hoveredIndex === index;

              return (
                <Link
                  key={item.slug}
                  data-project-strip-card
                  href={withLang(`/${item.section}/${item.slug}`, lang)}
                  className="group relative h-[13.7rem] w-[24rem] shrink-0 overflow-hidden md:h-[14.5rem] md:w-[25rem]"
                  onMouseEnter={() => {
                    setHoveredIndex(index);
                  }}
                  onMouseLeave={() => {
                    setHoveredIndex(null);
                  }}
                >
                  <Image
                    src={item.cover}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1280px) 65vw, 25rem"
                    className="object-cover grayscale transition-[filter] duration-500 ease-out group-hover:grayscale-0"
                    placeholder="blur"
                    blurDataURL={getImageBlurDataURL("#d1dde1", "#a8c3ce", "#eef4f6")}
                  />

                  {/* Overlay escuro + texto no hover */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-7">
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-ambient-dark/70 via-ambient-dark/20 to-transparent transition-opacity duration-500 ease-out"
                      style={{ opacity: isHovered ? 1 : 0 }}
                    />
                    <div
                      className="relative z-10 transition-all duration-500 ease-out"
                      style={{
                        opacity: isHovered ? 1 : 0,
                        transform: isHovered ? "translateY(0)" : "translateY(8px)",
                      }}
                    >
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-ambient-micro/80">
                        {item.category}
                      </p>
                      <h3 className="mt-1.5 font-display text-[1.45rem] uppercase leading-[1.1] tracking-[-0.03em] text-ambient-micro md:text-[1.55rem]">
                        {item.title}
                      </h3>
                      <span className="mt-4 inline-flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.18em] text-ambient-micro">
                        <span className="block h-[1px] w-8 bg-white/60" />
                        {labels.view}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Seta direita */}
        <button
          type="button"
          aria-label={lang === "pt" ? "Próximo" : "Next"}
          onClick={() => scrollByCard(1)}
          className="absolute right-0 top-0 z-20 flex h-full w-14 items-center justify-center bg-gradient-to-l from-black/42 via-black/16 to-transparent text-white/34 transition-colors hover:text-ambient-electric"
        >
          <ChevronRight size={26} strokeWidth={1.7} />
        </button>
      </div>
    </section>
  );
}
