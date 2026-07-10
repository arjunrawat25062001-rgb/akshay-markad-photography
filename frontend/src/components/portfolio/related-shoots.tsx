import Link from "next/link";
import type { PortfolioItem } from "@/types/portfolio";

export function RelatedShoots({ items }: { items: PortfolioItem[] }) {
  if (!items.length) return null;
  return (
    <div>
      <h4 className="text-sm font-semibold">Related shoots</h4>
      <div className="mt-4 grid gap-3">
        {items.map((r) => (
          <Link key={r.id} href={`/portfolio/${r.category}/${r.slug}`} className="block rounded-sm border border-white/10 bg-surface px-3 py-3 text-sm text-white/80 hover:text-gold">{r.title}</Link>
        ))}
      </div>
    </div>
  );
}
