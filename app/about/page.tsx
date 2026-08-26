import { ExperienceSection } from "@/components/experience-section";
import Link from "next/link";
import { ArrowLeft, MessageCircle, Download, ExternalLink } from "lucide-react";
import Image from "next/image";
import { PERSONAL_INFO } from "@/lib/data";

export const metadata = {
  title: "About // ZAINAL ABIDIN",
  description: "Career record, technical tooling, and design qualifications of Zainal Abidin.",
};

export default function AboutPage() {
  return (
    <div className="pt-28 min-h-screen bg-[#000000] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400 hover:text-white transition-colors mb-10"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>BACK TO HOME</span>
        </Link>

        {/* Bio Hero */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center mb-20 border-b border-white/10 pb-16">
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative h-[420px] w-full max-w-[320px] overflow-hidden rounded-2xl border border-white/15 bg-[#0a0a0a]">
              <Image
                src="/images/zainal-cutout.png"
                alt="Zainal Abidin - Senior 3D Artist & Graphic Designer"
                fill
                priority
                className="object-contain object-bottom filter grayscale contrast-125 brightness-105"
                sizes="(max-width: 768px) 100vw, 360px"
              />
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400">
              // PROFILE & STATEMENT
            </div>
            <h1 className="text-4xl font-black uppercase tracking-tight text-white sm:text-6xl">
              ZAINAL ABIDIN
            </h1>
            <div className="text-lg font-bold text-zinc-300 uppercase tracking-wide">
              {PERSONAL_INFO.role} / {PERSONAL_INFO.secondaryRole}
            </div>
            <p className="text-base leading-relaxed text-zinc-300">
              Creative professional specializing in advanced 3D spatial design, stage topology, and high-impact graphic design. Extensive commercial production experience covering MICE conferences, brand activations, live concert Visual Jockeying (VJ), and digital motion graphics.
            </p>
            <p className="text-sm leading-relaxed text-zinc-400">
              Currently serving as Senior 3D Artist & Senior Graphic Designer at PT Nusaraya Event in Jakarta Pusat, driving end-to-end spatial pre-visualizations and production-ready identity packages.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href={PERSONAL_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-white bg-white px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-zinc-200"
              >
                <MessageCircle className="h-4 w-4" />
                <span>WHATSAPP CHAT</span>
              </a>

              <a
                href={PERSONAL_INFO.cvDownloadUrl}
                download="Resume-ZAINAL-ABIDIN.pdf"
                className="flex items-center gap-2 rounded-full border border-white/20 bg-zinc-900 px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-white hover:border-white transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>DOWNLOAD CV</span>
              </a>

              <a
                href={PERSONAL_INFO.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-white/15 bg-[#0a0a0a] px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:border-white hover:text-white transition-colors"
              >
                <span>BEHANCE ↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <ExperienceSection />
    </div>
  );
}
