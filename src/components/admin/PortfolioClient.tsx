/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Play, Image as ImageIcon, Trash2, ExternalLink, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddPortfolioModal from "./AddPortfolioModal";

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  type: string;
  url: string;
  images: string[];
  createdAt: Date | string;
}

interface PortfolioClientProps {
  initialItems: PortfolioItem[];
}

export default function PortfolioClient({ initialItems }: PortfolioClientProps) {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("All");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  // Track active slide index for each portfolio item ID
  const [activeIndices, setActiveIndices] = useState<Record<string, number>>({});

  const categories = [
    "All",
    "Amazon",
    "TikTok Shop",
    "Social Media",
    "Web SEO",
    "Google Ads",
    "Web Development",
    "Graphics Designing",
    "Video Ads",
    "Account Reinstatement",
    "AI Solutions"
  ];

  const filteredItems = activeCategory === "All"
    ? initialItems
    : initialItems.filter(item => item.category === activeCategory);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this portfolio item?")) return;

    setDeletingId(id);
    setError("");

    try {
      const res = await fetch(`/api/portfolio/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to delete item");
      }

      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to delete the portfolio item.");
    } finally {
      setDeletingId(null);
    }
  };

  const handlePrevSlide = (e: React.MouseEvent, itemId: string, maxSlides: number) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveIndices((prev) => {
      const current = prev[itemId] || 0;
      const nextIdx = current === 0 ? maxSlides - 1 : current - 1;
      return { ...prev, [itemId]: nextIdx };
    });
  };

  const handleNextSlide = (e: React.MouseEvent, itemId: string, maxSlides: number) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveIndices((prev) => {
      const current = prev[itemId] || 0;
      const nextIdx = current === maxSlides - 1 ? 0 : current + 1;
      return { ...prev, [itemId]: nextIdx };
    });
  };

  // Stats calculation
  const totalItems = initialItems.length;
  const imageCount = initialItems.filter(item => item.type === "image").length;
  const videoCount = initialItems.filter(item => item.type === "video").length;

  return (
    <div className="space-y-6">
      {/* Header & Metrics */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white dark:bg-[#111111] p-6 rounded-xl border border-slate-200 dark:border-white/[0.06] shadow-sm gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-1">Portfolio Manager</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Upload, categorize, and organize creative assets shown in the public showcase gallery.</p>
        </div>
        <AddPortfolioModal onSuccess={() => router.refresh()} />
      </div>

      {error && (
        <div className="text-red-400 text-sm bg-red-400/10 p-3 rounded border border-red-400/20 max-w-xl">
          {error}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/[0.06] p-5 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Total Assets</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{totalItems}</h3>
          </div>
          <div className="p-3 rounded-lg bg-yellow-400/10 text-yellow-600 dark:text-yellow-400">
            <ExternalLink className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/[0.06] p-5 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Images</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{imageCount}</h3>
          </div>
          <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <ImageIcon className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/[0.06] p-5 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Videos</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{videoCount}</h3>
          </div>
          <div className="p-3 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <Play className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Navigation & Grid */}
      <div className="space-y-4">
        <div className="flex overflow-x-auto flex-nowrap items-center gap-2 border-b border-slate-200 dark:border-white/[0.06] pb-4 scrollbar-none">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeCategory === category
                  ? "bg-slate-100 dark:bg-zinc-900 text-yellow-600 dark:text-yellow-400 shadow-sm border border-slate-200 dark:border-zinc-800"
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-900/40 hover:text-slate-900 dark:hover:text-slate-200 border border-transparent"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredItems.length === 0 ? (
          <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/[0.06] rounded-xl p-12 text-center text-slate-500">
            <ImageIcon className="w-12 h-12 mx-auto mb-4 text-slate-300 dark:text-slate-700" />
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-300">No creative items found</h3>
            <p className="text-slate-500 text-sm mt-1">Try changing your category filters or add a new creative asset.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => {
              const slides = item.images && item.images.length > 0 ? item.images : [item.url];
              const currentIndex = activeIndices[item.id] || 0;
              const currentImageUrl = slides[currentIndex];
              const isMultiImage = slides.length > 1;

              return (
                <div 
                  key={item.id} 
                  className="group relative bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/[0.06] rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col h-full"
                >
                  {/* Media Preview Container */}
                  <div className="relative aspect-video w-full bg-slate-100 dark:bg-black overflow-hidden shrink-0">
                    <img
                      src={currentImageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop";
                      }}
                    />
                    
                    {/* Badge */}
                    <span className={`absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border z-10 ${
                      item.type === "video" 
                        ? "bg-blue-500/10 text-blue-400 border-blue-500/20" 
                        : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    }`}>
                      {item.type}
                    </span>

                    {/* Multi-image Badge */}
                    {isMultiImage && (
                      <span className="absolute top-3 right-3 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border bg-yellow-400/10 text-yellow-400 border-yellow-400/25 z-10">
                        {slides.length} Photos
                      </span>
                    )}
                    
                    {/* Slider Navigation arrows for Admin Preview */}
                    {isMultiImage && (
                      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                        <button
                          type="button"
                          onClick={(e) => handlePrevSlide(e, item.id, slides.length)}
                          className="w-6 h-6 bg-slate-950/80 hover:bg-slate-900 rounded-full flex items-center justify-center text-white border border-slate-800 transition-colors"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleNextSlide(e, item.id, slides.length)}
                          className="w-6 h-6 bg-slate-950/80 hover:bg-slate-900 rounded-full flex items-center justify-center text-white border border-slate-800 transition-colors"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    {/* Slide Dots Indicator */}
                    {isMultiImage && (
                      <div className="absolute bottom-2.5 inset-x-0 flex justify-center space-x-1 z-10">
                        {slides.map((_, i) => (
                          <div 
                            key={i} 
                            className={`h-1.5 rounded-full transition-all ${
                              i === currentIndex ? "w-3 bg-yellow-400" : "w-1.5 bg-white/40"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                    
                    {/* Type overlay icon (video play) */}
                    {item.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/35 z-0">
                        <div className="w-10 h-10 bg-slate-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-slate-700">
                          <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Info & Action area */}
                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <div className="mb-4">
                      <span className="text-[10px] text-yellow-600 dark:text-yellow-400 font-semibold uppercase tracking-wider block mb-1">
                        {item.category}
                      </span>
                      <h4 className="text-slate-800 dark:text-slate-100 font-semibold text-sm line-clamp-2 leading-snug">
                        {item.title}
                      </h4>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-200 dark:border-white/[0.06] pt-3 mt-auto">
                      <a 
                        href={currentImageUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center transition-colors"
                      >
                        View Source <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                      
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        disabled={deletingId === item.id}
                        onClick={() => handleDelete(item.id)}
                        className="h-8 w-8 text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        {deletingId === item.id ? (
                          <Loader2 className="w-4 h-4 animate-spin text-red-400" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
