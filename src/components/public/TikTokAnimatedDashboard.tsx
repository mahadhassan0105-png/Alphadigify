/* eslint-disable @next/next/no-img-element */
"use client";

import { motion, type Variants, animate } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import { useEffect, useRef } from "react";

interface Props {
  theme: { primary: string; secondary: string; accent: string; bgGradient: string; bgLight: string; border: string; borderLight: string; };
  isActive: boolean;
  layoutId?: number;
}

function Counter({ from, to, prefix = "", suffix = "", decimals = 0, isActive }: { from: number; to: number; prefix?: string; suffix?: string; decimals?: number; isActive: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (isActive) {
      const c = animate(from, to, { duration: 2, ease: "easeOut", delay: 0.8, onUpdate(v) { if (ref.current) ref.current.textContent = `${prefix}${v.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}${suffix}`; } });
      return () => c.stop();
    } else { if (ref.current) ref.current.textContent = `${prefix}${from.toFixed(decimals)}${suffix}`; }
  }, [from, to, isActive, prefix, suffix, decimals]);
  return <span ref={ref}>{prefix}{from.toFixed(decimals)}{suffix}</span>;
}

export default function TikTokAnimatedDashboard({ theme, isActive, layoutId = 1 }: Props) {
  const { theme: mode } = useTheme();
  const isDark = mode === "dark";

  const containerVariants: Variants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } } };
  const itemVariants: Variants = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 250, damping: 24 } } };

  if (layoutId === 2) {
    // LAYOUT 2: TikTok Shop Seller Center (Matching Screenshot)
    return (
      <article className={`w-full h-full ${isDark ? 'bg-[#0f1117] text-slate-200' : 'bg-[#f4f5f5] text-slate-800'} flex flex-col font-sans overflow-hidden`}>
        <motion.div variants={containerVariants} initial="show" animate="show" className="w-full h-full flex flex-col z-10">
          {/* Top Navbar */}
          <motion.header variants={itemVariants} className="w-full h-12 bg-black text-white flex items-center justify-between px-4 shrink-0 shadow-sm relative z-20">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                 <svg viewBox="0 0 448 512" className="w-4 h-4 fill-white"><path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/></svg>
                 <div className="leading-tight flex flex-col justify-center">
                   <span className="font-bold text-[10px] block leading-none">TikTok</span>
                   <span className="font-bold text-[10px] block leading-none mt-[1px]">Shop</span>
                 </div>
                 <div className="h-4 w-px bg-slate-700 mx-1 lg:mx-2" />
                 <span className="font-medium text-xs lg:text-sm tracking-wide">Seller Center</span>
              </div>
              <div className="hidden md:flex bg-[#1E2024] rounded px-3 py-1.5 items-center w-64 border border-[#33353A]">
                 <span className="text-slate-400 text-[10px] mr-2">🔍</span>
                 <span className="text-slate-400 text-[10px] flex-1">Ask anything</span>
                 <span className="text-slate-500 text-[9px]">Ctrl+K</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-xs font-medium">
               <div className="hidden lg:flex items-center space-x-1.5 hover:text-gray-300 cursor-pointer bg-[#1A2624] px-2 py-1 rounded-md">
                 <span className="text-[#25F4EE] text-[10px]">🌿</span>
                 <span className="text-[10px]">Growth</span>
               </div>
               <span className="text-lg text-slate-300">?</span>
               <div className="hidden lg:block h-4 w-px bg-slate-700" />
               <div className="hidden lg:flex items-center space-x-1.5 cursor-pointer hover:text-gray-300">
                  <span className="text-sm">🎧</span>
                  <span className="text-[10px]">Customer Messages</span>
               </div>
               <span className="text-sm">🔔</span>
               <div className="flex items-center space-x-1.5">
                 <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center text-black text-[8px] font-bold">ND</div>
                 <span className="text-[10px] font-medium hidden sm:block">HandMoto</span>
               </div>
            </div>
          </motion.header>

          <div className="flex flex-1 overflow-hidden relative">
            {/* Decorative background shapes mimicking screenshot */}
            <div className="absolute top-0 left-0 w-full h-32 bg-black z-0 pointer-events-none" />
            <div className="absolute top-6 left-[28%] w-3 h-3 bg-[#FE2C55] -rotate-12 z-0 opacity-80" />
            <div className="absolute top-12 left-[25%] w-4 h-3 bg-[#FE2C55] rotate-45 z-0 opacity-90" />
            <div className="absolute top-6 right-[22%] w-12 h-12 bg-[#25F4EE] rotate-12 z-0 rounded-sm" />
            <div className="absolute top-3 right-[18%] w-3 h-3 bg-[#FE2C55] z-0 rotate-45" />

            {/* Sidebar */}
            <motion.aside variants={itemVariants} className={`w-36 lg:w-44 ${isDark ? 'bg-[#1a1d27] border-slate-700' : 'bg-white border-slate-200'} border-r flex flex-col py-3 shrink-0 z-10 shadow-sm relative h-full overflow-y-auto [&::-webkit-scrollbar]:hidden`}>
              {[
                { icon: '🏠', label: 'Home', active: true },
                { icon: '⭐', label: 'Quick access ↗' },
                { divider: true },
                { icon: '📋', label: 'Orders' },
                { icon: '🛍️', label: 'Products' },
                { icon: '🚚', label: 'Logistics' },
                { divider: true },
                { icon: '📢', label: 'Marketing' },
                { icon: '👥', label: 'Customers' },
                { icon: '🤝', label: 'Affiliate' },
                { icon: '📹', label: 'LIVE & video' },
                { icon: '📈', label: 'Growth' },
                { icon: '🧩', label: 'Apps & partners' }
              ].map((item, i) => (
                item.divider ? (
                  <div key={i} className="my-2 h-px bg-slate-100 w-full" />
                ) : (
                  <div key={i} className={`flex items-center space-x-3 px-4 py-2 text-[10px] lg:text-xs cursor-pointer ${item.active ? 'bg-[#E6F8F8] text-[#008080] font-semibold border-l-4 border-[#008080]' : 'text-slate-600 hover:bg-slate-50 border-l-4 border-transparent'}`}>
                    <span className="opacity-70 text-[10px]">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                )
              ))}
            </motion.aside>

            {/* Main Dashboard Area */}
            <main className="flex-1 p-4 lg:p-6 flex flex-col gap-5 relative z-10 overflow-y-auto [&::-webkit-scrollbar]:hidden">
               
               <div className="flex flex-col lg:flex-row gap-4 w-full pt-6 lg:pt-8">
                 {/* Left big card */}
                 <motion.div variants={itemVariants} className={`${isDark ? 'bg-[#1a1d27] border-slate-700' : 'bg-white border-slate-100'} rounded-lg p-5 shadow-sm flex-1 border flex flex-col justify-center min-h-[140px]`}>
                   <div className="flex justify-between items-center mb-6">
                     <div className={`text-xs font-medium cursor-pointer flex items-center ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>Last 7 days <span className="ml-1 text-[8px]">˅</span></div>
                     <div className={`text-[10px] flex items-center ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Updated on May 3, 00:00 (GMT-08:00) <span className="ml-2 text-slate-400">📝</span></div>
                   </div>
                   <div className="grid grid-cols-4 gap-4">
                     <div className="flex flex-col">
                       <span className={`text-[10px] mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>GMV {'>'}</span>
                       <span className={`text-base lg:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>$<Counter from={0} to={145250.50} decimals={2} isActive={isActive} /></span>
                     </div>
                     <div className="flex flex-col">
                       <span className={`text-[10px] mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Customers {'>'}</span>
                       <span className={`text-base lg:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}><Counter from={0} to={3420} isActive={isActive} /></span>
                     </div>
                     <div className="flex flex-col">
                       <span className={`text-[10px] mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>SKU orders {'>'}</span>
                       <span className={`text-base lg:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}><Counter from={0} to={4850} isActive={isActive} /></span>
                     </div>
                     <div className="flex flex-col">
                       <span className={`text-[10px] mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Visitors {'>'}</span>
                       <span className={`text-base lg:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}><Counter from={0} to={85200} isActive={isActive} /></span>
                     </div>
                   </div>
                 </motion.div>

                 {/* Right small card */}
                 <motion.div variants={itemVariants} className={`${isDark ? 'bg-[#1a1d27] border-slate-700' : 'bg-gradient-to-br from-white to-[#EAFDFB] border-slate-100'} rounded-lg p-5 shadow-sm w-full lg:w-64 border flex flex-col`}>
                   <div className="flex justify-between items-center mb-4">
                     <div className={`text-xs font-bold flex items-center ${isDark ? 'text-slate-200' : 'text-slate-800'}`}><span className="mr-2 text-[10px]">📈</span> Shop performance</div>
                     <div className="text-slate-400 text-[10px]">{'<'} {'>'}</div>
                   </div>
                   <h3 className={`text-[13px] font-bold mb-1 flex items-center space-x-2 ${isDark ? 'text-white' : 'text-slate-800'}`}><span>Excellent</span> <span className="text-green-500 text-base">●</span></h3>
                   <p className={`text-[9px] leading-relaxed max-w-[80%] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Your shop is outperforming 94% of similar stores.</p>
                 </motion.div>
               </div>

               {/* To-do list section */}
               <motion.div variants={itemVariants} className="flex flex-col">
                 <h3 className={`text-sm font-bold mb-0.5 ${isDark ? 'text-white' : 'text-slate-800'}`}>To-do list</h3>
                 <p className={`text-[10px] mb-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>These are the key daily tasks for your shop.</p>
                 
                 <div className={`${isDark ? 'bg-[#1a1d27] border-slate-700' : 'bg-white border-slate-100'} rounded-lg p-5 shadow-sm border grid grid-cols-2 lg:grid-cols-5 gap-4`}>
                    {[
                      { label: "Orders to ship", count: 12, sub: "Pending dispatch" },
                      { label: "Pending returns", count: 3, sub: "Needs review" },
                      { label: "Unread violation ticket(s)", count: 0, sub: "All caught up!" },
                      { label: "Low stock", count: 5, sub: "Restock required" },
                      { label: "Address negative reviews", count: 1, sub: "Action needed" }
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col">
                        <span className={`text-[9px] mb-2 truncate ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{item.label} {'>'}</span>
                        <span className={`text-lg lg:text-xl font-bold mb-1 ${item.count > 0 ? 'text-[#FE2C55]' : (isDark ? 'text-white' : 'text-slate-800')}`}>
                           <Counter from={0} to={item.count} isActive={isActive} />
                        </span>
                        <span className={`text-[8px] ${item.count > 0 ? 'text-red-400 font-medium' : (isDark ? 'text-slate-500' : 'text-slate-400')}`}>{item.sub}</span>
                      </div>
                    ))}
                 </div>
               </motion.div>
               
            </main>
          </div>
        </motion.div>
      </article>
    );
  }

  if (layoutId === 3) {
    // LAYOUT 3: TikTok Shop Ads Dashboard (Matching Screenshot)
    return (
      <article className={`w-full h-full ${isDark ? 'bg-[#0f1117] text-slate-200' : 'bg-[#f4f5f5] text-slate-800'} flex flex-col font-sans overflow-hidden`}>
        <motion.div variants={containerVariants} initial="show" animate="show" className="w-full h-full flex flex-col z-10">
          {/* Top Navbar */}
          <motion.header variants={itemVariants} className="w-full h-12 bg-[#1A1A1A] text-white flex items-center justify-between px-4 shrink-0 shadow-sm relative z-20">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                 <svg viewBox="0 0 448 512" className="w-4 h-4 fill-white"><path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/></svg>
                 <div className="leading-tight flex flex-col justify-center">
                   <span className="font-bold text-[10px] block leading-none">TikTok</span>
                   <span className="font-bold text-[10px] block leading-none mt-[1px]">Shop</span>
                 </div>
                 <div className="h-4 w-px bg-slate-700 mx-1 lg:mx-2" />
                 <span className="font-medium text-xs lg:text-sm tracking-wide">Seller Center</span>
              </div>
              <div className="hidden md:flex bg-[#2B2B2B] rounded px-3 py-1.5 items-center w-64 border border-[#3E3E3E]">
                 <span className="text-slate-400 text-[10px] mr-2">🔍</span>
                 <span className="text-slate-400 text-[10px] flex-1">Ask anything</span>
                 <span className="text-slate-500 text-[9px] font-semibold">Ctrl+K</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-xs font-medium">
               <span className="text-lg text-slate-300">?</span>
               <div className="hidden lg:block h-4 w-px bg-slate-700" />
               <div className="hidden lg:flex items-center space-x-1.5 cursor-pointer hover:text-gray-300">
                  <span className="text-sm">🎧</span>
                  <span className="text-[10px]">Customer messages</span>
               </div>
               <span className="text-sm">🔔</span>
               <div className="flex items-center space-x-1.5">
                 <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center text-black text-[8px] font-bold">ND</div>
                 <span className="text-[10px] font-medium hidden sm:block">HandMoto</span>
               </div>
            </div>
          </motion.header>

          <div className="flex flex-1 overflow-hidden relative">
            {/* Sidebar */}
            <motion.aside variants={itemVariants} className={`w-36 lg:w-44 ${isDark ? 'bg-[#1a1d27] border-slate-700' : 'bg-white border-slate-200'} border-r flex flex-col py-3 shrink-0 z-10 shadow-sm relative h-full overflow-y-auto [&::-webkit-scrollbar]:hidden`}>
              {[
                { icon: '🏠', label: 'Home' },
                { icon: '⭐', label: 'Quick access' },
                { divider: true },
                { icon: '📋', label: 'Orders' },
                { icon: '🛍️', label: 'Products' },
                { icon: '🚚', label: 'Logistics' },
                { divider: true },
                { icon: '📢', label: 'Marketing', isParent: true },
                { label: 'Shop ads', isSubitem: true, active: true },
                { label: 'Promotions', isSubitem: true },
                { label: 'Shop design', isSubitem: true },
                { label: 'Campaigns', isSubitem: true },
                { label: 'Smart Promotion', isSubitem: true },
                { divider: true },
                { icon: '👥', label: 'Customers' },
                { icon: '🤝', label: 'Affiliate' },
                { icon: '📹', label: 'LIVE & video' },
                { icon: '📈', label: 'Growth' }
              ].map((item, i) => (
                item.divider ? (
                  <div key={i} className="my-2 h-px bg-slate-100 w-full" />
                ) : item.isSubitem ? (
                  <div key={i} className={`flex items-center px-4 py-1.5 text-[10px] lg:text-xs cursor-pointer ${item.active ? 'bg-[#F2FDFB] text-[#00A3A0] font-semibold pl-8' : 'text-slate-500 hover:bg-slate-50 pl-8'}`}>
                    <span>{item.label}</span>
                  </div>
                ) : (
                  <div key={i} className={`flex items-center space-x-3 px-4 py-2 text-[10px] lg:text-xs cursor-pointer ${item.active ? 'bg-[#E6F8F8] text-[#008080] font-semibold border-l-4 border-[#008080]' : 'text-slate-700 hover:bg-slate-50 border-l-4 border-transparent'}`}>
                    <span className="opacity-70 text-[10px]">{item.icon}</span>
                    <span className={item.isParent ? 'font-semibold' : ''}>{item.label}</span>
                  </div>
                )
              ))}
            </motion.aside>

            {/* Main Dashboard Area */}
            <main className="flex-1 p-4 lg:p-6 flex flex-col gap-4 relative z-10 overflow-y-auto [&::-webkit-scrollbar]:hidden">
               
               <motion.div variants={itemVariants} className="flex justify-between items-center w-full">
                 <h1 className={`text-xl lg:text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>Ads dashboard</h1>
                 <button className="bg-[#00A3A0] text-white text-xs lg:text-sm font-semibold px-4 py-2 rounded shadow-sm hover:bg-[#008F8C]">
                   Create GMV Max ads
                 </button>
               </motion.div>

               <div className="flex gap-4 h-full w-full">
                 
                 {/* GMV Max Sidebar */}
                 <motion.div variants={itemVariants} className={`w-40 lg:w-48 ${isDark ? 'bg-[#1a1d27] border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow-sm border flex flex-col p-4 shrink-0 h-full overflow-y-auto [&::-webkit-scrollbar]:hidden`}>
                   <div className="flex justify-between items-center mb-6">
                     <span className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-800'}`}>GMV Max</span>
                     <span className="text-slate-400 text-[10px]">≡</span>
                   </div>
                   <div className="flex flex-col gap-1">
                     <div className={`flex items-center space-x-2 text-xs font-semibold ${isDark ? 'text-slate-200 bg-slate-800' : 'text-slate-800 bg-slate-50'} py-2 px-2 border-l-2 border-[#00A3A0] rounded-r`}>
                       <span className="text-slate-500">🔊</span>
                       <span>Campaigns</span>
                     </div>
                     <div className="flex justify-between items-center text-xs text-slate-600 py-2 px-2 hover:bg-slate-50 rounded cursor-pointer ml-0.5">
                       <div className="flex items-center space-x-2">
                         <span className="text-slate-400">🎬</span>
                         <span>Creatives</span>
                       </div>
                       <span className="bg-[#E6F8F8] text-[#00A3A0] text-[8px] font-bold px-1.5 py-0.5 rounded-sm">New</span>
                     </div>
                     <div className="flex items-center space-x-2 text-xs text-slate-600 py-2 px-2 hover:bg-slate-50 rounded cursor-pointer ml-0.5">
                       <span className="text-slate-400">👤</span>
                       <span>Accounts</span>
                     </div>
                   </div>
                 </motion.div>

                 {/* Overview Section */}
                 <motion.div variants={itemVariants} className="flex-1 flex flex-col gap-4 min-w-0">
                    
                    {/* Billing Warning */}
                    <div className="hidden bg-[#F2FDFB] border border-[#BDE8E5] rounded p-3 flex-col lg:flex-row lg:items-center text-[10px] lg:text-xs">
                       <span className="text-slate-600 font-medium">Add billing information to complete your payment setup.</span>
                       <span className="text-[#00A3A0] font-semibold lg:ml-2 cursor-pointer">Add billing info</span>
                    </div>

                    <div className={`${isDark ? 'bg-[#1a1d27] border-slate-700' : 'bg-white border-slate-200'} rounded-lg shadow-sm border p-4 lg:p-6 flex-1 flex flex-col min-w-0`}>
                      
                      <div className={`flex justify-between items-center border-b pb-3 mb-4 ${isDark ? 'border-slate-700' : 'border-slate-100'}`}>
                        <span className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-800'}`}>HandMoto</span>
                        <div className={`flex items-center space-x-3 text-[10px] lg:text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          <span>(UTC-09:00) America/Anchorage</span>
                          <div className={`border rounded px-2 py-1 flex items-center space-x-2 ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
                            <span>2026-04-27 - 2026-05-04</span>
                            <span>📅</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col mb-4">
                        <h2 className={`font-bold text-sm mb-1 ${isDark ? 'text-white' : 'text-slate-800'}`}>Overview</h2>
                        <p className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Reporting includes GMV Max ads created on TikTok Ads Manager and TikTok Seller Center.</p>
                      </div>

                      {/* Stat Cards */}
                      <div className="flex overflow-x-auto gap-3 mb-6 pb-2 [&::-webkit-scrollbar]:hidden">
                        {[
                          { title: "Cost", val: 12500, suffix: " USD", decimals: 2, comp: "vs last 7 days +12.4%", active: true },
                          { title: "SKU ord...", val: 840, suffix: "", decimals: 0, comp: "vs last 7 days +28.1%", active: true },
                          { title: "Cost per ...", val: 14.88, suffix: " USD", decimals: 2, comp: "vs last 7 days -4.2%", active: false },
                          { title: "Gross re...", val: 65400, suffix: " USD", decimals: 2, comp: "vs last 7 days +32.5%", active: false },
                          { title: "ROI (Cur...", val: 5.23, suffix: "", decimals: 2, comp: "vs last 7 days +0.85", active: false },
                        ].map((stat, i) => (
                          <div key={i} className={`flex-shrink-0 w-32 lg:w-40 rounded border p-3 flex flex-col relative ${stat.active ? 'bg-[#EAFDFB] border-[#00A3A0]/40' : (isDark ? 'bg-[#1a1d27] border-slate-700' : 'border-slate-200')}`}>
                            <div className="flex justify-between items-start mb-2">
                              <span className={`text-[10px] lg:text-xs font-medium truncate pr-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{stat.title} <span className="text-slate-400">?</span></span>
                              {stat.active ? (
                                <span className="text-[#00A3A0] text-[10px] absolute right-3 top-3">✔</span>
                              ) : (
                                <div className="w-3 h-3 border border-slate-300 rounded-sm absolute right-3 top-3" />
                              )}
                            </div>
                            <span className={`text-sm lg:text-lg font-bold mb-2 truncate ${isDark ? 'text-white' : 'text-slate-800'}`}>
                               <Counter from={0} to={stat.val} suffix={stat.suffix} decimals={stat.decimals} isActive={isActive} />
                            </span>
                            <span className="text-[9px] text-green-500 truncate font-semibold">{stat.comp}</span>
                          </div>
                        ))}
                      </div>

                      {/* Chart Area */}
                      <div className="flex-1 min-h-[100px] flex flex-col relative">
                        <div className="flex space-x-4 text-[10px] text-slate-500 mb-2">
                          <div className="flex items-center space-x-1"><div className="w-2 h-2 rounded-full bg-[#00A3A0]" /><span>Cost</span></div>
                          <div className="flex items-center space-x-1"><div className="w-2 h-2 rounded-full bg-yellow-400" /><span>SKU orders (Current shop)</span></div>
                        </div>
                        <div className="flex-1 border-b border-slate-200 relative mt-4">
                           {/* Decorative Chart Lines */}
                           <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                             <motion.path d="M0,80 L20,60 L40,70 L60,40 L80,50 L100,20" fill="none" stroke="#00A3A0" strokeWidth="2" vectorEffect="non-scaling-stroke" initial={{ pathLength: isActive ? 0 : 1 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.5 }} />
                             <motion.path d="M0,90 L20,70 L40,80 L60,30 L80,20 L100,10" fill="none" stroke="#FACC15" strokeWidth="2" vectorEffect="non-scaling-stroke" initial={{ pathLength: isActive ? 0 : 1 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.7 }} />
                           </svg>
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                          <span>Apr 27</span>
                          <span>May 04</span>
                        </div>
                      </div>

                    </div>
                 </motion.div>
               </div>

            </main>
          </div>
        </motion.div>
      </article>
    );
  }

  // DEFAULT (LAYOUT 1): TikTok Shop Services Overview
  return (
    <article className={`w-full h-full ${isDark ? 'bg-[#0f1117] text-slate-200' : 'bg-slate-50 text-slate-800'} flex flex-col overflow-hidden font-sans`}>
      <div className={`absolute inset-0 ${isDark ? 'bg-[#0f1117]' : 'bg-white'}`} />
      <motion.div variants={containerVariants} initial="show" animate="show" className="w-full h-full flex flex-col z-10">
        <motion.header variants={itemVariants} className="w-full h-12 lg:h-14 bg-[#161823] text-white border-b border-[#2a2d3a] flex items-center justify-between px-4 lg:px-6 shrink-0">
          <span className="font-bold text-sm lg:text-base">Alphadigify</span>
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center text-[10px] lg:text-xs font-semibold px-2 py-1 rounded-md border border-white/20 text-white/90 bg-white/5">
              <span className="mr-2 opacity-70">📅</span> JAN 1 - DEC 31, 2025 <span className="ml-2 opacity-50">˅</span>
            </div>
            <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full overflow-hidden shrink-0 bg-white shadow-sm flex items-center justify-center p-0.5">
              <img src="/alphadigify-logo.jpg" className="w-full h-full object-cover rounded-full" alt="Logo" />
            </div>
          </div>
        </motion.header>

        <main className="flex-1 flex flex-col px-4 pt-2 lg:pt-3 pb-2 space-y-2 lg:space-y-3 overflow-y-auto [&::-webkit-scrollbar]:hidden items-center">
          <motion.div variants={itemVariants} className="text-center w-full shrink-0">
            <h2 className={`text-[13px] lg:text-[15px] font-black ${isDark ? 'text-white' : 'text-[#111827]'} tracking-wide uppercase`}>TIKTOK SHOP - SERVICE ECOSYSTEM</h2>
            <h3 className="text-[9px] lg:text-[11px] font-extrabold text-[#FE2C55] tracking-wider mt-0.5">(LIVE OPERATIONS)</h3>
          </motion.div>

          <motion.div variants={itemVariants} className={`w-full rounded-2xl ${isDark ? 'bg-[#1a1d27]' : 'bg-white'} shadow-lg p-3 lg:p-4 flex flex-col space-y-2.5 shrink-0`}>
            <h4 className={`text-[11px] lg:text-[13px] font-black ${isDark ? 'text-white' : 'text-slate-800'} uppercase`}>Active Services <span className={`font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>(In Queue / Working)</span></h4>
            {[
              { name: "Product Listing Optimization", status: "WORKING", icon: "P", progress: 90 },
              { name: "Affiliate Creator Network", status: "WORKING", icon: "A", progress: 70 },
              { name: "Live Stream Strategy", status: "PENDING", icon: "L", progress: 25 },
              { name: "Short Video Production", status: "PENDING", icon: "V", progress: 35 },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center space-x-2 lg:space-x-3">
                  <div className={`w-7 h-7 lg:w-8 lg:h-8 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-slate-50'} flex items-center justify-center font-bold text-base lg:text-lg ${isDark ? 'text-white' : 'text-slate-800'}`}>{item.icon}</div>
                  <div className="flex flex-col">
                    <span className={`text-[10px] lg:text-[12px] font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.name}</span>
                    <span className="text-[9px] lg:text-[10px] font-bold text-slate-400">Status: <span className={item.status === 'WORKING' ? 'text-[#FE2C55]' : ''}>{item.status}</span></span>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-1 w-20 lg:w-24 shrink-0">
                  <div className={`px-2 py-0.5 rounded text-[8px] lg:text-[9px] font-bold ${item.status === 'WORKING' ? (isDark ? 'bg-[#FE2C55]/20 text-[#FE2C55]' : 'bg-red-100 text-red-700') : (isDark ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600')}`}>{item.status}</div>
                  <div className={`w-full h-1 lg:h-1.5 rounded-full ${isDark ? 'bg-slate-700' : 'bg-slate-200'} overflow-hidden`}>
                    <motion.div initial={{ width: isActive ? "0%" : `${item.progress}%` }} animate={{ width: `${item.progress}%` }} transition={{ duration: 1, delay: 0.4 + i * 0.1 }} className={`h-full rounded-full ${item.status === "WORKING" ? "bg-[#FE2C55]" : "bg-[#FE2C55]/30"}`} />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.footer variants={itemVariants} className="text-center w-full flex-1 flex items-center justify-center">
            <span className={`text-[11px] lg:text-[13px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Managing <span className={isDark ? 'text-white' : 'text-slate-900'}>TikTok Shop Operations</span></span>
          </motion.footer>
        </main>
      </motion.div>
    </article>
  );
}
