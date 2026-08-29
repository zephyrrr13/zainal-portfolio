import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, Tag, Share2 } from "lucide-react";
import { db } from "@/lib/db";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const data = db.get();
  const art = data.articles.find((a) => a.slug === params.slug && a.published);
  if (!art) return { title: "Article Not Found" };
  return {
    title: `${art.title} // Zainal Abidin`,
    description: art.excerpt,
  };
}

export default function SingleArticlePage({ params }: { params: { slug: string } }) {
  const data = db.get();
  const art = data.articles.find((a) => a.slug === params.slug && a.published);

  if (!art) {
    notFound();
  }

  // Increment views
  art.views += 1;
  db.save(data);

  return (
    <article className="relative min-h-screen bg-[#000000] px-4 pt-32 pb-24 sm:px-8 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />

      <div className="relative z-10 mx-auto max-w-3xl">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>KEMBALI KE SEMUA ARTIKEL</span>
        </Link>

        {/* Article Meta */}
        <div className="mb-6 flex flex-wrap items-center gap-3 font-mono text-xs">
          <span className="rounded-full bg-white/10 px-3 py-1 text-zinc-200 border border-white/15">
            {art.category}
          </span>
          <span className="flex items-center gap-1.5 text-zinc-400">
            <Clock className="h-3.5 w-3.5" /> {art.readTime}
          </span>
          <span className="text-zinc-600">•</span>
          <span className="text-zinc-400">
            {art.publishedAt ? new Date(art.publishedAt).toLocaleDateString("id-ID", { dateStyle: "long" }) : "Recent"}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl leading-[1.15]">
          {art.title}
        </h1>

        {/* Author info */}
        <div className="my-8 flex items-center justify-between border-y border-white/10 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white font-mono text-xs font-bold text-black">
              ZA
            </div>
            <div>
              <div className="font-mono text-xs font-bold text-white">Zainal Abidin</div>
              <div className="font-mono text-[10.5px] text-zinc-400">Senior 3D Artist & Graphic Designer</div>
            </div>
          </div>

          <div className="font-mono text-xs text-zinc-400">{art.views} views</div>
        </div>

        {/* Cover Image */}
        {art.coverImage && (
          <div className="relative h-80 sm:h-[420px] w-full overflow-hidden rounded-3xl border border-white/15 mb-10 shadow-2xl bg-zinc-950">
            <Image
              src={art.coverImage}
              alt={art.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}

        {/* Markdown Content */}
        <div className="prose prose-invert max-w-none font-mono text-sm leading-relaxed text-zinc-300 space-y-4">
          <div className="whitespace-pre-wrap">{art.content}</div>
        </div>

        {/* Tags */}
        {art.tags && art.tags.length > 0 && (
          <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-white/10 pt-6">
            <span className="font-mono text-xs text-zinc-500 mr-2">Tags:</span>
            {art.tags.map((t, i) => (
              <span
                key={i}
                className="rounded-lg border border-white/10 bg-zinc-900 px-3 py-1 font-mono text-xs text-zinc-300"
              >
                #{t}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
