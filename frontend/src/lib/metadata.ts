import type { Metadata } from "next";
const siteName = "Akshay Markad Photography";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://akshaymarkad.com";
export function createMetadata({ title, description, path = "/" }: { title?: string; description: string; path?: string }): Metadata {
  const resolvedTitle = title ? `${title} | ${siteName}` : siteName;
  return { title: resolvedTitle, description, metadataBase: new URL(siteUrl), alternates: { canonical: path }, openGraph: { title: resolvedTitle, description, url: path, siteName, type: "website" }, twitter: { card: "summary_large_image", title: resolvedTitle, description } };
}
