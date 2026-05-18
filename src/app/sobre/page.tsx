import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { resolveLang, withLang } from "@/lib/i18n";
import { typographyTokenMap } from "@/lib/typography-system";
import { getStudioContent } from "@/lib/studio-content";
import { getImageBlurDataURL } from "@/lib/image-placeholder";

export const metadata: Metadata = {
  title: "Escritório",
  description:
    "Conheça Julia Fonseca e a equipe do escritório Julia Fonseca Arquitetura.",
};

export default function SobrePage({
  searchParams,
}: {
  searchParams?: { lang?: string };
}) {
  const lang = resolveLang(searchParams?.lang);
  const t = getStudioContent(lang);
  const julia = t.team[0];
  const team = t.team.slice(1);
  const pageEyebrowClass =
    typographyTokenMap.pageEyebrow.className ??
    "text-label uppercase text-ambient-canyon/55";
  const pageLeadVariants = typographyTokenMap.pageLead.variants ?? {};
  const displaySplitAccentVariants = typographyTokenMap.displaySplitAccent.variants ?? {};

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="section-padding mx-auto grid w-full max-w-[118rem] gap-12 pb-20 pt-36 md:pb-24 md:pt-44 lg:grid-cols-[0.48fr_0.52fr] lg:items-end">
        <Reveal>
          <div className="relative aspect-[0.78/1] min-h-[34rem] overflow-hidden bg-white/5">
            <Image
              src={julia.image}
              alt={julia.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 44vw"
              className="object-cover"
              placeholder="blur"
              blurDataURL={getImageBlurDataURL("#0a0a0a", "#6d6d6d", "#f4f4f4")}
            />
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="pb-2 lg:pl-8">
            <p className={pageEyebrowClass}>{t.eyebrow}</p>
            <h1 className="mt-5 font-display text-[4.4rem] uppercase leading-[0.82] tracking-normal text-white sm:text-[5.8rem] lg:text-[6.8rem]">
              {t.titleTop}
              <span className={displaySplitAccentVariants.accentWord ?? "block italic text-ambient-electric"}>{t.titleBottom}.</span>
            </h1>

            <div className={`mt-9 ${pageLeadVariants.studioPage ?? "space-y-8 border-l border-ambient-stone pl-8 text-[1.22rem] leading-[1.85] text-white/78"}`}>
              {t.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10 border-t border-white/12 pt-8">
              <p className="font-display text-[1.45rem] uppercase leading-none tracking-normal text-white">
                {julia.role}
              </p>
              <p className="mt-6 max-w-[48rem] text-[1.08rem] leading-[1.78] text-white/72">
                {julia.bio}
              </p>
              <blockquote className="mt-10 max-w-[46rem] font-serif text-[1.35rem] leading-[1.7] text-white">
                “{t.quote}”
              </blockquote>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section-padding pb-28 md:pb-36">
        <div className="mx-auto max-w-[118rem] border-t border-white/12 pt-14">
          <Reveal>
            <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className={pageEyebrowClass}>{t.teamTitle}</p>
                <h2 className="mt-3 max-w-[28rem] font-display text-[3.6rem] uppercase leading-[0.82] tracking-normal text-white lg:text-[4.8rem]">
                  {t.teamTitle}<span className="text-ambient-cyan">*</span>
                </h2>
              </div>
              <Link
                href={withLang("/contato", lang)}
                className="inline-flex items-center gap-4 font-display text-[1rem] uppercase tracking-[0.12em] text-white/62 transition-colors hover:text-ambient-cyan"
              >
                <span className="block h-px w-12 bg-current" />
                {t.cta}
              </Link>
            </div>
          </Reveal>

          <div className="grid gap-7 md:grid-cols-3">
            {team.map((member, index) => (
              <Reveal key={member.name} delay={index * 0.06}>
                <article className="group">
                  <div className="relative aspect-[0.68/1] overflow-hidden bg-white/5">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 31vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      placeholder="blur"
                      blurDataURL={getImageBlurDataURL("#0a0a0a", "#6d6d6d", "#f4f4f4")}
                    />
                  </div>
                  <div className="mt-6">
                    <h3 className="font-display text-[1.75rem] uppercase leading-[0.92] tracking-normal text-white">
                      {member.name}
                    </h3>
                    <p className="mt-3 text-label uppercase text-ambient-cyan/85">{member.role}</p>
                    <p className="mt-5 text-[1rem] leading-[1.72] text-white/66">{member.bio}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
