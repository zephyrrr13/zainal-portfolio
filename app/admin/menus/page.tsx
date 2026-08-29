"use client";

import React, { useState, useEffect } from "react";
import { Menu, Plus, Save, Trash2, Eye, EyeOff, CheckCircle2, ArrowUpDown } from "lucide-react";
import { MenuItem } from "@/lib/db";

export default function AdminMenusPage() {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // New Link State
  const [newLabel, setNewLabel] = useState("");
  const [newPath, setNewPath] = useState("");

  const fetchMenus = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/menus");
      if (res.ok) {
        const data = await res.json();
        setMenus(data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const handleSaveMenus = async (itemsToSave: MenuItem[]) => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/menus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ menuItems: itemsToSave }),
      });

      if (res.ok) {
        setNotification("Struktur menu navigasi berhasil diperbarui!");
        setTimeout(() => setNotification(null), 3000);
        setMenus(itemsToSave);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleToggleVisible = (id: string) => {
    const updated = menus.map((m) => (m.id === id ? { ...m, visible: !m.visible } : m));
    setMenus(updated);
  };

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel || !newPath) return;

    const newItem: MenuItem = {
      id: "m_" + Math.random().toString(36).substring(2, 9),
      label: newLabel,
      path: newPath,
      order: menus.length + 1,
      visible: true,
    };

    const updated = [...menus, newItem];
    setMenus(updated);
    setNewLabel("");
    setNewPath("");
  };

  const handleDeleteItem = (id: string) => {
    const updated = menus.filter((m) => m.id !== id);
    setMenus(updated);
  };

  return (
    <div className="space-y-8 max-w-4xl font-sans">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Editor Menu Navigasi Website
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Atur urutan, ubah nama, dan tampilkan/sembunyikan link di Kinetic Navigation Drawer & Footer.
          </p>
        </div>

        <button
          onClick={() => handleSaveMenus(menus)}
          disabled={saving}
          className="flex items-center gap-2 rounded-xl border border-white bg-white px-5 py-2.5 text-xs font-bold uppercase text-black hover:bg-zinc-200 transition-colors shadow-lg disabled:opacity-60"
        >
          <Save className="h-4 w-4" />
          <span>{saving ? "Menyimpan..." : "Simpan Perubahan Menu"}</span>
        </button>
      </div>

      {notification && (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-4 text-xs text-emerald-300">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Menu List */}
      <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-6 md:p-8 backdrop-blur-xl">
        <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Menu className="h-4 w-4 text-white" />
          <span>Daftar Menu Aktif</span>
        </h2>

        <div className="space-y-3">
          {menus.map((item, idx) => (
            <div
              key={item.id}
              className={`flex items-center justify-between rounded-xl border p-3.5 transition-all ${
                item.visible
                  ? "border-white/10 bg-zinc-900/60"
                  : "border-white/5 bg-zinc-950/40 opacity-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded bg-white/10 text-xs font-bold text-zinc-300">
                  {idx + 1}
                </span>
                <input
                  type="text"
                  value={item.label}
                  onChange={(e) => {
                    const next = [...menus];
                    next[idx].label = e.target.value;
                    setMenus(next);
                  }}
                  className="rounded-lg border border-white/10 bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-white focus:border-white focus:outline-none"
                />
                <input
                  type="text"
                  value={item.path}
                  onChange={(e) => {
                    const next = [...menus];
                    next[idx].path = e.target.value;
                    setMenus(next);
                  }}
                  className="rounded-lg border border-white/10 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-400 focus:border-white focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleToggleVisible(item.id)}
                  className="p-1.5 text-zinc-400 hover:text-white transition-colors"
                  title={item.visible ? "Sembunyikan Menu" : "Tampilkan Menu"}
                >
                  {item.visible ? <Eye className="h-4 w-4 text-emerald-400" /> : <EyeOff className="h-4 w-4" />}
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteItem(item.id)}
                  className="p-1.5 text-zinc-500 hover:text-red-400 transition-colors"
                  title="Hapus item menu"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Link Form */}
        <form onSubmit={handleAddLink} className="mt-6 border-t border-white/10 pt-6 flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            placeholder="Label Menu Baru (Contoh: Case Studies)"
            className="flex-1 rounded-xl border border-white/15 bg-zinc-900 px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-white focus:outline-none"
          />
          <input
            type="text"
            value={newPath}
            onChange={(e) => setNewPath(e.target.value)}
            placeholder="Target Path URL (Contoh: /blog)"
            className="flex-1 rounded-xl border border-white/15 bg-zinc-900 px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-white focus:outline-none"
          />
          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-zinc-900 px-5 py-2.5 text-xs font-semibold text-white hover:bg-white hover:text-black transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Tambah</span>
          </button>
        </form>
      </div>
    </div>
  );
}
