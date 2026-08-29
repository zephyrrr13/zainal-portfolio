"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  Plus,
  Edit3,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  ExternalLink,
  X,
  Save,
  Tag,
  Folder,
  Image as ImageIcon,
} from "lucide-react";
import { Article } from "@/lib/db";

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Partial<Article> | null>(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/articles");
      if (res.ok) {
        const data = await res.json();
        setArticles(data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const openNewArticle = () => {
    setEditingArticle({
      title: "",
      slug: "",
      category: "3D Architecture",
      tags: ["Stage Design", "Octane Render"],
      excerpt: "",
      content: "",
      coverImage: "/images/projects/comcore-asset-1.png",
      published: true,
    });
    setIsEditing(true);
  };

  const openEditArticle = (art: Article) => {
    setEditingArticle({ ...art });
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle || !editingArticle.title) return;

    setSaveLoading(true);
    try {
      const isUpdate = Boolean(editingArticle.id);
      const method = isUpdate ? "PUT" : "POST";
      const res = await fetch("/api/admin/articles", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingArticle),
      });

      if (res.ok) {
        setNotification(isUpdate ? "Artikel berhasil diperbarui!" : "Artikel baru berhasil dipublikasikan!");
        setTimeout(() => setNotification(null), 3000);
        setIsEditing(false);
        setEditingArticle(null);
        fetchArticles();
      }
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Yakin ingin menghapus artikel "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/articles?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchArticles();
        setNotification("Artikel berhasil dihapus.");
        setTimeout(() => setNotification(null), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Banner */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Artikel & Case Studies CMS
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Kelola publikasi tulisan, breakdown arsitektur panggung 3D, dan proses kreatif.
          </p>
        </div>

        <button
          onClick={openNewArticle}
          className="flex items-center gap-2 rounded-xl border border-white bg-white px-4 py-2.5 text-xs font-bold uppercase text-black hover:bg-zinc-200 transition-colors shadow-lg"
        >
          <Plus className="h-4 w-4" />
          <span>Buat Artikel Baru</span>
        </button>
      </div>

      {notification && (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-4 text-xs text-emerald-300">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Articles List Table */}
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/80 shadow-xl backdrop-blur-xl">
        <div className="p-5 border-b border-white/10 text-xs text-zinc-400 flex items-center justify-between font-medium">
          <span>Daftar Artikel ({articles.length})</span>
          <span>Status: Live Publishing</span>
        </div>

        <div className="divide-y divide-white/5">
          {articles.map((art) => (
            <div
              key={art.id}
              className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-start gap-4 min-w-0">
                <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-900 border border-white/10 text-xs text-zinc-400">
                  <FileText className="h-5 w-5 text-zinc-300" />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="rounded-md bg-white/10 px-2 py-0.5 text-[11px] font-medium text-zinc-300">
                      {art.category}
                    </span>
                    {art.published ? (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span> Published
                      </span>
                    ) : (
                      <span className="text-[11px] text-zinc-500 font-medium">Draft</span>
                    )}
                  </div>

                  <h3 className="truncate font-bold text-white text-base">
                    {art.title}
                  </h3>

                  <p className="line-clamp-1 text-xs text-zinc-400 mt-0.5">
                    {art.excerpt || "Tidak ada deskripsi singkat."}
                  </p>

                  <div className="flex items-center gap-4 mt-2 text-xs text-zinc-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {art.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3.5 w-3.5" /> {art.views} views
                    </span>
                    <span>Slug: /{art.slug}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => openEditArticle(art)}
                  className="flex items-center gap-1.5 rounded-lg border border-white/15 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-300 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <Edit3 className="h-3.5 w-3.5" />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => handleDelete(art.id, art.title)}
                  className="flex items-center gap-1.5 rounded-lg border border-red-500/20 bg-red-950/20 px-3 py-1.5 text-xs text-red-400 hover:bg-red-900/40 transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}

          {articles.length === 0 && !loading && (
            <div className="p-12 text-center text-xs text-zinc-500">
              Belum ada artikel. Klik tombol &ldquo;Buat Artikel Baru&rdquo; untuk memulai.
            </div>
          )}
        </div>
      </div>

      {/* Editor Modal */}
      {isEditing && editingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
          <div className="relative w-full max-w-3xl rounded-3xl border border-white/20 bg-zinc-950 p-6 md:p-8 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-2 text-sm text-zinc-300">
                <FileText className="h-4 w-4 text-white" />
                <span className="font-bold">
                  {editingArticle.id ? "Edit Artikel" : "Buat Artikel Baru"}
                </span>
              </div>

              <button
                onClick={() => setIsEditing(false)}
                className="rounded-lg p-1 text-zinc-400 hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                  Judul Artikel / Case Study
                </label>
                <input
                  type="text"
                  value={editingArticle.title || ""}
                  onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                  placeholder="Contoh: Designing Comcore Launching Ceremony 3D Stage"
                  required
                  className="w-full rounded-xl border border-white/15 bg-zinc-900 px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    Kategori
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={editingArticle.category || ""}
                      onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                      placeholder="3D Architecture / Exhibition / Key Visual"
                      className="w-full rounded-xl border border-white/15 bg-zinc-900 px-4 py-2.5 pl-10 text-xs text-white focus:border-white focus:outline-none"
                    />
                    <Folder className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    Tags (Pisahkan dengan koma)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={
                        Array.isArray(editingArticle.tags)
                          ? editingArticle.tags.join(", ")
                          : (editingArticle.tags as any) || ""
                      }
                      onChange={(e) => setEditingArticle({ ...editingArticle, tags: e.target.value as any })}
                      placeholder="Stage, Octane, Lighting"
                      className="w-full rounded-xl border border-white/15 bg-zinc-900 px-4 py-2.5 pl-10 text-xs text-white focus:border-white focus:outline-none"
                    />
                    <Tag className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                  Cover Image Asset URL
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={editingArticle.coverImage || ""}
                    onChange={(e) => setEditingArticle({ ...editingArticle, coverImage: e.target.value })}
                    placeholder="/images/projects/comcore-asset-1.png"
                    className="w-full rounded-xl border border-white/15 bg-zinc-900 px-4 py-2.5 pl-10 text-xs text-white focus:border-white focus:outline-none"
                  />
                  <ImageIcon className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                  Ringkasan / Excerpt
                </label>
                <textarea
                  rows={2}
                  value={editingArticle.excerpt || ""}
                  onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                  placeholder="Deskripsi singkat yang tampil pada preview card..."
                  className="w-full rounded-xl border border-white/15 bg-zinc-900 p-3 text-xs text-white focus:border-white focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                  Konten Lengkap (Format Markdown / Text)
                </label>
                <textarea
                  rows={8}
                  value={editingArticle.content || ""}
                  onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                  placeholder="# Judul Sub-bagian&#10;&#10;Tuliskan proses pembuatan karya 3D kamu di sini..."
                  className="w-full rounded-xl border border-white/15 bg-zinc-900 p-3 text-xs text-white focus:border-white focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300 font-medium">
                  <input
                    type="checkbox"
                    checked={editingArticle.published ?? true}
                    onChange={(e) => setEditingArticle({ ...editingArticle, published: e.target.checked })}
                    className="h-4 w-4 rounded border-white/20 bg-zinc-900 accent-white"
                  />
                  <span>Publikasikan Langsung ke Publik</span>
                </label>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="rounded-xl border border-white/15 px-4 py-2.5 text-xs text-zinc-400 hover:text-white"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={saveLoading}
                    className="flex items-center gap-2 rounded-xl border border-white bg-white px-5 py-2.5 text-xs font-bold uppercase text-black hover:bg-zinc-200"
                  >
                    <Save className="h-4 w-4" />
                    <span>{saveLoading ? "Menyimpan..." : "Simpan Artikel"}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
