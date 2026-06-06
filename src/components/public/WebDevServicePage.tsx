/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/public/Footer";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Code, Database, Layout, Zap, Search,
  ShieldCheck, ChevronDown, Sparkles, Globe, CheckCircle2,
  TrendingUp, MousePointerClick, Clock
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/* ─── Animated Counter ─── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(to / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setCount(to); clearInterval(timer); }
      else setCount(start);
    }, 20);
    return () => clearInterval(timer);
  }, [inView, to]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── Live Code Typing ─── */
const CODE_LINES = [
  { text: "export default function Hero() {", color: "#FACC15" },
  { text: "  return (", color: "#94A3B8" },
  { text: "    <section className=\"hero\">", color: "#60A5FA" },
  { text: "      <h1>Scale & Convert</h1>", color: "#34D399" },
  { text: "      <Button>Get Started</Button>", color: "#F472B6" },
  { text: "    </section>", color: "#60A5FA" },
  { text: "  );", color: "#94A3B8" },
  { text: "}", color: "#FACC15" },
];

function CodeEditor() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [cursorLine, setCursorLine] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLines(v => {
        const next = v < CODE_LINES.length ? v + 1 : 0;
        setCursorLine(next);
        return next;
      });
    }, 500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="font-mono text-[11px] sm:text-xs leading-relaxed space-y-1 p-3 sm:p-4">
      {CODE_LINES.slice(0, visibleLines).map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-2"
        >
          <span className="text-slate-600 dark:text-slate-600 w-4 shrink-0 text-right">{i + 1}</span>
          <span style={{ color: line.color }}>{line.text}</span>
          {i === cursorLine - 1 && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="w-[2px] h-3.5 bg-yellow-400 inline-block ml-0.5 rounded-full"
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Animated Browser Mockup ─── */
function BrowserMockup() {
  const metrics = [
    { label: "PageSpeed", value: 99, suffix: "", color: "#34D399", icon: <Zap className="w-3 h-3" /> },
    { label: "CTR Boost", value: 47, suffix: "%", color: "#60A5FA", icon: <TrendingUp className="w-3 h-3" /> },
    { label: "Load Time", value: 0.8, suffix: "s", color: "#FACC15", icon: <Clock className="w-3 h-3" /> },
  ];

  return (
    <div className="relative w-full flex items-center justify-center mt-4 lg:mt-0">

      {/* Glow aura behind card */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-yellow-400/20 blur-[80px]" />
        <div className="absolute top-1/4 right-1/4 w-40 h-40 rounded-full bg-blue-500/10 blur-[60px]" />
      </div>

      {/* Floating Badge — top right */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.2, type: "spring" }}
        className="absolute -top-4 right-4 sm:right-8 z-30 flex items-center gap-1.5 bg-green-500 text-white text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1.5 rounded-full shadow-lg shadow-green-500/30"
      >
        <CheckCircle2 className="w-3 h-3" /> Live & Deployed
      </motion.div>

      {/* Floating Badge — bottom left */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.6, type: "spring" }}
        className="absolute -bottom-4 left-2 sm:left-4 z-30 flex items-center gap-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1.5 rounded-full shadow-lg"
      >
        <MousePointerClick className="w-3 h-3 text-yellow-500" /> 99% Lighthouse Score
      </motion.div>

      {/* Main Browser Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: 8 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-full max-w-[500px] z-10"
      >
        <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-[0_30px_80px_-10px_rgba(0,0,0,0.4)] bg-white dark:bg-[#1a1d2e]">

          {/* Browser Chrome */}
          <div className="bg-slate-100 dark:bg-[#12141f] border-b border-slate-200 dark:border-slate-700/60 px-3 py-2.5 flex items-center gap-2.5">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            {/* URL bar */}
            <div className="flex-1 bg-white dark:bg-slate-800 rounded-md h-6 flex items-center px-2.5 border border-slate-200 dark:border-slate-600 gap-1.5">
              <Globe className="w-3 h-3 text-green-500 shrink-0" />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-[10px] text-slate-500 dark:text-slate-400 font-mono truncate"
              >
                alphadigify.com/services
              </motion.span>
            </div>
          </div>

          {/* Two-pane layout */}
          <div className="flex" style={{ minHeight: 320 }}>
            {/* Left: Code editor pane */}
            <div className="w-1/2 border-r border-slate-100 dark:border-slate-700/60 bg-[#0d1117] overflow-hidden">
              {/* Editor tab bar */}
              <div className="flex items-center gap-0 border-b border-slate-700/60 text-[9px] font-mono">
                <div className="bg-[#1a1d2e] text-yellow-400 px-3 py-1.5 border-r border-slate-700/60 border-t-2 border-t-yellow-400">
                  index.tsx
                </div>
                <div className="text-slate-600 px-3 py-1.5">
                  styles.css
                </div>
              </div>
              <CodeEditor />
            </div>

            {/* Right: Live preview pane */}
            <div className="w-1/2 bg-white dark:bg-[#1a1d2e] flex flex-col">
              {/* Preview header */}
              <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Preview</span>
                <motion.span
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-[9px] text-green-500 font-bold flex items-center gap-1"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                  Live
                </motion.span>
              </div>

              {/* Preview content */}
              <div className="flex-1 p-3 space-y-2.5 overflow-hidden">
                {/* Hero skeleton */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-1.5 pt-1"
                >
                  <motion.div
                    animate={{ width: ["60%", "82%", "75%"] }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                    className="h-3 bg-slate-800 dark:bg-white/80 rounded"
                    style={{ width: "75%" }}
                  />
                  <div className="h-3 bg-slate-800 dark:bg-white/80 rounded w-[55%]" />
                  <div className="h-2 bg-slate-300 dark:bg-slate-600 rounded w-[65%] mt-1" />
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-16 h-5 bg-yellow-400 rounded-full mt-2 flex items-center justify-center"
                  >
                    <span className="text-[7px] font-black text-slate-900">GET STARTED</span>
                  </motion.div>
                </motion.div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-1.5 pt-0.5">
                  {metrics.map((m, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + i * 0.15 }}
                      className="rounded-lg p-1.5 border border-slate-100 dark:border-slate-700/60 bg-slate-50 dark:bg-slate-800/40 text-center"
                    >
                      <div className="flex items-center justify-center mb-0.5" style={{ color: m.color }}>{m.icon}</div>
                      <p className="text-[9px] font-black" style={{ color: m.color }}>
                        <Counter to={typeof m.value === "number" && m.value < 10 ? m.value * 10 : m.value as number} suffix={m.suffix} />
                      </p>
                      <p className="text-[7px] text-slate-400 mt-0.5 leading-tight">{m.label}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Card skeletons */}
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { color: "#60A5FA" },
                    { color: "#34D399" },
                  ].map((c, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.1 + i * 0.2, type: "spring" }}
                      className="h-16 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-700/60 p-2"
                    >
                      <div className="w-5 h-5 rounded-md mb-1.5" style={{ background: c.color + "33" }}>
                        <div className="w-full h-full rounded-md" style={{ background: c.color + "55" }} />
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full" />
                      <div className="w-3/4 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mt-1" />
                    </motion.div>
                  ))}
                </div>

                {/* Bottom bar */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="flex items-center gap-1.5 pt-0.5"
                >
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-yellow-400"
                  />
                  <div className="h-1.5 bg-yellow-400/30 rounded-full flex-1" />
                  <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full w-8" />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Bottom status bar */}
          <div className="px-3 py-1.5 bg-slate-50 dark:bg-[#12141f] border-t border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[9px] text-green-500 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" /> Build Passing
              </span>
              <span className="text-[9px] text-slate-400">TypeScript</span>
            </div>
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-[9px] text-yellow-500 font-mono"
            >
              Hot Reload ⚡
            </motion.span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}


/* ─── Static Data ─── */

const CAPABILITIES = [
  { icon: Layout, title: "Responsive UI/UX", desc: "Pixel-perfect interfaces that perform flawlessly from ultra-wide monitors to the smallest mobile screens.", color: "#FACC15" },
  { icon: Code, title: "Next.js & React", desc: "Blazing-fast, SEO-friendly applications built on the modern stack — React, Next.js, TypeScript, and Tailwind.", color: "#60A5FA" },
  { icon: Database, title: "Backend & APIs", desc: "Scalable databases and secure REST/GraphQL APIs using Node.js, Prisma, or serverless cloud infrastructure.", color: "#34D399" },
  { icon: Zap, title: "Performance First", desc: "Advanced caching, edge networks, and image optimisation. Every millisecond counts for conversions.", color: "#F59E0B" },
  { icon: Search, title: "Technical SEO Built-in", desc: "Semantic HTML, dynamic sitemaps, and structured data so your site ranks on Google from day one.", color: "#A78BFA" },
  { icon: ShieldCheck, title: "Enterprise Security", desc: "End-to-end encryption, DDoS protection, and secure OAuth flows to keep your business and users safe.", color: "#F472B6" },
];

const PROCESS_STEPS = [
  { step: "01", title: "Discovery & Strategy", desc: "We audit your goals, competitors, and technical requirements to define a bulletproof project blueprint." },
  { step: "02", title: "UI/UX Design", desc: "High-fidelity Figma prototypes reviewed and approved before a single line of code is written." },
  { step: "03", title: "Engineering & Build", desc: "Full-stack development with daily progress updates, staging environments, and rigorous QA testing." },
  { step: "04", title: "Launch & Growth", desc: "Zero-downtime deployment, performance monitoring, and ongoing retainer support to keep you scaling." },
];

const FAQS = [
  { q: "What's your typical project timeline?", a: "Most marketing websites take 3–5 weeks from kickoff to launch. Complex web applications or e-commerce platforms typically run 6–12 weeks. We always agree on a fixed timeline upfront with milestone deliverables so there are no surprises." },
  { q: "Do you offer ongoing maintenance?", a: "Yes. Every project includes a 30-day post-launch support window. After that, we offer flexible monthly retainer plans covering hosting, security updates, performance monitoring, and new feature development." },
  { q: "What technology stack do you use?", a: "Our primary stack is Next.js 14 (App Router), TypeScript, Tailwind CSS, and Prisma on the frontend/backend, deployed on Vercel or AWS. For e-commerce we use Shopify Hydrogen or WooCommerce. We always choose the right tool for the job, not the most fashionable one." },
  { q: "Do you build e-commerce sites?", a: "Absolutely. We specialise in high-converting e-commerce builds — Shopify custom themes, headless Shopify with Next.js, WooCommerce, and fully custom storefronts. Every build is optimised for speed and conversion rate from the ground up." },
  { q: "Will my site be mobile-friendly?", a: "Every site we build is mobile-first by default. We design and test across dozens of device sizes and browsers before any project goes live. Mobile performance is non-negotiable." },
];

/* ─── Main Component ─── */
export default function WebDevServicePageRedesigned() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-white dark:bg-[#0B0C10] text-slate-900 dark:text-white font-sans overflow-x-hidden selection:bg-yellow-500/30">
      <Navbar />

      {/* ═══════════════════════════════════════
          1. HERO
      ═══════════════════════════════════════ */}
      <section className="relative pt-28 pb-0 md:pb-16 lg:pt-40 lg:pb-24 overflow-visible min-h-0 lg:min-h-[90vh] flex items-center">
        {/* Background */}
        <div className="absolute inset-0 z-0 bg-black [clip-path:ellipse(200%_100%_at_50%_0%)] md:[clip-path:ellipse(120%_95%_at_50%_0%)]">
          <div className="absolute inset-0 z-0 opacity-40">
            <Image src="/Web.jpg" alt="Web Development" fill className="object-cover object-center" priority />
          </div>
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-black/40" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-yellow-500/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

            {/* Left Copy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 flex flex-col items-start text-left text-white"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs sm:text-sm font-semibold mb-5 sm:mb-6"
              >
                <Sparkles className="w-3.5 h-3.5" /> Next-Gen Web Engineering
              </motion.div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.08] mb-5 sm:mb-6 tracking-tight">
                Websites That{" "}
                <span className="text-yellow-400 relative">
                  Scale
                  <motion.span
                    className="absolute -bottom-1 left-0 w-full h-[3px] bg-yellow-400/50 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    style={{ originX: 0 }}
                  />
                </span>{" "}
                &{" "}
                <span className="text-yellow-400">Convert</span>.
              </h1>

              <p className="text-base sm:text-xl text-slate-300 mb-6 sm:mb-8 max-w-xl leading-relaxed">
                We engineer lightning-fast, high-converting websites and web apps using the modern stack. Stop settling for slow templates.
              </p>

              {/* Tech stack chips */}
              <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
                {["Next.js", "TypeScript", "Tailwind", "Node.js", "Vercel"].map((t, i) => (
                  <motion.span
                    key={t}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.07 }}
                    className="px-3 py-1 text-[11px] sm:text-xs font-semibold rounded-full bg-white/5 border border-white/10 text-slate-300 backdrop-blur-sm"
                  >
                    {t}
                  </motion.span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Link href="/contact">
                  <Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-bold h-12 sm:h-14 px-6 sm:px-8 rounded-full text-sm sm:text-lg w-full sm:w-auto group shadow-[0_0_30px_rgba(250,204,21,0.25)] transition-all">
                    Start Your Project <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right — Animated Browser Mockup */}
            <div className="w-full lg:w-1/2 mt-4 sm:mt-8 lg:mt-0 relative z-20 lg:translate-y-16">
              <BrowserMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          2. STATS BAR
      ═══════════════════════════════════════ */}
      <section className="py-10 sm:py-12 bg-slate-50 dark:bg-white/[0.02] border-y border-slate-200 dark:border-white/5 mt-10 sm:mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            {[
              { value: 150, suffix: "+", label: "Sites Shipped" },
              { value: 99, suffix: "%", label: "Lighthouse Score" },
              { value: 2, suffix: "x", label: "Avg. Conv. Lift" },
              { value: 12, suffix: "h", label: "Avg. Support SLA" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="text-2xl sm:text-4xl font-black text-yellow-500 mb-1 tabular-nums">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          3. CAPABILITIES GRID
      ═══════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-white dark:bg-[#0B0C10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 sm:mb-6">
              Engineering <span className="text-yellow-500">Excellence</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
              We build custom solutions from the ground up, ensuring your platform is secure, scalable, and impossible to ignore.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {CAPABILITIES.map((cap, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 hover:border-yellow-400/50 transition-colors duration-300 relative overflow-hidden"
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                  style={{ background: `radial-gradient(ellipse at top left, ${cap.color}0D 0%, transparent 70%)` }}
                />
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-4 sm:mb-6 transition-colors duration-300"
                  style={{ background: cap.color + "1A" }}
                >
                  <cap.icon className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: cap.color }} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-3">{cap.title}</h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">{cap.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          4. PROCESS
      ═══════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-slate-50 dark:bg-white/[0.02] border-y border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">How We Build</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 hover:border-yellow-400/50 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute -right-4 -top-4 text-[90px] sm:text-[120px] font-black text-slate-100 dark:text-white/[0.03] leading-none select-none group-hover:scale-110 transition-transform duration-500">
                  {step.step}
                </div>
                <div className="relative z-10">
                  <div className="text-yellow-500 font-bold mb-3 sm:mb-4 tracking-widest uppercase text-xs sm:text-sm">Step {step.step}</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4">{step.title}</h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          5. FAQ
      ═══════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-white dark:bg-[#0B0C10]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-12"
          >
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">Questions?</h2>
          </motion.div>
          <div className="space-y-3 sm:space-y-4">
            {FAQS.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="text-sm sm:text-lg font-bold text-slate-900 dark:text-white pr-4">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 text-slate-400 transition-transform duration-300 shrink-0 ${openFaq === i ? "rotate-180 text-yellow-500" : ""}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-4 sm:pb-5 pt-0 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}