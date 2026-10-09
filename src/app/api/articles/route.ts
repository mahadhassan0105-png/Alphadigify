/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { DEFAULT_ARTICLES, ArticleItem } from "@/data/defaultArticles";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search")?.toLowerCase();

    let articles: ArticleItem[] = [];

    let adminAuthor = {
      name: "",
      image: "",
      role: "",
    };

    try {
      const companySettings = await (db as any).companySettings.findUnique({
        where: { id: "global" },
      });
      if (companySettings) {
        if (companySettings.adminName) adminAuthor.name = companySettings.adminName;
        if (companySettings.adminImage) adminAuthor.image = companySettings.adminImage;
        if (companySettings.adminRole) adminAuthor.role = companySettings.adminRole;
      }

      if (!adminAuthor.name || !adminAuthor.image) {
        const adminUser = await (db.user as any).findFirst({
          where: { role: "admin" },
          orderBy: { createdAt: "asc" },
          select: { name: true, image: true, role: true },
        });
        if (adminUser) {
          if (!adminAuthor.name && adminUser.name) adminAuthor.name = adminUser.name;
          if (!adminAuthor.image && adminUser.image) adminAuthor.image = adminUser.image;
          if (!adminAuthor.role && adminUser.role) adminAuthor.role = adminUser.role;
        }
      }
    } catch (err) {
      console.warn("Could not query admin profile for articles API:", err);
    }

    try {
      const dbArticles = await db.article.findMany({
        where: {
          published: true,
          ...(category && category !== "All" ? { category } : {}),
        },
        orderBy: { publishedAt: "desc" },
      });

      if (dbArticles && dbArticles.length > 0) {
        articles = dbArticles.map((a) => ({
          id: a.id,
          slug: a.slug,
          title: a.title,
          excerpt: a.excerpt,
          content: a.content,
          coverImage: a.coverImage,
          category: a.category,
          tags: a.tags,
          authorName: adminAuthor.name || a.authorName,
          authorRole: adminAuthor.role || a.authorRole,
          authorAvatar: adminAuthor.image || (a.authorAvatar && !a.authorAvatar.includes("Profile.jfif") ? a.authorAvatar : ""),
          readTime: a.readTime,
          featured: a.featured,
          published: a.published,
          publishedAt: a.publishedAt.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
          seoTitle: a.seoTitle || undefined,
          seoDescription: a.seoDescription || undefined,
        }));
      } else {
        // Fallback to defaults if DB is empty
        articles = DEFAULT_ARTICLES.map((a) => ({
          ...a,
          authorName: adminAuthor.name || a.authorName,
          authorAvatar: adminAuthor.image || a.authorAvatar,
          authorRole: adminAuthor.role || a.authorRole,
        }));
        if (category && category !== "All") {
          articles = articles.filter((a) => a.category.toLowerCase() === category.toLowerCase());
        }
      }
    } catch (dbErr) {
      console.warn("DB articles query error, using default articles fallback:", dbErr);
      articles = DEFAULT_ARTICLES;
      if (category && category !== "All") {
        articles = articles.filter((a) => a.category.toLowerCase() === category.toLowerCase());
      }
    }

    // Apply search filter if provided
    if (search) {
      articles = articles.filter(
        (a) =>
          a.title.toLowerCase().includes(search) ||
          a.excerpt.toLowerCase().includes(search) ||
          a.tags.some((t) => t.toLowerCase().includes(search))
      );
    }

    return NextResponse.json({ success: true, articles });
  } catch (error: any) {
    console.error("GET ARTICLES ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch articles." },
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

    if (!title || !slug || !content || !category) {
      return NextResponse.json(
        { success: false, error: "Title, slug, content, and category are required." },
        { status: 400 }
      );
    }

    const article = await db.article.create({
      data: {
        title,
        slug: slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, "-"),
        excerpt: excerpt || title,
        content,
        coverImage: coverImage || "/images/amazon-ppc-sponsored.jpg",
        category,
        tags: Array.isArray(tags) ? tags : typeof tags === "string" ? tags.split(",").map((s) => s.trim()) : [],
        authorName: authorName || "Alphadigify Strategy Team",
        authorRole: authorRole || "E-Commerce Growth Specialist",
        authorAvatar: authorAvatar || "",
        readTime: readTime || "5 mins",
        featured: Boolean(featured),
        published: published !== undefined ? Boolean(published) : true,
        seoTitle: seoTitle || title,
        seoDescription: seoDescription || excerpt,
      },
    });

    return NextResponse.json({ success: true, article });
  } catch (error: any) {
    console.error("CREATE ARTICLE ERROR:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create article." },
      { status: 500 }
    );
  }
}
