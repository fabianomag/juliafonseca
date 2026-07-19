"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { EditorialProjectGallery } from "@/components/editorial-project-gallery";
import {
  getProjectRoute,
  type Locale,
  type LocalizedProject,
} from "@/content/site";

export function ProjectDetail({
  locale,
  project,
  nextProject,
}: {
  locale: Locale;
  project: LocalizedProject;
  nextProject: LocalizedProject;
}) {
  const gallery = project.images.slice(1);
  const heroRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const image = imageRef.current;
    const overlay = overlayRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!hero || !image || !overlay || reducedMotion.matches) return;

    let frame = 0;
    const update = () => {
      const rect = hero.getBoundingClientRect();
      const scrollable = Math.max(rect.height - window.innerHeight, 1);
      const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1);
      const shift = -4 + progress * 12;

      image.style.transform = `translate3d(0, ${shift}svh, 0) scale(1.018)`;
      overlay.style.opacity = `${0.16 + progress * 0.24}`;
    };
    const requestUpdate = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <article>
      <header ref={heroRef} className="project-hero project-hero--extended">
        <div ref={imageRef} className="project-hero__image">
          <Image
            src={project.images[0].src}
            alt={project.images[0].alt}
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
          />
        </div>
        <div ref={overlayRef} className="project-hero__overlay" aria-hidden="true" />
        <div className="project-hero__gradient" aria-hidden="true" />

        <div className="project-hero__shell">
          <div className="project-hero__primary">
            <div className="project-hero__copy">
              <h1>{project.title}</h1>
              <div className="project-hero__meta">
                <p>{project.eyebrow}</p>
                <p>{project.statusLabel}</p>
              </div>
            </div>
          </div>

          <div className="project-hero__secondary">
            <div aria-hidden="true" />
            <div className="project-hero__secondary-copy">
              <p className="project-hero__statement">{project.summary}</p>
              <div className="project-hero__body">
                {project.statement.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <dl className="project-hero__facts">
                <div>
                  <dt>{locale === "pt" ? "Tipo" : "Type"}</dt>
                  <dd>{project.eyebrow}</dd>
                </div>
                <div>
                  <dt>{locale === "pt" ? "Estado" : "Status"}</dt>
                  <dd>{project.statusLabel}</dd>
                </div>
                <div>
                  <dt>{locale === "pt" ? "Temas" : "Themes"}</dt>
                  <dd>{project.themes.join(" · ")}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </header>

      {gallery.length > 0 && (
        <EditorialProjectGallery
          images={gallery}
          label={locale === "pt" ? "Galeria do estudo" : "Study gallery"}
        />
      )}

      <section className="next-project">
        <div>
          <p className="eyebrow">{locale === "pt" ? "Próximo estudo" : "Next study"}</p>
          <Link href={getProjectRoute(locale, nextProject)}>
            <h2>{nextProject.title}</h2>
          </Link>
        </div>
        <Link className="text-link" href={getProjectRoute(locale, nextProject)}>
          {locale === "pt" ? "Continuar" : "Continue"}
        </Link>
      </section>
    </article>
  );
}
