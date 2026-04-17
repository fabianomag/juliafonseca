import type { Metadata } from "next";
import { Suspense } from "react";
import { Barlow, Barlow_Condensed, Newsreader, Syncopate, Geist } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { FooterController } from "@/components/footer-controller";
import { createMetadata } from "@/lib/metadata";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/json-ld";
import { SmoothScroll } from "@/components/smooth-scroll";
import { SiteIntro } from "@/components/site-intro";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const barlow = Barlow({
  subsets: ["latin"],
  variable: "--font-barlow",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const syncopate = Syncopate({
  subsets: ["latin"],
  variable: "--font-syncopate",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = createMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={cn(barlow.variable, barlowCondensed.variable, newsreader.variable, syncopate.variable, "font-sans", geist.variable)}
    >
      <body className="font-sans antialiased bg-ambient-micro text-ambient-dark selection:bg-ambient-electric/20">
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <SiteIntro />
        <SmoothScroll>
          <Suspense fallback={null}>
            <Navigation />
          </Suspense>
          <main>{children}</main>
          <Suspense fallback={null}>
            <FooterController />
          </Suspense>
        </SmoothScroll>
      </body>
    </html>
  );
}
