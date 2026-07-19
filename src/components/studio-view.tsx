"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Locale, LocalizedSiteContent } from "@/content/site";

export function StudioView({
  copy,
  locale,
}: {
  copy: LocalizedSiteContent["studio"];
  locale: Locale;
}) {
  const mediaRef = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const media = mediaRef.current;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!media || motionPreference.matches || paused) return;

    let frame = 0;
    let lastTime = performance.now();
    let interactingUntil = 0;
    let position = media.scrollTop;

    const pauseForInteraction = () => {
      interactingUntil = performance.now() + 1800;
      position = media.scrollTop;
      window.requestAnimationFrame(() => {
        position = media.scrollTop;
      });
    };

    const tick = (time: number) => {
      const delta = Math.min(time - lastTime, 50);
      lastTime = time;

      if (time > interactingUntil) {
        position += (delta / 1000) * 18;
        const loopHeight = media.scrollHeight / 2;
        if (loopHeight > 0 && position >= loopHeight) {
          position -= loopHeight;
        }
        media.scrollTop = position;
      }

      frame = window.requestAnimationFrame(tick);
    };

    media.addEventListener("wheel", pauseForInteraction, { passive: true });
    media.addEventListener("pointerdown", pauseForInteraction, { passive: true });
    media.addEventListener("touchstart", pauseForInteraction, { passive: true });
    media.addEventListener("touchmove", pauseForInteraction, { passive: true });
    media.addEventListener("keydown", pauseForInteraction);
    media.addEventListener("focusin", pauseForInteraction);
    frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
      media.removeEventListener("wheel", pauseForInteraction);
      media.removeEventListener("pointerdown", pauseForInteraction);
      media.removeEventListener("touchstart", pauseForInteraction);
      media.removeEventListener("touchmove", pauseForInteraction);
      media.removeEventListener("keydown", pauseForInteraction);
      media.removeEventListener("focusin", pauseForInteraction);
    };
  }, [paused]);

  const loopedMedia = [...copy.media, ...copy.media];

  return (
    <article className="studio-page">
      <aside
        ref={mediaRef}
        className="studio-media"
        aria-label={locale === "pt" ? "Imagens do escritório" : "Studio images"}
        data-lenis-prevent
        tabIndex={0}
      >
        <div className="studio-media__track">
          {loopedMedia.map((media, index) => {
            const duplicate = index >= copy.media.length;
            const leadImage = index % copy.media.length === 0;

            return (
              <figure key={`${media.src}-${index}`} aria-hidden={duplicate || undefined}>
                <Image
                  src={media.src}
                  alt={duplicate ? "" : media.alt}
                  fill
                  priority={index === 0}
                  loading={leadImage ? "eager" : undefined}
                  fetchPriority={index === 0 ? "high" : undefined}
                  sizes="(max-width: 960px) 100vw, 50vw"
                />
                <figcaption className="eyebrow">{media.caption}</figcaption>
              </figure>
            );
          })}
        </div>
      </aside>

      <button
        className="studio-media__control"
        type="button"
        aria-pressed={paused}
        onClick={() => setPaused((value) => !value)}
      >
        {paused
          ? locale === "pt" ? "Continuar imagens" : "Resume images"
          : locale === "pt" ? "Pausar imagens" : "Pause images"}
      </button>

      <section
        className="studio-copy"
        aria-label={locale === "pt" ? "Sobre o escritório" : "About the studio"}
        data-lenis-prevent
        tabIndex={0}
      >
        <div className="studio-copy__inner">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1>{copy.title}</h1>
          <div className="studio-manifesto">
            {copy.manifesto.slice(0, 2).map((paragraph) => (
              <p key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>

          <section className="studio-principles" aria-label={copy.principlesLabel}>
            {copy.principles.map((principle) => (
              <article key={principle.number}>
                <span className="eyebrow">{principle.number}</span>
                <div>
                  <h2>{principle.title}</h2>
                  <p>{principle.body}</p>
                </div>
              </article>
            ))}
          </section>
        </div>
      </section>
    </article>
  );
}
