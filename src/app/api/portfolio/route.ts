/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function GET() {
  try {
    const portfolio = await db.portfolioItem.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, portfolio });
  } catch (error: any) {
    console.error("GET PORTFOLIO ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch portfolio items." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    if (Array.isArray(body)) {
      for (const item of body) {
        if (!item.title || !item.category || !item.type || !item.url) {
          return NextResponse.json(
            { success: false, error: "Missing required fields in one or more items." },
            { status: 400 }
          );
        }
      }

      const created = await db.portfolioItem.createMany({
        data: body.map((item: any) => ({
          title: item.title,
          category: item.category,
          type: item.type,
          url: item.url,
          images: item.images && Array.isArray(item.images) ? item.images : [item.url],
        })),
      });

      return NextResponse.json({ success: true, count: created.count });
    }

    const { title, category, type, url, images } = body;

    if (!title || !category || !type || !url) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    const portfolioItem = await db.portfolioItem.create({
      data: { 
        title, 
        category, 
        type, 
        url,
        images: images && Array.isArray(images) ? images : [url],
      },
    });

    return NextResponse.json({ success: true, portfolioItem });
  } catch (error: any) {
    console.error("POST PORTFOLIO ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create portfolio item(s)." },
      { status: 500 }
    );
  }
}
