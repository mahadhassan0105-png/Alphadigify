import { Suspense } from "react";
import { db } from "@/lib/db";
import ArticlesClient from "@/components/admin/ArticlesClient";
import { DEFAULT_ARTICLES } from "@/data/defaultArticles";

export const dynamic = "force-dynamic";

async function ArticlesData() {
  try {
    const articles = await db.article.findMany({
      orderBy: { createdAt: "desc" },
    });

    if (articles && articles.length > 0) {
      const serialized = articles.map((a) => ({
        id: a.id,
        slug: a.slug,
        title: a.title,
        category: a.category,
        authorName: a.authorName,
        readTime: a.readTime,
        published: a.published,
        featured: a.featured,
        createdAt: a.createdAt.toISOString(),
      }));

      return <ArticlesClient initialItems={serialized} />;
    }
  } catch (err) {
    console.warn("DB articles query in admin, using default articles fallback:", err);
  }

  // Fallback to default articles
  const defaultSerialized = DEFAULT_ARTICLES.map((a) => ({
    id: a.id,
    slug: a.slug,
    title: a.title,
    category: a.category,
    authorName: a.authorName,
    readTime: a.readTime,
    published: a.published,
    featured: a.featured || false,
    createdAt: new Date().toISOString(),
  }));

  return <ArticlesClient initialItems={defaultSerialized} />;
}

export default function ArticlesAdminPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-slate-400 animate-pulse">
          Loading articles...
        </div>
      }
    >
      <ArticlesData />
    </Suspense>
  );
}
