/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

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

export default function AnimatedDashboard({ theme, isActive, layoutId = 1 }: AnimatedDashboardProps) {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 250, damping: 24 } },
  };

  const barVariants = {
    hidden: { height: 0 },
    show: (height: number) => ({
      height: `${height}%`,
      transition: { type: "spring" as const, stiffness: 150, damping: 20, delay: 0.6 + Math.random() * 0.3 },
    }),
  };

  const widthVariants = {
    hidden: { width: 0 },
    show: (w: number) => ({
      width: `${w}%`,
      transition: { type: "spring" as const, stiffness: 120, damping: 20, delay: 0.8 + Math.random() * 0.3 },
    }),
  };

  if (layoutId === 2) {
    // LAYOUT 2: Performance Metrics (White Background)

    // Pentagon radar helpers (5 axes, starting from top)
    const radarAxes = 5;
    const radarCenter = 100;
    const radarMax = 80;
    const radarLabels = ["Keyword\nRanking", "Conversion\nRate", "Ad\nSpend", "Brand\nAwareness", "Market\nShare"];
    
    const radarPoint = (axis: number, value: number) => {
      const angle = (Math.PI * 2 * axis) / radarAxes - Math.PI / 2;
      const r = (value / 100) * radarMax;
      return { x: radarCenter + r * Math.cos(angle), y: radarCenter + r * Math.sin(angle) };
    };

    const polygonPoints = (values: number[]) =>
      values.map((v, i) => { const p = radarPoint(i, v); return `${p.x},${p.y}`; }).join(' ');

    const gridPoints = (pct: number) =>
      Array.from({ length: radarAxes }, (_, i) => {
        const p = radarPoint(i, pct);
        return `${p.x},${p.y}`;
      }).join(' ');

    // Data series
    const seriesA = [90, 60, 75, 85, 50]; // Dark navy
    const seriesB = [65, 80, 50, 60, 70]; // Yellow overlay

    return (
      <article className={`w-full h-full ${isDark ? 'bg-[#0f1117]' : 'bg-slate-50'} flex flex-col overflow-hidden relative font-sans`}>
        <div className={`absolute inset-0 ${isDark ? 'bg-[#0f1117]' : 'bg-white'}`} />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: gridDotColor, backgroundSize: '24px 24px' }}></div>
        
        <motion.div variants={containerVariants} initial="show" animate="show" className="w-full h-full flex flex-col z-10">
          
          {/* Top Navbar */}
          <motion.header variants={itemVariants} className="w-full h-12 lg:h-14 bg-[#0F4A5C] text-white border-b border-[#0B3948] flex items-center justify-between px-4 lg:px-6 shrink-0">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-sm lg:text-base text-white">Alphadigify</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="hidden md:flex items-center text-[10px] lg:text-xs font-semibold px-2 py-1 lg:px-3 lg:py-1.5 rounded-md border border-white/20 text-white/80">
                <span className="mr-2 opacity-70">📅</span> JAN 1 - OCT 31, 2025 <span className="ml-2 opacity-50">˅</span>
              </div>
              <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full overflow-hidden shrink-0 bg-white border border-slate-200 shadow-sm flex items-center justify-center">
                <img src="/alphadigify-logo.jpg" className="w-full h-full object-cover" alt="Alphadigify Logo" />
              </div>
            </div>
          </motion.header>

          <main className="flex-1 flex flex-col px-4 pt-2 lg:pt-3 pb-2 space-y-2 lg:space-y-3 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] items-center">
            
            <motion.div variants={itemVariants} className="text-center w-full shrink-0">
              <h2 className={`text-[13px] lg:text-[15px] font-black ${isDark ? 'text-white' : 'text-slate-900'} tracking-wide uppercase`}>PERFORMANCE & GROWTH METRICS</h2>
              <h3 className={`text-[9px] lg:text-[11px] font-extrabold text-yellow-500 tracking-wider`}>(LIVE DATA)</h3>
            </motion.div>

            {/* PERFORMANCE METRICS CARD */}
            <motion.div variants={itemVariants} className={`w-full rounded-2xl ${isDark ? 'bg-[#1a1d27] border-white/10' : 'bg-white border-slate-100'} shadow-lg p-3 lg:p-4 flex flex-col shrink-0`}>
              <h4 className={`text-[10px] lg:text-xs font-black ${isDark ? 'text-white' : 'text-slate-900'} tracking-tight uppercase mb-2 lg:mb-3`}>Performance Metrics</h4>
              
              <div className="flex justify-between items-center px-1 lg:px-4">
                {[
                  { label: "65%", pct: 0.65, text: "Avg ACOS\nImprovement" },
                  { label: "+88%", pct: 0.88, text: "Organic Sales\nGrowth" },
                  { label: "4.2x", pct: 0.95, text: "DSP\nR.O.A.S." },
                  { label: "+72%", pct: 0.72, text: "Brand\nVisibility" },
                  { label: "3.8x", pct: 0.85, text: "Click-Through\nRate" }
                ].map((m, i) => (
                  <div key={i} className="flex flex-col items-center w-1/5">
                    <div className="relative w-10 h-10 lg:w-14 lg:h-14 mb-1">
                      <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                        <circle cx="50" cy="50" r="40" className={isDark ? 'stroke-slate-700' : 'stroke-slate-100'} strokeWidth="10" fill="none" />
                        <motion.circle cx="50" cy="50" r="40" className="stroke-yellow-400" strokeWidth="10" fill="none" strokeDasharray={251.2}
                          initial={{ strokeDashoffset: isActive ? 251.2 : 251.2 * (1 - m.pct) }}
                          animate={{ strokeDashoffset: 251.2 * (1 - m.pct) }}
                          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 + i * 0.15 }}
                          strokeLinecap="round" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`font-black ${isDark ? 'text-white' : 'text-slate-900'} text-[10px] lg:text-sm`}>{m.label}</span>
                      </div>
                    </div>
                    <span className={`text-[7px] lg:text-[8px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'} text-center uppercase leading-tight whitespace-pre-wrap`}>{m.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* RADAR CARD */}
            <motion.div variants={itemVariants} className={`w-full rounded-2xl ${isDark ? 'bg-[#1a1d27] border-white/10' : 'bg-white border-slate-100'} shadow-lg p-3 lg:p-4 flex flex-col shrink-0 relative overflow-hidden`}>
              <h4 className={`text-[10px] lg:text-[12px] font-black ${isDark ? 'text-white' : 'text-slate-900'} tracking-tight uppercase mb-1`}>Client Portfolio Growth Radar</h4>
              
              <div className="flex items-center justify-between">
                
                {/* Left Client Stats */}
                <div className="flex flex-col items-start w-[72px] lg:w-24 shrink-0">
                  <span className={`text-[8px] lg:text-[9px] font-bold ${isDark ? 'text-slate-500' : 'text-slate-400'} uppercase mb-1`}>Keyword Ranking</span>
                  <span className={`text-[9px] lg:text-[10px] font-bold ${isDark ? 'text-white' : 'text-slate-900'} uppercase`}>Client A</span>
                  <span className={`text-lg lg:text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'} leading-none`}>957</span>
                  <span className="text-xs lg:text-sm font-black text-yellow-500 leading-tight">+35%</span>
                  <span className={`text-[7px] lg:text-[8px] font-bold ${isDark ? 'text-slate-500' : 'text-slate-400'} uppercase mt-0.5 leading-snug`}>Keyword<br/>Ranking</span>
                </div>

                {/* Radar Chart */}
                <div className="w-28 h-28 lg:w-40 lg:h-40 relative shrink-0">
                  <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
                    {/* Concentric pentagon grids */}
                    {[20, 40, 60, 80, 100].map((pct, i) => (
                      <polygon key={i} points={gridPoints(pct)} fill="none" className={isDark ? 'stroke-slate-700' : 'stroke-slate-200'} strokeWidth="0.5" />
                    ))}
                    
                    {/* Axis lines from center to each vertex */}
                    {Array.from({ length: radarAxes }, (_, i) => {
                      const p = radarPoint(i, 100);
                      return <line key={i} x1={radarCenter} y1={radarCenter} x2={p.x} y2={p.y} className={isDark ? 'stroke-slate-700' : 'stroke-slate-200'} strokeWidth="0.5" />;
                    })}

                    {/* Dark Navy Data Polygon */}
                    <motion.polygon 
                      points={polygonPoints(seriesA)}
                      className="fill-[#1b2b5a]/70 stroke-[#1b2b5a]" strokeWidth="1.5" strokeLinejoin="round"
                      initial={{ opacity: isActive ? 0 : 1, scale: isActive ? 0 : 1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, type: "spring", bounce: 0.3, delay: 0.5 }}
                      style={{ transformOrigin: `${radarCenter}px ${radarCenter}px` }}
                    />

                    {/* Yellow Data Polygon */}
                    <motion.polygon 
                      points={polygonPoints(seriesB)}
                      className="fill-yellow-400/30 stroke-yellow-500" strokeWidth="1.5" strokeLinejoin="round"
                      initial={{ opacity: isActive ? 0 : 1, scale: isActive ? 0 : 1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, type: "spring", bounce: 0.3, delay: 0.8 }}
                      style={{ transformOrigin: `${radarCenter}px ${radarCenter}px` }}
                    />

                    {/* Data vertex dots — Series A */}
                    {seriesA.map((v, i) => {
                      const p = radarPoint(i, v);
                      return (
                        <motion.circle key={`a${i}`} cx={p.x} cy={p.y} r="3" className="fill-[#1b2b5a] stroke-white" strokeWidth="1"
                          initial={{ opacity: isActive ? 0 : 1, scale: isActive ? 0 : 1 }} animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1.0 + i * 0.08 }} />
                      );
                    })}

                    {/* Data vertex dots — Series B */}
                    {seriesB.map((v, i) => {
                      const p = radarPoint(i, v);
                      return (
                        <motion.circle key={`b${i}`} cx={p.x} cy={p.y} r="3" className="fill-yellow-500 stroke-white" strokeWidth="1"
                          initial={{ opacity: isActive ? 0 : 1, scale: isActive ? 0 : 1 }} animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1.2 + i * 0.08 }} />
                      );
                    })}

                    {/* Radar sweep line (rotating) */}
                    <motion.line
                      x1={radarCenter} y1={radarCenter} x2={radarCenter} y2={radarCenter - radarMax}
                      className="stroke-yellow-400/60" strokeWidth="1.5" strokeLinecap="round"
                      initial={{ rotate: 0 }}
                      animate={isActive ? { rotate: 360 } : { rotate: 0 }}
                      transition={{ duration: 3, ease: "linear", repeat: Infinity, delay: 0.5 }}
                      style={{ transformOrigin: `${radarCenter}px ${radarCenter}px` }}
                    />

                    {/* Sweep glow cone */}
                    <defs>
                      <linearGradient id="sweepGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FACC15" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#FACC15" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <motion.path
                      d={`M ${radarCenter},${radarCenter} L ${radarCenter - 15},${radarCenter - radarMax} L ${radarCenter + 15},${radarCenter - radarMax} Z`}
                      fill="url(#sweepGrad)"
                      initial={{ rotate: 0 }}
                      animate={isActive ? { rotate: 360 } : { rotate: 0 }}
                      transition={{ duration: 3, ease: "linear", repeat: Infinity, delay: 0.5 }}
                      style={{ transformOrigin: `${radarCenter}px ${radarCenter}px` }}
                    />

                    {/* Axis Labels */}
                    {radarLabels.map((label, i) => {
                      const p = radarPoint(i, 120);
                      return (
                        <text key={i} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle"
                          className={`${isDark ? 'fill-slate-400' : 'fill-slate-500'} font-bold`} style={{ fontSize: '7px' }}>
                          {label.split('\n').map((line, li) => (
                            <tspan key={li} x={p.x} dy={li === 0 ? 0 : '8'}>{line}</tspan>
                          ))}
                        </text>
                      );
                    })}
                  </svg>
                </div>

                {/* Right Client Stats */}
                <div className="flex flex-col items-end w-[72px] lg:w-24 text-right shrink-0">
                  <span className={`text-[8px] lg:text-[9px] font-bold ${isDark ? 'text-slate-500' : 'text-slate-400'} uppercase mb-1`}>Conversion Rate</span>
                  <span className={`text-[9px] lg:text-[10px] font-bold ${isDark ? 'text-white' : 'text-slate-900'} uppercase`}>Client B</span>
                  <span className={`text-lg lg:text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'} leading-none`}>45%</span>
                  <span className="text-xs lg:text-sm font-black text-yellow-500 leading-tight">+48%</span>
                  <span className={`text-[7px] lg:text-[8px] font-bold ${isDark ? 'text-slate-500' : 'text-slate-400'} uppercase mt-0.5 leading-snug`}>Market<br/>Growth</span>
                </div>

              </div>

              {/* Bottom Center Stat */}
              <div className="flex justify-center mt-1">
                <div className="flex flex-col items-center">
                  <span className={`text-lg lg:text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>225</span>
                  <span className={`text-[6px] lg:text-[7px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'} uppercase leading-[1.1] text-center`}>Conversion Rate</span>
                </div>
              </div>
            </motion.div>

            {/* Footer Text */}
            <motion.footer variants={itemVariants} className="text-center w-full flex-1 flex items-center justify-center">
              <span className={`text-[10px] lg:text-[11px] font-black text-yellow-500`}>&gt; <span className={`${isDark ? 'text-white' : 'text-slate-900'} ml-1 font-semibold`}>Tracking Performance <span className="font-black">&amp; Optimization</span></span></span>
            </motion.footer>

          </main>
        </motion.div>
      </article>
    );
  }

  if (layoutId === 3) {
    // LAYOUT 3: Agency Revenue & Scaling Results

    const barData = [
      { month: "Jan", y: 30, g: 15, lineY: 190 },
      { month: "Feb", y: 40, g: 45, lineY: 160 },
      { month: "Mar", y: 65, g: 45, lineY: 140 },
      { month: "Apr", y: 55, g: 65, lineY: 155 },
      { month: "May", y: 80, g: 85, lineY: 110 },
      { month: "Jun", y: 70, g: 100, lineY: 115 },
      { month: "Jul", y: 115, g: 110, lineY: 65 },
      { month: "Aug", y: 130, g: 125, lineY: 55 },
      { month: "Oct", y: 145, g: 80, lineY: 35 }
    ];

    // Build the SVG path string for the line
    const pathString = barData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${i * 100 + 50},${d.lineY}`).join(" ");

    return (
      <article className={`w-full h-full ${isDark ? 'bg-[#0f1117]' : 'bg-slate-50'} flex flex-col overflow-hidden relative font-sans`}>
        <div className={`absolute inset-0 ${isDark ? 'bg-[#0f1117]' : 'bg-white'}`} />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: gridDotColor, backgroundSize: '24px 24px' }}></div>
        
        <motion.div variants={containerVariants} initial="show" animate="show" className="w-full h-full flex flex-col z-10">
          
          {/* Top Navbar */}
          <motion.header variants={itemVariants} className="w-full h-12 lg:h-14 bg-[#0F4A5C] text-white border-b border-[#0B3948] flex items-center justify-between px-4 lg:px-6 shrink-0">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-sm lg:text-base text-white">Alphadigify</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="hidden md:flex items-center text-[10px] lg:text-xs font-semibold px-2 py-1 lg:px-3 lg:py-1.5 rounded-md border border-white/20 text-white/80">
                <span className="mr-2 opacity-70">📅</span> JAN 1 - OCT 31, 2025 <span className="ml-2 opacity-50">˅</span>
              </div>
              <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full overflow-hidden shrink-0 bg-white border border-slate-200 shadow-sm flex items-center justify-center">
                <img src="/alphadigify-logo.jpg" className="w-full h-full object-cover" alt="Alphadigify Logo" />
              </div>
            </div>
          </motion.header>

          <main className="flex-1 flex flex-col px-4 pt-2 lg:pt-3 pb-2 space-y-2 lg:space-y-3 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] items-center">
            
            {/* Header */}
            <motion.div variants={itemVariants} className="w-full px-2 shrink-0">
              <h2 className={`text-[13px] lg:text-[15px] font-black ${isDark ? 'text-white' : 'text-slate-900'} tracking-wide uppercase leading-tight`}>
                Agency Revenue<br/>&amp; Scaling Results
              </h2>
            </motion.div>

            {/* MAIN CHART CARD */}
            <motion.div variants={itemVariants} className={`w-full rounded-2xl ${isDark ? 'bg-[#1a1d27] border-white/10' : 'bg-white border-slate-100'} shadow-xl p-3 lg:p-4 flex flex-col shrink-0 relative overflow-hidden`}>
              <h3 className={`text-[9px] lg:text-[11px] font-bold ${isDark ? 'text-slate-300' : 'text-slate-800'} uppercase tracking-wide mb-1`}>Overall Agency Partner Revenue (YTD)</h3>
              <div className={`text-2xl lg:text-3xl font-black ${isDark ? 'text-white' : 'text-slate-900'} mb-2 lg:mb-3 tracking-tight`}>$ 2,890,750</div>

              {/* Chart Area */}
              <div className="w-full h-32 lg:h-40 relative mb-1 lg:mb-2">
                <svg viewBox="0 0 900 250" className="w-full h-full overflow-visible preserve-3d">
                  {/* Grid Lines (optional for neatness) */}
                  {[0, 50, 100, 150, 200, 250].map(y => (
                    <line key={y} x1="0" y1={y} x2="900" y2={y} className={isDark ? 'stroke-slate-800' : 'stroke-slate-100'} strokeWidth="1" />
                  ))}

                  {/* Bars */}
                  {barData.map((d, i) => (
                    <g key={i} transform={`translate(${i * 100 + 50}, 0)`}>
                      {/* Gray Bar */}
                      <motion.rect 
                        x="2" width="16" className={isDark ? 'fill-slate-700' : 'fill-slate-200'}
                        initial={{ height: isActive ? 0 : d.g, y: isActive ? 250 : 250 - d.g }}
                        animate={{ height: d.g, y: 250 - d.g }}
                        transition={{ duration: 1, type: "spring", bounce: 0, delay: 0.2 + i * 0.05 }}
                      />
                      {/* Yellow Bar */}
                      <motion.rect 
                        x="-20" width="16" className="fill-yellow-400"
                        initial={{ height: isActive ? 0 : d.g, y: isActive ? 250 : 250 - d.g }}
                        animate={isActive ? { height: d.y, y: 250 - d.y } : { height: 0, y: 250 }}
                        transition={{ duration: 1, type: "spring", bounce: 0, delay: 0.3 + i * 0.05 }}
                      />
                      {/* Month Label */}
                      <text x="-2" y="275" textAnchor="middle" className={`text-xl font-bold ${isDark ? 'fill-slate-300' : 'fill-slate-800'}`} style={{ fontSize: '20px' }}>{d.month}</text>
                    </g>
                  ))}

                  {/* Line Chart */}
                  <motion.path 
                    d={pathString}
                    className={isDark ? 'stroke-white' : 'stroke-slate-900'} fill="none" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"
                    initial={{ pathLength: isActive ? 0 : 1 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                  />

                  {/* Line Drop Shadow / Double line effect */}
                  <motion.path 
                    d={pathString}
                    className="stroke-yellow-400 translate-y-1.5" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    initial={{ pathLength: isActive ? 0 : 1 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut", delay: 0.6 }}
                  />

                  {/* Arrow Head at the end */}
                  <motion.polygon 
                    points="835,28 855,30 845,55" 
                    className={isDark ? 'fill-white' : 'fill-slate-900'}
                    initial={{ opacity: isActive ? 0 : 1, scale: isActive ? 0 : 1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 2.0 }}
                  />
                  
                </svg>
              </div>

              {/* Divider */}
              <div className={`w-full h-px ${isDark ? 'bg-white/10' : 'bg-slate-100'} my-3 lg:my-4`}></div>

              {/* Bottom Row Stats */}
              <div className="flex justify-between items-center px-1 lg:px-4">
                {[
                  { val: "12.364", pct: 75, text: "UK Series\nMarketing\nFactory" },
                  { val: "5.947", pct: 35, text: "Metrics\nOverview\nConduct" },
                  { val: "17.490", pct: 85, text: "Business\nExecution\nScale" },
                  { val: "12.364", pct: 100, text: "US Market\nCommunity\nAnalytics" }
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col items-center text-center w-1/4">
                    <span className={`text-[10px] lg:text-[13px] font-black ${isDark ? 'text-white' : 'text-slate-900'} mb-1.5 tracking-tight`}>{stat.val}</span>
                    <div className="flex items-center space-x-1 lg:space-x-2">
                      <div className="w-5 h-5 lg:w-7 lg:h-7 relative rounded-full overflow-hidden shrink-0">
                         <svg viewBox="0 0 32 32" className="w-full h-full transform -rotate-90">
                           <circle r="16" cx="16" cy="16" className={isDark ? 'fill-slate-700' : 'fill-slate-200'} />
                           <motion.circle 
                              r="15.915" cx="16" cy="16" 
                              className="stroke-yellow-400" 
                              fill="none" 
                              strokeWidth="32" 
                              strokeDasharray="100 100"
                              initial={{ strokeDashoffset: isActive ? 100 : 100 - stat.pct }}
                              animate={{ strokeDashoffset: 100 - stat.pct }}
                              transition={{ duration: 1, delay: 1.0 + i * 0.2 }}
                           />
                         </svg>
                      </div>
                      <span className={`text-[5px] lg:text-[6px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'} uppercase leading-[1.1] text-left whitespace-pre-wrap`}>{stat.text}</span>
                    </div>
                  </div>
                ))}
              </div>

            </motion.div>

            {/* Footer Text */}
            <motion.footer variants={itemVariants} className="text-center w-full flex-1 flex items-center justify-center">
              <span className={`text-[10px] lg:text-[11px] font-black text-yellow-500`}>&gt; <span className={`${isDark ? 'text-white' : 'text-slate-900'} ml-1 font-semibold`}>Driving Revenue <span className="font-black">&amp; Scaling Brands</span></span></span>
            </motion.footer>

          </main>
        </motion.div>
      </article>
    );
  }

  // DEFAULT (LAYOUT 1): Service Ecosystem
  return (
    <article className={`w-full h-full ${isDark ? 'bg-[#0f1117]' : 'bg-slate-50'} flex flex-col overflow-hidden relative font-sans`}>
      <div className={`absolute inset-0 ${isDark ? 'bg-[#0f1117]' : 'bg-white'}`} />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: gridDotColor, backgroundSize: '24px 24px' }}></div>
      
      <motion.div variants={containerVariants} initial="show" animate="show" className="w-full h-full flex flex-col z-10">
        
        {/* Top Navbar */}
        <motion.header variants={itemVariants} className="w-full h-12 lg:h-14 bg-[#0F4A5C] text-white border-b border-[#0B3948] flex items-center justify-between px-4 lg:px-6 shrink-0">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-sm lg:text-base text-white">Alphadigify</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center text-[10px] lg:text-xs font-semibold px-2 py-1 lg:px-3 lg:py-1.5 rounded-md border border-white/20 text-white/80">
              <span className="mr-2 opacity-70">📅</span> JAN 1 - OCT 31, 2025 <span className="ml-2 opacity-50">˅</span>
            </div>
            <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full overflow-hidden shrink-0 bg-white border border-slate-200 shadow-sm flex items-center justify-center">
              <img src="/alphadigify-logo.jpg" className="w-full h-full object-cover" alt="Alphadigify Logo" />
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
                { name: "Amazon PPC Management", status: "WORKING", icon: "a", progress: 85, sColor: isDark ? 'bg-yellow-400/20 text-yellow-400' : 'bg-yellow-100 text-yellow-800' },
                { name: "Amazon SEO & Organic Growth", status: "WORKING", icon: "a", progress: 65, sColor: isDark ? 'bg-yellow-400/20 text-yellow-400' : 'bg-yellow-100 text-yellow-800' },
                { name: "TikTok Shop", status: "IN QUEUE", icon: "T", progress: 20, sColor: isDark ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600' }
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
                { name: "Social Media", status: "WORKING", icon: "S", progress: 75, sColor: isDark ? 'bg-yellow-400/20 text-yellow-400' : 'bg-yellow-100 text-yellow-800' },
                { name: "Web Development", status: "OPTIMIZING", icon: "</>", progress: 45, sColor: isDark ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600' }
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
