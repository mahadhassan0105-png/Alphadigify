/* eslint-disable react/no-unescaped-entities */
"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/public/Footer";
import { Button } from "@/components/ui/button";
import {
  Star,
  ArrowRight,
  ChevronDown,
  Sparkles,
  TrendingUp,
  AlertCircle,
  Zap,
  Eye,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

/* ─── Platform brand colors ─── */
const AMAZON_COLOR = "#FF9900";
const WALMART_COLOR = "#0071DC";
const EBAY_COLOR   = "#E53238";
const GOOGLE_COLOR = "#4285F4";

/* ─── Animated Star Rating ─── */
function AnimatedStars({ rating = 5, size = 20 }: { rating?: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0, rotate: -30 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.4 + i * 0.1, type: "spring", stiffness: 300 }}
        >
          <Star
            style={{ width: size, height: size }}
            className={i <= rating ? "text-yellow-400 fill-yellow-400" : "text-slate-300 dark:text-slate-700"}
          />
        </motion.span>
      ))}
    </span>
  );
}

/* ─── Platform Data ─── */
const PLATFORMS = [
  {
    name: "Amazon",
    color: AMAZON_COLOR,
    bg: "#FFF4E0",
    darkBg: "rgba(255,153,0,0.08)",
    stat: "500+",
    statLabel: "Verified Reviews / Month",
    icon: <ShoppingBagIcon color={AMAZON_COLOR} />,
    desc: "We drive a systematic flow of authentic product reviews, suppress policy-violating negatives, and engineer your product listing to convert at industry-best rates.",
  },
  {
    name: "Walmart",
    color: WALMART_COLOR,
    bg: "#E6F3FF",
    darkBg: "rgba(0,113,220,0.08)",
    stat: "4.7★",
    statLabel: "Avg. Seller Rating",
    icon: <ShoppingBagIcon color={WALMART_COLOR} />,
    desc: "Build seller credibility on Walmart Marketplace with a sustained cadence of verified buyer reviews that push your products to the top of search results.",
  },
  {
    name: "eBay",
    color: EBAY_COLOR,
    bg: "#FFECEE",
    darkBg: "rgba(229,50,56,0.08)",
    stat: "98%",
    statLabel: "Positive Feedback Score",
    icon: <ShoppingBagIcon color={EBAY_COLOR} />,
    desc: "Protect and elevate your eBay feedback score. We manage buyer communications, resolve disputes, and generate consistent 5-star feedback to lock in Top Rated Seller status.",
  },
  {
    name: "TikTok Shop",
    color: "#69C9D0",
    bg: "#E8FAFB",
    darkBg: "rgba(105,201,208,0.08)",
    stat: "3x",
    statLabel: "Review Velocity Increase",
    icon: <TikTokIcon />,
    desc: "Creator-generated authentic reviews and post-purchase UGC campaigns that build social proof at scale — turning buyers into organic brand advocates on TikTok Shop.",
  },
  {
    name: "Google",
    color: GOOGLE_COLOR,
    bg: "#EBF2FF",
    darkBg: "rgba(66,133,244,0.08)",
    stat: "4.9★",
    statLabel: "Google Business Rating",
    icon: <GoogleDotsIcon />,
    desc: "Dominate local and brand search with a relentless stream of Google Business reviews. Higher ratings = lower CPC on Google Ads and higher trust conversion rates.",
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Deep Review Audit",
    desc: "We audit your current review profile across all platforms — identifying gaps, negative patterns, and velocity opportunities.",
  },
  {
    step: "02",
    title: "Velocity Strategy",
    desc: "Custom outreach sequences, follow-up automations, and incentive-free review request funnels built for each marketplace's policies.",
  },
  {
    step: "03",
    title: "Organic Outreach",
    desc: "We deploy white-hat buyer outreach, UGC creator collaboration, and post-purchase flows that generate a steady stream of genuine 5-star reviews.",
  },
  {
    step: "04",
    title: "Shield & Monitor",
    desc: "Real-time review monitoring, instant response playbooks, and aggressive policy-compliant dispute escalation to protect your hard-earned rating.",
  },
];

