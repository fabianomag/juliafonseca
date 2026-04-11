import type { Metadata } from "next";
import { getProjectsBySection } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";
import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Comercial",
  description:
    "Projetos comerciais que transformam neg\u00f3cios. Espa\u00e7os que comunicam a identidade da marca.",
};

export default function ComercialPage() {
  const projects = getProjectsBySection("comercial");

  return (
    <section className="pt-32 pb-24 md:pb-32 section-padding">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <SectionHeader
            eyebrow="Comercial"
            title="Espa\u00e7os que transformam neg\u00f3cios"
            description="Arquitetura comercial que vai al\u00e9m da est\u00e9tica \u2014 cada ambiente \u00e9 projetado para a experi\u00eancia do cliente e a opera\u00e7\u00e3o do neg\u00f3cio."
          />
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 100}>
              <ProjectCard project={project} index={i} size="large" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
