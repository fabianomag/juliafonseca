import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { createMetadata } from "@/lib/metadata";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/json-ld";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = createMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
