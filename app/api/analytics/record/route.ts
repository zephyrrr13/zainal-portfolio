import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userAgent = req.headers.get("user-agent") || "unknown";
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";

    let device: "desktop" | "mobile" | "tablet" | "unknown" = "desktop";
    if (/mobile/i.test(userAgent)) device = "mobile";
    if (/tablet|ipad/i.test(userAgent)) device = "tablet";

    let browser = "Chrome";
    if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) browser = "Safari";
    if (/firefox/i.test(userAgent)) browser = "Firefox";
    if (/edg/i.test(userAgent)) browser = "Edge";

    db.addVisitorLog({
      path: body.path || "/",
      referrer: body.referrer || "Direct",
      userAgent,
      device,
      browser,
      ip,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false });
  }
}
