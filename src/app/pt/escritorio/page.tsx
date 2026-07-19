import type { Metadata } from "next";
import { StudioView } from "@/components/studio-view";
import { getSiteContent } from "@/content/site";
import { createStaticPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createStaticPageMetadata("pt", "studio");

export default function StudioPage() {
  return <StudioView copy={getSiteContent("pt").studio} locale="pt" />;
}
