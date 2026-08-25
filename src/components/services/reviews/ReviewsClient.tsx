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

/* ─── Inline SVG Brand Logos ─── */

function AmazonLogo({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <rect width="256" height="256" fill="#FF9900" rx="28"/>
      <path d="M145.3 163c-15.5 10.8-37.9 16.5-57.2 16.5-27.1 0-51.4-10-69.8-26.7-1.4-1.3-.2-3.1 1.6-2.1 19.9 11.6 44.5 18.5 69.9 18.5 17.1 0 35.9-3.5 53.2-10.9 2.6-1.1 4.8 1.7 2.3 4.7z" fill="#232F3E"/>
      <path d="M151.6 155.6c-2-2.5-13-1.2-18-0.6-1.5.2-1.7-1.1-.4-2 8.8-6.2 23.3-4.4 25-.4 1.7 4.1-0.5 18-8.7 25.5-1.3 1.1-2.5.5-1.9-0.9 1.9-4.6 6.1-15.1 4-21.6z" fill="#232F3E"/>
      <path d="M135.2 70.5V63c0-1 .8-1.7 1.7-1.7h30.4c1 0 1.8.7 1.8 1.7v6.4c0 1-.8 2.2-2.3 4.2l-15.8 22.5c5.9-.1 12.1.7 17.4 3.7 1.2.6 1.5 1.6 1.6 2.6v7.9c0 1-1.1 2.2-2.3 1.6-9.5-5-22.1-5.5-32.6.1-1.1.6-2.2-.6-2.2-1.6v-7.5c0-1.1 0-3 1.1-4.7l18.3-26.2h-15.9c-1 0-1.8-.7-1.8-1.7z" fill="white"/>
      <path d="M51.2 113h-9.3c-.9-.1-1.6-.7-1.7-1.6V63.1c0-1 .8-1.8 1.9-1.8h8.7c.9 0 1.6.7 1.7 1.6v6.4h.2c2.3-6.2 6.5-9 12.3-9 5.9 0 9.5 2.8 12.2 9 2.3-6.2 7.5-9 13.1-9 4 0 8.4 1.6 11 5.4 3 4.2 2.4 10.3 2.4 15.7l0 29.6c0 1-.8 1.8-1.9 1.8h-9.3c-1 0-1.8-.9-1.8-1.8V86.3c0-2.1.2-7.4-.3-9.4-.8-3.4-2.9-4.3-5.8-4.3-2.4 0-4.8 1.6-5.8 4.1-1 2.6-.9 6.8-.9 9.6v24.8c0 1-.8 1.8-1.9 1.8h-9.3c-1 0-1.8-.9-1.8-1.8L66 86.3c0-5.2.9-12.9-6.1-12.9-7.1 0-6.8 7.4-6.8 12.9v24.8c0 1-.8 1.8-1.9 1.8z" fill="white"/>
      <path d="M196.4 63c15.9 0 24.5 13.7 24.5 31 0 16.8-9.5 30.2-24.5 30.2-15.6 0-24.1-13.7-24.1-30.7C172.3 76.5 181 63 196.4 63zm.1 11.2c-7.9 0-8.4 10.7-8.4 17.4 0 6.7-.1 21.1 8.3 21.1 8.3 0 8.7-11.5 8.7-18.5 0-4.6-.2-10.1-1.6-14.5-1.2-3.8-3.7-5.5-7-5.5z" fill="white"/>
      <path d="M232.5 113h-9.3c-1 0-1.8-.9-1.8-1.8l0-48c.1-.9.9-1.6 1.9-1.6h8.7c.9 0 1.6.6 1.8 1.4v7.3h.2c2.6-6.6 6.3-9.7 12.8-9.7 4.2 0 8.3 1.5 10.9 5.7 2.4 3.9 2.4 10.5 2.4 15.2v29.8c-.1.9-.9 1.6-1.9 1.6h-9.4c-.9-.1-1.7-.8-1.8-1.6V85.7c0-5.1.6-12.6-6.2-12.6-2.4 0-4.6 1.6-5.7 4.1-1.4 3.1-1.5 6.2-1.5 9.5v24.4c0 1-.9 1.8-1.9 1.8z" fill="white"/>
    </svg>
  );
}

function WalmartLogo({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <rect width="256" height="256" fill="#0071DC" rx="28"/>
      <g fill="white">
        {/* Spark / Sunburst icon */}
        <ellipse cx="128" cy="68" rx="10" ry="22"/>
        <ellipse cx="128" cy="188" rx="10" ry="22"/>
        <ellipse cx="68" cy="128" rx="22" ry="10"/>
        <ellipse cx="188" cy="128" rx="22" ry="10"/>
        <ellipse cx="87" cy="87" rx="10" ry="22" transform="rotate(-45 87 87)"/>
        <ellipse cx="169" cy="169" rx="10" ry="22" transform="rotate(-45 169 169)"/>
        <ellipse cx="169" cy="87" rx="10" ry="22" transform="rotate(45 169 87)"/>
        <ellipse cx="87" cy="169" rx="10" ry="22" transform="rotate(45 87 169)"/>
        <circle cx="128" cy="128" r="18"/>
      </g>
    </svg>
  );
}

