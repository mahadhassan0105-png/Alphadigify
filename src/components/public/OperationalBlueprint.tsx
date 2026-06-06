"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Activity, DollarSign } from "lucide-react";

export default function InteractiveTelemetryConsole() {
  // Draggable Telemetry Variables
  const [traffic, setTraffic] = useState(25000); // 1,000 to 100,000
  const [conversion, setConversion] = useState(2.5); // 0.5% to 8.0%

  // Real-time calculation outputs
  const leads = Math.round(traffic * (conversion / 100));
  const estimatedRevenue = leads * 3500; // Average Contract Value $3,500
  const multiplier = ((traffic / 25000) * (conversion / 2.5)).toFixed(1);

  // Generate dynamic wave path based on active variables
  const getDynamicPath = () => {
    const points = [];
    const amplitude = 30 + conversion * 8; // Conversion scales wave height
    const frequency = 0.02 + (traffic / 100000) * 0.03; // Traffic scales wave speed/frequency
    
    for (let x = 40; x <= 360; x += 5) {
      const y = 150 + Math.sin(x * frequency) * amplitude;
      points.push(`${x} ${y}`);
    }
    return `M 40 150 L ${points.join(" L ")}`;
  };

  return (
    <section className="relative py-14 overflow-hidden bg-white dark:bg-black transition-colors duration-500">
      {/* Absolute background telemetry coordinates mesh (Ultra-minimalist, no cards) */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03] dark:opacity-[0.05]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating high-tech blur nodes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-yellow-400/[0.03] rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-amber-500/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Dynamic Typography Section Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div 
            className="inline-flex items-center space-x-2 text-yellow-600 dark:text-yellow-400 font-extrabold tracking-[0.25em] text-xs uppercase mb-2"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>OPERATIONAL TELEMETRY ENGINE</span>
          </div>
          
          <h2 
            className="text-4xl sm:text-6xl font-black text-zinc-900 dark:text-white leading-[1.05] tracking-tight mb-2"
          >
            Live Performance <br />
            <span className="text-yellow-400">Simulation Console.</span>
          </h2>
          
          <p 
            className="text-lg text-slate-600 dark:text-zinc-400 leading-relaxed"
          >
            Adjust the sliders below in real-time to simulate how custom optimization pipelines scale conversion volume, lead capture, and dynamic contract revenue.
          </p>
        </div>

        {/* Split Screen Console Grid - ZERO cards, purely boundaryless typography and graphics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Sliders Group (Top on Mobile, Top-Left on Desktop) */}
          <div className="w-full space-y-6 order-1">
              
              {/* Slider 1: Traffic Volume */}
              <div className="space-y-3">
                <div className="flex items-center justify-between font-bold text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                  <span>Simulated Monthly Traffic</span>
                  <span className="text-yellow-500 dark:text-yellow-400 text-sm font-black">
                    {traffic.toLocaleString()} Visitors
                  </span>
                </div>
                <div className="relative flex items-center">
                  <input 
                    type="range" 
                    min="1000" 
                    max="100000" 
                    step="1000"
                    value={traffic}
                    onChange={(e) => setTraffic(Number(e.target.value))}
                    className="w-full h-1 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-yellow-400 outline-none transition-all focus:ring-1 focus:ring-yellow-400/30"
                  />
                </div>
              </div>

              {/* Slider 2: Conversion Rate */}
              <div className="space-y-3">
                <div className="flex items-center justify-between font-bold text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                  <span>Target Conversion Rate</span>
                  <span className="text-yellow-500 dark:text-yellow-400 text-sm font-black">
                    {conversion.toFixed(1)}%
                  </span>
                </div>
                <div className="relative flex items-center">
                  <input 
                    type="range" 
                    min="0.5" 
                    max="8.0" 
                    step="0.1"
                    value={conversion}
                    onChange={(e) => setConversion(Number(e.target.value))}
                    className="w-full h-1 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-yellow-400 outline-none transition-all focus:ring-1 focus:ring-yellow-400/30"
                  />
                </div>
              </div>

            </div>

          {/* Dynamic Calculated Outflow Metrics (Bottom on Mobile, Bottom-Left on Desktop) */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 lg:gap-6 pt-6 lg:pt-0 lg:border-t-0 border-t border-zinc-200 dark:border-zinc-900/60 order-3">
              
              {/* Output 1: Converted Leads */}
              <div className="space-y-1 sm:border-l sm:border-zinc-200 dark:sm:border-zinc-900 sm:pl-3 lg:pl-4 first:border-0 first:pl-0">
                <span className="text-[10px] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                  <span className="truncate">Captured Leads</span>
                </span>
                <div className="text-2xl lg:text-3xl xl:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight tabular-nums truncate">
                  {leads.toLocaleString()}
                </div>
                <div className="text-[9px] lg:text-[10px] text-zinc-400 dark:text-zinc-500 font-semibold uppercase leading-tight truncate">
                  Qualified Opportunities
                </div>
              </div>

              {/* Output 2: Estimated Pipeline Revenue */}
              <div className="space-y-1 sm:border-l sm:border-zinc-200 dark:sm:border-zinc-900 sm:pl-3 lg:pl-4">
                <span className="text-[10px] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="truncate">Pipeline Value</span>
                </span>
                <div className="text-2xl lg:text-3xl xl:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight tabular-nums flex items-center truncate">
                  <DollarSign className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-zinc-400 shrink-0" strokeWidth={3} />
                  <span>{estimatedRevenue.toLocaleString()}</span>
                </div>
                <div className="text-[9px] lg:text-[10px] text-zinc-400 dark:text-zinc-500 font-semibold uppercase leading-tight truncate">
                  Est. Gross Value
                </div>
              </div>

              {/* Output 3: Performance Multiplier */}
              <div className="space-y-1 sm:border-l sm:border-zinc-200 dark:sm:border-zinc-900 sm:pl-3 lg:pl-4">
                <span className="text-[10px] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span className="truncate">Scale Velocity</span>
                </span>
                <div className="text-2xl lg:text-3xl xl:text-4xl font-extrabold text-yellow-500 dark:text-yellow-400 tracking-tight tabular-nums truncate">
                  {multiplier}x
                </div>
                <div className="text-[9px] lg:text-[10px] text-zinc-400 dark:text-zinc-500 font-semibold uppercase leading-tight truncate">
                  Growth Velocity Ratio
                </div>
              </div>

            </div>

          {/* Right Column: Dynamic SVG Telemetry Wave & Animated Console Elements (Middle on Mobile, Right on Desktop) */}
          <div className="w-full relative flex items-center justify-center order-2 lg:row-span-2">
            {/* Glowing background halo without any boundary card */}
            <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400/[0.04] to-transparent rounded-full blur-[90px] z-0 pointer-events-none" />

            <div className="relative w-full aspect-[4/3] max-w-lg z-10 flex items-center justify-center">
              
              {/* Dynamic SVG Canvas */}
              <svg className="w-full h-full" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Horizontal Coordinate Grid lines */}
                {[...Array(6)].map((_, i) => (
                  <line
                    key={`telemetry-grid-${i}`}
                    x1="40"
                    y1={50 + i * 40}
                    x2="360"
                    y2={50 + i * 40}
                    stroke="rgba(228, 228, 231, 0.25)"
                    strokeWidth="1"
                    className="dark:stroke-zinc-900/40"
                  />
                ))}

                {/* Vertical Coordinate Grid lines */}
                {[...Array(9)].map((_, i) => (
                  <line
                    key={`telemetry-grid-v-${i}`}
                    x1={40 + i * 40}
                    y1="40"
                    x2={40 + i * 40}
                    y2="260"
                    stroke="rgba(228, 228, 231, 0.15)"
                    strokeWidth="1"
                    className="dark:stroke-zinc-900/20"
                  />
                ))}

                {/* Animated Primary Signal Path (Updates instantly as sliders drag!) */}
                <path
                  d={getDynamicPath()}
                  stroke="url(#telemetryGlowGradient)"
                  strokeWidth={2 + conversion * 0.8} // Higher conversion rate makes the signal line bolder
                  strokeLinecap="round"
                  fill="none"
                  className="transition-all duration-150 ease-out"
                />

                {/* Simulated Data Ingestion Nodes floating on the wave */}
                <motion.circle
                  cx={120}
                  cy={150 + Math.sin(120 * (0.02 + (traffic / 100000) * 0.03)) * (30 + conversion * 8)}
                  r="6"
                  fill="#F59E0B"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  className="dark:stroke-black transition-all duration-150 ease-out"
                />
                <motion.circle
                  cx={280}
                  cy={150 + Math.sin(280 * (0.02 + (traffic / 100000) * 0.03)) * (30 + conversion * 8)}
                  r="6"
                  fill="#FBBF24"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  className="dark:stroke-black transition-all duration-150 ease-out"
                />

                {/* Drifting background dashboard stream path */}
                <path
                  d="M 40 180 Q 120 120 200 210 T 360 160"
                  stroke="rgba(251, 191, 36, 0.1)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />

                {/* SVG Definitions */}
                <defs>
                  <linearGradient id="telemetryGlowGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#F59E0B" />
                    <stop offset="50%" stopColor="#FBBF24" />
                    <stop offset="100%" stopColor="#F59E0B" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Top Telemetry Tag */}
              <div 
                className="absolute top-6 right-6 flex items-center space-x-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest bg-zinc-950/80 text-white px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-md pointer-events-none shadow-md"
              >
                <Activity className="w-3 h-3 text-emerald-500 animate-pulse" />
                <span className="tabular-nums">CALIBRATION VELOCITY: {multiplier}x</span>
              </div>

              {/* Bottom Telemetry Coordinate Overlay */}
              <div 
                className="absolute bottom-6 left-6 font-mono text-[9px] sm:text-[10px] font-bold text-zinc-400 dark:text-zinc-500 tracking-wider pointer-events-none uppercase"
              >
                Ingest: {(traffic / 1000).toFixed(0)}k | Rate: {conversion.toFixed(1)}% | GCV: ${estimatedRevenue.toLocaleString()}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
