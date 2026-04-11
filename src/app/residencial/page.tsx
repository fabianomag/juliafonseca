import type { Metadata } from "next";
import { getProjectsBySection } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";
import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Residencial",
  description:
    "Projetos residenciais de alto padr\u00e3o. Casas e apartamentos que nascem da escuta e se transformam em lar.",
};

export default function ResidencialPage() {
  const projects = getProjectsBySection("residencial");

  return (
    <section className="pt-32 pb-24 md:pb-32 section-padding">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <SectionHeader
            eyebrow="Residencial"
            title="Casas que contam hist\u00f3rias"
            description="Cada resid\u00eancia \u00e9 um universo. O projeto nasce do modo como voc\u00ea vive \u2014 e transforma esse modo de viver."
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
