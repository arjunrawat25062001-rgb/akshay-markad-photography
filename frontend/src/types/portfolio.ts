export interface PortfolioCategory {
  slug: "all" | "weddings" | "pre-wedding" | "couple" | "events" | "maternity" | "photo-editing";
  label: string;
}

export type PortfolioCategorySlug = PortfolioCategory["slug"];

export interface PortfolioLocation {
  id: string;
  label: string;
}

export interface PortfolioImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface PortfolioItem {
  id: string;
  slug: string;
  title: string;
  category: PortfolioCategorySlug;
  location: PortfolioLocation;
  coverImage: PortfolioImage;
  galleryImages: PortfolioImage[];
  featured: boolean;
  tags: string[];
  camera: string;
  lens: string;
  description: string;
  story: string;
  createdAt: string;
}

export const legacyPortfolioCategories = ["All", "Couple Shoots", "Pre Wedding", "Weddings", "Events", "Maternity", "Photo Editing"] as const;
export type LegacyPortfolioCategory = (typeof legacyPortfolioCategories)[number];

export type PortfolioPhoto = {
  id: string;
  title: string;
  category: Exclude<LegacyPortfolioCategory, "All">;
  location?: string;
  featured: boolean;
  imageUrl: string;
  thumbnailUrl: string;
  alt: string;
  width: number;
  height: number;
  createdAt: string;
};

export type PortfolioPage = { items: PortfolioPhoto[]; nextCursor: string | null };