function EbayLogo({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <rect width="256" height="256" fill="white" rx="28"/>
      {/* eBay wordmark colors: e=red, b=blue, a=yellow, y=green */}
      <text x="10" y="168" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="130">
        <tspan fill="#E53238">e</tspan>
        <tspan fill="#0064D2">b</tspan>
        <tspan fill="#F5AF02">a</tspan>
        <tspan fill="#86B817">y</tspan>
      </text>
    </svg>
  );
}

function TikTokLogo({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <rect width="256" height="256" fill="#010101" rx="28"/>
      <path d="M196 82.4c-18.8-1.2-33.5-16.7-33.5-35.8V40h-28.8v120.3c0 12.2-9.9 22.1-22.1 22.1s-22.1-9.9-22.1-22.1 9.9-22.1 22.1-22.1c2.1 0 4.2.3 6.1.8V109c-2-.2-4-.4-6.1-.4-27.9 0-50.6 22.7-50.6 50.6S83.7 210 111.6 210s50.6-22.7 50.6-50.6V116c10.4 7.4 23.1 11.8 36.8 11.8V99c-1 0-2 0-3-.1v-16.5z" fill="white"/>
      <path d="M196 82.4c-18.8-1.2-33.5-16.7-33.5-35.8" fill="none" stroke="#69C9D0" strokeWidth="3"/>
    </svg>
  );
}

function GoogleLogo({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <rect width="256" height="256" fill="white" rx="28"/>
      <path d="M230.4 131.6c0-6.4-.6-12.6-1.6-18.5H128v35h57.6c-2.5 13.3-10 24.5-21.2 32v26.6h34.4c20.1-18.5 31.6-45.9 31.6-75.1z" fill="#4285F4"/>
      <path d="M128 234c28.9 0 53.1-9.6 70.8-25.9l-34.4-26.6c-9.6 6.4-21.8 10.2-36.4 10.2-28 0-51.7-18.9-60.2-44.3H32.2V174c17.6 35 53.7 60 95.8 60z" fill="#34A853"/>
      <path d="M67.8 147.4c-2.2-6.4-3.4-13.3-3.4-20.4s1.2-14 3.4-20.4V80H32.2C25.1 93.9 21 109.5 21 127s4.1 33.1 11.2 47l35.6-26.6z" fill="#FBBC04"/>
      <path d="M128 62.3c15.8 0 29.9 5.4 41.1 16.1l30.7-30.7C181.1 30.6 156.9 21 128 21c-42.1 0-78.2 24.9-95.8 60l35.6 26.6c8.5-25.4 32.2-45.3 60.2-45.3z" fill="#EA4335"/>
    </svg>
  );
}

