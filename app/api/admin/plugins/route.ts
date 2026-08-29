import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = db.get();
  return NextResponse.json(data.plugins);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = db.get();
    data.plugins = { ...data.plugins, ...body };
    db.save(data);

    db.addAuditLog({
      action: "PLUGINS_UPDATED",
      status: "success",
      ip: req.headers.get("x-forwarded-for") || "127.0.0.1",
      details: "Updated SEO, Google Analytics, WhatsApp widget, and Maintenance settings",
    });

    return NextResponse.json({ success: true, plugins: data.plugins });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed saving plugin settings" }, { status: 500 });
  }
}
