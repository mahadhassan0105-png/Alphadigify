"use client";

import { motion } from "framer-motion";
import { ArrowRight, Search, BarChart3, TrendingUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

/* ───── 3D SEO Analytics Mockup ───── */
function SeoAnalyticsMockup() {
  return (
    <div className="relative w-full aspect-square max-w-[500px] flex items-center justify-center perspective-[1500px]">
      <motion.div
        animate={{ 
          rotateX: [20, 25, 20], 
          rotateY: [-15, -20, -15],
          y: [-10, 10, -10]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-full h-[350px] transform-style-3d"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Base Layer: Graph Background */}
        <div 
          className="absolute inset-0 m-auto w-80 h-72 rounded-2xl bg-slate-900 border border-slate-700/50 shadow-2xl p-6 flex flex-col gap-4"
          style={{ transform: "translateZ(-40px)" }}
        >
          <div className="w-1/3 h-4 bg-slate-800 rounded-sm" />
          <div className="flex-1 flex items-end gap-3 pt-4 border-b border-l border-slate-700/50 pb-2 pl-2">
            {[20, 35, 25, 50, 45, 70, 85].map((h, i) => (
              <div 
                key={i} 
                className="w-full bg-slate-800 rounded-t-sm" 
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        {/* Middle Layer: Floating Search Bar */}
        <div 
          className="absolute top-10 left-0 right-0 mx-auto w-72 h-14 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 shadow-xl flex items-center px-4 gap-3 backdrop-blur-md"
          style={{ transform: "translateZ(40px)" }}
        >
          <Search className="w-5 h-5 text-slate-400" />
          <div className="w-3/4 h-3 bg-slate-200 dark:bg-slate-700 rounded-full" />
        </div>

        {/* Front Layer: Rising Traffic Bars (Yellow) */}
        <div 
          className="absolute inset-0 m-auto w-64 h-48 mt-28 flex items-end justify-between px-2"
          style={{ transform: "translateZ(80px)" }}
        >
          {[30, 45, 60, 85, 100].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: "0%" }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 1.5, delay: i * 0.2, type: "spring" }}
              className="w-8 rounded-t-md bg-gradient-to-t from-yellow-500 to-yellow-300 shadow-[0_0_15px_rgba(250,204,21,0.5)]"
            />
          ))}
          {/* Trending Arrow Overlay */}
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="absolute -right-4 -top-8 bg-yellow-400 text-black p-2 rounded-full shadow-lg"
          >
            <TrendingUp className="w-6 h-6" strokeWidth={3} />
          </motion.div>
        </div>

      </motion.div>
    </div>
  );
}

export default function SeoHeroSlider() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative w-full min-h-screen sm:min-h-[800px] flex items-center overflow-hidden bg-white dark:bg-[#030712] pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/seo-hero-bg.png"
          alt="SEO and Digital Growth Background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Light mode overlay — reduced since image is bright, dark mode overlay increased */}
        <div className="absolute inset-0 bg-white/40 dark:bg-[#030712]/85" />
        {/* Gradient fade edges */}
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#030712]/90 via-transparent to-white/30 dark:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/60 dark:from-[#030712]/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left: Text Content */}
          <div className="flex flex-col items-start text-left pt-10 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-sm mb-6 sm:mb-8"
            >
              <BarChart3 className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />
              <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest">
                Data-Driven SEO Growth
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] max-w-2xl"
            >
              Dominate the <br className="hidden sm:block" />
              <span className="text-yellow-500 dark:text-yellow-400">
                Search Rankings
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-xl font-medium leading-relaxed"
            >
              Stop hiding on page two. We use advanced technical SEO, high-authority link building, and targeted content strategies to drive massive organic traffic to your business.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <Link href="#solutions" className="w-full sm:w-auto px-8 py-4 rounded-full bg-yellow-400 text-black font-bold hover:bg-yellow-500 transition-colors flex items-center justify-center group">
                Audit My Website
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/contact" className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white font-bold hover:bg-slate-200 dark:hover:bg-white/10 transition-colors border border-slate-200 dark:border-white/10 flex items-center justify-center backdrop-blur-sm">
                View Our Process
              </Link>
            </motion.div>
          </div>

          {/* Right: 3D Animated Mockup */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex items-center justify-center w-full h-[350px] sm:h-[500px] lg:h-[600px] relative"
          >
            <div className="scale-75 sm:scale-100 flex items-center justify-center w-full h-full">
              {mounted && <SeoAnalyticsMockup />}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
