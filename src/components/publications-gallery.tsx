"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { clsx } from "clsx";
import { withLang, type Lang } from "@/lib/i18n";

type PublicationType = "studio" | "midia" | "referencias";

export interface PublicationItem {
  slug: string;
  title: string;
  date: string;
  type: PublicationType;
  cover?: string;
  href: string;
}

const copy = {
  pt: {
    intro:
      "Veja os cadernos do estúdio, as publicações na mídia e as referências que ajudam a ampliar a presença do escritório.",
    filters: {
      studio: "Cadernos",
      midia: "Mídia",
      referencias: "Referências",
    },
    pdf: "PDF",
    studioLabel: "Julia",
    studioTitle: "Studio Notes",
  },
  en: {
    intro:
      "Browse studio notebooks, media features and reference publications that expand the studio presence.",
    filters: {
      studio: "Notebooks",
      midia: "Media",
      referencias: "References",
    },
    pdf: "PDF",
    studioLabel: "Julia",
    studioTitle: "Studio Notes",
  },
} as const;

export function PublicationsGallery({
  items,
  lang,
  initialType = "studio",
}: {
  items: PublicationItem[];
  lang: Lang;
  initialType?: PublicationType;
}) {
  const labels = copy[lang];
  const [activeType, setActiveType] = useState<PublicationType>(initialType);

  const filtered = useMemo(
    () => items.filter((item) => item.type === activeType),
    [activeType, items]
  );

  return (
    <>
      <section className="section-padding pb-20 pt-44 md:pb-24 md:pt-48">
        <div className="mx-auto max-w-[68rem]">
          <div className="mx-auto max-w-4xl">
            <p className="quiet-serif text-center">{labels.intro}</p>
          </div>
        </div>
      </section>

      <section className="section-padding pb-16">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-5">
          {(Object.keys(labels.filters) as PublicationType[]).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setActiveType(type)}
              className={clsx(
                "min-w-[8.5rem] border px-5 py-3 text-xl uppercase tracking-[0.14em] transition-colors",
                activeType === type
                  ? "border-ambient-electric text-ambient-electric bg-white"
                  : "border-transparent bg-[#e8e8e8] text-ambient-dark/70 hover:bg-[#dedede]"
              )}
            >
              {labels.filters[type]}
            </button>
          ))}
        </div>
      </section>

      <section className="pb-32 md:pb-40">
        <div className="grid grid-cols-1 gap-0 border-t border-ambient-stone/15 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((item) => (
              <Link key={item.slug} href={withLang(item.href, lang)} className="group block border-b border-ambient-stone/15">
                <div className="relative aspect-[1.86/1] overflow-hidden bg-ambient-linen">
                  {item.type === "studio" ? (
                    <div className="absolute inset-0 flex bg-white">
                      <div className="accent-line flex w-[18%] items-start justify-center pt-10">
                        <span className="rotate-180 text-base uppercase tracking-[0.18em] text-white [writing-mode:vertical-rl]">
                          {labels.studioLabel}
                        </span>
                      </div>
                      <div className="relative flex-1 overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_34%_18%,rgba(0,255,255,0.22),transparent_22%),linear-gradient(145deg,#0B0F1F_0%,#111111_52%,#24386F_100%)]" />

                        <div className="relative flex h-full flex-col justify-between p-8 text-white">
                          <div>
                            <p className="font-serif text-[2rem] italic leading-[1]">{labels.studioLabel}</p>
                            <p className="mt-3 font-display text-[3.2rem] uppercase font-bold leading-[0.88] tracking-[0.03em]">
                              {labels.studioTitle}
                            </p>
                          </div>
                          <div className="grid gap-2 text-sm uppercase tracking-[0.16em] text-white/80">
                            <span>{item.date}</span>
                            <span>Julia Fonseca Arquitetura</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : item.cover ? (
                    <Image
                      src={item.cover}
                      alt={item.title}
                      fill
                      sizes="(max-width: 1280px) 100vw, 30vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                  ) : null}
                </div>

                <div className="bg-white px-7 pb-8 pt-6 md:px-8 md:pb-9 md:pt-7">
                  <div className="flex items-center justify-between gap-6">
                  <p className="text-[0.95rem] uppercase tracking-[0.18em] text-ambient-muted">{item.date}</p>
                  <span className="border border-ambient-stone px-4 py-2 text-[0.92rem] uppercase tracking-[0.18em] text-ambient-muted transition-colors group-hover:border-ambient-electric group-hover:text-ambient-electric">
                    {labels.pdf}
                  </span>
                  </div>

                  <h2 className="mt-6 font-display text-[2.25rem] uppercase leading-[0.86] tracking-[0.04em] text-ambient-dark transition-colors group-hover:text-ambient-electric">
                    {item.title}
                  </h2>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </>
  );
}
