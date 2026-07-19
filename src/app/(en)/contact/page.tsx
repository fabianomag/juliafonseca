import type { Metadata } from "next";
import { ContactView } from "@/components/contact-view";
import { getSiteContent } from "@/content/site";
import { createStaticPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createStaticPageMetadata("en", "contact");

export default function ContactPage() {
  return <ContactView locale="en" copy={getSiteContent("en").contact} />;
}
