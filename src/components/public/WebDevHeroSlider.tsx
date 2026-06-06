"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

/* ───── 3D Layered Web Mockup ───── */
function LayeredMockup() {
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
        {/* Layer 1: Back/Database Layer */}
        <div 
          className="absolute inset-0 m-auto w-64 h-80 rounded-xl bg-slate-900 border border-slate-700/50 shadow-2xl p-4 flex flex-col gap-3"
          style={{ transform: "translateZ(-80px)" }}
        >
          <div className="w-full h-8 bg-slate-800 rounded-md animate-pulse" />
          <div className="w-3/4 h-4 bg-slate-800 rounded-sm" />
          <div className="w-full h-24 bg-slate-800/50 rounded-md border border-slate-700/50" />
          <div className="flex gap-2">
            <div className="w-1/2 h-16 bg-slate-800/50 rounded-md border border-slate-700/50" />
            <div className="w-1/2 h-16 bg-slate-800/50 rounded-md border border-slate-700/50" />
          </div>
        </div>

        {/* Layer 2: Wireframe/Code Layer */}
        <div 
          className="absolute inset-0 m-auto w-72 h-[340px] rounded-xl bg-slate-50/90 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-600 shadow-2xl p-4 flex flex-col gap-4 backdrop-blur-md"
          style={{ transform: "translateZ(0px)" }}
        >
          <div className="flex justify-between items-center">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="w-24 h-4 bg-slate-200 dark:bg-slate-700 rounded-full" />
          </div>
          <div className="w-full h-32 bg-slate-200 dark:bg-slate-700 rounded-lg" />
          <div className="grid grid-cols-2 gap-3">
            <div className="h-20 bg-slate-200 dark:bg-slate-700 rounded-lg" />
            <div className="h-20 bg-slate-200 dark:bg-slate-700 rounded-lg" />
          </div>
        </div>

        {/* Layer 3: Glass UI Layer (Frontend) */}
        <div 
          className="absolute inset-0 m-auto w-80 h-[360px] rounded-2xl bg-white/40 dark:bg-white/10 border border-white/40 dark:border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-5 flex flex-col gap-4 backdrop-blur-xl"
          style={{ transform: "translateZ(80px)" }}
        >
          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="w-8 h-8 rounded-full bg-yellow-400" />
            <div className="flex gap-2">
              <div className="w-8 h-2 bg-slate-300 dark:bg-slate-500 rounded-full" />
              <div className="w-8 h-2 bg-slate-300 dark:bg-slate-500 rounded-full" />
              <div className="w-8 h-2 bg-slate-300 dark:bg-slate-500 rounded-full" />
            </div>
          </div>
          {/* Hero Content */}
          <div className="w-3/4 h-6 bg-slate-800 dark:bg-white rounded-md mt-4" />
          <div className="w-1/2 h-4 bg-slate-400 dark:bg-slate-300 rounded-md" />
          
          <div className="w-32 h-10 bg-yellow-400 rounded-lg mt-2" />
          
          {/* Mock Cards */}
          <div className="grid grid-cols-2 gap-4 mt-auto">
            <div className="h-24 bg-white/60 dark:bg-white/5 rounded-xl border border-white/50 dark:border-white/10 p-3 flex flex-col gap-2">
              <div className="w-6 h-6 rounded-md bg-yellow-400" />
              <div className="w-full h-2 bg-slate-300 dark:bg-slate-600 rounded-full mt-auto" />
            </div>
            <div className="h-24 bg-white/60 dark:bg-white/5 rounded-xl border border-white/50 dark:border-white/10 p-3 flex flex-col gap-2">
              <div className="w-6 h-6 rounded-md bg-green-400" />
              <div className="w-full h-2 bg-slate-300 dark:bg-slate-600 rounded-full mt-auto" />
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  );
}

export default function WebDevHeroSlider() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative w-full min-h-screen sm:min-h-[800px] flex items-center overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/web-dev-hero.jpg"
          alt="Web Development Background"
          fill
          priority
          className="object-cover object-center"
          quality={90}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6 sm:mb-8"
            >
              <Code className="w-4 h-4 text-yellow-400" />
              <span className="text-xs sm:text-sm font-bold text-white/90 uppercase tracking-widest">
                Full-Stack Web Engineering
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-2xl drop-shadow-lg"
            >
              Build the <br className="hidden sm:block" />
              <span className="text-yellow-500 dark:text-yellow-400">
                Web of Tomorrow
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg md:text-xl text-white/85 max-w-xl font-medium leading-relaxed drop-shadow-md"
            >
              High-performance, scalable, and beautifully crafted websites designed to convert visitors into loyal customers and accelerate your digital growth.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <Link href="#portfolio" className="w-full sm:w-auto px-8 py-4 rounded-full bg-yellow-400 text-black font-bold hover:bg-yellow-500 transition-colors flex items-center justify-center group">
                View Our Portfolio
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/contact" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 text-white font-bold hover:bg-white/20 transition-colors border border-white/20 flex items-center justify-center backdrop-blur-sm">
                Start a Project
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
              {mounted && <LayeredMockup />}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
