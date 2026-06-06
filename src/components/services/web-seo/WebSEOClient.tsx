/* eslint-disable react/no-unescaped-entities */
"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/public/Footer";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Search, Code, FileText, Link as LinkIcon,
  Target, Zap, Globe, TrendingUp, ChevronDown, Sparkles,
  BarChart3, ShieldCheck, Layers
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

/* ─── Static Data ─── */
const SEO_PILLARS = [
  {
    icon: <Code className="w-7 h-7" />,
    title: "Technical SEO",
    desc: "We rebuild your site's foundation — Core Web Vitals, schema markup, crawl budget management, and pristine site architecture so Google can index every page perfectly.",
    stat: "3x",
    statLabel: "Faster Indexation",
    color: "#FACC15",
    bg: "#FEF9C3",
  },
  {
    icon: <FileText className="w-7 h-7" />,
    title: "Semantic Content",
    desc: "Data-backed content clustering. We don't just target keywords; we build topical authority that forces Google to recognise you as the undisputed industry leader.",
    stat: "5.3x",
    statLabel: "Avg. Traffic Lift",
    color: "#34D399",
    bg: "#D1FAE5",
  },
  {
    icon: <LinkIcon className="w-7 h-7" />,
    title: "Off-Page Authority",
    desc: "Aggressive, high-DR link acquisition through digital PR and manual outreach. We secure placements on authoritative domains to push your rankings to #1.",
    stat: "87+",
    statLabel: "Avg. DR Gained",
    color: "#60A5FA",
    bg: "#DBEAFE",
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Deep Technical Audit",
    desc: "We deploy advanced crawlers to identify every indexation error, toxic link, and speed bottleneck holding your site back.",
  },
  {
    step: "02",
    title: "Keyword & Gap Analysis",
    desc: "We map exactly which high-intent keywords your competitors are stealing and calculate the difficulty to overtake them.",
  },
  {
    step: "03",
    title: "Architecture & Content",
    desc: "We fix the foundational code and deploy hyper-optimised semantic content clusters to establish topical dominance.",
  },
  {
    step: "04",
    title: "Authority Scaling",
    desc: "A relentless, monthly link-building velocity campaign to surge your domain authority past every competitor.",
  },
];

const FAQS = [
  {
    q: "How long does SEO take to show results?",
    a: "Most clients start seeing measurable ranking improvements within 60–90 days. Significant organic traffic growth typically becomes visible at the 4–6 month mark. SEO is a compounding asset — the longer we run the strategy, the more powerful and cost-efficient your results become.",
  },
  {
    q: "What makes your SEO different from other agencies?",
    a: "We don't sell reports — we sell outcomes. Every deliverable is tied directly to rankings and revenue. We combine elite technical engineering with content strategy and aggressive link acquisition in a single unified process, rather than treating them as separate silos.",
  },
  {
    q: "Do you work with e-commerce sites?",
    a: "Absolutely. E-commerce SEO is a specialty. We handle product page optimisation, faceted navigation, structured data for rich results, and category-level content strategy designed to capture high-intent buyer traffic at every stage of the funnel.",
  },
  {
    q: "Will you write the content, or do we?",
    a: "We handle everything. Our in-house content team produces fully SEO-optimised long-form articles, landing pages, and content clusters. All output goes through expert editorial review before publication.",
  },
  {
    q: "What reporting do you provide?",
    a: "You get a live dashboard with keyword ranking movements, organic traffic trends, backlink acquisition logs, and Core Web Vitals scores — updated in real time. Monthly strategy calls ensure complete transparency on every action taken.",
  },
];

const chartPoints = [18, 22, 20, 32, 44, 38, 62, 80, 76, 92, 100];

