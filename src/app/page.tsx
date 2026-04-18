import Image from "next/image";
import Link from "next/link";
import { getFeaturedProjects } from "@/lib/projects";
import siteConfig from "@/lib/metadata";
import { resolveLang, withLang, type Lang } from "@/lib/i18n";
import { FeaturedProjectShowcase } from "@/components/featured-project-showcase";

const latestPublication = {
  title: "Caderno Azul",
  date: "07/25",
  href: "/publicacoes",
};

const copy = {
  pt: {
    intro:
      "Julia Fonseca Arquitetura desenvolve projetos residenciais, comerciais e de interiores com leitura contemporânea, presença visual forte e um senso de permanência que aproxima arquitetura, matéria e atmosfera.",
    featured: "PROJETOS EM DESTAQUE",
    latestPublication: "ÚLTIMA PUBLICAÇÃO",
    publicationMeta: "Arquitetura • Interiores • Escritório",
    viewAllPublications: "Ver todas as publicações",
    galleryEyebrow: "GALERIA",
    galleryTitle: "Galeria Tréfle",
    galleryIntro:
      "Um braço curatorial que aproxima arte, mobiliário e atmosfera. A Galeria Tréfle amplia o repertório do escritório com peças e objetos escolhidos para compor espaços com presença silenciosa e identidade própria.",
    galleryCta: "Conhecer a galeria",
    news: "NOTÍCIAS",
    studioNotes: "Julia Studio Notes",
    socialIntro:
      "Acompanhe as novidades do escritório, as imagens exclusivas dos projetos e os bastidores do processo criativo nas redes sociais.",
    newsletterIntro:
      "Inscreva-se na nossa newsletter e fique por dentro do dia a dia do escritório, das novas publicações e dos projetos em destaque.",
    fullName: "NOME COMPLETO",
    email: "EMAIL",
    subscribe: "Inscreva-se",
    contact: "CONTATO",
    contactIntro:
      "Vamos falar sobre seu projeto? Entre em contato conosco. O escritório atua a partir de Montes Claros, com projetos em Minas Gerais e em outras cidades do Brasil.",
  },
  en: {
    intro:
      "Julia Fonseca Arquitetura develops residential, commercial and interior projects with a contemporary language, strong visual presence and a lasting sense of atmosphere.",
    featured: "FEATURED PROJECTS",
    latestPublication: "LATEST PUBLICATION",
    publicationMeta: "Architecture • Interiors • Studio",
    viewAllPublications: "View all publications",
    galleryEyebrow: "GALLERY",
    galleryTitle: "Galeria Tréfle",
    galleryIntro:
      "A curatorial extension that brings art, objects and atmosphere closer together. Galeria Tréfle expands the studio repertoire with pieces selected to create spaces with quiet presence and a distinct point of view.",
    galleryCta: "Discover the gallery",
    news: "NEWS",
    studioNotes: "Julia Studio Notes",
    socialIntro:
      "Follow studio updates, exclusive project images and behind-the-scenes moments from the creative process on social media.",
    newsletterIntro:
      "Subscribe to our newsletter and stay close to the studio routine, new publications and featured projects.",
    fullName: "FULL NAME",
    email: "EMAIL",
    subscribe: "Subscribe",
    contact: "CONTACT",
    contactIntro:
      "Let’s talk about your project. Get in touch with the studio in Montes Claros, with work across Minas Gerais and other cities in Brazil.",
  },
} as const;