const FAQS = [
  {
    q: "Are these reviews real and compliant with platform policies?",
    a: "100% yes. Every review we generate is from a genuine buyer through fully white-hat, policy-compliant outreach. We never use fake reviews, review farms, or incentivized methods that violate Amazon, Walmart, eBay, TikTok, or Google's terms of service. We protect your account above all else.",
  },
  {
    q: "How long does it take to see results?",
    a: "You'll typically see the first batch of new verified reviews within 14–21 days of launching. Significant rating improvements and increased review velocity happen within 30–60 days. The compounding effect — higher ratings driving more sales driving more reviews — kicks in after 90 days.",
  },
  {
    q: "Can you remove negative reviews?",
    a: "For reviews that violate marketplace policies (fake, competitor sabotage, unverified purchases), we file formal disputes and have a high success rate in getting them removed. For legitimate negative reviews, we use professional response strategies that neutralize the damage and demonstrate excellent customer service to potential buyers.",
  },
  {
    q: "Do you manage reviews across multiple platforms simultaneously?",
    a: "Yes — that's our specialty. We run unified review management campaigns across all 5 platforms (Amazon, Walmart, eBay, TikTok Shop, Google) with platform-specific strategies for each, all managed from a single point of contact.",
  },
  {
    q: "What happens to my review profile if I stop the service?",
    a: "The reviews we generate are permanent. Your rating improvements and accumulated social proof remain on your listings forever. We also provide a maintenance playbook so you can sustain the momentum internally after scaling.",
  },
];

/* ─── Icon helpers ─── */
function ShoppingBagIcon({ color }: { color: string }) {
  return <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} stroke={color} className="w-6 h-6 sm:w-7 sm:h-7"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>;
}
function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 sm:w-7 sm:h-7">
      <path d="M19.321 5.562a5.124 5.124 0 01-.443-.258 6.228 6.228 0 01-1.137-1.002 6.26 6.26 0 01-1.5-3.302h.004v14.53a2.85 2.85 0 01-2.847 2.847 2.85 2.85 0 01-2.847-2.847 2.85 2.85 0 012.847-2.847c.275 0 .54.039.79.112V9.675a6.27 6.27 0 00-.79-.05 6.28 6.28 0 00-6.28 6.28 6.28 6.28 0 006.28 6.28 6.28 6.28 0 006.28-6.28V8.662a9.768 9.768 0 005.716 1.823V7.057a6.273 6.273 0 01-2.073-1.495z" fill="#69C9D0"/>
    </svg>
  );
}
function GoogleDotsIcon() {
  return (
    <span className="inline-flex gap-[3px] items-center">
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4285F4", display: "inline-block" }} />
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#EA4335", display: "inline-block" }} />
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#FBBC05", display: "inline-block" }} />
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#34A853", display: "inline-block" }} />
    </span>
  );
}

