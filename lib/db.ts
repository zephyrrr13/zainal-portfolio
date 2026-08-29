import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";

const DB_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DB_DIR, "store.json");

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  role: "admin" | "superadmin";
  createdAt: string;
  lastLogin?: string;
  failedLoginAttempts?: number;
  lockUntil?: string;
}

export interface PasswordResetToken {
  id: string;
  email: string;
  token: string;
  expiresAt: number; // timestamp
  used: boolean;
  createdAt: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown / HTML
  coverImage?: string;
  category: string;
  tags: string[];
  published: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  readTime: string;
}

export interface VisitorLog {
  id: string;
  timestamp: string;
  path: string;
  referrer: string;
  userAgent: string;
  device: "desktop" | "mobile" | "tablet" | "unknown";
  browser: string;
  ip: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  status: "success" | "warning" | "danger";
  ip: string;
  details: string;
}

export interface PageSettings {
  heroTagline: string;
  heroRole: string;
  heroLocation: string;
  aboutBio: string;
  featuredProjects: string[];
  contactEmail: string;
  whatsappNumber: string;
  socials: {
    instagram: string;
    linkedin: string;
    threads: string;
    behance: string;
    discord: string;
    wechat: string;
  };
}

export interface DatabaseSchema {
  users: AdminUser[];
  resetTokens: PasswordResetToken[];
  articles: Article[];
  visitorLogs: VisitorLog[];
  auditLogs: AuditLog[];
  pageSettings: PageSettings;
}

const DEFAULT_SETTINGS: PageSettings = {
  heroTagline: "3D ARTIST & GRAPHIC DESIGNER",
  heroRole: "SENIOR 3D ARTIST & SENIOR GRAPHIC DESIGNER",
  heroLocation: "JAKARTA, ID // PULO GEBANG",
  aboutBio: "Multidisciplinary 3D Artist and Graphic Designer with 5+ years of experience specializing in event stage architecture, ceremonial visual systems, immersive exhibition booths, and high-impact key visuals.",
  featuredProjects: [
    "comcore-launching-ceremony",
    "zte-days",
    "zoomlion-exhibition",
    "stage-event-design",
    "floating-astronaut",
  ],
  contactEmail: "ananizainal13@gmail.com",
  whatsappNumber: "+6281291329873",
  socials: {
    instagram: "https://www.instagram.com/zephyrrr13?igsi=MWpkZG5ra29jejhtbA%3D%3D&utm_source=qr",
    linkedin: "https://www.linkedin.com/in/zephyrrr13/",
    threads: "https://www.threads.com/@zephyrrr13?igshid=NTc4MTIwNjQ2YQ==",
    behance: "https://www.behance.net/ananimr13",
    discord: "https://discord.gg/DncG838n",
    wechat: "zephyrr13",
  },
};

const DEFAULT_ARTICLES: Article[] = [
  {
    id: "art-1",
    slug: "designing-comcore-launching-ceremony-3d-stage",
    title: "Designing the Comcore Launching Ceremony: Spatial 3D Stage Architecture",
    excerpt: "A deep dive into creating the entrance tunnel portal, dynamic kinetic lighting, and ceremonial VIP stage for Comcore's flagship launch event.",
    content: `# Designing the Comcore Launching Ceremony

The Comcore Launching Ceremony required a futuristic spatial visual system that guided guests from the entrance tunnel through to the grand circular presentation stage.

## 1. The Ceremonial Portal Tunnel
We engineered an illuminated hexagonal tunnel inspired by aerospace architecture to build anticipation upon arrival.

## 2. Dynamic Lighting & VJ Visuals
Using Cinema 4D and Octane Render, each visual sequence was timecoded with the launch keynote countdown.

## 3. Outcome
The event hosted over 500 VIP attendees with immersive architectural scale and zero technical hiccups.`,
    coverImage: "/images/projects/comcore-asset-1.png",
    category: "3D Architecture",
    tags: ["Stage Design", "Octane Render", "Event Production"],
    published: true,
    publishedAt: "2026-08-20T10:00:00Z",
    createdAt: "2026-08-20T09:30:00Z",
    updatedAt: "2026-08-20T10:00:00Z",
    views: 342,
    readTime: "4 min read",
  },
  {
    id: "art-2",
    slug: "zte-days-multimedia-booth-experience",
    title: "ZTE Days: Interactive Exhibition Booth & Visual Identity",
    excerpt: "Architectural modeling and booth layout engineering for ZTE Days global telecommunications showcase.",
    content: `# ZTE Days Visual Experience

For ZTE Days, our goal was to translate complex 5G network infrastructure into an inviting, high-tech physical space.

### Key Highlights:
- Floating holographic podiums
- Micro-textured matte black & electric teal finishes
- Seamless guest flow and interactive demo zones`,
    coverImage: "/images/projects/zte-days-asset-1.png",
    category: "Exhibition",
    tags: ["ZTE", "Booth Design", "Key Visual"],
    published: true,
    publishedAt: "2026-08-22T14:00:00Z",
    createdAt: "2026-08-22T13:00:00Z",
    updatedAt: "2026-08-22T14:00:00Z",
    views: 218,
    readTime: "3 min read",
  },
];

