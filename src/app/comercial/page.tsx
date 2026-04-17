import type { Metadata } from "next";
import { getProjectsBySection } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";
import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Comercial",
  description:
    "Projetos comerciais que transformam negócios. Espaços que comunicam a identidade da marca.",
};

export default function ComercialPage() {
  const projects = getProjectsBySection("comercial");

  return (
    <div className="bg-ambient-micro text-ambient-dark min-h-screen relative overflow-hidden">
      <div className="ambient-glow" style={{ "--ambient-warm": "#C5A880" } as any} />

      <section className="pt-40 md:pt-56 pb-32 md:pb-48 section-padding relative z-10">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <SectionHeader
              eyebrow="Comercial"
              title="Espaços que transformam negócios"
              description="Arquitetura comercial que vai além da estética — cada ambiente é projetado para a experiência do cliente e a operação do negócio."
            />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-24 md:gap-y-32 gap-x-8 md:gap-x-12">
            {projects.map((project, i) => (
              <Reveal key={project.slug} delay={i * 0.08}>
                <div className={i % 2 === 1 ? "md:mt-24" : ""}>
                  <ProjectCard project={project} index={i} size="large" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
