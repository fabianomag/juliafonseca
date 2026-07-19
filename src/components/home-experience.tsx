"use client";

/**
 * Random-grid SVG mask transition adapted from Hiroki/Codrops' MIT-licensed
 * Scroll-Transition demo. Full notice: /THIRD_PARTY_NOTICES.md.
 */
import Link from "next/link";
import Image from "next/image";
import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  getProjectRoute,
  type Locale,
  type LocalizedProject,
  type LocalizedSiteContent,
} from "@/content/site";

type Grid = {
  cols: number;
  rows: number;
  width: number;
  height: number;
};

const initialGrid: Grid = { cols: 14, rows: 9, width: 100, height: 62.5 };

function getGrid(): Grid {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const cols = viewportWidth <= 599 ? 6 : viewportWidth <= 1024 ? 10 : 14;
  const width = 100;
  const height = (viewportHeight / viewportWidth) * width;
  return {
    cols,
    rows: Math.max(1, Math.round(cols * (height / width))),
    width,
    height,
  };
}

export function HomeExperience({
  locale,
  projects,
  copy,
}: {
  locale: Locale;
  projects: readonly LocalizedProject[];
  copy: LocalizedSiteContent["home"];
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLElement>(null);
  const maskPrefix = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [grid, setGrid] = useState<Grid>(initialGrid);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(media.matches);
    let timer = 0;
    const updateGrid = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setGrid(getGrid()), 250);
    };

    const initialFrame = window.requestAnimationFrame(() => {
      updateMotion();
      setGrid(getGrid());
    });
    media.addEventListener("change", updateMotion);
    window.addEventListener("resize", updateGrid);

    return () => {
      window.clearTimeout(timer);
      window.cancelAnimationFrame(initialFrame);
      media.removeEventListener("change", updateMotion);
      window.removeEventListener("resize", updateGrid);
    };
  }, []);

  useLayoutEffect(() => {
    if (reducedMotion || !rootRef.current || !stageRef.current) return;

    gsap.registerPlugin(ScrollTrigger);
    const root = rootRef.current;
    const stage = stageRef.current;

    const context = gsap.context(() => {
      const texts = gsap.utils.toArray<HTMLElement>("[data-home-text]");
      const fills = gsap.utils.toArray<HTMLElement>("[data-progress-fill]");

      gsap.set(texts, {
        clipPath: "inset(100% 0% 0% 0%)",
        y: 40,
      });
      gsap.set(fills, { width: "0%" });

      const master = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: "bottom bottom",
          scrub: 2.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      projects.forEach((_, index) => {
        const cells = Array.from(
          root.querySelectorAll<SVGRectElement>(`[data-grid-cells="${index}"] [data-grid-cell]`),
        );
        const shuffled = gsap.utils.shuffle(cells);

        gsap.set(cells, { opacity: 0 });
        master.add(
          gsap.timeline().to(shuffled, {
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            stagger: { each: 0.02 },
          }),
        );

        if (texts[index]) {
          master.to(
            texts[index],
            {
              clipPath: "inset(0% 0% 0% 0%)",
              y: 0,
              duration: 2.6,
              ease: "expo.out",
            },
            "-=0.3",
          );
          master.to(
            texts[index],
            {
              clipPath: "inset(0% 0% 100% 0%)",
              y: 0,
              duration: 2,
              ease: "power2.inOut",
            },
            "+=0.8",
          );
        }
      });

      ScrollTrigger.create({
        trigger: stage,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
        onUpdate: ({ progress }) => {
          fills.forEach((fill, index) => {
            const segmentProgress = gsap.utils.clamp(
              0,
              1,
              (progress - index / fills.length) * fills.length,
            );
            fill.style.width = `${segmentProgress * 100}%`;
          });
        },
      });

      const updateScrollTrigger = () => ScrollTrigger.update();
      window.addEventListener("studio:scroll", updateScrollTrigger);
      return () => window.removeEventListener("studio:scroll", updateScrollTrigger);
    }, root);

    ScrollTrigger.refresh();
    return () => context.revert();
  }, [grid, projects, reducedMotion]);

  const cells = useMemo(
    () =>
      Array.from({ length: grid.cols * grid.rows }, (_, index) => {
        const x = index % grid.cols;
        const y = Math.floor(index / grid.cols);
        return {
          x: x * (grid.width / grid.cols),
          y: y * (grid.height / grid.rows),
          width: grid.width / grid.cols,
          height: grid.height / grid.rows,
        };
      }),
    [grid],
  );

  if (reducedMotion) {
    return (
      <div className="home-reduced">
        <HomeIntro copy={copy} />
        <section className="home-reduced__projects" aria-label={copy.featuredLabel}>
          {projects.map((project) => (
            <article key={project.id} className="home-reduced__project">
              <Image
                src={project.images[0].src}
                alt={project.images[0].alt}
                fill
                sizes="100vw"
              />
              <div>
                <p className="eyebrow">{project.statusLabel}</p>
                <h2>{project.title}</h2>
                <Link className="text-link" href={getProjectRoute(locale, project)}>
                  {locale === "pt" ? "Ver estudo" : "View study"}
                </Link>
              </div>
            </article>
          ))}
        </section>
        <HomeOutro copy={copy} />
      </div>
    );
  }

  return (
    <div ref={rootRef}>
      <HomeIntro copy={copy} />

      <section ref={stageRef} className="home-stage" aria-label={copy.featuredLabel}>
        <div className="home-layers">
          {projects.map((project, index) => {
            const maskId = `${maskPrefix}-mask-${index}`;
            return (
              <svg
                key={project.id}
                className="home-layer"
                viewBox={`0 0 ${grid.width} ${grid.height}`}
                preserveAspectRatio="none"
                role="img"
                aria-labelledby={`${maskId}-title ${maskId}-description`}
              >
                <title id={`${maskId}-title`}>{project.title}</title>
                <desc id={`${maskId}-description`}>{project.images[0].alt}</desc>
                <defs>
                  <mask id={maskId} maskUnits="userSpaceOnUse">
                    <rect width={grid.width} height={grid.height} fill="black" />
                    <g data-grid-cells={index}>
                      {cells.map((cell, cellIndex) => (
                        <rect
                          key={cellIndex}
                          data-grid-cell
                          x={cell.x}
                          y={cell.y}
                          width={cell.width}
                          height={cell.height}
                          fill="white"
                          opacity="0"
                          shapeRendering="crispEdges"
                        />
                      ))}
                    </g>
                  </mask>
                </defs>
                <image
                  href={project.images[0].src}
                  width={grid.width}
                  height={grid.height}
                  preserveAspectRatio="xMidYMid slice"
                  mask={`url(#${maskId})`}
                />
              </svg>
            );
          })}

          <div className="home-layer__shade" aria-hidden="true" />
          <div className="home-texts">
            {projects.map((project) => (
              <article key={project.id} className="home-slide-copy" data-home-text>
                <Link href={getProjectRoute(locale, project)}>
                  <h2>{project.title}</h2>
                </Link>
                <div className="home-slide-copy__aside">
                  <p className="eyebrow">{project.statusLabel}</p>
                  <p>{project.summary}</p>
                  <Link className="text-link" href={getProjectRoute(locale, project)}>
                    {locale === "pt" ? "Ver estudo" : "View study"}
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="home-progress" aria-hidden="true">
            {projects.map((project) => (
              <div key={project.id} className="home-progress__segment">
                <div className="home-progress__fill" data-progress-fill />
              </div>
            ))}
          </div>
        </div>
      </section>

      <HomeOutro copy={copy} />
    </div>
  );
}

function HomeIntro({ copy }: { copy: LocalizedSiteContent["home"] }) {
  return (
    <section className="home-intro">
      <h1 className="home-intro__title">
        {copy.title.split(" ").slice(0, -1).join(" ")} {" "}
        <em>{copy.title.split(" ").at(-1)}</em>
      </h1>
      <div className="home-intro__meta">
        <p className="eyebrow">{copy.eyebrow}</p>
        <p>{copy.intro}</p>
        <span className="scroll-cue">{copy.scrollCue}</span>
      </div>
    </section>
  );
}

function HomeOutro({ copy }: { copy: LocalizedSiteContent["home"] }) {
  return (
    <section className="home-outro">
      <div className="home-outro__grid">
        <div>
          <p className="eyebrow">{copy.serviceCta.eyebrow}</p>
          <h2>
            {copy.serviceCta.title.split(" ").slice(0, -3).join(" ")} {" "}
            <em>{copy.serviceCta.title.split(" ").slice(-3).join(" ")}</em>
          </h2>
        </div>
        <div className="home-outro__copy">
          <p>{copy.serviceCta.body}</p>
          <Link className="text-link" href={copy.serviceCta.href}>
            {copy.serviceCta.action}
          </Link>
        </div>
      </div>
    </section>
  );
}
