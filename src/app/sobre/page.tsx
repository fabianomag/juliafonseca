import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import siteConfig from "@/lib/metadata";
import { resolveLang, withLang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Escritório",
  description:
    "Conheça Julia Fonseca, arquiteta especializada em projetos residenciais, comerciais e de interiores de alto padrão.",
};

const copy = {
  pt: {
    eyebrow: "Escritório",
    titleTop: "Conceito",
    titleBottom: "& equipe",
    intro: [
      "Um escritório com dinâmica criativa e descontraída, que valoriza um ambiente leve, comprometido e atento aos detalhes. Os projetos nascem da combinação entre personalidade, originalidade, funcionalidade e estética.",
      "O estúdio já carrega uma identidade visual própria e uma marca projetual reconhecível, mesmo quando cada solução é desenhada de forma totalmente personalizada para o cliente. A linguagem é contemporânea, mas sem perder aconchego e receptividade.",
    ],
    quote:
      "A arquitetura ideal tem como objetivo aguçar todos os sentidos do corpo humano, instigando visão, olfato, tato e audição, proporcionando uma experiência marcante e única.",
    quoteAuthor: "Júlia Fonseca",
    teamTitle: "Equipe",
    cta: "Inicie seu projeto",
    team: [
      {
        name: "Júlia Fonseca",
        role: "Sócia-fundadora",
        image: "/images/julia-team.webp",
        bio:
          "Formada em Arquitetura e Urbanismo em 2012 pelo Instituto Metodista Izabela Hendrix, em Belo Horizonte, e pós-graduada em arquitetura, iluminação e interiores pelo IPOG. Após atuar em escritório na capital mineira, retornou para Montes Claros, sua cidade natal, onde fundou o escritório em 2016.",
      },
      {
        name: "Cecília Nogueira",
        role: "Arquiteta coordenadora",
        image: "/images/cecilia-team.webp",
        bio:
          "Formada em Arquitetura e Urbanismo em 2014 pela Faculdade Santo Agostinho, em Montes Claros, e pós-graduanda em Master em Arquitetura e Iluminação pelo IPOG. Depois de anos de atuação em interiores e consultórios, integrou oficialmente a equipe do escritório em 2023.",
      },
      {
        name: "Rayssa Souto",
        role: "Estagiária",
        image: "/images/rayssa-team.webp",
        bio:
          "Estudante de Arquitetura e Urbanismo na UNIFIPMOC, em Montes Claros, e formada em curso técnico de Design de Interiores no Conservatório Lorenzo Fernandez.",
      },
      {
        name: "Andréia Silva",
        role: "Estagiária",
        image: "/images/andreia-team.webp",
        bio:
          "Estudante do curso técnico em Edificações pelo SENAI e formada em Design de Interiores pelo Conservatório de Montes Claros.",
      },
    ],
  },
  en: {
    eyebrow: "Studio",
    titleTop: "Concept",
    titleBottom: "& team",
    intro: [
      "A studio with a creative and relaxed rhythm, shaped by a light but committed atmosphere. Every project is developed through the balance of personality, originality, functionality and aesthetic clarity.",
      "The studio already carries a recognizable visual identity and project language, even when each solution is fully tailored to the client. The approach is contemporary without losing warmth, comfort and receptiveness.",
    ],
    quote:
      "Ideal architecture should awaken every human sense, engaging sight, smell, touch and hearing while creating a unique and memorable experience.",
    quoteAuthor: "Julia Fonseca",
    teamTitle: "Team",
    cta: "Start your project",
    team: [
      {
        name: "Julia Fonseca",
        role: "Founder",
        image: "/images/julia-team.webp",
        bio:
          "Graduated in Architecture and Urbanism in 2012 at Instituto Metodista Izabela Hendrix in Belo Horizonte, with postgraduate studies in architecture, lighting and interiors at IPOG. After working in architecture studios in Belo Horizonte, she returned to Montes Claros and founded the studio in 2016.",
      },
      {
        name: "Cecília Nogueira",
        role: "Lead architect",
        image: "/images/cecilia-team.webp",
        bio:
          "Graduated in Architecture and Urbanism in 2014 at Faculdade Santo Agostinho in Montes Claros, with postgraduate studies in Architecture and Lighting at IPOG. After years working mainly on interiors and clinics, she formally joined the studio team in 2023.",
      },
      {
        name: "Rayssa Souto",
        role: "Intern",
        image: "/images/rayssa-team.webp",
        bio:
          "Architecture and Urbanism student at UNIFIPMOC in Montes Claros, with a technical degree in Interior Design from Conservatório Lorenzo Fernandez.",
      },
      {
        name: "Andréia Silva",
        role: "Intern",
        image: "/images/andreia-team.webp",
        bio:
          "Technical student in Building Construction at SENAI and graduate in Interior Design from the Conservatory of Montes Claros.",
      },
    ],
  },
} as const;

