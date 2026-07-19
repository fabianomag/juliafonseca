import type { Metadata } from "next";
import "@/app/globals.css";
import { LocaleRoot } from "@/components/locale-root";
import { createRootMetadata } from "@/lib/metadata";

export const metadata: Metadata = createRootMetadata("pt");

export default function PortugueseLayout({ children }: { children: React.ReactNode }) {
  return <LocaleRoot locale="pt">{children}</LocaleRoot>;
}
