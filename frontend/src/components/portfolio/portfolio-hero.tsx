import Link from "next/link";

export function PortfolioHero() {
  return (
    <section className="container-luxury py-24 lg:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <p className="eyebrow">Portfolio</p>
        <h1 className="text-display-xl mt-6">Portfolio</h1>
        <p className="mt-6 text-body text-white/70">Every photograph tells a story.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/contact" className="inline-flex items-center rounded-sm border border-white/10 bg-white/5 px-5 py-3 text-sm uppercase tracking-[0.18em] text-white transition-colors hover:border-gold hover:text-gold">
            Book similar shoot
          </Link>
          <a href="https://wa.me/919604818752" target="_blank" rel="noreferrer" className="inline-flex items-center rounded-sm border border-white/10 bg-white/5 px-5 py-3 text-sm uppercase tracking-[0.18em] text-white transition-colors hover:border-gold hover:text-gold">
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
