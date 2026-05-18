"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { clsx } from "clsx";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { withLang, type Lang } from "@/lib/i18n";
import { LocationBadge } from "@/components/location-badge";

type Section = "projetos" | "publicacao" | "galeria" | "escritorio" | "contato";

interface NavItem {
  id: Section;
  label: string;
  lines?: string[];
}

const PANEL_LAYERS = [
  { className: "bg-[#73bdd5]" },
  { className: "bg-[#1d4f5f]" },
  { className: "bg-[#000000]" },
] as const;

const copy: Record<Lang, { nav: NavItem[]; location: string }> = {
  pt: {
    nav: [
      { id: "escritorio", label: "Escritório" },
      { id: "projetos", label: "Projetos" },
      { id: "publicacao", label: "Publicações" },
      { id: "galeria", label: "Galeria Tréfle", lines: ["Galeria", "Tréfle"] },
      { id: "contato", label: "Contato" },
    ],
    location: "Montes Claros · MG",
  },
  en: {
    nav: [
      { id: "escritorio", label: "Studio" },
      { id: "projetos", label: "Projects" },
      { id: "publicacao", label: "Publications" },
      { id: "galeria", label: "Galeria Tréfle", lines: ["Galeria", "Tréfle"] },
      { id: "contato", label: "Contact" },
    ],
    location: "Montes Claros · MG",
  },
};