/* ─── Main Component ─── */
export default function ReviewsClient() {
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

      {/* ═══════════════════════════════════════════════
          1. HERO
      ═══════════════════════════════════════════════ */}
      <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pt-44 lg:pb-32 overflow-hidden min-h-[90vh] flex items-center">
        {/* Background ellipse */}
        <div
          className="absolute inset-0 z-0 overflow-hidden"
          style={{ clipPath: "ellipse(140% 95% at 50% 0%)" }}
        >
          {/* Hero background image */}
          <Image
            src="/reviews-hero-bg.jpg"
            alt="Reviews Management Background"
            fill
            priority
            className="object-cover object-center opacity-30 select-none pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-[#0B0C10]/85 to-black/95" />
          {/* Star pattern overlay */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle, #facc15 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10] via-transparent to-transparent hidden dark:block" />
        </div>

        {/* Glows */}
        <div className="absolute top-[10%] left-[5%] w-48 sm:w-80 h-48 sm:h-80 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none" style={{ background: "rgba(250,204,21,0.07)" }} />
        <div className="absolute bottom-[5%] right-[10%] w-40 sm:w-64 h-40 sm:h-64 rounded-full blur-[70px] sm:blur-[100px] pointer-events-none" style={{ background: "rgba(250,204,21,0.05)" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center w-full">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ y: yParallax, opacity: opacityFade }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/20 backdrop-blur-md px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full mb-6 sm:mb-8">
              <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide uppercase text-yellow-300">
                Reviews Management
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.1] sm:leading-[1.05] tracking-tight mb-4 sm:mb-6">
              <span className="text-white">Reviews Are Your</span>
              <br />
              <span className="text-yellow-400">#1 Sales Weapon.</span>
              <br />
              <span className="text-white">Start Using Them.</span>
            </h1>

            <p className="text-sm sm:text-lg lg:text-xl text-slate-300 max-w-lg leading-relaxed mb-6 sm:mb-8">
              93% of buyers read reviews before purchasing. We engineer a relentless flow of authentic 5-star reviews across Amazon, Walmart, eBay, TikTok Shop, and Google — and protect your rating like a fortress.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <Link href="/contact" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-400 text-slate-900 h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base font-bold rounded-full transition-all hover:scale-105 shadow-lg shadow-yellow-500/25">
                  Build My Review Profile <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </Link>
              <Link href="#platforms" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base font-semibold rounded-full border-white/20 text-white hover:bg-white/10 transition-all">
                  See Platforms
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right: Animated Review Dashboard Mockup (Visible on both mobile & desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
            className="w-full mt-4 lg:mt-0 max-w-md mx-auto lg:max-w-none"
          >
            <div className="bg-white dark:bg-[#1a1b26] rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-700/60 shadow-2xl overflow-hidden">
              {/* Dashboard header */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-[#1e2030]">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">AlphaDigify — Reviews Dashboard</span>
                </div>
                <span className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-green-500">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block" />
                  Live
                </span>
              </div>

              <div className="p-4 sm:p-6">
                {/* Overall Rating */}
                <div className="text-center mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-slate-100 dark:border-slate-800">
                  <motion.p
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, type: "spring" }}
                    className="text-4xl sm:text-5xl font-black text-yellow-500 mb-1.5 sm:mb-2"
                  >
                    4.9
                  </motion.p>
                  <AnimatedStars rating={5} size={20} />
                  <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1.5 sm:mt-2 font-medium">Average across all platforms</p>
                </div>

                {/* Platform breakdown */}
                <div className="space-y-2.5 sm:space-y-3">
                  {[
                    { platform: "Amazon", rating: 4.9, reviews: 2847, color: AMAZON_COLOR },
                    { platform: "Walmart", rating: 4.8, reviews: 934, color: WALMART_COLOR },
                    { platform: "eBay", rating: 4.9, reviews: 1203, color: EBAY_COLOR },
                    { platform: "TikTok Shop", rating: 4.7, reviews: 512, color: "#69C9D0" },
                    { platform: "Google", rating: 5.0, reviews: 389, color: GOOGLE_COLOR },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + i * 0.1 }}
                      className="flex items-center gap-2 sm:gap-3"
                    >
                      <span className="text-[11px] sm:text-xs font-bold text-slate-600 dark:text-slate-400 w-16 sm:w-20 shrink-0 truncate">{item.platform}</span>
                      <div className="flex-1 h-2 sm:h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(item.rating / 5) * 100}%` }}
                          transition={{ delay: 1.2 + i * 0.1, duration: 0.6 }}
                          className="h-full rounded-full"
                          style={{ background: item.color }}
                        />
                      </div>
                      <span className="text-[11px] sm:text-xs font-black shrink-0" style={{ color: item.color }}>{item.rating}★</span>
                      <span className="text-[10px] text-slate-400 shrink-0 w-8 sm:w-10 text-right">{item.reviews.toLocaleString()}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom stat */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8 }}
                  className="mt-4 pt-4 sm:mt-5 sm:pt-5 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center"
                >
                  <span className="text-[11px] sm:text-xs text-slate-500">Reviews this month</span>
                  <span className="text-xs sm:text-sm font-black text-green-500">+312 ↑ 48%</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          2. WHY REVIEWS MATTER (Stats)
      ═══════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 bg-white dark:bg-[#0B0C10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-14"
          >
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold mb-4 sm:mb-5">
              <AlertCircle className="w-3.5 h-3.5" /> The Cold Hard Truth
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black mb-3 sm:mb-5 leading-tight">
              Your customers make decisions<br />
              <span className="text-yellow-500">based on what others say.</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto px-2">
              Reviews aren't just social proof — they're the single highest-leverage lever in your entire sales funnel.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[
              { stat: "93%", label: "of buyers read reviews before purchasing", icon: <Eye className="w-6 h-6 sm:w-7 sm:h-7" />, color: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-500/10" },
              { stat: "4.0★+", label: "minimum rating required to convert modern shoppers", icon: <Star className="w-6 h-6 sm:w-7 sm:h-7" />, color: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-500/10" },
              { stat: "+9%", label: "revenue increase from every 1-star rating improvement", icon: <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7" />, color: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-500/10" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className={`text-center p-6 sm:p-8 bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm ${i === 2 ? 'sm:col-span-2 md:col-span-1' : ''}`}
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-5`}>
                  {item.icon}
                </div>
                <p className="text-3xl sm:text-4xl font-black text-yellow-500 mb-2 sm:mb-3">{item.stat}</p>
                <p className="text-slate-600 dark:text-slate-400 font-medium text-xs sm:text-sm leading-relaxed">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          3. PLATFORM PILLARS
      ═══════════════════════════════════════════════ */}
      <section id="platforms" className="py-14 sm:py-24 bg-white dark:bg-[#0B0C10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-16 lg:mb-24"
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black mb-4 sm:mb-6 leading-tight">
              One Agency.<br />
              <span className="text-yellow-500">Every Platform. Every Review.</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto px-2">
              We don't just manage reviews on one marketplace. We engineer your entire review ecosystem — across all 5 major platforms — simultaneously.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {PLATFORMS.map((platform, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="group relative bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 overflow-hidden transition-all duration-300 hover:shadow-xl"
                style={{ borderTopColor: platform.color, borderTopWidth: 3 }}
              >
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl sm:rounded-t-3xl" style={{ background: platform.color }} />
                {/* Glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl sm:rounded-3xl"
                  style={{ background: `radial-gradient(circle at top left, ${platform.color}08 0%, transparent 60%)` }}
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
                      style={{ background: platform.bg }}
                    >
                      {platform.icon}
                    </div>
                    <AnimatedStars rating={5} size={13} />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black mb-2 sm:mb-3" style={{ color: platform.color }}>{platform.name}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4 sm:mb-6">{platform.desc}</p>

                  <div className="pt-4 sm:pt-5 border-t border-slate-100 dark:border-slate-800">
                    <p className="text-2xl sm:text-3xl font-black" style={{ color: platform.color }}>{platform.stat}</p>
                    <p className="text-[10px] sm:text-xs text-slate-500 font-semibold mt-1 uppercase tracking-wider">{platform.statLabel}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          4. THE REVIEW ENGINE (Process Timeline)
      ═══════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 relative bg-white dark:bg-[#0B0C10]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-14 sm:mb-24 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-wide">
              The{" "}
              <span className="relative inline-block">
                Review Engine
                <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-yellow-400 dark:bg-yellow-500" />
              </span>
            </h2>
            <p className="mt-6 sm:mt-8 text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto px-2">
              A relentless, 4-phase system engineered to build unassailable review authority across every platform you sell on.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative mt-8 sm:mt-12 mb-12 sm:mb-20">
            {/* Horizontal line (desktop) */}
            <div className="hidden md:block absolute top-[4.5rem] left-0 w-full h-[2px] bg-yellow-400 dark:bg-yellow-500" />
            {/* Vertical line (mobile) */}
            <div className="block md:hidden absolute left-4 sm:left-6 top-2 bottom-6 w-[2px] bg-yellow-400 dark:bg-yellow-500" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
              {PROCESS_STEPS.map((step, i) => {
                const isActive = i === 3;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="relative flex md:flex-col items-start md:items-center text-left md:text-center group pl-10 sm:pl-14 md:pl-0"
                  >
                    <h3 className={`w-24 sm:w-28 md:w-auto text-sm sm:text-base md:text-xl font-bold uppercase tracking-widest md:mb-6 pt-0.5 md:pt-0 ${isActive ? "text-yellow-500" : "text-slate-900 dark:text-white"}`}>
                      PHASE {step.step}
                    </h3>
                    {/* Circle marker */}
                    <div className={`shrink-0 z-10 flex items-center justify-center bg-yellow-400 dark:bg-yellow-500 rounded-full group-hover:scale-110 transition-transform duration-300 absolute left-[-17px] sm:left-[-23px] md:relative md:left-auto md:mx-auto md:mb-6 ${isActive ? "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 top-0 md:top-auto" : "w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 top-1 md:top-auto my-0 md:my-2"}`} />
                    <div className="flex flex-col items-start md:items-center px-1 sm:px-2">
                      <p className="text-slate-900 dark:text-white text-sm sm:text-base font-extrabold uppercase tracking-wider mb-1 sm:mb-2">{step.title}</p>
                      <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-medium leading-relaxed max-w-[240px] md:max-w-[220px]">{step.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center px-2"
          >
            <h4 className="text-base sm:text-xl md:text-2xl font-black text-yellow-500 dark:text-yellow-400 uppercase tracking-widest leading-relaxed">
              Authentic Reviews + Velocity + Protection = Marketplace Dominance.
            </h4>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          5. THE TRANSFORMATION (Before / After)
      ═══════════════════════════════════════════════ */}
      <section className="py-14 sm:py-24 bg-white dark:bg-[#0B0C10] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16 lg:mb-24">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black mb-3 sm:mb-6 uppercase tracking-wide text-slate-900 dark:text-white">
              The <span className="text-yellow-500">Transformation</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto px-2">
              See exactly what happens to a listing before and after AlphaDigify's review management system takes over.
            </p>
          </div>

          <div className="relative rounded-2xl sm:rounded-[2rem] overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#11121A] shadow-2xl">
            <div className="grid lg:grid-cols-2">
              {/* BEFORE */}
              <div className="p-6 sm:p-10 lg:p-16 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 relative grayscale hover:grayscale-0 transition-all duration-700">
                <div className="absolute top-0 right-0 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] sm:text-xs font-bold px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-bl-xl sm:rounded-bl-2xl tracking-widest uppercase">
                  Unmanaged
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black mb-6 sm:mb-12 text-slate-400 dark:text-slate-600">
                  Neglected Profile
                </h3>
                <div className="space-y-4 sm:space-y-8">
                  {[
                    { label: "Average Rating", value: "2.8★" },
                    { label: "Total Reviews", value: "47" },
                    { label: "Monthly Review Rate", value: "2/month" },
                    { label: "Conversion Rate", value: "1.1%" },
                    { label: "Negative Reviews", value: "12 unanswered" },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800/50 pb-3 sm:pb-4 gap-2">
                      <span className="text-slate-500 dark:text-slate-500 font-semibold uppercase tracking-wider text-[11px] sm:text-xs md:text-sm">{item.label}</span>
                      <span className="text-sm sm:text-lg md:text-xl font-bold text-slate-400 dark:text-slate-600 shrink-0">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AFTER */}
              <div className="p-6 sm:p-10 lg:p-16 relative bg-gradient-to-br from-yellow-50 to-white dark:from-[#1A1A12] dark:to-[#11121A] overflow-hidden group">
                <div className="absolute top-0 right-0 bg-yellow-500 text-slate-900 text-[10px] sm:text-xs font-bold px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-bl-xl sm:rounded-bl-2xl tracking-widest uppercase shadow-md z-20">
                  Optimized
                </div>
                <div className="absolute top-0 left-0 w-full h-1 bg-yellow-400" />
                <div className="absolute -top-24 -right-24 w-48 sm:w-64 h-48 sm:h-64 bg-yellow-400/20 blur-[80px] sm:blur-[100px] rounded-full pointer-events-none group-hover:scale-150 transition-transform duration-700" />

                <h3 className="text-xl sm:text-2xl md:text-3xl font-black mb-6 sm:mb-12 text-yellow-600 dark:text-yellow-400 flex items-center gap-2 sm:gap-3 relative z-10">
                  <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 shrink-0" /> AlphaDigify Managed
                </h3>

                <div className="space-y-4 sm:space-y-8 relative z-10">
                  {[
                    { label: "Average Rating", value: "4.9★" },
                    { label: "Total Reviews", value: "1,847" },
                    { label: "Monthly Review Rate", value: "150+/month" },
                    { label: "Conversion Rate", value: "6.2%" },
                    { label: "Negative Reviews", value: "0 unaddressed" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="flex justify-between items-center border-b border-yellow-200/50 dark:border-yellow-500/20 pb-3 sm:pb-4 gap-2"
                    >
                      <span className="text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider text-[11px] sm:text-xs md:text-sm">{item.label}</span>
                      <span className="text-base sm:text-2xl md:text-3xl font-black text-yellow-500 dark:text-yellow-400 shrink-0">{item.value}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* VS Badge */}
            <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white dark:bg-[#0B0C10] border-[4px] border-slate-50 dark:border-[#11121A] rounded-full items-center justify-center shadow-xl z-20">
              <span className="text-slate-300 dark:text-slate-600 font-black text-lg italic">VS</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          6. FAQ
      ═══════════════════════════════════════════════ */}
      <section className="py-12 sm:py-16 relative bg-white dark:bg-[#0B0C10] border-t border-slate-200 dark:border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-wide leading-tight">
              Reviews Management<br />
              <span className="text-yellow-500">FAQs</span>
            </h2>
          </div>

          <div className="border-t-[1.5px] border-slate-200 dark:border-slate-800">
            {FAQS.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="border-b-[1.5px] border-slate-200 dark:border-slate-800"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-start justify-between py-4 sm:py-6 text-left group"
                >
                  <span className={`text-sm sm:text-lg md:text-xl font-bold pr-4 sm:pr-8 transition-colors duration-300 ${openFaq === i ? "text-yellow-500" : "text-slate-900 dark:text-white group-hover:text-yellow-500"}`}>
                    {faq.q}
                  </span>
                  <span className={`shrink-0 ml-2 sm:ml-4 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full transition-colors duration-300 ${openFaq === i ? "bg-yellow-50 dark:bg-yellow-500/10" : "bg-slate-50 dark:bg-slate-900 group-hover:bg-slate-100 dark:group-hover:bg-slate-800"}`}>
                    <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${openFaq === i ? "rotate-180 text-yellow-500" : "text-slate-400 dark:text-slate-500"}`} />
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
                      <div className="pb-5 sm:pb-8 pr-2 sm:pr-12 text-slate-600 dark:text-slate-400 leading-relaxed text-xs sm:text-base md:text-lg">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 sm:mt-16 text-center"
          >
            <p className="text-slate-600 dark:text-slate-400 mb-4 sm:mb-6 text-sm sm:text-lg px-2">Ready to dominate every platform with bulletproof review authority?</p>
            <Link href="/contact" className="inline-block w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-400 text-slate-900 h-12 sm:h-14 px-6 sm:px-10 text-sm sm:text-base font-bold rounded-full transition-all hover:scale-105 shadow-lg shadow-yellow-500/20">
                <Sparkles className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                Start Building My Review Profile
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
