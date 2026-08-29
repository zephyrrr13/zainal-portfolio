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
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  aspectRatio: string;
  featured: boolean;
  tags: string[];
  createdAt: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown / HTML
  coverImage?: string;
  category: string; // "Tutorial" | "Software Update" | "3D Stage Design" | "News & Insights"
  tags: string[];
  published: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  readTime: string;
  // Universal Template Fields
  softwareVersion?: string;
  downloadUrl?: string;
  keyTakeaways?: string[];
}

export interface MenuItem {
  id: string;
  label: string;
  path: string;
  order: number;
  visible: boolean;
  isExternal?: boolean;
}

export interface PluginSettings {
  seo: {
    enabled: boolean;
    metaTitle: string;
    metaDescription: string;
    keywords: string;
    ogImage: string;
  };
  googleAnalytics: {
    enabled: boolean;
    measurementId: string;
  };
  whatsappWidget: {
    enabled: boolean;
    phoneNumber: string;
    greetingMessage: string;
    position: "bottom-right" | "bottom-left";
  };
  maintenanceMode: {
    enabled: boolean;
    title: string;
    message: string;
  };
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface PageSettings {
  heroTagline: string;
  heroRole: string;
  heroLocation: string;
  aboutBio: string;
  experiences: ExperienceItem[];
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

export interface DatabaseSchema {
  users: AdminUser[];
  articles: Article[];
  galleryItems: GalleryItem[];
  menuItems: MenuItem[];
  plugins: PluginSettings;
  pageSettings: PageSettings;
  visitorLogs: VisitorLog[];
  auditLogs: AuditLog[];
}

const DEFAULT_GALLERY: GalleryItem[] = [
  {
    id: "gal_1",
    title: "Comcore Stage Tunnel Illumination",
    category: "3D Stage",
    imageUrl: "/images/projects/comcore-asset-1.png",
    aspectRatio: "16/9",
    featured: true,
    tags: ["Octane", "Stage", "Cinema4D"],
    createdAt: "2026-08-20T00:00:00Z",
  },
  {
    id: "gal_2",
    title: "ZTE Days Interactive 5G Booth",
    category: "Exhibition",
    imageUrl: "/images/projects/zte-days-asset-1.png",
    aspectRatio: "16/9",
    featured: true,
    tags: ["ZTE", "Booth", "Lighting"],
    createdAt: "2026-08-22T00:00:00Z",
  },
  {
    id: "gal_3",
    title: "Floating Astronaut Spatial Key Visual",
    category: "Key Visual",
    imageUrl: "/images/projects/floating-astronaut-1.png",
    aspectRatio: "1/1",
    featured: true,
    tags: ["Cinema 4D", "Surreal", "Character"],
    createdAt: "2026-08-24T00:00:00Z",
  },
];

const DEFAULT_MENUS: MenuItem[] = [
  { id: "m_1", label: "Home", path: "/", order: 1, visible: true },
  { id: "m_2", label: "About Me", path: "/about", order: 2, visible: true },
  { id: "m_3", label: "My Works", path: "/works", order: 3, visible: true },
  { id: "m_4", label: "Gallery Wall", path: "/gallery", order: 4, visible: true },
  { id: "m_5", label: "Articles & News", path: "/blog", order: 5, visible: true },
  { id: "m_6", label: "Contact", path: "/contact", order: 6, visible: true },
];

const DEFAULT_PLUGINS: PluginSettings = {
  seo: {
    enabled: true,
    metaTitle: "ZAINAL ABIDIN — Senior 3D Artist & Graphic Designer",
    metaDescription: "High-end 3D stage architecture, Octane rendering, ceremonial events, and creative direction based in Jakarta, Indonesia.",
    keywords: "3D Artist Jakarta, Event Stage Designer, Octane Render, Cinema 4D, Visual Jockey",
    ogImage: "/images/projects/comcore-asset-1.png",
  },
  googleAnalytics: {
    enabled: false,
    measurementId: "G-XXXXXXXXXX",
  },
  whatsappWidget: {
    enabled: true,
    phoneNumber: "+6281291329873",
    greetingMessage: "Halo Zainal, saya ingin berdiskusi mengenai project 3D Stage / Exhibition design.",
    position: "bottom-right",
  },
  maintenanceMode: {
    enabled: false,
    title: "System Upgrades in Progress",
    message: "Portfolio is currently updating 3D renders and case studies. Please check back shortly.",
  },
};

const DEFAULT_ARTICLES: Article[] = [
  {
    id: "art-zephyr-capture",
    slug: "zephyr-window-capture-plugin-resolume-windows",
    title: "Zephyr Window Capture Plugin For Resolume (Windows Only)",
    excerpt: "A high-performance, zero-latency GPU-accelerated window capture plugin for Resolume Arena on Windows. Capture Unreal Engine viewports, TouchDesigner feeds, or browser overlays with zero frame drops.",
    content: `# Zephyr Window Capture Plugin For Resolume (Windows Only)

When performing live VJ sets or operating ceremonial event stage visuals, capturing external window feeds—such as **Unreal Engine real-time camera viewports, TouchDesigner interactive generative systems, or web-based dynamic lyric overlays**—is often a major bottleneck in Resolume Arena.

Traditional NDI or desktop capture methods frequently introduce 2 to 3 frames of buffering latency. The **Zephyr Window Capture Plugin** solves this by establishing a direct **DirectX 11/12 Shared Texture GPU pipeline** on Windows.

## Key Features & Highlights
- **Zero-Copy GPU Texture Sharing:** Direct memory transfer between the target window and Resolume's composition engine without CPU-RAM roundtrips.
- **True Alpha Channel Support:** Automatically extracts 32-bit transparent backgrounds for clean graphic overlays and typography without chroma-keying.
- **Ultra-Low Latency:** Latency is minimized to under **1 frame (< 16ms @ 60 FPS)**.
- **Background Window Capture:** Continues capturing windows even when minimized or occluded by other applications.

## System Requirements
- **Operating System:** Windows 10 / Windows 11 (64-bit)
- **Host Software:** Resolume Arena 7.14 or later (64-bit)
- **GPU:** NVIDIA GeForce GTX 1060 / AMD Radeon RX 580 or higher

## Installation & Setup Guide

### Step 1: Copy Plugin Binary
Download the compiled plugin binary and place ZephyrWindowCapture.dll into your Resolume VFX directory:
C:/Program Files/Resolume Arena/plugins/vfx/

### Step 2: Restart Resolume Arena
Launch Resolume Arena. In the **Sources** panel on the right, search for **"Zephyr Window Capture"**.

### Step 3: Select Window Target
Drag the source into any clip slot. In the Clip Properties panel:
1. Select your target application from the **Window Dropdown** list.
2. Toggle **Capture Cursor** (On/Off).
3. Toggle **Preserve Alpha Transparency** (On/Off).

## Performance Benchmarks
In tests running **4K 60 FPS** window capture from Unreal Engine 5.4 into Resolume Arena:
- **GPU Overhead:** < 3.2% on RTX 3080
- **Frame Pacing:** Locked 60.0 FPS with 0 dropped frames over a 4-hour live stress test.`,
    coverImage: "/images/projects/stage-event-design-asset-1.png",
    category: "Software Update",
    tags: ["Resolume", "VJ Plugin", "Windows", "DirectX", "Live Visuals"],
    published: true,
    publishedAt: "2026-08-29T18:22:00Z",
    createdAt: "2026-08-29T18:22:00Z",
    updatedAt: "2026-08-29T18:22:00Z",
    views: 48,
    readTime: "4 min read",
    softwareVersion: "Resolume Arena 7.18+ / Windows 10/11",
    downloadUrl: "https://github.com/zephyrrr13/resolume-window-capture",
    keyTakeaways: [
      "DirectX 11/12 Shared Texture eliminates CPU latency for zero-lag capture.",
      "Supports 32-bit transparent alpha channel for web & kinetic typography overlays.",
      "Captures background & occluded windows without freezing frame buffer.",
      "Plug-and-play installation for Resolume Arena 7.14+."
    ],
  },

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

## 3. Technical Rendering Specifications
- **Render Engine:** Octane Render 2026.1 (Path Tracing)
- **Geometry Resolution:** 4.8 Million Polygons
- **Lighting Setup:** ACEScg Color Space with IES profile fixtures.`,
    coverImage: "/images/projects/comcore-asset-1.png",
    category: "3D Stage Design",
    tags: ["Stage Design", "Octane Render", "Event Production"],
    published: true,
    publishedAt: "2026-08-20T10:00:00Z",
    createdAt: "2026-08-20T09:30:00Z",
    updatedAt: "2026-08-20T10:00:00Z",
    views: 342,
    readTime: "4 min read",
    softwareVersion: "Cinema 4D 2026 / Octane 2026.1",
    keyTakeaways: [
      "Hexagonal portal tunnels dramatically improve attendee anticipation.",
      "Timecoded VJ visuals synchronize spatial lighting with keynote drops.",
      "ACEScg color pipeline guarantees accurate LED screen color reproduction."
    ],
  },
  {
    id: "art-2",
    slug: "octane-render-lighting-workflow-tutorial-2026",
    title: "Tutorial: Advanced Cinematic Lighting for 3D Concert & Event Stages",
    excerpt: "Master the volumetric fog, IES spot light emitters, and emissive neon shaders to make your stage renders look hyper-realistic.",
    content: `# Advanced Cinematic Lighting for 3D Concert Stages

Lighting is 80% of what makes a 3D stage render look realistic. In this tutorial, we explore step-by-step techniques to create concert stadium atmosphere in Octane Render.

## Step 1: Setting up Medium Volumetric Fog
Add an Octane Volume with Scattering Phase at 0.6 to capture sharp light beams without washing out black levels.

## Step 2: Realistic IES Fixtures
Always use real-world IES profiles for moving heads (Sharpy, Robe MegaPointe) rather than default area lights.

## Step 3: Camera Post-Processing
Enable subtle bloom (0.04) and spectral glare (0.02) to simulate high-intensity laser optics.`,
    coverImage: "/images/projects/stage-event-design-asset-1.png",
    category: "Tutorial",
    tags: ["Octane Tutorial", "Stage Lighting", "Cinema 4D"],
    published: true,
    publishedAt: "2026-08-25T14:00:00Z",
    createdAt: "2026-08-25T13:00:00Z",
    updatedAt: "2026-08-25T14:00:00Z",
    views: 528,
    readTime: "6 min read",
    softwareVersion: "Octane Render 2026 / Blender 4.2",
    keyTakeaways: [
      "Volumetric scattering creates realistic haze beam depth.",
      "IES profiles match physical concert moving head fixtures.",
      "Spectral glare adds genuine optical laser diffraction."
    ],
  },
];

const DEFAULT_EXPERIENCES: ExperienceItem[] = [
  {
    id: "exp_1",
    role: "Senior 3D Artist & Senior Graphic Designer",
    company: "PT Nusaraya Event",
    location: "Jakarta, ID",
    period: "2023 — Present",
    description: "Lead 3D stage architect and visual director for major corporate launching ceremonies, global tech brand exhibitions (ZTE, Xiaomi), and state ceremonies.",
    highlights: ["Comcore Flagship Launching", "ZTE Days Interactive Exhibition", "Zoomlion Global Expo"],
  },
  {
    id: "exp_2",
    role: "3D Motion Designer & VJ Specialist",
    company: "Creative Spatial Agency",
    location: "Jakarta, ID",
    period: "2021 — 2023",
    description: "Engineered real-time visual playback loops, architectural mapping assets, and ceremonial countdowns.",
    highlights: ["Live concert timecode VJing", "High-polygon spatial stage modeling"],
  },
];

const DEFAULT_SETTINGS: PageSettings = {
  heroTagline: "3D ARTIST & GRAPHIC DESIGNER",
  heroRole: "SENIOR 3D ARTIST & SENIOR GRAPHIC DESIGNER",
  heroLocation: "JAKARTA, ID // PULO GEBANG",
  aboutBio: "Multidisciplinary 3D Artist and Graphic Designer with 5+ years of experience specializing in event stage architecture, ceremonial visual systems, immersive exhibition booths, and high-impact key visuals.",
  experiences: DEFAULT_EXPERIENCES,
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

function ensureDb(): DatabaseSchema {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  let existing: Partial<DatabaseSchema> = {};
  if (fs.existsSync(DB_FILE)) {
    try {
      existing = JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
    } catch {}
  }

  const salt = bcrypt.genSaltSync(10);
  const initialPasswordHash = bcrypt.hashSync("zephyr13", salt);

  const initialData: DatabaseSchema = {
    users: existing.users?.length ? existing.users : [
      {
        id: "usr_admin_1",
        username: "zephyrrr13",
        email: "ananizainal13@gmail.com",
        passwordHash: initialPasswordHash,
        role: "superadmin",
        createdAt: new Date().toISOString(),
      },
    ],
    articles: existing.articles?.length ? existing.articles : DEFAULT_ARTICLES,
    galleryItems: existing.galleryItems?.length ? existing.galleryItems : DEFAULT_GALLERY,
    menuItems: existing.menuItems?.length ? existing.menuItems : DEFAULT_MENUS,
    plugins: existing.plugins || DEFAULT_PLUGINS,
    pageSettings: existing.pageSettings || DEFAULT_SETTINGS,
    visitorLogs: existing.visitorLogs || [],
    auditLogs: existing.auditLogs || [],
  };

  if (!fs.existsSync(DB_FILE) || !existing.galleryItems) {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), "utf-8");
    } catch {}
  }

  return initialData;
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
