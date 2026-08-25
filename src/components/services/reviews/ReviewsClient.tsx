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
  TrendingDown,
  AlertCircle,
  Zap,
  Eye,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

/* ─── Platform brand colors ─── */
const AMAZON_COLOR  = "#FF9900";
const WALMART_COLOR = "#0071DC";
const EBAY_COLOR    = "#E53238";
const TIKTOK_COLOR  = "#010101";
const GOOGLE_COLOR  = "#4285F4";
const COSTCO_COLOR  = "#E31837";

/* ─── Inline SVG Brand Logos (circular, clean, no clip-off) ─── */

function AmazonLogo({ size = 52 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#FF9900"/>
      {/* Bold lowercase "a" */}
      <text x="50" y="48" textAnchor="middle" dominantBaseline="middle" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="46" fill="white">a</text>
      {/* Amazon smile arc */}
      <path d="M28 68 C36 76 64 76 72 68" stroke="#232F3E" strokeWidth="4" fill="none" strokeLinecap="round"/>
      {/* Arrow tip */}
      <path d="M69 64 L72 68 L68 71" stroke="#232F3E" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function WalmartLogo({ size = 52 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#0071DC"/>
      <g fill="white">
        {/* 6-petal Walmart spark, centered */}
        <ellipse cx="50" cy="27" rx="5" ry="11"/>
        <ellipse cx="50" cy="73" rx="5" ry="11"/>
        <ellipse cx="27" cy="50" rx="11" ry="5"/>
        <ellipse cx="73" cy="50" rx="11" ry="5"/>
        <ellipse cx="32" cy="32" rx="5" ry="11" transform="rotate(-45 32 32)"/>
        <ellipse cx="68" cy="68" rx="5" ry="11" transform="rotate(-45 68 68)"/>
        <ellipse cx="68" cy="32" rx="5" ry="11" transform="rotate(45 68 32)"/>
        <ellipse cx="32" cy="68" rx="5" ry="11" transform="rotate(45 32 68)"/>
        <circle cx="50" cy="50" r="9"/>
      </g>
    </svg>
  );
}

function EbayLogo({ size = 52 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="white"/>
      {/* eBay — clean icon: bold colored letters centered and sized to fit */}
      <text textAnchor="middle" dominantBaseline="middle" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="32">
        <tspan x="50" y="46" fill="#E53238">e</tspan>
      </text>
      <text textAnchor="middle" dominantBaseline="middle" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="32">
        <tspan x="50" y="62" letterSpacing="1">
          <tspan fill="#0064D2">b</tspan><tspan fill="#F5AF02">a</tspan><tspan fill="#86B817">y</tspan>
        </tspan>
      </text>
    </svg>
  );
}

function TikTokLogo({ size = 52 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#010101"/>
      {/* TikTok note path scaled to fit circle */}
      <path
        d="M62 22 C62 22 63 33 74 36 L74 46 C74 46 64 44 62 36 L62 62 C62 73 53 80 43 77 C33 74 29 63 34 54 C39 45 51 44 55 48 L55 59 C53 57 48 57 46 61 C44 65 47 70 52 70 C57 70 60 66 60 61 L60 22 Z"
        fill="white"
      />
      <path d="M62 22 C62 22 63 33 74 36" stroke="#69C9D0" strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

function GoogleLogo({ size = 52 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="white"/>
      {/* Google "G" mark, centered and scaled */}
      <path d="M79 50 C79 66 67 78 50 78 C33 78 21 66 21 50 C21 34 33 22 50 22 C58 22 65 25 70 30 L63 37 C60 34 55 32 50 32 C38 32 30 40 30 50 C30 60 38 68 50 68 C60 68 67 62 69 54 L50 54 L50 44 L79 44 Z" fill="#4285F4"/>
      <path d="M50 22 C58 22 65 25 70 30 L63 37 C60 34 55 32 50 32 Z" fill="#EA4335"/>
      <path d="M21 50 C21 42 24 35 30 30 L37 37 C34 41 32 45 32 50 Z" fill="#FBBC04" opacity="0.9"/>
      <path d="M30 30 L37 37 C33 41 30 45 30 50 C30 55 32 59 35 63 L28 70 C23 64 21 57 21 50 C21 42 24 35 30 30 Z" fill="#FBBC04"/>
      <path d="M50 78 C42 78 35 75 30 70 L37 63 C40 66 45 68 50 68 Z" fill="#34A853"/>
    </svg>
  );
}

function CostcoLogo({ size = 52 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#E31837"/>
      {/* Bold white "C" letter mark */}
      <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="58" fill="white">C</text>
      {/* Small "OSTCO" hint or just use the letter mark — clean single C */}
    </svg>
  );
}

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
    logo: <AmazonLogo size={52} />,
    desc: "We drive a systematic flow of authentic product reviews, suppress policy-violating negatives, and engineer your product listing to convert at industry-best rates.",
  },
  {
    name: "Walmart",
    color: WALMART_COLOR,
    bg: "#E6F3FF",
    darkBg: "rgba(0,113,220,0.08)",
    stat: "4.7★",
    statLabel: "Avg. Seller Rating",
    logo: <WalmartLogo size={52} />,
    desc: "Build seller credibility on Walmart Marketplace with a sustained cadence of verified buyer reviews that push your products to the top of search results.",
  },
  {
    name: "eBay",
    color: EBAY_COLOR,
    bg: "#FFECEE",
    darkBg: "rgba(229,50,56,0.08)",
    stat: "98%",
    statLabel: "Positive Feedback Score",
    logo: <EbayLogo size={52} />,
    desc: "Protect and elevate your eBay feedback score. We manage buyer communications, resolve disputes, and generate consistent 5-star feedback to lock in Top Rated Seller status.",
  },
  {
    name: "TikTok Shop",
    color: TIKTOK_COLOR,
    bg: "#E8FAFB",
    darkBg: "rgba(105,201,208,0.08)",
    stat: "3x",
    statLabel: "Review Velocity Increase",
    logo: <TikTokLogo size={52} />,
    desc: "Creator-generated authentic reviews and post-purchase UGC campaigns that build social proof at scale — turning buyers into organic brand advocates on TikTok Shop.",
  },
  {
    name: "Google",
    color: GOOGLE_COLOR,
    bg: "#EBF2FF",
    darkBg: "rgba(66,133,244,0.08)",
    stat: "4.9★",
    statLabel: "Google Business Rating",
    logo: <GoogleLogo size={52} />,
    desc: "Dominate local and brand search with a relentless stream of Google Business reviews. Higher ratings = lower CPC on Google Ads and higher trust conversion rates.",
  },
  {
    name: "Costco",
    color: COSTCO_COLOR,
    bg: "#FFEBEF",
    darkBg: "rgba(227,24,55,0.08)",
    stat: "4.8★",
    statLabel: "Member Satisfaction Score",
    logo: <CostcoLogo size={52} />,
    desc: "Establish premium member credibility on Costco.com. We drive verified member ratings and high-volume positive feedback to capture wholesale buying trust.",
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
    a: "Yes — that's our specialty. We run unified review management campaigns across all major platforms (Amazon, Walmart, eBay, TikTok Shop, Google, Costco) with platform-specific strategies for each, all managed from a single point of contact.",
  },
  {
    q: "What happens to my review profile if I stop the service?",
    a: "The reviews we generate are permanent. Your rating improvements and accumulated social proof remain on your listings forever. We also provide a maintenance playbook so you can sustain the momentum internally after scaling.",
  },
];


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
      <section className="relative pt-28 pb-0 md:pb-20 lg:pt-44 lg:pb-32 overflow-hidden min-h-0 lg:min-h-[90vh] flex items-center">
        {/* Background ellipse */}
        <div
          className="absolute inset-0 z-0 overflow-hidden [clip-path:ellipse(200%_100%_at_50%_0%)] md:[clip-path:ellipse(120%_95%_at_50%_0%)]"
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

          {/* Right: Animated Review Dashboard Mockup (Flushes to the bottom of hero curve on mobile) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
            className="w-full mt-8 sm:mt-10 lg:mt-0 max-w-md mx-auto lg:max-w-none"
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
          2. THE PROBLEM (The Cold Hard Truth)
      ═══════════════════════════════════════════════ */}
      <section className="pt-10 pb-6 md:pt-16 md:pb-8 relative bg-white dark:bg-[#0B0C10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-16 relative overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-black mb-4 sm:mb-6 leading-tight text-slate-900 dark:text-white">
                  Your customers make decisions based on what others say.
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 mb-6 sm:mb-8 leading-relaxed">
                  93% of shoppers read reviews before clicking "Buy Now." A single 1-star review or low star rating quietly destroys your conversion rate, drives up your advertising costs, and sends eager buyers straight into your competitors' carts.
                </p>
                <div className="flex items-start sm:items-center gap-3 text-xs sm:text-sm font-bold text-yellow-700 dark:text-yellow-300 bg-yellow-100 dark:bg-yellow-500/10 px-4 py-3 sm:px-5 rounded-xl border border-yellow-300 dark:border-yellow-500/30 inline-flex">
                  <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-0.5 sm:mt-0" />
                  <span>Don&apos;t leave your reputation to chance. Let the specialists engineer it.</span>
                </div>
              </div>
              
              <div className="flex justify-center lg:justify-end mt-6 lg:mt-0 w-full">
                <div className="relative w-full max-w-[340px] sm:max-w-[420px] aspect-square grid grid-cols-2 gap-3 sm:gap-4">
                  {/* Center Star Icon Overlap */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-white dark:bg-slate-900 shadow-[0_0_40px_rgba(0,0,0,0.1)] dark:shadow-[0_0_40px_rgba(255,255,255,0.05)] border-[4px] sm:border-[6px] border-yellow-50 dark:border-[#111827] flex items-center justify-center z-20">
                    <Star className="w-6 h-6 sm:w-9 sm:h-9 text-yellow-400 fill-yellow-400" />
                  </div>

                  {/* Top Left */}
                  <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-2xl sm:rounded-[2rem] p-3 sm:p-6 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-default relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400"></div>
                    <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-cyan-50 dark:bg-cyan-900/30 text-cyan-500 border border-cyan-100 dark:border-cyan-800 flex items-center justify-center mb-2 sm:mb-4 group-hover:scale-110 transition-all">
                      <Eye className="w-5 h-5 sm:w-7 sm:h-7" />
                    </div>
                    <span className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white">93%</span>
                    <span className="text-[10px] sm:text-sm font-bold text-slate-600 dark:text-slate-400 leading-tight mt-0.5 sm:mt-1">Read Reviews<br/>Before Buying</span>
                  </div>

                  {/* Top Right */}
                  <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-2xl sm:rounded-[2rem] p-3 sm:p-6 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-default relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-pink-400"></div>
                    <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-pink-50 dark:bg-pink-900/30 text-pink-500 border border-pink-100 dark:border-pink-800 flex items-center justify-center mb-2 sm:mb-4 group-hover:scale-110 transition-all">
                      <AlertCircle className="w-5 h-5 sm:w-7 sm:h-7" />
                    </div>
                    <span className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white">4.0★+</span>
                    <span className="text-[10px] sm:text-sm font-bold text-slate-600 dark:text-slate-400 leading-tight mt-0.5 sm:mt-1">Required to<br/>Convert Traffic</span>
                  </div>

                  {/* Bottom Left */}
                  <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-2xl sm:rounded-[2rem] p-3 sm:p-6 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-default relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-yellow-400"></div>
                    <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 border border-yellow-100 dark:border-yellow-800 flex items-center justify-center mb-2 sm:mb-4 group-hover:scale-110 transition-all">
                      <TrendingUp className="w-5 h-5 sm:w-7 sm:h-7" />
                    </div>
                    <span className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white">+9%</span>
                    <span className="text-[10px] sm:text-sm font-bold text-slate-600 dark:text-slate-400 leading-tight mt-0.5 sm:mt-1">Revenue Per<br/>1-Star Lift</span>
                  </div>

                  {/* Bottom Right */}
                  <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-2xl sm:rounded-[2rem] p-3 sm:p-6 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-default relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-green-400"></div>
                    <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-green-50 dark:bg-green-900/30 text-green-500 border border-green-100 dark:border-green-800 flex items-center justify-center mb-2 sm:mb-4 group-hover:scale-110 transition-all">
                      <Sparkles className="w-5 h-5 sm:w-7 sm:h-7" />
                    </div>
                    <span className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white">100%</span>
                    <span className="text-[10px] sm:text-sm font-bold text-slate-600 dark:text-slate-400 leading-tight mt-0.5 sm:mt-1">White-Hat &amp;<br/>Safe Strategy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          3. PLATFORM PILLARS (Previous Card Design)
      ═══════════════════════════════════════════════ */}
      <section id="platforms" className="py-14 sm:py-20 lg:py-24 bg-white dark:bg-[#0B0C10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-16 lg:mb-20"
          >
            <div className="inline-flex items-center gap-2 bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20 text-yellow-700 dark:text-yellow-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4 sm:mb-5">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" /> Multi-Platform Dominance
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black mb-4 sm:mb-6 leading-tight text-slate-900 dark:text-white">
              One Agency. <span className="text-yellow-500">Every Platform.</span> Every Review.
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto px-2 leading-relaxed">
              We don&apos;t just manage reviews on one marketplace. We engineer your entire review ecosystem — across all major platforms — simultaneously.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {PLATFORMS.map((platform, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
                style={{ borderTopColor: platform.color, borderTopWidth: 3 }}
              >
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl" style={{ background: platform.color }} />
                
                {/* Glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none"
                  style={{ background: `radial-gradient(circle at top left, ${platform.color}15 0%, transparent 60%)` }}
                />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-5 sm:mb-6">
                    <div
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 overflow-hidden shadow-md"
                      style={{ background: platform.bg }}
                    >
                      {platform.logo}
                    </div>
                    <AnimatedStars rating={5} size={14} />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black mb-3" style={{ color: platform.color }}>
                    {platform.name}
                  </h3>
                  
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-6 flex-grow">
                    {platform.desc}
                  </p>

                  <div className="pt-4 sm:pt-5 border-t border-slate-100 dark:border-slate-800 mt-auto">
                    <p className="text-2xl sm:text-3xl font-black" style={{ color: platform.color }}>
                      {platform.stat}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold mt-1 uppercase tracking-wider">
                      {platform.statLabel}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          4. THE REVIEW ENGINE (Our Process Design)
      ═══════════════════════════════════════════════ */}
      <section className="py-14 sm:py-16 md:py-24 bg-white dark:bg-[#0B0C10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="inline-flex items-center gap-2 bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20 text-yellow-700 dark:text-yellow-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-5 sm:mb-6">
              <Sparkles className="w-3.5 h-3.5" /> How It Works
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              The <span className="text-yellow-500">Review Engine</span>
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed px-2">
              A relentless, 4-phase system engineered to build unassailable review authority across every platform you sell on.
            </p>
          </div>

          <div className="relative">
            {/* Connector line – desktop only */}
            <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-[2px] bg-slate-100 dark:bg-slate-800" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 md:gap-4">
              {PROCESS_STEPS.map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center relative group">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white dark:bg-slate-900 border-[2px] border-slate-200 dark:border-slate-700 group-hover:border-yellow-400 flex items-center justify-center text-xl sm:text-2xl font-black text-slate-300 dark:text-slate-700 group-hover:text-yellow-500 transition-all duration-300 mb-4 sm:mb-6 relative z-10 shadow-sm"
                  >
                    {step.step}
                  </motion.div>
                  <h3 className="text-base sm:text-xl font-black text-slate-900 dark:text-white mb-2 sm:mb-3 group-hover:text-yellow-500 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-[160px] sm:max-w-[200px]">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
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
