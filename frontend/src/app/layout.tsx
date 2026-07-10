import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { CustomCursor } from "@/components/shared/custom-cursor";
import { PageTransition } from "@/animations/motion";
import { createMetadata } from "@/lib/metadata";
import { createLocalBusinessJsonLd } from "@/lib/seo";
import "@/styles/globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"], display: "swap" });
export const metadata: Metadata = createMetadata({ description: "Akshay Markad is a luxury photographer documenting meaningful celebrations with a refined, editorial perspective." });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${inter.variable} ${playfair.variable}`}><body><Script id="local-business-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(createLocalBusinessJsonLd()) }} /><CustomCursor /><Navbar /><PageTransition>{children}</PageTransition><Footer /></body></html>;
}
