/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform, animate } from "framer-motion";
import { Play, Maximize2, ImageIcon, ChevronLeft, ChevronRight, X, Film, ArrowRight, TrendingUp, Filter, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";


interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  type: string;
  url: string;
  images: string[];
}

/* ─── Animated Counter ─── */
function Counter({ from, to, prefix = "", suffix = "" }: { from: number; to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !inView.current) {
        inView.current = true;
        const c = animate(from, to, {
          duration: 2.5, ease: "easeOut",
          onUpdate(v) { if (ref.current) ref.current.textContent = `${prefix}${Math.round(v)}${suffix}`; },
        });
        return () => c.stop();
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [from, to, prefix, suffix]);
  return <span ref={ref}>{prefix}{from}{suffix}</span>;
}

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [tempSearch, setTempSearch] = useState("");
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [hoverIndices, setHoverIndices] = useState<Record<string, number>>({});
  const [lightboxProject, setLightboxProject] = useState<PortfolioItem | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const res = await fetch("/api/portfolio");
        if (!res.ok) throw new Error("Failed to fetch creative showcase items.");
        const data = await res.json();
        if (data.success && Array.isArray(data.portfolio)) {
          setPortfolioItems(data.portfolio);
        } else {
          throw new Error(data.error || "Failed to load showcase.");
        }
      } catch (err: any) {
        setError(err.message || "An error occurred while loading creative showcase.");
      } finally {
        setLoading(false);
      }
    }
    fetchPortfolio();
  }, []);

  const allCategories = useMemo(() => {
    const itemCats = Array.from(
      new Set(
        portfolioItems
          .map((p) => (typeof p.category === "string" ? p.category.trim() : ""))
          .filter((cat): cat is string => Boolean(cat))
      )
    ).sort();
    return ["All", ...itemCats];
  }, [portfolioItems]);

  const filteredItems = useMemo(() => {
    return portfolioItems.filter((item) => {
      const matchesCategory =
        activeCategory === "All" ||
        item.category.toLowerCase() === activeCategory.toLowerCase();

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        (item.type && item.type.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [portfolioItems, activeCategory, searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(tempSearch);
  };

  const handlePrevSlide = (e: React.MouseEvent, item: PortfolioItem) => {
    e.stopPropagation();
    const slides = item.images && item.images.length > 0 ? item.images : [item.url];
    setHoverIndices(prev => {
      const current = prev[item.id] || 0;
      return { ...prev, [item.id]: current === 0 ? slides.length - 1 : current - 1 };
    });
  };

  const handleNextSlide = (e: React.MouseEvent, item: PortfolioItem) => {
    e.stopPropagation();
    const slides = item.images && item.images.length > 0 ? item.images : [item.url];
    setHoverIndices(prev => {
      const current = prev[item.id] || 0;
      return { ...prev, [item.id]: current === slides.length - 1 ? 0 : current + 1 };
    });
  };

  const openLightbox = (item: PortfolioItem, startIdx: number) => {
    setLightboxProject(item);
    setLightboxIndex(startIdx);
  };

  const closeLightbox = () => setLightboxProject(null);

  const handleLightboxPrev = () => {
    if (!lightboxProject) return;
    const slides = lightboxProject.images?.length ? lightboxProject.images : [lightboxProject.url];
    setLightboxIndex(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleLightboxNext = () => {
    if (!lightboxProject) return;
    const slides = lightboxProject.images?.length ? lightboxProject.images : [lightboxProject.url];
    setLightboxIndex(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full bg-white dark:bg-[#0B0C10] text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-500 selection:bg-yellow-500/30 font-sans flex flex-col" ref={containerRef}>
      
      {/* ═══════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════ */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden border-b border-slate-200 dark:border-slate-800">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-[size:40px_40px] opacity-[0.03] dark:opacity-[0.05]" />
        <div className="absolute top-[10%] left-[20%] w-[400px] h-[400px] bg-yellow-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ y: yParallax, opacity: opacityFade }}
          >
            <div className="inline-flex items-center gap-2 bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20 text-yellow-700 dark:text-yellow-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-8">
              <TrendingUp className="w-3.5 h-3.5" /> Proven Results
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[1.05] mb-8 text-slate-900 dark:text-white uppercase">
              We Build <br className="hidden md:block" />
              <span className="text-yellow-500">Digital Dominance.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-16">
              A curated gallery of high-converting funnels, elite web engineering, 
              and aggressive brand identities designed to seize market share.
            </p>

            {/* Hero Stats */}
            <div className="grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { label: "Assets Delivered", value: 850, suffix: "+" },
                { label: "Client ROI Avg", value: 320, suffix: "%" },
                { label: "Brands Scaled", value: 200, suffix: "+" },
                { label: "Global Reach", value: 100, suffix: "M+" }
              ].map((stat, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm">
                  <div className="text-3xl font-black text-slate-900 dark:text-white mb-1">
                    <Counter from={0} to={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
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
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="appearance-none bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm font-medium rounded-xl px-4 py-2.5 pr-10 focus:outline-none focus:border-yellow-400 cursor-pointer shadow-sm"
              >
                {allCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "All" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500 dark:text-slate-400">
                <ChevronRight className="w-4 h-4 rotate-90" />
              </div>
            </div>
          </div>

          {/* Search Input Bar */}
          <form onSubmit={handleSearchSubmit} className="flex items-center w-full md:w-80 lg:w-96">
            <input
              type="text"
              placeholder="Search portfolio..."
              value={tempSearch}
              onChange={(e) => setTempSearch(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-l-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-yellow-400"
            />
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-slate-950 px-4 py-2.5 rounded-r-xl border border-yellow-400 font-bold flex items-center justify-center transition-colors shrink-0"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

        </div>
      </section>

      {/* ═══════════════════════════════════════
          FILTER & GRID SECTION
      ═══════════════════════════════════════ */}
      <section className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        
        {/* Active filter indication */}
        {(activeCategory !== "All" || searchQuery) && (
          <div className="mb-8 flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 flex-wrap">
            <span>Showing results for:</span>
            {activeCategory !== "All" && (
              <span className="font-bold text-yellow-600 dark:text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-400/20">
                {activeCategory}
              </span>
            )}
            {searchQuery && (
              <span className="font-bold text-slate-900 dark:text-white bg-slate-200 dark:bg-slate-800 px-3 py-1 rounded-full">
                "{searchQuery}"
              </span>
            )}
            <button
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
                setTempSearch("");
              }}
              className="text-xs font-bold text-red-500 hover:underline ml-2"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* The Showcase Grid */}
        {loading ? (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-[2rem] overflow-hidden break-inside-avoid shadow-sm h-72 animate-pulse relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-white/5 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center p-12 bg-white dark:bg-slate-900 rounded-[2rem] border border-red-200 dark:border-red-900/30 max-w-xl mx-auto">
            <p className="text-red-500 font-bold mb-2 text-xl">System Error</p>
            <p className="text-slate-500 dark:text-slate-400">{error}</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900/40 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 max-w-2xl mx-auto my-8">
            <Search className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">No projects found</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto text-sm mb-6">
              We couldn't find any portfolio projects matching your search criteria. Try a different keyword or category.
            </p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
                setTempSearch("");
              }}
              className="px-6 py-2.5 rounded-full bg-yellow-400 text-slate-950 font-bold text-sm hover:bg-yellow-500 transition-all shadow-md"
            >
              Reset Search
            </button>
          </div>
        ) : (
          <motion.div layout className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            <AnimatePresence mode="popLayout">
              {filteredItems.map(item => {
                const slides = item.images?.length ? item.images : [item.url];
                const activeIndex = hoverIndices[item.id] || 0;
                const currentUrl = slides[activeIndex];
                const isSlider = slides.length > 1;

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => openLightbox(item, activeIndex)}
                    className="group relative bg-slate-100 dark:bg-slate-900 rounded-[2rem] overflow-hidden break-inside-avoid cursor-pointer border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:border-yellow-400/50 transition-all duration-500"
                  >
                    <div className="relative w-full h-auto overflow-hidden bg-slate-200 dark:bg-slate-800">
                      <div 
                        className="flex w-full transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]" 
                        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                      >
                        {slides.map((slideUrl: string, idx: number) => (
                          <div key={idx} className="w-full flex-shrink-0 relative">
                            <img 
                              src={slideUrl} 
                              alt={`${item.title} - Slide ${idx + 1}`} 
                              className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                              onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop"; }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Multi-slide Navigation Controls */}
                    {isSlider && (
                      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                        <button
                          onClick={e => handlePrevSlide(e, item)}
                          className="w-10 h-10 bg-white/90 dark:bg-black/80 hover:bg-yellow-400 hover:text-black rounded-full flex items-center justify-center text-slate-900 dark:text-white backdrop-blur-md transition-colors shadow-lg"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={e => handleNextSlide(e, item)}
                          className="w-10 h-10 bg-white/90 dark:bg-black/80 hover:bg-yellow-400 hover:text-black rounded-full flex items-center justify-center text-slate-900 dark:text-white backdrop-blur-md transition-colors shadow-lg"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    )}

                    {isSlider && (
                      <div className="absolute bottom-24 inset-x-0 flex justify-center space-x-1.5 z-20">
                        {slides.map((_, i) => (
                          <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? "w-5 bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]" : "w-1.5 bg-white/50 backdrop-blur-sm"}`} />
                        ))}
                      </div>
                    )}

                    {/* Premium Glassmorphic Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 z-10">
                      <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="bg-yellow-400 text-slate-900 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
                            {item.category}
                          </span>
                          {isSlider && (
                            <span className="bg-white/20 backdrop-blur-md text-white border border-white/30 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center">
                              <Film className="w-3 h-3 mr-1" /> {slides.length}
                            </span>
                          )}
                        </div>
                        <h3 className="text-white text-2xl font-black leading-tight flex justify-between items-end">
                          {item.title}
                          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20">
                            {item.type === 'video' ? <Play className="w-4 h-4 ml-0.5 text-white" fill="currentColor" /> : <Maximize2 className="w-4 h-4 text-white" />}
                          </div>
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* ═══════════════════════════════════════
          FINAL CTA SECTION
      ═══════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden bg-yellow-400 mt-12">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-[size:40px_40px] opacity-10" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-slate-900 uppercase tracking-tight leading-tight">
            Ready to be our<br />next success story?
          </h2>
          <p className="text-xl text-slate-800 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
            Stop admiring your competitors' assets. Let our engineering and creative team build you an unfair advantage.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-slate-900 hover:bg-black text-white h-16 px-10 text-lg rounded-full shadow-2xl font-bold transition-all hover:scale-105">
              Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          LIGHTBOX MODAL
      ═══════════════════════════════════════ */}
      <AnimatePresence>
        {lightboxProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[100] flex flex-col items-center justify-center backdrop-blur-xl overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 p-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent z-[110]">
              <div>
                <span className="bg-yellow-400 text-slate-900 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full mb-3 inline-block">
                  {lightboxProject.category}
                </span>
                <h2 className="text-white text-2xl md:text-3xl font-black tracking-tight">{lightboxProject.title}</h2>
              </div>
              <button 
                onClick={closeLightbox}
                className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors border border-white/20"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="relative w-full max-w-6xl px-4 flex items-center justify-center h-full max-h-[85vh]">
              {((lightboxProject.images && lightboxProject.images.length > 1) || lightboxProject.url) && (
                <>
                  <button onClick={handleLightboxPrev} className="absolute left-4 md:left-0 w-14 h-14 bg-white/10 hover:bg-yellow-400 hover:text-black hover:border-transparent text-white backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 transition-all z-[110] shadow-2xl">
                    <ChevronLeft className="w-8 h-8" />
                  </button>
                  <button onClick={handleLightboxNext} className="absolute right-4 md:right-0 w-14 h-14 bg-white/10 hover:bg-yellow-400 hover:text-black hover:border-transparent text-white backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 transition-all z-[110] shadow-2xl">
                    <ChevronRight className="w-8 h-8" />
                  </button>
                </>
              )}

              <div className="w-full h-full flex items-center justify-center px-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={lightboxIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="relative max-h-[80vh] w-auto"
                  >
                    {lightboxProject.type === "video" && lightboxIndex === 0 ? (
                      <video
                        src={lightboxProject.images?.length ? lightboxProject.images[0] : lightboxProject.url}
                        controls autoPlay
                        className="rounded-xl max-h-[80vh] w-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-800 object-contain"
                      />
                    ) : (
                      <img
                        src={lightboxProject.images?.length ? lightboxProject.images[lightboxIndex] : lightboxProject.url}
                        alt={lightboxProject.title}
                        className="rounded-xl max-h-[80vh] w-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-800 object-contain"
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {lightboxProject.images && lightboxProject.images.length > 1 && (
              <div className="absolute bottom-8 inset-x-0 flex justify-center space-x-2 z-[110]">
                {lightboxProject.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setLightboxIndex(i)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      i === lightboxIndex ? "w-8 bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]" : "w-2.5 bg-white/30 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
