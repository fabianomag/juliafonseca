import Image from "next/image";
import Link from "next/link";
import type { LocalizedSiteContent } from "@/content/site";

export function StudioView({ copy }: { copy: LocalizedSiteContent["studio"] }) {
  return (
    <article className="studio-page">
      <aside className="studio-media" aria-label={copy.eyebrow}>
        {copy.media.map((media, index) => (
          <figure key={media.src}>
            <Image
              src={media.src}
              alt={media.alt}
              fill
              priority={index === 0}
              sizes="(max-width: 960px) 100vw, 46vw"
            />
            <figcaption className="eyebrow" style={{ position: "absolute", left: "1rem", bottom: "1rem", color: "white" }}>
              {media.caption}
            </figcaption>
          </figure>
        ))}
      </aside>

      <section className="studio-copy">
        <div className="studio-copy__sticky">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1>{copy.title}</h1>
          <div>
            {copy.manifesto.map((paragraph) => (
              <p key={paragraph} className="studio-manifesto" style={{ marginTop: "1.4rem" }}>
                {paragraph}
              </p>
            ))}
          </div>

          <section className="studio-principles" aria-label={copy.principlesLabel}>
            {copy.principles.map((principle) => (
              <article key={principle.number}>
                <span className="eyebrow">{principle.number}</span>
                <div>
                  <h2>{principle.title}</h2>
                  <p>{principle.body}</p>
                </div>
              </article>
            ))}
          </section>

          <Link className="text-link" style={{ marginTop: "3rem" }} href={copy.serviceCta.href}>
            {copy.serviceCta.action}
          </Link>
        </div>
      </section>
    </article>
  );
}
