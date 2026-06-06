"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/public/Footer";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ShoppingCart,
  Eye,
  Zap,
  Search,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

/* ─── Google Brand Colors ─── */
const G_BLUE   = "#4285F4";
const G_RED    = "#EA4335";
const G_YELLOW = "#FBBC05";
const G_GREEN  = "#34A853";

/* ─── Google 4-Dot Logo ─── */
function GoogleDots({ size = 10 }: { size?: number }) {
  return (
    <span className="inline-flex gap-[3px]">
      <span style={{ width: size, height: size, borderRadius: "50%", background: G_BLUE,   display: "inline-block" }} />
      <span style={{ width: size, height: size, borderRadius: "50%", background: G_RED,    display: "inline-block" }} />
      <span style={{ width: size, height: size, borderRadius: "50%", background: G_YELLOW, display: "inline-block" }} />
      <span style={{ width: size, height: size, borderRadius: "50%", background: G_GREEN,  display: "inline-block" }} />
    </span>
  );
}

/* ─── Animated Typing Search Bar ─── */
const SEARCH_TERMS = [
  "best digital marketing agency",
  "google ads management service",
  "increase ecommerce sales fast",
  "ppc agency near me",
];

function TypingSearchBar() {
  const [termIdx, setTermIdx]   = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting]  = useState(false);

  useEffect(() => {
    const full = SEARCH_TERMS[termIdx];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < full.length) {
      timeout = setTimeout(() => setDisplayed(full.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === full.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setTermIdx((termIdx + 1) % SEARCH_TERMS.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, termIdx]);

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-full border border-slate-200 dark:border-slate-700 shadow-lg flex items-center px-3 sm:px-4 py-2.5 sm:py-3 gap-2 sm:gap-3 min-w-0">
      <GoogleDots size={8} />
      <span className="flex-1 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-medium truncate min-w-0">
        {displayed}<span className="animate-pulse">|</span>
      </span>
      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#4285F4] flex items-center justify-center shrink-0">
        <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
      </div>
    </div>
  );
}

/* ─── Static Data ─── */
const CAMPAIGN_PILLARS = [
  {
    icon: <Search className="w-7 h-7" />,
    title: "Search Ads",
    desc: "Capture buyers the exact moment they search for your product. We dominate high-intent keywords with surgical bid strategies and killer ad copy.",
    stat: "8.2x",
    statLabel: "Avg. ROAS",
    color: G_BLUE,
    bg: "#EBF2FF",
  },
  {
    icon: <ShoppingCart className="w-7 h-7" />,
    title: "Shopping & PMax",
    desc: "Feed optimization, product listing ads, and Performance Max campaigns engineered for e-commerce brands that want to scale aggressively.",
    stat: "312%",
    statLabel: "Revenue Growth",
    color: G_GREEN,
    bg: "#E8F5E9",
  },
  {
    icon: <Eye className="w-7 h-7" />,
    title: "Display & Remarketing",
    desc: "Retarget warm audiences across 3M+ sites in the Google Display Network. We close the loop on every visitor who didn't convert the first time.",
    stat: "67%",
    statLabel: "Lower CPA",
    color: G_RED,
    bg: "#FEECEB",
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Account Audit",
    desc: "We tear apart your existing account to identify every dollar of wasted spend, missed opportunity, and structural weakness.",
  },
  {
    step: "02",
    title: "Campaign Architecture",
    desc: "We rebuild your campaigns from scratch — tight ad groups, exact match types, and aggressive negative keyword lists.",
  },
  {
    step: "03",
    title: "Creative & Landing Pages",
    desc: "High-CTR ad copy paired with conversion-optimized landing pages designed to turn clicks into customers.",
  },
  {
    step: "04",
    title: "Scale & Maximize ROAS",
    desc: "Smart bidding strategies, audience layering, and budget scaling to maximize return on every dollar spent.",
  },
];



/* ─── Component ─── */
export default function GoogleAdsClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <main
      className="min-h-screen bg-white dark:bg-[#0B0C10] text-slate-900 dark:text-white font-sans overflow-x-hidden selection:bg-yellow-500/30"
      ref={containerRef}
    >
      <Navbar />

      {/* ═══════════════════════════════════════════════════════════════
          1. HERO — "Command Center"
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-0 md:pb-20 lg:pt-44 lg:pb-32 overflow-hidden min-h-[90vh] flex items-center">
        {/* Background — Google Ads yellow + logo image, with same ellipse curve as homepage */}
        <div
          className="absolute inset-0 z-0 overflow-hidden [clip-path:ellipse(200%_100%_at_50%_0%)] md:[clip-path:ellipse(120%_95%_at_50%_0%)]"
        >
          <Image
            src="/google-ads-hero.jpg"
            alt="Google Ads"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 hidden dark:block bg-[#0B0C10]/70" />
        </div>

        {/* Google-colored glows */}
        <div className="absolute top-[15%] right-[5%]  w-72 h-72 rounded-full blur-[100px] pointer-events-none" style={{ background: "rgba(66,133,244,0.08)" }} />
        <div className="absolute bottom-[10%] left-[5%] w-64 h-64 rounded-full blur-[100px] pointer-events-none" style={{ background: "rgba(52,168,83,0.07)" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ y: yParallax, opacity: opacityFade }}
          >
            {/* Google Dots badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-8 shadow-sm">
              <GoogleDots size={9} />
              <span className="text-sm font-semibold tracking-wide uppercase text-slate-800 dark:text-slate-300">
                Google Ads Management
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6">
              <span className="text-yellow-400 dark:text-white">Stop Burning Budget.</span> <br />
              <span className="text-white dark:text-yellow-500">Start Printing Revenue.</span>
            </h1>

            <p className="text-lg sm:text-xl text-yellow-400 dark:text-slate-400 max-w-lg leading-relaxed mb-8 font-medium">
              Every click tracked. Every dollar optimized. We engineer Google Ads
              campaigns that turn ad spend into predictable, scalable profit.
            </p>

            {/* Animated search bar */}
            <div className="mb-8">
              <TypingSearchBar />
            </div>

            <Link href="/contact">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 h-14 px-8 text-base font-bold rounded-full transition-all hover:scale-105 shadow-lg shadow-yellow-500/20">
                Get Your Free Ad Audit <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>

          {/* Right: Google Ads Campaign Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
            className="w-full block mt-10 lg:mt-0"
          >
            <div className="bg-white dark:bg-[#1e2030] rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-[#252836] gap-2">
                <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                  <GoogleDots size={8} />
                  <span className="text-[11px] sm:text-sm font-bold text-slate-700 dark:text-slate-300 leading-tight">Google Ads<span className="hidden sm:inline"> — Campaign Dashboard</span></span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block" />
                  <span className="text-[10px] sm:text-xs font-semibold text-green-600 dark:text-green-400">Live</span>
                </div>
              </div>

              <div className="p-3 sm:p-6">
                {/* Top KPI Row — 2-col on mobile, 4-col on sm+ */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6">
                  {[
                    { label: "ROAS",        value: "6.8x",   color: G_GREEN },
                    { label: "CTR",         value: "8.7%",   color: G_BLUE },
                    { label: "CPC",         value: "$1.24",  color: G_YELLOW },
                    { label: "Conv. Rate",  value: "6.4%",   color: G_RED },
                  ].map((kpi, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="text-center bg-slate-50 dark:bg-[#2a2d3e] rounded-xl px-1 sm:px-2 py-2 sm:py-3 border border-slate-100 dark:border-slate-700"
                    >
                      <p className="text-sm sm:text-base font-black" style={{ color: kpi.color }}>{kpi.value}</p>
                      <p className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">{kpi.label}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Animated Performance Chart */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">Revenue from Ads (Last 7 Days)</p>
                    <span className="text-xs font-bold text-green-500">+245% ↑</span>
                  </div>
                  <div className="relative h-28 bg-slate-50 dark:bg-[#2a2d3e] rounded-xl overflow-hidden p-3">
                    {/* Vertical grid lines */}
                    <div className="absolute inset-0 flex justify-between px-3 py-2 pointer-events-none">
                      {[...Array(7)].map((_, i) => (
                        <div key={i} className="w-px h-full bg-slate-200 dark:bg-slate-700 opacity-50" />
                      ))}
                    </div>
                    {/* SVG chart line */}
                    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <defs>
                        <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#4285F4" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#4285F4" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <motion.path
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 2, delay: 0.8, ease: "easeInOut" }}
                        d="M 0,75 L 16,68 L 32,58 L 48,42 L 64,30 L 80,15 L 100,5"
                        fill="none"
                        stroke={G_BLUE}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <motion.path
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 2 }}
                        d="M 0,75 L 16,68 L 32,58 L 48,42 L 64,30 L 80,15 L 100,5 L 100,100 L 0,100 Z"
                        fill="url(#chartFill)"
                      />
                    </svg>
                    {/* Animated dot at end */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 2.5 }}
                      className="absolute right-3 top-[10%] w-3 h-3 rounded-full border-2 border-white shadow-lg"
                      style={{ background: G_BLUE }}
                    />
                  </div>
                </div>

                {/* Keyword Bids */}
                <div>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">Top Keywords — Max Bid</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { kw: "google ads agency",    bid: "$3.20", color: G_BLUE  },
                      { kw: "ppc management",       bid: "$2.80", color: G_GREEN },
                      { kw: "increase roas",        bid: "$2.10", color: G_RED   },
                      { kw: "ecommerce ads",        bid: "$1.75", color: G_YELLOW},
                    ].map((k, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.2 + i * 0.1 }}
                        className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold border"
                        style={{ borderColor: k.color + "40", background: k.color + "12", color: k.color }}
                      >
                        <span>{k.kw}</span>
                        <span className="opacity-70">·</span>
                        <span>{k.bid}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          2. THE AD SPEND PROBLEM (Pain Point)
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white dark:bg-[#0B0C10] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Visual — Waste vs Revenue Split */}
            <div
              className="relative"
            >
              {/* Google Ads Logo Image */}
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-white">
                <Image
                  src="/google-ads-logo.jpg"
                  alt="Google Ads"
                  width={600}
                  height={400}
                  className="w-full h-auto object-contain p-4"
                />
              </div>

              {/* Floating Waste Stat */}
              <div
                className="absolute -bottom-6 -right-4 lg:-right-8 bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-2xl border border-slate-200 dark:border-slate-800"
              >
                <p className="text-4xl font-black text-red-500">76%</p>
                <p className="text-sm text-slate-500 font-medium max-w-[140px]">
                  of ad budgets wasted on irrelevant clicks
                </p>
              </div>
            </div>

            {/* Text */}
            <div>
              <div className="inline-flex items-center space-x-2 bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 px-3 py-1 rounded-full text-xs font-bold mb-6">
                <Zap className="w-4 h-4" /> The Ugly Truth
              </div>

              <h2 className="text-3xl md:text-5xl font-black mb-6">
                Your Google Ads are probably bleeding money.
              </h2>

              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                Most businesses set up campaigns with broad match keywords, zero
                negative lists, and landing pages that leak conversions. The
                result? You pay for clicks that never convert — and your
                competitor captures the sale instead.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "Broad match keywords burning budget on irrelevant searches",
                  "No negative keyword strategy filtering out junk traffic",
                  "Landing pages with 2% conversion rates (industry avg is 5.3%)",
                  "Bid strategies set to 'maximize clicks' instead of revenue",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start space-x-3 text-slate-700 dark:text-slate-300"
                  >
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 h-14 px-8 text-base font-bold rounded-full transition-all hover:scale-105"
                >
                  Fix My Campaigns <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          3. CAMPAIGN PILLARS (3 Cards)
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white dark:bg-[#0B0C10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-24">
            <h2 className="text-3xl md:text-5xl font-black mb-6">
              Full-Spectrum Ad Domination
            </h2>
            <p className="text-lg text-slate-650 dark:text-zinc-450 max-w-2xl mx-auto">
              We don&apos;t just run Search ads. We deploy an integrated campaign
              architecture that captures demand at every stage of the funnel.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {CAMPAIGN_PILLARS.map((pillar, i) => (
              <div
                key={i}
                className="flex flex-col items-start p-2 sm:p-4 group h-full"
              >
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm" 
                  style={{ background: pillar.bg, color: pillar.color }}
                >
                  {pillar.icon}
                </div>

                <h3 className="text-2xl md:text-3xl font-black mb-4 text-slate-900 dark:text-white tracking-tight">{pillar.title}</h3>
                <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
                  {pillar.desc}
                </p>

                <div className="mt-auto pt-6 border-t-2 w-12 transition-all duration-300 group-hover:w-full" style={{ borderColor: pillar.color }}>
                  <p className="text-4xl font-black tracking-tight" style={{ color: pillar.color }}>{pillar.stat}</p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">{pillar.statLabel}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          4. BEFORE vs AFTER (The Transformation)
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white dark:bg-[#0B0C10] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-24">
            <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-wide text-slate-900 dark:text-white">
              The <span className="text-yellow-500">Transformation</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              See the difference between a neglected ad account and one engineered by AlphaDigify.
            </p>
          </div>

          <div className="relative rounded-[2rem] overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#11121A] shadow-2xl">
            <div className="grid lg:grid-cols-2">
              {/* BEFORE */}
              <div className="p-10 lg:p-16 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 relative grayscale hover:grayscale-0 transition-all duration-700">
                <div className="absolute top-0 right-0 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold px-5 py-2 rounded-bl-2xl tracking-widest uppercase">
                  Unmanaged
                </div>
                
                <h3 className="text-2xl md:text-3xl font-black mb-12 text-slate-400 dark:text-slate-600">
                  Burning Budget
                </h3>

                <div className="space-y-8">
                  {[
                    { label: "Cost Per Click", value: "$4.82" },
                    { label: "Click-Through Rate", value: "1.2%" },
                    { label: "Conversion Rate", value: "1.8%" },
                    { label: "ROAS", value: "1.3x" },
                    { label: "Wasted Spend", value: "$3,200/mo" },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800/50 pb-4">
                      <span className="text-slate-500 dark:text-slate-500 font-semibold uppercase tracking-wider text-xs sm:text-sm">
                        {item.label}
                      </span>
                      <span className="text-lg sm:text-xl font-bold text-slate-400 dark:text-slate-600">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AFTER */}
              <div className="p-10 lg:p-16 relative bg-gradient-to-br from-yellow-50 to-white dark:from-[#1A1A12] dark:to-[#11121A] overflow-hidden group">
                <div className="absolute top-0 right-0 bg-yellow-500 text-slate-900 text-xs font-bold px-5 py-2 rounded-bl-2xl tracking-widest uppercase shadow-md z-20">
                  Optimized
                </div>
                
                {/* Glow & Animated Elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-yellow-400" />
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-yellow-400/20 blur-[100px] rounded-full pointer-events-none group-hover:scale-150 transition-transform duration-700" />
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-yellow-500/10 blur-[100px] rounded-full pointer-events-none group-hover:scale-150 transition-transform duration-700" />

                <h3 className="text-2xl md:text-3xl font-black mb-12 text-yellow-600 dark:text-yellow-400 flex items-center gap-3 relative z-10">
                  <Zap className="w-8 h-8 text-yellow-500" /> Revenue Machine
                </h3>

                <div className="space-y-8 relative z-10">
                  {[
                    { label: "Cost Per Click", value: "$1.24" },
                    { label: "Click-Through Rate", value: "8.7%" },
                    { label: "Conversion Rate", value: "6.4%" },
                    { label: "ROAS", value: "6.8x" },
                    { label: "Wasted Spend", value: "$0" },
                  ].map((item, i) => (
                    <div 
                      key={i} 
                      className="flex justify-between items-center border-b border-yellow-200/50 dark:border-yellow-500/20 pb-4"
                    >
                      <span className="text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider text-xs sm:text-sm">
                        {item.label}
                      </span>
                      <span className="text-xl sm:text-3xl font-black text-yellow-500 dark:text-yellow-400 drop-shadow-sm">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Center "VS" Badge */}
            <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white dark:bg-[#0B0C10] border-[4px] border-slate-50 dark:border-[#11121A] rounded-full items-center justify-center shadow-xl z-20">
              <span className="text-slate-300 dark:text-slate-600 font-black text-lg italic">VS</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          5. OPTIMIZATION PROCESS
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white dark:bg-[#0B0C10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-20">
            <div className="inline-flex items-center gap-2 bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20 text-yellow-700 dark:text-yellow-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5" /> How It Works
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              The <span className="text-yellow-500">Optimization Engine</span>
            </h2>
            <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              A relentless, 4-phase process to turn your ad account from a cost center into a revenue machine.
            </p>
          </div>

          <div className="relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-[2px] bg-slate-100 dark:bg-slate-800" />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-4">
              {PROCESS_STEPS.map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center relative group">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-20 h-20 rounded-full bg-white dark:bg-[#0B0C10] border-2 border-slate-100 dark:border-slate-800 flex items-center justify-center mb-6 relative z-10 group-hover:border-yellow-400 dark:group-hover:border-yellow-500 transition-colors shadow-sm"
                  >
                    <span className="text-2xl font-black text-slate-300 dark:text-slate-700 group-hover:text-yellow-500 transition-colors">{step.step}</span>
                  </motion.div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">{step.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Footer Text */}
          <div className="text-center mt-20">
            <h4 className="text-xl md:text-2xl font-black text-yellow-500 dark:text-yellow-400 uppercase tracking-widest">
              Surgical Precision + Scale = Maximum ROAS.
            </h4>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          6. FAQs
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-14 relative bg-white dark:bg-[#0B0C10] border-t border-slate-200 dark:border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-wide">
              Google Ads Management<br/>
              <span className="text-yellow-500">FAQs</span>
            </h2>
          </div>

          <div className="border-t-[1.5px] border-slate-200 dark:border-slate-800">
            {[
              {
                q: "How long does it take to see results from Google Ads?",
                a: "Because search ads target high-intent users, you can see traffic and leads on day one of campaign launch. However, significant performance scaling and bid optimization usually take 30 to 60 days as Google's smart bidding algorithms ingest conversion data and we actively prune negative keywords."
              },
              {
                q: "How much ad spend should I start with?",
                a: "There is no minimum, but we recommend a starting budget of at least $1,500 to $2,500 per month. This ensures we can capture enough click data to rapidly optimize campaign architecture, test ad creatives, and maximize your Return on Ad Spend (ROAS)."
              },
              {
                q: "What is PMax and do you recommend it?",
                a: "Performance Max (PMax) is Google’s automated asset-based campaign type that runs across Search, Shopping, YouTube, Display, and Maps. We highly recommend it for e-commerce brands, but only when paired with high-quality creative assets, precise audience signals, and robust negative keyword exclusions to prevent wasted budget."
              },
              {
                q: "How do you prevent wasted ad spend?",
                a: "We deploy a multi-layered budget safety system: strict exact-match keyword groups, massive custom negative keyword libraries compiled over years of managing ads, and offline conversion tracking. This ensures you only pay for clicks from high-intent buyers who actually want to purchase."
              },
              {
                q: "Will you optimize our landing pages too?",
                a: "Yes! A high-performing Google Ads campaign is only half the battle. If your landing page doesn't convert, you are throwing money away. We audit your existing landing pages, offer detailed CRO (Conversion Rate Optimization) advice, and can build custom, high-velocity landing pages designed to maximize conversion rates."
              }
            ].map((faq, i) => (
              <div 
                key={i}
                className="border-b-[1.5px] border-slate-200 dark:border-slate-800"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-start justify-between py-6 text-left group"
                >
                  <span className={`text-lg md:text-xl font-bold pr-8 transition-colors duration-300 ${openFaq === i ? 'text-yellow-500' : 'text-slate-900 dark:text-white group-hover:text-yellow-500'}`}>
                    {faq.q}
                  </span>
                  <span className={`shrink-0 ml-4 flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300 ${openFaq === i ? 'bg-yellow-50 dark:bg-yellow-500/10' : 'bg-slate-50 dark:bg-slate-900 group-hover:bg-slate-100 dark:group-hover:bg-slate-800'}`}>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openFaq === i ? 'rotate-180 text-yellow-500' : 'text-slate-400 dark:text-slate-500'}`} />
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
        </div>
      </section>

      <Footer />
    </main>
  );
}
