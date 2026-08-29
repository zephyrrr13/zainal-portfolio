import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock, Tag, Calendar } from "lucide-react";
import { db } from "@/lib/db";

export const metadata = {
  title: "Case Studies & Insights // Zainal Abidin",
  description: "Explore 3D stage architecture breakdowns, Octane lighting methodologies, and event design insights by Zainal Abidin.",
};

export default function BlogListPage() {
  const data = db.get();
  const publishedArticles = data.articles.filter((a) => a.published);

  return (
    <div className="relative min-h-screen bg-[#000000] px-4 pt-32 pb-20 sm:px-8 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <div className="border-b border-white/10 pb-8 mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-zinc-300 mb-4">
            <span className="h-2 w-2 rounded-full bg-white animate-pulse"></span>
            INSIGHTS & CASE STUDIES
          </div>
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl">
            Articles & 3D Breakdowns
          </h1>
          <p className="mt-3 font-mono text-sm text-zinc-400 max-w-2xl leading-relaxed">
            Dokumentasi proses perancangan panggung seremonial, visual VJ timecode, dan inovasi arsitektur booth pameran.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {publishedArticles.map((art) => (
            <Link
              key={art.id}
              href={`/blog/${art.slug}`}
              className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/80 p-6 transition-all duration-300 hover:border-white/40 hover:bg-zinc-900/60"
            >
              <div>
                {art.coverImage && (
                  <div className="relative h-60 w-full overflow-hidden rounded-2xl border border-white/10 mb-6 bg-zinc-900">
                    <Image
                      src={art.coverImage}
                      alt={art.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-black/80 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-300 backdrop-blur-md border border-white/15">
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

                <h2 className="text-xl font-bold text-white group-hover:text-zinc-200 transition-colors leading-snug">
                  {art.title}
                </h2>

                <p className="mt-2 font-mono text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                  {art.excerpt}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 font-mono text-xs font-bold uppercase text-zinc-300 group-hover:text-white">
                <span>Baca Selengkapnya</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
