import type { Metadata } from "next";
import { PrivacyView } from "@/components/privacy-view";
import { getSiteContent } from "@/content/site";
import { createStaticPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createStaticPageMetadata("en", "privacy");

export default function PrivacyPage() {
  return <PrivacyView copy={getSiteContent("en").privacy} />;
}
