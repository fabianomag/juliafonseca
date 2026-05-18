"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { clsx } from "clsx";
import { BrandHeaderSymbol } from "./brand-mark";
import { FlipLink } from "@/components/ui/flip-links";
import { resolveLang, withLang } from "@/lib/i18n";
import siteConfig from "@/lib/metadata";

const copy = {
  pt: {
    nav: [
      { href: "/escritorio", label: "Escritório" },
      { href: "/projetos", label: "Projetos" },
      { href: "/publicacoes", label: "Publicações" },
      { href: "/galeria-trefle", label: "Galeria" },
      { href: "/contato", label: "Contato" },
    ],
    projectLinks: [
      { href: "/projetos?categoria=residencial", label: "Residencial" },
      { href: "/projetos?categoria=comercial", label: "Comercial" },
      { href: "/projetos?categoria=interiores", label: "Interiores" },
      { href: "/projetos?status=completed", label: "Concluídos" },
      { href: "/projetos?status=in_progress", label: "Em andamento" },
    ],
    contact: "Contato",
    menu: "Menu",
    close: "Fechar",
    open: "Abrir menu",
  },
  en: {
    nav: [
      { href: "/escritorio", label: "Studio" },
      { href: "/projetos", label: "Projects" },
      { href: "/publicacoes", label: "Publications" },
      { href: "/galeria-trefle", label: "Gallery" },
      { href: "/contato", label: "Contact" },
    ],
    projectLinks: [
      { href: "/projetos?categoria=residencial", label: "Residential" },
      { href: "/projetos?categoria=comercial", label: "Commercial" },
      { href: "/projetos?categoria=interiores", label: "Interiors" },
      { href: "/projetos?status=completed", label: "Completed" },
      { href: "/projetos?status=in_progress", label: "In progress" },
    ],
    contact: "Contact",
    menu: "Menu",
    close: "Close",
    open: "Open menu",
  },
} as const;

function matchesMenuHref(pathname: string, searchKey: string, href: string) {
  const [targetPath, queryString = ""] = href.split("?");

  if (pathname !== targetPath) {
    return false;
  }

  if (!queryString) {
    return true;
  }

  const currentParams = new URLSearchParams(searchKey);
  const targetParams = new URLSearchParams(queryString);

  for (const [key, value] of Array.from(targetParams.entries())) {
    if (key === "lang") continue;
    if (currentParams.get(key) !== value) return false;
  }

  return true;
}

