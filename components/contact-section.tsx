"use client";

import React from "react";
import { ContactCard } from "@/components/ui/contact-card";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative w-full border-t border-white/10 bg-[#000000] px-4 py-24 sm:px-8 text-white"
    >
      <div className="mx-auto max-w-7xl">
        {/* Contact Header */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-zinc-400">
            <span className="h-2 w-2 rounded-full bg-white animate-pulse"></span>
            <span>COMMISSIONS & INQUIRIES</span>
          </div>
          <h2 className="mt-4 text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
            START A CONVERSATION
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400 leading-relaxed">
            Reach out directly for 3D stage spatial visualization, concert VJ cueing, architectural pre-viz, and brand design packages.
          </p>
        </div>

        {/* 21st.dev Contact Card Form */}
        <ContactCard />
      </div>
    </section>
  );
}
