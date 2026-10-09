/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, Clock, Calendar, Filter, ChevronRight } from "lucide-react";
import { ArticleItem } from "@/data/defaultArticles";

interface ArticlesIndexClientProps {
  initialArticles: ArticleItem[];
}

export default function ArticlesIndexClient({ initialArticles }: ArticlesIndexClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [tempSearch, setTempSearch] = useState("");

  // Extract unique categories (only categories that actually exist in articles)
  const categories = useMemo(() => {
    const cats = Array.from(
      new Set(
        initialArticles
          .map((a) => a.category?.trim())
          .filter((cat): cat is string => Boolean(cat))
      )
    ).sort();
    return ["All", ...cats];
  }, [initialArticles]);

  // Filter articles based on category and search
  const filteredArticles = useMemo(() => {
    return initialArticles.filter((article) => {
      const matchesCategory =
        selectedCategory === "All" ||
        article.category.toLowerCase() === selectedCategory.toLowerCase();

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.tags.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [initialArticles, selectedCategory, searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(tempSearch);
  };

  return (
    <div className="w-full bg-[#FAFAFA] dark:bg-[#0B0C10] text-slate-900 dark:text-white min-h-screen transition-colors duration-500 font-sans selection:bg-yellow-500/30">
      
      {/* ═══════════════════════════════════════
          HEADER / HERO SECTION
      ═══════════════════════════════════════ */}
      <section className="relative pt-32 pb-12 sm:pt-40 sm:pb-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E1017]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-8">
            {/* Left: Titles & Subtitle */}
            <div className="max-w-3xl">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 block">
                Articles
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                Scale Your E-Commerce <br className="hidden sm:block" />
                <span className="text-yellow-500">&amp; Brand Revenue</span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                The Amazon, TikTok, and digital advertising landscape is constantly changing. Keep up with the latest data-backed strategies, updates, and playbooks to dominate your market.
              </p>
            </div>

            {/* Right: Discover Authors / Team Link */}
            <div className="shrink-0">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors group"
              >
                <span className="w-8 h-8 rounded-full bg-yellow-400/20 text-yellow-600 dark:text-yellow-400 flex items-center justify-center group-hover:bg-yellow-400 group-hover:text-slate-900 transition-all">
                  <ArrowRight className="w-4 h-4" />
                </span>
                <span>Discover the Strategists Behind Our Articles</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════
          TOOLBAR: CATEGORIES & SEARCH
      ═══════════════════════════════════════ */}
      <section className="sticky top-14 sm:top-16 lg:top-[72px] z-30 bg-white/95 dark:bg-[#0B0C10]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Category Dropdown */}
          <div className="flex items-center gap-3">
            <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 shrink-0">
              <Filter className="w-4 h-4 text-yellow-500" /> Browse by category:
            </span>
            
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm rounded-xl px-4 py-2 pr-8 font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-400 cursor-pointer shadow-sm"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "All" ? "Select Category" : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Box with Yellow Magnifying Glass Button */}
          <form onSubmit={handleSearchSubmit} className="flex items-center max-w-md w-full md:w-80">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search for articles..."
                value={tempSearch}
                onChange={(e) => {
                  setTempSearch(e.target.value);
                  if (e.target.value === "") setSearchQuery("");
                }}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-l-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-yellow-400 shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-slate-950 px-4 py-2.5 rounded-r-xl border border-yellow-400 font-bold flex items-center justify-center transition-colors shadow-sm shrink-0"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

        </div>
      </section>

      {/* ═══════════════════════════════════════
          ARTICLES GRID SECTION
      ═══════════════════════════════════════ */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Active filter indication */}
          {(selectedCategory !== "All" || searchQuery) && (
            <div className="mb-8 flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
              <span>Showing results for:</span>
              {selectedCategory !== "All" && (
                <span className="font-bold text-yellow-600 dark:text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-400/20">
                  {selectedCategory}
                </span>
              )}
              {searchQuery && (
                <span className="font-bold text-slate-900 dark:text-white bg-slate-200 dark:bg-slate-800 px-3 py-1 rounded-full">
                  "{searchQuery}"
                </span>
              )}
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                  setTempSearch("");
                }}
                className="text-xs font-bold text-red-500 hover:underline ml-2"
              >
                Clear all filters
              </button>
            </div>
          )}

          {filteredArticles.length === 0 ? (
            <div className="text-center py-24 bg-white dark:bg-slate-900/40 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
              <Search className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">No articles found</h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto text-sm">
                We couldn't find any articles matching your search criteria. Try a different keyword or category.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                  setTempSearch("");
                }}
                className="mt-6 px-6 py-2.5 rounded-full bg-yellow-400 text-slate-950 font-bold text-sm hover:bg-yellow-500 transition-all shadow-md"
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredArticles.map((article, i) => (
                  <motion.article
                    key={article.id || article.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="group bg-white dark:bg-[#11131C] rounded-2xl border border-slate-200 dark:border-slate-800/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1"
                  >
                    {/* Card Cover Image */}
                    <Link href={`/articles/${article.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <Image
                        src={article.coverImage}
                        alt={article.title}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {/* Category Badge on top of image */}
                      <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-md uppercase tracking-wider border border-white/10">
                        {article.category}
                      </div>
                    </Link>

                    {/* Card Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Meta: Date & Read Time */}
                        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-yellow-500" />
                            {article.publishedAt}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            {article.readTime}
                          </span>
                        </div>

                        {/* Title */}
                        <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors line-clamp-2 leading-snug mb-3">
                          <Link href={`/articles/${article.slug}`}>
                            {article.title}
                          </Link>
                        </h2>

                        {/* Excerpt */}
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                          {article.excerpt}
                        </p>
                      </div>

                      {/* Read More Footer */}
                      <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-end mt-auto">
                        <Link
                          href={`/articles/${article.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-black text-yellow-600 dark:text-yellow-400 group-hover:text-yellow-500 transition-colors"
                        >
                          Read Article <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>

                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          )}

        </div>
      </section>

      {/* ═══════════════════════════════════════
          BOTTOM CTA SECTION
      ═══════════════════════════════════════ */}
      <section className="py-16 sm:py-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E1017]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-black uppercase tracking-widest text-yellow-500 bg-yellow-500/10 px-3.5 py-1.5 rounded-full border border-yellow-500/20 mb-4 inline-block">
            Take Action Today
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            Need Expert Help Executing These Strategies?
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto">
            Book a complimentary strategy session. We'll audit your listings, ad spend, and review velocity to build a custom growth roadmap.
          </p>
          <Link href="/contact">
            <button className="px-8 py-4 rounded-full bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-black text-sm uppercase tracking-wider transition-all shadow-lg shadow-yellow-500/20 hover:scale-105">
              Request Your Free Brand Audit <ArrowRight className="inline-block ml-2 w-4 h-4" />
            </button>
          </Link>
        </div>
      </section>

    </div>
  );
}
