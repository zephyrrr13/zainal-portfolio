"use client";

import React, { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, Bot, User, Copy, Check, Lightbulb, Minimize2, Maximize2 } from "lucide-react";
import { ChatMessage } from "@/lib/ai";

export function FloatingAiCopilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Halo Zainal! Saya adalah **AI Tweaking Copilot** kamu. Butuh bantuan menulis artikel 3D baru, membuat deskripsi SEO, merangkum data analitik, atau tweak copy portofolio?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

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
          content: "Gangguan koneksi ke AI Gateway.",
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

  const quickPrompts = [
    "Tulis draft artikel tutorial pencahayaan Octane Render",
    "Buatkan deskripsi SEO untuk portofolio stage design 3D",
    "Buat penawaran harga panggung seremonial VIP",
  ];

  return (
    <>
      {/* 1. Floating Glowing Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-purple-500/40 bg-zinc-950/90 px-4 py-3 text-xs font-semibold text-white shadow-[0_0_25px_rgba(168,85,247,0.35)] backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-purple-400 hover:bg-purple-950/80"
          title="Buka AI Copilot"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500 text-white animate-pulse">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <span>AI Tweaking Copilot</span>
        </button>
      )}

      {/* 2. Slide-Over / Pop-Up Overlay Drawer */}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex flex-col rounded-3xl border border-purple-500/30 bg-zinc-950/95 shadow-[0_20px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl transition-all duration-300 overflow-hidden ${
            isExpanded ? "w-[92vw] md:w-[680px] h-[85vh]" : "w-[92vw] sm:w-[420px] h-[560px]"
          }`}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-white/10 bg-zinc-900/60 px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>AI Copilot</span>
                  <span className="rounded-full bg-purple-500/20 px-1.5 py-0.2 text-[9px] text-purple-300">
                    GEMINI
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="rounded-lg p-1.5 text-zinc-400 hover:bg-white/10 hover:text-white"
                title={isExpanded ? "Minimize" : "Maximize"}
              >
                {isExpanded ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1.5 text-zinc-400 hover:bg-white/10 hover:text-white"
                title="Tutup"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.role === "assistant" && (
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-purple-950 border border-purple-500/30 text-purple-300">
                    <Sparkles className="h-3 w-3" />
                  </div>
                )}

                <div
                  className={`relative max-w-[85%] rounded-2xl p-3.5 leading-relaxed ${
                    m.role === "user"
                      ? "bg-white text-black font-semibold"
                      : "bg-zinc-900 border border-white/10 text-zinc-200"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{m.content}</div>

                  {m.role === "assistant" && (
                    <button
                      onClick={() => copyText(m.content, idx)}
                      className="mt-2.5 flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white transition-colors border-t border-white/5 pt-1.5"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-400" />
                          <span className="text-emerald-400">Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Salin Teks</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

                {m.role === "user" && (
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-white">
                    <User className="h-3 w-3" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-zinc-400 animate-pulse">
                <Sparkles className="h-3.5 w-3.5 text-purple-400 animate-spin" />
                <span>AI sedang berpikir...</span>
              </div>
            )}

            <div ref={scrollRef} />
          </div>

          {/* Quick Suggestions */}
          <div className="border-t border-white/5 bg-zinc-900/40 px-3 py-2 overflow-x-auto flex gap-1.5">
            {quickPrompts.map((s, i) => (
              <button
                key={i}
                onClick={() => handleSend(s)}
                className="rounded-full border border-white/10 bg-zinc-800/90 px-2.5 py-0.5 text-[10.5px] text-zinc-300 hover:border-white hover:text-white whitespace-nowrap"
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
            className="border-t border-white/10 p-3 bg-zinc-950 flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tanyakan / minta bantuan AI..."
              disabled={loading}
              className="flex-1 rounded-xl border border-white/15 bg-zinc-900 px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-white focus:outline-none"
            />

            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="rounded-xl border border-white bg-white px-3.5 py-2.5 text-xs font-bold text-black hover:bg-zinc-200 disabled:opacity-50"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
