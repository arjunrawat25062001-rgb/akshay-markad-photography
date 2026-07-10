import type { PortfolioCategory, PortfolioCategorySlug, PortfolioItem } from "@/types/portfolio";
import { listPortfolio, listCategories, getPortfolioBySlug } from "@/lib/api/portfolio";
import { normalizeApiError } from "@/lib/api/api";
import { portfolioCategories, portfolioItems } from "@/data/portfolio";

function matchesQuery(item: PortfolioItem, query: string) {
  if (!query.trim()) {
    return true;
  }

  const haystack = [item.title, item.description, item.story, item.location.label, item.tags.join(" ")].join(" ").toLowerCase();
  return haystack.includes(query.trim().toLowerCase());
}

function filterLocalPortfolio(category: PortfolioCategorySlug = "all", query = "", page = 0, size = 12) {
  const filtered = portfolioItems.filter((item) => (category === "all" ? true : item.category === category)).filter((item) => matchesQuery(item, query));
  return filtered.slice(page * size, page * size + size);
}

export async function getPortfolioCategories(): Promise<PortfolioCategory[]> {
  try {
    return await listCategories();
  } catch (error) {
    if (normalizeApiError(error).status === undefined) {
      return portfolioCategories;
    }

    throw error;
  }
}

export async function getPortfolioCategoryBySlug(slug: PortfolioCategorySlug): Promise<PortfolioCategory | undefined> {
  const categories = await getPortfolioCategories();
  return categories.find((category) => category.slug === slug);
}

export async function getPortfolioItems(category: PortfolioCategorySlug = "all", query = "", page = 0, size = 12): Promise<PortfolioItem[]> {
  try {
    const res = await listPortfolio({ page, size, q: query, category: category === "all" ? undefined : category });
    return res.content ?? [];
  } catch (error) {
    if (normalizeApiError(error).status === undefined) {
      return filterLocalPortfolio(category, query, page, size);
    }

    throw error;
  }
}

export async function getPortfolioItemBySlug(category: PortfolioCategorySlug, slug: string): Promise<PortfolioItem | undefined> {
  try {
    return await getPortfolioBySlug(slug);
  } catch (error) {
    if (normalizeApiError(error).status === undefined) {
      return portfolioItems.find((item) => item.slug === slug && (category === "all" || item.category === category));
    }

    throw error;
  }
}

export async function getPortfolioItemBySlugLoose(slug: string): Promise<PortfolioItem | undefined> {
  return getPortfolioItemBySlug("all", slug);
}

export async function getRelatedPortfolioItems(item: PortfolioItem, limit = 4): Promise<PortfolioItem[]> {
  // Call public listing filtered by category and exclude current id
  try {
    const page = await listPortfolio({ page: 0, size: limit, category: item.category });
    const content = page.content || [];
    return content.filter((portfolioItem) => portfolioItem.id !== item.id).slice(0, limit);
  } catch (error) {
    if (normalizeApiError(error).status === undefined) {
      return portfolioItems.filter((portfolioItem) => portfolioItem.category === item.category && portfolioItem.id !== item.id).slice(0, limit);
    }

    throw error;
  }
}

export async function searchPortfolioItems(items: PortfolioItem[], query: string): Promise<PortfolioItem[]> {
  // Prefer backend search; fallback to client-side
  try {
    const res = await listPortfolio({ q: query, page: 0, size: 50 });
    return res.content || [];
  } catch (error) {
    if (normalizeApiError(error).status === undefined) {
      return items.filter((item) => matchesQuery(item, query));
    }

    throw error;
  }
}
