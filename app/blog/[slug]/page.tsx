import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, Tag, Download, Cpu, Sparkles, CheckCircle2, MessageCircle } from "lucide-react";
import { db } from "@/lib/db";
import { PERSONAL_INFO } from "@/lib/data";

export const dynamic = "force-dynamic";

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
  art.views = (art.views || 0) + 1;
  db.save(data);

  return (
    <article className="relative min-h-screen bg-[#000000] px-4 pt-32 pb-24 sm:px-8 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>KEMBALI KE SEMUA ARTIKEL & TUTORIAL</span>
        </Link>

        {/* Badges */}
        <div className="mb-4 flex flex-wrap items-center gap-2.5 font-mono text-xs">
          <span className="rounded-full bg-white/10 px-3.5 py-1 text-white border border-white/20 font-bold uppercase tracking-wider">
            {art.category}
          </span>

          {art.softwareVersion && (
            <span className="flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-950/40 px-3.5 py-1 text-purple-300">
              <Cpu className="h-3 w-3" />
              <span>{art.softwareVersion}</span>
            </span>
          )}

          <span className="flex items-center gap-1 text-zinc-400">
            <Clock className="h-3.5 w-3.5" /> {art.readTime}
          </span>
          <span className="text-zinc-600">•</span>
          <span className="text-zinc-400">
            {art.publishedAt ? new Date(art.publishedAt).toLocaleDateString("id-ID", { dateStyle: "long" }) : "Recent"}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl leading-[1.18]">
          {art.title}
        </h1>

        {/* Excerpt */}
        {art.excerpt && (
          <p className="mt-4 text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
            {art.excerpt}
          </p>
        )}

        {/* Author / Date Header */}
        <div className="my-8 flex flex-wrap items-center justify-between border-y border-white/10 py-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white font-mono text-xs font-bold text-black">
              ZA
            </div>
            <div>
              <div className="font-bold text-white text-sm">Zainal Abidin</div>
              <div className="text-xs text-zinc-400">Senior 3D Artist & Graphic Designer</div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
            <span>{art.views} views</span>
            {art.downloadUrl && (
              <a
                href={art.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-white bg-white px-3.5 py-1.5 font-bold uppercase text-black hover:bg-zinc-200"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download Assets ↗</span>
              </a>
            )}
          </div>
        </div>

        {/* Cover Image Banner */}
        {art.coverImage && (
          <div className="relative h-80 sm:h-[460px] w-full overflow-hidden rounded-3xl border border-white/15 mb-10 shadow-2xl bg-zinc-950">
            <Image
              src={art.coverImage}
              alt={art.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}

        {/* Key Takeaways Callout Box */}
        {art.keyTakeaways && art.keyTakeaways.length > 0 && (
          <div className="mb-10 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-6 backdrop-blur-xl">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">
              <Sparkles className="h-4 w-4" />
              <span>RINGKASAN & POIN KUNCI</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
              {art.keyTakeaways.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Markdown Content */}
        <div className="prose prose-invert max-w-none text-zinc-200 leading-relaxed space-y-6 text-sm sm:text-base">
          <div className="whitespace-pre-wrap">{art.content}</div>
        </div>

        {/* Tags */}
        {art.tags && art.tags.length > 0 && (
          <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-white/10 pt-6">
            <span className="text-xs text-zinc-500 font-mono mr-2">Tags:</span>
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

        {/* Author Bio Card */}
        <div className="mt-14 rounded-3xl border border-white/10 bg-zinc-950 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white font-mono text-lg font-black text-black shadow-lg">
            ZA
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h3 className="font-bold text-white text-base">Ditulis oleh Zainal Abidin</h3>
            <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
              Senior 3D Artist & Graphic Designer dengan 5+ tahun pengalaman merancang tata panggung seremonial, visual VJ, dan booth pameran imersif.
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-3 font-mono text-xs">
              <a
                href={PERSONAL_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-white/20 bg-zinc-900 px-3.5 py-1.5 text-zinc-300 hover:border-white hover:text-white"
              >
                <MessageCircle className="h-3 w-3" />
                <span>Chat WhatsApp</span>
              </a>
              <Link
                href="/works"
                className="rounded-full border border-white/20 bg-zinc-900 px-3.5 py-1.5 text-zinc-300 hover:border-white hover:text-white"
              >
                Lihat Semua Karya ↗
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
