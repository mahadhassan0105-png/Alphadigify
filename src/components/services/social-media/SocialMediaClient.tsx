/* eslint-disable react/no-unescaped-entities */
"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/public/Footer";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, MessageCircle, BarChart3, Video, Heart, Share2, ChevronDown, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const PLATFORMS = [
  {
    name: "TikTok & Reels",
    icon: <Video className="w-6 h-6 text-slate-800 dark:text-white" />,
    desc: "Short-form video domination. We write the hooks, source the creators, and edit for maximum retention and virality.",
    color: "from-yellow-400/20 to-amber-500/20"
  },
  {
    name: "Instagram",
    icon: <Heart className="w-6 h-6 text-slate-800 dark:text-white" />,
    desc: "Aesthetic grid curation, community building via Stories, and direct-response DM automation strategies.",
    color: "from-amber-500/20 to-yellow-600/20"
  },
  {
    name: "LinkedIn",
    icon: <Users className="w-6 h-6 text-slate-800 dark:text-white" />,
    desc: "B2B thought leadership. We turn founders into industry authorities with ghostwritten, high-impact text and carousel posts.",
    color: "from-yellow-500/20 to-amber-400/20"
  },
  {
    name: "Facebook / Meta",
    icon: <Share2 className="w-6 h-6 text-slate-800 dark:text-white" />,
    desc: "Community group management and organic content designed to synergize perfectly with your paid ad funnels.",
    color: "from-yellow-400/20 to-amber-600/20"
  }
];

const PROCESS_STEPS = [
  { step: "01", title: "Brand Voice & Strategy", desc: "We define your core content pillars and visual identity." },
  { step: "02", title: "Content Engine", desc: "Batch scripting, shooting, or sourcing high-quality UGC." },
  { step: "03", title: "Viral Post-Production", desc: "CapCut-style dynamic editing, trending audio, and engaging captions." },
  { step: "04", title: "Community Management", desc: "Daily posting, active community engagement, and performance tracking." }
];

