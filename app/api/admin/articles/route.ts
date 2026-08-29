import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db, Article } from "@/lib/db";

export async function GET() {
  const data = db.get();
  return NextResponse.json(data.articles);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = db.get();

    const slug =
      body.slug?.trim() ||
      body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const newArticle: Article = {
      id: "art_" + Math.random().toString(36).substring(2, 9),
      slug,
      title: body.title || "Untitled Article",
      excerpt: body.excerpt || "",
      content: body.content || "",
      coverImage: body.coverImage || "/images/projects/comcore-asset-1.png",
      category: body.category || "3D Architecture",
      tags: Array.isArray(body.tags) ? body.tags : (body.tags || "").split(",").map((t: string) => t.trim()),
      published: Boolean(body.published),
      publishedAt: body.published ? new Date().toISOString() : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
      readTime: `${Math.max(1, Math.ceil((body.content || "").split(/\s+/).length / 200))} min read`,
    };

    data.articles.unshift(newArticle);
    db.save(data);

    db.addAuditLog({
      action: "ARTICLE_CREATED",
      status: "success",
      ip: req.headers.get("x-forwarded-for") || "127.0.0.1",
      details: `Created article: ${newArticle.title}`,
    });

    return NextResponse.json({ success: true, article: newArticle });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed creating article" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = db.get();
    const index = data.articles.findIndex((a) => a.id === body.id);

    if (index === -1) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    const prev = data.articles[index];
    data.articles[index] = {
      ...prev,
      ...body,
      tags: Array.isArray(body.tags) ? body.tags : (body.tags || "").split(",").map((t: string) => t.trim()),
      updatedAt: new Date().toISOString(),
      publishedAt: body.published && !prev.published ? new Date().toISOString() : prev.publishedAt,
    };

    db.save(data);

    db.addAuditLog({
      action: "ARTICLE_UPDATED",
      status: "success",
      ip: req.headers.get("x-forwarded-for") || "127.0.0.1",
      details: `Updated article: ${data.articles[index].title}`,
    });

    return NextResponse.json({ success: true, article: data.articles[index] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed updating article" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Article ID required" }, { status: 400 });
  }

  const data = db.get();
  const index = data.articles.findIndex((a) => a.id === id);
  if (index !== -1) {
    const deleted = data.articles.splice(index, 1)[0];
    db.save(data);

    db.addAuditLog({
      action: "ARTICLE_DELETED",
      status: "warning",
      ip: req.headers.get("x-forwarded-for") || "127.0.0.1",
      details: `Deleted article: ${deleted.title}`,
    });
  }

  return NextResponse.json({ success: true });
}
