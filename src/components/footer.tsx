import Link from "next/link";
import siteConfig from "@/lib/metadata";

export function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 py-20 section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <h3 className="font-display text-2xl text-white mb-4">Julia Fonseca</h3>
            <p className="text-sm leading-relaxed">
              Arquitetura residencial, comercial e interiores de alto padr&atilde;o.
              Cada projeto &eacute; uma narrativa &uacute;nica.
            </p>
          </div>
          <div>
            <h4 className="text-xs tracking-widest uppercase text-stone-500 mb-4">
              Navega&ccedil;&atilde;o
            </h4>
            <div className="flex flex-col gap-3">
              <Link href="/residencial" className="text-sm hover:text-white transition-colors">
                Residencial
              </Link>
              <Link href="/comercial" className="text-sm hover:text-white transition-colors">
                Comercial
              </Link>
              <Link href="/interiores" className="text-sm hover:text-white transition-colors">
                Interiores
              </Link>
              <Link href="/sobre" className="text-sm hover:text-white transition-colors">
                Escrit&oacute;rio
              </Link>
            </div>
          </div>
          <div>
            <h4 className="text-xs tracking-widest uppercase text-stone-500 mb-4">Contato</h4>
            <div className="flex flex-col gap-3 text-sm">
              <a
                href={`mailto:${siteConfig.email}`}
                className="hover:text-white transition-colors"
              >
                {siteConfig.email}
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                className="hover:text-white transition-colors"
              >
                WhatsApp
              </a>
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-stone-600">
            &copy; {new Date().getFullYear()} Julia Fonseca Arquitetura. Todos os direitos reservados.
          </p>
          <p className="text-xs text-stone-600">
            {siteConfig.location.city}, {siteConfig.location.state}
          </p>
        </div>
      </div>
    </footer>
  );
}
