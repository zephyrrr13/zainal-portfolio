"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Terminal, Eye } from "lucide-react";
import { PROJECTS, PERSONAL_INFO } from "@/lib/data";

interface PortfolioSectionProps {
  limit?: number;
  title?: string;
  showAllLink?: boolean;
}

export function PortfolioSection({
  limit,
  title = "3D & SPATIAL PORTFOLIO",
  showAllLink = false,
}: PortfolioSectionProps) {
  const [activeAscii, setActiveAscii] = useState<Record<string, boolean>>({});

  const toggleAscii = (id: string) => {
    setActiveAscii((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const displayedProjects = limit ? PROJECTS.slice(0, limit) : PROJECTS;

  return (
    <section
      id="projects"
      className="relative w-full border-t border-white/10 bg-[#000000] px-4 py-24 sm:px-8 text-white"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 flex flex-col justify-between gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-zinc-400">
              <span className="h-1.5 w-1.5 rounded-full bg-white"></span>
              <span>BEHANCE ARCHIVE & CASE STUDIES</span>
            </div>
            <h2 className="mt-3 text-4xl font-black uppercase tracking-tight text-white sm:text-6xl">
              {title}
            </h2>
          </div>
          <div className="max-w-md font-mono text-xs text-zinc-400">
            Spatial stage topologies, live concert VJ performances, 3D commercial exhibition booths, and motion graphics.
          </div>
        </div>

        {/* 2-Column Responsive Kinetic Bento Grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {displayedProjects.map((project, idx) => {
            const isAsciiOpen = activeAscii[project.id] ?? false;

            return (
              <div
                key={project.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/15 bg-[#0a0a0a] p-6 transition-all duration-300 hover:border-white/40 hover:bg-[#0f0f0f]"
              >
                {/* Project Cover Container (Real B&W Photo / ASCII Mode) */}
                <div className="relative mb-6 flex h-64 w-full flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-[#050505] select-none">
                  {isAsciiOpen ? (
                    /* ASCII Mode */
                    <div className="flex h-full w-full flex-col justify-between p-4 bg-black">
                      <div className="flex items-center justify-between z-10 text-[10px] font-mono text-zinc-400">
                        <span>[0{idx + 1}] // {project.year}</span>
                        <span className="uppercase">{project.category}</span>
                      </div>
                      <div className="flex flex-1 items-center justify-center py-2">
                        <pre className="text-center font-mono text-[11px] font-bold text-zinc-200 tracking-wider">
                          {project.ascii.join("\n")}
                        </pre>
                      </div>
                      <div className="flex items-center justify-between z-10 text-[10px] font-mono text-zinc-500 border-t border-white/10 pt-2">
                        <span>ASCII MATRIX</span>
                        <span>{project.client}</span>
                      </div>
                    </div>
                  ) : (
                    /* Real B&W Photography Cover */
                    <div className="relative h-full w-full overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover filter grayscale contrast-125 brightness-90 transition-transform duration-500 group-hover:scale-105 group-hover:brightness-100"
                        sizes="(max-width: 768px) 100vw, 600px"
                      />
                      {/* Gradient overlay for legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                      <div className="absolute top-3 left-3 z-10 font-mono text-[10px] font-bold text-white bg-black/70 px-2 py-1 rounded backdrop-blur-sm border border-white/10">
                        [0{idx + 1}] // {project.year}
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 z-10 flex items-end justify-between">
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-white drop-shadow">
                          {project.client}
                        </span>
                        <span className="font-mono text-[10px] text-zinc-300">
                          {project.location}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Mode Toggle Switch on Top Right */}
                  <button
                    type="button"
                    onClick={() => toggleAscii(project.id)}
                    className="absolute top-3 right-3 z-20 flex items-center gap-1.5 rounded-full border border-white/30 bg-black/80 px-3 py-1 font-mono text-[10px] uppercase text-white shadow-lg backdrop-blur-md transition-colors hover:bg-white hover:text-black"
                  >
                    {isAsciiOpen ? (
                      <>
                        <Eye className="h-3 w-3" />
                        <span>PHOTO VIEW</span>
                      </>
                    ) : (
                      <>
                        <Terminal className="h-3 w-3" />
                        <span>ASCII VIEW</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Project Metadata */}
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">
                      {project.category}
                    </span>
                    <span className="font-mono text-xs text-zinc-400">
                      {project.year}
                    </span>
                  </div>

                  <h3 className="mt-2 text-2xl font-bold uppercase tracking-tight text-white transition-colors group-hover:text-zinc-200">
                    {project.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                    {project.description}
                  </p>

                  {/* Software & Tools */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-white/10 bg-zinc-900/90 px-2.5 py-1 font-mono text-[11px] uppercase text-zinc-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* External Behance Link */}
                <div className="mt-8 border-t border-white/10 pt-4">
                  <a
                    href={project.behanceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-white transition-all hover:translate-x-1 hover:text-zinc-300"
                  >
                    <span>VIEW CASE STUDY ON BEHANCE</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Behance Callout */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 rounded-2xl border border-white/15 bg-[#0a0a0a] p-8 text-center sm:flex-row sm:text-left">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-zinc-400">
              BEHANCE ARCHIVE & BREAKDOWN RENDERS
            </div>
            <h4 className="mt-1 text-xl font-bold text-white uppercase tracking-tight">
              LOOKING FOR FULL 3D ASSETS, STAGE WIREFRAMES & MOTION REELS?
            </h4>
            <p className="mt-1 font-mono text-xs text-zinc-400">
              Browse complete case studies, topology breakdowns, and video recordings at {PERSONAL_INFO.behance}.
            </p>
          </div>
          <a
            href={PERSONAL_INFO.behance}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-white bg-white px-7 py-3.5 font-mono text-xs font-bold uppercase tracking-widest text-black transition-all hover:bg-zinc-200"
          >
            <span>VISIT BEHANCE ↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
