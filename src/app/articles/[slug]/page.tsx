import { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/public/Footer";
import ArticleSlugClient from "@/components/public/ArticleSlugClient";
import { DEFAULT_ARTICLES, ArticleItem } from "@/data/defaultArticles";
import { db } from "@/lib/db";

interface PageProps {
  params: { slug: string };
}

export const dynamic = "force-dynamic";

async function getArticleBySlug(slug: string): Promise<{ article: ArticleItem | null; related: ArticleItem[] }> {
  let article: ArticleItem | null = null;
  let allArticles: ArticleItem[] = [];

  // Query admin name and image to use as the author
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
    console.warn("Could not query admin profile for article author:", err);
  }

  try {
    const dbArticle = await db.article.findUnique({
      where: { slug },
    });

    if (dbArticle) {
      article = {
        id: dbArticle.id,
        slug: dbArticle.slug,
        title: dbArticle.title,
        excerpt: dbArticle.excerpt,
        content: dbArticle.content,
        coverImage: dbArticle.coverImage,
        category: dbArticle.category,
        tags: dbArticle.tags,
        authorName: adminAuthor.name || dbArticle.authorName,
        authorRole: adminAuthor.role || dbArticle.authorRole,
        authorAvatar: adminAuthor.image || (dbArticle.authorAvatar && !dbArticle.authorAvatar.includes("Profile.jfif") ? dbArticle.authorAvatar : ""),
        readTime: dbArticle.readTime,
        featured: dbArticle.featured,
        published: dbArticle.published,
        publishedAt: dbArticle.publishedAt.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        seoTitle: dbArticle.seoTitle || undefined,
        seoDescription: dbArticle.seoDescription || undefined,
      };
    }

    const otherDbArticles = await db.article.findMany({
      where: { published: true, slug: { not: slug } },
      take: 4,
      orderBy: { publishedAt: "desc" },
    });

    if (otherDbArticles && otherDbArticles.length > 0) {
      allArticles = otherDbArticles.map((a) => ({
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
      }));
    }
  } catch (err) {
    console.warn("DB article query error in slug page, using default fallback:", err);
  }

  // Fallback to default articles if not in DB
  if (!article) {
    const matched = DEFAULT_ARTICLES.find((a) => a.slug === slug);
    if (matched) {
      article = {
        ...matched,
        authorName: adminAuthor.name || matched.authorName,
        authorAvatar: adminAuthor.image || matched.authorAvatar,
        authorRole: adminAuthor.role || matched.authorRole,
      };
    }
  }

  if (allArticles.length === 0) {
    allArticles = DEFAULT_ARTICLES.filter((a) => a.slug !== slug).map((a) => ({
      ...a,
      authorName: adminAuthor.name || a.authorName,
      authorAvatar: adminAuthor.image || a.authorAvatar,
      authorRole: adminAuthor.role || a.authorRole,
    }));
  }

  return { article, related: allArticles };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { article } = await getArticleBySlug(params.slug);

  if (!article) {
    return {
      title: "Article Not Found | Alphadigify",
      description: "The requested article could not be found.",
    };
  }

  const title = article.seoTitle || `${article.title} | Alphadigify`;
  const description = article.seoDescription || article.excerpt;
  const url = `https://www.alphadigify.com/articles/${article.slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "Alphadigify",
      type: "article",
      images: [
        {
          url: article.coverImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [article.coverImage],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function SingleArticlePage({ params }: PageProps) {
  const { article, related } = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  // Google JSON-LD Article Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: [article.coverImage],
    datePublished: article.publishedAt,
    author: {
      "@type": "Person",
      name: article.authorName,
      jobTitle: article.authorRole,
    },
    publisher: {
      "@type": "Organization",
      name: "Alphadigify",
      logo: {
        "@type": "ImageObject",
        url: "https://www.alphadigify.com/alphadigify-logo.jpg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.alphadigify.com/articles/${article.slug}`,
    },
  };

  return (
    <main className="min-h-screen bg-white dark:bg-[#0B0C10] flex flex-col">
      {/* Inject Google Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <ArticleSlugClient article={article} relatedArticles={related} />
      <Footer />
    </main>
  );
}
