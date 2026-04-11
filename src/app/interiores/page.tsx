import type { Metadata } from "next";
import { getProjectsBySection } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";
import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Interiores",
  description:
    "Projetos de interiores de alto padr\u00e3o. Ambientes que refletem a personalidade de quem vive neles.",
};

export default function InterioresPage() {
  const projects = getProjectsBySection("interiores");

  return (
    <section className="pt-32 pb-24 md:pb-32 section-padding">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <SectionHeader
            eyebrow="Interiores"
            title="Ambientes com alma"
            description="Cada ambiente reflete quem voc\u00ea \u00e9. O projeto de interiores \u00e9 uma tradu\u00e7\u00e3o espacial da sua personalidade."
          />
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 100}>
              <ProjectCard project={project} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
