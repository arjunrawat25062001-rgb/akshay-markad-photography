import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { getPortfolioCategoryBySlug, getPortfolioItems, getPortfolioCategories } from "@/services/portfolio-service";
import { notFound } from "next/navigation";
import { ClientPortfolioPage } from "@/components/portfolio/portfolio-page";
import type { PortfolioCategorySlug } from "@/types/portfolio";

export async function generateStaticParams() {
  const categories = await getPortfolioCategories();
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: PortfolioCategorySlug }> }): Promise<Metadata> {
  const p = await params;
  const category = await getPortfolioCategoryBySlug(p.category);
  if (!category) return {};
  return createMetadata({ title: `${category.label}`, description: `Portfolio – ${category.label}`, path: `/portfolio/${category.slug}` });
}

export default async function CategoryPage({ params }: { params: Promise<{ category: PortfolioCategorySlug }> }) {
  const p = await params;
  const category = await getPortfolioCategoryBySlug(p.category);
  const categories = await getPortfolioCategories();
  if (!category) {
    return notFound();
  }
  const items = await getPortfolioItems(category.slug);
  return (
    <>
      <ClientPortfolioPage categories={categories} items={items} />
    </>
  );
}
