/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/public/Footer";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Code, Database, Layout, Zap, Search,
  ShieldCheck, ChevronDown, Sparkles, Globe
} from "lucide-react";
import Image from "next/image";


/* ─── 3D Layered Browser Mockup ─── */
function BrowserMockup() {
  return (
    <div className="relative w-full h-full flex items-center justify-center perspective-[1200px] mt-10 lg:mt-0">
      <motion.div
        initial={{ rotateX: 10, rotateY: -12 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-full max-w-[480px]"
      >
        {/* Shadow layer */}
        <div
          className="absolute inset-0 m-auto w-[85%] h-[90%] rounded-2xl bg-yellow-400/20 blur-2xl"
          style={{ transform: "translateZ(-60px) translateY(30px)" }}
        />

        {/* Back card */}
        <div
          className="absolute top-6 left-0 w-full rounded-2xl bg-slate-900 border border-slate-700 p-4 flex flex-col gap-3"
          style={{ transform: "translateZ(-50px)" }}
        >
          {/* Header mock */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <div className="ml-2 w-1/3 h-4 rounded bg-slate-800" />
          </div>
          {/* Body mock */}
          <div className="w-full h-24 rounded bg-slate-800 flex items-center justify-center">
            <Code className="w-8 h-8 text-slate-600" />
          </div>
          <div className="w-2/3 h-4 rounded bg-slate-800" />
          <div className="w-1/2 h-4 rounded bg-slate-800" />
        </div>

        {/* Front card (Main UI) */}
        <div className="relative w-full rounded-2xl bg-white dark:bg-[#1e202e] border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden z-10 flex flex-col">
          {/* Browser Top */}
          <div className="bg-slate-100 dark:bg-[#161822] border-b border-slate-200 dark:border-slate-700 p-3 flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 bg-white dark:bg-[#2a2d3e] rounded-md h-6 flex items-center px-3 border border-slate-200 dark:border-slate-600">
              <span className="text-[10px] text-slate-400 font-mono flex items-center gap-2">
                <Globe className="w-3 h-3" /> alphadigify.com
              </span>
            </div>
          </div>

          {/* Page Content */}
          <div className="p-5 flex-1 flex flex-col gap-4">
            {/* Hero */}
            <div className="space-y-2 pt-2">
              <div className="w-4/5 h-6 bg-slate-800 dark:bg-slate-200 rounded" />
              <div className="w-3/5 h-6 bg-slate-800 dark:bg-slate-200 rounded" />
              <div className="w-2/3 h-3.5 bg-slate-300 dark:bg-slate-600 rounded mt-2" />
              <div className="w-24 h-8 bg-yellow-400 rounded-lg mt-3" />
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              {["#34D399", "#60A5FA", "#FACC15"].map((c, i) => (
                <div key={i} className="rounded-xl p-3 border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-[#2a2d3e] text-center">
                  <div className="h-5 rounded mb-1.5 mx-auto w-12" style={{ background: c + "40" }} />
                  <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full" />
                </div>
              ))}
            </div>

            {/* Cards */}
            <div className="grid grid-cols-2 gap-2">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="h-20 bg-slate-50 dark:bg-[#2a2d3e] rounded-xl border border-slate-100 dark:border-slate-700 p-3">
                  <div className="w-6 h-6 rounded-lg bg-yellow-400 mb-2" />
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full" />
                  <div className="w-3/4 h-2 bg-slate-200 dark:bg-slate-700 rounded-full mt-1.5" />
                </div>
              ))}
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  );
}


/* ─── Static Data ─── */

const CAPABILITIES = [
  { icon: Layout, title: "Responsive UI/UX", desc: "Pixel-perfect interfaces that perform flawlessly from ultra-wide monitors to the smallest mobile screens." },
  { icon: Code, title: "Next.js & React", desc: "Blazing-fast, SEO-friendly applications built on the modern stack — React, Next.js, TypeScript, and Tailwind." },
  { icon: Database, title: "Backend & APIs", desc: "Scalable databases and secure REST/GraphQL APIs using Node.js, Prisma, or serverless cloud infrastructure." },
  { icon: Zap, title: "Performance First", desc: "Advanced caching, edge networks, and image optimisation. Every millisecond counts for conversions." },
  { icon: Search, title: "Technical SEO Built-in", desc: "Semantic HTML, dynamic sitemaps, and structured data so your site ranks on Google from day one." },
  { icon: ShieldCheck, title: "Enterprise Security", desc: "End-to-end encryption, DDoS protection, and secure OAuth flows to keep your business and users safe." },
];

