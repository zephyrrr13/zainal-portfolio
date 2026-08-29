export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function askAiAssistant(messages: ChatMessage[]): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY || "AQ.Ab8RN6IQe0zam-8P0ZAwrsUhBoQHIS4_wDMm0fFuxUziB8TbBg";

  const systemPrompt = `You are the executive AI Copilot for Zainal Abidin's high-end portfolio CMS dashboard.
Zainal Abidin is a Senior 3D Artist & Senior Graphic Designer based in Jakarta, specializing in:
- Ceremonial Stage Design & Event Architecture (e.g. Comcore Launching Ceremony, Xiaomi, Wilmar)
- Interactive Exhibition Booths (e.g. ZTE Days, Zoomlion)
- 3D Key Visuals & Motion Renders (Cinema 4D, Octane, Blender, Unreal Engine)

Your capabilities:
1. Writing and refining high-impact case study articles and blog posts in Markdown.
2. Analyzing visitor traffic data and recommending SEO & conversion improvements.
3. Drafting email responses to clients inquiring about 3D event design.
4. Answering technical questions about 3D rendering, lighting setups, and typography.
Provide concise, elegant, and professional answers with Markdown formatting.`;

  // Try Google Gemini API Gateway first
  try {
    const formattedContents = messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemPrompt }] },
          contents: formattedContents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1500,
          },
        }),
      }
    );

    if (res.ok) {
      const json = await res.json();
      const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) return text;
    }
  } catch (err) {
    console.warn("Gemini API call failed, falling back to Pollinations gateway:", err);
  }

  // Fallback to Free High-Speed AI Gateway (Pollinations)
  try {
    const combinedPrompt = `${systemPrompt}\n\nUser: ${messages[messages.length - 1]?.content || "Halo"}`;
    const encodedPrompt = encodeURIComponent(combinedPrompt);
    const fallbackRes = await fetch(`https://text.pollinations.ai/${encodedPrompt}?model=openai&json=false`, {
      method: "GET",
    });

    if (fallbackRes.ok) {
      const fallbackText = await fallbackRes.text();
      return fallbackText;
    }
  } catch (fallbackErr) {
    console.error("AI Assistant fallback failed:", fallbackErr);
  }

  return "Maaf, sistem AI Gateway sedang mengalami gangguan sementara. Silakan coba beberapa saat lagi.";
}
