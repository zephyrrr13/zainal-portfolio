"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, X, Eye, ExternalLink, Sparkles } from "lucide-react";
import { GALLERY_PROJECTS, GalleryProject } from "@/lib/data";

export function ScrollPortraitWall() {
  const [activeProjectId, setActiveProjectId] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    caption: string;
    projectTitle: string;
    client: string;
    year: string;
    behanceUrl: string;
  } | null>(null);

  const displayedProjects = activeProjectId === "all"
    ? GALLERY_PROJECTS
    : GALLERY_PROJECTS.filter((p) => p.id === activeProjectId);

  return (
    <div className="relative w-full text-white">
      {/* Project Selector Pills */}
      <div className="mb-14 flex flex-wrap items-center justify-center gap-2 font-mono text-xs">
        <button
          type="button"
          onClick={() => setActiveProjectId("all")}
          className={`rounded-full border px-4 py-2 uppercase tracking-wider transition-all ${
            activeProjectId === "all"
              ? "border-white bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.3)]"
              : "border-white/20 bg-zinc-950 text-zinc-400 hover:border-white hover:text-white"
          }`}
        >
          ALL PROJECTS ({GALLERY_PROJECTS.length})
        </button>

        {GALLERY_PROJECTS.map((proj) => (
          <button
            key={proj.id}
            type="button"
            onClick={() => setActiveProjectId(proj.id)}
            className={`rounded-full border px-4 py-2 uppercase tracking-wider transition-all ${
              activeProjectId === proj.id
                ? "border-white bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                : "border-white/20 bg-zinc-950 text-zinc-400 hover:border-white hover:text-white"
            }`}
          >
            {proj.title}
          </button>
        ))}
      </div>

      {/* Projects Container - Separated by Project */}
      <div className="flex flex-col gap-24">
        {displayedProjects.map((project, projIdx) => (
          <section
            key={project.id}
            className="rounded-3xl border border-white/15 bg-[#080808] p-6 sm:p-10 shadow-2xl"
          >
            {/* Project Header Bar */}
            <div className="mb-10 flex flex-col justify-between gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-end">
              <div>
                <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-zinc-400">
                  <span className="flex h-2 w-2 rounded-full bg-white animate-pulse"></span>
                  <span>PROJECT 0{projIdx + 1} // {project.category}</span>
                </div>

                <h2 className="mt-3 text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
                  {project.title}
                </h2>

                <div className="mt-2 font-mono text-sm text-zinc-300">
                  Client: <span className="text-white font-bold">{project.client}</span> // Year: {project.year}
                </div>

                <p className="mt-3 text-sm text-zinc-400 max-w-2xl leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <a
                  href={project.behanceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border border-white bg-white px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-zinc-200"
                >
                  <span>VIEW FULL BEHANCE CASE</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Masonry Grid for this Project */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.images.map((img, imgIdx) => (
                <div
                  key={imgIdx}
                  onClick={() =>
                    setSelectedImage({
                      url: img.url,
                      caption: img.caption,
                      projectTitle: project.title,
                      client: project.client,
                      year: project.year,
                      behanceUrl: project.behanceUrl,
                    })
                  }
                  className="group relative overflow-hidden rounded-2xl border border-white/15 bg-[#0a0a0a] cursor-pointer transition-all duration-300 hover:border-white hover:shadow-2xl"
                >
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                    <Image
                      src={img.url}
                      alt={img.caption}
                      fill
                      className="object-cover filter grayscale contrast-125 brightness-95 transition-transform duration-700 group-hover:scale-105 group-hover:brightness-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                    {/* Expand Badge */}
                    <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="flex items-center gap-1 rounded-full bg-white px-3 py-1 font-mono text-[10px] font-bold uppercase text-black">
                        <Eye className="h-3 w-3" />
                        <span>ZOOM</span>
                      </span>
                    </div>

                    {/* Caption Overlay */}
                    <div className="absolute bottom-3 left-3 right-3 z-10">
                      <div className="font-mono text-[10px] text-zinc-400 uppercase">
                        RENDER SHOT 0{imgIdx + 1}
                      </div>
                      <p className="mt-0.5 text-xs font-bold uppercase text-white line-clamp-1 group-hover:text-zinc-200">
                        {img.caption}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Interactive Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/20 bg-[#080808] p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/80 text-white hover:bg-white hover:text-black transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col gap-6">
              {/* High-Res Image Render Frame */}
              <div className="relative h-[55vh] min-h-[340px] w-full rounded-2xl overflow-hidden border border-white/15 bg-black">
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.caption}
                  fill
                  className="object-contain filter grayscale contrast-125"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>

              {/* Lightbox Footer Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 border-t border-white/10">
                <div>
                  <div className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                    {selectedImage.projectTitle} // {selectedImage.client} ({selectedImage.year})
                  </div>
                  <h4 className="mt-1 text-lg font-bold uppercase text-white">
                    {selectedImage.caption}
                  </h4>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={selectedImage.behanceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full border border-white bg-white px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-zinc-200"
                  >
                    <span>BEHANCE CASE STUDY</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setSelectedImage(null)}
                    className="font-mono text-xs uppercase text-zinc-400 hover:text-white px-3 py-2"
                  >
                    CLOSE [ESC]
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
