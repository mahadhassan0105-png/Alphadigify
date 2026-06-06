/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  TrendingDown,
  ShieldCheck,
  ArrowRight,
  RefreshCcw,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  Shield,
  XCircle,
  MessageSquare,
  ClipboardList,
  ChevronDown,
  HeartHandshake,
  Package,
  AlertCircle,
  Sparkles
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function AccountReinstatementClient() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % 3);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + 3) % 3);

  // Auto-play slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white dark:bg-[#0B0C10] min-h-screen text-slate-900 dark:text-white overflow-hidden selection:bg-yellow-400/30 transition-colors duration-300">
      
      {/* ═══════════════════════════════════════════════════════════════
          1. HERO — URGENCY & REASSURANCE
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative pt-36 pb-0 md:pb-24 lg:pt-44 lg:pb-36 overflow-hidden min-h-[110vh] sm:min-h-[900px] flex items-center">
        {/* Background Image & Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-black [clip-path:ellipse(200%_100%_at_50%_0%)] md:[clip-path:ellipse(120%_95%_at_50%_0%)]"
        >
          <Image
            src="/amazon-reinstatement-hero.png"
            alt="Account Reinstatement Background"
            fill
            priority
            className="object-cover object-center"
          />
          {/* Light/Dark mode overlays to ensure text readability against the image */}
          <div className="absolute inset-0 bg-[#0d1b3e]/80 backdrop-blur-[1px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Hero Text */}
            {/* Hero Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl lg:max-w-3xl"
            >
              {/* Partner Logos */}
              <div className="flex items-center gap-6 mb-10">
                {/* Amazon SPN Logo */}
                <div className="flex flex-col">
                  <div className="flex items-center text-3xl font-bold tracking-tighter text-white">
                    amazon<span className="text-yellow-400 font-normal ml-0.5">spn</span>
                  </div>
                  <div className="w-full h-[2px] bg-yellow-400 rounded-full mt-0.5 mb-1 relative overflow-hidden">
                    <div className="absolute left-1/2 -translate-x-1/2 w-1/2 h-full bg-[#0d1b3e]"></div>
                  </div>
                  <span className="text-xs tracking-wide text-blue-200 font-medium">solution provider network</span>
                </div>

                <div className="w-[1px] h-12 bg-white/30"></div>

                {/* Amazon Ads Logo */}
                <div className="flex flex-col justify-center">
                  <div className="flex items-center text-2xl font-bold tracking-tighter text-white">
                    amazon<span className="font-normal ml-1">ads</span>
                  </div>
                  <div className="text-sm font-bold tracking-wide mt-1">
                    <span className="text-[#00A8E1]">Verified</span> <span className="text-blue-200">partner</span>
                  </div>
                </div>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-wide mb-6 text-white uppercase font-sans">
                AMAZON ACCOUNT REINSTATEMENT SERVICES
              </h1>

              {/* Subtitle */}
              <p className="text-xl sm:text-2xl text-blue-100 max-w-2xl leading-relaxed mb-8 italic font-serif">
                Reinstate Suspended Seller Accounts and Protect Long-Term Selling Rights with Amazon Reinstatement Specialists
              </p>

              {/* Single CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="#process"
                  className="inline-flex items-center px-8 py-4 rounded-full bg-white/10 text-white font-bold hover:bg-white/20 transition-colors border border-white/30 backdrop-blur-sm"
                >
                  How We Do It
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </motion.div>

            {/* Hero Visual — Animated Status Mockup */}
            {/* Hero Visual — Carousel Slider */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative perspective-1000 w-full max-w-md mx-auto lg:max-w-none mt-12 lg:mt-0"
            >
              <div className="relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden p-6 min-h-[420px] flex flex-col">
                
                {/* Slides Container */}
                <div className="flex-1 relative">
                  <AnimatePresence mode="wait">
                    {currentSlide === 0 && (
                      <motion.div
                        key="slide0"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 flex flex-col"
                      >
                        {/* Gmail App Header */}
                        <div className="flex items-center gap-2 mb-3">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" alt="Gmail" className="w-5 h-5" />
                          <span className="font-semibold text-slate-600 dark:text-slate-300 text-sm">Gmail</span>
                        </div>

                        {/* Realistic Email Header */}
                        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
                          <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white flex items-center justify-center shrink-0 shadow-sm border border-slate-200">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg" alt="Amazon" className="w-6 h-6 object-contain" />
                          </div>
                          <div className="overflow-hidden">
                            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm truncate">Your Amazon.com selling privileges have been reinstated</h3>
                            <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                              <span className="font-semibold text-slate-700 dark:text-slate-300 mr-1">seller-performance</span>
                              <span className="hidden sm:inline">&lt;seller-performance@amazon.com&gt;</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Realistic Email Body */}
                        <div className="bg-white dark:bg-[#1A1A1A] rounded-xl p-5 flex-1 border border-slate-200 dark:border-slate-800 shadow-inner overflow-y-auto">
                          <div className="text-sm font-sans text-slate-800 dark:text-slate-300 leading-relaxed">
                            <p className="mb-4">Hello,</p>
                            
                            <p className="mb-4">
                              We have reviewed the information you provided and reinstated your Amazon.com selling privileges.
                            </p>
                            
                            <p className="mb-6">
                              Your account is now active and you can continue to sell on Amazon.
                            </p>
                            
                            <div className="mb-4 p-3 bg-slate-50 dark:bg-slate-800/50 border-l-4 border-[#FF9900] text-xs">
                              <strong>Note:</strong> It may take up to 24 hours for your listings to become active across all marketplaces.
                            </div>
                            
                            <p className="mb-1 text-slate-600 dark:text-slate-400">Thank you for selling with Amazon,</p>
                            <p className="font-bold text-slate-900 dark:text-white">Amazon.com Seller Performance Team</p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {currentSlide === 1 && (
                      <motion.div
                        key="slide1"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 flex flex-col"
                      >
                        {/* Professional Document Header */}
                        <div className="flex items-center justify-between mb-4 pb-3 border-b-[3px] border-slate-900 dark:border-white">
                          <div>
                            <h3 className="font-black text-slate-900 dark:text-white text-lg tracking-tight uppercase font-serif">PLAN OF ACTION</h3>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-0.5">Formal Appeal Brief</p>
                          </div>
                          <div className="px-3 py-1 border-[3px] border-green-600/80 text-green-600/80 font-black text-[10px] uppercase tracking-widest transform rotate-[-5deg] rounded-sm mix-blend-multiply dark:mix-blend-lighten">
                            ACCEPTED
                          </div>
                        </div>

                        {/* Document Body */}
                        <div className="flex-1 bg-[#FAFAFA] dark:bg-[#111] p-5 rounded-lg border border-slate-300 dark:border-slate-700 shadow-inner flex flex-col gap-4 font-serif relative overflow-hidden">
                          
                          {/* Subtle watermark */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                            <ShieldCheck className="w-48 h-48" />
                          </div>

                          <div className="relative z-10">
                            <h4 className="font-bold text-slate-900 dark:text-white uppercase text-xs tracking-wider border-b border-slate-300 dark:border-slate-700 pb-1.5 mb-2">I. Root Cause Analysis</h4>
                            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed text-justify">
                              Comprehensive breakdown of the exact policy violation trigger, acknowledging compliance failure with documented evidentiary support and timeline mapping.
                            </p>
                          </div>

                          <div className="relative z-10">
                            <h4 className="font-bold text-slate-900 dark:text-white uppercase text-xs tracking-wider border-b border-slate-300 dark:border-slate-700 pb-1.5 mb-2">II. Immediate Corrective Actions</h4>
                            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed text-justify">
                              Audited proof of actions taken to immediately rectify the violation, including inventory quarantine, supplier verification workflows, and catalog remediation.
                            </p>
                          </div>

                          <div className="relative z-10">
                            <h4 className="font-bold text-slate-900 dark:text-white uppercase text-xs tracking-wider border-b border-slate-300 dark:border-slate-700 pb-1.5 mb-2">III. Preventative Measures</h4>
                            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed text-justify">
                              Implementation of strict operational compliance checklists, long-term systemic safeguards, and staff re-training protocols to guarantee zero future infractions.
                            </p>
                          </div>

                        </div>
                      </motion.div>
                    )}

                    {currentSlide === 2 && (
                      <motion.div
                        key="slide2"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 flex flex-col bg-white dark:bg-[#1A1A1A] rounded-xl overflow-hidden shadow-[0_0_0_1px_rgba(0,0,0,0.05)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.05)]"
                      >
                        {/* Seller Central Top Navigation Bar */}
                        <div className="flex items-center justify-between bg-[#232F3E] text-white px-4 py-2.5">
                          <div className="flex items-center gap-3">
                            <div className="space-y-1">
                              <div className="w-3.5 h-0.5 bg-white"></div>
                              <div className="w-3.5 h-0.5 bg-white"></div>
                              <div className="w-3.5 h-0.5 bg-white"></div>
                            </div>
                            <span className="font-bold text-[13px] tracking-wide font-sans">amazon seller central</span>
                          </div>
                          <div className="text-xs text-slate-300 flex items-center gap-2">
                            <span className="font-medium">EN</span>
                            <div className="w-6 h-6 rounded-full bg-slate-600 flex items-center justify-center">
                              <span className="text-[10px] text-white">US</span>
                            </div>
                          </div>
                        </div>

                        {/* Breadcrumbs & Title */}
                        <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#151515]">
                          <div className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 mb-1 hover:underline cursor-pointer">Performance › Account Health</div>
                          <h3 className="font-bold text-slate-900 dark:text-white text-lg font-sans">Account Health</h3>
                        </div>

                        {/* Dashboard Body */}
                        <div className="p-4 flex-1 flex flex-col bg-slate-100 dark:bg-[#111]">
                          <div className="border border-slate-200 dark:border-slate-800 rounded bg-white dark:bg-[#1A1A1A] flex flex-col h-full shadow-sm p-5">
                            
                            <div className="text-center mb-6">
                              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest mb-3">Account Health Rating</h4>
                              <div className="text-6xl font-black text-[#008A00] tracking-tighter mb-2 font-sans">1,000</div>
                              <div className="inline-block px-3 py-1 bg-[#008A00]/10 border border-[#008A00]/20 text-[#008A00] rounded text-[11px] font-bold uppercase tracking-wider">
                                Healthy
                              </div>
                            </div>

                            {/* Realistic Color Bar Gauge */}
                            <div className="w-full h-2.5 flex rounded-full overflow-hidden mb-8 shadow-inner">
                              <div className="bg-[#DE0000] w-1/4 h-full"></div>
                              <div className="bg-[#FF9900] w-1/4 h-full border-l border-white dark:border-slate-900"></div>
                              <div className="bg-[#008A00] w-1/2 h-full border-l border-white dark:border-slate-900 relative">
                                {/* Indicator marker at 1000 */}
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-4 bg-black dark:bg-white rounded-[1px] shadow-sm"></div>
                              </div>
                            </div>

                            {/* Metrics List */}
                            <div className="space-y-3 mt-auto border-t border-slate-100 dark:border-slate-800 pt-4">
                              <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-600 dark:text-slate-400 font-medium">Policy Compliance</span>
                                <div className="flex items-center gap-1.5">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#008A00]" />
                                  <span className="font-bold text-slate-900 dark:text-white">0 issues</span>
                                </div>
                              </div>
                              <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-600 dark:text-slate-400 font-medium">Order Defect Rate</span>
                                <div className="flex items-center gap-1.5">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#008A00]" />
                                  <span className="font-bold text-slate-900 dark:text-white">0.00%</span>
                                </div>
                              </div>
                              <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-600 dark:text-slate-400 font-medium">Late Dispatch Rate</span>
                                <div className="flex items-center gap-1.5">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#008A00]" />
                                  <span className="font-bold text-slate-900 dark:text-white">0.00%</span>
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Slider Controls */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 z-10">
                  <div className="flex gap-1.5">
                    {[0,1,2].map(idx => (
                      <button 
                        key={idx} 
                        onClick={() => setCurrentSlide(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${currentSlide === idx ? 'w-6 bg-yellow-400' : 'w-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'}`} 
                      />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={prevSlide} className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button onClick={nextSlide} className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          2. THE PROBLEM (Bleeding Money)
      ═══════════════════════════════════════════════════════════════ */}
      <section className="pt-12 pb-6 md:pt-16 md:pb-8 relative bg-white dark:bg-[#0B0C10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-3xl p-8 md:p-16 relative overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
              <div>
                <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight text-slate-900 dark:text-white">
                  Every hour your account is down, competitors are stealing your customers.
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                  Automated bots don't care about your payroll, inventory, or business history. Submitting a blind appeal without knowing the exact trigger will only result in an automated rejection—or worse, a permanent lifetime ban.
                </p>
                <div className="flex items-center gap-4 text-sm font-bold text-yellow-700 dark:text-yellow-300 bg-yellow-100 dark:bg-yellow-500/10 px-5 py-3 rounded-xl border border-yellow-300 dark:border-yellow-500/30 inline-flex">
                  <TrendingDown className="w-5 h-5" />
                  Don't guess. Let the experts diagnose it.
                </div>
              </div>
              
              <div className="flex justify-center lg:justify-end mt-10 lg:mt-0 w-full">
                <div className="relative w-full max-w-[420px] aspect-square grid grid-cols-2 gap-4">
                  {/* Center Amazon Icon Overlap */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white dark:bg-slate-900 shadow-[0_0_40px_rgba(0,0,0,0.1)] dark:shadow-[0_0_40px_rgba(255,255,255,0.05)] border-[6px] border-yellow-50 dark:border-[#111827] flex items-center justify-center z-20">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg"
                      alt="Amazon"
                      className="w-10 h-10 object-contain mt-1"
                    />
                  </div>

                  {/* Top Left */}
                  <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-[2rem] p-6 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-default relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400"></div>
                    <div className="w-14 h-14 rounded-2xl bg-cyan-50 dark:bg-cyan-900/30 text-cyan-500 border border-cyan-100 dark:border-cyan-800 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-cyan-100 dark:group-hover:bg-cyan-900/50 transition-all">
                      <ShieldCheck className="w-7 h-7" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 leading-tight">Amazon Suspension<br/>Appeal</span>
                  </div>

                  {/* Top Right */}
                  <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-[2rem] p-6 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-default relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-pink-400"></div>
                    <div className="w-14 h-14 rounded-2xl bg-pink-50 dark:bg-pink-900/30 text-pink-500 border border-pink-100 dark:border-pink-800 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-pink-100 dark:group-hover:bg-pink-900/50 transition-all">
                      <AlertTriangle className="w-7 h-7" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 leading-tight">Listing Suppression<br/>Recovery</span>
                  </div>

                  {/* Bottom Left */}
                  <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-[2rem] p-6 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-default relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-yellow-400"></div>
                    <div className="w-14 h-14 rounded-2xl bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 border border-yellow-100 dark:border-yellow-800 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-yellow-100 dark:group-hover:bg-yellow-900/50 transition-all">
                      <RefreshCcw className="w-7 h-7" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 leading-tight">Amazon ASIN<br/>Reinstatement</span>
                  </div>

                  {/* Bottom Right */}
                  <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-[2rem] p-6 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-default relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-green-400"></div>
                    <div className="w-14 h-14 rounded-2xl bg-green-50 dark:bg-green-900/30 text-green-500 border border-green-100 dark:border-green-800 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-green-100 dark:group-hover:bg-green-900/50 transition-all">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 leading-tight">Account Reactivation<br/>Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* ═══════════════════════════════════════════════════════════════
          3. REJECTED VS REINSTATED POA
      ═══════════════════════════════════════════════════════════════ */}
      <section className="pt-6 pb-12 md:pt-8 md:pb-16 relative bg-white dark:bg-[#0B0C10]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-16 items-center">
            
            {/* Rejected Side */}
            <div 
              className="flex flex-col items-center"
            >
              <h3 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-slate-300 mb-6 tracking-wider uppercase font-sans">
                Rejected
              </h3>
              <div className="w-full relative border-[1.5px] border-slate-300 dark:border-slate-700 bg-transparent rounded-[1.5rem] p-8 shadow-sm">
                <div className="absolute top-4 right-4 text-slate-400 dark:text-slate-500">
                  <X className="w-8 h-8" strokeWidth={2.5} />
                </div>
                <div className="space-y-6 text-sm md:text-base font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  <p>I don't know why I was suspended...</p>
                  <p>Please reactivate my account...</p>
                  <p>I am a good seller...</p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:flex flex-col items-center justify-center h-full py-16">
              <div className="w-[1.5px] h-[250px] bg-yellow-400/50 dark:bg-yellow-500/50"></div>
            </div>

            {/* Reinstated Side */}
            <div 
              className="flex flex-col items-center"
            >
              <h3 className="text-3xl md:text-4xl font-black text-yellow-500 dark:text-yellow-400 mb-6 tracking-wider uppercase font-sans">
                Reinstated
              </h3>
              <div className="w-full relative border-[1.5px] border-yellow-400 dark:border-yellow-500 bg-transparent rounded-[1.5rem] p-8">
                <div className="absolute top-4 right-4 text-yellow-500 dark:text-yellow-400">
                  <Check className="w-8 h-8" strokeWidth={3} />
                </div>
                <div className="space-y-6 text-sm md:text-base font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wide">
                  <p>1. Root Cause: Late shipment rate 6%...</p>
                  <p>2. Corrective: Switched courier partner...</p>
                  <p>3. Prevention: Weekly health dashboard...</p>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Text */}
          <div 
            className="mt-16 text-center"
          >
            <h4 className="text-lg md:text-xl font-bold text-yellow-500 dark:text-yellow-400 uppercase tracking-wider font-sans">
              Your POA is your only chance. Make it count.
            </h4>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          4. THE WORKFLOW
      ═══════════════════════════════════════════════════════════════ */}
      <section id="process" className="py-16 md:py-24 bg-white dark:bg-[#0B0C10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-20">
            <div className="inline-flex items-center gap-2 bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20 text-yellow-700 dark:text-yellow-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5" /> How It Works
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              Your <span className="text-yellow-500">Reinstatement</span> Roadmap
            </h2>
          </div>

          <div className="relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-[2px] bg-slate-100 dark:bg-slate-800" />

            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-10 md:gap-4">
              {[
                { step: "01", title: "DAY 1", desc: "READ NOTICE\n& GATHER DOCS" },
                { step: "02", title: "DAY 2-3", desc: "WRITE YOUR\nPLAN OF ACTION" },
                { step: "03", title: "DAY 4", desc: "SUBMIT APPEAL\n+ EVIDENCE" },
                { step: "04", title: "DAY 5-10", desc: "WAIT FOR\nAMAZON RESPONSE" },
                { step: "05", title: "REINSTATED", desc: "MONITOR ACCOUNT\n30-DAY PROBATION" },
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center relative group">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-20 h-20 rounded-full bg-white dark:bg-[#0B0C10] border-2 border-slate-100 dark:border-slate-800 flex items-center justify-center mb-6 relative z-10 group-hover:border-yellow-400 dark:group-hover:border-yellow-500 transition-colors shadow-sm"
                  >
                    <span className="text-2xl font-black text-slate-300 dark:text-slate-700 group-hover:text-yellow-500 transition-colors">{step.step}</span>
                  </motion.div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">{step.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs whitespace-pre-line">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Footer Text */}
          <div className="text-center mt-20">
            <h4 className="text-xl md:text-2xl font-black text-yellow-500 dark:text-yellow-400 uppercase tracking-widest">
              Patience + Precision = Reinstatement.
            </h4>
          </div>

        </div>
      </section>




      {/* ═══════════════════════════════════════════════════════════════
          5. WEEKLY ROUTINE
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-16 relative bg-white dark:bg-[#0B0C10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-20 text-center">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-wide leading-tight">
              Your Weekly<br/>
              <span className="relative inline-block mt-2">
                Suspension-Proof Routine
                <span className="absolute -bottom-3 left-0 w-full h-[3px] bg-yellow-400 dark:bg-yellow-500"></span>
              </span>
            </h2>
          </div>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 relative z-10">
            {[
              { title: "ODR", value: "< 1%", label: "ORDER DEFECT RATE", icon: Shield },
              { title: "LSR", value: "< 4%", label: "LATE SHIPMENT RATE", icon: Clock },
              { title: "CR", value: "< 2.5%", label: "CANCELLATION RATE", icon: XCircle },
              { title: "RESPONSE", value: "< 24 HRS", label: "CUSTOMER MESSAGES", icon: MessageSquare },
              { title: "AUDIT", value: "MONTHLY", label: "LISTING COMPLIANCE", icon: ClipboardList },
            ].map((card, i) => (
              <div
                key={i}
                className="relative flex flex-col items-center text-center p-6 rounded-2xl border-[1.5px] border-yellow-400/50 bg-white dark:bg-[#111827] hover:border-yellow-400 transition-all duration-300"
              >
                <card.icon className="w-8 h-8 text-yellow-500 dark:text-yellow-400 mb-4" />
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 tracking-wider">
                  {card.title}
                </h3>
                <div className="text-2xl md:text-3xl font-black text-yellow-500 dark:text-yellow-400 mb-4 tracking-tighter">
                  {card.value}
                </div>
                <p className="text-[10px] md:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-relaxed mt-auto">
                  {card.label}
                </p>
              </div>
            ))}
          </div>

          {/* Footer Text */}
          <div 
            className="mt-20 text-center"
          >
            <h4 className="text-lg md:text-xl font-black text-yellow-500 dark:text-yellow-400 uppercase tracking-widest">
              Monitor Weekly. Stay Compliant. Sell Without Fear.
            </h4>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          5.5 TYPES OF SERVICES
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-24 relative bg-yellow-400 dark:bg-yellow-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-wide">
              Types of Amazon Account<br/>
              Reinstatement Services We Offer
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Customer Service Performance Suspensions",
                icon: HeartHandshake,
                items: [
                  "Order Defect Rate (ODR)",
                  "Invoice Defect Rate (IDR)",
                  "High Return Rate Suspension",
                  "Negative Feedback Suspension",
                  "A-to-Z Guarantee Claims",
                  "Chargeback Claims",
                  "Not Fulfilled Orders After Confirming Shipment"
                ]
              },
              {
                title: "Policy Compliance & Violation Suspensions",
                icon: AlertTriangle,
                items: [
                  "Review Manipulation Suspension",
                  "Sales Rank Manipulation",
                  "Failure to Provide Invoices",
                  "Account Verification Failure",
                  "Invoice Manipulation",
                  "Tax Identity Issues",
                  "Vendor Seller Central Suspension"
                ]
              },
              {
                title: "Shipping & Fulfillment Suspensions",
                icon: Package,
                items: [
                  "Late Shipment Rate (LSR)",
                  "Valid Tracking Rate (VTR)",
                  "Pre-Fulfillment Cancel Rate (CR)",
                  "On-Time Delivery Rate (OTDR)",
                  "Fluctuating Shipping Charges"
                ]
              },
              {
                title: "Section 3 Suspensions",
                icon: AlertCircle,
                items: [
                  "Intellectual Property Complaints",
                  "Inauthentic Item Suspension",
                  "Misbranded Items",
                  "Linked Accounts Issue",
                  "Multiple Seller Accounts Issue",
                  "Document Verification Issue (Including Valid Credit Card Issue)",
                  "Fraudulent / Illegal Activity Suspension"
                ]
              }
            ].map((card, i) => (
              <div
                key={i}
                className="flex flex-col bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-xl"
              >
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-500/10 text-yellow-500 rounded-xl flex items-center justify-center mb-6 shrink-0">
                  <card.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug mb-6">
                  {card.title}
                </h3>
                <ul className="space-y-3 mt-auto flex-1">
                  {card.items.map((item, j) => (
                    <li key={j} className="flex items-start text-sm text-slate-600 dark:text-slate-400 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-yellow-500 shrink-0 mr-3 mt-0.5" />
                      <span className="leading-tight">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div 
            className="mt-16 text-center"
          >
            <Link
              href="#contact"
              className="inline-flex items-center px-10 py-4 rounded-full bg-slate-900 text-white font-bold hover:bg-black transition-colors shadow-lg uppercase text-sm tracking-wider"
            >
              REINSTATE AMAZON ACCOUNT NOW
            </Link>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          6. FAQs
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-24 relative bg-white dark:bg-[#0B0C10]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-wide">
              Amazon Seller Account<br/>
              <span className="text-yellow-500">Reinstatement FAQs</span>
            </h2>
          </div>

          <div className="border-t-[1.5px] border-slate-200 dark:border-slate-800">
            {[
              {
                q: "Can you take over my reinstatement case if my previous agency or tool failed to get my account reinstated?",
                a: "Yes. Many of our clients came to us after having a poor experience with other agencies or automated tools. We begin with a comprehensive review of all previous appeals, Amazon communications, and the actions taken so far. Our Amazon account reinstatement experts identify missed details, root causes, and documentation gaps, then develop a fresh, custom appeal strategy specifically addressing what went wrong in prior attempts."
              },
              {
                q: "Do you assist with reinstatement when there are multiple suspensions across linked accounts?",
                a: "Absolutely. Linked account suspensions are complex, but we specialize in handling them under our Amazon seller account reinstatement services. We assess all connected accounts, determine the root triggers, and prepare a coordinated reinstatement plan to address every issue Amazon has flagged."
              },
              {
                q: "How do you handle cases where Amazon keeps sending the same generic denial response?",
                a: "We analyze the rejection pattern, adjust the appeal strategy, and escalate the case through the proper channels within Amazon. By tailoring the language and providing a more detailed, evidence-based Plan of Action, we directly address the root issues that Amazon may not have explicitly stated. This approach helps us break the “copy‑paste” denial cycle and push the case toward meaningful review."
              },
              {
                q: "How often will I receive updates on my Amazon seller account reinstatement case progress?",
                a: "You’ll receive regular updates from your dedicated project manager, typically after every major action (such as appeal submission, Amazon response, or escalation step) or at agreed intervals. Your dedicated project manager is available during business hours for urgent questions."
              },
              {
                q: "Can you help me obtain the missing documentation that Amazon requires for reinstatement?",
                a: "Yes, we frequently assist sellers in identifying and gathering the specific documents Amazon requests, such as invoices, supplier verification, certificates of authenticity, or updated business licenses. Our team also reviews the documentation to ensure it meets Amazon’s requirements before submission."
              },
              {
                q: "Are there cases where Amazon accounts cannot be reinstated, and how do you identify them?",
                a: "Yes, accounts suspended for severe violations, such as knowingly selling counterfeit goods, repeated Section 3 violations, or engaging in criminal activity, are rarely reinstated. During our initial assessment, we provide an honest evaluation of the viability of your case. If we determine your case has less than 50% success probability, we'll explain why and suggest alternative strategies rather than making false promises."
              },
              {
                q: "Do you guarantee Amazon account reinstatement?",
                a: "No ethical Amazon account reinstatement agency can provide a guarantee, as the final decision rests solely with Amazon and depends on the cause, history, and evidence of the suspension. However, with our expertise and proven strategies, we enhance the likelihood of reinstatement. If we believe a case cannot be reinstated, we communicate this openly and provide honest guidance about your options."
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

    </div>
  );
}
