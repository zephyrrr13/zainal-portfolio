import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = db.get();
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://zephyrrr13.vercel.app";

  const staticPages = ["", "/about", "/works", "/gallery", "/blog", "/contact"];

  const articleUrls = data.articles
    .filter((a) => a.published)
    .map(
      (a) => `
    <url>
      <loc>${baseUrl}/blog/${a.slug}</loc>
      <lastmod>${new Date(a.updatedAt || a.createdAt).toISOString().split("T")[0]}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`
    );

  const staticUrls = staticPages.map(
    (page) => `
    <url>
      <loc>${baseUrl}${page}</loc>
      <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
      <changefreq>daily</changefreq>
      <priority>${page === "" ? "1.0" : "0.7"}</priority>
    </url>`
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticUrls.join("")}
  ${articleUrls.join("")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
