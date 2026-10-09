import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/public/Footer";
import ArticlesIndexClient from "@/components/public/ArticlesIndexClient";
import { DEFAULT_ARTICLES, ArticleItem } from "@/data/defaultArticles";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "Articles & E-Commerce Insights | Alphadigify",
  description: "Explore battle-tested playbooks, Amazon PPC metrics, reviews management strategies, and digital marketing insights from the Alphadigify team.",
  openGraph: {
    title: "Articles & E-Commerce Insights | Alphadigify",
    description: "Explore battle-tested playbooks, Amazon PPC metrics, reviews management strategies, and digital marketing insights.",
    url: "https://www.alphadigify.com/articles",
    siteName: "Alphadigify",
    type: "website",
  },
};

export const dynamic = "force-dynamic";

async function getArticles(): Promise<ArticleItem[]> {
  const adminAuthor = {
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
    console.warn("Could not query admin profile for articles page:", err);
  }

  try {
    const dbArticles = await db.article.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
    });

    if (dbArticles && dbArticles.length > 0) {
      return dbArticles.map((a) => ({
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
    }
  } catch (err) {
    console.warn("DB articles query error in page, using default articles fallback:", err);
  }

  return DEFAULT_ARTICLES.map((a) => ({
    ...a,
    authorName: adminAuthor.name || a.authorName,
    authorAvatar: adminAuthor.image || a.authorAvatar,
    authorRole: adminAuthor.role || a.authorRole,
  }));
}

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <main className="min-h-screen bg-white dark:bg-[#0B0C10] flex flex-col">
      <Navbar />
      <ArticlesIndexClient initialArticles={articles} />
      <Footer />
    </main>
  );
}
