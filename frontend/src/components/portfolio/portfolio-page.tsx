"use client";

import { useEffect, useMemo, useState } from "react";
import type { PortfolioCategory, PortfolioItem } from "@/types/portfolio";
import { PortfolioHero } from "@/components/portfolio/portfolio-hero";
import { PortfolioGrid } from "@/components/portfolio/portfolio-grid";
import { CategoryTabs } from "@/components/portfolio/category-tabs";
import { PortfolioSearch } from "@/components/portfolio/portfolio-search";
import dynamic from "next/dynamic";

const Lightbox = dynamic(() => import("@/components/portfolio/lightbox").then((m) => m.Lightbox), { ssr: false });
import { PortfolioEmptyState } from "@/components/portfolio/portfolio-empty-state";

interface PortfolioPageProps {
  categories: PortfolioCategory[];
  items: PortfolioItem[];
}

export function ClientPortfolioPage({ categories, items }: PortfolioPageProps) {
  const [selected, setSelected] = useState<string>(() => {
    try {
      return (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("category")) || "all";
    } catch {
      return "all";
    }
  });
  const [query, setQuery] = useState<string>(() => {
    try {
      return (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("q")) || "";
    } catch {
      return "";
    }
  });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = useMemo(() => items.filter((item) => selected === "all" || item.category === selected), [items, selected]);
  const searchResults = useMemo(
    () => filteredItems.filter((item) => [item.title, item.description, item.location.label, ...item.tags].join(" ").toLowerCase().includes(query.toLowerCase())),
    [filteredItems, query],
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (selected && params.get("category") !== selected) {
      params.set("category", selected);
      const url = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState({}, "", url);
    }
    if (query !== params.get("q")) {
      if (query) params.set("q", query); else params.delete("q");
      const url = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState({}, "", url);
    }
  }, [selected, query]);

  return (
    <div>
      <PortfolioHero />
      <div className="container-luxury py-14">
        <CategoryTabs categories={categories} selected={selected} onChange={setSelected} />
        <PortfolioSearch query={query} onQueryChange={setQuery} />
        {searchResults.length === 0 ? (
          <PortfolioEmptyState message={query ? `No results for "${query}"` : "No items in this category yet."} />
        ) : (
          <PortfolioGrid items={searchResults} onOpen={(index) => setLightboxIndex(index)} />
        )}
        {lightboxIndex !== null && <Lightbox images={searchResults} initialIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />}
      </div>
    </div>
  );
}
