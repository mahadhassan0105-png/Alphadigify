/* eslint-disable react/no-unescaped-entities */
"use client";

import { useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ShoppingCart, TrendingUp, BarChart3, Video, Share2,
  Users, ArrowRight, Target, Check
} from "lucide-react";
import TikTokHeroSlider from "./TikTokHeroSlider";
import ServiceDetailSections from "./ServiceDetailSections";

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

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`relative border rounded-2xl transition-all duration-300 overflow-hidden ${open ? "border-yellow-400/50 bg-white dark:bg-slate-900 shadow-xl shadow-yellow-400/5" : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-700"}`}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-6 sm:p-8 text-left group z-10 relative">
        <div className="flex items-center space-x-4 pr-4">
          <span className={`text-sm font-bold tracking-widest ${open ? 'text-yellow-500' : 'text-slate-400 group-hover:text-yellow-500'} transition-colors`}>0{index + 1}</span>
          <span className={`text-base sm:text-lg font-bold transition-colors ${open ? 'text-slate-900 dark:text-white' : 'text-slate-800 dark:text-slate-200'}`}>{q}</span>
        </div>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${open ? 'bg-yellow-400 text-black rotate-45' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-yellow-400 group-hover:text-black'}`}>
          <span className="text-xl font-light leading-none mb-0.5">+</span>
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="p-6 sm:p-8 pt-0 text-slate-600 dark:text-slate-400 leading-relaxed relative z-10 text-sm sm:text-base">{a}</div>
      </div>
    </div>
  );
}

