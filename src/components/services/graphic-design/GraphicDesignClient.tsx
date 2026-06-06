"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView, animate } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/public/Footer";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, PenTool, Layout, Package, Sparkles,
  ChevronDown, CheckCircle2, Star, Layers, Palette,
  Target, Zap, Key
} from "lucide-react";
import Link from "next/link";

const SERVICES = [
  {
    number: "01",
    icon: Layout,
    title: "Amazon A+ & Storefronts",
    color: "text-yellow-500",
    accent: "bg-yellow-400",
    desc: "Premium Enhanced Brand Content and custom storefronts engineered to maximize conversion rates and establish unshakeable brand authority on the Amazon marketplace.",
    tags: ["A+ Content", "Brand Stories", "Storefront Design", "Module Layout"],
  },
  {
    number: "02",
    icon: PenTool,
    title: "Brand Identity & Logos",
    color: "text-pink-500",
    accent: "bg-pink-500",
    desc: "Memorable logos, comprehensive brand guidelines, typography systems, and color palettes that define your market presence and make your brand instantly recognizable.",
    tags: ["Logo Design", "Brand Guidelines", "Typography", "Color Systems"],
  },
  {
    number: "03",
    icon: Package,
    title: "Product Packaging",
    color: "text-cyan-500",
    accent: "bg-cyan-500",
    desc: "Retail-ready box designs, labels, and inserts that create an unforgettable unboxing experience and drive repeat purchases through premium presentation.",
    tags: ["Box Design", "Label Design", "Insert Cards", "3D Mockups"],
  },
  {
    number: "04",
    icon: Layers,
    title: "Social & Ad Creatives",
    color: "text-violet-500",
    accent: "bg-violet-500",
    desc: "Scroll-stopping social media graphics, static ad creatives, and banner designs engineered to drive clicks and conversions across every platform.",
    tags: ["Social Graphics", "Ad Banners", "Story Templates", "Thumbnails"],
  },
];

const PROCESS = [
  { step: "01", title: "Discovery", desc: "We dissect your brand, audience, and competitors to form a sharp creative direction." },
  { step: "02", title: "Concepting", desc: "Initial wireframes and visual concepts crafted for your review and feedback." },
  { step: "03", title: "Refinement", desc: "We polish the chosen direction, perfecting every micro-detail and aesthetic." },
  { step: "04", title: "Delivery", desc: "All source files, final renders, and implementation guides delivered to you." },
];

const FAQS = [
  {
    q: "What types of graphic design services do you offer?",
    a: "We offer a comprehensive range of design services including Amazon A+ Content, Storefront design, Brand Identity (logos, typography, color systems), Packaging design, and high-converting ad creatives for social platforms.",
  },
  {
    q: "Do you design specifically for Amazon conversion?",
    a: "Yes, our Amazon design team specializes in creating Enhanced Brand Content (A+) and Storefronts that are psychologically engineered to improve click-through and conversion rates on the marketplace.",
  },
  {
    q: "Will I own the final design files?",
    a: "Absolutely. Once a project is completed and fully paid, you own 100% of the final designs and we provide all necessary source files and assets for your future use.",
  },
  {
    q: "How long does a typical design project take?",
    a: "Turnaround times vary based on the scope. A single Amazon A+ module or ad creative batch may take 3-5 days, while a full Brand Identity or complex Packaging design can take 2-4 weeks. We always establish clear timelines before starting.",
  },
  {
    q: "Do you offer revisions?",
    a: "Yes. Every project includes a structured revision cycle. We work collaboratively with you until the design meets your vision and our quality standards — you will never receive a final deliverable you are not proud of.",
  },
];

function AnimatedCounter({ from, to, prefix = "", suffix = "" }: { from: number, to: number, prefix?: string, suffix?: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView) {
      const controls = animate(from, to, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent = `${prefix}${Math.round(value)}${suffix}`;
          }
        },
      });
      return () => controls.stop();
    }
  }, [from, to, inView, prefix, suffix]);

  return <span ref={nodeRef} className="font-mono tracking-tight">{prefix}{from}{suffix}</span>;
}

