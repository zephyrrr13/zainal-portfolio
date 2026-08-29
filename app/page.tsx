import { KineticHero } from "@/components/kinetic-hero";
import { ElasticGallery } from "@/components/elastic-gallery";
import { PortfolioSection } from "@/components/portfolio-section";
import { ContactSection } from "@/components/contact-section";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink, Clock, ArrowUpRight, Sparkles } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/data";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const data = db.get();
  const latestArticles = data.articles.filter((a) => a.published).slice(0, 3);

  return (
    <>
      {/* 1. Kinetic Hero with Interleaved Cutout & 21st ASCII */}
      <KineticHero />

      {/* 2. 21st.dev Elastic Works Gallery (5 Behance Projects) */}
      <ElasticGallery />

      {/* 3. Selected Portfolio Cases (ASCII & Spec Toggles) */}
      <PortfolioSection
        limit={4}
        title="FEATURED 3D & STAGE ARCHITECTURE"
        showAllLink={true}
      />

      {/* 4. Latest Articles, Tutorials & News Section */}
      <section className="bg-black px-4 sm:px-8 py-20 border-t border-white/10 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-zinc-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>EDITORIAL & KNOWLEDGE BASE</span>
              </div>
              <h2 className="mt-3 text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
                ARTICLES, TUTORIALS & NEWS
              </h2>
            </div>

            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:border-white hover:bg-white hover:text-black transition-all"
            >
              <span>VIEW ALL POSTS</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestArticles.map((art) => (
              <Link
                key={art.id}
                href={`/blog/${art.slug}`}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-white/15 bg-zinc-950/80 p-6 transition-all duration-300 hover:border-white/40 hover:bg-zinc-900/60"
              >
                <div>
                  {art.coverImage && (
                    <div className="relative h-48 w-full overflow-hidden rounded-xl bg-zinc-900 mb-5 border border-white/10">
                      <Image
                        src={art.coverImage}
                        alt={art.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute top-2.5 left-2.5 rounded bg-black/80 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-300 backdrop-blur-md border border-white/15">
                        {art.category}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-3 font-mono text-[11px] text-zinc-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {art.readTime}
                    </span>
                    <span>•</span>
                    <span>{art.publishedAt ? new Date(art.publishedAt).toLocaleDateString("id-ID", { dateStyle: "medium" }) : "Recent"}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-zinc-200 transition-colors leading-snug line-clamp-2">
                    {art.title}
                  </h3>

                  <p className="mt-2 text-xs text-zinc-400 line-clamp-2 leading-relaxed font-sans">
                    {art.excerpt}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 font-mono text-xs font-bold uppercase text-zinc-300 group-hover:text-white">
                  <span>Read Article</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. View All Works & Gallery Banners */}
      <section className="bg-black px-4 sm:px-8 pb-16 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Works Archive Card */}
            <div className="flex flex-col justify-between gap-6 rounded-2xl border border-white/20 bg-[#0a0a0a] p-8">
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                  CASE STUDIES & TOPOLOGY
                </div>
                <h3 className="mt-2 text-2xl font-bold uppercase tracking-tight text-white">
                  ALL 3D & STAGE PROJECTS
                </h3>
                <p className="mt-2 text-sm text-zinc-400">
                  Complete technical breakdowns with software specs and client archives.
                </p>
              </div>
              <div>
                <Link
                  href="/works"
                  className="inline-flex items-center gap-2 rounded-full border border-white bg-white px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-black transition-all hover:bg-zinc-200"
                >
                  <span>VIEW ALL WORKS</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Gallery Wall Card */}
            <div className="flex flex-col justify-between gap-6 rounded-2xl border border-white/20 bg-[#0a0a0a] p-8">
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                  FULL-RESOLUTION RENDER STUDIES
                </div>
                <h3 className="mt-2 text-2xl font-bold uppercase tracking-tight text-white">
                  SCROLL PORTRAIT WALL
                </h3>
                <p className="mt-2 text-sm text-zinc-400">
                  High-contrast visual masonry with filterable spatial categories and lightbox.
                </p>
              </div>
              <div>
                <Link
                  href="/gallery"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-zinc-900 px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-white transition-all hover:border-white"
                >
                  <span>OPEN GALLERY WALL</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Affiliation Spotlight (PT Nusaraya Event) */}
      <section className="bg-black px-4 sm:px-8 py-20 border-t border-white/10 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 relative h-72 sm:h-96 rounded-2xl overflow-hidden border border-white/15">
              <Image
                src={PERSONAL_INFO.currentCompany.image}
                alt="PT Nusaraya Event Office & Studio"
                fill
                className="object-cover filter grayscale contrast-125 brightness-90"
                sizes="(max-width: 1024px) 100vw, 600px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 font-mono text-[10px] font-bold text-white bg-black/80 px-3 py-1 rounded border border-white/20">
                JAKARTA PUSAT // CIDENG GAMBIR
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col gap-6">
              <div className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400">
                // PROFESSIONAL AFFILIATION & CAREER
              </div>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
                SENIOR 3D ARTIST @ PT NUSARAYA
              </h2>
              <p className="text-base text-zinc-300 leading-relaxed">
                Leading 3D spatial visualizations, modular kinetic stage models, and comprehensive corporate branding solutions at PT Nusaraya Event.
              </p>
              <div className="flex items-center gap-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-full border border-white bg-white px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-black transition-all hover:bg-zinc-200"
                >
                  <span>FULL CAREER & EXPERIENCE</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={PERSONAL_INFO.currentCompany.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-xs text-zinc-400 hover:text-white uppercase"
                >
                  <span>WWW.NUSARAYAEVENT.COM</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Direct Contact Section */}
      <ContactSection />
    </>
  );
}
