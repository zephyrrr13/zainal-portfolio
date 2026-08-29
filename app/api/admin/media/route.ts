import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db, GalleryItem } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = db.get();
  return NextResponse.json(data.galleryItems);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = db.get();

    const newItem: GalleryItem = {
      id: "gal_" + Math.random().toString(36).substring(2, 9),
      title: body.title || "Untitled Artwork",
      category: body.category || "3D Render",
      imageUrl: body.imageUrl || "/images/projects/comcore-asset-1.png",
      aspectRatio: body.aspectRatio || "16/9",
      featured: Boolean(body.featured),
      tags: Array.isArray(body.tags) ? body.tags : (body.tags || "").split(",").map((t: string) => t.trim()),
      createdAt: new Date().toISOString(),
    };

    data.galleryItems.unshift(newItem);
    db.save(data);

    db.addAuditLog({
      action: "MEDIA_UPLOADED",
      status: "success",
      ip: req.headers.get("x-forwarded-for") || "127.0.0.1",
      details: `Added new media item: ${newItem.title}`,
    });

    return NextResponse.json({ success: true, item: newItem });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed saving media" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ error: "Media ID required" }, { status: 400 });

  const data = db.get();
  const index = data.galleryItems.findIndex((g) => g.id === id);
  if (index !== -1) {
    const deleted = data.galleryItems.splice(index, 1)[0];
    db.save(data);

    db.addAuditLog({
      action: "MEDIA_DELETED",
      status: "warning",
      ip: req.headers.get("x-forwarded-for") || "127.0.0.1",
      details: `Deleted media: ${deleted.title}`,
    });
  }

  return NextResponse.json({ success: true });
}
