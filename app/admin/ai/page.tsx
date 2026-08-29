"use client";

import React, { useState, useRef, useEffect } from "react";
import { Bot, Send, Sparkles, RefreshCw, User, Copy, Check, Lightbulb } from "lucide-react";
import { ChatMessage } from "@/lib/ai";

export default function AdminAiCopilotPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Halo Zainal! Saya adalah **AI Gateway Copilot** kamu. Saya siap membantu kamu menulis artikel/case study 3D baru, membuat copy penawaran klien, merangkum data analitik kunjungan, atau menganalisis SEO portofolio kamu. Apa yang ingin kamu kerjakan hari ini?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || loading) return;

    const newMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    if (!textToSend) setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages([...newMessages, { role: "assistant", content: data.reply }]);
      } else {
        setMessages([
          ...newMessages,
          {
            role: "assistant",
            content: "Maaf, terjadi kendala pada AI Gateway. Silakan coba lagi.",
          },
        ]);
      }
    } catch {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "Gangguan koneksi saat menghubungi AI server.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const copyText = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const promptSuggestions = [
    "Tuliskan draft artikel case study tentang desain panggung Comcore",
    "Buat penawaran harga profesional untuk desain booth pameran 3D",
    "Bagaimana cara optimasi pencahayaan Octane Render untuk panggung konser?",
    "Buatkan ide konten portofolio berikutnya berdasarkan tren 3D terkini",
  ];

  return (
    <div className="flex h-[calc(100vh-8.5rem)] flex-col rounded-3xl border border-white/10 bg-zinc-950/80 shadow-2xl backdrop-blur-xl overflow-hidden">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-zinc-900/50">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-white">
              <span>ZAINAL AI COPILOT</span>
              <span className="rounded-full bg-purple-500/20 px-2 py-0.5 text-[9px] text-purple-300">
                GEMINI AI GATEWAY
              </span>
            </div>
            <p className="font-mono text-[10px] text-zinc-400">
              Specialized in 3D Architecture, Stage Engineering & Portfolio Copy
            </p>
          </div>
        </div>

        <button
          onClick={() =>
            setMessages([
              {
                role: "assistant",
                content: "Percakapan telah direset. Apa yang bisa saya bantu selanjutnya?",
              },
            ])
          }
          className="rounded-lg border border-white/10 p-2 text-zinc-400 hover:text-white transition-colors"
          title="Reset Chat"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex gap-3.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {m.role === "assistant" && (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-950 border border-purple-500/30 text-purple-300">
                <Sparkles className="h-4 w-4" />
              </div>
            )}

            <div
              className={`relative max-w-2xl rounded-2xl p-4 font-mono text-xs leading-relaxed ${
                m.role === "user"
                  ? "bg-white text-black font-semibold shadow"
                  : "bg-zinc-900 border border-white/10 text-zinc-200"
              }`}
            >
              <div className="whitespace-pre-wrap">{m.content}</div>

              {m.role === "assistant" && (
                <button
                  onClick={() => copyText(m.content, idx)}
                  className="mt-3 flex items-center gap-1.5 font-mono text-[10px] text-zinc-400 hover:text-white transition-colors border-t border-white/5 pt-2"
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-400" />
                      <span className="text-emerald-400">Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Salin Respon</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {m.role === "user" && (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-800 border border-white/10 text-white">
                <User className="h-4 w-4" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-950 text-purple-300">
              <Sparkles className="h-4 w-4 animate-spin" />
            </div>
            <div className="rounded-2xl bg-zinc-900 border border-white/10 p-3 font-mono text-xs text-zinc-400 animate-pulse">
              AI sedang menganalisis dan menyusun respon...
            </div>
          </div>
        )}

        <div ref={scrollRef} />
      </div>

      {/* Quick Prompt Suggestions */}
      <div className="border-t border-white/5 bg-zinc-900/30 px-6 py-2.5 overflow-x-auto flex gap-2">
        <span className="flex items-center gap-1 font-mono text-[10px] text-zinc-500 whitespace-nowrap">
          <Lightbulb className="h-3 w-3 text-yellow-400" /> Saran:
        </span>
        {promptSuggestions.map((s, i) => (
          <button
            key={i}
            onClick={() => handleSend(s)}
            className="rounded-full border border-white/10 bg-zinc-800/80 px-3 py-1 font-mono text-[10.5px] text-zinc-300 hover:border-white hover:text-white whitespace-nowrap transition-colors"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="border-t border-white/10 p-4 bg-zinc-950 flex gap-3"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tanyakan sesuatu ke AI Copilot portofolio..."
          disabled={loading}
          className="flex-1 rounded-xl border border-white/15 bg-zinc-900 px-4 py-3 font-mono text-xs text-white placeholder-zinc-500 focus:border-white focus:outline-none"
        />

        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="flex items-center gap-2 rounded-xl border border-white bg-white px-5 py-3 font-mono text-xs font-bold uppercase text-black hover:bg-zinc-200 disabled:opacity-50 transition-all shadow"
        >
          <Send className="h-4 w-4" />
          <span className="hidden sm:inline">Kirim</span>
        </button>
      </form>
    </div>
  );
}
