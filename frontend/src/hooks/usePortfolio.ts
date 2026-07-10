import { useQuery } from "@tanstack/react-query";
import { listPortfolio, listCategories, getPortfolioBySlug } from "@/lib/api/portfolio";

export function usePortfolioList({ page = 0, size = 12, q, category, featured, tags, location }: any) {
  return useQuery(["portfolio", page, size, q, category, featured, tags, location], () => listPortfolio({ page, size, q, category, featured, tags, location }));
}

export function usePortfolioItem(slug: string) {
  return useQuery(["portfolio-item", slug], () => getPortfolioBySlug(slug), { enabled: !!slug });
}

export function usePortfolioCategories() {
  return useQuery(["portfolio-categories"], () => listCategories());
}
