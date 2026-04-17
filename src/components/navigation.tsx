"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { clsx } from "clsx";
import { Search } from "lucide-react";
import { BrandMark } from "./brand-mark";
import { FlipLink } from "@/components/ui/flip-links";
import { resolveLang, withLang } from "@/lib/i18n";

const copy = {
  pt: {
    nav: [
      { href: "/projetos", label: "Projetos" },
      { href: "/galeria-trefle", label: "Galeria Tréfle" },
      { href: "/sobre", label: "Escritório" },
      { href: "/publicacoes", label: "Publicações" },
      { href: "/contato", label: "Contato" },
    ],
    projectLinks: [
      { href: "/projetos?categoria=residencial", label: "Residencial" },
      { href: "/projetos?categoria=comercial", label: "Comercial" },
      { href: "/projetos?categoria=interiores", label: "Interiores" },
      { href: "/projetos?status=completed", label: "Concluídos" },
      { href: "/projetos?status=in_progress", label: "Em andamento" },
    ],
    projectsLabel: "PROJETOS",
    search: "Buscar",
    close: "Fechar menu",
    open: "Abrir menu",
  },
  en: {
    nav: [
      { href: "/projetos", label: "Projects" },
      { href: "/galeria-trefle", label: "Galeria Tréfle" },
      { href: "/sobre", label: "Studio" },
      { href: "/publicacoes", label: "Publications" },
      { href: "/contato", label: "Contact" },
    ],
    projectLinks: [
      { href: "/projetos?categoria=residencial", label: "Residential" },
      { href: "/projetos?categoria=comercial", label: "Commercial" },
      { href: "/projetos?categoria=interiores", label: "Interiors" },
      { href: "/projetos?status=completed", label: "Completed" },
      { href: "/projetos?status=in_progress", label: "In progress" },
    ],
    projectsLabel: "PROJECTS",
    search: "Search",
    close: "Close menu",
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
    if (key === "lang") {
      continue;
    }

    if (currentParams.get(key) !== value) {
      return false;
    }
  }

  return true;
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
            active ? "bg-white/80" : "bg-white/28 group-hover:bg-white/60 group-focus-visible:bg-white/60"
          )}
        />
        <span
          className={clsx(
            "h-2 w-2 rounded-full border transition-all duration-300",
            active
              ? "border-white bg-white"
              : "border-white/58 bg-transparent group-hover:border-white group-hover:bg-white group-focus-visible:border-white group-focus-visible:bg-white"
          )}
        />
      </span>
      <span
        className={clsx(
          "text-[0.8rem] font-medium transition-colors duration-300 md:text-[0.9rem]",
          active ? "text-white" : "text-white/74 group-hover:text-white group-focus-visible:text-white"
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
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const lang = resolveLang(searchParams.get("lang"));
  const labels = copy[lang];
  const searchKey = searchParams.toString();
  const [projectsLink, ...secondaryLinks] = labels.nav;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
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
  const toggleMenu = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  const isProjectsPage = pathname === "/projetos";

  const switchLang = (nextLang: "pt" | "en") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", nextLang);
    const nextHref = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    setIsOpen(false);
    router.push(nextHref);
  };

  return (
    <>
      <header
        className={clsx(
          "fixed left-0 right-0 top-0 z-[90] transition-all duration-700",
          isOpen ? " text-white" : scrolled ? "bg-white/98 shadow-sm backdrop-blur-xl" : "bg-transparent"
        )}
      >
        <nav className="section-padding flex items-start justify-between py-6 md:py-7">
          <div className={clsx("relative z-[60] hidden transition-opacity duration-300 lg:block")}>
            {isOpen ? <BrandMark inverted lang={lang} /> : <BrandMark lang={lang} />}
          </div>

          <div className="relative z-[60] flex flex-col items-end">
            <div className="flex items-center gap-2">
              {isProjectsPage && (
                <button
                  type="button"
                  className={clsx(
                    "group flex h-12 w-12 items-center justify-center transition-all duration-300",
                    isOpen
                      ? "hidden"
                      : "border border-ambient-stone text-ambient-dark/85 hover:border-ambient-wood hover:text-ambient-wood"
                  )}
                  aria-label={labels.search}
                >
                  <Search size={22} strokeWidth={1.5} />
                </button>
              )}
              <button
                type="button"
                onClick={toggleMenu}
                className={clsx(
                  "group ml-2 flex h-12 w-12 items-center justify-center border transition-all duration-300",
                  isOpen
                    ? "border-ambient-wood bg-ambient-dark text-ambient-wood"
                    : "border-ambient-stone text-ambient-dark hover:border-ambient-wood hover:text-ambient-wood"
                )}
                aria-label={isOpen ? labels.close : labels.open}
              >
                {isOpen ? (
                  <span className="relative block h-5 w-5">
                    <span className="absolute left-0 top-1/2 block h-px w-full -translate-y-1/2 rotate-45 bg-current" />
                    <span className="absolute left-0 top-1/2 block h-px w-full -translate-y-1/2 -rotate-45 bg-current" />
                  </span>
                ) : (
                  <span className="flex flex-col gap-[5px]">
                    <span className="block h-px w-5 bg-current" />
                    <span className="block h-px w-5 bg-current" />
                    <span className="block h-px w-5 bg-current" />
                  </span>
                )}
              </button>
            </div>
            {isProjectsPage && !isOpen && (
              <span className="mt-1 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-ambient-dark/80">
                {labels.projectsLabel}
              </span>
            )}
          </div>
        </nav>
      </header>

      <div
        className={clsx(
          "fixed inset-0 z-[80] overflow-hidden bg-ambient-dark text-white transition-all duration-500",
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={close}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,255,255,0.08),_transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0))]" />

        <div
          className={clsx(
            "relative z-10 flex h-full flex-col section-padding pb-28 pt-28 transition-all duration-500 ease-out md:pb-32 md:pt-32",
            isOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          )}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="mx-auto flex min-h-0 flex-1 max-w-[112rem] items-center justify-center">
            <div className="w-full max-w-[76rem]">
              <div className="relative z-20 flex flex-col gap-7 md:gap-8">
                <div className="space-y-4 md:space-y-5">
                  <div className="flex items-end gap-4 md:gap-6">
                    <span className="mb-[0.65rem] h-px w-10 bg-white/55 md:mb-[0.95rem] md:w-16" />
                    <FlipLink
                      href={withLang(projectsLink.href, lang)}
                      label={projectsLink.label}
                      onClick={close}
                      className="max-w-full"
                      textClassName="font-display text-[3.7rem] font-[900] uppercase tracking-[-0.055em] text-white sm:text-[4.4rem] md:text-[5.8rem] lg:text-[6.8rem] xl:text-[7.8rem]"
                      hoverTextClassName="font-display text-[3.7rem] font-[900] uppercase tracking-[-0.055em] text-ambient-wood sm:text-[4.4rem] md:text-[5.8rem] lg:text-[6.8rem] xl:text-[7.8rem]"
                    />
                  </div>

                  <div className="ml-2 flex flex-col gap-3 border-l border-white/12 pl-4 md:ml-4 md:pl-6">
                    {labels.projectLinks.map((link) => (
                      <ProjectFilterLink
                        key={link.href}
                        href={link.href}
                        label={link.label}
                        lang={lang}
                        active={matchesMenuHref(pathname, searchKey, link.href)}
                        onClick={close}
                      />
                    ))}
                  </div>
                </div>

                {secondaryLinks.map((link) => (
                  <FlipLink
                    key={link.href}
                    href={withLang(link.href, lang)}
                    label={link.label}
                    onClick={close}
                    className="max-w-full"
                    textClassName={clsx(
                      "font-display text-[3.35rem] font-[900] uppercase tracking-[-0.055em] text-white sm:text-[4rem] md:text-[5.15rem] lg:text-[6.2rem] xl:text-[7.1rem]",
                      matchesMenuHref(pathname, searchKey, link.href) ? "text-white" : "text-white/94"
                    )}
                    hoverTextClassName="font-display text-[3.35rem] font-[900] uppercase tracking-[-0.055em] text-ambient-wood sm:text-[4rem] md:text-[5.15rem] lg:text-[6.2rem] xl:text-[7.1rem]"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="pointer-events-none relative z-10 mt-10 md:mt-12">
            <div className="mx-auto flex max-w-[112rem] items-end justify-between gap-6">
              <div className="pointer-events-auto flex items-center gap-4 text-[1.74rem] font-display uppercase tracking-[0.22em] text-white/72">
                <button
                  type="button"
                  onClick={() => switchLang("pt")}
                  className={clsx("transition-colors", lang === "pt" ? "text-white" : "hover:text-ambient-wood")}
                >
                  PT
                </button>
                <span className="text-white/35">/</span>
                <button
                  type="button"
                  onClick={() => switchLang("en")}
                  className={clsx("transition-colors", lang === "en" ? "text-white" : "hover:text-ambient-wood")}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
