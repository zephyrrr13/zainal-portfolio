import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db, MenuItem } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = db.get();
  return NextResponse.json(data.menuItems);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { menuItems } = await req.json();
    if (!Array.isArray(menuItems)) {
      return NextResponse.json({ error: "Menu items array required" }, { status: 400 });
    }

    const data = db.get();
    data.menuItems = menuItems;
    db.save(data);

    db.addAuditLog({
      action: "NAVIGATION_MENUS_UPDATED",
      status: "success",
      ip: req.headers.get("x-forwarded-for") || "127.0.0.1",
      details: "Updated site navigation menu items",
    });

    return NextResponse.json({ success: true, menuItems: data.menuItems });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed updating menus" }, { status: 500 });
  }
}