export default function SobrePage({
  searchParams,
}: {
  searchParams?: { lang?: string };
}) {
  const lang = resolveLang(searchParams?.lang);
  const t = copy[lang];

  return (
    <div className="min-h-screen bg-ambient-micro text-ambient-dark">
      <section className="section-padding mx-auto w-full max-w-[118rem] pb-20 pt-40 md:pb-24 md:pt-52">
        <Reveal>
          <div className="mb-12 flex flex-col items-center gap-5">
            <span className="accent-line block h-12 w-[2px]" />
            <p className="text-label text-ambient-dark/75">{t.eyebrow}</p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="mx-auto max-w-[72rem] text-center font-display text-[4.5rem] uppercase leading-[0.82] tracking-[0.03em] text-ambient-dark sm:text-[6rem] md:text-[7rem]">
            {t.titleTop}
            <span className="block italic text-ambient-electric">{t.titleBottom}</span>
          </h1>
        </Reveal>
      </section>

      <section className="section-padding pb-24 md:pb-28">
        <div className="mx-auto grid max-w-[118rem] gap-14 xl:grid-cols-[0.47fr_0.53fr] xl:items-start">
          <Reveal>
            <div className="max-w-[40rem] xl:pt-10">
              <div className="space-y-8 border-l border-ambient-stone pl-8 text-[1.22rem] leading-[1.85] text-ambient-dark/78">
                {t.intro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-14 max-w-[36rem]">
                <blockquote className="font-serif text-[1.65rem] leading-[1.7] text-ambient-dark">
                  “{t.quote}”
                </blockquote>
                <p className="mt-6 text-right text-label text-ambient-muted">{t.quoteAuthor}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative aspect-[1.28/1] overflow-hidden bg-ambient-linen">
              <Image
                src="/images/julia-office.webp"
                alt="Julia Fonseca no escritório"
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 53vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-padding pb-28 md:pb-36">
        <div className="mx-auto max-w-[118rem]">
          <div className="mb-12 flex flex-col items-center gap-5">
            <span className="accent-line block h-12 w-[2px]" />
            <p className="text-label text-ambient-dark/75">{t.teamTitle}</p>
          </div>

          <div className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2 xl:grid-cols-4">
            {t.team.map((member, index) => (
              <Reveal key={member.name} delay={0.05 * (index + 1)}>
                <article className="group">
                  <div className="relative aspect-[0.78/1] overflow-hidden bg-ambient-linen">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 1280px) 100vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="mt-7">
                    <h2 className="font-display text-[2.2rem] uppercase leading-[0.86] tracking-[0.04em] text-ambient-dark">
                      {member.name}
                    </h2>
                    <p className="mt-3 text-label text-ambient-electric">{member.role}</p>
                    <p className="mt-6 text-[1.02rem] leading-[1.85] text-ambient-dark/72">
                      {member.bio}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-20 flex justify-end">
            <Link
              href={withLang("/contato", lang)}
              className="inline-flex items-center gap-5 text-xl uppercase tracking-[0.12em] text-ambient-muted transition-colors hover:text-ambient-electric"
            >
              <span className="block h-[2px] w-14 bg-ambient-electric" />
              {t.cta}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
