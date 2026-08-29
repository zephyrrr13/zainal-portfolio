import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
  clearSessionCookie();

  db.addAuditLog({
    action: "LOGOUT",
    status: "success",
    ip,
    details: "Admin session ended",
  });

  return NextResponse.json({ success: true, message: "Berhasil logout." });
}