export default function SocialMediaClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <main className="min-h-screen bg-[#F8F9FA] dark:bg-[#0B0C10] text-slate-900 dark:text-white font-sans overflow-x-hidden selection:bg-yellow-500/30" ref={containerRef}>
      <Navbar />

      {/* 1. HERO SECTION (Dynamic & Viral) */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-[90vh] flex items-center">
        {/* Background Image Setup */}
        <div 
          className="absolute inset-0 z-0"
          style={{ clipPath: 'ellipse(120% 95% at 50% 0%)' }}
        >
          <Image 
            src="/social-media-hero.jpg" 
            alt="Social Media Marketing" 
            fill 
            className="object-cover"
            priority
          />
          {/* Overlay to ensure text remains readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C10]/95 via-[#0B0C10]/80 to-transparent backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-[#0B0C10]/40" /> {/* Base dimming layer */}
        </div>

        {/* Subtle Background Elements */}
        <div className="absolute top-[10%] left-[20%] w-[300px] h-[300px] bg-yellow-500/20 blur-[100px] rounded-full pointer-events-none z-0" />
        <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-amber-500/20 blur-[120px] rounded-full pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center w-full">
          
          {/* Hero Text */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ y: yParallax, opacity: opacityFade }}
            className="flex flex-col items-start"
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6 lg:mb-8">
              <TrendingUp className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-semibold tracking-wide uppercase text-slate-200">Social Media Agency</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.05] tracking-tight mb-6 text-white drop-shadow-lg">
              We Build <br />
              <span className="text-yellow-400">
                Cult Followings.
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-200 max-w-lg leading-relaxed mb-10 font-medium drop-shadow-md">
              Stop posting into the void. We engineer viral content strategies that turn passive scrollers into active, loyal customers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link href="#contact">
                <Button size="lg" className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-400 text-slate-900 h-14 px-8 text-base font-bold rounded-full transition-all hover:scale-105 shadow-lg shadow-yellow-500/20">
                  Dominate Your Niche
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Floating UI Cards (The "Viral" Feel) */}
          <div className="relative h-[500px] lg:h-[600px] w-full hidden md:block perspective-1000">
            {/* TikTok Style Card */}
            <motion.div 
              initial={{ opacity: 0, y: 50, rotate: -10 }}
              animate={{ opacity: 1, y: 0, rotate: -5 }}
              transition={{ duration: 1, delay: 0.2, type: "spring" }}
              className="absolute top-[10%] left-[10%] w-64 h-96 bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden z-20 flex flex-col"
            >
               <div className="flex-1 bg-slate-800 relative">
                 <Image src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=400&q=80" alt="Video Content" fill className="object-cover opacity-80" />
                 {/* Fake UI */}
                 <div className="absolute bottom-4 left-4 right-12 text-white">
                   <p className="font-bold text-sm text-yellow-400">@alphadigify</p>
                   <p className="text-xs line-clamp-2 mt-1">This hook formula generated 1.2M views in 24 hours 🚀 #marketing #growth</p>
                 </div>
                 <div className="absolute bottom-4 right-2 flex flex-col space-y-4 text-white items-center">
                    <div className="flex flex-col items-center"><Heart className="w-6 h-6 fill-white" /><span className="text-[10px] mt-1 font-bold">124K</span></div>
                    <div className="flex flex-col items-center"><MessageCircle className="w-6 h-6 fill-white" /><span className="text-[10px] mt-1 font-bold">1,204</span></div>
                    <div className="flex flex-col items-center"><Share2 className="w-6 h-6 fill-white" /><span className="text-[10px] mt-1 font-bold">8.4K</span></div>
                 </div>
               </div>
            </motion.div>

            {/* Instagram Style Card */}
            <motion.div 
              initial={{ opacity: 0, x: 50, rotate: 10 }}
              animate={{ opacity: 1, x: 0, rotate: 5 }}
              transition={{ duration: 1, delay: 0.4, type: "spring" }}
              className="absolute top-[30%] right-[5%] w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 z-10 p-4"
            >
               <div className="flex items-center space-x-3 mb-3">
                 <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-yellow-500 to-amber-600 p-[2px]">
                   <div className="w-full h-full bg-white dark:bg-slate-900 rounded-full flex items-center justify-center overflow-hidden">
                     <Image src="/alphadigify-logo.jpg" alt="Logo" width={32} height={32} className="object-cover" />
                   </div>
                 </div>
                 <span className="font-bold text-sm text-slate-900 dark:text-white">alphadigify</span>
               </div>
               <div className="w-full aspect-square rounded-lg bg-slate-100 dark:bg-slate-800 mb-3 relative overflow-hidden">
                 <Image src="https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=400&q=80" alt="Post" fill className="object-cover" />
               </div>
               <div className="flex space-x-4 mb-2">
                 <Heart className="w-6 h-6 text-slate-900 dark:text-white" />
                 <MessageCircle className="w-6 h-6 text-slate-900 dark:text-white" />
                 <Share2 className="w-6 h-6 text-slate-900 dark:text-white" />
               </div>
               <p className="text-sm font-bold text-slate-900 dark:text-white">4,285 likes</p>
            </motion.div>

            {/* Notification Popups */}
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1, type: "spring" }}
              className="absolute top-[20%] right-[35%] bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 flex items-center space-x-2 z-30"
            >
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
              <span className="text-xs font-bold">+10k Followers this week</span>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 1.5 FULL SERVICE SOCIAL MEDIA AGENCY */}
      <section className="py-14 bg-white dark:bg-slate-950 border-y border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
             
             {/* Left Text */}
             <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6">
                  Full service Social Media agency
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-6">
                  It takes more than just posting pictures to build a cult following. With our full-stack management, you get a holistic approach to viral growth and brand authority.
                </p>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                  From scripting and shooting to editing, posting, and community management—we engineer the entire social funnel so you don't have to lift a finger.
                </p>
             </div>

             {/* Right Animation: Infinite Scrolling Masonry Feed */}
             <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative flex items-center justify-center">
              <div 
                className="relative w-full max-w-[500px] h-[450px] md:h-[550px] rounded-3xl overflow-hidden bg-slate-50 dark:bg-[#0B0C10]/50 border border-slate-200 dark:border-slate-800"
                style={{ 
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)', 
                  maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' 
                }}
              >
                <div className="grid grid-cols-3 gap-3 md:gap-4 p-4 w-full" style={{ height: '200%' }}>
                  
                  {/* Column 1 (Scrolls UP) */}
                  <motion.div 
                    animate={{ y: [0, "-50%"] }} 
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }} 
                    className="flex flex-col gap-3 md:gap-4 h-full"
                  >
                    {[
                      { img: "/tiktok_bg_1.jpg", likes: "14.2K", type: "video" },
                      { img: "/amazon_bg_1.jpg", likes: "8.9K", type: "image" },
                      { img: "/hero_slide_1.jpg", likes: "22.1K", type: "video" },
                      { img: "/tiktok_bg_1.jpg", likes: "14.2K", type: "video" },
                      { img: "/amazon_bg_1.jpg", likes: "8.9K", type: "image" },
                      { img: "/hero_slide_1.jpg", likes: "22.1K", type: "video" }
                    ].map((item, i) => (
                      <div key={i} className="bg-white dark:bg-slate-800/80 rounded-2xl p-3 shadow-sm border border-slate-100 dark:border-slate-700/50 flex flex-col shrink-0">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Image src="/alphadigify-logo.jpg" alt="Logo" width={24} height={24} className="rounded-full object-cover w-6 h-6 border border-slate-200 dark:border-slate-700" />
                            <span className="text-[11px] font-bold text-slate-900 dark:text-white tracking-tight">alphadigify</span>
                          </div>
                          {item.type === "video" && <Video className="w-3 h-3 text-slate-400" />}
                        </div>
                        <div className="w-full aspect-[4/5] rounded-xl mb-3 overflow-hidden relative bg-slate-100 dark:bg-slate-700">
                          <Image src={item.img} alt="Post content" fill className="object-cover" />
                        </div>
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex gap-2">
                             <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                             <MessageCircle className="w-4 h-4 text-slate-400" />
                          </div>
                          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">{item.likes}</span>
                        </div>
                      </div>
                    ))}
                  </motion.div>

                  {/* Column 2 (Scrolls DOWN) */}
                  <motion.div 
                    animate={{ y: ["-50%", 0] }} 
                    transition={{ repeat: Infinity, duration: 25, ease: "linear" }} 
                    className="flex flex-col gap-3 md:gap-4 h-full"
                  >
                    {[
                      { img: "/team.png", likes: "5.4K", type: "image" },
                      { img: "/tiktok_bg_2.jpg", likes: "31.5K", type: "video" },
                      { img: "/amazon-reinstatement-hero.jpg", likes: "12.8K", type: "image" },
                      { img: "/team.png", likes: "5.4K", type: "image" },
                      { img: "/tiktok_bg_2.jpg", likes: "31.5K", type: "video" },
                      { img: "/amazon-reinstatement-hero.jpg", likes: "12.8K", type: "image" }
                    ].map((item, i) => (
                      <div key={i} className="bg-white dark:bg-slate-800/80 rounded-2xl p-3 shadow-sm border border-slate-100 dark:border-slate-700/50 flex flex-col shrink-0">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Image src="/alphadigify-logo.jpg" alt="Logo" width={24} height={24} className="rounded-full object-cover w-6 h-6 border border-slate-200 dark:border-slate-700" />
                            <span className="text-[11px] font-bold text-slate-900 dark:text-white tracking-tight">alphadigify</span>
                          </div>
                          {item.type === "video" && <Video className="w-3 h-3 text-slate-400" />}
                        </div>
                        <div className="w-full aspect-square rounded-xl mb-3 overflow-hidden relative bg-slate-100 dark:bg-slate-700">
                           <Image src={item.img} alt="Post content" fill className="object-cover" />
                        </div>
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex gap-2">
                             <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                             <MessageCircle className="w-4 h-4 text-slate-400" />
                          </div>
                          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">{item.likes}</span>
                        </div>
                      </div>
                    ))}
                  </motion.div>

                  {/* Column 3 (Scrolls UP) */}
                  <motion.div 
                    animate={{ y: [0, "-50%"] }} 
                    transition={{ repeat: Infinity, duration: 18, ease: "linear" }} 
                    className="flex flex-col gap-3 md:gap-4 h-full"
                  >
                    {[
                      { img: "/amazon_bg_2.jpg", likes: "18.1K", type: "image" },
                      { img: "/hero_slide_2.jpg", likes: "42.3K", type: "video" },
                      { img: "/tiktok_bg_1.jpg", likes: "9.2K", type: "image" },
                      { img: "/amazon_bg_2.jpg", likes: "18.1K", type: "image" },
                      { img: "/hero_slide_2.jpg", likes: "42.3K", type: "video" },
                      { img: "/tiktok_bg_1.jpg", likes: "9.2K", type: "image" }
                    ].map((item, i) => (
                      <div key={i} className="bg-white dark:bg-slate-800/80 rounded-2xl p-3 shadow-sm border border-slate-100 dark:border-slate-700/50 flex flex-col shrink-0">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Image src="/alphadigify-logo.jpg" alt="Logo" width={24} height={24} className="rounded-full object-cover w-6 h-6 border border-slate-200 dark:border-slate-700" />
                            <span className="text-[11px] font-bold text-slate-900 dark:text-white tracking-tight">alphadigify</span>
                          </div>
                          {item.type === "video" && <Video className="w-3 h-3 text-slate-400" />}
                        </div>
                        <div className="w-full aspect-[3/4] rounded-xl mb-3 overflow-hidden relative bg-slate-100 dark:bg-slate-700">
                          <Image src={item.img} alt="Post content" fill className="object-cover" />
                        </div>
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex gap-2">
                             <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                             <MessageCircle className="w-4 h-4 text-slate-400" />
                          </div>
                          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">{item.likes}</span>
                        </div>
                      </div>
                    ))}
                  </motion.div>

                </div>
                
                {/* Center Glassmorphism CTA overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-6 py-5 rounded-2xl border border-white/50 dark:border-slate-700 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_50px_-12px_rgba(234,179,8,0.15)] flex flex-col items-center"
                  >
                    <div className="w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center mb-3 shadow-lg shadow-yellow-400/40">
                      <TrendingUp className="w-7 h-7 text-slate-900" />
                    </div>
                    <span className="font-black text-slate-900 dark:text-white text-xl tracking-wider uppercase">Viral Engine</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>

           </div>
        </div>
      </section>

      {/* 2. VANITY VS SANITY (Metrics that Matter) */}
      <section className="py-14 relative bg-white dark:bg-[#0B0C10] overflow-hidden border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-20">
          <div>
              <div className="inline-flex items-center space-x-2 bg-yellow-400 text-slate-900 font-bold px-4 py-1.5 rounded-full mb-6">
                <BarChart3 className="w-4 h-4" />
                <span className="text-xs uppercase tracking-widest">Our Philosophy</span>
              </div>
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-6 text-slate-900 dark:text-white uppercase tracking-tight">
              Vanity <span className="text-slate-300 dark:text-slate-700">vs.</span> <span className="text-yellow-400">Sanity</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              We don't care about metrics that look good on paper. We exclusively track the numbers that pay your payroll and drive actual business growth.
            </p>
          </div>

          <div className="space-y-8 md:space-y-12">
            {[
              { vanity: "1.2M Followers", vanityLabel: "Vanity (Ego)", sanity: "$142K Revenue", sanityLabel: "Sanity (Sales)" },
              { vanity: "8.5M Impressions", vanityLabel: "Vanity (Views)", sanity: "12.4% Click Rate", sanityLabel: "Sanity (Action)" },
              { vanity: "45K Random Likes", vanityLabel: "Vanity (Fluff)", sanity: "$14.50 CPA", sanityLabel: "Sanity (Profit)" }
            ].map((row, i) => (
              <div 
                key={i}
                className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 group relative"
              >
                {/* Connecting Line (Desktop only) */}
                <div className="hidden md:block absolute left-1/2 top-1/2 -translate-y-1/2 w-[60%] -translate-x-1/2 h-px bg-slate-200 dark:bg-slate-800 -z-10 group-hover:bg-yellow-400/50 transition-colors duration-500" />

                {/* Vanity */}
                <div className="w-full md:w-2/5 text-center md:text-right">
                  <p className="text-2xl md:text-3xl font-bold text-slate-400 line-through decoration-slate-300 dark:decoration-slate-700 transition-colors duration-300 group-hover:text-slate-300 dark:group-hover:text-slate-600">
                    {row.vanity}
                  </p>
                  <p className="text-xs text-slate-400 uppercase tracking-widest mt-2">{row.vanityLabel}</p>
                </div>
                
                {/* VS Divider */}
                <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-400 font-bold italic border-[4px] border-white dark:border-[#0B0C10] group-hover:bg-yellow-400 group-hover:text-slate-900 transition-all duration-300 shadow-sm z-10 scale-90 group-hover:scale-110">
                  VS
                </div>

                {/* Sanity */}
                <div className="w-full md:w-2/5 text-center md:text-left">
                  <p className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white group-hover:text-yellow-500 transition-colors duration-300">
                    {row.sanity}
                  </p>
                  <p className="text-xs text-yellow-500 font-bold uppercase tracking-widest mt-2">{row.sanityLabel}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. PLATFORMS (The Arsenal) */}
      <section className="py-14 bg-white dark:bg-[#0B0C10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-24">
            <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tight text-slate-900 dark:text-white">Platform Dominance</h2>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              We deploy platform-native content. No lazy cross-posting. Every piece of content is engineered specifically for the algorithm it lives on.
            </p>
          </div>

          <div className="flex flex-col border-t border-slate-200 dark:border-slate-800">
            {PLATFORMS.map((platform, i) => (
              <div 
                key={i}
                className="group flex flex-col lg:flex-row items-start lg:items-center justify-between py-10 lg:py-16 border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-[#121318]/50 transition-colors duration-500 px-4 lg:px-8 cursor-default"
              >
                {/* Icon & Title */}
                <div className="flex items-center gap-6 md:gap-10 w-full lg:w-1/2 mb-6 lg:mb-0">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-400 group-hover:text-yellow-500 group-hover:scale-110 group-hover:bg-yellow-50 dark:group-hover:bg-yellow-500/10 transition-all duration-500 shrink-0 shadow-sm group-hover:shadow-yellow-400/20">
                    {/* Cloning icon to force size/color correctly */}
                    <div className="[&>svg]:w-8 [&>svg]:h-8 md:[&>svg]:w-10 md:[&>svg]:h-10">
                      {platform.icon}
                    </div>
                  </div>
                  <h3 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white group-hover:text-yellow-500 transition-colors duration-300 tracking-tight">
                    {platform.name}
                  </h3>
                </div>
                
                {/* Description */}
                <div className="w-full lg:w-1/2 lg:pl-16">
                  <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors duration-300">
                    {platform.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE CONTENT ENGINE WORKFLOW (Horizontal Assembly Line) */}
      <section className="py-16 md:py-24 bg-white dark:bg-[#0B0C10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-20">
            <div className="inline-flex items-center gap-2 bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20 text-yellow-700 dark:text-yellow-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5" /> How It Works
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              The <span className="text-yellow-500">Content Engine</span>
            </h2>
            <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              A frictionless, done-for-you pipeline so you can focus on running your business while we build your audience.
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
              Consistency + Quality = Virality.
            </h4>
          </div>

        </div>
      </section>

      {/* 5. FAQs */}
      <section className="py-10 md:py-14 relative bg-white dark:bg-[#0B0C10]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-wide">
              Social Media Growth<br/>
              <span className="text-yellow-500">FAQs</span>
            </h2>
          </div>

          <div className="border-t-[1.5px] border-slate-200 dark:border-slate-800">
            {[
              {
                q: "Do you guarantee a certain number of followers or views?",
                a: "We guarantee consistent, high-quality output and data-driven strategies. While we cannot control the algorithm's exact numbers, our focus on 'Sanity Metrics' ensures that the growth you do see translates directly into business value, not just empty vanity numbers."
              },
              {
                q: "What platforms do you specialize in?",
                a: "We specialize in TikTok, Instagram Reels, LinkedIn, and YouTube Shorts. Our approach is platform-native, meaning we tailor the format, hook, and editing style specifically to the algorithm of the platform where the content is posted."
              },
              {
                q: "How much of my time will this take?",
                a: "Our goal is to make the process as frictionless as possible. In the 'Discovery & Strategy' phase, we'll need a few hours of your time. After that, if we are capturing content, it usually requires just 2-4 hours of your time per month to batch-record videos while we handle all the ideation, scripting, editing, and posting."
              },
              {
                q: "Do you manage paid social media ads as well?",
                a: "Yes! While organic growth builds your brand foundation, paid amplification accelerates it. We often integrate our viral organic content into paid funnels to lower your Cost Per Acquisition (CPA) and scale revenue predictably."
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
