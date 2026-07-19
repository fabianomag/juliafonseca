import { ContactForm } from "@/components/contact-form";
import { MontesClarosMap } from "@/components/montes-claros-map";
import styles from "@/components/contact-showcase.module.css";
import type { Locale, LocalizedSiteContent } from "@/content/site";

export function ContactView({
  locale,
  copy,
}: {
  locale: Locale;
  copy: LocalizedSiteContent["contact"];
}) {
  const title =
    locale === "pt"
      ? { lead: "Quer um site com este", accent: "nível de cuidado?" }
      : { lead: "Want a site with this", accent: "level of care?" };
  const location =
    locale === "pt"
      ? { label: "Base do Fabiano", place: "Montes Claros · Minas Gerais · Brasil" }
      : { label: "Fabiano's base", place: "Montes Claros · Minas Gerais · Brazil" };

  return (
    <article className={styles.showcase}>
      <MontesClarosMap />
      <div className={styles.veil} aria-hidden="true" />

      <section className={styles.content} aria-labelledby="contact-title">
        <div className={styles.card}>
          <header className={styles.intro}>
            <p className={`eyebrow ${styles.eyebrow}`}>{copy.eyebrow}</p>
            <h1 id="contact-title">
              <span>{title.lead}</span> <em>{title.accent}</em>
            </h1>
            <p className={styles.introCopy}>{copy.intro}</p>
            <p className={styles.responseNote}>{copy.responseNote}</p>
          </header>

          <div className={styles.formPanel}>
            <ContactForm locale={locale} copy={copy.form} />
          </div>
        </div>
      </section>

      <aside className={styles.locationBadge} aria-label={`${location.label}: ${location.place}`}>
        <span>{location.label}</span>
        <strong>{location.place}</strong>
      </aside>

      <a
        className={styles.attribution}
        href="https://www.openstreetmap.org/copyright"
        target="_blank"
        rel="noreferrer"
      >
        Map data © OpenStreetMap contributors
      </a>
    </article>
  );
}
