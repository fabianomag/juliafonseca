import { ContactForm } from "@/components/contact-form";
import type { Locale, LocalizedSiteContent } from "@/content/site";

export function ContactView({
  locale,
  copy,
}: {
  locale: Locale;
  copy: LocalizedSiteContent["contact"];
}) {
  return (
    <article className="contact-page">
      <div className="contact-grid">
        <header className="contact-intro">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1>{copy.title}</h1>
          <p>{copy.intro}</p>
          <p className="eyebrow" style={{ marginTop: "2rem" }}>{copy.responseNote}</p>
        </header>
        <ContactForm locale={locale} copy={copy.form} />
      </div>
    </article>
  );
}
