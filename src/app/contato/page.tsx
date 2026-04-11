import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";
import siteConfig from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Entre em contato com Julia Fonseca Arquitetura. Projetos residenciais, comerciais e interiores de alto padr\u00e3o.",
};

export default function ContatoPage() {
  return (
    <section className="pt-32 pb-24 md:pb-32 section-padding">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <SectionHeader
            eyebrow="Contato"
            title="Vamos conversar"
            description="Cada projeto come\u00e7a com uma conversa. Conte o que voc\u00ea imagina e vamos juntos encontrar a melhor solu\u00e7\u00e3o."
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact info */}
          <Reveal delay={200}>
            <div className="space-y-8">
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 group"
              >
                <Phone size={20} className="text-stone-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs tracking-widest uppercase text-stone-400 mb-1">
                    WhatsApp
                  </p>
                  <p className="text-stone-800 group-hover:text-stone-600 transition-colors">
                    +55 (38) 99266-5556
                  </p>
                </div>
              </a>

              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-start gap-4 group"
              >
                <Mail size={20} className="text-stone-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs tracking-widest uppercase text-stone-400 mb-1">
                    Email
                  </p>
                  <p className="text-stone-800 group-hover:text-stone-600 transition-colors">
                    {siteConfig.email}
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <MapPin size={20} className="text-stone-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs tracking-widest uppercase text-stone-400 mb-1">
                    Localiza&ccedil;&atilde;o
                  </p>
                  <p className="text-stone-800">
                    {siteConfig.location.city}, {siteConfig.location.state}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-stone-200">
                <a
                  href={siteConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-stone-500 hover:text-stone-800 transition-colors"
                >
                  Instagram &mdash; @juliafonseca.arq
                </a>
              </div>
            </div>
          </Reveal>

          {/* CTA card */}
          <Reveal delay={300}>
            <div className="bg-stone-100 p-10 md:p-12">
              <h3 className="font-display text-2xl text-stone-900 mb-4">
                Pronta para come&ccedil;ar?
              </h3>
              <p className="text-stone-600 leading-relaxed mb-8">
                Se voc&ecirc; tem um projeto em mente &mdash; ou mesmo s&oacute; uma ideia &mdash;
                a melhor forma de come&ccedil;ar &eacute; uma conversa sem compromisso.
                Me conta o que voc&ecirc; imagina e a gente v&ecirc; juntos se faz sentido.
              </p>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
                  "Ol\u00e1 Julia! Vi seu site e gostaria de conversar sobre um projeto."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-stone-900 text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-stone-800 transition-colors"
              >
                Enviar mensagem
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
