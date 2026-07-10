"use client";

import type { PortfolioItem } from "@/types/portfolio";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
// cn utility not needed here

const itemMotion = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

export function PortfolioGrid({ items, onOpen }: { items: PortfolioItem[]; onOpen: (index: number) => void }) {
  return (
    <div className="masonry-grid">
      {items.map((item, index) => (
        <motion.article key={item.id} layout variants={itemMotion} className="break-inside-avoid mb-6 group overflow-hidden rounded-[1.25rem] border border-white/10 bg-surface transition-transform hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(0,0,0,0.35)] hover:border-gold/60">
          <div className="relative">
            <button type="button" onClick={() => onOpen(index)} className="block w-full overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
              <Image src={item.coverImage.src} alt={item.coverImage.alt} width={item.coverImage.width} height={item.coverImage.height} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
            </button>
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
          </div>
        </motion.article>
      ))}

      <style jsx>{`
        .masonry-grid {
          column-gap: 1rem;
        }
        @media (min-width: 1024px) {
          .masonry-grid { column-count: 4; }
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          .masonry-grid { column-count: 2; }
        }
        @media (max-width: 639px) {
          .masonry-grid { column-count: 1; }
        }
        .break-inside-avoid { break-inside: avoid; }
      `}</style>
    </div>
  );
}
