"use client";

import React, { useState } from "react";
import {
  Mail,
  MessageCircle,
  MapPin,
  Send,
  Check,
  Copy,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { PERSONAL_INFO } from "@/lib/data";

export function ContactCard() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "3D Stage & Spatial",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedWeChat, setCopiedWeChat] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate swift submission and prepare direct mailto/whatsapp fallback
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      const mailSubject = encodeURIComponent(`[Inquiry: ${formData.projectType}] from ${formData.name}`);
      const mailBody = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nProject Type: ${formData.projectType}\n\nMessage:\n${formData.message}`
      );
      window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${mailSubject}&body=${mailBody}`;
    }, 600);
  };

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
    <div className="w-full overflow-hidden rounded-3xl border border-white/20 bg-[#080808] text-white shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Side: Contact Info & Channels */}
        <div className="p-8 sm:p-12 lg:col-span-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 bg-[#040404]">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-400">
              <span className="h-2 w-2 rounded-full bg-white animate-pulse"></span>
              <span>DIRECT CHANNELS</span>
            </div>

            <h3 className="mt-4 text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
              GET IN TOUCH
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
              Available for 3D stage topology, concert VJ tours, architectural spatial pre-viz, and brand design commissions.
            </p>

            <div className="mt-8 flex flex-col gap-5 font-mono text-xs">
              {/* Direct WhatsApp Trigger */}
              <a
                href={PERSONAL_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl border border-white/15 bg-white/5 p-3.5 transition-all hover:bg-white hover:text-black"
              >
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-4 w-4" />
                  <div>
                    <div className="text-[10px] text-zinc-400 group-hover:text-zinc-700 uppercase">
                      WHATSAPP DIRECT
                    </div>
                    <div className="font-bold">{PERSONAL_INFO.phone}</div>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-zinc-400 group-hover:text-black" />
              </a>

              {/* Direct Email with Copy */}
              <div className="flex items-center justify-between rounded-xl border border-white/15 bg-white/5 p-3.5">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-zinc-400" />
                  <div>
                    <div className="text-[10px] text-zinc-400 uppercase">EMAIL</div>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="font-bold hover:underline"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="rounded px-2 py-1 text-[10px] uppercase border border-white/20 hover:bg-white hover:text-black transition-colors"
                >
                  {copiedEmail ? "COPIED" : "COPY"}
                </button>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
                <MapPin className="h-4 w-4 text-zinc-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase">BASE LOCATION</div>
                  <div className="text-zinc-300">{PERSONAL_INFO.location}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Profiles Grid */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-3">
              // SOCIAL CHANNELS
            </div>
            <div className="flex flex-wrap gap-2 font-mono text-xs">
              <a
                href={PERSONAL_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/15 bg-zinc-900 px-3 py-1.5 text-zinc-300 hover:text-white hover:border-white transition-colors"
              >
                Instagram ↗
              </a>
              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/15 bg-zinc-900 px-3 py-1.5 text-zinc-300 hover:text-white hover:border-white transition-colors"
              >
                LinkedIn ↗
              </a>
              <a
                href={PERSONAL_INFO.socials.threads}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/15 bg-zinc-900 px-3 py-1.5 text-zinc-300 hover:text-white hover:border-white transition-colors"
              >
                Threads ↗
              </a>
              <a
                href={PERSONAL_INFO.socials.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/15 bg-zinc-900 px-3 py-1.5 text-zinc-300 hover:text-white hover:border-white transition-colors"
              >
                Discord ↗
              </a>
              <button
                type="button"
                onClick={handleCopyWeChat}
                className="rounded-lg border border-white/15 bg-zinc-900 px-3 py-1.5 text-zinc-300 hover:text-white hover:border-white transition-colors flex items-center gap-1.5"
              >
                <span>WeChat: zephyrr13</span>
                {copiedWeChat && <Check className="h-3 w-3 text-emerald-400" />}
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Inquiry Form */}
        <div className="p-8 sm:p-12 lg:col-span-7 bg-[#0a0a0a]">
          <div className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-6">
            // SEND AN INQUIRY
          </div>

          {submitted ? (
            <div className="flex h-full min-h-[360px] flex-col items-center justify-center text-center p-6 border border-white/15 rounded-2xl bg-black">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black mb-4">
                <Check className="h-6 w-6" />
              </div>
              <h4 className="text-2xl font-bold uppercase tracking-tight text-white">
                INQUIRY INITIATED
              </h4>
              <p className="mt-2 font-mono text-xs text-zinc-400 max-w-sm">
                Your email client is opening with prefilled inquiry details. You can also message Zainal directly on WhatsApp.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-6 rounded-full border border-white/30 px-6 py-2 font-mono text-xs uppercase hover:bg-white hover:text-black transition-colors"
              >
                SEND ANOTHER MESSAGE
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-mono text-xs uppercase text-zinc-400 mb-2">
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-white/15 bg-black px-4 py-3.5 font-mono text-sm text-white placeholder:text-zinc-600 focus:border-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase text-zinc-400 mb-2">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jane@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-white/15 bg-black px-4 py-3.5 font-mono text-sm text-white placeholder:text-zinc-600 focus:border-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs uppercase text-zinc-400 mb-2">
                  PROJECT CATEGORY
                </label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full rounded-xl border border-white/15 bg-black px-4 py-3.5 font-mono text-sm text-white focus:border-white focus:outline-none transition-colors cursor-pointer"
                >
                  <option value="3D Stage & Spatial Architecture">3D Stage & Spatial Architecture (MICE)</option>
                  <option value="Live Concert VJ & Resolume Shaders">Live Concert VJ & Resolume Shaders</option>
                  <option value="Commercial Exhibition Booth Design">Commercial Exhibition Booth Design</option>
                  <option value="Motion Graphics & Video Direction">Motion Graphics & Video Direction</option>
                  <option value="Brand Identity & Design System">Brand Identity & Design System</option>
                  <option value="General Consultation / Other">General Consultation / Other</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-xs uppercase text-zinc-400 mb-2">
                  PROJECT BRIEF & TIMELINE *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your event scope, stage dimensions, timeline, or design deliverables..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-xl border border-white/15 bg-black px-4 py-3.5 font-mono text-sm text-white placeholder:text-zinc-600 focus:border-white focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full border border-white bg-white px-8 py-3.5 font-mono text-xs font-bold uppercase tracking-widest text-black transition-all hover:bg-zinc-200 disabled:opacity-50"
                >
                  <span>{isSubmitting ? "PROCESSING..." : "SUBMIT INQUIRY"}</span>
                  <Send className="h-3.5 w-3.5" />
                </button>

                <div className="font-mono text-[11px] text-zinc-500">
                  DIRECT RESPONSE WITHIN 24 HOURS
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
