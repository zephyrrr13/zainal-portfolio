"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ArrowDown, Download, ExternalLink, Mail, MessageCircle } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/data";
import { AsciiCoverCanvas } from "@/components/ui/ascii-cover-canvas";

export function KineticHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const textBackRef = useRef<HTMLDivElement>(null);
  const textFrontRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 3D Kinetic Parallax on Mouse Move
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPercent = (clientX / window.innerWidth - 0.5) * 2;
        const yPercent = (clientY / window.innerHeight - 0.5) * 2;

        if (textBackRef.current) {
          gsap.to(textBackRef.current, {
            x: xPercent * -28,
            y: yPercent * -14,
            duration: 1.1,
            ease: "power2.out",
          });
        }

        if (photoRef.current) {
          gsap.to(photoRef.current, {
            x: xPercent * 20,
            y: yPercent * 10,
            rotationY: xPercent * 5,
            duration: 1,
            ease: "power2.out",
          });
        }

        if (textFrontRef.current) {
          gsap.to(textFrontRef.current, {
            x: xPercent * -36,
            y: yPercent * -18,
            duration: 1.1,
            ease: "power2.out",
          });
        }
      };

      window.addEventListener("mousemove", handleMouseMove);

      // Intro Animation Sequence
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-meta-top", { y: -20, opacity: 0, duration: 0.8, delay: 0.15 })
        .from(textBackRef.current, { y: 60, opacity: 0, duration: 1 }, "-=0.5")
        .from(photoRef.current, { scale: 0.92, y: 70, opacity: 0, duration: 1.1 }, "-=0.8")
        .from(textFrontRef.current, { opacity: 0, duration: 0.6 }, "-=0.6")
        .from(".hero-cta-action", { y: 20, opacity: 0, stagger: 0.08, duration: 0.5 }, "-=0.4");

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handlePhotoMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!photoRef.current) return;
    const rect = photoRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCursorPos({ x, y });
  };

  const handlePhotoMouseLeave = () => {
    setCursorPos(null);
  };

  // 1:1 Inverted Radial Masks:
  // - Real photo is 0% opacity under the cursor radius, 100% opacity outside
  // - ASCII is 100% opacity under the cursor radius, 0% opacity outside
  const photoMaskStyle: React.CSSProperties = cursorPos
    ? {
        WebkitMaskImage: `radial-gradient(circle 140px at ${cursorPos.x}px ${cursorPos.y}px, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 55%, rgba(0,0,0,1) 95%)`,
        maskImage: `radial-gradient(circle 140px at ${cursorPos.x}px ${cursorPos.y}px, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 55%, rgba(0,0,0,1) 95%)`,
        transition: "none",
      }
    : {
        WebkitMaskImage: "none",
        maskImage: "none",
        transition: "all 0.3s ease",
      };

  const asciiMaskStyle: React.CSSProperties = cursorPos
    ? {
        WebkitMaskImage: `radial-gradient(circle 140px at ${cursorPos.x}px ${cursorPos.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 95%)`,
        maskImage: `radial-gradient(circle 140px at ${cursorPos.x}px ${cursorPos.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 95%)`,
        opacity: 1,
        transition: "none",
      }
    : {
        opacity: 0,
        transition: "opacity 0.3s ease",
      };

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-[#000000] px-4 pt-28 pb-12 sm:px-8 text-white"
    >
      {/* Subtle Monochrome Kinetic Grid Lines */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_45%,#000_70%,transparent_100%)] opacity-30" />

      {/* Top Meta Bar */}
      <div className="hero-meta-top relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between border-b border-white/10 pb-4 font-mono text-[11px] uppercase tracking-widest text-zinc-400">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-white animate-pulse"></span>
          <span className="text-zinc-200">JAKARTA, ID</span>
          <span className="hidden sm:inline text-zinc-600">//</span>
          <span className="hidden sm:inline text-zinc-400">PULO GEBANG</span>
        </div>

        <div className="hidden md:flex items-center gap-2 text-zinc-300">
          <span>{PERSONAL_INFO.role}</span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={PERSONAL_INFO.currentCompany.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors"
          >
            <span>@ PT NUSARAYA</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      {/* Center Kinetic Typography Stage (en.bazil.fr Dark Mode Architecture) */}
      <div className="relative mx-auto my-auto flex h-[62vh] min-h-[460px] w-full max-w-7xl items-center justify-center">
        
        {/* Layer 1: Solid Typography Behind Portrait */}
        <div
          ref={textBackRef}
          className="pointer-events-none absolute inset-0 z-0 flex flex-col items-center justify-center text-center select-none"
        >
          <div className="text-[clamp(3.8rem,11.5vw,11rem)] font-black leading-[0.85] tracking-[-0.04em] text-white">
            ZAINAL ABIDIN
          </div>
          <div className="text-[clamp(1.8rem,5.5vw,5.5rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.03em] text-zinc-400">
            3D ARTIST & GRAPHIC DESIGNER
          </div>
        </div>

        {/* Layer 2: 1:1 Inverted Spotlight Lens (Real Photo <-> ASCII Carve-out) */}
        <div
          ref={photoRef}
          onMouseMove={handlePhotoMouseMove}
          onMouseLeave={handlePhotoMouseLeave}
          className="group relative z-10 mx-auto flex h-full w-full max-w-[560px] items-end justify-center drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)] cursor-crosshair select-none bg-transparent"
        >
          {/* A. Real Photo Cutout (Masked out to 0% opacity under the cursor spotlight) */}
          <div
            className="absolute inset-0 flex items-end justify-center bg-transparent pointer-events-none"
            style={photoMaskStyle}
          >
            <div className="relative h-[112%] w-full">
              <Image
                src="/images/zainal-cutout.png"
                alt="Zainal Abidin - Senior 3D Artist & Graphic Designer"
                fill
                priority
                className="object-contain object-bottom filter grayscale contrast-125 brightness-105"
                sizes="(max-width: 768px) 100vw, 650px"
              />
            </div>
          </div>

          {/* B. Exact 1:1 ASCII Silhouette (Revealed at 100% opacity inside the cursor spotlight) */}
          <div
            className="absolute inset-0 flex items-end justify-center bg-transparent pointer-events-none"
            style={asciiMaskStyle}
          >
            <div className="relative h-[112%] w-full bg-transparent flex items-end justify-center">
              <AsciiCoverCanvas
                imageSrc="/images/zainal-cutout.png"
                altText="Zainal Abidin 1:1 ASCII Silhouette"
                resolution={120}
                inverted={true}
                className="h-full w-full bg-transparent"
              />
            </div>
          </div>
        </div>

        {/* Layer 3: Hollow Outline Typography In Front of Portrait */}
        <div
          ref={textFrontRef}
          className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center text-center select-none"
          style={{
            WebkitTextStroke: "1.5px rgba(255, 255, 255, 0.9)",
            color: "transparent",
          }}
        >
          <div className="text-[clamp(3.8rem,11.5vw,11rem)] font-black leading-[0.85] tracking-[-0.04em]">
            ZAINAL ABIDIN
          </div>
          <div className="text-[clamp(1.8rem,5.5vw,5.5rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.03em]">
            3D ARTIST & GRAPHIC DESIGNER
          </div>
        </div>
      </div>

      {/* Bottom Kinetic CTAs - Clean, Single-Line, Unbreakable Layout */}
      <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-6 border-t border-white/10 pt-6 md:flex-row">
        {/* Direct WhatsApp & Email & CV Buttons */}
        <div className="hero-cta-action flex flex-wrap items-center justify-center gap-3">
          <a
            href={PERSONAL_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 rounded-full border border-white bg-white px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-zinc-200 shadow-md"
          >
            <MessageCircle className="h-4 w-4 shrink-0" />
            <span className="whitespace-nowrap">DIRECT WHATSAPP</span>
          </a>

          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="flex items-center gap-2.5 rounded-full border border-white/25 bg-zinc-950/80 px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all hover:border-white hover:bg-white hover:text-black"
          >
            <Mail className="h-4 w-4 shrink-0" />
            <span className="whitespace-nowrap">SEND EMAIL</span>
          </a>

          <a
            href={PERSONAL_INFO.cvDownloadUrl}
            download="Resume-ZAINAL-ABIDIN.pdf"
            className="flex items-center gap-2.5 rounded-full border border-white/20 bg-zinc-900/70 px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-zinc-300 transition-all hover:border-white hover:text-white"
          >
            <Download className="h-3.5 w-3.5 shrink-0" />
            <span className="whitespace-nowrap">DOWNLOAD CV</span>
          </a>
        </div>

        {/* Anchors & Behance Link */}
        <div className="hero-cta-action flex items-center gap-6 font-mono text-xs text-zinc-400">
          <Link
            href="/#projects"
            className="group flex items-center gap-2 text-zinc-300 transition-colors hover:text-white"
          >
            <span>SELECTED WORKS</span>
            <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
          </Link>
          <span className="text-zinc-700">|</span>
          <a
            href={PERSONAL_INFO.behance}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-300 transition-colors hover:text-white hover:underline"
          >
            BEHANCE.NET/ANANIMR13 ↗
          </a>
        </div>
      </div>
    </section>
  );
}
