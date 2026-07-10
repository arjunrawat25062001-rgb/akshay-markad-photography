// `Metadata` type removed: Next's generated types expect Promise-wrapped params
import { notFound } from "next/navigation";
import { getPortfolioItemBySlug, getRelatedPortfolioItems } from "@/services/portfolio-service";
import { createMetadata } from "@/lib/metadata";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { PortfolioBreadcrumb } from "@/components/portfolio/portfolio-breadcrumb";
import { RelatedShoots } from "@/components/portfolio/related-shoots";
import { createPortfolioJsonLd } from "@/lib/seo";
import type { PortfolioCategorySlug } from "@/types/portfolio";

export async function generateStaticParams() {
  // Generate params from sample data for SSG
  const { portfolioItems } = await import("@/data/portfolio");
  return portfolioItems.map((p) => ({ category: p.category, slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: PortfolioCategorySlug; slug: string }> }) {
  const p = await params;
  const item = await getPortfolioItemBySlug(p.category, p.slug);
  if (!item) return {};
  return createMetadata({ title: item.title, description: item.description, path: `/portfolio/${item.category}/${item.slug}` });
}

export default async function StoryPage({ params }: { params: Promise<{ category: PortfolioCategorySlug; slug: string }> }) {
  const p = await params;
  const item = await getPortfolioItemBySlug(p.category, p.slug);
  if (!item) return notFound();
  const related = await getRelatedPortfolioItems(item, 4);
  return (
    <main className="container-luxury py-14">
      <Script id="portfolio-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(createPortfolioJsonLd(item)) }} />
      <PortfolioBreadcrumb items={[{ label: "Portfolio", href: "/portfolio" }, { label: item.category.replace(/-/g, " "), href: `/portfolio/${item.category}` }, { label: item.title }]} />
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="relative aspect-[3/2] overflow-hidden rounded-[1.5rem]">
            <Image src={item.coverImage.src} alt={item.coverImage.alt} fill className="object-cover" />
          </div>
          <h1 className="mt-6 font-display text-4xl">{item.title}</h1>
          <p className="mt-2 text-sm text-white/70">{item.location.label} • {item.createdAt}</p>
          <div className="mt-6 text-body text-white/80">{item.story}</div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {item.galleryImages.map((g) => (
              <div key={g.id} className="relative aspect-[4/3] overflow-hidden rounded-sm">
                <Image src={g.src} alt={g.alt} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
        <aside>
          <div className="space-y-4">
            <div className="rounded-sm border border-white/10 bg-white/5 p-4"> 
              <h3 className="text-sm font-semibold">About this shoot</h3>
              <p className="mt-2 text-sm text-white/80">{item.description}</p>
            </div>
            <div className="rounded-sm border border-white/10 bg-white/5 p-4">
              <h4 className="text-sm font-semibold">Details</h4>
              <ul className="mt-2 text-sm text-white/80 space-y-1">
                <li>Camera: {item.camera}</li>
                <li>Lens: {item.lens}</li>
                <li>Tags: {item.tags.join(", ")}</li>
              </ul>
            </div>
            <div className="rounded-sm border border-white/10 bg-white/5 p-4">
              <h4 className="text-sm font-semibold">Book</h4>
              <div className="mt-2 flex gap-3">
                <Link href="/contact" className="inline-flex items-center rounded-sm border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:text-gold">Book Similar Shoot</Link>
                <a href="https://wa.me/919604818752" target="_blank" rel="noreferrer" className="inline-flex items-center rounded-sm border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:text-gold">WhatsApp</a>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <RelatedShoots items={related} />
          </div>
        </aside>
      </div>
    </main>
  );
}
