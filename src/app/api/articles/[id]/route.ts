/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const article = await db.article.findUnique({
      where: { id: params.id },
    });

    if (!article) {
      return NextResponse.json({ success: false, error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, article });
  } catch (error: any) {
    console.error("GET SINGLE ARTICLE ERROR:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch article" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const {
      title,
      slug,
      excerpt,
      content,
      coverImage,
      category,
      tags,
      authorName,
      authorRole,
      authorAvatar,
      readTime,
      featured,
      published,
      seoTitle,
      seoDescription,
    } = body;

    const article = await db.article.update({
      where: { id: params.id },
      data: {
        ...(title && { title }),
        ...(slug && { slug: slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, "-") }),
        ...(excerpt !== undefined && { excerpt }),
        ...(content && { content }),
        ...(coverImage !== undefined && { coverImage }),
        ...(category && { category }),
        ...(tags !== undefined && {
          tags: Array.isArray(tags) ? tags : typeof tags === "string" ? tags.split(",").map((s: string) => s.trim()) : [],
        }),
        ...(authorName !== undefined && { authorName }),
        ...(authorRole !== undefined && { authorRole }),
        ...(authorAvatar !== undefined && { authorAvatar }),
        ...(readTime !== undefined && { readTime }),
        ...(featured !== undefined && { featured: Boolean(featured) }),
        ...(published !== undefined && { published: Boolean(published) }),
        ...(seoTitle !== undefined && { seoTitle }),
        ...(seoDescription !== undefined && { seoDescription }),
      },
    });

    return NextResponse.json({ success: true, article });
  } catch (error: any) {
    console.error("UPDATE ARTICLE ERROR:", error);
    return NextResponse.json({ success: false, error: error.message || "Failed to update article" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await db.article.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true, message: "Article deleted successfully" });
  } catch (error: any) {
    console.error("DELETE ARTICLE ERROR:", error);
    return NextResponse.json({ success: false, error: error.message || "Failed to delete article" }, { status: 500 });
  }
}
