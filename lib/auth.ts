import jwt from "jsonwebtoken";
import crypto from "crypto";
import { cookies } from "next/headers";
import { AdminUser, db } from "./db";

const JWT_SECRET = process.env.JWT_SECRET || "zainal_super_jwt_secret_key_2026_@99";
const COOKIE_NAME = "zainal_admin_session";

export interface SessionPayload {
  userId: string;
  username: string;
  email: string;
  role: string;
}

export function signToken(payload: SessionPayload, rememberMe: boolean = false): string {
  const expiresIn = rememberMe ? "30d" : "1d";
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

export function verifyToken(token: string): SessionPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as SessionPayload;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export function setSessionCookie(token: string, rememberMe: boolean = false) {
  const cookieStore = cookies();
  const maxAge = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24; // 30 days or 1 day
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
  });
}

export function clearSessionCookie() {
  const cookieStore = cookies();
  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

// CAPTCHA Generator with HMAC Signature (Zero bot cracking)
export function generateCaptcha() {
  const num1 = Math.floor(Math.random() * 12) + 3;
  const num2 = Math.floor(Math.random() * 8) + 2;
  const answer = (num1 + num2).toString();

  const timestamp = Date.now();
  const rawSignature = `${answer}:${timestamp}:${JWT_SECRET}`;
  const signature = crypto.createHash("sha256").update(rawSignature).digest("hex");

  return {
    question: `Berapa ${num1} + ${num2} ?`,
    code: `${num1}+${num2}`,
    timestamp,
    signature,
  };
}

export function verifyCaptcha(userInput: string, timestamp: number, signature: string): boolean {
  // Expire captcha after 5 minutes
  if (Date.now() - timestamp > 5 * 60 * 1000) return false;

  const rawSignature = `${userInput.trim()}:${timestamp}:${JWT_SECRET}`;
  const expectedSignature = crypto.createHash("sha256").update(rawSignature).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
}

// Rate Limiter Memory Tracker
const loginAttempts = new Map<string, { count: number; lockUntil: number }>();

export function checkRateLimit(ip: string): { allowed: boolean; remainingSeconds?: number } {
  const record = loginAttempts.get(ip);
  if (!record) return { allowed: true };

  if (Date.now() < record.lockUntil) {
    const remainingSeconds = Math.ceil((record.lockUntil - Date.now()) / 1000);
    return { allowed: false, remainingSeconds };
  }

  if (record.count >= 5 && Date.now() > record.lockUntil) {
    loginAttempts.delete(ip);
    return { allowed: true };
  }

  return { allowed: true };
}

export function recordFailedLogin(ip: string) {
  const record = loginAttempts.get(ip) || { count: 0, lockUntil: 0 };
  record.count += 1;
  if (record.count >= 5) {
    record.lockUntil = Date.now() + 15 * 60 * 1000; // 15 minutes lockout
  }
  loginAttempts.set(ip, record);
}

export function resetFailedLogin(ip: string) {
  loginAttempts.delete(ip);
}
