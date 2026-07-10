export const portfolioCategories = ["All", "Couple Shoots", "Pre Wedding", "Weddings", "Events", "Maternity", "Photo Editing"] as const;
export type PortfolioCategory = (typeof portfolioCategories)[number];
export type PortfolioPhoto = { id: string; title: string; category: Exclude<PortfolioCategory, "All">; location?: string; featured: boolean; imageUrl: string; thumbnailUrl: string; alt: string; width: number; height: number; createdAt: string };
export type PortfolioPage = { items: PortfolioPhoto[]; nextCursor: string | null };
