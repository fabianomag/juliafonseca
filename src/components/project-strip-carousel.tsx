"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import { withLang, type Lang } from "@/lib/i18n";

const copy = {
  pt: {
    title: "Próximos projetos",
    view: "Ver projeto",
  },
  en: {
    title: "Next projects",
    view: "View project",
  },
} as const;

export function ProjectStripCarousel({
  projects,
  lang,
}: {
  projects: Project[];
  lang: Lang;
}) {
  const labels = copy[lang];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isEngaged, setIsEngaged] = useState(false);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const hoverStepIntervalRef = useRef<number | null>(null);

  const items = useMemo(() => projects, [projects]);

  const stopHoverStepping = useCallback(() => {
    if (hoverStepIntervalRef.current !== null) {
      window.clearInterval(hoverStepIntervalRef.current);
      hoverStepIntervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isEngaged) return;

    const viewport = viewportRef.current;
    if (!viewport) return;

    const activeChild = viewport.children[activeIndex] as HTMLElement | undefined;
    if (!activeChild) return;

    const targetLeft =
      activeChild.offsetLeft - viewport.clientWidth / 2 + activeChild.clientWidth / 2;

    viewport.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: "smooth",
    });
  }, [activeIndex, isEngaged]);

  useEffect(() => () => stopHoverStepping(), [stopHoverStepping]);

  const goPrev = useCallback(() => {
    setActiveIndex((current) => Math.max(0, current - 1));
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((current) => Math.min(items.length - 1, current + 1));
  }, [items.length]);

  const startHoverStepping = useCallback(
    (direction: -1 | 1) => {
      stopHoverStepping();
      setIsEngaged(true);

      if ((direction === -1 && activeIndex === 0) || (direction === 1 && activeIndex === items.length - 1)) {
        return;
      }

      direction === -1 ? goPrev() : goNext();

      hoverStepIntervalRef.current = window.setInterval(() => {
        setActiveIndex((current) => {
          const next = current + direction;
          if (next < 0 || next > items.length - 1) {
            return current;
          }
          return next;
        });
      }, 900);
    },
    [activeIndex, goNext, goPrev, items.length, stopHoverStepping]
  );

  if (items.length === 0) {
    return null;
  }

  return (
    <section
      className="group border-t border-ambient-stone/20 bg-[#f4f2ee] py-10 md:py-12"
      onMouseLeave={() => {
        setIsEngaged(false);
        stopHoverStepping();
      }}
    >
      <div className="relative">
        <button
          type="button"
          aria-label={lang === "pt" ? "Anterior" : "Previous"}
          onMouseEnter={() => startHoverStepping(-1)}
          onMouseLeave={stopHoverStepping}
          onFocus={() => setIsEngaged(true)}
          className="absolute left-0 top-0 z-20 flex h-full w-12 items-center justify-center bg-gradient-to-r from-[#f4f2ee] via-[#f4f2ee]/88 to-transparent text-ambient-muted transition-colors hover:text-ambient-electric disabled:cursor-default disabled:opacity-0"
          disabled={activeIndex === 0}
        >
          <ChevronLeft size={26} strokeWidth={1.7} />
        </button>

        <div
          ref={viewportRef}
          data-lenis-prevent
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-3 pb-4 md:px-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          onWheel={(event) => {
            if (Math.abs(event.deltaY) < 10) return;
            event.preventDefault();
            setIsEngaged(true);
            if (event.deltaY > 0) {
              goNext();
            } else {
              goPrev();
            }
          }}
        >
          {items.map((item, index) => {
            const active = isEngaged && index === activeIndex;

            return active ? (
              <article
                key={item.slug}
                className="flex h-[13.7rem] min-w-[24rem] max-w-[24rem] shrink-0 snap-start flex-col items-center justify-center bg-[#f7f5f0] p-7 text-center text-ambient-dark md:h-[14.5rem] md:min-w-[25rem] md:max-w-[25rem] md:p-8"
              >
                <div className="max-w-[15rem]">
                  <p className="text-[0.78rem] uppercase tracking-[0.18em] text-ambient-muted">{item.category}</p>
                  <h3 className="mt-4 font-serif text-[1.7rem] leading-[1.15] text-ambient-muted md:text-[1.82rem]">
                    {item.title}
                  </h3>
                  <Link
                    href={withLang(`/${item.section}/${item.slug}`, lang)}
                    className="mt-8 inline-flex items-center gap-4 text-[0.82rem] uppercase tracking-[0.18em] text-ambient-muted transition-colors hover:text-ambient-electric"
                  >
                    <span className="block h-[1px] w-10 bg-ambient-electric" />
                    {labels.view}
                  </Link>
                </div>
              </article>
            ) : (
              <Link
                key={item.slug}
                href={withLang(`/${item.section}/${item.slug}`, lang)}
                onMouseEnter={() => {
                  setIsEngaged(true);
                  setActiveIndex(index);
                }}
                className="relative block h-[13.7rem] min-w-[24rem] max-w-[24rem] shrink-0 snap-start overflow-hidden bg-white md:h-[14.5rem] md:min-w-[25rem] md:max-w-[25rem]"
              >
                <Image
                  src={item.cover}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1280px) 65vw, 25rem"
                  className="object-cover transition-all duration-500"
                />
                {isEngaged && <div className="absolute inset-0 bg-white/68 transition-opacity duration-300" />}
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          aria-label={lang === "pt" ? "Próximo" : "Next"}
          onMouseEnter={() => startHoverStepping(1)}
          onMouseLeave={stopHoverStepping}
          onFocus={() => setIsEngaged(true)}
          className="absolute right-0 top-0 z-20 flex h-full w-12 items-center justify-center bg-gradient-to-l from-[#f4f2ee] via-[#f4f2ee]/88 to-transparent text-ambient-muted transition-colors hover:text-ambient-electric disabled:cursor-default disabled:opacity-0"
          disabled={activeIndex === items.length - 1}
        >
          <ChevronRight size={26} strokeWidth={1.7} />
        </button>
      </div>
    </section>
  );
}
