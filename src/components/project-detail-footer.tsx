"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import siteConfig from "@/lib/metadata";
import { withLang, type Lang } from "@/lib/i18n";

export function ProjectDetailFooter({
  lang = "pt",
  pathname = "/",
}: {
  lang?: Lang;
  pathname?: string;
}) {
  const footerRef = useRef<HTMLElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const footer = footerRef.current;
    const top = topRef.current;
    const bar = barRef.current;

    if (!footer || !top || !bar) {
      return;
    }

    let frame = 0;
    let hiddenHeight = 0;

    const clamp = (value: number) => Math.min(Math.max(value, 0), 1);

    const syncHeights = () => {
      hiddenHeight = top.getBoundingClientRect().height;
      const barHeight = bar.getBoundingClientRect().height;
      footer.style.setProperty("--footer-reveal-hidden", `${hiddenHeight}px`);
      footer.style.setProperty("--footer-reveal-height", `${hiddenHeight + barHeight}px`);
    };

    const syncProgress = () => {
      if (hiddenHeight <= 0) {
        footer.style.setProperty("--footer-reveal-progress", "1");
        return;
      }

      const rect = footer.getBoundingClientRect();
      const progress = clamp((window.innerHeight - rect.top) / hiddenHeight);
      footer.style.setProperty("--footer-reveal-progress", progress.toFixed(4));
    };

    const requestSync = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        syncHeights();
        syncProgress();
      });
    };

    const resizeObserver = new ResizeObserver(requestSync);
    resizeObserver.observe(top);
    resizeObserver.observe(bar);

    window.addEventListener("resize", requestSync);
    window.addEventListener("scroll", requestSync, { passive: true });
    requestSync();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("resize", requestSync);
      window.removeEventListener("scroll", requestSync);
    };
  }, []);

  return (
    <footer ref={footerRef} className="footer-reveal text-white">
      <div className="footer-reveal__sticky">
        <div className="footer-reveal__panel overflow-hidden border-t border-white/10 bg-[#1a1d21] text-white">
          <div
            ref={topRef}
            className="footer-reveal__top px-8 py-10 md:px-9 md:py-11 lg:px-12 lg:py-12 xl:px-14 2xl:px-16"
          >
            <div className="grid gap-x-10 gap-y-5 text-[0.72rem] uppercase tracking-[0.18em] text-white/50 md:grid-cols-[0.9fr_0.9fr_0.7fr_1fr]">
              <div className="flex flex-col gap-2">
                <Link href={withLang("/projetos", lang)} className="transition-colors hover:text-ambient-electric">
                  {lang === "pt" ? "Projetos" : "Projects"}
                </Link>
                <Link href={withLang("/publicacoes", lang)} className="transition-colors hover:text-ambient-electric">
                  {lang === "pt" ? "Publicações" : "Publications"}
                </Link>
                <Link href={withLang("/galeria-trefle", lang)} className="transition-colors hover:text-ambient-electric">
                  {lang === "pt" ? "Galeria" : "Gallery"}
                </Link>
                <Link href={withLang("/contato", lang)} className="transition-colors hover:text-ambient-electric">
                  {lang === "pt" ? "Contato" : "Contact"}
                </Link>
              </div>

              <div className="flex flex-col gap-2">
                <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ambient-electric">
                  Instagram
                </a>
                <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ambient-electric">
                  WhatsApp
                </a>
                <a href={`mailto:${siteConfig.email}`} className="break-all transition-colors hover:text-ambient-electric">
                  {siteConfig.email}
                </a>
              </div>

              <div className="flex flex-col gap-2">
                <Link href={withLang("/contato", lang)} className="transition-colors hover:text-ambient-electric">
                  {lang === "pt" ? "Fale conosco ↗" : "Get in touch ↗"}
                </Link>
                <div className="mt-4 flex gap-3">
                  <Link href={withLang(pathname, "pt")} className={lang === "pt" ? "text-ambient-cyan" : "transition-colors hover:text-ambient-electric"}>
                    PT
                  </Link>
                  <span className="text-white/24">|</span>
                  <Link href={withLang(pathname, "en")} className={lang === "en" ? "text-ambient-cyan" : "transition-colors hover:text-ambient-electric"}>
                    EN
                  </Link>
                </div>
              </div>

              <div className="flex flex-col gap-2 md:items-end md:text-right">
                <span>{siteConfig.location.city}, {siteConfig.location.state}</span>
                <span>© {new Date().getFullYear()} Julia Fonseca Arquitetura</span>
              </div>
            </div>
          </div>

          <div
            ref={barRef}
            className="footer-bar px-8 py-5 text-ambient-micro md:px-9 lg:px-12 xl:px-14 2xl:px-16"
          >
            <div className="flex flex-col gap-2 text-sm uppercase tracking-[0.12em] text-white/88 sm:flex-row sm:items-center sm:justify-between">
              <p>© {new Date().getFullYear()} Julia Fonseca Arquitetura</p>
              <p>design & code</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
