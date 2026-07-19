import type { LocalizedSiteContent } from "@/content/site";

export function PrivacyView({ copy }: { copy: LocalizedSiteContent["privacy"] }) {
  return (
    <article className="privacy-page">
      <article>
        <header>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1>{copy.title}</h1>
          <p className="eyebrow" style={{ marginTop: "1.5rem" }}>{copy.updated}</p>
        </header>
        <div className="privacy-copy">
          <p className="serif" style={{ fontSize: "1.6rem", lineHeight: 1.25 }}>{copy.intro}</p>
          {copy.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </section>
          ))}
        </div>
      </article>
    </article>
  );
}
