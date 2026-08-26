import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Compass, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#000000] px-4 text-white">
      <div className="relative mx-auto flex w-full max-w-2xl flex-col items-center text-center">
        {/* Terminal Header */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-zinc-950 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-zinc-400">
          <Terminal className="h-3.5 w-3.5" />
          <span>ERROR 404 // NULL_POINTER</span>
        </div>

        {/* Big Kinetic 404 Typography */}
        <div className="mt-8 select-none text-[clamp(6rem,18vw,14rem)] font-black leading-none tracking-tighter text-white">
          404
        </div>

        <div className="mt-4 font-mono text-xs uppercase tracking-[0.25em] text-zinc-400">
          PAGE NOT FOUND // COORDINATE OFF-GRID
        </div>

        <p className="mt-4 max-w-md text-sm text-zinc-400 leading-relaxed">
          The requested route or visual asset has moved or does not exist within the current portfolio index.
        </p>

        {/* ASCII Matrix Decoration */}
        <div className="my-8 rounded-xl border border-white/10 bg-[#050505] p-4 font-mono text-[11px] text-zinc-500 select-none">
          <pre>
{`  +---[ MATRIX 404 ]---+
  |  ?.?   X_X   ?.?   |
  |  SYSTEM DISCONNECT |
  +--------------------+`}
          </pre>
        </div>

        {/* Navigation Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-full border border-white bg-white px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-black transition-all hover:bg-zinc-200"
          >
            <Home className="h-4 w-4" />
            <span>RETURN HOME</span>
          </Link>

          <Link
            href="/works"
            className="flex items-center gap-2 rounded-full border border-white/20 bg-zinc-900 px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-white transition-all hover:border-white"
          >
            <Compass className="h-4 w-4" />
            <span>EXPLORE WORKS</span>
          </Link>

          <Link
            href="/gallery"
            className="flex items-center gap-2 rounded-full border border-white/10 bg-zinc-950 px-5 py-3 font-mono text-xs uppercase text-zinc-400 hover:text-white"
          >
            <span>GALLERY WALL</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
