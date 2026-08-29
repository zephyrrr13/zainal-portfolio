"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Image as ImageIcon,
  Upload,
  Plus,
  Trash2,
  Copy,
  Check,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  RefreshCw,
  Folder,
  Tag,
} from "lucide-react";
import { GalleryItem } from "@/lib/db";

export default function AdminMediaPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // New Media Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("3D Render");
  const [imageUrl, setImageUrl] = useState("");
  const [aspectRatio, setAspectRatio] = useState("16/9");
  const [tags, setTags] = useState("Cinema4D, Octane");
  const [featured, setFeatured] = useState(true);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/media");
      if (res.ok) {
        const data = await res.json();
        setGallery(data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleAddMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !imageUrl) return;

    setIsUploading(true);
    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          category,
          imageUrl,
          aspectRatio,
          tags,
          featured,
        }),
      });

      if (res.ok) {
        setNotification("Foto/Karya baru berhasil ditambahkan ke Galeri!");
        setTimeout(() => setNotification(null), 3000);
        setTitle("");
        setImageUrl("");
        fetchMedia();
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string, itemTitle: string) => {
    if (!confirm(`Hapus foto "${itemTitle}" dari galeri?`)) return;

    try {
      const res = await fetch(`/api/admin/media?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setNotification("Foto berhasil dihapus dari galeri.");
        setTimeout(() => setNotification(null), 3000);
        fetchMedia();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const copyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Top Banner */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Manajemen Media & Galeri
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Upload karya 3D baru, ganti cover project, dan kelola foto yang tampil di Galeri Wall website.
          </p>
        </div>

        <button
          onClick={fetchMedia}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl border border-white/20 bg-zinc-900 px-4 py-2.5 text-xs font-medium text-white hover:bg-white/10 transition-colors"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh Galeri</span>
        </button>
      </div>

      {notification && (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-4 text-xs text-emerald-300">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Add New Media Card */}
      <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-6 md:p-8 backdrop-blur-xl">
        <div className="flex items-center gap-2 text-xs font-bold text-zinc-300 mb-6 border-b border-white/10 pb-4">
          <Upload className="h-4 w-4 text-white" />
          <span>TAMBAH KARYA / FOTO KE GALERI</span>
        </div>

        <form onSubmit={handleAddMedia} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Judul Karya / Foto
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Comcore Stage Tunnel Lighting"
                required
                className="w-full rounded-xl border border-white/15 bg-zinc-900 px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-white focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Kategori
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-zinc-900 px-4 py-2.5 text-xs text-white focus:border-white focus:outline-none cursor-pointer"
              >
                <option value="3D Stage">3D Stage Design</option>
                <option value="Exhibition">Exhibition Booth</option>
                <option value="Key Visual">Key Visual & Graphic</option>
                <option value="Lighting & VJ">Lighting & VJ Visuals</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                URL Gambar (Cloud / ImgBB / Drive / CDN)
              </label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://... atau /images/projects/nama-file.png"
                required
                className="w-full rounded-xl border border-white/15 bg-zinc-900 px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-white focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Tags (Pisahkan koma)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Octane, Cinema4D, Event"
                className="w-full rounded-xl border border-white/15 bg-zinc-900 px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-white focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="h-4 w-4 rounded border-white/20 bg-zinc-900 accent-white"
              />
              <span>Tampilkan sebagai Karya Utama (Featured)</span>
            </label>

            <button
              type="submit"
              disabled={isUploading}
              className="flex items-center gap-2 rounded-xl border border-white bg-white px-5 py-2.5 text-xs font-bold uppercase text-black hover:bg-zinc-200 transition-colors shadow-lg disabled:opacity-60"
            >
              <Plus className="h-4 w-4" />
              <span>{isUploading ? "Menyimpan..." : "Tambahkan ke Galeri"}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Gallery Grid */}
      <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-6 backdrop-blur-xl">
        <h2 className="text-base font-bold text-white mb-1">Daftar Foto Galeri ({gallery.length})</h2>
        <p className="text-xs text-zinc-400 mb-6">Semua foto dan render yang aktif di website</p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((item) => (
            <div
              key={item.id}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60 p-4 transition-all hover:border-white/30 hover:bg-zinc-900"
            >
              <div className="relative h-48 w-full overflow-hidden rounded-xl bg-black mb-3 border border-white/5">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-2 left-2 rounded-md bg-black/80 px-2 py-0.5 text-[10px] font-medium text-zinc-300 backdrop-blur-md">
                  {item.category}
                </span>
              </div>

              <h3 className="font-bold text-white text-sm truncate">{item.title}</h3>

              <div className="flex flex-wrap gap-1 my-2">
                {item.tags?.map((t, i) => (
                  <span key={i} className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-zinc-400">
                    #{t}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-3 mt-3">
                <button
                  type="button"
                  onClick={() => copyUrl(item.imageUrl, item.id)}
                  className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white transition-colors"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Salin URL</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(item.id, item.title)}
                  className="p-1 text-zinc-500 hover:text-red-400 transition-colors"
                  title="Hapus foto"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
