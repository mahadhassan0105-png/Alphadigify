/* eslint-disable @next/next/no-img-element */
"use client";

import { motion, type Variants, animate } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import { useEffect, useRef } from "react";

interface AnimatedDashboardProps {
  theme: {
    primary: string;
    secondary: string;
    accent: string;
    bgGradient: string;
    bgLight: string;
    border: string;
    borderLight: string;
  };
  isActive: boolean;
  layoutId?: number;
}

function AnimatedDashboardCounter({ from, to, prefix = "", suffix = "", decimals = 0, isActive }: { from: number, to: number, prefix?: string, suffix?: string, decimals?: number, isActive: boolean }) {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isActive) {
      const controls = animate(from, to, {
        duration: 2.0,
        ease: "easeOut",
        delay: 0.8, // Wait for slide transition
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent = `${prefix}${value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}${suffix}`;
          }
        },
      });
      return () => controls.stop();
    } else {
      if (nodeRef.current) {
         nodeRef.current.textContent = `${prefix}${from.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}${suffix}`;
      }
    }
  }, [from, to, isActive, prefix, suffix, decimals]);

  return <span ref={nodeRef}>{prefix}{from.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{suffix}</span>;
}

export default function AmazonAnimatedDashboard({ theme, isActive, layoutId = 1 }: AnimatedDashboardProps) {
  const { theme: mode } = useTheme();
  const isDark = mode === "dark";
  // Resolved theme-aware values
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const bg = isDark ? theme.bgGradient : theme.bgLight;
  const bdr = isDark ? "border-slate-700/80" : theme.borderLight;
  const cardBg = isDark ? "bg-slate-800" : "bg-white/80";
  const cardBgHover = isDark ? "hover:bg-slate-700" : "hover:bg-white";
  const textPrimary = isDark ? "text-white" : "text-gray-900";
  const textSecondary = isDark ? "text-slate-300" : "text-gray-600";
  const textMuted = isDark ? "text-slate-400" : "text-gray-400";
  const textHeading = isDark ? "text-yellow-50" : "text-gray-900";
  const textAccent = isDark ? "text-yellow-400" : "text-amber-600";
  const textLabel = isDark ? "text-slate-200" : "text-gray-700";
  const trackBg = isDark ? "bg-slate-700" : "bg-gray-200";
  const gridDotColor = isDark
    ? "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)"
    : "radial-gradient(circle at 2px 2px, rgba(0,0,0,0.08) 1px, transparent 0)";
  const gridLineColor = isDark
    ? "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)"
    : "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)";
  const sidebarBg = isDark ? "bg-slate-900" : "bg-gray-100/80";
  const innerCardBg = isDark ? "bg-slate-700" : "bg-white shadow-md";

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 250, damping: 24 } },
  };

  const barVariants = {
    hidden: { height: 0 },
    show: (height: number) => ({
      height: `${height}%`,
      transition: { type: "spring", stiffness: 150, damping: 20, delay: 0.6 + Math.random() * 0.3 },
    }),
  };

  const widthVariants = {
    hidden: { width: 0 },
    show: (w: number) => ({
      width: `${w}%`,
      transition: { type: "spring", stiffness: 120, damping: 20, delay: 0.8 + Math.random() * 0.3 },
    }),
  };

  if (layoutId === 2) {
    // LAYOUT 2: Amazon Ads Dashboard Mockup
    
    // Data for the line chart (simulating the Amazon Ads chart)
    const chartData = [
      { day: "Apr 15", acos: 200, cost: 240, sales: 250, clicks: 245 },
      { day: "Apr 16", acos: 195, cost: 230, sales: 235, clicks: 225 },
      { day: "Apr 17", acos: 190, cost: 215, sales: 200, clicks: 205 },
      { day: "Apr 18", acos: 195, cost: 195, sales: 160, clicks: 175 },
      { day: "Apr 19", acos: 185, cost: 170, sales: 120, clicks: 140 },
      { day: "Apr 20", acos: 180, cost: 155, sales: 85, clicks: 110 },
      { day: "Apr 21", acos: 175, cost: 140, sales: 50, clicks: 80 },
      { day: "Apr 22", acos: 170, cost: 125, sales: 30, clicks: 55 },
    ];

    const pathAcos = chartData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${i * 110 + 30},${d.acos}`).join(" ");
    const pathCost = chartData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${i * 110 + 30},${d.cost}`).join(" ");
    const pathSales = chartData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${i * 110 + 30},${d.sales}`).join(" ");
    const pathClicks = chartData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${i * 110 + 30},${d.clicks}`).join(" ");

    return (
      <article className={`w-full h-full ${isDark ? 'bg-slate-900 text-slate-200' : 'bg-white text-slate-800'} flex flex-col overflow-hidden relative font-sans`}>
        <motion.div variants={containerVariants} initial="show" animate="show" className="w-full h-full flex flex-col z-10">
          
          {/* Top Navbar (Amazon Ads Header) */}
          <motion.header variants={itemVariants} className="w-full h-10 lg:h-12 bg-[#232F3E] text-white flex items-center justify-between px-3 lg:px-4 shrink-0">
            <div className="flex items-center space-x-3">
              <span className="font-bold text-sm lg:text-base tracking-tight">amazon<span className="font-normal text-amber-500"> ads</span></span>
              <span className="text-[10px] lg:text-xs border-l border-slate-600 pl-3">Campaigns</span>
            </div>
            <div className="flex items-center space-x-3 text-[9px] lg:text-[10px]">
              <div className="flex flex-col text-right">
                <span className="font-bold">CS MART LLC</span>
                <span className="text-slate-400">Sponsored ads, multiple countries</span>
              </div>
              <div className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center">👤</div>
            </div>
          </motion.header>

          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <motion.aside variants={itemVariants} className={`w-24 lg:w-32 border-r ${isDark ? 'border-slate-700 bg-slate-800/50' : 'border-slate-200 bg-white'} flex flex-col pt-2 shrink-0`}>
               {["Portfolios", "Campaigns", "Drafts", "Products", "Targeting", "Budgets", "History"].map((item, i) => (
                 <div key={i} className={`text-[9px] lg:text-[10px] py-1.5 px-3 cursor-pointer ${item === 'Campaigns' ? `${isDark ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-900'} font-bold border-l-2 border-[#E77600]` : `${isDark ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-50'}`}`}>
                   {item}
                 </div>
               ))}
            </motion.aside>

            {/* Main Content Area */}
            <main className={`flex-1 flex flex-col p-3 lg:p-4 ${isDark ? 'bg-slate-900/50' : 'bg-[#F8F9FA]'} overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}>
              
              {/* Tabs */}
                            <motion.div variants={itemVariants} className="flex space-x-2 mb-3">
                {["All", "Sponsored Products", "Sponsored Brands", "Display, Video, & Audio"].map((tab, i) => (
                  <div key={i} className={`text-[8px] lg:text-[9px] px-2 py-1 border rounded shadow-sm ${i === 0 ? `${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300 text-slate-800'} font-bold` : `${isDark ? 'bg-slate-800 border-slate-700 text-slate-400' : 'bg-white border-slate-200 text-slate-600'}`}`}>
                    {tab}
                  </div>
                ))}
              </motion.div>

              {/* Metrics Row */}
                            <motion.div variants={itemVariants} className={`${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border rounded-lg p-2 lg:p-3 mb-3 flex items-start justify-between shadow-sm`}>
                <div className={`flex flex-col border-r ${isDark ? 'border-slate-700' : 'border-slate-200'} pr-4`}>
                  <span className="text-[8px] lg:text-[9px] text-slate-500 font-bold mb-1">Date range i</span>
                  <span className="text-[9px] lg:text-[10px] font-bold">Apr 17, 2026 v</span>
                </div>
                {[
                  { label: "Impressions", from: 0, to: 34250, prefix: "", suffix: "", decimals: 0 },
                  { label: "Clicks", from: 0, to: 646, prefix: "", suffix: "", decimals: 0 },
                  { label: "Branded searches", from: 0, to: 84, prefix: "", suffix: "", decimals: 0 },
                  { label: "Detail page views", from: 0, to: 420, prefix: "", suffix: "", decimals: 0 },
                  { label: "Purchases", from: 0, to: 143, prefix: "", suffix: "", decimals: 0 },
                  { label: "Sales", from: 0, to: 4528.50, prefix: "$", suffix: "", decimals: 2 }
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col px-2">
                                        <span className={`text-[8px] lg:text-[9px] ${isDark ? 'text-slate-400' : 'text-slate-500'} font-bold mb-1`}>{stat.label} ⓘ</span>
                    <span className={`text-[10px] lg:text-[12px] font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      <AnimatedDashboardCounter from={stat.from} to={stat.to} prefix={stat.prefix} suffix={stat.suffix} decimals={stat.decimals} isActive={isActive} />
                    </span>
                    <span className="text-[7px] text-blue-600 mt-0.5 font-semibold">View details</span>
                  </div>
                ))}
              </motion.div>

              {/* Chart Area */}
                            <motion.div variants={itemVariants} className={`${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border rounded-lg p-3 lg:p-4 shadow-sm flex-1 flex flex-col`}>
                <h2 className={`text-[11px] lg:text-[13px] font-black mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>Performance <span className={`text-[9px] font-normal ${isDark ? 'text-slate-400' : 'text-slate-500'} ml-1`}>Apr 15 - Apr 22, 2026</span></h2>
                <div className="flex justify-between px-2 mb-4">
                  {[
                    { label: "ACOS", from: 0, to: 18.26, prefix: "", suffix: "%", decimals: 2, color: "bg-purple-600" },
                    { label: "Total cost", from: 0, to: 476.59, prefix: "$", suffix: "", decimals: 2, color: "bg-teal-500" },
                    { label: "Sales", from: 0, to: 4528.50, prefix: "$", suffix: "", decimals: 2, color: "bg-pink-600" },
                    { label: "Clicks", from: 0, to: 646, prefix: "", suffix: "", decimals: 0, color: "bg-blue-500" }
                  ].map((leg, i) => (
                    <div key={i} className="flex flex-col items-center">
                                            <span className={`text-[8px] lg:text-[9px] ${isDark ? 'text-slate-400' : 'text-slate-500'} font-bold flex items-center`}>{leg.label} ˅ ⓘ</span>
                      <div className="flex items-center mt-1">
                        <div className={`w-3 h-3 lg:w-4 lg:h-4 rounded-sm ${leg.color} mr-1.5`}></div>
                        <span className={`text-[12px] lg:text-[15px] font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          <AnimatedDashboardCounter from={leg.from} to={leg.to} prefix={leg.prefix} suffix={leg.suffix} decimals={leg.decimals} isActive={isActive} />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex-1 w-full relative">
                  <svg viewBox="0 0 800 250" className="w-full h-full overflow-visible">
                    {[50, 100, 150, 200, 250].map(y => (
                                            <line key={y} x1="0" y1={y} x2="800" y2={y} className={`${isDark ? 'stroke-slate-700' : 'stroke-slate-200'}`} strokeWidth="1" />
                    ))}
                    {chartData.map((d, i) => (
                      <text key={i} x={i * 110 + 30} y="265" textAnchor="middle" className="fill-slate-500 text-[9px] font-medium">{d.day}</text>
                    ))}
                    <motion.path d={pathAcos} className="stroke-purple-600 drop-shadow-sm" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: isActive ? 0 : 1 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.5 }} />
                    <motion.path d={pathCost} className="stroke-teal-500 drop-shadow-sm" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: isActive ? 0 : 1 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.6 }} />
                    <motion.path d={pathSales} className="stroke-pink-600 drop-shadow-sm" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: isActive ? 0 : 1 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.7 }} />
                    <motion.path d={pathClicks} className="stroke-blue-500 drop-shadow-sm" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: isActive ? 0 : 1 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.8 }} />
                    {chartData.map((d, i) => (
                      <g key={`dots-${i}`}>
                        {d.sales !== 250 && <circle cx={i * 110 + 30} cy={d.sales} r="3" className="fill-pink-600" />}
                        {d.cost !== 250 && <circle cx={i * 110 + 30} cy={d.cost} r="3" className="fill-teal-500" />}
                      </g>
                    ))}
                  </svg>
                </div>
              </motion.div>

            </main>
          </div>
        </motion.div>
      </article>
    );
  }

  if (layoutId === 3) {
    // LAYOUT 3: Amazon Seller Central Dashboard Mockup
    
    return (
      <article className={`w-full h-full ${isDark ? 'bg-slate-900 text-slate-200' : 'bg-[#F2F4F8] text-slate-800'} flex flex-col overflow-hidden relative font-sans`}>
        <motion.div variants={containerVariants} initial="show" animate="show" className="w-full h-full flex flex-col z-10">
          
          {/* Top Navbar (Teal) */}
          <motion.header variants={itemVariants} className="w-full h-10 lg:h-12 bg-[#0F4A5C] text-white flex items-center justify-between px-2 lg:px-4 shrink-0">
            <div className="flex items-center space-x-2 lg:space-x-4">
              <span className="text-lg lg:text-xl font-light opacity-80">≡</span>
              <span className="font-bold text-sm lg:text-base tracking-tight">amazon seller central</span>
              <div className="flex items-center bg-white text-slate-900 text-[10px] px-2 py-0.5 rounded-sm ml-2">
                <span className="font-bold border-r border-slate-300 pr-2 mr-2">CS MART LLC</span>
                <span>United States</span>
              </div>
            </div>
            
            <div className="flex flex-1 max-w-md mx-4">
              <div className="w-full bg-[#0B3948] h-7 rounded flex items-center px-2">
                <span className="text-[10px] text-slate-400 italic flex-1">Search</span>
                <span className="text-slate-300 text-[10px]">🔍</span>
              </div>
            </div>

            <div className="flex items-center space-x-3 lg:space-x-4 text-[9px] lg:text-[11px]">
              <div className="flex items-center space-x-1">
                <div className="w-6 h-3 bg-white rounded-full relative flex items-center px-0.5"><div className="w-2 h-2 bg-slate-400 rounded-full"></div></div>
                <span>New Seller Central</span>
              </div>
              <span className="text-[12px]">✉</span>
              <span className="text-[12px]">⚙</span>
              <span>EN ˅</span>
              <span>Help</span>
            </div>
          </motion.header>

          {/* Sub Header (Welcome) */}
          <motion.div variants={itemVariants} className={`w-full h-10 lg:h-12 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border-b flex items-center justify-between px-3 lg:px-6 shrink-0 shadow-sm z-10`}>
            <div className="flex items-center text-[10px] lg:text-xs">
              <span className={`${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Good evening, your account health is</span>
              <span className="ml-2 bg-[#42801F] text-white px-2 py-0.5 rounded-sm font-bold shadow-sm">Healthy</span>
              <span className="ml-2 text-slate-400">&gt;</span>
            </div>
            <div className="flex items-center space-x-2 text-[9px] lg:text-[10px]">
              <button className={`border px-2 lg:px-3 py-1 rounded shadow-sm transition-colors ${isDark ? 'border-slate-600 text-slate-300 hover:bg-slate-700' : 'border-slate-300 text-slate-600 hover:bg-slate-50'}`}>Launch Tour</button>
              <button className={`border px-2 lg:px-3 py-1 rounded shadow-sm transition-colors ${isDark ? 'border-slate-600 text-slate-300 hover:bg-slate-700' : 'border-slate-300 text-slate-600 hover:bg-slate-50'}`}>Learn More</button>
            </div>
          </motion.div>

          {/* Main Dashboard Area */}
          <div className={`flex flex-1 overflow-hidden p-3 lg:p-4 space-x-3 lg:space-x-4 ${isDark ? 'bg-slate-900/50' : 'bg-[#F2F4F8]'}`}>
            
            {/* Left Sidebar Columns */}
            <motion.aside variants={itemVariants} className="flex w-40 lg:w-56 flex-col space-y-3 shrink-0">
              {/* Actions Box */}
              <div className={`border rounded-lg shadow-sm overflow-hidden flex flex-col ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-300'}`}>
                <div className={`p-2 lg:p-3 border-b flex justify-between items-center ${isDark ? 'border-slate-700' : 'border-slate-100'}`}>
                  <span className={`text-[10px] lg:text-[12px] font-bold flex items-center ${isDark ? 'text-white' : 'text-slate-800'}`}>Actions <span className="text-slate-400 ml-1 text-[8px]">ⓘ</span></span>
                  <span className="bg-[#4E5B65] text-white text-[8px] lg:text-[9px] px-1.5 py-0.5 rounded-full">0</span>
                </div>
                <div className={`p-3 lg:p-4 flex items-center justify-center text-[9px] lg:text-[10px] min-h-[60px] text-center ${isDark ? 'text-slate-400 bg-slate-800/50' : 'text-slate-500 bg-[#FAFAFA]'}`}>
                  Check in later for more content
                </div>
              </div>

              {/* Communications Box */}
              <div className={`border rounded-lg shadow-sm overflow-hidden flex flex-col opacity-80 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                <div className={`p-2 lg:p-3 border-b flex justify-between items-center ${isDark ? 'border-slate-700' : 'border-slate-100'}`}>
                  <span className={`text-[10px] lg:text-[12px] font-bold flex items-center ${isDark ? 'text-white' : 'text-slate-800'}`}>Communications <span className="text-slate-400 ml-1 text-[8px]">ⓘ</span></span>
                </div>
                <div className="p-3 lg:p-4 flex items-center justify-center text-[9px] lg:text-[10px] text-slate-500 min-h-[60px] text-center">
                  Check in later for more content
                </div>
              </div>
            </motion.aside>

            {/* Right Main Grid */}
            <motion.main variants={itemVariants} className={`flex-1 border rounded-lg shadow-sm flex flex-col overflow-hidden ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-300'}`}>
              <div className={`h-10 lg:h-12 border-b flex items-center justify-between px-3 lg:px-4 shrink-0 ${isDark ? 'border-slate-700 bg-slate-800/80' : 'border-slate-200 bg-[#FBFBFB]'}`}>
                <span className={`text-[12px] lg:text-[14px] font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>Global Snapshot</span>
                <div className="flex space-x-2 text-slate-500">
                   <span className={`text-[10px] lg:text-xs border px-1.5 py-0.5 rounded ${isDark ? 'border-slate-600 bg-slate-700' : 'border-slate-300 bg-white'}`}>▤</span>
                   <span className="text-[10px] lg:text-xs text-slate-400 mt-1">☍</span>
                </div>
              </div>

              {/* Grid Content */}
              <div className={`flex-1 grid grid-cols-5 divide-x divide-y overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${isDark ? 'divide-slate-700' : 'divide-slate-200'}`}>
                
                {/* Col 1: Sales + Ad Sales */}
                <div className={`col-span-1 flex flex-col divide-y ${isDark ? 'divide-slate-700' : 'divide-slate-200'}`}>
                  <div className="p-2 lg:p-3 flex-1 flex flex-col min-h-[120px]">
                    <div className="flex justify-between items-start mb-1 lg:mb-2">
                      <span className={`text-[9px] lg:text-[10px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Sales</span>
                      <span className="text-[8px] text-slate-400 font-bold">˅</span>
                    </div>
                    <span className="text-[14px] lg:text-[18px] font-black text-[#008296] tracking-tight">
                      <AnimatedDashboardCounter from={0} to={9057.00} prefix="$" decimals={2} isActive={isActive} />
                    </span>
                    <span className="text-[8px] lg:text-[9px] text-slate-500 mb-2">Today so far</span>
                    
                    {/* Tiny Chart */}
                    <div className={`flex-1 w-full min-h-[40px] relative mt-auto border-b border-l px-1 pb-1 ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
                      <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
                        <motion.path 
                          d="M 5,35 L 20,30 L 35,32 L 50,20 L 65,25 L 80,15 L 95,5" 
                          fill="none" className="stroke-[#008296]" strokeWidth="1.5" 
                          initial={{ pathLength: isActive ? 0 : 1 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.5 }}
                        />
                        <motion.circle cx="95" cy="5" r="2" fill="white" stroke="#008296" strokeWidth="1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} />
                      </svg>
                      <div className="absolute bottom-[-14px] w-full flex justify-between text-[6px] lg:text-[7px] text-slate-400 font-medium">
                        <span>Apr 16</span><span>19</span><span>22</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-2 lg:p-3 h-20 lg:h-24 shrink-0 flex flex-col">
                    <div className="flex justify-between items-start mb-1">
                      <span className={`text-[9px] lg:text-[10px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Ad Sales</span>
                      <span className="text-[8px] text-slate-400 font-bold">˅</span>
                    </div>
                    <span className="text-[13px] lg:text-[16px] font-black text-[#008296] tracking-tight">
                      <AnimatedDashboardCounter from={0} to={1240.00} prefix="$" decimals={2} isActive={isActive} />
                    </span>
                    <span className="text-[8px] lg:text-[9px] text-slate-500">Today so far</span>
                  </div>
                </div>

                {/* Col 2: Open Orders + Ad Impressions */}
                <div className={`col-span-1 flex flex-col divide-y ${isDark ? 'divide-slate-700' : 'divide-slate-200'}`}>
                  <div className="p-2 lg:p-3 flex-1 flex flex-col min-h-[120px]">
                    <div className="flex justify-between items-start mb-1 lg:mb-2">
                      <span className="text-[9px] lg:text-[10px] text-[#008296] font-medium cursor-pointer hover:underline">Open Orders</span>
                      <span className="text-[8px] text-slate-400 font-bold">˅</span>
                    </div>
                    <span className={`text-[14px] lg:text-[18px] font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>
                      <AnimatedDashboardCounter from={0} to={230} isActive={isActive} />
                    </span>
                    <span className={`text-[8px] lg:text-[9px] text-slate-500 mb-3 border-b pb-2 ${isDark ? 'border-slate-700' : 'border-slate-100'}`}>Total Count</span>
                    
                    <div className={`flex justify-between text-[8px] lg:text-[9px] mb-1 font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}><span>FBM Unshipped</span><span className="text-[#008296] cursor-pointer hover:underline"><AnimatedDashboardCounter from={0} to={15} isActive={isActive} /></span></div>
                    <div className={`flex justify-between text-[8px] lg:text-[9px] mb-1 font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}><span>FBM Pending</span><span className="text-[#008296] cursor-pointer hover:underline"><AnimatedDashboardCounter from={0} to={45} isActive={isActive} /></span></div>
                    <div className={`flex justify-between text-[8px] lg:text-[9px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}><span>FBA Pending</span><span className="text-[#008296] cursor-pointer hover:underline"><AnimatedDashboardCounter from={0} to={170} isActive={isActive} /></span></div>
                  </div>
                  
                  <div className="p-2 lg:p-3 h-20 lg:h-24 shrink-0 flex flex-col">
                    <div className="flex justify-between items-start mb-1">
                      <span className={`text-[9px] lg:text-[10px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Ad Impressions</span>
                      <span className="text-[8px] text-slate-400 font-bold">˅</span>
                    </div>
                    <span className={`text-[13px] lg:text-[16px] font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>
                      <AnimatedDashboardCounter from={0} to={14354} isActive={isActive} />
                    </span>
                    <span className="text-[8px] lg:text-[9px] text-slate-500">Today so far</span>
                  </div>
                </div>

                {/* Col 3: Messages + Payments */}
                <div className={`col-span-1 flex flex-col divide-y ${isDark ? 'divide-slate-700' : 'divide-slate-200'}`}>
                  <div className="p-2 lg:p-3 flex-1 lg:flex-none lg:h-24 shrink-0 flex flex-col min-h-[90px]">
                    <div className="flex justify-between items-start mb-1">
                      <span className={`text-[9px] lg:text-[10px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Buyer Messages</span>
                      <span className="text-[8px] text-slate-400 font-bold">˅</span>
                    </div>
                    <span className={`text-[14px] lg:text-[18px] font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>
                      <AnimatedDashboardCounter from={0} to={2} isActive={isActive} />
                    </span>
                    <span className="text-[8px] lg:text-[9px] text-slate-500">Cases requiring attention</span>
                  </div>
                  <div className={`p-2 lg:p-3 flex-1 flex flex-col ${isDark ? 'bg-slate-800/30' : 'bg-[#FBFBFB]'}`}>
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-[9px] lg:text-[10px] text-[#008296] font-medium cursor-pointer hover:underline">Payments</span>
                      <span className="text-[8px] text-slate-400 font-bold">˅</span>
                    </div>
                    <span className={`text-[14px] lg:text-[18px] font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>
                      <AnimatedDashboardCounter from={0} to={8138.52} prefix="$" decimals={2} isActive={isActive} />
                    </span>
                    <span className="text-[8px] lg:text-[9px] text-slate-500">Total Balance</span>
                  </div>
                </div>

                {/* Col 4: Buy Box + IPI */}
                <div className={`col-span-1 flex flex-col divide-y ${isDark ? 'divide-slate-700' : 'divide-slate-200'}`}>
                  <div className={`p-2 lg:p-3 flex-1 lg:flex-none lg:h-24 shrink-0 flex flex-col min-h-[90px] ${isDark ? 'bg-slate-800/30' : 'bg-[#FBFBFB]'}`}>
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-[9px] lg:text-[10px] text-[#008296] font-medium cursor-pointer hover:underline">Featured Offer %</span>
                      <span className="text-[8px] text-slate-400 font-bold">˅</span>
                    </div>
                    <span className={`text-[14px] lg:text-[18px] font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>
                      <AnimatedDashboardCounter from={0} to={98} suffix="%" isActive={isActive} />
                    </span>
                    <span className="text-[8px] lg:text-[9px] text-slate-500">2 days ago</span>
                  </div>
                  <div className="p-2 lg:p-3 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-[9px] lg:text-[10px] text-[#008296] font-medium cursor-pointer hover:underline pr-4">Inventory Performance Index</span>
                      <span className="text-[8px] text-slate-400 font-bold shrink-0">˅</span>
                    </div>
                    <span className="text-[14px] lg:text-[18px] font-black text-slate-800 tracking-tight mt-auto lg:mt-0">
                      <AnimatedDashboardCounter from={0} to={512} isActive={isActive} />
                    </span>
                    <span className="text-[8px] lg:text-[9px] text-slate-500">Current</span>
                  </div>
                </div>

                {/* Col 5: Feedback + Promo */}
                <div className={`col-span-1 flex flex-col divide-y ${isDark ? 'divide-slate-700' : 'divide-slate-200'}`}>
                  <div className="p-2 lg:p-3 flex-1 lg:flex-none lg:h-24 shrink-0 flex flex-col min-h-[90px]">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-[9px] lg:text-[10px] text-[#008296] font-medium cursor-pointer hover:underline">Seller Feedback</span>
                      <span className="text-[8px] text-slate-400 font-bold">˅</span>
                    </div>
                    <div className="flex items-center space-x-0.5 text-yellow-400 text-[10px] lg:text-[12px] my-1 tracking-tighter">
                      <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                      <span className="text-[14px] lg:text-[18px] font-black text-slate-800 ml-1 tracking-tight">
                        <AnimatedDashboardCounter from={0} to={4.80} decimals={2} isActive={isActive} />
                      </span>
                    </div>
                    <span className="text-[8px] lg:text-[9px] text-slate-500">Past Year (0)</span>
                  </div>
                  <div className={`p-2 lg:p-3 flex-1 flex flex-col ${isDark ? 'bg-slate-800/30' : 'bg-[#FBFBFB]'}`}>
                    <div className="flex justify-between items-start mb-1">
                      <span className={`text-[9px] lg:text-[10px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Global Promotions Sales</span>
                      <span className="text-[8px] text-slate-400 font-bold">˅</span>
                    </div>
                    <span className="text-[14px] lg:text-[18px] font-black text-slate-800 tracking-tight mt-auto lg:mt-0">
                      <AnimatedDashboardCounter from={0} to={340.00} prefix="$" decimals={2} isActive={isActive} />
                    </span>
                    <span className="text-[8px] lg:text-[9px] text-slate-500">Last 7 days</span>
                  </div>
                </div>

              </div>
            </motion.main>
          </div>

        </motion.div>
      </article>
    );
  }

  // DEFAULT (LAYOUT 1): Service Ecosystem
  return (
    <article className={`w-full h-full ${isDark ? 'bg-slate-900 text-slate-200' : 'bg-slate-50 text-slate-800'} flex flex-col overflow-hidden relative font-sans`}>
      <div className={`absolute inset-0 ${isDark ? 'bg-slate-900' : 'bg-white'}`} />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: gridDotColor, backgroundSize: '24px 24px' }}></div>
      
      <motion.div variants={containerVariants} initial="show" animate="show" className="w-full h-full flex flex-col z-10">
        
        {/* Top Navbar (Teal to match Slider 3) */}
        <motion.header variants={itemVariants} className="w-full h-12 lg:h-14 bg-[#0F4A5C] text-white border-b border-[#0B3948] flex items-center justify-between px-4 lg:px-6 shrink-0">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-sm lg:text-base tracking-tight">Alphadigify</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center text-[10px] lg:text-xs font-semibold px-2 py-1 lg:px-3 lg:py-1.5 rounded-md border border-white/20 text-white/90 bg-white/5">
              <span className="mr-2 opacity-70">📅</span> JAN 1 - OCT 31, 2025 <span className="ml-2 opacity-50">˅</span>
            </div>
            <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full overflow-hidden shrink-0 bg-white shadow-sm flex items-center justify-center p-0.5">
              <img src="/alphadigify-logo.jpg" className="w-full h-full object-cover rounded-full" alt="Alphadigify Logo" />
            </div>
          </div>
        </motion.header>

        {/* Main Content Area (scrollbar hidden but scrollable) */}
        <main className="flex-1 flex flex-col px-4 pt-2 lg:pt-3 pb-2 space-y-2 lg:space-y-3 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] items-center">
          
          <motion.div variants={itemVariants} className="text-center w-full shrink-0">
            <h2 className={`text-[13px] lg:text-[15px] font-black ${isDark ? 'text-white' : 'text-[#111827]'} tracking-wide uppercase`}>ALPHADIGIFY - SERVICE ECOSYSTEM</h2>
            <h3 className={`text-[9px] lg:text-[11px] font-extrabold text-yellow-500 tracking-wider mt-0.5`}>(LIVE OPERATIONS)</h3>
          </motion.div>

          {/* ACTIVE SERVICES PORTFOLIO */}
          <motion.div variants={itemVariants} className={`w-full rounded-2xl ${isDark ? 'bg-[#1a1d27] border-white/10' : 'bg-white border-slate-100'} shadow-lg p-3 lg:p-4 flex flex-col space-y-2.5 shrink-0`}>
            <h4 className={`text-[11px] lg:text-[13px] font-black ${isDark ? 'text-white' : 'text-slate-800'} tracking-tight uppercase leading-snug`}>
              Active Services Portfolio <span className={`font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>(In Queue / Working)</span>
            </h4>
            
            <div className="flex flex-col space-y-2">
              {[
                { name: "Amazon PPC Management", status: "WORKING", icon: "P", progress: 85, sColor: isDark ? 'bg-yellow-400/20 text-yellow-400' : 'bg-yellow-100 text-yellow-800' },
                { name: "A+ Content Creation", status: "WORKING", icon: "A", progress: 65, sColor: isDark ? 'bg-yellow-400/20 text-yellow-400' : 'bg-yellow-100 text-yellow-800' },
                { name: "FBA Inventory Sync", status: "PENDING", icon: "F", progress: 20, sColor: isDark ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600' },
                { name: "Storefront Optimization", status: "PENDING", icon: "S", progress: 30, sColor: isDark ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600' }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center space-x-2 lg:space-x-3">
                    <div className={`w-7 h-7 lg:w-8 lg:h-8 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-slate-50'} flex items-center justify-center font-bold text-base lg:text-lg ${isDark ? 'text-white' : 'text-slate-800'}`}>{item.icon}</div>
                    <div className="flex flex-col">
                      <span className={`text-[10px] lg:text-[12px] font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.name}</span>
                      <span className={`text-[9px] lg:text-[10px] font-bold text-slate-400`}>Status: <span className={item.status === 'WORKING' ? 'text-yellow-500' : ''}>{item.status}</span></span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1 lg:space-y-1.5 w-20 lg:w-24 shrink-0">
                    <div className={`px-2 py-0.5 rounded text-[8px] lg:text-[9px] font-bold ${item.sColor}`}>{item.status}</div>
                    <div className={`w-full h-1 lg:h-1.5 rounded-full ${isDark ? 'bg-slate-700' : 'bg-slate-200'} overflow-hidden`}>
                      <motion.div 
                        initial={{ width: isActive ? "0%" : `${item.progress}%` }}
                        animate={{ width: `${item.progress}%` }}
                        transition={{ duration: 1, delay: 0.4 + i * 0.1 }}
                        className={`h-full rounded-full ${item.status === "WORKING" ? "bg-yellow-400" : "bg-yellow-400/30"}`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* PROJECTS IN PROGRESS */}
          <motion.div variants={itemVariants} className={`w-full rounded-2xl ${isDark ? 'bg-[#1a1d27] border-white/10' : 'bg-white border-slate-100'} shadow-lg p-3 lg:p-4 flex flex-col space-y-2.5 shrink-0`}>
            <h4 className={`text-[11px] lg:text-[13px] font-black ${isDark ? 'text-white' : 'text-slate-800'} tracking-tight uppercase`}>Projects In Progress</h4>
            
            <div className="flex flex-col space-y-2">
              {[
                { name: "DSP Advertising Setup", status: "WORKING", icon: "D", progress: 75, sColor: isDark ? 'bg-yellow-400/20 text-yellow-400' : 'bg-yellow-100 text-yellow-800' },
                { name: "Brand Registry Enrollment", status: "OPTIMIZING", icon: "B", progress: 45, sColor: isDark ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600' }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center space-x-2 lg:space-x-3">
                    <div className={`w-7 h-7 lg:w-8 lg:h-8 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-slate-50'} flex items-center justify-center font-bold text-base lg:text-lg ${isDark ? 'text-white' : 'text-slate-800'}`}>{item.icon}</div>
                    <div className="flex flex-col">
                      <span className={`text-[10px] lg:text-[12px] font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.name}</span>
                      <span className={`text-[9px] lg:text-[10px] font-bold text-slate-400`}>Status: <span className={item.status === 'WORKING' ? 'text-yellow-500' : ''}>{item.status}</span></span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1 lg:space-y-1.5 w-20 lg:w-24 shrink-0">
                    <div className={`px-2 py-0.5 rounded text-[8px] lg:text-[9px] font-bold ${item.sColor}`}>{item.status}</div>
                    <div className={`w-full h-1 lg:h-1.5 rounded-full ${isDark ? 'bg-slate-700' : 'bg-slate-200'} overflow-hidden`}>
                      <motion.div 
                        initial={{ width: isActive ? "0%" : `${item.progress}%` }}
                        animate={{ width: `${item.progress}%` }}
                        transition={{ duration: 1, delay: 0.8 + i * 0.1 }}
                        className={`h-full rounded-full ${item.status === "WORKING" ? "bg-yellow-400" : "bg-yellow-400/30"}`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Footer Text */}
          <motion.footer variants={itemVariants} className="text-center w-full flex-1 flex items-center justify-center">
            <span className={`text-[11px] lg:text-[13px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Managing <span className={isDark ? 'text-white' : 'text-slate-900'}>Active Services & Pipeline</span></span>
          </motion.footer>

        </main>
      </motion.div>
    </article>
  );
}
