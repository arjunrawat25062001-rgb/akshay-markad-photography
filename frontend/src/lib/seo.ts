export function createLocalBusinessJsonLd() { return { "@context": "https://schema.org", "@type": "ProfessionalService", name: "Akshay Markad Photography" }; }

import type { PortfolioItem } from "@/types/portfolio";

export function createPortfolioJsonLd(item: PortfolioItem) {
	return {
		"@context": "https://schema.org",
		"@type": "ImageGallery",
		name: item.title,
		description: item.description,
		url: `/portfolio/${item.category}/${item.slug}`,
		image: item.coverImage?.src,
		datePublished: item.createdAt,
		about: item.tags,
	};
}
