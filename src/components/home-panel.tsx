"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, type MouseEvent as ReactMouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/lib/projects";
import { withLang, type Lang } from "@/lib/i18n";
import { typographyTokenMap } from "@/lib/typography-system";
import { ContactShowcase } from "@/components/contact-showcase";
import { setPendingRouteShellTransition } from "@/lib/route-shell-transition";
import { getStudioContent } from "@/lib/studio-content";

type Section = "projetos" | "publicacao" | "galeria" | "escritorio" | "contato";
type Copy = typeof copy[keyof typeof copy];
const displaySplitAccentVariants = typographyTokenMap.displaySplitAccent.variants ?? {};
const editorialAccentTitleVariants = typographyTokenMap.editorialAccentTitle.variants ?? {};
const editorialAccentSubtitleVariants = typographyTokenMap.editorialAccentSubtitle.variants ?? {};
const pageLeadVariants = typographyTokenMap.pageLead.variants ?? {};
const pageEyebrowClass =
  typographyTokenMap.pageEyebrow.className ??
  "text-label uppercase text-ambient-canyon/55";

const latestPublication = {
  title: "Caderno Azul",
  date: "07/25",
  href: "/publicacoes",
};

const studioHomePhotos = [
  "/images/julia escritorio.webp",
  "/images/julia-office.webp",
  "/images/projetos/escritorio-comercial/01.webp",
  "/images/projetos/escritorio-comercial/02.webp",
  "/images/projetos/escritorio-comercial/04.webp",
] as const;

const copy = {
  pt: {
    intro: "Julia Fonseca Arquitetura desenvolve projetos residenciais, comerciais e de interiores com leitura contemporânea, presença visual forte e um senso de permanência que aproxima arquitetura, matéria e atmosfera.",
    nav: [
      { id: "projetos" as Section, label: "Projetos" },
      { id: "publicacao" as Section, label: "Publicação" },
      { id: "galeria" as Section, label: "Galeria Tréfle" },
      { id: "escritorio" as Section, label: "Escritório" },
      { id: "contato" as Section, label: "Contato" },
    ],
    viewProject: "Ver projeto",
    viewAll: "Ver todos os projetos",
    viewAllPublications: "Ver publicações",
    galleryCta: "Conhecer a galeria",
    publicationMeta: "Arquitetura • Interiores • Escritório",
    publicationIntro: "Um caderno editorial para registrar ideias, referências e leituras do escritório. O Caderno Azul organiza arquitetura, interiores e atmosfera em uma linguagem própria.",
    galleryIntro: "Um braço curatorial que aproxima arte, mobiliário e atmosfera. A Galeria Tréfle amplia o repertório do escritório com peças e objetos escolhidos para compor espaços com presença silenciosa e identidade própria.",
    email: "juliafonseca.arquiteta@gmail.com",
  },
  en: {
    intro: "Julia Fonseca Arquitetura develops residential, commercial and interior projects with a contemporary language, strong visual presence and a lasting sense of atmosphere.",
    nav: [
      { id: "projetos" as Section, label: "Projects" },
      { id: "publicacao" as Section, label: "Publication" },
      { id: "galeria" as Section, label: "Galeria Tréfle" },
      { id: "escritorio" as Section, label: "Studio" },
      { id: "contato" as Section, label: "Contact" },
    ],
    viewProject: "View project",
    viewAll: "All projects",
    viewAllPublications: "View publications",
    galleryCta: "Discover the gallery",
    publicationMeta: "Architecture • Interiors • Studio",
    publicationIntro: "An editorial notebook for ideas, references and studio notes. Caderno Azul gathers architecture, interiors and atmosphere into a language of its own.",
    galleryIntro: "A curatorial extension that brings art, objects and atmosphere closer together. Galeria Tréfle expands the studio repertoire with pieces selected for quiet presence and a distinct identity.",
    email: "juliafonseca.arquiteta@gmail.com",
  },
} as const;

