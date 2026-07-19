import Image from "next/image";
import Link from "next/link";
import {
  getProjectRoute,
  type Locale,
  type LocalizedProject,
} from "@/content/site";

export function ProjectDetail({
  locale,
  project,
  nextProject,
}: {
  locale: Locale;
  project: LocalizedProject;
  nextProject: LocalizedProject;
}) {
  const gallery = project.images.slice(1);
  const showWideFirst = gallery.length > 2;
  const wide = showWideFirst ? gallery[0] : undefined;
  const paired = showWideFirst ? gallery.slice(1) : gallery;

  return (
    <article>
      <header className="project-hero">
        <Image
          src={project.images[0].src}
          alt={project.images[0].alt}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
        />
        <div className="project-hero__copy">
          <h1>{project.title}</h1>
          <div className="project-hero__meta">
            <p>{project.eyebrow}</p>
            <p>{project.statusLabel}</p>
          </div>
        </div>
      </header>

      <section className="project-intro">
        <div>
          <p className="eyebrow">{project.themes.join(" · ")}</p>
        </div>
        <div>
          <p className="project-intro__statement">{project.summary}</p>
          <div className="project-intro__body" style={{ marginTop: "3rem" }}>
            {project.statement.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {gallery.length > 0 && (
        <section className="project-gallery" aria-label={locale === "pt" ? "Galeria do estudo" : "Study gallery"}>
          {wide && (
            <figure className="project-gallery__full">
              <Image src={wide.src} alt={wide.alt} fill sizes="100vw" />
            </figure>
          )}
          {paired.length > 0 && (
            <div className="project-gallery__pair">
              {paired.map((image) => (
                <figure key={image.src}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 92vw, 40vw"
                  />
                </figure>
              ))}
            </div>
          )}
        </section>
      )}

      <section className="next-project">
        <div>
          <p className="eyebrow">{locale === "pt" ? "Próximo estudo" : "Next study"}</p>
          <Link href={getProjectRoute(locale, nextProject)}>
            <h2>{nextProject.title}</h2>
          </Link>
        </div>
        <Link className="text-link" href={getProjectRoute(locale, nextProject)}>
          {locale === "pt" ? "Continuar" : "Continue"}
        </Link>
      </section>
    </article>
  );
}
