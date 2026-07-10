import Link from "next/link";

export function PortfolioBreadcrumb({ items }: { items: Array<{ label: string; href?: string }> }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-white/80">
      <ol className="flex items-center gap-2">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-2">
            {it.href ? <Link href={it.href} className="hover:text-gold">{it.label}</Link> : <span aria-current="page">{it.label}</span>}
            {i < items.length - 1 && <span className="text-white/30">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
