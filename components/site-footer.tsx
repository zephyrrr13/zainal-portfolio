"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Download,
  Mail,
  MessageCircle,
  Check,
  Copy,
  ExternalLink,
} from "lucide-react";
import { PERSONAL_INFO } from "@/lib/data";

export function SiteFooter() {
  const [copiedWeChat, setCopiedWeChat] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyWeChat = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.socials.wechatId);
    setCopiedWeChat(true);
    setTimeout(() => setCopiedWeChat(false), 2000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <footer className="relative w-full border-t border-white/15 bg-[#050505] text-white pt-16 pb-12 px-4 sm:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-white/10">
          {/* Brand & Role */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_8px_#FFFFFF]"></span>
                <span className="font-mono text-sm font-black uppercase tracking-[0.25em] text-white">
                  {PERSONAL_INFO.name}
                </span>
              </div>
              <div className="mt-3 font-mono text-xs text-zinc-300 uppercase tracking-wider">
                {PERSONAL_INFO.role}
              </div>
              <p className="mt-3 text-sm text-zinc-400 max-w-md leading-relaxed">
                Advanced 3D Spatial Environments, Modular Kinetic Stage Architecture, Live VJ Performance, and Commercial Graphic Identity.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <a
                href={PERSONAL_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-white bg-white px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-zinc-200"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="whitespace-nowrap">WHATSAPP CHAT</span>
              </a>

              <a
                href={PERSONAL_INFO.cvDownloadUrl}
                download="Resume-ZAINAL-ABIDIN.pdf"
                className="flex items-center gap-2 rounded-full border border-white/20 bg-zinc-900 px-4 py-2.5 font-mono text-xs font-medium uppercase tracking-wider text-zinc-300 transition-colors hover:border-white hover:text-white"
              >
                <Download className="h-3.5 w-3.5" />
                <span className="whitespace-nowrap">RESUME CV</span>
              </a>
            </div>
          </div>

          {/* Directory Links */}
          <div className="md:col-span-3 flex flex-col gap-3 font-mono text-xs">
            <div className="text-zinc-500 uppercase tracking-widest text-[11px] mb-2">
              // DIRECTORY
            </div>
            <Link href="/" className="text-zinc-300 hover:text-white transition-colors">
              01. Home
            </Link>
            <Link href="/about" className="text-zinc-300 hover:text-white transition-colors">
              02. About Me
            </Link>
            <Link href="/works" className="text-zinc-300 hover:text-white transition-colors">
              03. My Works
            </Link>
            <Link href="/gallery" className="text-zinc-300 hover:text-white transition-colors">
              04. Gallery Wall
            </Link>
            <Link href="/contact" className="text-zinc-300 hover:text-white transition-colors">
              05. Contact
            </Link>
          </div>

          {/* Social Profiles & Networks */}
          <div className="md:col-span-4 flex flex-col gap-3 font-mono text-xs">
            <div className="text-zinc-500 uppercase tracking-widest text-[11px] mb-2">
              // SOCIAL & NETWORKS
            </div>

            <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
              <a
                href={PERSONAL_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-zinc-300 hover:text-white transition-colors border-b border-white/5 pb-1"
              >
                <span>Instagram</span>
                <ArrowUpRight className="h-3 w-3 text-zinc-500" />
              </a>

              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-zinc-300 hover:text-white transition-colors border-b border-white/5 pb-1"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="h-3 w-3 text-zinc-500" />
              </a>

              <a
                href={PERSONAL_INFO.socials.threads}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-zinc-300 hover:text-white transition-colors border-b border-white/5 pb-1"
              >
                <span>Threads</span>
                <ArrowUpRight className="h-3 w-3 text-zinc-500" />
              </a>

              <a
                href={PERSONAL_INFO.socials.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-zinc-300 hover:text-white transition-colors border-b border-white/5 pb-1"
              >
                <span>Discord</span>
                <ArrowUpRight className="h-3 w-3 text-zinc-500" />
              </a>

              <a
                href={PERSONAL_INFO.socials.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-zinc-300 hover:text-white transition-colors border-b border-white/5 pb-1"
              >
                <span>Behance</span>
                <ArrowUpRight className="h-3 w-3 text-zinc-500" />
              </a>

              {/* WeChat with copy button */}
              <button
                type="button"
                onClick={handleCopyWeChat}
                className="flex items-center justify-between text-left text-zinc-300 hover:text-white transition-colors border-b border-white/5 pb-1"
                title="Click to copy WeChat ID"
              >
                <span>WeChat: {PERSONAL_INFO.socials.wechatId}</span>
                {copiedWeChat ? (
                  <Check className="h-3 w-3 text-emerald-400" />
                ) : (
                  <Copy className="h-3 w-3 text-zinc-500" />
                )}
              </button>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-zinc-400">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Mail className="h-3 w-3 text-zinc-500" />
                <span>{PERSONAL_INFO.email}</span>
                {copiedEmail ? (
                  <span className="text-[10px] text-emerald-400 uppercase">COPIED</span>
                ) : (
                  <span className="text-[10px] text-zinc-500 uppercase">(COPY)</span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Credits Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-zinc-500">
          <div>
            © {new Date().getFullYear()} ZAINAL ABIDIN. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-2">
            <span>JAKARTA, ID</span>
            <span>//</span>
            <a
              href={PERSONAL_INFO.currentCompany.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white hover:underline flex items-center gap-1"
            >
              <span>PT NUSARAYA EVENT</span>
              <ExternalLink className="h-2.5 w-2.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
