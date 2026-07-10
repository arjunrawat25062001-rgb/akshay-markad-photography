import { useQuery } from "@tanstack/react-query";
import { listCategories, listPortfolio, getPortfolioBySlug, type ListParams } from "@/lib/api/portfolio";
import { queryKeys } from "@/lib/react-query/query-keys";

export type UsePortfolioOptions = ListParams & {
  enabled?: boolean;
};

export function usePortfolio(options: UsePortfolioOptions = {}) {
  const { enabled = true, ...params } = options;

  return useQuery({
    queryKey: queryKeys.portfolio.list(params),
    queryFn: () => listPortfolio(params),
    enabled,
  });
}

export function usePortfolioItem(slug: string, enabled = true) {
  return useQuery({
    queryKey: queryKeys.portfolio.item(slug),
    queryFn: () => getPortfolioBySlug(slug),
    enabled: enabled && Boolean(slug),
  });
}

export function usePortfolioCategories(enabled = true) {
  return useQuery({
    queryKey: queryKeys.portfolio.categories(),
    queryFn: listCategories,
    enabled,
  });
}

export const usePortfolioList = usePortfolio;
