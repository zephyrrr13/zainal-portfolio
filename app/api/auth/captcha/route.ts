import { NextResponse } from "next/server";
import { generateCaptcha } from "@/lib/auth";

export async function GET() {
  const captcha = generateCaptcha();
  return NextResponse.json(captcha);
}
