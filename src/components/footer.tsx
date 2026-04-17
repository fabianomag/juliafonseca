import Link from "next/link";
import { Instagram, Linkedin, Phone } from "lucide-react";
import siteConfig from "@/lib/metadata";
import { BrandMark } from "./brand-mark";
import { withLang, type Lang } from "@/lib/i18n";

const labels = {
  pt: {
    office: "Escritório",
    publications: "Publicações",
    contact: "Contato",
    projects: "Projetos",
    projectLinks: [
      { href: "/projetos?categoria=residencial", label: "Residencial" },
      { href: "/projetos?categoria=comercial", label: "Comercial" },
      { href: "/projetos?categoria=interiores", label: "Interiores" },
      { href: "/projetos?status=completed", label: "Concluídos" },
      { href: "/projetos?status=in_progress", label: "Em andamento" },
    ],
    copyright: "copyright",
  },
  en: {
    office: "Studio",
    publications: "Publications",
    contact: "Contact",
    projects: "Projects",
    projectLinks: [
      { href: "/projetos?categoria=residencial", label: "Residential" },
      { href: "/projetos?categoria=comercial", label: "Commercial" },
      { href: "/projetos?categoria=interiores", label: "Interiors" },
      { href: "/projetos?status=completed", label: "Completed" },
      { href: "/projetos?status=in_progress", label: "In progress" },
    ],
    copyright: "copyright",
  },
} as const;

export function Footer({
  lang = "pt",
  pathname = "/",
}: {
  lang?: Lang;
  pathname?: string;
}) {
  const copy = labels[lang];
  return (
    <footer className="bg-ambient-dark text-white">
      <div className="section-padding py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-14 md:grid-cols-[0.9fr_1fr_1fr]">
          <div className="flex flex-col justify-between gap-10">
            <BrandMark inverted large lang={lang} />
            <div className="flex items-center gap-4 text-white/70">
              <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white/15 p-3 hover:bg-white/25 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="rounded-full bg-white/15 p-3 hover:bg-white/25 transition-colors">
                <Linkedin size={18} />
              </a>
              <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white/15 p-3 hover:bg-white/25 transition-colors">
                <Phone size={18} />
              </a>
            </div>
          </div>

          <div className="grid gap-12 md:grid-cols-2 md:col-span-2">
            <div>
              <h3 className="mb-6 font-display text-[2.5rem] uppercase tracking-[0.06em] text-white/85">
                {copy.office}
              </h3>
              <div className="flex flex-col gap-5 text-2xl uppercase tracking-[0.08em] text-white/70">
                <Link href={withLang("/sobre", lang)} className="hover:text-ambient-wood transition-colors">{copy.office}</Link>
                <Link href={withLang("/publicacoes", lang)} className="hover:text-ambient-wood transition-colors">{copy.publications}</Link>
                <Link href={withLang("/contato", lang)} className="hover:text-ambient-wood transition-colors">{copy.contact}</Link>
              </div>
            </div>

            <div>
              <h3 className="mb-6 font-display text-[2.5rem] uppercase tracking-[0.06em] text-white/85">
                {copy.projects}
              </h3>
              <div className="flex flex-col gap-5 text-2xl uppercase tracking-[0.08em] text-white/70">
                {copy.projectLinks.map((link) => (
                  <Link key={link.label} href={withLang(link.href, lang)} className="hover:text-ambient-wood transition-colors">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-padding pb-10">
        <div className="mx-auto flex max-w-7xl items-center justify-end gap-4 text-lg uppercase tracking-[0.18em]">
          <Link href={withLang(pathname, "pt")} className={lang === "pt" ? "text-ambient-wood" : "text-white"}>
            PT
          </Link>
          <span className="text-white/50">|</span>
          <Link href={withLang(pathname, "en")} className={lang === "en" ? "text-ambient-wood" : "text-white"}>
            EN
          </Link>
        </div>
      </div>

      <div className="footer-bar section-padding py-5 text-ambient-micro">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© {copy.copyright} {new Date().getFullYear()} Julia Fonseca Arquitetura</p>
          <p>design & code</p>
        </div>
      </div>
    </footer>
  );
}
