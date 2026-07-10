import { api } from "./api";
import type { PortfolioItem, PortfolioCategory } from "@/types/portfolio";

export type ListParams = {
  page?: number;
  size?: number;
  q?: string;
  category?: string;
  featured?: boolean;
  tags?: string;
  location?: string;
};

export async function listPortfolio(params: ListParams = {}) {
  const res = await api.get("/api/portfolio", { params });
  return res.data; // Page<PortfolioItemDto>
}

export async function getPortfolioBySlug(slug: string) {
  const res = await api.get(`/api/portfolio/${encodeURIComponent(slug)}`);
  return res.data?.data || res.data;
}

export async function listCategories(): Promise<PortfolioCategory[]> {
  const res = await api.get("/api/portfolio/categories");
  return res.data?.data || res.data;
}
