import Link from "next/link";
import { getSiteContent } from "@/content/site";

export default function NotFound() {
  const copy = getSiteContent("pt").notFound;
  return (
    <section className="not-found-page">
      <p className="eyebrow">{copy.eyebrow}</p>
      <h1>{copy.title}</h1>
      <p className="serif" style={{ maxWidth: "34rem", fontSize: "1.4rem" }}>{copy.body}</p>
      <Link className="text-link" href={copy.href}>{copy.action}</Link>
    </section>
  );
}
