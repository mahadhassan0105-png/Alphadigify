import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import ArticleForm from "@/components/admin/ArticleForm";
import { Newspaper } from "lucide-react";
import { DEFAULT_ARTICLES } from "@/data/defaultArticles";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Edit Article | Admin Dashboard",
};

interface EditArticlePageProps {
  params: { id: string };
}

export default async function EditArticlePage({ params }: EditArticlePageProps) {
  let article: any = null;

  try {
    article = await db.article.findUnique({
      where: { id: params.id },
    });
  } catch (err) {
    console.warn("DB article findUnique error in edit page:", err);
  }

  // Fallback check in DEFAULT_ARTICLES if editing a default item
  if (!article) {
    const matched = DEFAULT_ARTICLES.find((a) => a.id === params.id || a.slug === params.id);
    if (matched) {
      article = matched;
    }
  }

  if (!article) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Newspaper className="w-6 h-6 text-yellow-500" />
          Edit Article
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Update content, SEO meta tags, and publication settings.
        </p>
      </div>

      <ArticleForm
        isEdit
        initialData={{
          id: article.id,
          title: article.title,
          slug: article.slug,
          excerpt: article.excerpt,
          content: article.content,
          coverImage: article.coverImage,
          category: article.category,
          tags: article.tags,
          authorName: article.authorName,
          authorRole: article.authorRole,
          authorAvatar: article.authorAvatar,
          readTime: article.readTime,
          published: article.published !== undefined ? article.published : true,
          featured: article.featured || false,
          seoTitle: article.seoTitle || "",
          seoDescription: article.seoDescription || "",
        }}
      />
    </div>
  );
}
