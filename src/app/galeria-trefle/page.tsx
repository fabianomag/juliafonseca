import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { resolveLang, withLang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Galeria Tréfle",
  description:
    "Galeria Tréfle, curadoria de arte e objetos com a mesma sensibilidade espacial de Julia Fonseca Arquitetura.",
};

const copy = {
  pt: {
    eyebrow: "GALERIA",
    title: "Galeria Tréfle",
    intro:
      "Uma extensão curatorial do escritório, pensada para aproximar arte, mobiliário e composição com a mesma sensibilidade material presente nos projetos da Julia Fonseca.",
    body:
      "A página da galeria nasce como um espaço de apresentação silenciosa: poucos elementos, muito respiro e uma leitura que valoriza textura, escala e atmosfera. Por enquanto, a seleção completa entra como placeholder para estruturar a experiência e preparar a futura curadoria.",
    placeholderTitle: "Curadoria em construção",
    placeholderText:
      "As coleções, artistas e peças selecionadas serão inseridas aqui em fases, mantendo a mesma lógica editorial do restante do site.",
    cards: ["Seleção 01", "Seleção 02", "Seleção 03"],
    instagram: "Instagram da galeria",
    contact: "Falar com o escritório",
  },
  en: {
    eyebrow: "GALLERY",
    title: "Galeria Tréfle",
    intro:
      "A curatorial extension of the studio, designed to bring art, furniture and composition closer to the same material sensitivity present across Julia Fonseca projects.",
    body:
      "This page is conceived as a quiet presentation space: few elements, generous breathing room and a rhythm that values texture, scale and atmosphere. For now, the collection enters as placeholder content to shape the experience and prepare the future curation.",
    placeholderTitle: "Curation in progress",
    placeholderText:
      "Collections, artists and selected pieces will be added here in stages while preserving the same editorial language used across the website.",
    cards: ["Selection 01", "Selection 02", "Selection 03"],
    instagram: "Gallery Instagram",
    contact: "Talk to the studio",
  },
} as const;

export default function GaleriaTreflePage({
  searchParams,
}: {
  searchParams?: { lang?: string };
}) {
  const lang = resolveLang(searchParams?.lang);
  const t = copy[lang];

  return (
    <div className="min-h-screen bg-ambient-micro text-ambient-dark">
      <section className="section-padding pb-20 pt-40 md:pb-24 md:pt-52">
        <div className="mx-auto grid max-w-[112rem] gap-12 xl:grid-cols-[0.44fr_0.56fr] xl:items-end">
          <div className="max-w-[34rem]">
            <div className="mb-8 flex items-center gap-5">
              <span className="block h-14 w-[2px] bg-[#6C7B8B]" />
              <p className="text-label text-ambient-muted">{t.eyebrow}</p>
            </div>

            <h1 className="font-display text-[3.5rem] uppercase leading-[0.82] tracking-[0.04em] text-ambient-dark sm:text-[4.5rem] lg:text-[5.5rem]">
              {t.title}
            </h1>
            <p className="mt-6 font-serif text-[1.18rem] leading-[1.9] text-ambient-dark/76">
              {t.intro}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <a
                href="https://www.instagram.com/galeria.trefle/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 text-sm uppercase tracking-[0.16em] text-ambient-muted transition-colors hover:text-ambient-electric"
              >
                <span className="block h-[2px] w-10 bg-ambient-electric" />
                {t.instagram}
              </a>
              <Link
                href={withLang("/contato", lang)}
                className="inline-flex items-center gap-4 text-sm uppercase tracking-[0.16em] text-ambient-muted transition-colors hover:text-ambient-electric"
              >
                <span className="block h-[2px] w-10 bg-ambient-cyan" />
                {t.contact}
              </Link>
            </div>
          </div>

          <div className="relative ml-auto aspect-[1.08/1] w-full overflow-hidden bg-ambient-linen shadow-[0_28px_60px_rgba(32,24,21,0.08)]">
            <Image
              src="/images/GALERIA TREFLE.png"
              alt="Galeria Tréfle"
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 56vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="section-padding pb-24 md:pb-32">
        <div className="mx-auto grid max-w-[112rem] gap-10 xl:grid-cols-[0.4fr_0.6fr]">
          <div className="max-w-[28rem]">
            <p className="text-label text-ambient-muted">{t.placeholderTitle}</p>
          </div>

          <div className="space-y-8 border-l border-ambient-stone/80 pl-8">
            <p className="font-serif text-[1.18rem] leading-[1.9] text-ambient-dark/76">{t.body}</p>
            <p className="text-[0.95rem] uppercase tracking-[0.16em] text-ambient-muted/86">{t.placeholderText}</p>
          </div>
        </div>
      </section>

      <section className="section-padding pb-32 md:pb-40">
        <div className="mx-auto grid max-w-[112rem] gap-6 md:grid-cols-3">
          {t.cards.map((card, index) => (
            <article
              key={card}
              className="flex min-h-[18rem] flex-col justify-between border border-ambient-stone/70 bg-white/30 p-8"
            >
              <p className="text-label text-ambient-muted">0{index + 1}</p>
              <div>
                <h2 className="font-display text-[2.2rem] uppercase leading-[0.88] tracking-[0.04em] text-ambient-dark">
                  {card}
                </h2>
                <p className="mt-4 text-[0.9rem] uppercase tracking-[0.16em] text-ambient-muted/80">
                  Placeholder
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
