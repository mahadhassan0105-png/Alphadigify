/* eslint-disable react/no-unescaped-entities */
"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/public/Footer";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Code, Database, Layout, Zap, Search,
  ShieldCheck, ChevronDown, Sparkles
} from "lucide-react";
import Image from "next/image";

/* ─── Animated Counter ─── */
function Counter({ from, to, prefix = "", suffix = "" }: { from: number; to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  useEffect(() => {
    if (!hasAnimated) {
      setHasAnimated(true);
      const c = animate(from, to, {
        duration: 2.5, ease: "easeOut",
        onUpdate(v) { if (ref.current) ref.current.textContent = `${prefix}${Math.round(v)}${suffix}`; },
      });
      return () => c.stop();
    }
  }, [from, to, prefix, suffix, hasAnimated]);
  return <span ref={ref}>{prefix}{from}{suffix}</span>;
}


/* ─── Static Data ─── */
const STATS = [
  { from: 0, to: 150, suffix: "+", label: "Sites Launched" },
  { from: 0, to: 99, suffix: "%", label: "Client Satisfaction" },
  { from: 0, to: 40, prefix: "<", suffix: "ms", label: "Avg Load Time" },
  { from: 0, to: 100, suffix: "/100", label: "PageSpeed Score" },
];

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
      <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-32 overflow-hidden min-h-[90vh] flex items-center bg-[#0B0C10]">
        <div className="absolute inset-0 z-0 opacity-40">
           <Image src="/Web.jfif" alt="Web Development" fill className="object-cover object-center" priority />
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
            <div className="w-full lg:w-1/2 mt-12 lg:mt-0 relative hidden md:block">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-full aspect-square max-w-[600px] mx-auto"
              >
                <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-3xl" />
                <div className="relative w-full h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 mt-10">
                  <Image 
                    src="/web-dev-hero.jpg" 
                    alt="Web Development" 
                    fill 
                    className="object-cover"
                    priority
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          2. STATS BAR
      ═══════════════════════════════════════ */}
      <section className="py-10 border-y border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center text-center">
                <h4 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-2">
                  <Counter from={stat.from} to={stat.to} prefix={stat.prefix} suffix={stat.suffix} />
                </h4>
                <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
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