function AnimatedPillText({ label }: { label: string }) {
  return (
    <span aria-hidden="true" className="relative inline-block overflow-hidden whitespace-nowrap leading-[1.3]">
      {Array.from(label).map((char, index) => (
        <span
          key={`${label}-${index}`}
          className="relative inline-block translate-y-0 rotate-[0.001deg] transition-transform duration-[600ms] ease-[cubic-bezier(0.625,0.05,0,1)] [text-shadow:0_1.3em_currentColor] group-hover:-translate-y-[1.3em] group-focus-visible:-translate-y-[1.3em]"
          style={{
            transitionDelay: `${index * 10}ms`,
            whiteSpace: char === " " ? "pre" : undefined,
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

function pillToneClasses(tone: "dark" | "light") {
  return tone === "dark"
    ? {
      root: "text-white",
      bg: "bg-black",
      dot: "border-white/85",
    }
    : {
      root: "text-black",
      bg: "bg-[#f2f0eb]",
      dot: "border-black/85",
    };
}

function HeaderPillLink({
  href,
  label,
  tone,
  showDot,
}: {
  href: string;
  label: string;
  tone: "dark" | "light";
  showDot?: boolean;
}) {
  const toneClasses = pillToneClasses(tone);

  return (
    <Link
      href={href}
      aria-label={label}
      className={clsx(
        "group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-full px-4 font-display text-[0.72rem] font-[650] uppercase tracking-normal shadow-[0_12px_34px_rgba(0,0,0,0.22)] transition-transform duration-500 ease-[cubic-bezier(0.625,0.05,0,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ambient-cyan md:h-11 md:px-5 2xl:text-[0.86rem]",
        toneClasses.root,
      )}
    >
      <span
        aria-hidden="true"
        className={clsx(
          "absolute inset-0 rounded-full transition-[inset] duration-[600ms] ease-[cubic-bezier(0.625,0.05,0,1)] group-hover:inset-[0.125em] group-focus-visible:inset-[0.125em]",
          toneClasses.bg,
        )}
      />
      <span className="relative z-10 flex items-center gap-3">
        <AnimatedPillText label={label} />
        {showDot && <span className={clsx("h-1.5 w-1.5 rounded-full border", toneClasses.dot)} />}
      </span>
    </Link>
  );
}

function HeaderPillButton({
  label,
  ariaLabel,
  tone,
  onClick,
  className,
}: {
  label: string;
  ariaLabel: string;
  tone: "dark" | "light";
  onClick: () => void;
  className?: string;
}) {
  const toneClasses = pillToneClasses(tone);

  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-full px-4 font-display text-[0.72rem] font-[650] uppercase tracking-normal shadow-[0_12px_34px_rgba(0,0,0,0.18)] transition-all duration-700 ease-[cubic-bezier(0.625,0.05,0,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ambient-cyan md:h-11 md:px-5 2xl:text-[0.86rem]",
        toneClasses.root,
        className,
      )}
      aria-label={ariaLabel}
    >
      <span
        aria-hidden="true"
        className={clsx(
          "absolute inset-0 rounded-full transition-[inset] duration-[600ms] ease-[cubic-bezier(0.625,0.05,0,1)] group-hover:inset-[0.125em] group-focus-visible:inset-[0.125em]",
          toneClasses.bg,
        )}
      />
      <span className="relative z-10">
        <AnimatedPillText label={label} />
      </span>
    </button>
  );
}

function ProjectFilterLink({
  href,
  label,
  lang,
  active,
  onClick,
}: {
  href: string;
  label: string;
  lang: "pt" | "en";
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Link
      href={withLang(href, lang)}
      onClick={onClick}
      className="group inline-flex w-fit items-center gap-3 uppercase tracking-[0.16em] text-white/78 transition-colors focus-visible:outline-none"
    >
      <span className="flex w-9 items-center gap-2 md:w-11">
        <span
          className={clsx(
            "h-px flex-1 transition-colors duration-300",
            active ? "bg-white/80" : "bg-white/28 group-hover:bg-white/60 group-focus-visible:bg-white/60",
          )}
        />
        <span
          className={clsx(
            "h-2 w-2 rounded-full border transition-all duration-300",
            active
              ? "border-white bg-white"
              : "border-white/58 bg-transparent group-hover:border-white group-hover:bg-white group-focus-visible:border-white group-focus-visible:bg-white",
          )}
        />
      </span>
      <span
        className={clsx(
          "text-[0.8rem] font-medium transition-colors duration-300 md:text-[0.9rem]",
          active ? "text-white" : "text-white/74 group-hover:text-white group-focus-visible:text-white",
        )}
      >
        {label}
      </span>
    </Link>
  );
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navReady, setNavReady] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const lang = resolveLang(searchParams.get("lang"));
  const labels = copy[lang];
  const searchKey = searchParams.toString();
  const centerLinks = labels.nav.filter((link) => link.href !== "/contato");
  const navIsCompact = scrolled || isOpen;

  useEffect(() => {
    const showNav = () => setNavReady(true);
    const fallback = window.setTimeout(showNav, 3600);
    window.addEventListener("jf:intro-complete", showNav);
    return () => {
      window.clearTimeout(fallback);
      window.removeEventListener("jf:intro-complete", showNav);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchKey]);

  const close = useCallback(() => setIsOpen(false), []);
  const toggleMenu = useCallback(() => setIsOpen((value) => !value), []);

  const switchLang = (nextLang: "pt" | "en") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", nextLang);
    const nextHref = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    setIsOpen(false);
    router.push(nextHref);
  };

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-[100] px-5 pt-5 text-white md:px-8 md:pt-8">
        <nav className="grid h-11 grid-cols-[auto_1fr_auto] items-center gap-4 md:h-12">
          <div className="relative z-[101] flex items-center overflow-hidden">
            <div
              className={clsx(
                "transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                navReady && !navIsCompact ? "translate-y-0 opacity-100" : "translate-y-[120%] opacity-0",
              )}
            >
              <BrandHeaderSymbol lang={lang} inverted className="w-10 md:w-11" />
            </div>
          </div>

          <div
            className={clsx(
              "hidden items-center justify-center gap-3 transition-transform duration-700 lg:flex 2xl:gap-4",
              navIsCompact ? "pointer-events-none -translate-x-8" : "translate-x-0",
            )}
          >
            {centerLinks.map((link, index) => (
              <FlipLink
                key={link.href}
                href={withLang(link.href, lang)}
                label={link.label}
                className={clsx(
                  "transition-all duration-500 ease-out",
                  !navReady && "translate-y-[200%]",
                  navIsCompact ? "-translate-x-4 opacity-0" : "translate-x-0 opacity-100",
                )}
                textClassName={clsx(
                  "font-display text-[0.74rem] font-[650] uppercase leading-none tracking-normal lg:text-[0.78rem] 2xl:text-[0.9rem]",
                  matchesMenuHref(pathname, searchKey, link.href) ? "text-white" : "text-white/88",
                )}
                hoverTextClassName="font-display text-[0.74rem] font-[650] uppercase leading-none tracking-normal text-ambient-cyan lg:text-[0.78rem] 2xl:text-[0.9rem]"
                staggerMs={10}
                style={{
                  transitionDelay: navReady ? (navIsCompact ? `${index * 20}ms` : `${120 + index * 45}ms`) : "0ms",
                }}
              />
            ))}
          </div>

          <div className="relative z-[101] flex items-center justify-end gap-2 overflow-hidden">
            <div
              className={clsx(
                "transition-transform duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                navReady ? "translate-y-0" : "translate-y-[120%]",
              )}
            >
              <HeaderPillLink href={withLang("/contato", lang)} label={labels.contact} tone="dark" showDot />
            </div>

            <div
              className={clsx(
                "overflow-hidden transition-[max-width,transform,opacity] duration-700 ease-[cubic-bezier(0.625,0.05,0,1)]",
                navIsCompact
                  ? "max-w-[8rem] translate-x-0 opacity-100"
                  : "max-w-[8rem] opacity-100 lg:pointer-events-none lg:max-w-0 lg:translate-x-5 lg:opacity-0",
              )}
            >
              <HeaderPillButton
                label={isOpen ? labels.close : labels.menu}
                onClick={toggleMenu}
                tone="light"
                ariaLabel={isOpen ? labels.close : labels.open}
                className={clsx("lg:ml-1", navReady ? "translate-y-0" : "translate-y-[120%]")}
              />
            </div>
          </div>
        </nav>
      </header>

      <div
        className={clsx(
          "fixed inset-0 z-[95] overflow-hidden bg-black text-white transition-[clip-path,opacity] duration-700 ease-[cubic-bezier(0.7,0,0.22,1)]",
          isOpen
            ? "pointer-events-auto opacity-100 [clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]"
            : "pointer-events-none opacity-0 [clip-path:polygon(0_0,100%_0,100%_0,0_0)]",
        )}
        onClick={close}
      >
        <div
          className={clsx(
            "relative z-10 flex h-full flex-col section-padding pb-10 pt-28 transition-all duration-700 ease-out md:pt-32",
            isOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
          )}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="mb-12 flex items-center justify-between">
            <Link href={withLang("/", lang)} onClick={close} aria-label="Julia Fonseca Arquitetura">
              <Image
                src="/images/brand/intro-assets/jf-wordmark-2x.png"
                alt="JF Arquitetura"
                width={220}
                height={88}
                priority
                className="brightness-0 invert"
              />
            </Link>
          </div>

          <div className="flex min-h-0 flex-1 items-center justify-start">
            <div className="w-full max-w-[76rem]">
              <div className="relative z-20 flex flex-col gap-5 md:gap-6">
                {labels.nav.map((link) => (
                  <div key={link.href}>
                    <FlipLink
                      href={withLang(link.href, lang)}
                      label={link.label}
                      onClick={close}
                      className="max-w-full"
                      textClassName={clsx(
                        "font-display text-[3.3rem] font-medium uppercase leading-[0.82] tracking-normal text-white sm:text-[4.3rem] lg:text-[5.6rem]",
                        matchesMenuHref(pathname, searchKey, link.href) ? "text-white" : "text-white/94",
                      )}
                      hoverTextClassName="font-display text-[3.3rem] font-medium uppercase leading-[0.82] tracking-normal text-ambient-cyan sm:text-[4.3rem] lg:text-[5.6rem]"
                    />

                    {link.href === "/projetos" && (
                      <div className="ml-2 mt-4 flex flex-col gap-3 border-l border-white/12 pl-4 md:ml-4 md:pl-6">
                        {labels.projectLinks.map((projectLink) => (
                          <ProjectFilterLink
                            key={projectLink.href}
                            href={projectLink.href}
                            label={projectLink.label}
                            lang={lang}
                            active={matchesMenuHref(pathname, searchKey, projectLink.href)}
                            onClick={close}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 flex items-end justify-between gap-6 text-[0.74rem] uppercase tracking-normal text-white/62">
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-ambient-cyan"
            >
              Instagram
            </a>
            <div className="flex items-center gap-3 font-display text-[1rem]">
              <button
                type="button"
                onClick={() => switchLang("pt")}
                className={clsx("transition-colors", lang === "pt" ? "text-white" : "hover:text-ambient-cyan")}
              >
                PT
              </button>
              <span className="text-white/35">/</span>
              <button
                type="button"
                onClick={() => switchLang("en")}
                className={clsx("transition-colors", lang === "en" ? "text-white" : "hover:text-ambient-cyan")}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
