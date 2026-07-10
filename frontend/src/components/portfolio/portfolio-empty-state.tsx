export function PortfolioEmptyState({ message = "No items match your search." }: { message?: string }) {
  return (
    <div className="container-luxury py-28 text-center">
      <div className="mx-auto max-w-xl rounded-sm border border-white/10 bg-white/5 p-12">
        <h3 className="font-display text-2xl">Nothing here yet</h3>
        <p className="mt-4 text-white/70">{message}</p>
      </div>
    </div>
  );
}
