import Image from "next/image";
import Link from "next/link";
import siteConfig from "@/lib/metadata";
import { withLang, type Lang } from "@/lib/i18n";

export function ProjectDetailFooter({ lang = "pt" }: { lang?: Lang }) {
  return (
    <footer className="project-blueprint-surface project-blueprint-grid overflow-hidden border-t border-white/10 text-white">
      <div className="section-padding py-8 md:py-10">
        <div className="grid gap-x-10 gap-y-5 text-[0.72rem] uppercase tracking-[0.18em] text-white/50 md:grid-cols-[0.9fr_0.9fr_0.7fr_1fr]">
          <div className="flex flex-col gap-2">
            <Link href={withLang("/projetos", lang)} className="transition-colors hover:text-ambient-electric">
              {lang === "pt" ? "Projetos" : "Projects"}
            </Link>
            <Link href={withLang("/publicacoes", lang)} className="transition-colors hover:text-ambient-electric">
              {lang === "pt" ? "Publicações" : "Publications"}
            </Link>
            <Link href={withLang("/escritorio", lang)} className="transition-colors hover:text-ambient-electric">
              {lang === "pt" ? "Escritório" : "Studio"}
            </Link>
            <Link href={withLang("/contato", lang)} className="transition-colors hover:text-ambient-electric">
              {lang === "pt" ? "Contato" : "Contact"}
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ambient-electric">
              Instagram
            </a>
            <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ambient-electric">
              WhatsApp
            </a>
            <a href={`mailto:${siteConfig.email}`} className="break-all transition-colors hover:text-ambient-electric">
              {siteConfig.email}
            </a>
          </div>

          <div className="flex flex-col gap-2">
            <Link href={withLang("/contato", lang)} className="transition-colors hover:text-ambient-electric">
              {lang === "pt" ? "Fale conosco ↗" : "Get in touch ↗"}
            </Link>
          </div>

          <div className="flex flex-col gap-2 md:items-end md:text-right">
            <span>{siteConfig.location.city}, {siteConfig.location.state}</span>
            <span>© {new Date().getFullYear()} Julia Fonseca Arquitetura</span>
          </div>
        </div>
      </div>

      <div className="pointer-events-none overflow-hidden">
        <div className="relative mx-auto h-[9rem] w-[92vw] max-w-[96rem] opacity-20 md:h-[13rem]">
          <Image
            src="/images/brand/jf-arquitetura-original.png"
            alt="JF Arquitetura"
            fill
            sizes="92vw"
            className="object-contain object-center brightness-0 invert"
          />
        </div>
      </div>
    </footer>
  );
}
