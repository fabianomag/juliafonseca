import type { Metadata } from "next";
import { getProjectsBySection } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";
import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Interiores",
  description:
    "Projetos de interiores de alto padrão. Ambientes que refletem a personalidade de quem vive neles.",
};

export default function InterioresPage() {
  const projects = getProjectsBySection("interiores");

  return (
    <div className="bg-ambient-micro text-ambient-dark min-h-screen relative overflow-hidden">
      <div className="ambient-glow" style={{ "--ambient-warm": "#A86D5A" } as any} />

      <section className="pt-40 md:pt-56 pb-32 md:pb-48 section-padding relative z-10">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <SectionHeader
              eyebrow="Interiores"
              title="Ambientes com alma"
              description="Cada ambiente reflete quem você é. O projeto de interiores é uma tradução espacial da sua personalidade."
            />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-24 md:gap-y-32 gap-x-8 md:gap-x-12">
            {projects.map((project, i) => (
              <Reveal key={project.slug} delay={i * 0.08}>
                <div className={i % 2 === 1 ? "md:mt-24" : ""}>
                  <ProjectCard project={project} index={i} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