/* ─── Component ─── */
export default function WebSEOClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <main
      className="min-h-screen bg-white dark:bg-[#0B0C10] text-slate-900 dark:text-white font-sans overflow-x-hidden selection:bg-yellow-500/30"
      ref={containerRef}
    >
      <Navbar />

      {/* ═══════════════════════════════════════
          1. HERO
      ═══════════════════════════════════════ */}
      <section className="relative pt-32 pb-0 md:pb-24 lg:pt-44 lg:pb-32 overflow-visible min-h-0 lg:min-h-[90vh] flex items-center">
        {/* Background image with ellipse clip */}
        <div
          className="absolute inset-0 z-0 bg-black [clip-path:ellipse(200%_100%_at_50%_0%)] md:[clip-path:ellipse(120%_95%_at_50%_0%)]"
        >
          <Image
            src="/SEO.png"
            alt="SEO Background"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-[#0B0C10]/75" />
        </div>

        {/* Glows */}
        <div className="absolute top-[15%] right-[8%] w-80 h-80 rounded-full blur-[120px] pointer-events-none bg-yellow-500/10" />
        <div className="absolute bottom-[10%] left-[5%] w-64 h-64 rounded-full blur-[100px] pointer-events-none bg-amber-400/10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ y: yParallax, opacity: opacityFade }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-8 shadow-sm">
              <Search className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-semibold tracking-wide uppercase text-slate-200">
                Search Engine Optimisation
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6 text-white">
              We Don't Guess.<br />
              <span className="text-yellow-400">We Engineer Rankings.</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-lg leading-relaxed mb-10 font-medium">
              Turn Google into your most predictable revenue channel. We combine
              technical precision, semantic content, and aggressive link building
              to dominate the SERPs permanently.
            </p>

            <Link href="/contact">
              <Button
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 h-14 px-8 text-base font-bold rounded-full transition-all hover:scale-105 shadow-lg shadow-yellow-500/20"
              >
                Get Free SEO Audit <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>

          {/* Right: Organic Traffic Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, type: "spring" }}
            className="w-full block mt-8 md:mt-0 relative z-20 lg:translate-y-20 transform scale-[0.85] sm:scale-100 origin-center"
          >
            <div className="bg-white dark:bg-[#1e2030] rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden">
              {/* Header bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-[#252836]">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Organic Search Performance</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse inline-block" />
                  <span className="text-xs font-semibold text-green-500">Live</span>
                </div>
              </div>

              <div className="p-6">
                {/* KPI Row */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { label: "Organic Clicks", value: "124.5K", color: "#FACC15" },
                    { label: "Avg. Position", value: "#1.4", color: "#34D399" },
                    { label: "Keywords Top 3", value: "2,841", color: "#60A5FA" },
                  ].map((kpi, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="text-center bg-slate-50 dark:bg-[#2a2d3e] rounded-xl px-2 py-3 border border-slate-100 dark:border-slate-700"
                    >
                      <p className="text-base font-black" style={{ color: kpi.color }}>{kpi.value}</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">{kpi.label}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Animated Chart */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">Organic Traffic — Last 6 Months</p>
                    <span className="text-xs font-bold text-green-500">+245% ↑</span>
                  </div>
                  <div className="relative h-28 bg-slate-50 dark:bg-[#2a2d3e] rounded-xl overflow-hidden p-3">
                    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <defs>
                        <linearGradient id="seoGradFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#FACC15" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#FACC15" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <motion.path
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 2, delay: 0.8, ease: "easeInOut" }}
                        d={`M 0,${100 - chartPoints[0]} ${chartPoints.map((p, i) => `L ${i * 10},${100 - p}`).join(" ")}`}
                        fill="none"
                        stroke="#FACC15"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <motion.path
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 2 }}
                        d={`M 0,${100 - chartPoints[0]} ${chartPoints.map((p, i) => `L ${i * 10},${100 - p}`).join(" ")} L 100,100 L 0,100 Z`}
                        fill="url(#seoGradFill)"
                      />
                    </svg>
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 2.5 }}
                      className="absolute right-3 top-[5%] w-3 h-3 rounded-full border-2 border-white shadow-lg bg-yellow-400"
                    />
                  </div>
                </div>

                {/* SERP Positions */}
                <div>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">Top Ranking Keywords</p>
                  <div className="space-y-2">
                    {[
                      { kw: "best digital marketing agency", pos: "#1" },
                      { kw: "seo optimization service",     pos: "#2" },
                      { kw: "increase organic traffic",     pos: "#1" },
                    ].map((k, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 + i * 0.15 }}
                        className="flex items-center justify-between text-xs py-1.5 px-3 rounded-lg bg-slate-50 dark:bg-[#2a2d3e] border border-slate-100 dark:border-slate-700"
                      >
                        <span className="text-slate-700 dark:text-slate-300 font-medium truncate mr-2">{k.kw}</span>
                        <span className="font-black text-yellow-500 shrink-0">{k.pos}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          2. THE COST OF INACTION
      ═══════════════════════════════════════ */}
      <section className="py-12 md:py-16 bg-white dark:bg-[#0B0C10] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Visual */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-2xl"
              >
                <h3 className="text-xl font-bold mb-6 border-b border-slate-100 dark:border-slate-800 pb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-yellow-500" /> Where does search traffic go?
                </h3>
                <div className="space-y-5">
                  {[
                    { pos: "Position #1 (Your Competitor)", pct: "31.7%", w: "31.7%", color: "bg-yellow-500" },
                    { pos: "Position #2",                   pct: "24.7%", w: "24.7%", color: "bg-slate-400 dark:bg-slate-500" },
                    { pos: "Position #3",                   pct: "18.6%", w: "18.6%", color: "bg-slate-300 dark:bg-slate-600" },
                    { pos: "Page 2+ (Where you are)",       pct: "< 0.78%", w: "2%",  color: "bg-red-500", dim: true },
                  ].map((row, i) => (
                    <div key={i} className={row.dim ? "opacity-50" : ""}>
                      <div className="flex justify-between text-sm font-bold mb-1.5">
                        <span className="text-slate-900 dark:text-white flex items-center gap-1.5">
                          {row.dim && <Target className="w-4 h-4 text-red-500" />} {row.pos}
                        </span>
                        <span className={row.dim ? "text-slate-500" : "text-yellow-500"}>{row.pct}</span>
                      </div>
                      <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: row.w }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.2 }}
                          className={`h-full rounded-full ${row.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Floating badge */}
              <div className="absolute -bottom-5 -right-5 bg-yellow-400 rounded-2xl px-5 py-3 shadow-2xl">
                <p className="text-3xl font-black text-slate-900">75%</p>
                <p className="text-xs font-bold text-slate-800 max-w-[120px] leading-tight">of all traffic goes to the top 3 results</p>
              </div>
            </div>

            {/* Text */}
            <div>
              <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 px-3 py-1.5 rounded-full text-xs font-bold mb-6">
                <Zap className="w-4 h-4" /> The Cost of Inaction
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
                You are funding<br />your competition.
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                75% of all search traffic goes to the top 3 results. If your ideal
                customer is searching for your service right now and you are on Page 2,
                you aren't just losing a sale — you are handing that revenue directly
                to your competitor.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  "Traffic you don't have to pay for per click",
                  "Highest intent-to-buy users on the internet",
                  "Long-term compound ROI unlike paid ads",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium">
                    <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center shrink-0">
                      <TrendingUp className="w-3 h-3 text-slate-900" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/contact">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 h-14 px-8 font-bold rounded-full transition-all hover:scale-105">
                  Fix My Rankings <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          3. THREE PILLARS
      ═══════════════════════════════════════ */}
      <section className="py-12 md:py-16 bg-white dark:bg-[#0B0C10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
              The Anatomy of a<br /><span className="text-yellow-500">Ranking Strategy</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              SEO isn't magic — it's a mathematical certainty when you align these
              three pillars perfectly. We leave nothing to chance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {SEO_PILLARS.map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          4. PROCESS
      ═══════════════════════════════════════ */}
      <section className="py-12 md:py-16 bg-white dark:bg-[#0B0C10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-20">
            <div className="inline-flex items-center gap-2 bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20 text-yellow-700 dark:text-yellow-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5" /> How It Works
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              The <span className="text-yellow-500">Execution</span> Pipeline
            </h2>
            <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              A ruthless, methodical process to crawl out of the trenches and seize the top positions — permanently.
            </p>
          </div>

          <div className="relative">
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

          <div className="text-center mt-20">
            <h4 className="text-xl md:text-2xl font-black text-yellow-500 dark:text-yellow-400 uppercase tracking-widest">
              Precision + Authority = Page 1 Dominance.
            </h4>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          5. WHY US
      ═══════════════════════════════════════ */}
      <section className="py-12 md:py-16 bg-white dark:bg-[#0B0C10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Left: Text */}
              <div className="p-10 lg:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800">
                <div className="inline-flex items-center gap-2 bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20 text-yellow-700 dark:text-yellow-400 px-3 py-1 rounded-full text-xs font-bold mb-6 w-fit">
                  <ShieldCheck className="w-3.5 h-3.5" /> Why AlphaDigify
                </div>
                <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight">
                  Not an agency.<br /><span className="text-yellow-500">An engineering team.</span>
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                  Most SEO agencies send templated monthly reports and call it a day.
                  We embed into your growth stack — every action is tracked, every
                  decision is data-driven, and every dollar of your investment is
                  accounted for.
                </p>
                <ul className="space-y-4">
                  {[
                    "No lock-in contracts — results or we don't deserve your budget",
                    "Dedicated SEO strategist + technical engineer on every account",
                    "Transparent, real-time reporting dashboard — no black boxes",
                    "Proprietary link-prospecting system with 50,000+ vetted domains",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700 dark:text-slate-300 font-medium">
                      <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-slate-900 text-[10px] font-black">✓</span>
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: Stats */}
              <div className="p-10 lg:p-16 grid grid-cols-2 gap-6 content-center">
                {[
                  { value: "245%", label: "Avg. Traffic Increase", icon: <TrendingUp className="w-5 h-5" /> },
                  { value: "#1.4", label: "Avg. Keyword Position", icon: <Search className="w-5 h-5" /> },
                  { value: "6 Mo", label: "Avg. Time to Page 1", icon: <Globe className="w-5 h-5" /> },
                  { value: "98%", label: "Client Retention Rate", icon: <Layers className="w-5 h-5" /> },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:border-yellow-400/50 transition-colors"
                  >
                    <div className="text-yellow-500 mb-3">{stat.icon}</div>
                    <p className="text-3xl font-black text-slate-900 dark:text-white mb-1">{stat.value}</p>
                    <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          6. FAQs
      ═══════════════════════════════════════ */}
      <section className="py-14 relative bg-white dark:bg-[#0B0C10] border-t border-slate-200 dark:border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-wide">
              Web SEO<br /><span className="text-yellow-500">FAQs</span>
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
        </div>
      </section>


      <Footer />
    </main>
  );
}
