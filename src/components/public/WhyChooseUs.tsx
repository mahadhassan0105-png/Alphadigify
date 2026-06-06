"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function WhyChooseUs() {
  const points = [
    "Data-Driven Decision Making",
    "Transparent ROI Tracking",
    "Omnichannel Execution",
    "In-house Senior Talent",
    "Rapid Prototyping",
    "Elite Engineering Standards"
  ];

  return (
    <section className="py-24 bg-white dark:bg-slate-950 overflow-hidden relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <div className="inline-flex items-center space-x-2 bg-yellow-400/20 dark:bg-yellow-400/10 text-amber-600 dark:text-yellow-500 font-semibold px-4 py-2 rounded-full text-sm mb-6 border border-yellow-400/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                </span>
                <span>The Alphadigify Advantage</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
                We&apos;re an execution engine, not just an agency.
              </h2>
            </div>
            
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              We move faster than traditional firms because we remove the red tape. Our hybrid approach combining engineering precision with creative marketing creates an unfair advantage for your brand.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {points.map((point, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3 text-slate-700 dark:text-slate-300"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span className="font-medium text-sm">{point}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Highly Optimized Warm Canvas Matching Screenshot */}
            <div className="relative rounded-[2.5rem] overflow-hidden border border-amber-100 dark:border-slate-800 bg-[#FCFBF7] dark:bg-slate-900 aspect-square shadow-xl flex items-center justify-center transform-gpu">
              
              {/* Central Abstract Metric UI block */}
              <div className="relative w-3/4 aspect-square bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-2xl p-8 flex flex-col justify-center transform rotate-3 hover:rotate-0 transition-transform duration-500 will-change-transform">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <h4 className="text-slate-500 dark:text-slate-400 text-xs font-bold tracking-widest uppercase mb-2">Total Scaling ROI</h4>
                    <div className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white">394%</div>
                  </div>
                  <div className="w-12 h-12 bg-amber-400/20 rounded-full flex items-center justify-center -mr-2">
                    <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                </div>

                {/* Animated Graph Representation */}
                <div className="w-full h-32 relative flex items-end justify-between space-x-2">
                  {[15, 30, 25, 45, 60, 55, 80, 100].map((height, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${height}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                      className="w-full rounded-t-md bg-gradient-to-t from-amber-500 to-yellow-400 will-change-transform shadow-sm"
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-400 rounded-full blur-[100px] opacity-20 pointer-events-none transform-gpu"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
