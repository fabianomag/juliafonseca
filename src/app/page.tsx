import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProjects, getSections } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";
import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/reveal";
import siteConfig from "@/lib/metadata";

export default function Home() {
  const featured = getFeaturedProjects();
  const sections = getSections();

  return (
    <>
      {/* Hero */}
      <section className="relative h-screen flex items-end">
        <Image
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=2400&q=85"
          alt="Projeto residencial de alto padr\u00e3o"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent" />
        <div className="relative z-10 section-padding pb-20 md:pb-28 w-full max-w-7xl">
          <Reveal>
            <p className="text-white/60 text-xs tracking-[0.3em] uppercase mb-4">
              Arquitetura &middot; Interiores &middot; Storytelling
            </p>
          </Reveal>
          <Reveal delay={200}>
            <h1 className="font-display text-display-md md:text-display-lg text-white max-w-4xl">
              Cada espa&ccedil;o conta uma hist&oacute;ria
            </h1>
          </Reveal>
          <Reveal delay={400}>
            <p className="mt-6 text-white/70 text-lg max-w-xl leading-relaxed">
              Projetos residenciais, comerciais e de interiores que nascem da escuta
              atenta e se transformam em ambientes com alma.
            </p>
          </Reveal>
          <Reveal delay={600}>
            <Link
              href="/residencial"
              className="inline-flex items-center gap-3 mt-10 text-white text-sm tracking-widest uppercase hover:gap-5 transition-all duration-300"
            >
              Ver projetos <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Sections overview */}
      <section className="py-24 md:py-32 section-padding">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <SectionHeader
              eyebrow="&Aacute;reas de atua&ccedil;&atilde;o"
              title="Tr&ecirc;s olhares, uma linguagem"
              description="Cada projeto parte de um di&aacute;logo \u2014 entre o cliente, o lugar e a mat&eacute;ria. O resultado &eacute; sempre &uacute;nico."
            />
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {sections.map((section, i) => (
              <Reveal key={section.slug} delay={i * 150}>
                <Link href={`/${section.slug}`} className="group block">
                  <div className="aspect-[4/5] relative image-hover bg-stone-200 mb-6">
                    <Image
                      src={featured.find((p) => p.section === section.slug)?.cover || featured[0].cover}
                      alt={section.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <h3 className="font-display text-2xl text-stone-900 group-hover:text-stone-600 transition-colors">
                    {section.title}
                  </h3>
                  <p className="mt-2 text-stone-500 text-sm">{section.description}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section className="py-24 md:py-32 bg-stone-100 section-padding">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <SectionHeader
              eyebrow="Destaques"
              title="Projetos selecionados"
            />
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {featured.slice(0, 4).map((project, i) => (
              <Reveal key={project.slug} delay={i * 100}>
                <ProjectCard project={project} index={i} size="large" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 section-padding">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <h2 className="font-display text-display-sm md:text-display-md text-stone-900">
              Vamos conversar sobre o seu projeto?
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 text-stone-500 text-lg leading-relaxed">
              Cada projeto come&ccedil;a com uma conversa. Conte o que voc&ecirc; imagina
              e vamos juntos encontrar a melhor solu&ccedil;&atilde;o.
            </p>
          </Reveal>
          <Reveal delay={400}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-stone-900 text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-stone-800 transition-colors"
              >
                WhatsApp
              </a>
              <Link
                href="/contato"
                className="inline-flex items-center gap-2 border border-stone-300 text-stone-700 px-8 py-4 text-sm tracking-widest uppercase hover:border-stone-900 hover:text-stone-900 transition-colors"
              >
                Contato
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
