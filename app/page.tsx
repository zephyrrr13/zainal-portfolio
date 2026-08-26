import { KineticHero } from "@/components/kinetic-hero";
import { ElasticGallery } from "@/components/elastic-gallery";
import { PortfolioSection } from "@/components/portfolio-section";
import { ContactSection } from "@/components/contact-section";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/data";

export default function HomePage() {
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

      {/* View All Works & Gallery Banners */}
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

      {/* 4. Affiliation Spotlight (PT Nusaraya Event) */}
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

      {/* 5. Direct Contact Section */}
      <ContactSection />
    </>
  );
}