export default function Home({
  searchParams,
}: {
  searchParams?: { lang?: string };
}) {
  const featured = getFeaturedProjects();
  const secondaryProject = featured[1] ?? featured[0];
  const lang = resolveLang(searchParams?.lang);
  const t = copy[lang];

  return (
    <>
      <section className="section-padding pb-28 pt-44 md:pb-36 md:pt-52">
        <div className="mx-auto max-w-[68rem]">
          <p className="quiet-serif">{t.intro}</p>
        </div>
      </section>

      <section className="section-padding pb-28 md:pb-36">
        <div className="mx-auto max-w-[112rem]">
          <div className="mb-12 flex flex-col items-center gap-5">
            <span className="accent-line block h-12 w-[2px]" />
            <p className="text-label text-ambient-dark/75">{t.featured}</p>
          </div>

          <FeaturedProjectShowcase projects={featured} lang={lang} />
        </div>
      </section>

      <section className="section-padding pb-28 md:pb-36">
        <div className="mx-auto max-w-[96rem]">
          <div className="mb-12 flex flex-col items-center gap-5">
            <span className="accent-line block h-12 w-[2px]" />
            <p className="text-label text-ambient-dark/75">{t.latestPublication}</p>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[0.58fr_0.42fr]">
            <Link
              href={withLang(latestPublication.href, lang)}
              className="mx-auto flex aspect-[0.72/1] w-full max-w-[40rem] overflow-hidden bg-white"
            >
              <div className="accent-line flex w-[16%] items-start justify-center pt-10">
                <span className="rotate-180 text-lg uppercase tracking-[0.18em] text-white [writing-mode:vertical-rl]">
                  Julia
                </span>
              </div>
              <div className="relative flex-1 overflow-hidden bg-white">
                <div className="absolute inset-0 bg-caderno-azul-cover" />
                <div className="relative flex h-full flex-col justify-between p-8 text-white">
                  <div>
                    <p className="font-display text-[5rem] uppercase font-bold leading-[0.82] tracking-[-0.05em]">
                      Caderno
                      <span className="block text-white">Azul<span className="text-ambient-cyan">*</span></span>
                    </p>
                    <p className="mt-3 text-sm uppercase tracking-[0.16em] text-white/75">
                      {t.publicationMeta}
                    </p>
                  </div>
                  <div className="grid gap-2 text-sm uppercase tracking-[0.18em] text-white/80">
                    <span>Edição 01</span>
                    <span>2026</span>
                  </div>
                </div>
              </div>
            </Link>

            <div className="max-w-md lg:pl-10">
              <h3 className="font-display text-[3rem] uppercase font-bold leading-[0.82] tracking-[0.04em] text-ambient-dark">
                {latestPublication.title}
                <span className="text-ambient-cyan">*</span>
              </h3>
              <p className="mt-6 text-2xl text-ambient-dark/72">{latestPublication.date}</p>
              <Link
                href={withLang(latestPublication.href, lang)}
                className="mt-12 inline-flex items-center gap-5 text-xl uppercase tracking-[0.12em] text-ambient-muted transition-colors hover:text-ambient-electric"
              >
                <span className="block h-[2px] w-14 bg-ambient-electric" />
                {t.viewAllPublications}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding pb-28 md:pb-36">
        <div className="mx-auto max-w-[108rem]">
          <div className="grid gap-12 xl:grid-cols-[0.42fr_0.58fr] xl:items-center">
            <div className="max-w-[33rem] xl:pr-10">
              <div className="mb-8 flex items-center gap-5">
                <span className="block h-14 w-[2px] bg-ambient-galeria-trefle-line" />
                <div className="space-y-1">
                  <p className="text-label text-ambient-muted">{t.galleryEyebrow}</p>
                  <p className="text-label text-ambient-dark">GALERIA TRÉFLE</p>
                </div>
              </div>

              <h3 className="font-display text-[3.2rem] uppercase leading-[0.84] tracking-[0.04em] text-ambient-dark sm:text-[4rem]">
                {t.galleryTitle}
              </h3>
              <p className="mt-6 font-serif text-[1.18rem] leading-[1.9] text-ambient-dark/75">
                {t.galleryIntro}
              </p>
              <Link
                href={withLang("/galeria-trefle", lang)}
                className="mt-12 inline-flex items-center gap-5 text-xl uppercase tracking-[0.12em] text-ambient-muted transition-colors hover:text-ambient-electric"
              >
                <span className="block h-[2px] w-14 bg-ambient-galeria-trefle-line" />
                {t.galleryCta}
              </Link>
            </div>

            <Link
              href={withLang("/galeria-trefle", lang)}
              className="mx-auto flex aspect-[0.72/1] w-full max-w-[40rem] overflow-hidden bg-white"
            >
              <div className="accent-line-2 flex w-[16%] items-start justify-center pt-10">
                <span className="rotate-180 text-lg uppercase tracking-[0.18em] text-white [writing-mode:vertical-rl]">
                  Julia
                </span>
              </div>
              <div className="relative flex-1 overflow-hidden bg-white">
                <div className="absolute inset-0 bg-galeria-trefle-cover" />
                <div className="relative flex h-full flex-col justify-between p-8 text-white">
                  <div>
                    <p className="font-display text-[5rem] uppercase font-bold leading-[0.82] tracking-[-0.05em]">
                      Galeria
                      <span className="block text-white">Tréfle<span className="text-ambient-limao">*</span></span>
                    </p>
                    <p className="mt-3 text-sm uppercase tracking-[0.16em] text-white/75">
                      Arte & Interiores
                    </p>
                  </div>
                  <div className="grid gap-2 text-sm uppercase tracking-[0.18em] text-white/80">
                    <span>Coleção</span>
                    <span>2026</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding pb-28 md:pb-36">
        <div className="mx-auto max-w-[110rem]">
          <div className="mb-12 flex flex-col items-center gap-5">
            <span className="accent-line block h-12 w-[2px]" />
            <p className="text-label text-ambient-dark/75">{t.news}</p>
          </div>

          <div className="grid gap-10 xl:grid-cols-[0.34fr_0.29fr_0.37fr]">
            <div className="relative aspect-[0.9/1] overflow-hidden">
              <Image
                src={secondaryProject.cover}
                alt={secondaryProject.title}
                fill
                sizes="(max-width: 1280px) 100vw, 34vw"
                className="object-cover"
              />
            </div>

            <Link
              href={withLang("/publicacoes", lang)}
              className="relative aspect-[0.9/1] overflow-hidden bg-ambient-charcoal"
            >
              <Image
                src="/images/studio-notes.png"
                alt="Julia Studio Notes"
                fill
                sizes="(max-width: 1280px) 100vw, 29vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0.04)_0%,rgba(17,17,17,0.18)_38%,rgba(17,17,17,0.74)_100%)]" />
              <div className="absolute inset-x-10 bottom-12">
                <p className="text-white">
                  <span className="font-serif text-[2.4rem] italic leading-none">Julia</span>
                  <span className="mt-3 block font-display text-[3.2rem] uppercase font-bold leading-[0.92] tracking-[0.03em] text-ambient-cyan">
                    {t.studioNotes}
                  </span>
                </p>
              </div>
            </Link>

            <div className="xl:pl-8">
              <p className="max-w-[28rem] font-serif text-[1.35rem] leading-[1.75] text-ambient-dark/78">
                {t.socialIntro}
              </p>
              <div className="mt-12 flex flex-col gap-6">
                {[
                  { label: "Instagram", href: siteConfig.instagram },
                  { label: "LinkedIn", href: "https://www.linkedin.com" },
                  { label: "WhatsApp", href: `https://wa.me/${siteConfig.whatsapp}` },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-5 text-[1.55rem] uppercase tracking-[0.12em] text-ambient-muted transition-colors hover:text-ambient-electric"
                  >
                    <span className="block h-[2px] w-8 bg-ambient-electric" />
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-14 grid gap-12 xl:grid-cols-[0.42fr_0.58fr]">
            <div className="max-w-md pl-4 md:pl-10">
              <p className="font-serif text-[1.35rem] leading-[1.8] text-ambient-dark/78">
                {t.newsletterIntro}
              </p>
            </div>

            <form className="grid gap-8">
              <label className="grid gap-5">
                <span className="text-label text-ambient-muted">{t.fullName}</span>
                <input className="border-b border-ambient-stone bg-transparent pb-4 outline-none" />
              </label>
              <label className="grid gap-5">
                <span className="text-label text-ambient-muted">{t.email}</span>
                <input type="email" className="border-b border-ambient-stone bg-transparent pb-4 outline-none" />
              </label>
              <button
                type="button"
                className="mt-4 inline-flex items-center justify-end gap-5 text-xl uppercase tracking-[0.12em] text-ambient-muted transition-colors hover:text-ambient-electric"
              >
                <span className="block h-[2px] w-14 bg-ambient-electric" />
                {t.subscribe}
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="section-padding pb-16 pt-8 md:pb-20">
        <div className="mx-auto max-w-[72rem]">
          <div className="mb-8 flex flex-col items-center gap-5">
            <span className="accent-line block h-12 w-[2px]" />
            <p className="text-label text-ambient-dark/75">{t.contact}</p>
          </div>
          <p className="mx-auto max-w-5xl font-serif text-[1.4rem] leading-[1.8] text-ambient-dark/78">
            {t.contactIntro}
          </p>
        </div>
      </section>
    </>
  );
}
