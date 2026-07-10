"use client";

import type { ChangeEvent } from "react";

export function PortfolioSearch({ query, onQueryChange }: { query: string; onQueryChange: (value: string) => void }) {
  return (
    <div className="mb-8">
      <label className="sr-only" htmlFor="portfolio-search">
        Search portfolio
      </label>
      <input
        id="portfolio-search"
        type="search"
        value={query}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onQueryChange(event.target.value)}
        placeholder="Search by story, location or mood"
        className="w-full rounded-sm border border-white/10 bg-black/40 px-4 py-4 text-sm text-white placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        aria-label="Search portfolio items"
      />
    </div>
  );
}
