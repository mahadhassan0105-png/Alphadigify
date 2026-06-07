/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Globe, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import * as Icons from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line } from "recharts";

const resultsChartData = [
  { name: "Month 1", value: 10 },
  { name: "Month 2", value: 25 },
  { name: "Month 3", value: 45 },
  { name: "Month 4", value: 90 },
  { name: "Month 5", value: 180 },
  { name: "Month 6", value: 350 },
];

const challengeChartData = [
  { name: "Initial State", metric: 20 },
  { name: "Required Target", metric: 100 },
];

const strategyChartData = [
  { name: "Phase 1", implementation: 20 },
  { name: "Phase 2", implementation: 50 },
  { name: "Phase 3", implementation: 90 },
  { name: "Phase 4", implementation: 150 },
];

interface CaseStudyDetailProps {
  slug: string;
}

export default function CaseStudyDetail({ slug }: CaseStudyDetailProps) {
  const [study, setStudy] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStudy() {
      try {
        setLoading(true);
        const res = await fetch(`/api/case-studies/${slug}`);
        const json = await res.json();
        if (json.success && json.caseStudy) {
          setStudy(json.caseStudy);
        } else {
          setError(json.error || "Case study not found.");
        }
      } catch (err) {
        console.error("Error fetching case study:", err);
        setError("An error occurred while fetching the case study.");
      } finally {
        setLoading(false);
      }
    }
    if (slug) {
      fetchStudy();
    }
  }, [slug]);

  // Helper to resolve icon component dynamically
  const getIcon = (name: string) => {
    const IconComponent = (Icons as any)[name];
    return IconComponent || Icons.TrendingUp;
  };

  if (loading) {
    return (
      <div className="w-full bg-slate-50 dark:bg-[#0c0c16] text-slate-900 dark:text-slate-100 min-h-screen pt-24 pb-16 transition-colors duration-500 animate-pulse overflow-x-hidden">
        {/* Navigation Skeleton */}
        <div className="max-w-4xl mx-auto px-6 mb-8">
          <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
        </div>

        {/* Hero Header Skeleton */}
        <section className="max-w-4xl mx-auto px-6 mb-16 space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/6" />
          </div>
          <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
          <div className="grid md:grid-cols-3 gap-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-3">
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
                <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
              </div>
            ))}
          </div>
        </section>

        {/* Hero Image Skeleton */}
        <section className="max-w-5xl mx-auto px-6 mb-20">
          <div className="w-full aspect-[21/9] bg-slate-200 dark:bg-slate-800 rounded-3xl" />
        </section>

        {/* Writeup Skeleton */}
        <section className="max-w-4xl mx-auto px-6 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 h-64" />
          <div className="md:col-span-8 space-y-8">
            <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
            <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded w-full" />
            <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
            <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded w-full" />
          </div>
        </section>
      </div>
    );
  }

  if (error || !study) {
    return (
      <div className="w-full bg-slate-50 dark:bg-[#0c0c16] text-slate-900 dark:text-slate-100 min-h-screen pt-24 pb-16 flex flex-col items-center justify-center transition-colors duration-500 overflow-x-hidden">
        <div className="max-w-md text-center p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-4">Case Study Error</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">{error || "The requested case study could not be found."}</p>
          <Link href="/case-studies">
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-full px-6">
              Return to Case Studies
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-50 dark:bg-[#0c0c16] text-slate-900 dark:text-slate-100 min-h-screen pt-24 pb-16 transition-colors duration-500 overflow-x-hidden">
      
      {/* Navigation */}
      <div className="max-w-4xl mx-auto px-6 mb-8">
        <Link href="/case-studies" className="inline-flex items-center text-slate-500 hover:text-yellow-600 dark:text-slate-400 dark:hover:text-yellow-400 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Case Studies
        </Link>
      </div>

      {/* Hero Header */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-yellow-400/20 text-yellow-700 dark:text-yellow-400 rounded-full text-xs font-bold uppercase tracking-wider border border-yellow-400/30">
              {study.service}
            </span>
            <span className="text-slate-500 text-sm font-medium">{study.client}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-6 sm:mb-8 text-slate-900 dark:text-white leading-tight">
            {study.title}
          </h1>
        </motion.div>

        {/* Big Metric Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-6 pt-6 sm:pt-8 border-t border-slate-200 dark:border-slate-800"
        >
          {study.metrics && Array.isArray(study.metrics) && study.metrics.map((metric: any, i: number) => {
            const Icon = getIcon(metric.iconName || "TrendingUp");
            return (
              <div key={i} className={`flex flex-col ${i !== study.metrics.length - 1 ? 'sm:border-r border-slate-200 dark:border-slate-800 pb-4 sm:pb-0 border-b sm:border-b-0' : ''} px-0 sm:px-4`}>
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-2">
                  <Icon className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
                  <span className="text-sm font-semibold uppercase tracking-wider">{metric.label}</span>
                </div>
                <span className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">{metric.value}</span>
              </div>
            );
          })}
        </motion.div>
      </section>

      {/* Hero Image */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="max-w-5xl mx-auto px-6 mb-20"
      >
        <div className="w-full aspect-video sm:aspect-[21/9] rounded-2xl sm:rounded-3xl overflow-hidden relative shadow-2xl border border-slate-200 dark:border-slate-800">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10" />
          <img src={study.heroImage} alt={study.title} className="w-full h-full object-cover" />
        </div>
      </motion.section>

      {/* The Writeup */}
      <section className="max-w-4xl mx-auto px-6 grid md:grid-cols-12 gap-12">
        
        {/* Left Sidebar - Quick Facts */}
        <div className="md:col-span-4 relative">
          <div className="sticky top-32 space-y-8">
            <h3 className="font-black text-xl mb-8 text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-3">
              <span className="w-8 h-px bg-yellow-500"></span>
              Project Brief
            </h3>
            
            <div className="relative pl-6 border-l border-slate-200 dark:border-slate-800 space-y-10">
              
              <div className="relative">
                <div className="absolute -left-[29px] top-1.5 w-3 h-3 rounded-full bg-slate-50 dark:bg-[#0c0c16] border-2 border-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
                <span className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2"><Icons.Building2 className="w-4 h-4 text-yellow-500"/> Client Partner</span>
                <span className="font-black text-slate-900 dark:text-white text-2xl tracking-tight">{study.client}</span>
              </div>

              <div className="relative">
                <div className="absolute -left-[29px] top-1.5 w-3 h-3 rounded-full bg-slate-50 dark:bg-[#0c0c16] border-2 border-yellow-500"></div>
                <span className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2"><Icons.Briefcase className="w-4 h-4 text-yellow-500"/> Industry Focus</span>
                <span className="font-medium text-slate-800 dark:text-slate-200 text-lg">{study.industry}</span>
              </div>

              <div className="relative">
                <div className="absolute -left-[29px] top-1.5 w-3 h-3 rounded-full bg-slate-50 dark:bg-[#0c0c16] border-2 border-yellow-500"></div>
                <span className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2"><Globe className="w-4 h-4 text-yellow-500"/> Core Service Area</span>
                <span className="font-medium text-slate-800 dark:text-slate-200 text-lg">{study.service}</span>
              </div>

              <div className="relative">
                <div className="absolute -left-[29px] top-1.5 w-3 h-3 rounded-full bg-slate-50 dark:bg-[#0c0c16] border-2 border-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
                <span className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2"><Clock className="w-4 h-4 text-yellow-500"/> Implementation Timeline</span>
                <span className="font-medium text-slate-800 dark:text-slate-200 text-lg">{study.timeline}</span>
              </div>
              
              <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
                <Link href="/contact" className="inline-flex items-center text-sm font-bold text-yellow-600 dark:text-yellow-400 hover:text-yellow-500 transition-colors uppercase tracking-widest">
                  Start a Similar Project <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>

            </div>
          </div>
        </div>

        {/* Right Content - The Story */}
        <div className="md:col-span-8 space-y-12">
          
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-4 sm:mb-6 text-slate-900 dark:text-white flex items-center gap-3 sm:gap-4">
              <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 flex items-center justify-center text-base sm:text-lg font-black border border-yellow-200 dark:border-yellow-500/20 shadow-sm">1</span>
              The Challenge
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line mb-8 font-medium">
              {study.challenge}
            </p>
            <div className="w-full h-64 border-l-2 border-slate-200 dark:border-slate-800 pl-4 sm:pl-6">
              <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-500" /> The Gap Analysis
              </h4>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={challengeChartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#334155" opacity={0.3} />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 'bold' }} width={100} />
                  <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#0F172A', borderRadius: '12px', border: '1px solid #1E293B' }} />
                  <Bar dataKey="metric" fill="#EAB308" radius={[0, 4, 4, 0]} barSize={24} animationDuration={1500} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-4 sm:mb-6 text-slate-900 dark:text-white flex items-center gap-3 sm:gap-4">
              <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 flex items-center justify-center text-base sm:text-lg font-black border border-yellow-200 dark:border-yellow-500/20 shadow-sm">2</span>
              Strategy & Execution
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line mb-8 font-medium">
              {study.solution}
            </p>
            <div className="w-full h-64 border-l-2 border-slate-200 dark:border-slate-800 pl-4 sm:pl-6">
              <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2">
                <Icons.Activity className="w-4 h-4 text-yellow-500" /> Implementation Velocity
              </h4>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={strategyChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.3} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderRadius: '12px', border: '1px solid #1E293B' }} />
                  <Line type="monotone" dataKey="implementation" stroke="#EAB308" strokeWidth={4} dot={{r: 6, fill: "#0F172A", stroke: "#EAB308", strokeWidth: 2}} activeDot={{r: 8}} animationDuration={2000} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-4 sm:mb-6 text-slate-900 dark:text-white flex items-center gap-3 sm:gap-4">
              <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 flex items-center justify-center text-base sm:text-lg font-black border border-yellow-200 dark:border-yellow-500/20 shadow-sm">3</span>
              The Results
            </h2>
            <ul className="space-y-4 mb-10">
              {study.results && Array.isArray(study.results) && study.results.map((res: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-slate-700 dark:text-slate-300 font-medium">{res}</span>
                </li>
              ))}
            </ul>

            <div className="w-full h-80 pt-8 border-t border-slate-200 dark:border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2">
                <Icons.TrendingUp className="w-4 h-4 text-yellow-500" /> Exponential Growth Trajectory
              </h4>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={resultsChartData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EAB308" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#EAB308" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.3} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0F172A', 
                      borderRadius: '12px',
                      border: '1px solid #1E293B',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
                    }}
                    itemStyle={{ color: '#EAB308', fontWeight: 'bold' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#EAB308" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 mt-12 text-center border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">Want these exact results for your brand?</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-lg max-w-2xl mx-auto mb-8">
          Stop guessing with your marketing budget. Partner with the agency that engineers predictable growth and transparent ROI.
        </p>
        <Button size="lg" className="bg-yellow-400 text-black hover:bg-yellow-500 font-bold px-6 sm:px-10 h-12 sm:h-14 text-sm sm:text-base w-full sm:w-auto overflow-hidden shadow-[0_0_30px_rgba(250,204,21,0.3)] hover:shadow-[0_0_40px_rgba(250,204,21,0.5)] transition-all whitespace-nowrap">
          Request a Free Strategy Audit <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
        </Button>
      </section>

    </div>
  );
}
