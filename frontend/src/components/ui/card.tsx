import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";
type CardProps = HTMLAttributes<HTMLDivElement> & { children: ReactNode };
export function GlassCard({ className, ...props }: CardProps) { return <div className={cn("border border-white/10 bg-white/[0.035] p-6 backdrop-blur-md", className)} {...props} />; }
export function LuxuryCard({ className, ...props }: CardProps) { return <article className={cn("border border-white/10 bg-surface p-6 transition-colors hover:border-gold/50", className)} {...props} />; }
export function ServiceCard({ title, description, className }: { title: string; description: string; className?: string }) { return <LuxuryCard className={cn("space-y-3", className)}><h3 className="font-display text-2xl text-white">{title}</h3><p className="text-sm leading-6 text-text-secondary">{description}</p></LuxuryCard>; }
export function PortfolioCard({ title, category, children, className }: { title: string; category: string; children: ReactNode; className?: string }) { return <article className={cn("group overflow-hidden border border-white/10 bg-surface", className)}><div className="overflow-hidden">{children}</div><div className="p-5"><p className="text-xs uppercase tracking-[0.2em] text-gold">{category}</p><h3 className="mt-2 font-display text-2xl text-white">{title}</h3></div></article>; }
