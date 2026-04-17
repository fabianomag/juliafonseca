"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform, type PanInfo } from "framer-motion";
import type { Project } from "@/lib/projects";
import { withLang, type Lang } from "@/lib/i18n";
import { BrandMark } from "./brand-mark";

export function FeaturedProjectShowcase({
  projects,
  lang,
}: {
  projects: Project[];
  lang: Lang;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const cardY = useTransform(scrollYProgress, [0, 1], [72, -72]);
  const brandY = useTransform(scrollYProgress, [0, 1], [48, -64]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  if (projects.length === 0) {
    return null;
  }

  const activeProject = projects[activeIndex];

  const moveTo = (nextIndex: number) => {
    const normalizedIndex = (nextIndex + projects.length) % projects.length;
    if (normalizedIndex === activeIndex) {
      return;
    }

    const delta =
      normalizedIndex > activeIndex ||
      (activeIndex === projects.length - 1 && normalizedIndex === 0)
        ? 1
        : -1;

    setDirection(delta);
    setActiveIndex(normalizedIndex);
  };

  const paginate = (step: number) => {
    setDirection(step);
    setActiveIndex((current) => (current + step + projects.length) % projects.length);
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipePower = Math.abs(info.offset.x) * Math.sign(info.offset.x) + info.velocity.x * 16;

    if (swipePower <= -140) {
      paginate(1);
    } else if (swipePower >= 140) {
      paginate(-1);
    }
  };

  const imageVariants = {
    enter: (customDirection: number) => ({
      opacity: 0,
      x: customDirection >= 0 ? 56 : -56,
      scale: 1.02,
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
    exit: (customDirection: number) => ({
      opacity: 0,
      x: customDirection >= 0 ? -56 : 56,
      scale: 0.985,
    }),
  };

  const cardVariants = {
    enter: (customDirection: number) => ({
      opacity: 0,
      y: customDirection >= 0 ? 28 : -28,
    }),
    center: {
      opacity: 1,
      y: 0,
    },
    exit: (customDirection: number) => ({
      opacity: 0,
      y: customDirection >= 0 ? -24 : 24,
    }),
  };

  return (
    <div ref={containerRef} className="relative isolate overflow-hidden pb-4 md:pb-8">
      <motion.div
        style={{ y: brandY }}
        className="pointer-events-none absolute -right-24 top-6 hidden md:block"
      >
        <div className="origin-top-right scale-[2.8] opacity-[0.08] blur-[1px] saturate-0 xl:scale-[3.5]">
          <BrandMark lang={lang} />
        </div>
      </motion.div>

      <div className="relative ml-auto w-full md:w-[92%] xl:w-[96%]">
        <div className="relative aspect-[1.68/1] overflow-hidden md:aspect-[1.8/1]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeProject.slug}
              custom={direction}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.62, ease: "easeOut" }}
              drag={projects.length > 1 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.14}
              dragMomentum={false}
              onDragEnd={handleDragEnd}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
            >
              <Link
                href={withLang(`/${activeProject.section}/${activeProject.slug}`, lang)}
                className="block h-full w-full"
              >
                <Image
                  src={activeProject.cover}
                  alt={activeProject.title}
                  fill
                  priority={activeIndex === 0}
                  sizes="(max-width: 768px) 100vw, 89vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(25,20,17,0.02)_0%,rgba(25,20,17,0.12)_58%,rgba(25,20,17,0.32)_100%)]" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="relative z-10 mt-8 grid gap-10 md:-mt-24 lg:grid-cols-[minmax(0,31rem)_1fr] lg:items-end xl:-mt-28">
        <motion.div
          style={{ y: cardY }}
          className="max-w-[31rem] bg-ambient-micro/95 p-8 shadow-[0_24px_60px_rgba(32,24,21,0.08)] backdrop-blur-md sm:p-10"
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={`card-${activeProject.slug}`}
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.42, ease: "easeOut" }}
            >
              <p className="text-label text-ambient-muted">
                {activeProject.category} · {activeProject.year}
              </p>
              <h2 className="mt-4 font-display text-[2.65rem] uppercase leading-[0.84] tracking-[0.04em] text-ambient-dark sm:text-[3.3rem]">
                {activeProject.title}
              </h2>
              <p className="mt-5 max-w-sm font-serif text-[1.08rem] leading-[1.85] text-ambient-dark/72 sm:text-[1.14rem]">
                {activeProject.description}
              </p>
              <Link
                href={withLang(`/${activeProject.section}/${activeProject.slug}`, lang)}
                className="mt-10 inline-flex items-center gap-5 text-lg uppercase tracking-[0.14em] text-ambient-muted transition-colors hover:text-ambient-electric sm:text-xl"
              >
                <span className="block h-[2px] w-14 bg-ambient-electric" />
                {lang === "pt" ? "Ver o projeto" : "View project"}
              </Link>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <div className="flex flex-col gap-8 lg:items-end lg:pb-4">
          <div className="flex items-center gap-4">
            {projects.map((project, index) => (
              <button
                key={project.slug}
                type="button"
                onClick={() => moveTo(index)}
                aria-label={`${lang === "pt" ? "Ir para" : "Go to"} ${project.title}`}
                className="group flex h-5 w-5 items-center justify-center"
              >
                <span
                  className={`block h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? "scale-110 bg-ambient-electric"
                      : "bg-ambient-stone group-hover:bg-ambient-canyon"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-6 text-[0.78rem] uppercase tracking-[0.2em] text-ambient-muted">
            <span>
              {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
            <Link
              href={withLang("/projetos", lang)}
              className="inline-flex items-center gap-5 text-lg uppercase tracking-[0.14em] text-ambient-muted transition-colors hover:text-ambient-electric sm:text-xl"
            >
              <span className="block h-[2px] w-14 bg-ambient-electric" />
              {lang === "pt" ? "Ver todos os projetos" : "View all projects"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
