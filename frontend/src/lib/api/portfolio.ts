import { api, normalizeApiError, unwrapApiData } from "./api";
import type { PortfolioCategory, PortfolioItem } from "@/types/portfolio";

export type ListParams = {
  page?: number;
  size?: number;
  q?: string;
  category?: string;
  featured?: boolean;
  tags?: string;
  location?: string;
};

export type PortfolioPageResponse = {
  content: PortfolioItem[];
  totalElements?: number;
  totalPages?: number;
  number?: number;
  size?: number;
};

export async function listPortfolio(params: ListParams = {}) {
  const response = await api.get<PortfolioPageResponse>("/api/portfolio", { params });
  return response.data;
}

export async function getPortfolioBySlug(slug: string) {
  try {
    const response = await api.get<PortfolioItem>(`/api/portfolio/${encodeURIComponent(slug)}`);
    return unwrapApiData<PortfolioItem>(response);
  } catch (error) {
    if (normalizeApiError(error).status === 404) {
      return undefined;
    }

    throw error;
  }
}

export async function listCategories(): Promise<PortfolioCategory[]> {
  const response = await api.get<PortfolioCategory[]>("/api/portfolio/categories");
  return unwrapApiData<PortfolioCategory[]>(response);
}
