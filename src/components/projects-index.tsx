import Image from "next/image";
import Link from "next/link";
import {
  getProjectRoute,
  type Locale,
  type LocalizedProject,
  type LocalizedSiteContent,
} from "@/content/site";

export function ProjectsIndex({
  locale,
  projects,
  copy,
}: {
  locale: Locale;
  projects: readonly LocalizedProject[];
  copy: LocalizedSiteContent["projectsIndex"];
}) {
  return (
    <div className="page-shell">
      <header className="page-heading">
        <div>
          <p className="eyebrow">{copy.eyebrow}</p>
          <p className="eyebrow" style={{ marginTop: "0.7rem", opacity: 0.72 }}>
            {copy.countLabel(projects.length)}
          </p>
        </div>
        <div>
          <h1>{copy.title}</h1>
          <div className="page-heading__copy" style={{ marginTop: "3rem" }}>
            <p>{copy.intro}</p>
            <p className="eyebrow" style={{ marginTop: "2rem", opacity: 0.72 }}>
              {copy.disclosure}
            </p>
          </div>
        </div>
      </header>

      <section className="projects-list" aria-label={copy.eyebrow}>
        {projects.map((project, index) => (
          <Link
            key={project.id}
            className="project-row"
            href={getProjectRoute(locale, project)}
          >
            <span className="project-row__number">{String(index + 1).padStart(2, "0")}</span>
            <h2>{project.title}</h2>
            <figure className="project-row__media">
              <Image
                src={project.images[0].src}
                alt={project.images[0].alt}
                fill
                sizes="(max-width: 640px) 90vw, 28vw"
              />
            </figure>
            <span className="project-row__meta">{project.statusLabel}</span>
          </Link>
        ))}
      </section>
    </div>
  );
}
