import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { askAiAssistant } from "@/lib/ai";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages array required" }, { status: 400 });
    }

    const reply = await askAiAssistant(messages);

    db.addAuditLog({
      action: "AI_COPILOT_QUERY",
      status: "success",
      ip: req.headers.get("x-forwarded-for") || "127.0.0.1",
      details: `AI query answered for ${session.username}`,
    });

    return NextResponse.json({ reply });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "AI Gateway error" }, { status: 500 });
  }
}
