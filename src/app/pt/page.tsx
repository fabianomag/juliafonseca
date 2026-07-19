import type { Metadata } from "next";
import { HomeExperience } from "@/components/home-experience";
import { getSiteContent } from "@/content/site";
import { createStaticPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createStaticPageMetadata("pt", "home");

export default function HomePage() {
  const content = getSiteContent("pt");
  return <HomeExperience locale="pt" projects={content.projects} copy={content.home} />;
}