function ensureDb(): DatabaseSchema {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    // Generate initial admin password hash
    const initialPassword = process.env.ADMIN_INITIAL_PASSWORD || "Zainal@Admin2026!";
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(initialPassword, salt);

    const initialData: DatabaseSchema = {
      users: [
        {
          id: "usr_admin_1",
          username: process.env.ADMIN_USERNAME || "zephyrrr13",
          email: process.env.ADMIN_EMAIL || "ananizainal13@gmail.com",
          passwordHash,
          role: "superadmin",
          createdAt: new Date().toISOString(),
          failedLoginAttempts: 0,
        },
      ],
      resetTokens: [],
      articles: DEFAULT_ARTICLES,
      visitorLogs: [
        {
          id: "log_1",
          timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
          path: "/",
          referrer: "https://www.linkedin.com/",
          userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
          device: "desktop",
          browser: "Chrome",
          ip: "103.28.12.44",
        },
        {
          id: "log_2",
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          path: "/gallery",
          referrer: "https://www.behance.net/",
          userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4)",
          device: "mobile",
          browser: "Safari",
          ip: "114.122.34.89",
        },
      ],
      auditLogs: [
        {
          id: "audit_init",
          timestamp: new Date().toISOString(),
          action: "SYSTEM_INITIALIZED",
          status: "success",
          ip: "127.0.0.1",
          details: "Secure CMS Database and Admin user initialized",
        },
      ],
      pageSettings: DEFAULT_SETTINGS,
    };

    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), "utf-8");
    return initialData;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(raw) as DatabaseSchema;
  } catch (err) {
    console.error("Failed reading database, returning memory fallback:", err);
    return {
      users: [],
      resetTokens: [],
      articles: DEFAULT_ARTICLES,
      visitorLogs: [],
      auditLogs: [],
      pageSettings: DEFAULT_SETTINGS,
    };
  }
}

function saveDb(data: DatabaseSchema) {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed saving database:", err);
  }
}

export const db = {
  get: ensureDb,
  save: saveDb,
  // Helper methods
  findUserByEmailOrUsername: (identifier: string) => {
    const data = ensureDb();
    const clean = identifier.trim().toLowerCase();
    return data.users.find(
      (u) => u.email.toLowerCase() === clean || u.username.toLowerCase() === clean
    );
  },
  updateUser: (user: AdminUser) => {
    const data = ensureDb();
    const index = data.users.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      data.users[index] = user;
      saveDb(data);
    }
  },
  addAuditLog: (log: Omit<AuditLog, "id" | "timestamp">) => {
    const data = ensureDb();
    const newLog: AuditLog = {
      ...log,
      id: "aud_" + Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toISOString(),
    };
    data.auditLogs.unshift(newLog);
    if (data.auditLogs.length > 500) data.auditLogs = data.auditLogs.slice(0, 500);
    saveDb(data);
  },
  addVisitorLog: (log: Omit<VisitorLog, "id" | "timestamp">) => {
    const data = ensureDb();
    const newLog: VisitorLog = {
      ...log,
      id: "vis_" + Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toISOString(),
    };
    data.visitorLogs.unshift(newLog);
    if (data.visitorLogs.length > 2000) data.visitorLogs = data.visitorLogs.slice(0, 2000);
    saveDb(data);
  },
};
