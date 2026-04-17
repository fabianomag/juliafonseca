"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { clsx } from "clsx";
import { Search, Instagram, Linkedin, Phone } from "lucide-react";
import { BrandMark } from "./brand-mark";
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

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const lang = resolveLang(searchParams.get("lang"));
  const labels = copy[lang];
  const searchKey = searchParams.toString();

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
          "fixed top-0 left-0 right-0 z-[70] transition-all duration-700",
          isOpen ? "bg-ambient-dark text-white" : scrolled ? "bg-white/98 backdrop-blur-xl shadow-sm" : "bg-transparent"
        )}
      >
        <nav className="section-padding flex items-start justify-between py-6 md:py-7">
          <div
            className={clsx(
              "relative z-[60] transition-opacity duration-300",
              isOpen ? "pointer-events-none opacity-0" : "opacity-100"
            )}
          >
            <BrandMark lang={lang} />
          </div>

          <div className="relative z-[60] flex flex-col items-end">
            <div className="flex items-center gap-2">
              {isProjectsPage && (
                <button
                  type="button"
                  className={clsx(
                    "group flex h-12 w-12 items-center justify-center transition-all duration-300",
                    isOpen
                      ? "text-white"
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
          "fixed inset-0 z-[55] bg-ambient-dark text-white transition-all duration-500",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={close}
      >
        <div className="absolute left-12 top-12 z-10 flex items-center gap-4 text-lg uppercase tracking-[0.18em]">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              switchLang("pt");
            }}
            className={lang === "pt" ? "text-ambient-wood" : "text-white"}
          >
            PT
          </button>
          <span className="text-white/50">|</span>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              switchLang("en");
            }}
            className={lang === "en" ? "text-ambient-wood" : "text-white"}
          >
            EN
          </button>
        </div>

        <div
          className={clsx(
            "relative z-10 h-full section-padding pb-16 pt-28 transition-all duration-500 ease-out md:pb-20 md:pt-32",
            isOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          )}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="mx-auto grid h-full max-w-[112rem] grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
            <div className="hidden lg:flex lg:items-center">
              <BrandMark inverted large lang={lang} />
            </div>

            <div className="flex flex-col justify-center gap-16">
              <div className="grid gap-16 md:grid-cols-2">
                <div className="space-y-6">
                  <h2 className="font-display text-[4.5rem] uppercase leading-[0.82] tracking-[-0.05em]">
                    {labels.nav[0].label}
                  </h2>
                  <div className="flex flex-col gap-4 text-[1.35rem] uppercase tracking-[0.08em] text-white/88 md:text-[1.7rem]">
                    {labels.projectLinks.map((link) => (
                      <Link
                        key={link.label}
                        href={withLang(link.href, lang)}
                        onClick={close}
                        className="transition-colors hover:text-ambient-wood"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="space-y-7">
                  <h2 className="font-display text-[3.35rem] uppercase leading-[0.82] tracking-[-0.05em] md:text-[4.2rem] xl:text-[4.8rem]">
                    {lang === "pt" ? "Navegação" : "Navigation"}
                  </h2>
                  <div className="flex flex-col gap-5 text-[1.6rem] uppercase tracking-[0.08em] text-white/94 md:text-[2rem]">
                    {labels.nav.map((link) => (
                      <Link
                        key={link.href}
                        href={withLang(link.href, lang)}
                        onClick={close}
                        className="transition-colors hover:text-ambient-wood"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mx-auto flex w-fit items-center gap-5 text-white/70 lg:mx-0">
                <a
                  href="https://www.instagram.com/juliafonseca.arq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white/10 p-3 transition-colors hover:bg-white/18"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white/10 p-3 transition-colors hover:bg-white/18"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="https://wa.me/5538992665556"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white/10 p-3 transition-colors hover:bg-white/18"
                >
                  <Phone size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
