/* eslint-disable react/no-unescaped-entities */
"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Video, Target, Clapperboard, MonitorPlay, ArrowRight, CheckCircle2, ChevronDown, BarChart3, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const AD_LAYERS = [
  {
    id: 0,
    label: "Hook",
    time: "0–3s",
    headline: "You're Losing $1,000/Day Running Bad Ads.",
    sub: "Pattern interrupt to stop the scroll instantly.",
    metric: "3-Second View Rate",
    value: "87%",
    color: "#FACC15",
    bg: "bg-yellow-400",
    text: "text-slate-900",
  },
  {
    id: 1,
    label: "Pain Point",
    time: "3–8s",
    headline: "Most ads bore people in the first 5 seconds.",
    sub: "We amplify the problem to make your solution irresistible.",
    metric: "Watch-Through Rate",
    value: "64%",
    color: "#94a3b8",
    bg: "bg-slate-400",
    text: "text-white",
  },
  {
    id: 2,
    label: "Solution",
    time: "8–18s",
    headline: "Our ads are engineered to convert cold traffic.",
    sub: "Proof, social validation, and a clear unique mechanism.",
    metric: "Click-Through Rate",
    value: "9.2%",
    color: "#FACC15",
    bg: "bg-yellow-400",
    text: "text-slate-900",
  },
  {
    id: 3,
    label: "CTA",
    time: "18–30s",
    headline: "Shop Now — Limited Stock Available.",
    sub: "High-urgency CTA tied directly to a single action.",
    metric: "Conversion Rate",
    value: "4.8%",
    color: "#FACC15",
    bg: "bg-yellow-400",
    text: "text-slate-900",
  },
];