export default function GraphicDesignClient() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeService, setActiveService] = useState(0);

  return (
    <main className="min-h-screen bg-white dark:bg-[#0B0C10] text-slate-900 dark:text-white font-sans overflow-x-hidden selection:bg-yellow-500/30">
      <Navbar />

      {/* ═══════════════════════════════════
          1. HERO SECTION
      ═══════════════════════════════════ */}
      <section
        className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 min-h-[90vh] flex items-center z-10"
      >
        {/* Background */}
        <div 
          className="absolute inset-0 z-0 bg-black overflow-hidden"
          style={{ clipPath: "ellipse(120% 95% at 50% 0%)" }}
        >
          <div className="absolute inset-0 bg-black/55 z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-[#0B0C10] z-20" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2070&auto=format&fit=crop"
            alt="Graphic Design Background"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left: Text */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="inline-flex items-center gap-2 bg-yellow-400 text-slate-900 px-5 py-2 rounded-full mb-8 font-black text-sm shadow-xl"
              >
                <Sparkles className="w-4 h-4" />
                <span className="tracking-widest uppercase">Premium Creative Agency</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-6 leading-[1.05] tracking-tight uppercase"
              >
                Design that <br />
                <span className="text-yellow-400">Converts.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl text-slate-300 max-w-lg mb-10 leading-relaxed"
              >
                We engineer scroll-stopping brand identities, high-converting Amazon A+ content, and premium packaging that makes your competitors look obsolete.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link href="/contact">
                  <Button size="lg" className="bg-yellow-400 text-slate-900 hover:bg-yellow-500 font-black h-14 px-10 text-base rounded-full shadow-[0_0_40px_rgba(250,204,21,0.3)] transition-all hover:scale-105">
                    Start Your Project <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="#portfolio">
                  <Button size="lg" variant="outline" className="h-14 px-10 text-base font-bold rounded-full border-white/20 text-white hover:bg-white/10 transition-all">
                    View Portfolio
                  </Button>
                </Link>
              </motion.div>


            </div>

            {/* Right: Animated Design Toolkit */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="flex items-center justify-center mt-6 lg:mt-0 translate-y-12 sm:translate-y-16 lg:translate-y-24"
            >
              <div className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[440px] mx-auto">

                {/* Glow */}
                <div className="absolute inset-0 bg-yellow-400/10 blur-[80px] rounded-full pointer-events-none" />

                {/* Central Figma-style canvas card */}
                <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden mx-8">
                  {/* Window chrome */}
                  <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10 bg-white/5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/90" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/90" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/90" />
                    <span className="ml-3 text-[10px] font-bold text-white/30 uppercase tracking-widest">alphadigify.fig</span>
                    <div className="ml-auto flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-[9px] text-white/30 uppercase tracking-widest">Live</span>
                    </div>
                  </div>

                  {/* Canvas content */}
                  <div className="p-5 space-y-4">
                    {/* Top row: two asset boxes */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="aspect-square rounded-2xl bg-yellow-400 flex flex-col items-center justify-center gap-2 shadow-lg">
                        <PenTool className="w-7 h-7 text-slate-900" />
                        <span className="text-[9px] font-black text-slate-900 uppercase tracking-widest">Logo</span>
                      </div>
                      <div className="aspect-square rounded-2xl bg-white/10 border border-white/20 flex flex-col items-center justify-center gap-2">
                        <Layout className="w-7 h-7 text-white/70" />
                        <span className="text-[9px] font-black text-white/50 uppercase tracking-widest">A+ Page</span>
                      </div>
                    </div>

                    {/* Color palette row */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                      <p className="text-[9px] text-white/30 uppercase tracking-widest mb-2 font-bold">Brand Palette</p>
                      <div className="flex gap-2">
                        {["#FACC15", "#0f172a", "#ec4899", "#06b6d4", "#f97316", "#a855f7"].map((c, i) => (
                          <motion.div
                            key={i}
                            whileHover={{ scale: 1.3, y: -3 }}
                            className="w-6 h-6 rounded-full border-2 border-white/20 cursor-pointer shadow-md"
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Typography preview */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                      <p className="text-[9px] text-white/30 uppercase tracking-widest mb-1 font-bold">Typography</p>
                      <p className="text-xl font-black text-white tracking-tight">Aa — Inter Black</p>
                      <div className="space-y-1 mt-2">
                        <div className="h-1.5 rounded-full bg-white/20 w-4/5" />
                        <div className="h-1.5 rounded-full bg-white/10 w-full" />
                        <div className="h-1.5 rounded-full bg-white/10 w-2/3" />
                      </div>
                    </div>

                    {/* Animated progress bar */}
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        animate={{ width: ["10%", "85%", "10%"] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="h-full bg-yellow-400 rounded-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Badge: Brand Identity */}
                <div className="absolute -top-4 -left-2 sm:left-0 bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl px-3 py-2.5 shadow-2xl">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-yellow-400 flex items-center justify-center shrink-0">
                      <PenTool className="w-4 h-4 text-slate-900" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Service</p>
                      <p className="text-xs font-black text-white">Brand Identity</p>
                    </div>
                  </div>
                </div>

                {/* Badge: Packaging */}
                <div className="absolute top-16 -right-2 sm:right-0 bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl px-3 py-2.5 shadow-2xl">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-cyan-500 flex items-center justify-center shrink-0">
                      <Package className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Service</p>
                      <p className="text-xs font-black text-white">Packaging</p>
                    </div>
                  </div>
                </div>

                {/* Stat badge */}
                <div className="absolute -bottom-4 right-4 sm:right-8 bg-yellow-400 rounded-2xl px-4 py-3 shadow-2xl">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-slate-900 fill-slate-900" />
                    <div>
                      <p className="text-[9px] font-bold text-slate-900/60 uppercase tracking-widest">Conversion Lift</p>
                      <p className="text-lg font-black text-slate-900 leading-none">+340%</p>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          2. SERVICES — Interactive Tab List
      ═══════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white dark:bg-[#0B0C10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-16 md:mb-20">
            <div className="inline-flex items-center gap-2 bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20 text-yellow-700 dark:text-yellow-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6">
              <Palette className="w-3.5 h-3.5" /> What We Create
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-5 text-slate-900 dark:text-white uppercase tracking-tight">
              Our Design <span className="text-yellow-500">Arsenal</span>
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
              From pixel-perfect brand systems to high-converting Amazon assets — we operate across every high-leverage design touchpoint.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Tab buttons */}
            <div className="space-y-3">
              {SERVICES.map((srv, i) => (
                <button
                  key={i}
                  onClick={() => setActiveService(i)}
                  className={`w-full text-left flex items-center gap-5 py-6 border-b-[1.5px] transition-all duration-300 group ${
                    activeService === i
                      ? "border-yellow-400"
                      : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                    activeService === i ? `${srv.accent} text-white shadow-lg` : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500"
                  }`}>
                    <srv.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-black uppercase tracking-widest ${activeService === i ? "text-yellow-600 dark:text-yellow-400" : "text-slate-400"}`}>
                        {srv.number}
                      </span>
                      <h3 className={`font-black text-base md:text-lg truncate transition-colors ${activeService === i ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400"}`}>
                        {srv.title}
                      </h3>
                    </div>
                  </div>
                  <ArrowRight className={`w-4 h-4 shrink-0 transition-all duration-300 ${activeService === i ? "text-yellow-500 translate-x-1" : "text-slate-300 dark:text-slate-700"}`} />
                </button>
              ))}
            </div>

            {/* Active service detail panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="py-4 md:py-8 lg:pl-8 relative flex flex-col items-start"
              >
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-8 ${SERVICES[activeService].color} bg-slate-50 dark:bg-slate-900/50 shadow-sm`}>
                  {(() => { const Icon = SERVICES[activeService].icon; return <Icon className="w-10 h-10" />; })()}
                </div>

                <span className={`text-sm font-black uppercase tracking-widest ${SERVICES[activeService].color} mb-3 block`}>
                  {SERVICES[activeService].number} / 04
                </span>
                <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
                  {SERVICES[activeService].title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xl mb-10 max-w-xl">
                  {SERVICES[activeService].desc}
                </p>

                <div className="flex flex-wrap gap-3">
                  {SERVICES[activeService].tags.map((tag, j) => (
                    <span key={j} className="px-4 py-2 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-sm font-bold rounded-full uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════
          3. BEFORE & AFTER SLIDER
      ═══════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white dark:bg-[#0B0C10] border-y border-slate-200 dark:border-slate-800 overflow-hidden" id="portfolio">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-12 md:mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20 text-yellow-700 dark:text-yellow-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                <Star className="w-3.5 h-3.5" /> The Proof
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                The <span className="text-yellow-500">Difference</span>
              </h2>
            </div>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed lg:text-right">
              Drag the slider to see how we transform raw product imagery into premium, conversion-ready brand assets.
            </p>
          </div>

          <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 select-none">
            {/* Before */}
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center grayscale opacity-70"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1600&q=80')" }}
            />

            {/* After — clipped */}
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1600&q=80')",
                clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
                filter: "contrast(1.15) saturate(1.5)",
              }}
            >
              {/* Branded overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/50 to-transparent" />
              <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white">
                <div className="inline-block px-3 py-1 bg-yellow-400 text-slate-900 font-black text-[10px] sm:text-xs uppercase tracking-widest rounded-md mb-3 shadow-lg">
                  New Release
                </div>
                <h3 className="text-3xl sm:text-4xl md:text-6xl font-black italic uppercase tracking-tighter drop-shadow-2xl">Sonic Pro</h3>
                <p className="text-sm sm:text-base md:text-xl font-bold mt-1 sm:mt-2 tracking-widest text-slate-300">HEAR THE DIFFERENCE.</p>
              </div>
            </div>

            {/* Handle */}
            <div
              className="absolute top-0 bottom-0 z-20 flex items-center justify-center"
              style={{ left: `calc(${sliderPosition}% - 1px)` }}
            >
              <div className="w-0.5 sm:w-1 h-full bg-yellow-400 shadow-[0_0_16px_rgba(250,204,21,0.7)]" />
              <div className="absolute w-10 h-10 sm:w-12 sm:h-12 bg-yellow-400 rounded-full shadow-2xl border-4 border-white flex items-center justify-center cursor-ew-resize">
                <svg className="w-4 h-4 text-slate-900" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M7 4l-4 6 4 6M13 4l4 6-4 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Range input */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
            />

            {/* Labels */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-slate-900/70 backdrop-blur-sm border border-white/10 text-white text-[10px] sm:text-xs font-black px-3 py-1.5 rounded-full z-10 uppercase tracking-widest pointer-events-none">
              After — Alpha Design
            </div>
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-slate-900/70 backdrop-blur-sm border border-white/10 text-white text-[10px] sm:text-xs font-black px-3 py-1.5 rounded-full z-10 uppercase tracking-widest pointer-events-none">
              Before — Raw Asset
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          4. PROCESS
      ═══════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white dark:bg-[#0B0C10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-20">
            <div className="inline-flex items-center gap-2 bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20 text-yellow-700 dark:text-yellow-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5" /> How It Works
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              Our <span className="text-yellow-500">Process</span>
            </h2>
          </div>

          <div className="relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-[2px] bg-slate-100 dark:bg-slate-800" />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-4">
              {PROCESS.map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center relative group">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-20 h-20 rounded-full bg-white dark:bg-slate-900 border-[2px] border-slate-200 dark:border-slate-700 group-hover:border-yellow-400 flex items-center justify-center text-2xl font-black text-slate-300 dark:text-slate-700 group-hover:text-yellow-500 transition-all duration-300 mb-6 relative z-10 shadow-sm"
                  >
                    {step.step}
                  </motion.div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-yellow-500 transition-colors duration-300">{step.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-[180px]">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          5. WHY US
      ═══════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-[0.04] mix-blend-luminosity pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-8">
                <CheckCircle2 className="w-3.5 h-3.5" /> Why Alphadigify
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-6 leading-tight">
                Design built<br />to <span className="text-yellow-400">sell.</span>
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed max-w-lg">
                We don't just make things look good — we engineer every visual decision with conversion psychology and brand strategy at its core.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {[
                { title: "Conversion-First Design", desc: "Every layout, color, and font is chosen to drive action, not just admiration.", Icon: Target },
                { title: "Amazon Specialists", desc: "Deep expertise in A+ Content and Storefronts that dominate the marketplace.", Icon: Package },
                { title: "Fast Turnaround", desc: "Structured pipelines mean you get premium work delivered in days, not weeks.", Icon: Zap },
                { title: "You Own Everything", desc: "Full source file handover. No lock-in, no hidden fees, ever.", Icon: Key },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 cursor-default hover:border-yellow-400/30 hover:bg-yellow-400/5 transition-all duration-300"
                >
                  <div className="mb-4 text-yellow-400 bg-yellow-400/10 w-12 h-12 flex items-center justify-center rounded-xl">
                    <item.Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-black text-white mb-2">{item.title}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          6. FAQs
      ═══════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white dark:bg-[#0B0C10]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-wide">
              Graphic Design<br />
              <span className="text-yellow-500">FAQs</span>
            </h2>
          </div>

          <div className="border-t-[1.5px] border-slate-200 dark:border-slate-800">
            {FAQS.map((faq, i) => (
              <div key={i} className="border-b-[1.5px] border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-start justify-between py-6 text-left group"
                >
                  <span className={`text-lg md:text-xl font-bold pr-8 transition-colors duration-300 ${openFaq === i ? "text-yellow-500" : "text-slate-900 dark:text-white group-hover:text-yellow-500"}`}>
                    {faq.q}
                  </span>
                  <span className={`shrink-0 ml-4 flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300 ${openFaq === i ? "bg-yellow-50 dark:bg-yellow-500/10" : "bg-slate-50 dark:bg-slate-900 group-hover:bg-slate-100 dark:group-hover:bg-slate-800"}`}>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openFaq === i ? "rotate-180 text-yellow-500" : "text-slate-400 dark:text-slate-500"}`} />
                  </span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pr-12 text-slate-600 dark:text-slate-400 leading-relaxed md:text-lg">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-slate-500 dark:text-slate-400 mb-6 text-lg">Still have questions? We'd love to help.</p>
            <Link href="/contact">
              <Button size="lg" className="bg-yellow-400 text-slate-900 hover:bg-yellow-500 font-black h-14 px-10 text-base rounded-full transition-all hover:scale-105 shadow-[0_0_30px_rgba(250,204,21,0.2)]">
                Get in Touch <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
