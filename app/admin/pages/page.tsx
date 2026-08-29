"use client";

import React, { useState, useEffect } from "react";
import { Sliders, Save, CheckCircle2, Globe, Sparkles, MapPin, Mail, MessageSquare } from "lucide-react";
import { PageSettings } from "@/lib/db";

export default function AdminPagesEditor() {
  const [settings, setSettings] = useState<PageSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/pages")
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
        setLoading(false);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setSaving(true);
    try {
      const res = await fetch("/api/admin/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        setNotification("Pengaturan halaman & teks portofolio berhasil disimpan!");
        setTimeout(() => setNotification(null), 3500);
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) {
    return (
      <div className="flex min-h-[400px] items-center justify-center text-xs text-zinc-500 font-sans">
        Memuat data editor halaman...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl font-sans">
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Editor Konten & Bio Halaman
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Perbarui teks tagline hero, bio about me, nomor kontak WhatsApp, dan link sosial media secara langsung.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-xl border border-white bg-white px-5 py-2.5 text-xs font-bold uppercase text-black hover:bg-zinc-200 transition-colors shadow-lg disabled:opacity-60"
        >
          <Save className="h-4 w-4" />
          <span>{saving ? "Menyimpan..." : "Simpan Perubahan"}</span>
        </button>
      </div>

      {notification && (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-4 text-xs text-emerald-300">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* 1. Hero Section Texts */}
        <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-6 md:p-8 backdrop-blur-xl">
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-300 mb-6 border-b border-white/10 pb-4">
            <Sparkles className="h-4 w-4 text-white" />
            <span>1. HERO SECTION & IDENTITAS</span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Hero Tagline / Specialty
              </label>
              <input
                type="text"
                value={settings.heroTagline}
                onChange={(e) => setSettings({ ...settings, heroTagline: e.target.value })}
                className="w-full rounded-xl border border-white/15 bg-zinc-900 px-4 py-2.5 text-xs text-white focus:border-white focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Job Title & Role
              </label>
              <input
                type="text"
                value={settings.heroRole}
                onChange={(e) => setSettings({ ...settings, heroRole: e.target.value })}
                className="w-full rounded-xl border border-white/15 bg-zinc-900 px-4 py-2.5 text-xs text-white focus:border-white focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Lokasi & Area Operasional
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={settings.heroLocation}
                  onChange={(e) => setSettings({ ...settings, heroLocation: e.target.value })}
                  className="w-full rounded-xl border border-white/15 bg-zinc-900 px-4 py-2.5 pl-10 text-xs text-white focus:border-white focus:outline-none"
                />
                <MapPin className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-zinc-500" />
              </div>
            </div>
          </div>
        </div>

        {/* 2. About Me Bio */}
        <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-6 md:p-8 backdrop-blur-xl">
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-300 mb-6 border-b border-white/10 pb-4">
            <Sliders className="h-4 w-4 text-white" />
            <span>2. ABOUT ME & NARASI PROFIL</span>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Biografi Lengkap
            </label>
            <textarea
              rows={4}
              value={settings.aboutBio}
              onChange={(e) => setSettings({ ...settings, aboutBio: e.target.value })}
              className="w-full rounded-xl border border-white/15 bg-zinc-900 p-4 text-xs text-white focus:border-white focus:outline-none leading-relaxed"
            />
          </div>
        </div>

        {/* 3. Direct Contacts & Socials */}
        <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-6 md:p-8 backdrop-blur-xl">
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-300 mb-6 border-b border-white/10 pb-4">
            <Globe className="h-4 w-4 text-white" />
            <span>3. KONTAK & LINK SOSIAL MEDIA</span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Email Kontak
              </label>
              <input
                type="text"
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                className="w-full rounded-xl border border-white/15 bg-zinc-900 px-4 py-2.5 text-xs text-white focus:border-white focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Nomor WhatsApp
              </label>
              <input
                type="text"
                value={settings.whatsappNumber}
                onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                className="w-full rounded-xl border border-white/15 bg-zinc-900 px-4 py-2.5 text-xs text-white focus:border-white focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Instagram URL
              </label>
              <input
                type="text"
                value={settings.socials.instagram}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socials: { ...settings.socials, instagram: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-white/15 bg-zinc-900 px-4 py-2.5 text-xs text-white focus:border-white focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                LinkedIn URL
              </label>
              <input
                type="text"
                value={settings.socials.linkedin}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socials: { ...settings.socials, linkedin: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-white/15 bg-zinc-900 px-4 py-2.5 text-xs text-white focus:border-white focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Behance Profile URL
              </label>
              <input
                type="text"
                value={settings.socials.behance}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socials: { ...settings.socials, behance: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-white/15 bg-zinc-900 px-4 py-2.5 text-xs text-white focus:border-white focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                WeChat ID
              </label>
              <input
                type="text"
                value={settings.socials.wechat}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socials: { ...settings.socials, wechat: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-white/15 bg-zinc-900 px-4 py-2.5 text-xs text-white focus:border-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-xl border border-white bg-white px-6 py-3 text-xs font-bold uppercase text-black hover:bg-zinc-200 transition-colors shadow-lg"
          >
            <Save className="h-4 w-4" />
            <span>{saving ? "Menyimpan..." : "Simpan Semua Pengaturan"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
