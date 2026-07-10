import { useMemo, useState } from "react";
import type { PortfolioItem } from "@/types/portfolio";
import { searchPortfolioItems } from "@/services/portfolio-service";

export function usePortfolioSearch(items: PortfolioItem[], initialQuery = "") {
  const [query, setQuery] = useState(initialQuery);
  const results = useMemo(() => searchPortfolioItems(items, query), [items, query]);
  return { query, setQuery, results };
}
