import { portfolioSampleData } from "@/data/portfolio-sample-data";
import type { PortfolioPage } from "@/types/portfolio";
const pageSize = 12;
/** Replace this implementation with the Spring Boot endpoint without changing UI consumers. */
export async function getPortfolioPage(cursor?: string): Promise<PortfolioPage> { const offset = cursor ? Number(cursor) : 0; const items = portfolioSampleData.slice(offset, offset + pageSize); const nextOffset = offset + items.length; return { items, nextCursor: nextOffset < portfolioSampleData.length ? String(nextOffset) : null }; }
