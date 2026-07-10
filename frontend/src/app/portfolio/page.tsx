import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { ClientPortfolioPage } from "@/components/portfolio/portfolio-page";
import dynamic from "next/dynamic";

export const metadata: Metadata = createMetadata({ title: "Portfolio", description: "Luxury wedding, couple, pre-wedding, event and maternity photography by Akshay Markad.", path: "/portfolio" });

const ClientOnlyPortfolio = dynamic(() => import("@/components/portfolio/portfolio-page").then((m) => m.ClientPortfolioPage), { ssr: false });

export default function PortfolioPage() {
  return <ClientOnlyPortfolio />;
}
