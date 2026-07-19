import type { Metadata } from "next";
import Link from "next/link";
import "@/app/globals.css";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: "Page not found · Studio Flamboyant",
  description: "The requested page is not part of the Studio Flamboyant study.",
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <main className="not-found-page">
          <p className="eyebrow">404 · Outside the plan</p>
          <h1>This plane leads nowhere.</h1>
          <p className="serif" style={{ maxWidth: "34rem", fontSize: "1.4rem" }}>
            The address may have changed, or the page may no longer be part of the study.
          </p>
          <Link className="text-link" href="/projects">Return to the projects</Link>
        </main>
      </body>
    </html>
  );
}