function FlipButtonLabel({
  label,
  lines,
  textClassName,
  hoverTextClassName,
  staggerMs = 24,
}: {
  label: string;
  lines?: string[];
  textClassName: string;
  hoverTextClassName: string;
  staggerMs?: number;
}) {
  const textLines = lines && lines.length > 0 ? lines : [label];

  const lineOffset = (lineIndex: number) =>
    textLines.slice(0, lineIndex).reduce((total, current) => total + current.length, 0);

  return (
    <>
      <span className="sr-only">{label}</span>
      <span aria-hidden="true" className="flex flex-col">
        {textLines.map((line, lineIndex) => (
          <span
            key={`${label}-line-${lineIndex}`}
            className="relative inline-flex w-fit overflow-hidden whitespace-nowrap"
            style={{ lineHeight: 0.78 }}
          >
            <span className={clsx("flex", textClassName)}>
              {Array.from(line).map((letter, charIndex) => (
                <span
                  key={`${label}-base-${lineIndex}-${charIndex}`}
                  className="inline-block transition-transform duration-300 ease-out group-hover:-translate-y-[110%] group-focus-visible:-translate-y-[110%]"
                  style={{ transitionDelay: `${(lineOffset(lineIndex) + charIndex) * staggerMs}ms` }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
            </span>

            <span className={clsx("pointer-events-none absolute inset-0 flex", hoverTextClassName)}>
              {Array.from(line).map((letter, charIndex) => (
                <span
                  key={`${label}-hover-${lineIndex}-${charIndex}`}
                  className="inline-block translate-y-[110%] transition-transform duration-300 ease-out group-hover:translate-y-0 group-focus-visible:translate-y-0"
                  style={{ transitionDelay: `${(lineOffset(lineIndex) + charIndex) * staggerMs}ms` }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
            </span>
          </span>
        ))}
      </span>
    </>
  );
}

interface HomeSidenavProps {
  lang: Lang;
  active: Section;
  onSelect: (section: Section) => void;
  visible: boolean;
}

export function HomeSidenav({ lang, active, onSelect, visible }: HomeSidenavProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const t = copy[lang];

  useEffect(() => {
    if (!visible || !rootRef.current) return;

    gsap.registerPlugin(CustomEase);
    CustomEase.create("jfHomeSideNav", "0.65, 0.01, 0.05, 0.99");
    const root = rootRef.current;

    const playAnimation = () => {
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      const panels = Array.from(
        root.querySelectorAll<HTMLElement>(
          isDesktop ? "[data-sidenav-panel-desktop]" : "[data-sidenav-panel-mobile]",
        ),
      );
      const links = Array.from(root.querySelectorAll<HTMLElement>("[data-sidenav-link-row]"));
      const fadeTargets = Array.from(root.querySelectorAll<HTMLElement>("[data-sidenav-fade]"));

      gsap.killTweensOf([...panels, ...links, ...fadeTargets]);

      gsap.set(links, { yPercent: 140, rotate: 10, transformOrigin: "0% 100%" });
      gsap.set(fadeTargets, { autoAlpha: 0, yPercent: 50 });
      gsap.set(panels, isDesktop ? { xPercent: -101 } : { yPercent: 101 });

      const timeline = gsap.timeline({
        defaults: {
          ease: "jfHomeSideNav",
          duration: 0.7,
        },
      });

      timeline
        .fromTo(
          panels,
          isDesktop ? { xPercent: -101 } : { yPercent: 101 },
          isDesktop ? { xPercent: 0, stagger: 0.12, duration: 0.575 } : { yPercent: 0, stagger: 0.12, duration: 0.575 },
        )
        .fromTo(
          links,
          { yPercent: 140, rotate: 10 },
          { yPercent: 0, rotate: 0, stagger: 0.05 },
          "<+=0.35",
        )
        .fromTo(
          fadeTargets,
          { autoAlpha: 0, yPercent: 50 },
          { autoAlpha: 1, yPercent: 0, stagger: 0.04, duration: 0.45 },
          "<+=0.2",
        );

      return timeline;
    };

    let timeline = playAnimation();

    const handleIntroComplete = () => {
      timeline.kill();
      timeline = playAnimation();
    };

    window.addEventListener("jf:intro-complete", handleIntroComplete);

    return () => {
      timeline.kill();
      window.removeEventListener("jf:intro-complete", handleIntroComplete);
    };
  }, [lang, visible]);

  if (!visible) return null;

  return (
    <div ref={rootRef}>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 hidden w-[14.5rem] max-w-[14.5rem] lg:block">
        <div className="relative h-full overflow-hidden">
          {PANEL_LAYERS.map((panel, index) => (
            <div
              key={`desktop-panel-${index}`}
              data-sidenav-panel-desktop=""
              className={`absolute inset-0 ${panel.className}`}
            />
          ))}
        </div>
      </div>

      <div className="pointer-events-auto absolute inset-y-0 left-0 z-30 hidden w-[14.5rem] max-w-[14.5rem] lg:block">
        <div className="flex h-full flex-col px-6 pb-9 pt-[4.5rem] text-white">
          <div className="flex flex-1 flex-col items-start justify-center gap-8">
            <nav className="flex flex-col">
              {t.nav.map((item) => (
                <div key={item.id} className={clsx("overflow-hidden", item.lines ? "h-[4rem]" : "h-[2.6rem]")}>
                  <button
                    type="button"
                    onClick={() => onSelect(item.id)}
                    data-sidenav-link-row=""
                    className="group relative inline-flex w-fit overflow-hidden whitespace-nowrap py-2 text-left"
                  >
                    <FlipButtonLabel
                      label={item.label}
                      lines={item.lines}
                      textClassName={clsx(
                        "font-display text-[1.82rem] font-[400] uppercase tracking-[0.055em]",
                        active === item.id ? "text-white" : "text-white/62"
                      )}
                      hoverTextClassName="font-display text-[1.82rem] font-[400] uppercase tracking-[0.055em] text-ambient-cyan"
                    />
                  </button>
                </div>
              ))}
            </nav>

            <div data-sidenav-fade="">
              <Link href={withLang("/", lang)} aria-label="JF Arquitetura" className="inline-block transition-opacity hover:opacity-75">
                <Image
                  src="/images/brand/intro-assets/jf-wordmark-2x.png"
                  alt="JF Arquitetura"
                  width={180}
                  height={72}
                  priority
                  className="brightness-0 invert"
                />
              </Link>
            </div>
          </div>

          <div data-sidenav-fade="">
            <LocationBadge label={t.location} />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-4 bottom-4 z-20 lg:hidden">
        <div className="relative h-[44vh] max-h-[30rem] overflow-hidden shadow-[0_28px_80px_rgba(0,0,0,0.38)]">
          {PANEL_LAYERS.map((panel, index) => (
            <div
              key={`mobile-panel-${index}`}
              data-sidenav-panel-mobile=""
              className={`absolute inset-0 ${panel.className}`}
            />
          ))}
        </div>
      </div>

      <div className="pointer-events-auto absolute inset-x-4 bottom-4 z-30 lg:hidden">
        <div className="flex h-[44vh] max-h-[30rem] flex-col justify-between px-6 pb-6 pt-7 text-white">
          <div className="overflow-hidden">
            <nav className="flex flex-col">
              {t.nav.map((item) => (
                <div key={item.id} className={clsx("overflow-hidden", item.lines ? "h-[3.45rem]" : "h-[2.25rem]")}>
                  <button
                    type="button"
                    onClick={() => onSelect(item.id)}
                    data-sidenav-link-row=""
                    className="group relative inline-flex w-fit overflow-hidden whitespace-nowrap py-1 text-left"
                  >
                    <FlipButtonLabel
                      label={item.label}
                      lines={item.lines}
                      textClassName={clsx(
                        "font-display text-[1.36rem] font-[400] uppercase tracking-[0.055em] sm:text-[1.56rem]",
                        active === item.id ? "text-white" : "text-white/62"
                      )}
                      hoverTextClassName="font-display text-[1.36rem] font-[400] uppercase tracking-[0.055em] text-ambient-cyan sm:text-[1.56rem]"
                    />
                  </button>
                </div>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-4">
            <div data-sidenav-fade="">
              <Link href={withLang("/", lang)} aria-label="JF Arquitetura" className="inline-block transition-opacity hover:opacity-75">
                <Image
                  src="/images/brand/intro-assets/jf-wordmark-2x.png"
                  alt="JF Arquitetura"
                  width={156}
                  height={63}
                  priority
                  className="brightness-0 invert"
                />
              </Link>
            </div>

            <div data-sidenav-fade="">
              <LocationBadge label={t.location} className="bg-black/20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
