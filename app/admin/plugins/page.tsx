"use client";

import React, { useState, useEffect } from "react";
import { Settings, Save, CheckCircle2, Globe, MessageSquare, AlertTriangle, FileCode } from "lucide-react";
import { PluginSettings } from "@/lib/db";

export default function AdminPluginsPage() {
  const [plugins, setPlugins] = useState<PluginSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/plugins")
      .then((res) => res.json())
      .then((data) => {
        setPlugins(data);
        setLoading(false);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!plugins) return;

    setSaving(true);
    try {
      const res = await fetch("/api/admin/plugins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(plugins),
      });

      if (res.ok) {
        setNotification("Pengaturan Plugin & Addons berhasil disimpan!");
        setTimeout(() => setNotification(null), 3000);
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading || !plugins) {
    return (
      <div className="flex min-h-[400px] items-center justify-center text-xs text-zinc-500 font-sans">
        Memuat data plugin...
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl font-sans">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Plugins & Fitur Tambahan (Addons)
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Aktifkan fitur SEO, Google Analytics, Floating WhatsApp Widget, dan Mode Pemeliharaan (Maintenance).
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-xl border border-white bg-white px-5 py-2.5 text-xs font-bold uppercase text-black hover:bg-zinc-200 transition-colors shadow-lg disabled:opacity-60"
        >
          <Save className="h-4 w-4" />
          <span>{saving ? "Menyimpan..." : "Simpan Pengaturan"}</span>
        </button>
      </div>

      {notification && (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-4 text-xs text-emerald-300">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* 1. SEO Meta Generator Plugin */}
        <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-6 md:p-8 backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-2.5">
              <Globe className="h-5 w-5 text-blue-400" />
              <div>
                <h2 className="text-sm font-bold text-white">SEO Meta & Social Sharing</h2>
                <p className="text-xs text-zinc-400">Optimasi search engine Google dan preview sharing link WhatsApp/LinkedIn</p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={plugins.seo.enabled}
                onChange={(e) =>
                  setPlugins({ ...plugins, seo: { ...plugins.seo, enabled: e.target.checked } })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Meta Title
              </label>
              <input
                type="text"
                value={plugins.seo.metaTitle}
                onChange={(e) =>
                  setPlugins({ ...plugins, seo: { ...plugins.seo, metaTitle: e.target.value } })
                }
                className="w-full rounded-xl border border-white/15 bg-zinc-900 px-4 py-2.5 text-xs text-white focus:border-white focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Meta Description
              </label>
              <textarea
                rows={2}
                value={plugins.seo.metaDescription}
                onChange={(e) =>
                  setPlugins({ ...plugins, seo: { ...plugins.seo, metaDescription: e.target.value } })
                }
                className="w-full rounded-xl border border-white/15 bg-zinc-900 p-3 text-xs text-white focus:border-white focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Target Keywords
              </label>
              <input
                type="text"
                value={plugins.seo.keywords}
                onChange={(e) =>
                  setPlugins({ ...plugins, seo: { ...plugins.seo, keywords: e.target.value } })
                }
                className="w-full rounded-xl border border-white/15 bg-zinc-900 px-4 py-2.5 text-xs text-white focus:border-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* 2. Floating WhatsApp Chat Widget */}
        <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-6 md:p-8 backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-2.5">
              <MessageSquare className="h-5 w-5 text-emerald-400" />
              <div>
                <h2 className="text-sm font-bold text-white">Floating WhatsApp Chat Widget</h2>
                <p className="text-xs text-zinc-400">Tombol obrolan langsung WhatsApp di pojok website</p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={plugins.whatsappWidget.enabled}
                onChange={(e) =>
                  setPlugins({
                    ...plugins,
                    whatsappWidget: { ...plugins.whatsappWidget, enabled: e.target.checked },
                  })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Nomor WhatsApp
              </label>
              <input
                type="text"
                value={plugins.whatsappWidget.phoneNumber}
                onChange={(e) =>
                  setPlugins({
                    ...plugins,
                    whatsappWidget: { ...plugins.whatsappWidget, phoneNumber: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-white/15 bg-zinc-900 px-4 py-2.5 text-xs text-white focus:border-white focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Template Pesan Pembuka
              </label>
              <input
                type="text"
                value={plugins.whatsappWidget.greetingMessage}
                onChange={(e) =>
                  setPlugins({
                    ...plugins,
                    whatsappWidget: { ...plugins.whatsappWidget, greetingMessage: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-white/15 bg-zinc-900 px-4 py-2.5 text-xs text-white focus:border-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* 3. Maintenance Mode */}
        <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-6 md:p-8 backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
              <div>
                <h2 className="text-sm font-bold text-white">Mode Pemeliharaan (Maintenance Mode)</h2>
                <p className="text-xs text-zinc-400">Tampilkan halaman under construction untuk publik saat sedang merombak konten</p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={plugins.maintenanceMode.enabled}
                onChange={(e) =>
                  setPlugins({
                    ...plugins,
                    maintenanceMode: { ...plugins.maintenanceMode, enabled: e.target.checked },
                  })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
            </label>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Judul Maintenance
              </label>
              <input
                type="text"
                value={plugins.maintenanceMode.title}
                onChange={(e) =>
                  setPlugins({
                    ...plugins,
                    maintenanceMode: { ...plugins.maintenanceMode, title: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-white/15 bg-zinc-900 px-4 py-2.5 text-xs text-white focus:border-white focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Pesan untuk Pengunjung
              </label>
              <textarea
                rows={2}
                value={plugins.maintenanceMode.message}
                onChange={(e) =>
                  setPlugins({
                    ...plugins,
                    maintenanceMode: { ...plugins.maintenanceMode, message: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-white/15 bg-zinc-900 p-3 text-xs text-white focus:border-white focus:outline-none"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
