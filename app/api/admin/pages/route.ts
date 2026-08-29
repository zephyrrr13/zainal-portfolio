import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const data = db.get();
  return NextResponse.json(data.pageSettings);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = db.get();
    data.pageSettings = { ...data.pageSettings, ...body };
    db.save(data);

    db.addAuditLog({
      action: "PAGE_SETTINGS_UPDATED",
      status: "success",
      ip: req.headers.get("x-forwarded-for") || "127.0.0.1",
      details: "Updated live homepage and about settings",
    });

    return NextResponse.json({ success: true, settings: data.pageSettings });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed saving settings" }, { status: 500 });
  }
}
