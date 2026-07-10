import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { ClientPortfolioPage } from "@/components/portfolio/portfolio-page";
import { getPortfolioCategories, getPortfolioItems } from "@/services/portfolio-service";

export const metadata: Metadata = createMetadata({ title: "Portfolio", description: "Luxury wedding, couple, pre-wedding, event and maternity photography by Akshay Markad.", path: "/portfolio" });

export default async function PortfolioPage() {
  const categories = await getPortfolioCategories();
  const items = await getPortfolioItems();

  return <ClientPortfolioPage categories={categories} items={items} />;
}
