"use client";

import React from "react";
import Image from "next/image";
import { Briefcase, Building, GraduationCap, MapPin, Wrench, ExternalLink } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/data";

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative w-full border-t border-white/10 bg-[#000000] px-4 py-24 sm:px-8 text-white"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 border-b border-white/10 pb-8">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-zinc-400">
            <Briefcase className="h-3.5 w-3.5" />
            <span>CAREER TRACK RECORD & QUALIFICATIONS</span>
          </div>
          <h2 className="mt-3 text-4xl font-black uppercase tracking-tight text-white sm:text-6xl">
            EXPERIENCE & EDUCATION
          </h2>
        </div>

        {/* Current Office & Affiliation Spotlight Banner */}
        <div className="mb-16 overflow-hidden rounded-3xl border border-white/15 bg-[#0a0a0a]">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Real B&W Office Picture */}
            <div className="relative h-64 lg:h-auto lg:col-span-5 overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10">
              <Image
                src={PERSONAL_INFO.currentCompany.image}
                alt="PT Nusaraya Event Office & Studio"
                fill
                className="object-cover filter grayscale contrast-125 brightness-90"
                sizes="(max-width: 1024px) 100vw, 500px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 font-mono text-[10px] font-bold text-white bg-black/80 px-2.5 py-1 rounded border border-white/20">
                OFFICE & STUDIO // JAKARTA PUSAT
              </div>
            </div>

            {/* Office Information & Verification */}
            <div className="p-8 lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                    CURRENT AFFILIATION
                  </span>
                  <span className="font-mono text-xs text-white bg-white/10 px-2.5 py-1 rounded-full">
                    {PERSONAL_INFO.currentCompany.period}
                  </span>
                </div>

                <h3 className="mt-3 text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                  {PERSONAL_INFO.currentCompany.fullName}
                </h3>
                <div className="mt-1 font-mono text-sm text-zinc-300">
                  {PERSONAL_INFO.currentCompany.role}
                </div>

                <p className="mt-4 text-sm leading-relaxed text-zinc-300">
                  PT Nusaraya Event is a premier event management and production company specializing in MICE (Meetings, Incentives, Conferences, Exhibitions), 3D spatial stage architecture, and experiential brand activations.
                </p>

                <div className="mt-6 flex flex-col gap-2 font-mono text-xs text-zinc-400 border-t border-white/10 pt-4">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-zinc-300 shrink-0 mt-0.5" />
                    <span>{PERSONAL_INFO.currentCompany.address}</span>
                  </div>
                  <div>Phone: {PERSONAL_INFO.currentCompany.phone}</div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <a
                  href={PERSONAL_INFO.currentCompany.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-white hover:underline uppercase"
                >
                  <span>OFFICIAL WEBSITE: WWW.NUSARAYAEVENT.COM</span>
                  <ExternalLink className="h-3.5 w-3.5 text-zinc-400" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Main Section: Career Timeline vs Education & Tools */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* Left Column: Chronological Experience */}
          <div className="flex flex-col gap-10 lg:col-span-7">
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-500">
              // CHRONOLOGICAL CAREER TIMELINE
            </h3>

            <div className="relative border-l border-white/15 pl-6 flex flex-col gap-12">
              {PERSONAL_INFO.experiences.map((exp, i) => (
                <div key={i} className="relative group">
                  {/* Timeline dot */}
                  <div className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-black bg-white transition-transform group-hover:scale-125" />

                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-mono text-xs text-white font-semibold">
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[11px] text-zinc-400">
                      <MapPin className="h-3 w-3" />
                      {exp.location}
                    </span>
                  </div>

                  <h4 className="mt-1 text-xl font-bold uppercase tracking-tight text-white">
                    {exp.role}
                  </h4>

                  <div className="mt-1 flex items-center gap-2">
                    <Building className="h-3.5 w-3.5 text-zinc-400" />
                    {exp.url ? (
                      <a
                        href={exp.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-xs text-zinc-300 hover:text-white hover:underline uppercase"
                      >
                        <span>{exp.company}</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <span className="font-mono text-xs text-zinc-400 uppercase">
                        {exp.company}
                      </span>
                    )}
                  </div>

                  <ul className="mt-4 flex flex-col gap-2">
                    {exp.points.map((pt, idx) => (
                      <li key={idx} className="text-sm leading-relaxed text-zinc-300">
                        • {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Education & Tooling */}
          <div className="flex flex-col gap-12 lg:col-span-5">
            {/* Tooling & Technical Mastery */}
            <div className="rounded-2xl border border-white/15 bg-[#0a0a0a] p-6">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-zinc-400 mb-6">
                <Wrench className="h-3.5 w-3.5" />
                <span>TOOLING & TECHNICAL CAPABILITIES</span>
              </div>

              <div className="flex flex-col gap-6">
                {PERSONAL_INFO.skills.map((skillGroup, idx) => (
                  <div key={idx}>
                    <div className="font-mono text-xs text-zinc-400 uppercase tracking-widest mb-2.5">
                      {skillGroup.category}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-md border border-white/10 bg-zinc-900 px-3 py-1 font-mono text-xs text-zinc-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Formal Education with Campus Photo */}
            <div className="rounded-2xl border border-white/15 bg-[#0a0a0a] p-6">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-zinc-400 mb-6">
                <GraduationCap className="h-3.5 w-3.5" />
                <span>FORMAL EDUCATION</span>
              </div>

              <div className="flex flex-col gap-6">
                {PERSONAL_INFO.education.map((edu, idx) => (
                  <div key={idx} className="border-b border-white/10 last:border-0 pb-5 last:pb-0">
                    {edu.image && (
                      <div className="relative h-32 w-full mb-3 rounded-lg overflow-hidden border border-white/10">
                        <Image
                          src={edu.image}
                          alt={edu.institution}
                          fill
                          className="object-cover filter grayscale contrast-125"
                          sizes="(max-width: 768px) 100vw, 400px"
                        />
                      </div>
                    )}

                    <div className="flex justify-between items-baseline">
                      <h4 className="text-base font-bold text-white uppercase">
                        {edu.institution}
                      </h4>
                      <span className="font-mono text-[11px] text-zinc-400">
                        {edu.location}
                      </span>
                    </div>
                    <div className="mt-1 font-mono text-xs text-white font-semibold">
                      {edu.degree}
                    </div>
                    <div className="mt-1 text-xs text-zinc-400 font-mono">
                      {edu.detail}
                    </div>
                    {edu.address && (
                      <div className="mt-1.5 flex items-center gap-1 text-[11px] text-zinc-500">
                        <MapPin className="h-3 w-3" />
                        <span>{edu.address}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
