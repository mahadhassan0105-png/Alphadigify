/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Clock,
  ArrowLeft,
  Search,
  Share2,
  Check,
  ArrowRight,
  User,
} from "lucide-react";
import { ArticleItem } from "@/data/defaultArticles";

interface ArticleSlugClientProps {
  article: ArticleItem;
  relatedArticles: ArticleItem[];
}

export default function ArticleSlugClient({ article, relatedArticles }: ArticleSlugClientProps) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [sidebarSearch, setSidebarSearch] = useState("");

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSidebarSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (sidebarSearch.trim()) {
      router.push(`/articles?search=${encodeURIComponent(sidebarSearch.trim())}`);
    }
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : `https://www.alphadigify.com/articles/${article.slug}`;
  const shareTitle = article.title;

  return (
    <div className="w-full bg-[#FAFAFA] dark:bg-[#0B0C10] text-slate-900 dark:text-white min-h-screen transition-colors duration-500 font-sans selection:bg-yellow-500/30">
      
      {/* ═══════════════════════════════════════
          ARTICLE HEADER & CONTENT WRAPPER
      ═══════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 lg:pt-40">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* ═══════════════════════════════════════
              LEFT COLUMN: MAIN ARTICLE (8 COLS)
          ═══════════════════════════════════════ */}
          <div className="lg:col-span-8">
            
            {/* Breadcrumb: Articles > Category */}
            <nav className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mb-6">
              <Link href="/articles" className="hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors">
                Articles
              </Link>
              <span>&gt;</span>
              <Link
                href={`/articles?category=${encodeURIComponent(article.category)}`}
                className="text-slate-800 dark:text-slate-200 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors"
              >
                {article.category}
              </Link>
            </nav>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-[1.15] tracking-tight mb-8">
              {article.title}
            </h1>

            {/* Author Row & Social Share Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 mb-8 border-b border-slate-200 dark:border-slate-800">
              
              {/* Author Info */}
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full overflow-hidden relative bg-slate-100 dark:bg-zinc-800 shrink-0 border-2 border-yellow-400/40 shadow-sm flex items-center justify-center">
                  {article.authorAvatar && !article.authorAvatar.includes("Profile.jfif") ? (
                    <img
                      src={article.authorAvatar}
                      alt={article.authorName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-yellow-600 dark:text-yellow-400 font-bold text-base">
                      {article.authorName ? article.authorName.charAt(0).toUpperCase() : <User className="w-5 h-5" />}
                    </span>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {article.authorName}
                    </span>
                    {article.authorRole && (
                      <span className="text-xs text-yellow-600 dark:text-yellow-400 font-semibold">
                        , {article.authorRole}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                    <span>{article.publishedAt}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Read Time: {article.readTime}
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Share Icons */}
              <div className="flex items-center gap-2">
                {/* Facebook */}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-sm"
                  title="Share on Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-[#0077B5] text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-sm"
                  title="Share on LinkedIn"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>

                {/* Twitter / X */}
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-black dark:bg-slate-800 text-white border border-slate-700 flex items-center justify-center hover:bg-slate-900 transition-colors shadow-sm"
                  title="Share on X"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>

                {/* Copy Link */}
                <button
                  onClick={handleCopyLink}
                  className="w-9 h-9 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-center hover:bg-yellow-400 hover:text-slate-900 transition-colors shadow-sm"
                  title="Copy Article Link"
                >
                  {copied ? <Check className="w-4 h-4 text-green-600" /> : <Share2 className="w-4 h-4" />}
                </button>
              </div>

            </div>

            {/* Featured Hero Image */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden mb-10 shadow-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
              <Image
                src={article.coverImage}
                alt={article.title}
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 800px"
              />
            </div>

            {/* Excerpt Lead Box */}
            <div className="p-6 rounded-2xl bg-yellow-50/70 dark:bg-yellow-500/5 border-l-4 border-yellow-400 dark:border-yellow-500 text-slate-800 dark:text-slate-200 text-base sm:text-lg font-medium leading-relaxed mb-10 shadow-sm">
              <p>{article.excerpt}</p>
            </div>

            {/* Formatted Article Body */}
            <div className="article-body text-slate-800 dark:text-slate-200 text-base sm:text-lg leading-relaxed space-y-6">
              {article.content.split("\n\n").map((block, idx) => {
                const trimmed = block.trim();
                if (!trimmed) return null;

                // Handle H3 Heading
                if (trimmed.startsWith("### ")) {
                  return (
                    <h3 key={idx} className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white pt-6 pb-2 border-b border-slate-200 dark:border-slate-800">
                      {trimmed.replace("### ", "")}
                    </h3>
                  );
                }

                // Handle H2 Heading
                if (trimmed.startsWith("## ")) {
                  return (
                    <h2 key={idx} className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white pt-8 pb-3">
                      {trimmed.replace("## ", "")}
                    </h2>
                  );
                }

                // Handle Divider
                if (trimmed === "---") {
                  return <hr key={idx} className="my-8 border-slate-200 dark:border-slate-800" />;
                }

                // Handle Blockquote
                if (trimmed.startsWith("> ")) {
                  return (
                    <blockquote key={idx} className="p-5 my-6 bg-slate-100 dark:bg-slate-900/60 rounded-xl border-l-4 border-yellow-400 italic text-slate-700 dark:text-slate-300">
                      {trimmed.replace("> ", "")}
                    </blockquote>
                  );
                }

                // Handle Bullet Points
                if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
                  const items = trimmed.split("\n").filter(Boolean);
                  return (
                    <ul key={idx} className="list-disc pl-6 space-y-2 my-4">
                      {items.map((it, itemIdx) => (
                        <li key={itemIdx} className="text-slate-700 dark:text-slate-300">
                          {it.replace(/^(\*|-)\s+/, "")}
                        </li>
                      ))}
                    </ul>
                  );
                }

                // Standard Paragraph
                return (
                  <p key={idx} className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {trimmed}
                  </p>
                );
              })}
            </div>

            {/* Post-Article Author Bio Box */}
            <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#11131C] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="w-16 h-16 rounded-full overflow-hidden relative bg-slate-100 dark:bg-zinc-800 shrink-0 border-2 border-yellow-400 shadow-md flex items-center justify-center">
                {article.authorAvatar && !article.authorAvatar.includes("Profile.jfif") ? (
                  <img
                    src={article.authorAvatar}
                    alt={article.authorName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-yellow-600 dark:text-yellow-400 font-black text-2xl">
                    {article.authorName ? article.authorName.charAt(0).toUpperCase() : <User className="w-8 h-8" />}
                  </span>
                )}
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-yellow-500">
                  Written by
                </span>
                <h4 className="text-lg font-black text-slate-900 dark:text-white">
                  {article.authorName}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                  {article.authorRole} at Alphadigify
                </p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Specializing in Amazon PPC optimization, review ecosystems, and scaling high-ticket e-commerce brands with data-backed conversion frameworks.
                </p>
              </div>
            </div>

            {/* Back to all articles button */}
            <div className="mt-10">
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to all articles
              </Link>
            </div>

          </div>

          {/* ═══════════════════════════════════════
              RIGHT COLUMN: SIDEBAR (4 COLS)
          ═══════════════════════════════════════ */}
          <div className="lg:col-span-4 space-y-7">
            
            {/* Filed under */}
            <div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-2">
                Filed under:
              </span>
              <Link
                href={`/articles?category=${encodeURIComponent(article.category)}`}
                className="inline-block bg-[#EDF2F7] dark:bg-slate-800/80 hover:bg-yellow-400 hover:text-slate-950 dark:hover:bg-yellow-400 dark:hover:text-slate-950 text-[#2B6CB0] dark:text-sky-300 font-medium text-xs sm:text-sm px-3.5 py-1.5 rounded-md transition-colors border border-slate-200/60 dark:border-slate-700/60"
              >
                {article.category}
              </Link>
            </div>

            {/* Tags Pills */}
            <div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-2">
                Tags:
              </span>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/articles?search=${encodeURIComponent(tag)}`}
                    className="bg-[#FBF7EE] dark:bg-yellow-500/10 hover:bg-yellow-400 hover:text-slate-950 dark:hover:bg-yellow-400 dark:hover:text-slate-950 text-slate-800 dark:text-yellow-200 text-xs font-normal px-3 py-1.5 rounded-md border border-[#F3E8CE] dark:border-yellow-500/20 transition-all"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Search Box in Sidebar */}
            <div className="pt-1">
              <form onSubmit={handleSidebarSearch} className="flex items-center">
                <input
                  type="text"
                  placeholder="Search for articles..."
                  value={sidebarSearch}
                  onChange={(e) => setSidebarSearch(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-l-md px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-yellow-400 shadow-sm"
                />
                <button
                  type="submit"
                  className="bg-yellow-400 hover:bg-yellow-500 text-slate-950 px-3.5 py-2.5 rounded-r-md border border-yellow-400 font-bold flex items-center justify-center transition-colors shrink-0 shadow-sm"
                  aria-label="Search articles"
                  title="Search"
                >
                  <Search className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Related Articles Box */}
            <div className="pt-2">
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                Related Articles:
              </h4>
              <div className="space-y-4">
                {relatedArticles.slice(0, 4).map((rel) => (
                  <Link
                    key={rel.id || rel.slug}
                    href={`/articles/${rel.slug}`}
                    className="block group"
                  >
                    <h5 className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors leading-snug">
                      {rel.title}
                    </h5>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 block">
                      {rel.readTime} • {rel.publishedAt}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA Box for Free Audit */}
            <div className="rounded-2xl p-6 border border-slate-800 bg-gradient-to-br from-[#0C0E14] via-[#161822] to-[#0C0E14] text-white shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="text-lg font-black text-white leading-tight mb-2">
                  Ready to Accelerate Your Brand Growth?
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-5">
                  Get a free in-depth audit of your advertising campaigns, review profiles, or account health from our specialists.
                </p>
                <Link href="/contact" className="block">
                  <button className="w-full py-3 px-4 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md">
                    Claim Free Audit <ArrowRight className="inline-block ml-1 w-3.5 h-3.5" />
                  </button>
                </Link>
              </div>
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl pointer-events-none" />
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