export default function TikTokServicePage() {
  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <TikTokHeroSlider />

      {/* 2. Key Statistics Section */}
      <section className="py-16 lg:py-24 bg-white dark:bg-[#030712] relative mt-12 lg:mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 text-center">
            {[
              { label: "GMV Generated", value: 45, prefix: "$", suffix: "M+" },
              { label: "Creator Network", value: 10, suffix: "K+" },
              { label: "Live Streams", value: 5, suffix: "K+" },
              { label: "Conversion Rate", value: 12, suffix: "%" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-4xl md:text-5xl font-black text-yellow-400 mb-2">
                  <Counter from={0} to={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </span>
                <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us / Tech Stack */}
      <section className="py-24 bg-white dark:bg-[#030712] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.15)_0%,transparent_100%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">The Alphadigify <span className="text-yellow-500">Advantage</span></h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">TikTok Shop requires a completely different approach than Amazon or Shopify. We blend entertainment with commerce to maximize impulse buying and brand loyalty.</p>
              <ul className="space-y-6">
                {[
                  "Proprietary Creator Matchmaking Engine",
                  "In-house Content Production Studios",
                  "24/7 Dedicated Account Management",
                  "Advanced TikTok Trend Forecasting"
                ].map((item, i) => (
                  <li key={i} className="flex items-center space-x-4">
                    <div className="w-8 h-8 rounded-full bg-yellow-400/20 flex items-center justify-center shrink-0">
                      <Check className="w-5 h-5 text-yellow-500" />
                    </div>
                    <span className="text-lg font-bold text-slate-800 dark:text-slate-200">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative w-full aspect-square max-w-md mx-auto mt-10 lg:mt-0 perspective-1000">
              {/* Background Glow */}
              <div className="absolute inset-10 bg-gradient-to-tr from-[#FE2C55]/20 to-[#25F4EE]/20 dark:from-[#FE2C55]/30 dark:to-[#25F4EE]/30 rounded-full blur-[80px] pointer-events-none" />
              
              {/* Card 1: Creator Network (Top Right) */}
              <div className="absolute top-[10%] right-[5%] w-[65%] bg-white/80 dark:bg-[#111]/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl transform rotate-[6deg] hover:rotate-0 hover:-translate-y-2 hover:z-30 transition-all duration-500 group cursor-default">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center border border-cyan-200 dark:border-cyan-800">
                    <Users className="w-5 h-5 text-[#25F4EE]" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Affiliates</span>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">10,000+</div>
                  <div className="text-xs sm:text-sm font-medium text-slate-500">Active Creators</div>
                </div>
                {/* Visual Bar */}
                <div className="mt-5 flex gap-1 h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="w-1/3 bg-[#25F4EE] rounded-full transition-all duration-1000 group-hover:w-1/2"></div>
                  <div className="w-1/4 bg-[#25F4EE]/40 rounded-full"></div>
                </div>
              </div>

              {/* Card 2: Viral Content (Bottom Left) */}
              <div className="absolute bottom-[15%] left-[5%] w-[65%] bg-white/80 dark:bg-[#111]/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl transform rotate-[-6deg] hover:rotate-0 hover:-translate-y-2 hover:z-30 transition-all duration-500 group cursor-default">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center border border-pink-200 dark:border-pink-800">
                    <Video className="w-5 h-5 text-[#FE2C55]" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Reach</span>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">12.5M+</div>
                  <div className="text-xs sm:text-sm font-medium text-slate-500">Monthly Views</div>
                </div>
                {/* Wave Visual */}
                <div className="mt-5 flex items-end gap-1.5 h-8">
                  {[40, 70, 45, 90, 60, 100, 80].map((h, i) => (
                    <div key={i} className="w-full bg-slate-200 dark:bg-slate-700 rounded-t-sm transition-all duration-500 group-hover:bg-[#FE2C55]" style={{ height: `${h}%`, transitionDelay: `${i * 50}ms` }}></div>
                  ))}
                </div>
              </div>

              {/* Card 3: Live Sales (Center Piece) */}
              <div className="absolute top-[28%] left-[12%] w-[76%] bg-gradient-to-br from-yellow-300 to-yellow-500 dark:from-yellow-400 dark:to-yellow-600 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(250,204,21,0.25)] transform hover:-translate-y-3 hover:scale-105 hover:z-40 transition-all duration-500 z-20 border border-yellow-200 dark:border-yellow-400 cursor-default">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2.5 bg-white/90 dark:bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                    <div className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
                    </div>
                    <span className="text-[10px] sm:text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">LIVE SALES</span>
                  </div>
                  <div className="bg-black/10 dark:bg-black/20 rounded-full p-2.5">
                    <ShoppingCart className="w-5 h-5 text-black dark:text-white" />
                  </div>
                </div>
                <div className="space-y-1 mb-8">
                  <div className="text-xs font-bold text-yellow-900 dark:text-yellow-100 uppercase tracking-wider">Gross Merchandise Value</div>
                  <div className="text-4xl sm:text-5xl font-black text-black dark:text-white tracking-tighter drop-shadow-sm">$45M<span className="text-2xl">+</span></div>
                </div>
                <div className="w-full bg-white/40 dark:bg-black/20 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between border border-white/50 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-yellow-900 dark:text-yellow-100" />
                    <span className="text-xs font-bold text-yellow-900 dark:text-yellow-100 uppercase tracking-wider">Conversion</span>
                  </div>
                  <span className="text-base sm:text-lg font-black text-black dark:text-white">12.8%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Services Grid */}
      <section className="py-24 bg-white dark:bg-[#030712]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">Master the <span className="text-yellow-500">FYP</span></h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">We don't just set up your TikTok Shop—we turn it into a viral sales engine through creator partnerships, live streaming, and optimized content.</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
            {[
              { title: "Affiliate Networking", desc: "We connect your brand with our vast network of top-performing TikTok creators to drive authentic, high-converting product showcases.", icon: Users },
              { title: "Live Stream Sales", desc: "End-to-end live commerce strategy, including scriptwriting, set design, hosting, and real-time sales optimization.", icon: Video },
              { title: "Viral Content Creation", desc: "Production of engaging short-form videos tailored to TikTok trends that maximize organic reach and direct sales.", icon: Share2 },
              { title: "Shop Setup & Optimization", desc: "Full TikTok Seller Center management, product listings, pricing strategy, and promotional campaign execution.", icon: ShoppingCart },
              { title: "TikTok Ads Management", desc: "Strategic deployment of Spark Ads, In-Feed Ads, and targeted campaigns to scale your most profitable content.", icon: Target },
              { title: "Data & Analytics", desc: "Deep performance tracking of creator ROI, live stream metrics, and shop conversions to continuously improve strategy.", icon: BarChart3 }
            ].map((feature, i) => (
              <div key={i}
                className="group flex flex-col bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-3 sm:p-6 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 transition-all duration-300">
                {/* Icon */}
                <div className="mb-3 sm:mb-4 shrink-0">
                  <feature.icon className="w-8 h-8 sm:w-10 sm:h-10 text-[#FE2C55]" strokeWidth={1.5} />
                </div>
                {/* Title */}
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white mb-2 sm:mb-3">{feature.title}</h3>
                {/* Divider */}
                <div className="w-full h-px bg-slate-200 dark:bg-slate-700 mb-2 sm:mb-3" />
                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4 sm:mb-6">{feature.desc}</p>
                {/* Learn more */}
                <a
                  href="#affiliate"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('affiliate')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="mt-auto flex items-center text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm cursor-pointer group-hover:text-[#FE2C55] transition-colors"
                >
                  <span className="w-5 h-5 rounded-full bg-[#FE2C55] flex items-center justify-center mr-2 shrink-0">
                    <ArrowRight className="w-3 h-3 text-white" />
                  </span>
                  Learn more
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Detailed Breakdown (Reusing ServiceDetailSections) */}
      <ServiceDetailSections 
        theme="tiktok"
        title="Comprehensive TikTok Ecosystem"
        subtitle="We handle every aspect of your TikTok Shop journey, from initial launch to becoming a viral sensation."
      />

      {/* 6. FAQ Section */}
      <section className="py-24 bg-white dark:bg-[#030712]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">Frequent Questions</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: "Is TikTok Shop right for my brand?", a: "TikTok Shop excels for brands with visually appealing, easily demonstrable products, especially in beauty, fashion, gadgets, and lifestyle. If your product has a 'wow' factor, it can thrive on TikTok." },
              { q: "How do you handle creator partnerships?", a: "We manage the entire lifecycle: identifying creators that align with your brand, negotiating terms, sending samples, tracking their content performance, and managing commission payouts." },
              { q: "Do we need our own studio for Live Shopping?", a: "No. Alphadigify provides dedicated live streaming studios, professional hosts, and scriptwriters to manage your Live Shopping events seamlessly." },
              { q: "How long until we see viral results?", a: "While organic virality can be unpredictable, our structured approach to affiliate networks and Spark Ads typically generates consistent, measurable sales growth within the first 30 to 45 days." }
            ].map((faq, i) => (
              <FAQItem key={i} index={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>


    </div>
  );
}
