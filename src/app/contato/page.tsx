import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import siteConfig from "@/lib/metadata";
import { resolveLang } from "@/lib/i18n";
import { ContactActionRows } from "@/components/contact-action-rows";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Entre em contato com Julia Fonseca Arquitetura. Projetos residenciais, comerciais e interiores de alto padrão.",
};

const copy = {
  pt: {
    eyebrow: "Contato",
    titleTop: "Vamos",
    titleBottom: "conversar.",
    intro:
      "Cada projeto começa com uma conversa. Conte o que você imagina, ou mesmo só uma ideia solta, e a gente descobre juntos se faz sentido.",
    whatsappMessage: "Olá Julia! Vi seu site e gostaria de conversar sobre um projeto.",
    base: "Base",
    copyHint: "Clique para copiar",
    copyEmail: "Copiar e-mail",
    openEmail: "Abrir mail app",
    copyPhone: "Copiar número",
    openWhatsapp: "Abrir WhatsApp",
    copyInstagram: "Copiar @",
    openInstagram: "Abrir Instagram",
  },
  en: {
    eyebrow: "Contact",
    titleTop: "Let's",
    titleBottom: "talk.",
    intro:
      "Every project starts with a conversation. Tell us what you are imagining, or even just a loose idea, and we can see together if it makes sense.",
    whatsappMessage: "Hello Julia! I saw your website and would like to talk about a project.",
    base: "Base",
    copyHint: "Click to copy",
    copyEmail: "Copy e-mail",
    openEmail: "Open mail app",
    copyPhone: "Copy number",
    openWhatsapp: "Open WhatsApp",
    copyInstagram: "Copy @",
    openInstagram: "Open Instagram",
  },
} as const;

export default function ContatoPage({
  searchParams,
}: {
  searchParams?: { lang?: string };
}) {
  const lang = resolveLang(searchParams?.lang);
  const t = copy[lang];
  const rows = [
    {
      label: "WhatsApp",
      value: "+55 (38) 99266-5556",
      hint: t.copyHint,
      icon: "whatsapp" as const,
      copyValue: "+55 38 99266-5556",
      actions: [
        { type: "copy" as const, label: t.copyPhone, value: "+55 38 99266-5556" },
        {
          type: "link" as const,
          label: t.openWhatsapp,
          href: `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(t.whatsappMessage)}`,
        },
      ],
    },
    {
      label: "Email",
      value: siteConfig.email,
      hint: t.copyHint,
      icon: "email" as const,
      copyValue: siteConfig.email,
      actions: [
        { type: "copy" as const, label: t.copyEmail, value: siteConfig.email },
        { type: "link" as const, label: t.openEmail, href: `mailto:${siteConfig.email}` },
      ],
    },
    {
      label: "Instagram",
      value: "@juliafonseca.arq",
      hint: t.copyHint,
      icon: "instagram" as const,
      copyValue: "@juliafonseca.arq",
      actions: [
        { type: "copy" as const, label: t.copyInstagram, value: "@juliafonseca.arq" },
        { type: "link" as const, label: t.openInstagram, href: siteConfig.instagram },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-ambient-micro text-ambient-dark">
      <section className="relative z-10 pb-28 pt-40 section-padding md:pb-36 md:pt-52">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="mb-6 text-label uppercase text-ambient-canyon/55">{t.eyebrow}</p>
            <h1 className="font-display text-[22vw] uppercase leading-[0.78] tracking-[-0.08em] text-ambient-dark sm:text-[14vw] lg:text-[9rem]">
              {t.titleTop}
              <span className="block italic text-ambient-electric">{t.titleBottom}</span>
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-10 max-w-2xl border-l border-ambient-stone pl-8 text-xl leading-relaxed text-ambient-canyon/82 sm:text-2xl">
              {t.intro}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <ContactActionRows lang={lang} rows={rows} />
          </Reveal>

          <Reveal delay={0.5}>
            <div className="py-8">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8">
                <span className="w-28 text-xs uppercase tracking-[0.3em] text-ambient-canyon/50">{t.base}</span>
                <span className="font-display text-[2.6rem] uppercase leading-[0.84] tracking-[-0.05em] text-ambient-dark/75 sm:text-[4.5rem]">
                  {siteConfig.location.city}, {siteConfig.location.state}
                </span>
              </div>
            </div>
          </Reveal>

        </div>
      </section>
    </div>
  );
}
