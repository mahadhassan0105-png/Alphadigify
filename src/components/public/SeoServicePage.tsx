/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ArrowRight, Search, BarChart3, Link as LinkIcon, FileText, Settings, Target, ShieldCheck } from "lucide-react";
import Image from "next/image";
import SeoHeroSlider from "./SeoHeroSlider";
import { useEffect, useRef } from "react";
import { useInView, animate } from "framer-motion";

/* ───── Interactive Feature Card ───── */
function FeatureCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-2xl p-8 transition-colors duration-300 hover:border-yellow-400/50 hover:bg-slate-50 dark:hover:bg-white/[0.04] shadow-sm dark:shadow-none h-full ${className || ''}`}>
      {children}
    </div>
  );
}

/* ───── Animated Counter ───── */
function Counter({ from, to, prefix = "", suffix = "" }: { from: number; to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  useEffect(() => {
    if (inView) {
      const c = animate(from, to, {
        duration: 2.5, ease: "easeOut",
        onUpdate(v) { if (ref.current) ref.current.textContent = `${prefix}${Math.round(v)}${suffix}`; },
      });
      return () => c.stop();
    }
  }, [from, to, inView, prefix, suffix]);
  return <span ref={ref} className="font-mono tracking-tight">{prefix}{from}{suffix}</span>;
}

const stats = [
  { from: 0, to: 350, suffix: "%", label: "Average Traffic Growth" },
  { from: 0, to: 1, prefix: "Page ", label: "Rankings Achieved" },
  { from: 0, to: 50, suffix: "k+", label: "Leads Generated" },
  { from: 0, to: 15, suffix: "+", label: "Years Experience" },
];

const features = [
  {
    icon: Search,
    title: "Advanced Keyword Research",
    desc: "We identify high-intent, low-competition keywords that your ideal customers are actually searching for, ensuring high conversion rates."
  },
  {
    icon: Settings,
    title: "Technical SEO Optimization",
    desc: "We fix site speed, mobile responsiveness, schema markup, and crawl errors so search engines can index your site perfectly."
  },
  {
    icon: LinkIcon,
    title: "High-Authority Link Building",
    desc: "Acquire powerful backlinks from authoritative domains in your industry to significantly boost your domain authority and trust."
  },
  {
    icon: FileText,
    title: "Content Strategy & Creation",
    desc: "Engaging, SEO-optimized content written by experts that satisfies user intent and naturally attracts inbound links."
  },
  {
    icon: Target,
    title: "Local SEO Dominance",
    desc: "Dominate Google Maps and local search results to capture high-converting foot traffic and local service inquiries."
  },
  {
    icon: BarChart3,
    title: "Transparent Reporting",
    desc: "Real-time dashboards tracking your keyword rankings, organic traffic, and exact ROI from your SEO campaigns."
  }
];

const services = [
  {
    id: "enterprise-seo",
    title: "Enterprise SEO Solutions",
    intro: "Scaling SEO for large websites with thousands of pages requires a highly technical approach. We handle massive architecture overhauls, programmatic SEO, and advanced crawl budget optimization.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600",
    certification: "Enterprise Grade",
    blocks: [
      {
        heading: "Enterprise Strategies",
        items: [
          { title: "Crawl Budget Optimization", text: "Ensuring Google efficiently crawls your most valuable pages without wasting time on duplicates." },
          { title: "Programmatic SEO", text: "Generating thousands of high-quality, intent-driven landing pages at scale." },
          { title: "Taxonomy & Architecture", text: "Structuring complex mega-menus and category trees for maximum link equity flow." }
        ]
      }
    ]
  },
  {
    id: "ecommerce-seo",
    title: "E-Commerce SEO Mastery",
    intro: "Turn your online store into a revenue-generating machine. We optimize your product pages, category structures, and faceted navigation to outrank your competitors and drive sales.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600",
    certification: "E-Commerce Specialists",
    blocks: [
      {
        heading: "E-Commerce Tactics",
        items: [
          { title: "Product Page Optimization", text: "Schema markup, rich snippets, and keyword-rich descriptions for maximum visibility." },
          { title: "Faceted Navigation Fixes", text: "Preventing duplicate content issues caused by dynamic product filters and sorting." },
          { title: "Category SEO", text: "Building authoritative hub pages that rank for broad, high-volume industry terms." }
        ]
      }
    ]
  }
];

export default function SeoServicePage() {
  return (
    <div className="bg-white dark:bg-[#030712] min-h-screen text-slate-900 dark:text-slate-200 selection:bg-yellow-400/30">
      <SeoHeroSlider />

      {/* STATS */}
      <section className="py-12 sm:py-16 relative z-10 border-b border-slate-200 dark:border-white/10 bg-white dark:bg-[#030712]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-500 dark:text-yellow-400 mb-2">
                  <Counter from={s.from} to={s.to} prefix={s.prefix || ""} suffix={s.suffix} />
                </div>
                <div className="text-[10px] sm:text-xs md:text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-12 sm:py-16 relative overflow-hidden bg-white dark:bg-[#030712]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
              Holistic <span className="text-yellow-500 dark:text-yellow-400">Optimization</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">We don't just guess. We use data-driven methodologies across all three pillars of SEO: Technical, On-Page, and Off-Page.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i}>
                <FeatureCard className="group">
                  <f.icon className="w-12 h-12 text-yellow-500 dark:text-yellow-400 mb-6" strokeWidth={1.5} />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{f.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{f.desc}</p>
                </FeatureCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DETAILED SERVICES */}
      <section className="pb-16 bg-white dark:bg-[#030712]">
        <div className="flex flex-col">
          {services.map((service, index) => {
            const isEven = index % 2 === 0;

            return (
              <section key={service.id} id={service.id} className="py-12 sm:py-16 border-t border-slate-200 dark:border-white/10 scroll-mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                    
                    {/* Visual side */}
                    <div className="w-full lg:w-1/2 flex justify-center">
                      <div className="relative w-full max-w-lg aspect-[4/3] rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-xl dark:shadow-none bg-slate-200 dark:bg-slate-800">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover transition-transform duration-700 hover:scale-105"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                    </div>

                    {/* Content Side */}
                    <div className="w-full lg:w-1/2">
                      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6">
                        {service.title}
                      </h2>
                      <div className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8">
                        {service.intro}
                      </div>

                      {service.certification && (
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 font-bold rounded-lg mb-8 text-sm border border-yellow-400/20">
                          <ShieldCheck className="w-5 h-5" />
                          {service.certification}
                        </div>
                      )}

                      <div className="space-y-8 mb-10">
                        {service.blocks.map((block: any, bIdx) => (
                          <div key={bIdx}>
                            {block.heading && (
                              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4 border-l-4 border-yellow-400 pl-3">
                                {block.heading}
                              </h4>
                            )}
                            <ul className="space-y-4">
                              {block.items.map((item: any, iIdx: number) => (
                                <li key={iIdx} className="flex items-start">
                                  <ArrowRight className="w-5 h-5 text-yellow-500 dark:text-yellow-400 mt-1 shrink-0 mr-3" />
                                  <div>
                                    <span className="font-bold text-slate-800 dark:text-slate-200">{item.title}: </span>
                                    <span className="text-slate-600 dark:text-slate-400">{item.text}</span>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </section>
    </div>
  );
}