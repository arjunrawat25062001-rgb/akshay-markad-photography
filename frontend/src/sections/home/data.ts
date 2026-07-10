import type { PortfolioPhoto } from "@/types/portfolio";

export const imageSet = [
  "https://images.unsplash.com/photo-1533089860892-a7d4d26130cf?auto=format&fit=crop&w=1800&q=90",
  "https://images.unsplash.com/photo-1542089363-18bbb760c9e5?auto=format&fit=crop&w=1800&q=90",
  "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1800&q=90",
  "https://images.unsplash.com/photo-1479479005408-8f63a6a38dd2?auto=format&fit=crop&w=1800&q=90",
] as const;

export const portfolioItems: PortfolioPhoto[] = [
  {
    id: "marigold-vow",
    title: "The Marigold Vow",
    category: "Weddings",
    location: "Pune",
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=85",
    thumbnailUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    alt: "Luxury wedding photography in Pune",
    width: 1200,
    height: 1500,
    createdAt: "2026-03-01",
  },
  {
    id: "quietly-us",
    title: "Quietly Us",
    category: "Couple Shoots",
    location: "Pune",
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=85",
    thumbnailUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    alt: "Couple photography in a refined editorial style",
    width: 1200,
    height: 1500,
    createdAt: "2026-02-18",
  },
  {
    id: "before-forever",
    title: "Before Forever",
    category: "Pre Wedding",
    location: "Maharashtra",
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=85",
    thumbnailUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    alt: "Luxury pre wedding photography",
    width: 1200,
    height: 1500,
    createdAt: "2026-02-10",
  },
  {
    id: "the-gathering",
    title: "The Gathering",
    category: "Events",
    location: "Mumbai",
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=85",
    thumbnailUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    alt: "Event photography with refined detail",
    width: 1200,
    height: 1500,
    createdAt: "2026-01-15",
  },
  {
    id: "new-beginning",
    title: "A New Beginning",
    category: "Maternity",
    location: "Pune",
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=85",
    thumbnailUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    alt: "Maternity photography with warm editorial polish",
    width: 1200,
    height: 1500,
    createdAt: "2026-03-11",
  },
];

export const services = [
  {
    title: "Wedding Photography",
    description: "Every ritual, glance and emotion preserved with refined editorial detail.",
    icon: "camera",
  },
  {
    title: "Pre Wedding",
    description: "A cinematic prelude to the celebration ahead, styled with intimacy.",
    icon: "spark",
  },
  {
    title: "Couple Shoots",
    description: "Portraits steeped in honest connection and emotional nuance.",
    icon: "heart",
  },
  {
    title: "Events",
    description: "Polished coverage for milestones and moments across India.",
    icon: "clock",
  },
  {
    title: "Maternity",
    description: "Tender imagery that honors the anticipation of a new chapter.",
    icon: "heart",
  },
  {
    title: "Photo Editing",
    description: "A considered editorial finish with tone and texture that elevates every frame.",
    icon: "spark",
  },
] as const;

export const portfolioCategories = ["Wedding", "Pre Wedding", "Couple", "Events", "Maternity"] as const;
