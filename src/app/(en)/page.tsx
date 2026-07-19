import type { Metadata } from "next";
import { HomeExperience } from "@/components/home-experience";
import { getSiteContent } from "@/content/site";
import { createStaticPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createStaticPageMetadata("en", "home");

export default function HomePage() {
  const content = getSiteContent("en");
  return <HomeExperience locale="en" projects={content.projects} copy={content.home} />;
}
