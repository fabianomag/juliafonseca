"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import type { Project } from "@/lib/projects";
import { withLang, type Lang } from "@/lib/i18n";

type GridSpec = {
  cols: number;
  rows: number;
  vbWidth: number;
  vbHeight: number;
};

const copy = {
  pt: {
    kicker: "Julia Fonseca Arquitetura",
  },
  en: {
    kicker: "Julia Fonseca Architecture",
  },
} as const;

const initialGridSpec: GridSpec = {
  cols: 12,
  rows: 8,
  vbWidth: 100,
  vbHeight: 62.5,
};

const introRevealStorageKey = "jf-home-mask-intro-revealed";

function getGridCols(width: number) {
  if (width <= 599) return 5;
  if (width <= 1024) return 8;
  return 12;
}

function getGridSpec() {
  const vbWidth = 100;
  const targetWidth = typeof window === "undefined" ? 1600 : window.innerWidth;
  const targetHeight = typeof window === "undefined" ? 1000 : window.innerHeight;
  const vbHeight = (targetHeight / targetWidth) * 100;
  const cols = getGridCols(targetWidth);
  const rows = Math.round(cols * (vbHeight / vbWidth));

  return { cols, rows, vbWidth, vbHeight };
}

export function HomeMaskTransition({
  projects,
  lang,
}: {
  projects: Project[];
  lang: Lang;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const targetTimeRef = useRef(0);
  const renderedTimeRef = useRef(0);
  const scrubFrameRef = useRef<number | null>(null);
  const introTweenRef = useRef<gsap.core.Tween | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const maskIdPrefix = useId().replace(/:/g, "");
  const [grid, setGrid] = useState<GridSpec>(initialGridSpec);
  const [motionReady, setMotionReady] = useState(false);
  const [skipInitialReveal] = useState(
    () =>
      typeof window !== "undefined" &&
      window.sessionStorage.getItem(introRevealStorageKey) === "1",
  );

  const slides = useMemo(() => projects.slice(0, 3), [projects]);
  const t = copy[lang];

  useEffect(() => {
    if (!skipInitialReveal) {
      window.sessionStorage.setItem(introRevealStorageKey, "1");
    }
  }, [skipInitialReveal]);

  useEffect(() => {
    let resizeTimer: number | undefined;

    const update = () => {
      if (resizeTimer) window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => setGrid(getGridSpec()), 250);
    };

    update();
    window.addEventListener("resize", update);

    return () => {
      if (resizeTimer) window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const start = () => {
      setMotionReady(true);
    };
    const fallback = window.setTimeout(start, 3600);

    window.addEventListener("jf:intro-complete", start);

    return () => {
      window.clearTimeout(fallback);
      window.removeEventListener("jf:intro-complete", start);
    };
  }, []);

  useEffect(() => {
    if (!motionReady || !rootRef.current || slides.length === 0) return;

    const ctx = gsap.context(() => {
      const texts = gsap.utils.toArray<HTMLElement>("[data-mask-text]");
      const fills = gsap.utils.toArray<HTMLElement>("[data-progress-fill]");
      let firstSlideReadyTime = 0;
      const timeline = gsap.timeline({
        paused: true,
        onUpdate: () => {
          const totalSteps = fills.length;

          fills.forEach((fill, index) => {
            const stepProgress = gsap.utils.clamp(
              0,
              1,
              (timeline.progress() - index / totalSteps) * totalSteps,
            );
            fill.style.width = `${stepProgress * 100}%`;
          });
        },
      });
      timelineRef.current = timeline;

      texts.forEach((text) => {
        gsap.set(text, {
          clipPath: "inset(100% 0% 0% 0%)",
          y: 40,
        });
      });

      fills.forEach((fill) => gsap.set(fill, { width: "0%" }));

      slides.forEach((_, slideIndex) => {
        const ordered: SVGPolygonElement[] = [];

        gsap.set(`[data-mask-cells="${slideIndex}"] polygon`, { opacity: 0 });

        for (let x = 0; x < grid.cols; x += 1) {
          const column = gsap.utils.toArray<SVGPolygonElement>(
            `[data-mask-cells="${slideIndex}"] polygon[data-col="${x}"]`,
          );

          ordered.push(...gsap.utils.shuffle(column));
        }

        timeline.to(ordered, {
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: {
            each: 0.01,
          },
        });

        if (texts[slideIndex]) {
          timeline.to(
            texts[slideIndex],
            {
              clipPath: "inset(0% 0% 0% 0%)",
              y: 0,
              duration: 2.2,
              ease: "expo.out",
            },
            "-=0.3",
          );

          if (slideIndex === 0) {
            firstSlideReadyTime = timeline.duration();
          }

          if (slideIndex < slides.length - 1) {
            timeline.to(texts[slideIndex], {
              clipPath: "inset(0% 0% 100% 0%)",
              y: 0,
              duration: 1.6,
              ease: "power2.inOut",
            }, "+=0.8");
          }
        }
      });

      if (skipInitialReveal) {
        targetTimeRef.current = firstSlideReadyTime;
        renderedTimeRef.current = firstSlideReadyTime;
        timeline.totalTime(firstSlideReadyTime);
      } else {
        targetTimeRef.current = firstSlideReadyTime;
        introTweenRef.current = timeline.tweenTo(firstSlideReadyTime, {
          duration: 2.4,
          ease: "power2.out",
          onUpdate: () => {
            renderedTimeRef.current = timeline.totalTime();
          },
          onComplete: () => {
            renderedTimeRef.current = firstSlideReadyTime;
            targetTimeRef.current = firstSlideReadyTime;
            introTweenRef.current = null;
          },
        });
      }
    }, rootRef);

    return () => {
      if (scrubFrameRef.current != null) {
        window.cancelAnimationFrame(scrubFrameRef.current);
        scrubFrameRef.current = null;
      }
      introTweenRef.current?.kill();
      introTweenRef.current = null;
      timelineRef.current = null;
      ctx.revert();
    };
  }, [grid, motionReady, skipInitialReveal, slides]);

  useEffect(() => {
    if (slides.length === 0) return;

    const renderSmoothScrub = () => {
      const timeline = timelineRef.current;
      if (!timeline) {
        scrubFrameRef.current = null;
        return;
      }

      const current = renderedTimeRef.current;
      const target = targetTimeRef.current;
      const next = gsap.utils.interpolate(current, target, 0.15);
      const settled = Math.abs(target - next) < 0.002;

      renderedTimeRef.current = settled ? target : next;
      timeline.totalTime(renderedTimeRef.current);

      scrubFrameRef.current = settled
        ? null
        : window.requestAnimationFrame(renderSmoothScrub);
    };

    const requestSmoothScrub = () => {
      if (scrubFrameRef.current == null) {
        scrubFrameRef.current = window.requestAnimationFrame(renderSmoothScrub);
      }
    };

    const scrubTimeline = (delta: number) => {
      const timeline = timelineRef.current;
      if (!timeline) return;

      introTweenRef.current?.kill();
      introTweenRef.current = null;

      targetTimeRef.current = gsap.utils.clamp(
        0,
        timeline.duration(),
        targetTimeRef.current + delta * 0.0009,
      );
      requestSmoothScrub();
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      scrubTimeline(event.deltaY);
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      const currentY = event.touches[0]?.clientY;
      const previousY = touchStartYRef.current;
      if (currentY == null || previousY == null) return;

      event.preventDefault();
      scrubTimeline(previousY - currentY);
      touchStartYRef.current = currentY;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      if (scrubFrameRef.current != null) {
        window.cancelAnimationFrame(scrubFrameRef.current);
        scrubFrameRef.current = null;
      }
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [slides.length]);

  if (slides.length === 0) return null;

  const cellWidth = grid.vbWidth / grid.cols;
  const cellHeight = grid.vbHeight / grid.rows;

  return (
    <section
      ref={rootRef}
      className="relative h-screen overflow-hidden bg-black text-white"
      aria-label={t.kicker}
    >
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        {slides.map((project, slideIndex) => {
          const maskId = `${maskIdPrefix}-home-mask-${slideIndex}`;

          return (
            <svg
              key={project.slug}
              className="absolute inset-0 h-full w-full"
              viewBox={`0 0 ${grid.vbWidth} ${grid.vbHeight}`}
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <mask id={maskId} maskUnits="userSpaceOnUse">
                  <rect
                    x="0"
                    y="0"
                    width={grid.vbWidth}
                    height={grid.vbHeight}
                    fill="#000000"
                  />
                  <g data-mask-cells={slideIndex}>
                    {Array.from({ length: grid.rows }).map((_, row) =>
                      Array.from({ length: grid.cols }).map((__, col) => {
                        const x = col * cellWidth;
                        const y = row * cellHeight;
                        const x2 = x + cellWidth;
                        const y2 = y + cellHeight;
                        const flipDiagonal = (row + col) % 2 === 0;
                        const firstPoints = flipDiagonal
                          ? `${x},${y} ${x2},${y} ${x},${y2}`
                          : `${x},${y} ${x2},${y} ${x2},${y2}`;
                        const secondPoints = flipDiagonal
                          ? `${x2},${y} ${x2},${y2} ${x},${y2}`
                          : `${x},${y} ${x2},${y2} ${x},${y2}`;

                        return (
                          <g key={`${row}-${col}`}>
                            <polygon
                              points={firstPoints}
                              fill="#ffffff"
                              opacity="0"
                              data-col={col}
                              shapeRendering="crispEdges"
                            />
                            <polygon
                              points={secondPoints}
                              fill="#ffffff"
                              opacity="0"
                              data-col={col}
                              shapeRendering="crispEdges"
                            />
                          </g>
                        );
                      }),
                    )}
                  </g>
                </mask>
              </defs>
              <image
                href={project.cover}
                x="0"
                y="0"
                width={grid.vbWidth}
                height={grid.vbHeight}
                preserveAspectRatio="xMidYMid slice"
                mask={`url(#${maskId})`}
                className="brightness-[0.78]"
              />
            </svg>
          );
        })}
      </div>

      <div className="pointer-events-none absolute inset-0 z-20">
        {slides.map((project) => {
          const href = withLang(`/${project.section}/${project.slug}`, lang);
          const meta = [
            project.location,
            lang === "pt" ? "Brasil" : "Brazil",
            project.year,
          ]
            .filter(Boolean)
            .join(" | ");

          return (
            <div
              key={`text-${project.slug}`}
              data-mask-text
              className="absolute inset-0 flex translate-y-10 flex-col items-center justify-center overflow-hidden px-6 text-center text-white [clip-path:inset(100%_0%_0%_0%)]"
            >
              <Link
                href={href}
                className="pointer-events-auto inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              >
                <h1 className="font-display text-[clamp(1.15rem,1.35vw,1.7rem)] font-[560] uppercase leading-none tracking-[0.08em] text-white">
                  {project.title}
                </h1>
                {meta && (
                  <p className="mt-3 font-display text-[clamp(0.68rem,0.78vw,0.86rem)] uppercase leading-none tracking-[0.14em] text-white/84">
                    {meta}
                  </p>
                )}
              </Link>
            </div>
          );
        })}
      </div>

      <div className="absolute bottom-0 z-30 flex w-full gap-4 p-10">
        {slides.map((project) => (
          <div
            key={`progress-${project.slug}`}
            className="relative h-px flex-1 overflow-hidden bg-white/20"
            aria-hidden="true"
          >
            <div data-progress-fill className="absolute left-0 top-0 h-full w-0 bg-white" />
          </div>
        ))}
      </div>
    </section>
  );
}
