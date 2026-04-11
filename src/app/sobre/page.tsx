import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import siteConfig from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Escrit\u00f3rio",
  description:
    "Conhe\u00e7a Julia Fonseca, arquiteta especializada em projetos residenciais, comerciais e de interiores de alto padr\u00e3o.",
};

export default function SobrePage() {
  return (
    <section className="pt-32 pb-24 md:pb-32 section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Image */}
          <Reveal>
            <div className="relative aspect-[3/4] bg-stone-200">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&q=80"
                alt="Julia Fonseca"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </Reveal>

          {/* Text */}
          <div className="md:pt-12">
            <Reveal>
              <p className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-3">
                Escrit&oacute;rio
              </p>
              <h1 className="font-display text-display-sm md:text-display-md text-stone-900 mb-8">
                Julia Fonseca
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <div className="space-y-6 text-stone-600 leading-relaxed">
                <p>
                  Arquitetura, para mim, &eacute; a arte de traduzir o invis&iacute;vel em espa&ccedil;o.
                  Cada projeto come&ccedil;a com uma conversa longa &mdash; sobre como voc&ecirc; acorda,
                  como recebe amigos, que luz te faz bem, que barulho te incomoda.
                </p>
                <p>
                  Meu trabalho &eacute; transformar essas respostas em paredes, aberturas,
                  materiais e propor&ccedil;&otilde;es. N&atilde;o acredito em solu&ccedil;&otilde;es gen&eacute;ricas &mdash;
                  acredito que cada pessoa merece um espa&ccedil;o que s&oacute; poderia ser dela.
                </p>
                <p>
                  Atuo em projetos residenciais, comerciais e de interiores,
                  sempre com a mesma premissa: escutar antes de desenhar.
                  O resultado &eacute; uma arquitetura com alma, que envelhece bonito
                  e melhora com o tempo.
                </p>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <div className="mt-12 pt-8 border-t border-stone-200">
                <dl className="grid grid-cols-2 gap-8">
                  <div>
                    <dt className="text-xs tracking-widest uppercase text-stone-400 mb-1">
                      Base
                    </dt>
                    <dd className="text-stone-800">
                      {siteConfig.location.city}, {siteConfig.location.state}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs tracking-widest uppercase text-stone-400 mb-1">
                      Atua&ccedil;&atilde;o
                    </dt>
                    <dd className="text-stone-800">Residencial, Comercial, Interiores</dd>
                  </div>
                  <div>
                    <dt className="text-xs tracking-widest uppercase text-stone-400 mb-1">
                      Contato
                    </dt>
                    <dd>
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="text-stone-800 hover:text-stone-600 transition-colors"
                      >
                        {siteConfig.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs tracking-widest uppercase text-stone-400 mb-1">
                      Instagram
                    </dt>
                    <dd>
                      <a
                        href={siteConfig.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-stone-800 hover:text-stone-600 transition-colors"
                      >
                        @juliafonseca.arq
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </Reveal>

            <Reveal delay={500}>
              <Link
                href="/contato"
                className="inline-block mt-10 bg-stone-900 text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-stone-800 transition-colors"
              >
                Fale comigo
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