const PROCESS_STEPS = [
  { step: "01", title: "Discovery & Strategy", desc: "We audit your goals, competitors, and technical requirements to define a bulletproof project blueprint." },
  { step: "02", title: "UI/UX Design", desc: "High-fidelity Figma prototypes reviewed and approved before a single line of code is written." },
  { step: "03", title: "Engineering & Build", desc: "Full-stack development with daily progress updates, staging environments, and rigorous QA testing." },
  { step: "04", title: "Launch & Growth", desc: "Zero-downtime deployment, performance monitoring, and ongoing retainer support to keep you scaling." },
];

const FAQS = [
  { q: "What's your typical project timeline?", a: "Most marketing websites take 3–5 weeks from kickoff to launch. Complex web applications or e-commerce platforms typically run 6–12 weeks. We always agree on a fixed timeline upfront with milestone deliverables so there are no surprises." },
  { q: "Do you offer ongoing maintenance?", a: "Yes. Every project includes a 30-day post-launch support window. After that, we offer flexible monthly retainer plans covering hosting, security updates, performance monitoring, and new feature development." },
  { q: "What technology stack do you use?", a: "Our primary stack is Next.js 14 (App Router), TypeScript, Tailwind CSS, and Prisma on the frontend/backend, deployed on Vercel or AWS. For e-commerce we use Shopify Hydrogen or WooCommerce. We always choose the right tool for the job, not the most fashionable one." },
  { q: "Do you build e-commerce sites?", a: "Absolutely. We specialise in high-converting e-commerce builds — Shopify custom themes, headless Shopify with Next.js, WooCommerce, and fully custom storefronts. Every build is optimised for speed and conversion rate from the ground up." },
  { q: "Will my site be mobile-friendly?", a: "Every site we build is mobile-first by default. We design and test across dozens of device sizes and browsers before any project goes live. Mobile performance is non-negotiable." },
];

/* ─── Main Component ─── */
export default function WebDevServicePageRedesigned() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-white dark:bg-[#0B0C10] text-slate-900 dark:text-white font-sans overflow-x-hidden selection:bg-yellow-500/30">
      <Navbar />

      {/* ═══════════════════════════════════════
          1. HERO
      ═══════════════════════════════════════ */}
      <section className="relative pt-32 pb-0 md:pb-20 lg:pt-44 lg:pb-32 overflow-hidden lg:overflow-visible min-h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0 bg-black [clip-path:ellipse(200%_100%_at_50%_0%)] md:[clip-path:ellipse(120%_95%_at_50%_0%)]">
          <div className="absolute inset-0 z-0 opacity-40">
             <Image src="/Web.jfif" alt="Web Development" fill className="object-cover object-center" priority />
          </div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left Copy */}
            <div className="w-full lg:w-1/2 flex flex-col items-start text-left text-white">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4" /> Next-Gen Web Engineering
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.1] mb-6 tracking-tight">
                Websites That <span className="text-yellow-400">Scale</span> & <span className="text-yellow-400">Convert</span>.
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-xl leading-relaxed">
                We engineer lightning-fast, high-converting websites and web applications using the modern stack. Stop settling for slow templates.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold h-14 px-8 rounded-full text-lg w-full sm:w-auto group">
                  Start Your Project <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
            {/* Right Visual */}
            <div className="w-full lg:w-1/2 h-[400px] lg:h-[600px] mt-12 lg:mt-0 block relative z-20 lg:translate-y-20">
              <BrowserMockup />
            </div>
          </div>
        </div>
      </section>



      {/* ═══════════════════════════════════════
          3. CAPABILITIES GRID
      ═══════════════════════════════════════ */}
      <section className="py-24 bg-white dark:bg-[#0B0C10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
              Engineering <span className="text-yellow-500">Excellence</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              We build custom solutions from the ground up, ensuring your platform is secure, scalable, and impossible to ignore.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CAPABILITIES.map((cap, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:border-yellow-400/50 transition-colors">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-yellow-400/10 text-yellow-500">
                  <cap.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{cap.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          4. PROCESS
      ═══════════════════════════════════════ */}
      <section className="py-24 bg-slate-50 dark:bg-white/[0.02] border-y border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">How We Build</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step, i) => (
              <div key={i} className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 hover:border-yellow-400/50 transition-all duration-300 relative overflow-hidden">
                <div className="absolute -right-6 -top-6 text-[120px] font-black text-slate-100 dark:text-white/[0.03] leading-none select-none group-hover:scale-110 transition-transform duration-500">
                  {step.step}
                </div>
                <div className="relative z-10">
                  <div className="text-yellow-500 font-bold mb-4 tracking-widest uppercase text-sm">Step {step.step}</div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{step.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          5. FAQ
      ═══════════════════════════════════════ */}
      <section className="py-24 bg-white dark:bg-[#0B0C10]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">Questions?</h2>
          </div>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="text-lg font-bold text-slate-900 dark:text-white pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 shrink-0 ${openFaq === i ? 'rotate-180 text-yellow-500' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-0 text-slate-600 dark:text-slate-400 leading-relaxed">
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