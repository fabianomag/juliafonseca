import type { Metadata } from "next";
import "@/app/globals.css";
import { LocaleRoot } from "@/components/locale-root";
import { createRootMetadata } from "@/lib/metadata";

export const metadata: Metadata = createRootMetadata("en");

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <LocaleRoot locale="en">{children}</LocaleRoot>;
}
