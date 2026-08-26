import { ScrollPortraitWall } from "@/components/ui/scroll-portrait-wall";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Gallery // ZAINAL ABIDIN",
  description: "Dynamic portrait wall and render studies of 3D spatial stages, concert visuals, and exhibition booths.",
};

export default function GalleryPage() {
  return (
    <div className="pt-28 min-h-screen bg-[#000000] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>BACK TO HOME</span>
        </Link>

        {/* Page Header */}
        <div className="mb-14 border-b border-white/10 pb-8">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full bg-white"></span>
            <span>VISUAL ARCHIVE & RENDER STUDIES</span>
          </div>
          <h1 className="mt-3 text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
            SCROLL PORTRAIT WALL
          </h1>
          <p className="mt-3 text-sm text-zinc-400 max-w-2xl font-mono">
            Full-resolution black-and-white visual wall covering 3D spatial stage topologies, live concert VJ cues, and exhibition architecture.
          </p>
        </div>

        {/* Scroll Portrait Wall Component */}
        <ScrollPortraitWall />
      </div>
    </div>
  );
}
