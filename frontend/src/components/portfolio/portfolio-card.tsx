"use client";

import Image from "next/image";
import Link from "next/link";
import type { PortfolioItem } from "@/types/portfolio";

export function PortfolioCard({ item, onOpen }: { item: PortfolioItem; onOpen?: () => void }) {
  return (
    <article className="group overflow-hidden rounded-[1.25rem] border border-white/10 bg-surface">
      <div className="relative">
        <button type="button" onClick={onOpen} className="block w-full overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
          <Image src={item.coverImage.src} alt={item.coverImage.alt} width={item.coverImage.width} height={item.coverImage.height} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-90" />
        </button>
      </div>
      <div className="p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-gold">{item.category.replace(/-/g, " ")}</p>
        <h3 className="mt-2 font-display text-2xl text-white">{item.title}</h3>
        <div className="mt-4 flex items-center justify-between text-xs text-white/80">
          <span>{item.location.label}</span>
          <span>{new Date(item.createdAt).getFullYear()}</span>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <Link href={`/portfolio/${item.category}/${item.slug}`} className="text-xs uppercase tracking-[0.18em] text-white/80 hover:text-gold">Read More</Link>
        </div>
      </div>
    </article>
  );
}
