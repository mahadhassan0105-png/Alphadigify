/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, animate } from "framer-motion";
import { ArrowUpRight, ArrowRight, BarChart3, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const categories = ["All", "E-Commerce", "B2B SaaS", "Local Business", "Healthcare"];

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

export default function CaseStudiesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [studies, setStudies] = useState<any[]>([]);
  const [featuredStudy, setFeaturedStudy] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    async function fetchCaseStudies() {
      try {
        const res = await fetch("/api/case-studies");
        const json = await res.json();
        if (json.success) {
          const allStudies = json.caseStudies || [];
          setStudies(allStudies);
          const featured = allStudies.find((s: any) => s.featured);
          setFeaturedStudy(featured || null);
        }
      } catch (error) {
        console.error("Error fetching case studies:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCaseStudies();
  }, []);

  const remainingStudies = studies.filter((s) => s.id !== featuredStudy?.id);
  const filteredStudies = activeCategory === "All" 
    ? remainingStudies 
    : remainingStudies.filter(study => study.category === activeCategory);

  return (
    <div className="w-full bg-white dark:bg-[#0B0C10] text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-500 font-sans selection:bg-yellow-500/30" ref={containerRef}>
      
      {/* ═══════════════════════════════════════
          HERO HEADER
      ═══════════════════════════════════════ */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden border-b border-slate-200 dark:border-slate-800">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-[size:40px_40px] opacity-[0.03] dark:opacity-[0.05]" />
        <div className="absolute top-[20%] right-[15%] w-[400px] h-[400px] bg-yellow-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[10%] left-[10%] w-[300px] h-[300px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ y: yParallax, opacity: opacityFade }}
          >
            <div className="inline-flex items-center gap-2 bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20 text-yellow-700 dark:text-yellow-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-8">
              <BarChart3 className="w-3.5 h-3.5" /> Data-Driven Scale
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[1.05] mb-8 text-slate-900 dark:text-white uppercase">
              Case Studies in <br className="hidden md:block" />
              <span className="text-yellow-500">Exponential Growth.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-16 font-medium">
              We don't sell vanity metrics. We engineer scalable systems that drive revenue, dominate search, and crush customer acquisition costs.
            </p>

            <div className="grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[
                { label: "Total Revenue Generated", value: 50, prefix: "$", suffix: "M+" },
                { label: "Avg Traffic Growth", value: 314, suffix: "%" },
                { label: "Client Retention", value: 96, suffix: "%" },
              ].map((stat, i) => (
                <div key={i} className="p-5 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm">
                  <div className="text-3xl lg:text-4xl font-black text-yellow-500 dark:text-yellow-400 mb-1">
                    <Counter from={0} to={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FEATURED CASE STUDY (THE BIG WIN)
      ═══════════════════════════════════════ */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        {loading ? (
          <div className="w-full h-[600px] bg-slate-100 dark:bg-slate-900/50 rounded-[3rem] animate-pulse border border-slate-200 dark:border-slate-800" />
        ) : featuredStudy ? (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="group relative rounded-[2rem] lg:rounded-[3rem] overflow-hidden bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col lg:flex-row hover:shadow-yellow-500/10 transition-all duration-500"
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-yellow-500/10 via-transparent to-transparent pointer-events-none" />

            {/* Content Side */}
            <div className="lg:w-[55%] p-8 sm:p-10 lg:p-12 xl:p-16 flex flex-col justify-center relative z-20">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-4 py-1.5 bg-yellow-400 text-black rounded-full text-[11px] font-black uppercase tracking-widest shadow-lg shadow-yellow-400/20">
                  Featured Case Study
                </span>
                <span className="text-slate-500 dark:text-slate-400 font-bold text-sm tracking-wide uppercase flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                  {featuredStudy.category}
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-5 text-slate-900 dark:text-white leading-[1.1] tracking-tight group-hover:text-yellow-500 transition-colors duration-500">
                {featuredStudy.title}
              </h2>
              
              <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed font-medium line-clamp-3">
                {featuredStudy.challenge}
              </p>

              {/* Polished Metrics */}
              <div className="flex flex-wrap gap-3 mb-10">
                {featuredStudy.metrics && Array.isArray(featuredStudy.metrics) && 
                  featuredStudy.metrics.slice(0, 3).map((metric: any, idx: number) => (
                    <div key={idx} className="flex-1 min-w-[110px] bg-slate-50 dark:bg-slate-900/80 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800 hover:border-yellow-400/50 transition-colors group/metric">
                      <Zap className="w-4 h-4 text-yellow-500 mb-1.5 opacity-50 group-hover/metric:opacity-100 transition-opacity" />
                      <p className="text-xl lg:text-2xl font-black text-slate-900 dark:text-white mb-0.5 group-hover/metric:text-yellow-400 transition-colors">{metric.value}</p>
                      <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{metric.label}</p>
                    </div>
                ))}
              </div>

              <Link href={`/case-studies/${featuredStudy.slug}`} className="w-fit">
                <Button className="group/btn relative overflow-hidden bg-slate-900 text-white dark:bg-white dark:text-slate-900 h-14 px-8 text-lg font-bold rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.1)] border-none">
                  <span className="relative z-10 flex items-center">
                    Read Full Breakdown 
                    <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-yellow-400 translate-y-[100%] group-hover/btn:translate-y-0 transition-transform duration-300 ease-in-out" />
                  <span className="absolute inset-0 flex items-center justify-center z-20 text-black opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 ease-in-out font-bold">
                    Read Full Breakdown <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Link>
            </div>

            {/* Image Side */}
            <div className="lg:w-[45%] relative overflow-hidden min-h-[400px] lg:min-h-full">
              <div className="absolute inset-0 bg-slate-900/10 dark:bg-black/20 z-10 group-hover:bg-transparent transition-colors duration-500" />
              {/* Sleek fade mask on the left side of the image */}
              <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-20 hidden lg:block pointer-events-none" />
              <img 
                src={featuredStudy.heroImage} 
                alt={featuredStudy.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop"; }}
              />
            </div>
          </motion.div>
        ) : null}
      </section>

      {/* ═══════════════════════════════════════
          FILTER & GRID SECTION
      ═══════════════════════════════════════ */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        
        {/* Modern Pill Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6 border-b border-slate-200 dark:border-slate-800 pb-6">
          <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">More Success Stories</h3>
          <div className="flex flex-wrap items-center gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-yellow-400 text-slate-900 shadow-[0_4px_14px_0_rgba(250,204,21,0.39)] hover:bg-yellow-500"
                    : "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-yellow-400/50 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Case Studies Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-slate-100 dark:bg-slate-900/50 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 h-[500px] animate-pulse" />
            ))}
          </div>
        ) : (
          <motion.div layout className="grid md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredStudies.map((study) => (
                <motion.div
                  key={study.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                >
                  <Link href={`/case-studies/${study.slug}`} className="block h-full group">
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-yellow-400/50 transition-all duration-500 shadow-sm hover:shadow-2xl flex flex-col h-full relative">
                      
                      {/* Image & Metric Overlay */}
                      <div className="w-full h-72 relative overflow-hidden bg-slate-200 dark:bg-slate-800">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity" />
                        <img 
                          src={study.heroImage} 
                          alt={study.client} 
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                          onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop"; }}
                        />
                        
                        {/* Floating Metric Badge */}
                        {study.metrics && Array.isArray(study.metrics) && study.metrics[0] && (
                          <div className="absolute bottom-6 left-6 z-20 bg-yellow-400 text-slate-900 px-5 py-3 rounded-2xl shadow-xl flex flex-col transform group-hover:-translate-y-2 transition-transform duration-300">
                            <span className="text-2xl font-black leading-none mb-1">
                              {study.metrics[0].value}
                            </span>
                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-800">
                              {study.metrics[0].label}
                            </span>
                          </div>
                        )}
                        
                        {/* Top Right Arrow */}
                        <div className="absolute top-6 right-6 z-20 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 text-white transform translate-x-4 -translate-y-4 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                          <ArrowUpRight className="w-6 h-6" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-8 md:p-10 flex-1 flex flex-col">
                        <div className="flex items-center gap-2 mb-4">
                          <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                            {study.category}
                          </span>
                          <span className="text-slate-400 dark:text-slate-500 text-xs font-bold">•</span>
                          <span className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                            {study.service}
                          </span>
                        </div>
                        
                        <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4 group-hover:text-yellow-500 transition-colors tracking-tight">
                          {study.client}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed flex-1 line-clamp-3 font-medium">
                          {study.challenge}
                        </p>
                      </div>

                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* ═══════════════════════════════════════
          FINAL CTA SECTION
      ═══════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden bg-yellow-400">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-[size:40px_40px] opacity-10" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-slate-900 uppercase tracking-tight leading-[1.1]">
            Want these exact results<br />for your brand?
          </h2>
          <p className="text-xl text-slate-800 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
            Stop guessing. Let our engineers and strategists build you a custom growth roadmap designed to steal market share.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-slate-900 hover:bg-black text-white h-16 px-10 text-lg rounded-full shadow-2xl font-bold transition-all hover:scale-105">
              Claim Your Free Audit <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
