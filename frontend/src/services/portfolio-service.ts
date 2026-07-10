import type { PortfolioCategory, PortfolioCategorySlug, PortfolioItem } from "@/types/portfolio";
import { listPortfolio, listCategories, getPortfolioBySlug } from "@/lib/api/portfolio";

export async function getPortfolioCategories(): Promise<PortfolioCategory[]> {
  const res = await listCategories();
  return res;
}

export async function getPortfolioItems(category: PortfolioCategorySlug = "all", query = "", page = 0, size = 12): Promise<any> {
  const res = await listPortfolio({ page, size, q: query, category: category === "all" ? undefined : category });
  return res;
}

export async function getPortfolioItemBySlug(category: PortfolioCategorySlug, slug: string): Promise<PortfolioItem | undefined> {
  const res = await getPortfolioBySlug(slug);
  return res;
}

export async function getPortfolioItemBySlugLoose(slug: string): Promise<PortfolioItem | undefined> {
  const res = await getPortfolioBySlug(slug);
  return res;
}

export async function getRelatedPortfolioItems(item: PortfolioItem, limit = 4): Promise<PortfolioItem[]> {
  // Call public listing filtered by category and exclude current id
  const page = await listPortfolio({ page: 0, size: limit, category: item.category });
  const content = page.data?.content || page.content || page;
  return content.filter((i: any) => i.id !== item.id).slice(0, limit);
}

export async function searchPortfolioItems(items: PortfolioItem[], query: string): Promise<PortfolioItem[]> {
  // Prefer backend search; fallback to client-side
  const res = await listPortfolio({ q: query, page: 0, size: 50 });
  return res.data?.content || res.content || res;
}