function CostcoLogo({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <rect width="256" height="256" fill="#E31837" rx="28"/>
      <text x="128" y="148" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="52" fill="white" letterSpacing="-1">COSTCO</text>
      <text x="128" y="186" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="400" fontSize="20" fill="white" letterSpacing="6">WHOLESALE</text>
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
      <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pt-44 lg:pb-32 overflow-hidden min-h-[90vh] flex items-center">
        {/* Background ellipse */}
        <div
          className="absolute inset-0 z-0 overflow-hidden [clip-path:ellipse(260%_100%_at_50%_0%)] md:[clip-path:ellipse(120%_95%_at_50%_0%)]"
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
          2. THE PROBLEM (The Cold Hard Truth)
      ═══════════════════════════════════════════════ */}
      <section className="pt-12 pb-6 md:pt-16 md:pb-8 relative bg-white dark:bg-[#0B0C10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-3xl p-8 md:p-16 relative overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
              <div>
                <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight text-slate-900 dark:text-white">
                  Your customers make decisions based on what others say.
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                  93% of shoppers read reviews before clicking "Buy Now." A single 1-star review or low star rating quietly destroys your conversion rate, drives up your advertising costs, and sends eager buyers straight into your competitors' carts.
                </p>
                <div className="flex items-center gap-4 text-sm font-bold text-yellow-700 dark:text-yellow-300 bg-yellow-100 dark:bg-yellow-500/10 px-5 py-3 rounded-xl border border-yellow-300 dark:border-yellow-500/30 inline-flex">
                  <TrendingDown className="w-5 h-5" />
                  Don't leave your reputation to chance. Let the specialists engineer it.
                </div>
              </div>
              
              <div className="flex justify-center lg:justify-end mt-10 lg:mt-0 w-full">
                <div className="relative w-full max-w-[420px] aspect-square grid grid-cols-2 gap-4">
                  {/* Center Star Icon Overlap */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white dark:bg-slate-900 shadow-[0_0_40px_rgba(0,0,0,0.1)] dark:shadow-[0_0_40px_rgba(255,255,255,0.05)] border-[6px] border-yellow-50 dark:border-[#111827] flex items-center justify-center z-20">
                    <Star className="w-9 h-9 text-yellow-400 fill-yellow-400" />
                  </div>

                  {/* Top Left */}
                  <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-[2rem] p-6 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-default relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400"></div>
                    <div className="w-14 h-14 rounded-2xl bg-cyan-50 dark:bg-cyan-900/30 text-cyan-500 border border-cyan-100 dark:border-cyan-800 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-cyan-100 dark:group-hover:bg-cyan-900/50 transition-all">
                      <Eye className="w-7 h-7" />
                    </div>
                    <span className="text-2xl font-black text-slate-900 dark:text-white">93%</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-400 leading-tight mt-1">Read Reviews<br/>Before Buying</span>
                  </div>

                  {/* Top Right */}
                  <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-[2rem] p-6 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-default relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-pink-400"></div>
                    <div className="w-14 h-14 rounded-2xl bg-pink-50 dark:bg-pink-900/30 text-pink-500 border border-pink-100 dark:border-pink-800 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-pink-100 dark:group-hover:bg-pink-900/50 transition-all">
                      <AlertCircle className="w-7 h-7" />
                    </div>
                    <span className="text-2xl font-black text-slate-900 dark:text-white">4.0★+</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-400 leading-tight mt-1">Required to<br/>Convert Traffic</span>
                  </div>

                  {/* Bottom Left */}
                  <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-[2rem] p-6 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-default relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-yellow-400"></div>
                    <div className="w-14 h-14 rounded-2xl bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 border border-yellow-100 dark:border-yellow-800 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-yellow-100 dark:group-hover:bg-yellow-900/50 transition-all">
                      <TrendingUp className="w-7 h-7" />
                    </div>
                    <span className="text-2xl font-black text-slate-900 dark:text-white">+9%</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-400 leading-tight mt-1">Revenue Per<br/>1-Star Lift</span>
                  </div>

                  {/* Bottom Right */}
                  <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-[2rem] p-6 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-default relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-green-400"></div>
                    <div className="w-14 h-14 rounded-2xl bg-green-50 dark:bg-green-900/30 text-green-500 border border-green-100 dark:border-green-800 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-green-100 dark:group-hover:bg-green-900/50 transition-all">
                      <Sparkles className="w-7 h-7" />
                    </div>
                    <span className="text-2xl font-black text-slate-900 dark:text-white">100%</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-400 leading-tight mt-1">White-Hat &amp;<br/>Safe Strategy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          3. PLATFORM PILLARS (Google Ads Section Design)
      ═══════════════════════════════════════════════ */}
      <section id="platforms" className="py-24 bg-white dark:bg-[#0B0C10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-24">
            <h2 className="text-3xl md:text-5xl font-black mb-6">
              One Agency. Every Platform. Every Review.
            </h2>
            <p className="text-lg text-slate-650 dark:text-zinc-450 max-w-2xl mx-auto">
              We don&apos;t just manage reviews on one marketplace. We deploy an integrated review architecture that builds unshakeable buyer trust across all major platforms.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PLATFORMS.map((platform, i) => (
              <div
                key={i}
                className="flex flex-col items-start p-2 sm:p-4 group h-full"
              >
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 overflow-hidden shadow-sm" 
                >
                  {platform.logo}
                </div>

                <h3 className="text-2xl md:text-3xl font-black mb-4 text-slate-900 dark:text-white tracking-tight">{platform.name}</h3>
                <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
                  {platform.desc}
                </p>

                <div className="mt-auto pt-6 border-t-2 w-12 transition-all duration-300 group-hover:w-full" style={{ borderColor: platform.color }}>
                  <p className="text-4xl font-black tracking-tight" style={{ color: platform.color }}>{platform.stat}</p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">{platform.statLabel}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          4. THE REVIEW ENGINE (Our Process Design)
      ═══════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white dark:bg-[#0B0C10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-20">
            <div className="inline-flex items-center gap-2 bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20 text-yellow-700 dark:text-yellow-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5" /> How It Works
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              The <span className="text-yellow-500">Review Engine</span>
            </h2>
            <p className="mt-4 text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              A relentless, 4-phase system engineered to build unassailable review authority across every platform you sell on.
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
                    className="w-20 h-20 rounded-full bg-white dark:bg-slate-900 border-[2px] border-slate-200 dark:border-slate-700 group-hover:border-yellow-400 flex items-center justify-center text-2xl font-black text-slate-300 dark:text-slate-700 group-hover:text-yellow-500 transition-all duration-300 mb-6 relative z-10 shadow-sm"
                  >
                    {step.step}
                  </motion.div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-yellow-500 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-[200px]">
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