const panelVariants = {
  enter: { opacity: 0, y: 18 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

// ── Painel: Projetos ──────────────────────────────────────────────
function PanelProjetos({
  projects,
  lang,
  t,
  onRouteClick,
}: {
  projects: Project[];
  lang: Lang;
  t: Copy;
  onRouteClick: (event: ReactMouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
  const viewAllHref = withLang("/projetos", lang);

  return (
    <div className="relative flex h-full flex-col bg-black">
      {/* Grid de projetos com scroll */}
      <div className="flex-1 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="grid grid-cols-2 gap-x-0 gap-y-5 bg-black py-3 sm:grid-cols-3 sm:gap-y-6 sm:py-4 xl:grid-cols-4 xl:gap-y-7 xl:py-5">
          {projects.map((project, i) => (
            <div key={project.slug} className="bg-black">
              <ProjectCard project={project} index={i} lang={lang} />
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-[45vh] right-4 z-10 lg:bottom-6 lg:right-6">
        <Link
          href={viewAllHref}
          onClick={(event) => onRouteClick(event, viewAllHref)}
          className="pointer-events-auto group flex h-[7.8rem] w-[7.8rem] flex-col justify-between border border-white/35 bg-black p-4 text-left font-display text-[1rem] uppercase leading-[0.92] tracking-[0.07em] text-white shadow-[0_22px_70px_rgba(0,0,0,0.62)] transition-colors hover:border-ambient-cyan hover:text-ambient-cyan sm:h-[8.6rem] sm:w-[8.6rem] sm:text-[1.1rem] lg:h-[9.4rem] lg:w-[9.4rem] lg:p-5 lg:text-[1.2rem]"
        >
          <span>{t.viewAll}</span>
          <span className="h-px w-12 bg-current transition-transform group-hover:translate-x-1 sm:w-16" />
        </Link>
      </div>
    </div>
  );
}

// ── Painel: Publicação ────────────────────────────────────────────
function PanelPublicacao({
  lang,
  t,
  onRouteClick,
}: {
  lang: Lang;
  t: Copy;
  onRouteClick: (event: ReactMouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
  const publicationHref = withLang(latestPublication.href, lang);

  return (
    <div className="flex h-full flex-col lg:flex-row">
      <Link
        href={publicationHref}
        onClick={(event) => onRouteClick(event, publicationHref)}
        className="relative flex-1 overflow-hidden bg-white lg:max-w-[55%]"
      >
        <div className="accent-line flex h-full w-[14%] items-start justify-center pt-8">
          <span className="rotate-180 text-sm uppercase tracking-[0.18em] text-white [writing-mode:vertical-rl]">Julia</span>
        </div>
        <div className="absolute inset-0 left-[14%] overflow-hidden">
          <div className="absolute inset-0 bg-caderno-azul-cover" />
          <div className="relative flex h-full flex-col justify-between p-8 text-white">
            <div>
              <p className={editorialAccentTitleVariants.publicationCover ?? "font-display text-[5rem] uppercase font-bold leading-[0.82] tracking-[-0.05em] lg:text-[7rem]"}>
                Caderno
                <span className="block">Azul<span className="text-ambient-cyan">*</span></span>
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.16em] text-white/75">{t.publicationMeta}</p>
            </div>
            <div className="grid gap-1 text-xs uppercase tracking-[0.18em] text-white/80">
              <span>Edição 01</span>
              <span>2026</span>
            </div>
          </div>
        </div>
      </Link>
      <div className="flex flex-1 flex-col justify-center bg-black p-10 lg:p-12">
        <p className={pageEyebrowClass}>Publicação</p>
        <h3 className={editorialAccentSubtitleVariants.publicationPanel ?? "mt-3 font-display text-[2.2rem] uppercase leading-[0.88] tracking-[-0.02em] text-white"}>
          Caderno Azul<span className="text-ambient-cyan">*</span>
        </h3>
        <p className={pageLeadVariants.homeEditorialPanel ?? "home-ui-copy mt-5"}>{t.publicationIntro}</p>
        <Link
          href={publicationHref}
          onClick={(event) => onRouteClick(event, publicationHref)}
          className="home-ui-action mt-8 inline-flex items-center gap-3 transition-colors hover:text-ambient-electric"
        >
          <span className="block h-px w-8 bg-ambient-electric" />
          {t.viewAllPublications}
        </Link>
      </div>
    </div>
  );
}

// ── Painel: Galeria Tréfle ────────────────────────────────────────
function PanelGaleria({
  lang,
  t,
  onRouteClick,
}: {
  lang: Lang;
  t: Copy;
  onRouteClick: (event: ReactMouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
  const galleryHref = withLang("/galeria-trefle", lang);

  return (
    <div className="flex h-full flex-col lg:flex-row">
      <Link
        href={galleryHref}
        onClick={(event) => onRouteClick(event, galleryHref)}
        className="relative flex-1 overflow-hidden bg-white lg:max-w-[55%]"
      >
        <div className="accent-line-2 flex h-full w-[14%] items-start justify-center pt-8">
          <span className="rotate-180 text-sm uppercase tracking-[0.18em] text-white [writing-mode:vertical-rl]">Julia</span>
        </div>
        <div className="absolute inset-0 left-[14%] overflow-hidden">
          <div className="absolute inset-0 bg-galeria-trefle-cover" />
          <div className="relative flex h-full flex-col justify-between p-8 text-white">
            <div>
              <p className={editorialAccentTitleVariants.galleryCover ?? "font-display text-[5rem] uppercase font-bold leading-[0.82] tracking-[-0.05em] lg:text-[7rem]"}>
                Galeria
                <span className="block">Tréfle<span className="text-ambient-limao">*</span></span>
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.16em] text-white/75">Arte & Interiores</p>
            </div>
            <div className="grid gap-1 text-xs uppercase tracking-[0.18em] text-white/80">
              <span>Coleção 2026</span>
            </div>
          </div>
        </div>
      </Link>
      <div className="flex flex-1 flex-col justify-center bg-black p-10 lg:p-12">
        <p className={pageEyebrowClass}>Galeria</p>
        <h3 className={editorialAccentSubtitleVariants.galleryPanel ?? "mt-3 max-w-[28rem] font-display text-[3.6rem] uppercase leading-[0.82] tracking-[-0.045em] text-white lg:text-[4.8rem]"}>
          Tréfle<span className="text-ambient-limao">*</span>
        </h3>
        <p className={pageLeadVariants.homeEditorialPanel ?? "home-ui-copy mt-5"}>{t.galleryIntro}</p>
        <Link
          href={galleryHref}
          onClick={(event) => onRouteClick(event, galleryHref)}
          className="home-ui-action mt-8 inline-flex items-center gap-3 transition-colors hover:text-ambient-electric"
        >
          <span className="block h-px w-8 bg-ambient-electric" />
          {t.galleryCta}
        </Link>
      </div>
    </div>
  );
}

// ── Painel: Escritório ────────────────────────────────────────────
function PanelEscritorio({
  lang,
  onRouteClick,
}: {
  lang: Lang;
  onRouteClick: (event: ReactMouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
  const studio = getStudioContent(lang);
  const studioHref = withLang("/escritorio", lang);
  const photoLoop = [...studioHomePhotos, ...studioHomePhotos];

  return (
    <div className="grid h-full overflow-hidden bg-white text-black lg:grid-cols-[0.55fr_0.45fr]">
      <div className="relative min-h-[48vh] overflow-hidden bg-black lg:min-h-0">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.35),transparent_32%,rgba(0,0,0,0.2))]" />
        <motion.div
          className="grid grid-cols-2 gap-3 px-4 py-4 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3"
          animate={{ y: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {photoLoop.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className="relative aspect-[0.72/1] overflow-hidden bg-white/5 even:translate-y-10"
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(max-width: 1024px) 33vw, 18vw"
                className="object-cover grayscale"
              />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="flex flex-col justify-center px-8 py-12 lg:px-14 xl:px-16">
        <p className={pageEyebrowClass}>{studio.homeTitle}</p>
        <h2 className="font-display text-[4.2rem] uppercase leading-[0.82] tracking-normal text-black sm:text-[5rem] xl:text-[6rem]">
          Equipe
          <span className={displaySplitAccentVariants.accentWord ?? "block italic text-ambient-electric"}>autoral.</span>
        </h2>
        <p className={pageLeadVariants.homeStudioPanel ?? "mt-7 max-w-[48rem] border-l border-ambient-stone pl-6 text-[1rem] leading-relaxed text-ambient-canyon/82 sm:text-[1.12rem] xl:text-[1.2rem]"}>
          {studio.homeIntro}
        </p>

        <Link
          href={studioHref}
          onClick={(event) => onRouteClick(event, studioHref)}
          className="group mt-12 inline-flex h-[8.8rem] w-[8.8rem] flex-col justify-between border border-black/35 bg-black p-5 font-display text-[1.05rem] uppercase leading-[0.92] tracking-[0.07em] text-white transition-colors hover:border-ambient-cyan hover:text-ambient-cyan lg:h-[10rem] lg:w-[10rem] lg:text-[1.22rem]"
        >
          <span>{studio.homeCta}</span>
          <span className="h-px w-14 bg-current transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

// ── Painel: Contato ───────────────────────────────────────────────
function PanelContato({ lang }: { lang: Lang }) {
  return <ContactShowcase lang={lang} variant="panel" animated={false} />;
}

// ── HomePanel principal ───────────────────────────────────────────
export function HomePanel({ projects, lang }: { projects: Project[]; lang: Lang }) {
  const active: Section = "projetos";
  const t = copy[lang];

  const handleRouteClick = useCallback((event: ReactMouseEvent<HTMLAnchorElement>, href: string) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    if (!href.startsWith("/")) return;
    setPendingRouteShellTransition("home-leave");
  }, []);

  const renderPanel = () => {
    switch (active) {
      case "projetos":    return <PanelProjetos projects={projects} lang={lang} t={t} onRouteClick={handleRouteClick} />;
      case "publicacao":  return <PanelPublicacao lang={lang} t={t} onRouteClick={handleRouteClick} />;
      case "galeria":     return <PanelGaleria lang={lang} t={t} onRouteClick={handleRouteClick} />;
      case "escritorio":  return <PanelEscritorio lang={lang} onRouteClick={handleRouteClick} />;
      case "contato":     return <PanelContato lang={lang} />;
    }
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* ── Painel trocável — ocupa tela inteira no desktop, topo no mobile ── */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            variants={panelVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.38, ease: "easeOut" }}
            className="absolute inset-0"
          >
            {renderPanel()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
