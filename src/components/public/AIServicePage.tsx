"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  Bot, Network, Lock, Database, 
  ArrowRight, Activity, ShieldCheck, TerminalSquare, ChevronDown, RefreshCcw
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AIHeroSlider from "./AIHeroSlider";

/* ─── Tech Stack Data ─── */
const TECHNOLOGIES = [
  "OpenAI", "HuggingFace", "PyTorch", "TensorFlow", "LangChain", 
  "n8n", "Zapier", "FastAPI", "Next.js", "PostgreSQL", 
  "Supabase", "pgvector", "Docker", "Groq"
];

/* ─── Animated Decoding Text ─── */
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

function DecodeText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [display, setDisplay] = useState(text.replace(/./g, "0"));
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
    return () => clearInterval(interval);
  }, [text, started]);

  return <span>{display}</span>;
}

/* ─── Infinite Marquee ─── */
function TechMarquee() {
  return (
    <div className="relative flex overflow-hidden py-12 border-y border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.01]">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-50 dark:from-[#030712] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-50 dark:from-[#030712] to-transparent z-10" />
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        className="flex whitespace-nowrap gap-12 sm:gap-24 items-center pr-12 sm:pr-24"
      >
        {[...TECHNOLOGIES, ...TECHNOLOGIES].map((tech, i) => (
          <span key={i} className="text-xl sm:text-3xl font-black text-slate-300 dark:text-white/20 uppercase tracking-widest flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-yellow-500/50" />
            {tech}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Main Component ─── */
const AI_FAQS = [
  {
    q: "What types of AI automation can you build for my business?",
    a: "We build a wide range of AI-powered solutions tailored to your needs — from custom LLM-powered chatbots and autonomous agents using LangChain & Groq, to end-to-end workflow automation via n8n and Zapier. We also build RAG (Retrieval-Augmented Generation) pipelines, computer vision systems using PyTorch and YOLO, and predictive ML models using Scikit-Learn and TensorFlow."
  },
  {
    q: "Will my proprietary data be used to train public AI models?",
    a: "Absolutely not. All AI solutions we deploy are architected with zero-trust principles. Your business data is fully siloed within private cloud deployments (VPCs), and we offer self-hosted LLM options so your data never leaves your infrastructure. We also implement role-based access control and can align with GDPR and SOC2 requirements."
  },
  {
    q: "How long does it take to deploy an AI automation solution?",
    a: "It depends on scope. A focused chatbot or single workflow automation can be live in 1–2 weeks. More complex systems like multi-agent RAG pipelines, custom ML model fine-tuning, or full process automation integrations typically take 4–8 weeks. We always agree on a clear milestone-based timeline upfront."
  },
  {
    q: "Do I need technical staff to maintain the AI systems you build?",
    a: "No. We build with maintainability in mind — clean documentation, simple admin dashboards (using Streamlit or custom Next.js UIs), and ongoing retainer support options. We can also provide training sessions so your team can manage day-to-day operations without needing a dedicated ML engineer."
  },
  {
    q: "Can you integrate AI into my existing tech stack (CRM, ERP, eCommerce)?",
    a: "Yes. We specialize in integrating AI layers into existing systems via REST APIs, webhooks, and n8n/Zapier connectors. Whether it's Shopify, HubSpot, Salesforce, or a custom internal tool, we can connect an intelligent automation layer without requiring you to rebuild your existing infrastructure."
  },
  {
    q: "What is the difference between a chatbot and an autonomous AI agent?",
    a: "A chatbot answers questions. An autonomous AI agent takes actions. Agents built with LangChain or LangGraph can browse the web, query your database, send emails, create CRM entries, and execute multi-step workflows — all without human intervention. We build both, and often combine them to create truly hands-free intelligent pipelines."
  }
];

export default function AIServicePageRedesigned() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div ref={containerRef} className="bg-white dark:bg-[#030712] min-h-screen text-slate-900 dark:text-slate-200 selection:bg-yellow-500/30 font-sans overflow-x-hidden">
      
      {/* ════════════════════════════════════════════════════════════
          1. HERO: "THE NEURAL NEXUS"
      ════════════════════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 min-h-screen flex items-center overflow-hidden bg-white dark:bg-[#030712]">
        {/* Background Grid */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-yellow-500/5 dark:bg-slate-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Copy */}
            <motion.div style={{ y: yParallax }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 backdrop-blur-sm mb-8 text-xs font-bold text-slate-500 dark:text-slate-400 tracking-widest uppercase">
                <TerminalSquare className="w-4 h-4 text-yellow-500" /> System Initialized
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-slate-900 dark:text-white leading-[1.05] tracking-tight mb-6">
                Intelligence <br />
                <span className="text-yellow-500">
                  <DecodeText text="Automated." delay={500} />
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 mb-10 max-w-lg leading-relaxed">
                We engineer autonomous agents, workflow automations, and custom LLM pipelines that scale operations and eliminate bottlenecks.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button size="lg" className="h-14 px-8 bg-yellow-500 hover:bg-yellow-400 text-black font-black uppercase tracking-wider rounded-full shadow-[0_0_30px_rgba(250,204,21,0.2)] transition-all">
                    Deploy AI System <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="h-14 px-8 bg-transparent hover:bg-slate-100 dark:hover:bg-white/5 border-slate-300 dark:border-white/20 text-slate-800 dark:text-white font-bold rounded-full transition-all">
                  View Tech Stack
                </Button>
              </div>
            </motion.div>

            {/* Right: Abstract Neural Visualizer -> n8n Workflow Slider */}
            <div className="relative h-[400px] sm:h-[450px] w-full mt-10 md:mt-0 z-20">
              <AIHeroSlider />
            </div>

          </div>
        </div>
      </section>

      <TechMarquee />

      {/* ════════════════════════════════════════════════════════════
          2. MANUAL VS AUTONOMOUS PIPELINE
      ════════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-16 relative z-10 bg-white dark:bg-[#030712] border-b border-slate-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white tracking-tight">
              The Cost of <span className="text-yellow-500">Manual Operations</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg">
              Watch how intelligent automation eliminates bottlenecks, reduces overhead, and routes data at the speed of thought.
            </p>
          </div>

          <div className="relative flex flex-col md:flex-row gap-12 lg:gap-16">
            
            {/* ─── LEFT SIDE: MANUAL / SLOW ─── */}
            <div className="flex-1 relative flex flex-col h-full">
              <div className="inline-flex items-center gap-2 text-yellow-500 font-bold uppercase tracking-widest text-xs mb-8">
                <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" /> Legacy Manual Workflow
              </div>
              
              {/* Cluttered UI Mock */}
              <div className="space-y-4 flex-1">
                {[
                  { id: "INV-2901", time: "Pending 2 days", status: "Review Required" },
                  { id: "INV-2902", time: "Pending 3 days", status: "Data Missing" },
                  { id: "INV-2903", time: "Pending 5 days", status: "Awaiting Approval" }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    className="bg-white dark:bg-transparent border border-slate-200 dark:border-white/10 p-4 rounded-2xl flex items-center gap-4"
                    initial={{ opacity: 0.8, x: -10 }}
                    animate={{ opacity: [0.8, 1, 0.8], x: 0 }}
                    transition={{ duration: 4, delay: i * 0.5, repeat: Infinity }}
                  >
                    <div className="w-10 h-10 rounded-full bg-yellow-50 dark:bg-yellow-500/10 flex items-center justify-center shrink-0">
                      <Activity className="w-4 h-4 text-yellow-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-black dark:text-white text-sm">{item.id}</span>
                        <span className="text-[10px] font-bold text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-500/10 px-2 py-0.5 rounded-full">{item.status}</span>
                      </div>
                      <div className="h-1.5 w-full bg-yellow-100 dark:bg-yellow-900/30 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-yellow-400 rounded-full" 
                          initial={{ width: "30%" }}
                          animate={{ width: ["30%", "35%", "30%"] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        />
                      </div>
                      <p className="text-[10px] text-yellow-600 dark:text-yellow-500 mt-1.5 font-medium">{item.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-yellow-200 dark:border-yellow-500/20 flex justify-between items-end">
                <div>
                  <p className="text-xs text-yellow-600 dark:text-yellow-500 font-bold uppercase tracking-wider mb-1">Avg. Processing Time</p>
                  <p className="text-3xl font-black text-black dark:text-white">4.2 <span className="text-base font-bold text-yellow-600 dark:text-yellow-500">Days</span></p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-yellow-600 dark:text-yellow-500 font-bold uppercase tracking-wider mb-1">Error Rate</p>
                  <p className="text-3xl font-black text-yellow-500">12%</p>
                </div>
              </div>
            </div>

            {/* Center Animated Data Packet */}
            <motion.div 
              className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white dark:bg-[#030712] rounded-full z-20 items-center justify-center"
            >
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <RefreshCcw className="w-5 h-5 text-yellow-500" />
              </motion.div>
            </motion.div>

            {/* ─── RIGHT SIDE: AI AUTOMATED ─── */}
            <div className="flex-1 relative flex flex-col h-full">
              <div className="inline-flex items-center gap-2 text-yellow-500 font-bold uppercase tracking-widest text-xs mb-8">
                <span className="w-2 h-2 rounded-full bg-yellow-500" /> AI Autonomous Pipeline
              </div>

              {/* Sleek Terminal/Log Mock */}
              <div className="flex-1 bg-slate-900 dark:bg-black rounded-2xl border border-yellow-500/20 p-5 font-mono text-xs overflow-hidden relative">
                {/* Glass Header */}
                <div className="absolute top-0 inset-x-0 h-8 bg-white/5 backdrop-blur-md border-b border-white/10 flex items-center px-4 gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="ml-2 text-white/50">n8n_agent_executor.sh</span>
                </div>

                <div className="mt-6 space-y-3">
                  {[
                    { log: "Ingesting payload [INV-2901...INV-2950]", time: "0.01s", color: "text-blue-400" },
                    { log: "LLM Classification -> [DocumentType: Invoice]", time: "0.12s", color: "text-purple-400" },
                    { log: "Extracting structured JSON via Groq Llama-3", time: "0.45s", color: "text-yellow-400" },
                    { log: "Validation passed. Pushing to ERP schema.", time: "0.05s", color: "text-green-400" },
                    { log: "Batch 450 items processed successfully.", time: "0.02s", color: "text-emerald-400 font-bold" },
                  ].map((line, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.8, repeat: Infinity, repeatDelay: 5 }}
                      className="flex gap-4"
                    >
                      <span className="text-white/50 shrink-0">[{line.time}]</span>
                      <span className={line.color}>&gt; {line.log}</span>
                    </motion.div>
                  ))}
                  
                  <motion.div 
                    className="w-2 h-4 bg-yellow-500 mt-2 inline-block"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-yellow-500/20 flex justify-between items-end">
                <div>
                  <p className="text-xs text-yellow-600 dark:text-yellow-500 font-bold uppercase tracking-wider mb-1">Avg. Processing Time</p>
                  <p className="text-3xl font-black text-black dark:text-white">0.6 <span className="text-base font-bold text-yellow-600 dark:text-yellow-500">Seconds</span></p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-yellow-600 dark:text-yellow-500 font-bold uppercase tracking-wider mb-1">Error Rate</p>
                  <p className="text-3xl font-black text-yellow-500">&lt;0.1%</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          3. CAPABILITIES BENTO BOX
      ════════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-16 relative z-10 bg-white dark:bg-[#030712] overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <p className="text-yellow-500 font-bold uppercase tracking-widest text-sm mb-3">What We Build</p>
            <h2 className="text-3xl md:text-5xl font-black mb-4 text-slate-900 dark:text-white tracking-tight">
              System <span className="text-yellow-500">Capabilities</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-lg">
              End-to-end AI infrastructure engineered to replace entire departments of repetitive work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">

            {/* ── HERO CARD: Autonomous LLM Agents ── */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="md:col-span-7 group relative rounded-3xl overflow-hidden bg-black border border-white/10 p-8 lg:p-10 flex flex-col justify-between min-h-[340px]"
            >
              {/* Animated bg glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(250,204,21,0.15)_0%,transparent_60%)] pointer-events-none" />
              <motion.div
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(250,204,21,0.08)_0%,transparent_60%)] pointer-events-none"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              {/* Grid pattern */}
              <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{ backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center mb-6 group-hover:bg-yellow-500/30 transition-colors">
                  <Bot className="w-7 h-7 text-yellow-400" />
                </div>
                <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-3 py-1 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                  <span className="text-yellow-400 text-[11px] font-bold uppercase tracking-widest">Core Engine</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-black text-white mb-3">Autonomous LLM Agents</h3>
                <p className="text-white/60 text-base max-w-md leading-relaxed">
                  Custom conversational AI powered by LangChain and Groq API. Agents that don&apos;t just chat — they execute tools, query vector databases, and resolve tickets end-to-end.
                </p>
              </div>

              <div className="relative z-10 mt-8 flex gap-6 border-t border-white/10 pt-6">
                <div>
                  <p className="text-2xl font-black text-yellow-400">10×</p>
                  <p className="text-white/50 text-xs font-medium mt-0.5">Faster Resolution</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-white">24/7</p>
                  <p className="text-white/50 text-xs font-medium mt-0.5">Always On</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-yellow-400">0</p>
                  <p className="text-white/50 text-xs font-medium mt-0.5">Human Handoffs</p>
                </div>
              </div>
            </motion.div>

            {/* ── TALL CARD: Workflow Automation ── */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="md:col-span-5 group relative rounded-3xl overflow-hidden bg-yellow-500 p-8 flex flex-col justify-between min-h-[340px]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,0,0,0.15)_0%,transparent_60%)] pointer-events-none" />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-black/20 flex items-center justify-center mb-6">
                  <Network className="w-7 h-7 text-black" />
                </div>
                <h3 className="text-2xl font-black text-black mb-3">Workflow Automation</h3>
                <p className="text-black/70 text-base leading-relaxed">
                  Orchestrate complex pipelines across hundreds of apps using n8n, Make, and custom FastAPI microservices — zero manual steps.
                </p>
              </div>

              <div className="relative z-10 mt-6">
                <div className="flex flex-wrap gap-2">
                  {["n8n", "Make", "FastAPI", "Zapier"].map((tool) => (
                    <span key={tool} className="px-3 py-1 bg-black/15 rounded-full text-black font-bold text-xs">{tool}</span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ── BOTTOM LEFT: RAG Architecture ── */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="md:col-span-5 group relative p-2 flex flex-col justify-between min-h-[260px]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(250,204,21,0.07)_0%,transparent_70%)] pointer-events-none" />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-slate-200 dark:bg-white/10 flex items-center justify-center mb-5 group-hover:bg-yellow-500/20 transition-colors">
                  <Database className="w-6 h-6 text-slate-600 dark:text-white group-hover:text-yellow-500 transition-colors" />
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">RAG Architecture</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  Retrieval-Augmented Generation using Pinecone &amp; Supabase pgvector to let AI instantly query your proprietary company data.
                </p>
              </div>

              <div className="relative z-10 mt-5 flex gap-3">
                {["Pinecone", "pgvector", "Supabase"].map((tech) => (
                  <span key={tech} className="px-2.5 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-600 dark:text-yellow-400 font-bold text-[11px]">{tech}</span>
                ))}
              </div>
            </motion.div>

            {/* ── BOTTOM RIGHT: Computer Vision ── */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="md:col-span-7 group relative p-2 flex flex-col justify-between min-h-[260px]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(250,204,21,0.07)_0%,transparent_70%)] pointer-events-none" />

              <div className="relative z-10 flex gap-6 flex-col md:flex-row">
                <div className="flex-1">
                  <div className="w-12 h-12 rounded-2xl bg-slate-200 dark:bg-white/10 flex items-center justify-center mb-5 group-hover:bg-yellow-500/20 transition-colors">
                    <TerminalSquare className="w-6 h-6 text-slate-600 dark:text-white group-hover:text-yellow-500 transition-colors" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">Computer Vision &amp; ML</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                    Deploy PyTorch and YOLO models for object detection, image classification, and automated QC right into your production stack.
                  </p>
                </div>

                {/* Mini animated visual */}
                <div className="shrink-0 flex flex-col gap-2 justify-center">
                  {[
                    { label: "Detection Accuracy", pct: "98.7%" },
                    { label: "Processing Speed", pct: "34ms" },
                    { label: "Throughput", pct: "1.2k/s" },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15 }}
                      className="flex items-center gap-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5"
                    >
                      <div className="w-2 h-2 rounded-full bg-yellow-500 shrink-0" />
                      <span className="text-slate-500 dark:text-slate-400 text-xs">{stat.label}</span>
                      <span className="text-slate-900 dark:text-white font-black text-sm ml-auto">{stat.pct}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          4. SECURITY NODE
      ════════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-16 bg-white dark:bg-[#030712] relative overflow-hidden border-t border-slate-100 dark:border-white/5">
        {/* Subtle yellow glow top center */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-yellow-500/8 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* LEFT: Headline & description */}
            <div>
              <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-1.5 mb-6">
                <ShieldCheck className="w-4 h-4 text-yellow-500" />
                <span className="text-yellow-500 text-xs font-bold uppercase tracking-widest">Zero-Trust Architecture</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
                Enterprise-Grade<br />
                <span className="text-yellow-500">Security</span>
              </h2>

              <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed mb-8">
                We architect solutions prioritizing zero-trust principles. Your proprietary data is never used to train public models — hosted in secure VPCs with role-based access control and GDPR/SOC2 compliant architectures.
              </p>

              {/* Animated shield icon */}
              <div className="relative w-20 h-20">
                <motion.div
                  animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="absolute inset-0 rounded-2xl bg-yellow-500/20 border border-yellow-500/30"
                />
                <div className="relative w-20 h-20 rounded-2xl bg-yellow-500 flex items-center justify-center shadow-[0_0_40px_rgba(250,204,21,0.35)]">
                  <Lock className="w-9 h-9 text-black" />
                </div>
              </div>
            </div>

            {/* RIGHT: Security pillars */}
            <div className="flex flex-col gap-5">
              {[
                {
                  icon: ShieldCheck,
                  title: "Private Cloud Deployments",
                  desc: "All infrastructure runs inside isolated VPCs — your data never touches shared environments.",
                },
                {
                  icon: Lock,
                  title: "Encrypted Vector Databases",
                  desc: "At-rest and in-transit AES-256 encryption on all embeddings, indexes, and semantic stores.",
                },
                {
                  icon: ShieldCheck,
                  title: "Self-Hosted LLMs Available",
                  desc: "Run models like Llama 3 and Mistral fully on-premise — zero data exposure to third-party APIs.",
                },
                {
                  icon: ShieldCheck,
                  title: "GDPR / SOC2 Compliant",
                  desc: "Role-based access control, full audit logs, and compliance-ready data handling built in by default.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center shrink-0 group-hover:bg-yellow-500/20 transition-colors">
                    <item.icon className="w-5 h-5 text-yellow-500" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 dark:text-white text-base mb-0.5">{item.title}</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════
          5. FAQ SECTION
      ════════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-16 relative bg-white dark:bg-[#030712] border-t border-slate-100 dark:border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-wide">
              AI Solutions<br />
              <span className="text-yellow-500">FAQs</span>
            </h2>
          </div>

          <div className="border-t-[1.5px] border-slate-200 dark:border-slate-800">
            {AI_FAQS.map((faq, i) => (
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
