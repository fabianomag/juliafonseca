import Link from "next/link";
import siteConfig from "@/lib/metadata";
import { withLang, type Lang } from "@/lib/i18n";

export function ProjectDetailFooter({ lang = "pt" }: { lang?: Lang }) {
  return (
    <footer className="overflow-hidden border-t border-ambient-stone/35 bg-[#f4f2ee] text-ambient-dark">
      <div className="section-padding py-8 md:py-9">
        <div className="grid gap-x-10 gap-y-5 font-serif text-[0.74rem] leading-[1.08] text-ambient-muted md:grid-cols-[0.85fr_0.95fr_0.7fr_1fr] md:text-[0.8rem]">
          <div className="flex flex-col gap-1">
            <Link href={withLang("/projetos", lang)} className="hover:text-ambient-dark transition-colors">
              {lang === "pt" ? "Projetos" : "Projects"}
            </Link>
            <Link href={withLang("/publicacoes", lang)} className="hover:text-ambient-dark transition-colors">
              {lang === "pt" ? "Publicações" : "Publications"}
            </Link>
            <Link href={withLang("/sobre", lang)} className="hover:text-ambient-dark transition-colors">
              {lang === "pt" ? "Escritório" : "Studio"}
            </Link>
            <Link href={withLang("/contato", lang)} className="hover:text-ambient-dark transition-colors">
              {lang === "pt" ? "Contato" : "Contact"}
            </Link>
          </div>

          <div className="flex flex-col gap-1">
            <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-ambient-dark transition-colors">
              Instagram
            </a>
            <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-ambient-dark transition-colors">
              WhatsApp
            </a>
            <a href={`mailto:${siteConfig.email}`} className="hover:text-ambient-dark transition-colors">
              {siteConfig.email}
            </a>
          </div>

          <div className="flex flex-col gap-1">
            <Link href={withLang("/contato", lang)} className="hover:text-ambient-dark transition-colors">
              {lang === "pt" ? "Fale conosco ↗" : "Get in touch ↗"}
            </Link>
          </div>

          <div className="flex flex-col gap-1 md:items-end md:text-right">
            <span>{siteConfig.location.city}, {siteConfig.location.state}</span>
            <span>© {new Date().getFullYear()} Julia Fonseca Arquitetura</span>
          </div>
        </div>
      </div>

      <div className="pointer-events-none overflow-hidden">
        <div className="flex w-full items-baseline justify-between whitespace-nowrap text-[#d0cbc5]">
          <span className="inline-block font-display font-[500] text-[7.3vw] uppercase leading-[0.8] tracking-[-0.08em] [transform:scaleX(0.82)] md:text-[9.2vw] [transform-origin:left_center]">
            <span className="flex justify-between gap-[0.2em]">
              <span>J</span>
              <span>u</span>
              <span>l</span>
              <span>i</span>
              <span>a</span>
              <span> </span>
              <span>F</span>
              <span>o</span>
              <span>n</span>
              <span>s</span>
              <span>e</span>
              <span>c</span>
              <span>a</span>
            </span>
          </span>
          <span className="font-display text-[9.8vw] font-[800] uppercase leading-[0.76] tracking-[-0.06em] md:text-[9.1vw]">
            Arquitetura
          </span>
        </div>
      </div>
    </footer>
  );
}
