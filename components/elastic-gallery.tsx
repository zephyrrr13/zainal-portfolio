"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { PROJECTS } from "@/lib/data";

export function ElasticGallery() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  // Pick exactly 5 curated projects as requested by user
  const featuredFive = PROJECTS.slice(0, 5);

  return (
    <section className="relative w-full border-t border-white/10 bg-[#000000] px-4 py-24 sm:px-8 text-white">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 flex flex-col justify-between gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-zinc-400">
              <span className="h-1.5 w-1.5 rounded-full bg-white"></span>
              <span>DYNAMIC KINETIC STRIP // 5 CASE STUDIES</span>
            </div>
            <h2 className="mt-3 text-3xl font-black uppercase tracking-tight text-white sm:text-5xl">
              ELASTIC WORKS GALLERY
            </h2>
          </div>
          <div className="max-w-md font-mono text-xs text-zinc-400">
            Hover or tap across the elastic project strips to dynamically expand high-fidelity 3D spatial models and concert visuals.
          </div>
        </div>

        {/* Desktop Elastic Horizontal Expandable Strip */}
        <div className="hidden lg:flex h-[520px] w-full gap-3 overflow-hidden rounded-3xl border border-white/15 bg-[#080808] p-3 select-none">
          {featuredFive.map((project, idx) => {
            const isActive = activeIndex === idx;

            return (
              <div
                key={project.id}
                onMouseEnter={() => setActiveIndex(idx)}
                className={`relative h-full overflow-hidden rounded-2xl cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                  isActive ? "flex-[4.5]" : "flex-[1] hover:flex-[1.4]"
                }`}
              >
                {/* Real B&W Project Photography */}
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover filter grayscale contrast-125 brightness-90 transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1200px) 100vw, 800px"
                />

                {/* Dark Vignette Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent transition-opacity duration-500 ${
                    isActive ? "opacity-80" : "opacity-90"
                  }`}
                />

                {/* Index Pill */}
                <div className="absolute top-4 left-4 z-10 font-mono text-[10px] font-bold text-white bg-black/80 px-2.5 py-1 rounded-full border border-white/20 backdrop-blur-md">
                  0{idx + 1}
                </div>

                {/* Inactive Vertical Title */}
                {!isActive && (
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-400 -rotate-90 whitespace-nowrap">
                      {project.client}
                    </span>
                  </div>
                )}

                {/* Active Expanded Content Drawer */}
                {isActive && (
                  <div className="absolute inset-0 flex flex-col justify-end p-8 z-20">
                    <div className="font-mono text-xs uppercase tracking-widest text-zinc-300">
                      {project.category} // {project.year}
                    </div>

                    <h3 className="mt-2 text-3xl font-black uppercase tracking-tight text-white">
                      {project.title}
                    </h3>

                    <p className="mt-2 text-sm text-zinc-300 max-w-lg leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-white/15 bg-black/60 px-2.5 py-1 font-mono text-[10px] uppercase text-zinc-300 backdrop-blur-sm"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/15">
                      <a
                        href={project.behanceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase text-white hover:underline"
                      >
                        <span>VIEW ON BEHANCE</span>
                        <ArrowUpRight className="h-4 w-4 text-zinc-400" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Accordion View */}
        <div className="flex flex-col gap-4 lg:hidden">
          {featuredFive.map((project, idx) => (
            <div
              key={project.id}
              className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#0a0a0a]"
            >
              <div className="relative h-60 w-full">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover filter grayscale contrast-125 brightness-90"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
                <div className="absolute top-3 left-3 font-mono text-[10px] font-bold text-white bg-black/80 px-2.5 py-1 rounded-full border border-white/20">
                  0{idx + 1} // {project.year}
                </div>
              </div>

              <div className="p-5">
                <div className="font-mono text-xs text-zinc-400 uppercase">
                  {project.client}
                </div>
                <h3 className="mt-1 text-xl font-bold uppercase text-white">
                  {project.title}
                </h3>
                <p className="mt-2 text-xs text-zinc-300 leading-relaxed">
                  {project.description}
                </p>
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-zinc-400 uppercase">
                    {project.category}
                  </span>
                  <a
                    href={project.behanceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-xs text-white hover:underline"
                  >
                    <span>BEHANCE</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
