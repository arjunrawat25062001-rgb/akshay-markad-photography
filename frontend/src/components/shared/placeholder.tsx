import { cn } from "@/utils/cn";

export function PortraitPlaceholder({ className }: { className?: string }) {
  return (
    <div className={cn("relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-sm border border-dashed border-white/20 bg-white/5 px-6 py-10 text-center text-white/70", className)}>
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-white/10 text-sm uppercase tracking-[0.26em] text-gold">
        Portrait
      </div>
      <p className="mt-8 text-sm font-semibold text-white">Portrait Placeholder</p>
      <p className="mt-3 text-sm leading-6 text-text-secondary">This image frame can be replaced with Akshay’s personal portrait.</p>
    </div>
  );
}
