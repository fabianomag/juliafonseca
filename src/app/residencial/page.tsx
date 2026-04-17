import type { Metadata } from "next";
import { getProjectsBySection } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";
import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Residencial",
  description:
    "Projetos residenciais de alto padrão. Casas e apartamentos que nascem da escuta e se transformam em lar.",
};

export default function ResidencialPage() {
  const projects = getProjectsBySection("residencial");

  return (
    <div className="bg-ambient-micro text-ambient-dark min-h-screen relative overflow-hidden">
      <div className="ambient-glow" style={{ "--ambient-warm": "#EAE8E3" } as any} />

      <section className="pt-40 md:pt-56 pb-32 md:pb-48 section-padding relative z-10">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <SectionHeader
              eyebrow="Residencial"
              title="Casas que contam histórias"
              description="Cada residência é um universo. O projeto nasce do modo como você vive — e transforma esse modo de viver."
            />
          </Reveal>

          {/* Offset grid for editorial feel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-24 md:gap-y-32 gap-x-8 md:gap-x-12">
            {projects.map((project, i) => (
              <Reveal key={project.slug} delay={i * 0.08}>
                <div className={i % 2 === 1 ? "md:mt-24" : ""}>
                  <ProjectCard project={project} index={i} size={i === 0 ? "large" : "default"} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
