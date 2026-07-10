"use client";

import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import type { PortfolioCategory } from "@/types/portfolio";

const tabMotion = { hover: { y: -2 }, tap: { scale: 0.97 } };

export function CategoryTabs({ categories, selected, onChange }: { categories: PortfolioCategory[]; selected: string; onChange: (slug: string) => void }) {
  return (
    <div className="mb-10 flex flex-wrap gap-3">
      {categories.map((category) => (
        <motion.button key={category.slug} type="button" whileHover="hover" whileTap="tap" variants={tabMotion} onClick={() => onChange(category.slug)} className={cn("rounded-sm border border-white/10 px-5 py-3 text-sm uppercase tracking-[0.22em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold", selected === category.slug ? "bg-gold text-black" : "bg-white/5 text-white hover:bg-white/10")}>
          {category.label}
        </motion.button>
      ))}
    </div>
  );
}
