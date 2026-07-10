export function PortfolioLoadingSkeleton() {
  return (
    <div className="container-luxury py-20">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="animate-pulse space-y-3">
            <div className="h-56 w-full rounded-sm bg-white/5" />
            <div className="h-4 w-3/4 rounded-sm bg-white/5" />
            <div className="h-3 w-1/2 rounded-sm bg-white/5" />
          </div>
        ))}
      </div>
    </div>
  );
}