export default function VideoAdsServicePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeLayer, setActiveLayer] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 200]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLayer(prev => (prev + 1) % AD_LAYERS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const PROCESS_STEPS = [
    { step: "01", title: "Creative Strategy", desc: "We analyze your audience and build a hook-driven storyboard." },
    { step: "02", title: "Production & UGC", desc: "We shoot cinematic footage or source native-looking UGC creators." },
    { step: "03", title: "Dynamic Editing", desc: "Fast-paced, pattern-interrupt editing tailored for TikTok/Reels." },
    { step: "04", title: "A/B Testing", desc: "We deliver variations to test hooks and scale the winning ad." }
  ];

  const PLATFORMS = [
    { name: "TikTok Ads", icon: <Video />, desc: "UGC-style, trend-focused ads that feel like native content but convert like direct response." },
    { name: "Meta (FB/IG) Ads", icon: <Target />, desc: "High-polish Reels and Feed ads designed to lower CPA and drive immediate ROAS." },
    { name: "YouTube Shorts Ads", icon: <MonitorPlay />, desc: "Action-driven short-form ads that capture intent and dominate the Google ecosystem." },
  ];

  return (
    <div className="w-full bg-[#F8F9FA] dark:bg-[#0B0C10] text-slate-900 dark:text-white min-h-screen overflow-hidden selection:bg-yellow-500/30" ref={containerRef}>
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-[90vh] flex items-center">
        {/* Background Image Setup */}
        <div 
          className="absolute inset-0 z-0 bg-black [clip-path:ellipse(200%_100%_at_50%_0%)] md:[clip-path:ellipse(120%_95%_at_50%_0%)]"
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-[#0B0C10] z-20" />
          <Image
            src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop"
            alt="Video Production Background"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-2 bg-yellow-400 text-slate-900 px-4 py-2 rounded-full mb-8 font-bold text-sm shadow-xl"
          >
            <Video className="w-4 h-4" />
            <span className="tracking-wide uppercase">High-Converting Video Ads</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[1.1] tracking-tight uppercase"
          >
            Stop the Scroll. <br/>
            <span className="text-yellow-400">Start the Sale.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-medium"
          >
            We engineer psychologically-driven video advertisements designed to drastically lower your CPA and skyrocket ROAS across Meta, TikTok, and YouTube.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link href="/contact">
              <Button size="lg" className="bg-yellow-400 text-slate-900 hover:bg-yellow-500 font-black h-16 px-10 text-lg rounded-full shadow-[0_0_40px_rgba(250,204,21,0.3)] transition-all hover:scale-105">
                Book a Creative Audit <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. AD PHILOSOPHY (Video Comparison) */}
      <section className="py-14 relative bg-white dark:bg-[#0B0C10] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div>
              <div className="inline-flex items-center space-x-2 bg-yellow-400 text-slate-900 font-bold px-4 py-1.5 rounded-full mb-6">
                <BarChart3 className="w-4 h-4" />
                <span className="text-xs uppercase tracking-widest">Ad Philosophy</span>
              </div>
            </motion.div>
            <motion.h2 className="text-4xl md:text-6xl font-black mb-6 text-slate-900 dark:text-white uppercase tracking-tight">
              Pretty Videos <span className="text-slate-300 dark:text-slate-700">vs.</span> <span className="text-yellow-400">Profitable Ads</span>
            </motion.h2>
            <motion.p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Anyone can shoot cinematic B-roll. We engineer psychologically-driven performance assets designed to acquire customers at scale.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* The "Pretty" Illusion */}
            <motion.div 
              className="flex flex-col"
            >
              <div className="mb-8">
                <h3 className="text-2xl font-black text-slate-400 uppercase tracking-wide">The "Pretty" Illusion</h3>
                <p className="text-slate-500 font-bold mt-2">Looks like a movie. Sells absolutely nothing.</p>
              </div>

              {/* Fake Video Player UI */}
              <div className="aspect-video bg-slate-200 dark:bg-[#121318] rounded-xl relative overflow-hidden mb-8 grayscale opacity-70 border border-slate-200 dark:border-slate-800">
                 <img
                   src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=2000&q=80"
                   alt="Pretty Video Mockup"
                   className="absolute inset-0 w-full h-full object-cover object-center"
                 />
                 {/* Video timeline bar */}
                 <div className="absolute bottom-4 left-4 right-4 h-1.5 bg-white/30 rounded-full overflow-hidden z-10">
                    <div className="h-full w-1/3 bg-white/60" />
                 </div>
              </div>

              <div className="space-y-4">
                {[
                  "Slow, cinematic 10-second intro",
                  "Focuses on brand aesthetics over value",
                  "Vague, artsy messaging with no hook",
                  "Weak or non-existent Call to Action"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                      <span className="text-slate-400 font-bold text-xs">✕</span>
                    </div>
                    <span className="text-slate-400 font-medium line-through decoration-slate-300 dark:decoration-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* The Profitable Reality */}
            <motion.div 
              className="flex flex-col relative"
            >
              <div className="mb-8 relative z-10">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-wide">The Profitable Reality</h3>
                <p className="text-yellow-500 font-bold mt-2">Engineered specifically to convert cold traffic.</p>
              </div>

              {/* Fake Video Player UI */}
              <div className="aspect-[4/5] sm:aspect-video bg-slate-900 rounded-xl relative overflow-hidden mb-8 border-[2px] border-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.15)] z-10">
                 <img
                   src="https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=2000&auto=format&fit=crop"
                   alt="Profitable Video Mockup"
                   className="absolute inset-0 w-full h-full object-cover object-center opacity-80"
                 />
                 
                 {/* Hook overlay */}
                 <div className="absolute top-4 left-4 bg-yellow-400 text-slate-900 text-xs font-black px-3 py-1 uppercase tracking-widest rounded-sm transform -rotate-2 shadow-lg">
                    3-Sec Hook
                 </div>

                 {/* Video timeline bar */}
                 <div className="absolute bottom-4 left-4 right-4 h-1.5 bg-white/20 rounded-full overflow-hidden flex gap-1">
                    <div className="h-full w-1/4 bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
                    <div className="h-full w-2/4 bg-yellow-400/60" />
                    <div className="h-full w-1/4 bg-yellow-400/40" />
                 </div>
              </div>

              <div className="space-y-4 relative z-10">
                {[
                  "Scroll-stopping pattern interrupt hook",
                  "Fast-paced editing tailored for the algorithm",
                  "Focuses heavily on customer pain points",
                  "Direct, high-urgency Call to Action"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-yellow-100 dark:bg-yellow-500/10 flex items-center justify-center shrink-0 border border-yellow-400/30">
                      <CheckCircle2 className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <span className="text-slate-900 dark:text-white font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. AD ANATOMY ANIMATION */}
      <section className="py-14 bg-white dark:bg-[#0B0C10] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Left: Text + Live Metrics */}
            <motion.div>
              <div className="inline-flex items-center space-x-2 bg-yellow-400 text-slate-900 font-bold px-4 py-1.5 rounded-full mb-8">
                <Clapperboard className="w-4 h-4" />
                <span className="text-xs uppercase tracking-widest">Ad Architecture</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight leading-tight">
                The Anatomy of a<br/><span className="text-yellow-500">Winning Ad</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-12">
                Every ad we produce follows a precision-engineered psychological framework. Each second is intentional, and every frame serves a conversion purpose.
              </p>

              {/* Layer Selector */}
              <div className="space-y-3">
                {AD_LAYERS.map((layer, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveLayer(i)}
                    className={`w-full flex items-center justify-between px-5 py-4 rounded-xl border-[1.5px] transition-all duration-300 text-left group ${
                      activeLayer === i
                        ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-500/5'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm transition-colors duration-300 ${
                        activeLayer === i ? 'bg-yellow-400 text-slate-900' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                      }`}>
                        {i + 1}
                      </div>
                      <div>
                        <p className={`font-black uppercase tracking-wide text-sm ${
                          activeLayer === i ? 'text-yellow-600 dark:text-yellow-400' : 'text-slate-600 dark:text-slate-400'
                        }`}>{layer.label}</p>
                        <p className="text-xs text-slate-400">{layer.time}</p>
                      </div>
                    </div>
                    <div className={`text-right transition-all duration-300 ${
                      activeLayer === i ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <p className="text-2xl font-black text-yellow-500">{layer.value}</p>
                      <p className="text-xs text-slate-400 uppercase tracking-wide">{layer.metric}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Right: Animated Phone Mockup */}
            <motion.div
              className="flex items-center justify-center"
            >
              <div className="relative">
                {/* Glow behind phone */}
                <div className="absolute inset-0 bg-yellow-400/20 blur-[60px] rounded-full scale-75" />

                {/* Phone shell */}
                <div className="relative w-[260px] sm:w-[300px] mx-auto bg-slate-900 rounded-[40px] border-4 border-slate-700 shadow-2xl shadow-black/40 overflow-hidden" style={{ aspectRatio: '9/19' }}>
                  
                  {/* Top notch */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-slate-800 rounded-full z-20" />

                  {/* Video Progress Bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-slate-700 z-30">
                    <motion.div
                      key={activeLayer}
                      className="h-full bg-yellow-400"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 2.8, ease: 'linear' }}
                    />
                  </div>

                  {/* Content area */}
                  <div className="absolute inset-0 flex flex-col">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeLayer}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col h-full"
                      >
                        {/* Screen top color block */}
                        <div className={`${AD_LAYERS[activeLayer].bg} flex-shrink-0 flex flex-col items-center justify-center px-5 pt-12 pb-6`} style={{ flex: '0 0 55%' }}>
                          <span className={`text-xs font-black uppercase tracking-widest ${AD_LAYERS[activeLayer].text} opacity-70 mb-2`}>
                            {AD_LAYERS[activeLayer].time} — {AD_LAYERS[activeLayer].label}
                          </span>
                          <p className={`text-base font-black ${AD_LAYERS[activeLayer].text} text-center leading-tight`}>
                            {AD_LAYERS[activeLayer].headline}
                          </p>
                        </div>

                        {/* Screen bottom info */}
                        <div className="bg-slate-950 flex-1 px-4 pt-4 pb-6 flex flex-col justify-between">
                          <p className="text-slate-400 text-xs leading-relaxed">
                            {AD_LAYERS[activeLayer].sub}
                          </p>
                          <div className="mt-4 border-t border-slate-800 pt-4 flex items-center justify-between">
                            <span className="text-slate-500 text-xs uppercase tracking-widest">{AD_LAYERS[activeLayer].metric}</span>
                            <span className="text-yellow-400 text-xl font-black">{AD_LAYERS[activeLayer].value}</span>
                          </div>
                          {/* CTA Bar */}
                          <div className="mt-4 h-10 rounded-xl bg-yellow-400 flex items-center justify-center">
                            <span className="text-slate-900 text-xs font-black uppercase tracking-widest">Shop Now →</span>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Home bar */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-slate-600 rounded-full z-20" />
                </div>

                {/* Floating layer badges */}
                {AD_LAYERS.map((layer, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: activeLayer === i ? 1.1 : 0.9,
                      opacity: activeLayer === i ? 1 : 0.4,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute hidden lg:flex items-center gap-2 bg-white dark:bg-slate-800 rounded-full px-3 py-1.5 shadow-lg border border-slate-200 dark:border-slate-700 text-xs font-bold"
                    style={{
                      top: `${15 + i * 20}%`,
                      right: i % 2 === 0 ? '-90px' : undefined,
                      left: i % 2 !== 0 ? '-90px' : undefined,
                    }}
                  >
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: layer.color }} />
                    <span className="text-slate-700 dark:text-slate-300">{layer.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. PLATFORMS */}
      <section className="py-14 bg-white dark:bg-[#0B0C10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 lg:mb-20">
            <motion.div>
              <div className="inline-flex items-center space-x-2 bg-yellow-400 text-slate-900 font-bold px-4 py-1.5 rounded-full mb-6">
                <MonitorPlay className="w-4 h-4" />
                <span className="text-xs uppercase tracking-widest">Where We Dominate</span>
              </div>
            </motion.div>
            <motion.h2 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tight text-slate-900 dark:text-white">
              Ad Platform <span className="text-yellow-500">Mastery</span>
            </motion.h2>
            <motion.p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              We don't recycle the same creative everywhere. Every ad is engineered specifically for the network, algorithm, and audience mindset it runs on.
            </motion.p>
          </div>

          <div className="flex flex-col border-t border-slate-200 dark:border-slate-800">
            {[
              {
                name: "TikTok Ads",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.78a4.85 4.85 0 0 1-1.01-.09z"/>
                  </svg>
                ),
                tag: "Native & UGC",
                desc: "UGC-style, trend-focused ads that feel like native content but convert like direct response.",
                specs: [
                  { label: "Format", value: "9:16" },
                  { label: "Hook", value: "0–3s" },
                  { label: "ROAS", value: "3.2×" },
                ],
              },
              {
                name: "Meta Ads",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                ),
                tag: "Reels & Feed",
                desc: "High-polish Reels and Feed ads designed to lower CPA and drive immediate ROAS across the funnel.",
                specs: [
                  { label: "Format", value: "1:1 & 9:16" },
                  { label: "Hook", value: "0–5s" },
                  { label: "ROAS", value: "4.1×" },
                ],
              },
              {
                name: "YouTube Ads",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                ),
                tag: "Shorts & Pre-Roll",
                desc: "Action-driven short-form ads that capture high-intent audiences and dominate the Google ecosystem.",
                specs: [
                  { label: "Format", value: "16:9 & 9:16" },
                  { label: "Skip", value: "5s" },
                  { label: "ROAS", value: "2.8×" },
                ],
              },
            ].map((platform, i) => (
              <motion.div
                key={i}
                className="group flex flex-col lg:flex-row items-start lg:items-center justify-between py-10 lg:py-14 border-b border-slate-200 dark:border-slate-800 hover:bg-yellow-50/50 dark:hover:bg-yellow-500/5 transition-colors duration-500 cursor-default -mx-4 px-4 lg:-mx-8 lg:px-8"
              >
                {/* Left: Icon + Name + Tag */}
                <div className="flex items-center gap-6 md:gap-10 mb-6 lg:mb-0 lg:w-1/2">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-400 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 group-hover:bg-yellow-100 dark:group-hover:bg-yellow-500/10 transition-all duration-400 shrink-0">
                    {platform.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white group-hover:text-yellow-500 transition-colors duration-300 tracking-tight leading-none">
                        {platform.name}
                      </h3>
                    </div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{platform.tag}</span>
                  </div>
                </div>

                {/* Right: Desc + Specs */}
                <div className="lg:w-1/2 lg:pl-12 flex flex-col sm:flex-row items-start sm:items-center gap-8">
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed flex-1 group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors duration-300">
                    {platform.desc}
                  </p>
                  <div className="flex gap-6 shrink-0">
                    {platform.specs.map((spec, j) => (
                      <div key={j} className="text-center">
                        <p className="text-xl font-black text-yellow-500 dark:text-yellow-400 leading-none">{spec.value}</p>
                        <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">{spec.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. THE CREATIVE PROCESS TIMELINE */}
      <section className="py-16 md:py-24 bg-white dark:bg-[#0B0C10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-20">
            <div className="inline-flex items-center gap-2 bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20 text-yellow-700 dark:text-yellow-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5" /> How It Works
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              The <span className="text-yellow-500">Ad Creation</span> Process
            </h2>
            <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              A frictionless pipeline from scripting to final delivery, ensuring you have the assets you need to scale.
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
              Ready to scale? Let's roll.
            </h4>
          </div>

        </div>
      </section>

      {/* 5. FAQs */}
      <section className="py-10 md:py-14 relative bg-white dark:bg-[#0B0C10]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-wide">
              Video Ads<br/>
              <span className="text-yellow-500">FAQs</span>
            </h2>
          </div>

          <div className="border-t-[1.5px] border-slate-200 dark:border-slate-800">
            {[
              {
                q: "Do you run the ads, or just make the videos?",
                a: "This specific service is for the CREATION of the video ads. However, we are a full-service agency. If you also need us to manage your ad accounts, scale your budget, and optimize your campaigns, we offer comprehensive Ads Management services as well."
              },
              {
                q: "Do you use UGC (User Generated Content) creators?",
                a: "Yes! UGC is incredibly powerful for Meta and TikTok. We have a network of skilled creators and actors. We handle the sourcing, script-writing, and editing so you get polished, high-converting UGC assets without the headache of managing influencers."
              },
              {
                q: "How many hooks do you test per video?",
                a: "The hook is the most important part of any ad. For every core video concept we produce, we typically deliver 3 to 5 different hook variations. This allows you to A/B test the first 3 seconds to find what truly stops the scroll."
              },
              {
                q: "What is the turnaround time for a batch of ads?",
                a: "Once the strategy and scripts are approved, our standard turnaround time for a batch of video ads (including shooting and editing) is typically 10-14 business days, depending on the complexity and creator sourcing requirements."
              }
            ].map((faq, i) => (
              <motion.div 
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
              </motion.div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
