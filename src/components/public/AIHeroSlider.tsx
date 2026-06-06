"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, Mail, Terminal, GitBranch, Edit3, MessageSquare, 
  CheckCircle2, XCircle, Database, FileText, Zap, UserPlus
} from "lucide-react";

/* ─── Node Component ─── */
function WorkflowNode({ 
  icon: Icon, label, colorClass, delay = 0, isActive = false 
}: { 
  icon: any, label: string, colorClass: string, delay?: number, isActive?: boolean 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className={`relative flex flex-col items-center gap-2 group w-20 z-10`}
    >
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 bg-white dark:bg-slate-900 shadow-lg transition-all duration-300 ${isActive ? 'border-yellow-400 shadow-yellow-400/20 shadow-xl scale-110' : 'border-slate-200 dark:border-slate-700'}`}>
        <Icon className={`w-6 h-6 ${colorClass} ${isActive ? 'animate-pulse' : ''}`} />
        
        {/* Connection points */}
        <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600" />
        <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600" />
      </div>
      <span className="text-[9px] font-bold text-slate-600 dark:text-slate-400 text-center uppercase tracking-wider bg-white/80 dark:bg-slate-900/80 px-1 rounded backdrop-blur-sm truncate w-[120%]">{label}</span>
    </motion.div>
  );
}

/* ─── Animated Edge Component ─── */
function AnimatedEdge({ d, delay = 0, isActive = false }: { d: string, delay?: number, isActive?: boolean }) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ overflow: 'visible' }}>
      {/* Base track */}
      <path d={d} fill="none" stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeWidth="2" strokeDasharray="4 4" />
      {/* Animated active packet */}
      <motion.path
        d={d}
        fill="none"
        stroke={isActive ? "#EAB308" : "#94A3B8"}
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay, repeat: Infinity, repeatType: "loop", ease: "linear" }}
      />
    </svg>
  );
}

export default function AIHeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
      className="relative perspective-1000 w-full max-w-lg mx-auto lg:max-w-none h-[420px]"
    >
      <div className="relative w-full h-full rounded-3xl bg-slate-50 dark:bg-[#0A0D14] border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Browser / Canvas Header */}
        <div className="h-12 border-b border-slate-200 dark:border-white/10 flex items-center justify-between px-4 bg-white/50 dark:bg-white/5 backdrop-blur-md">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Zap className="w-3 h-3 text-yellow-500" /> n8n Automation Engine
          </div>
          <div className="w-10" />
        </div>

        {/* Slides Container */}
        <div 
          className="flex-1 relative overflow-x-auto overflow-y-hidden bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Style hack for webkit scrollbar hiding inline */}
          <style>{`
            div::-webkit-scrollbar { display: none; }
          `}</style>
          
          <div className="relative min-w-[600px] h-full w-full">
            <AnimatePresence mode="wait">
            
            {/* SLIDE 0: Customer Support Ticket Triage (Based on User's Image) */}
            {currentSlide === 0 && (
              <motion.div
                key="slide0"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 p-6"
              >
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-full text-[10px] font-bold text-slate-500 shadow-sm z-20 uppercase tracking-widest">
                  Workflow: Ticket Triage
                </div>

                <div className="relative w-full h-full mt-10">
                  {/* Nodes */}
                  <div className="absolute top-[10%] left-[5%]">
                    <WorkflowNode icon={Calendar} label="Cron Trigger" colorClass="text-green-500" delay={0} isActive />
                  </div>
                  <div className="absolute top-[10%] left-[30%]">
                    <WorkflowNode icon={Mail} label="Get Tickets" colorClass="text-blue-500" delay={0.2} />
                  </div>
                  <div className="absolute top-[10%] left-[60%]">
                    <WorkflowNode icon={GitBranch} label="Filter Attachments" colorClass="text-orange-500" delay={0.4} />
                  </div>

                  <div className="absolute top-[50%] left-[30%]">
                    <WorkflowNode icon={Edit3} label="Set SBC Data" colorClass="text-blue-500" delay={0.6} />
                  </div>
                  <div className="absolute top-[50%] left-[60%]">
                    <WorkflowNode icon={Terminal} label="Upload Data" colorClass="text-slate-700 dark:text-slate-300" delay={0.8} />
                  </div>
                  <div className="absolute top-[50%] left-[85%]">
                    <WorkflowNode icon={GitBranch} label="IF upload ok" colorClass="text-green-500" delay={1.0} isActive />
                  </div>

                  {/* Edges */}
                  <AnimatedEdge d="M 50 35 L 145 35" delay={0} />
                  <AnimatedEdge d="M 170 35 L 290 35" delay={0.2} />
                  <AnimatedEdge d="M 315 35 Q 350 35 350 70 L 350 140 Q 350 165 315 165 L 170 165" delay={0.4} />
                  <AnimatedEdge d="M 145 165 L 290 165" delay={0.6} />
                  <AnimatedEdge d="M 315 165 L 400 165" delay={0.8} isActive />
                </div>
              </motion.div>
            )}

            {/* SLIDE 1: RAG Document Ingestion */}
            {currentSlide === 1 && (
              <motion.div
                key="slide1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 p-6"
              >
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-full text-[10px] font-bold text-slate-500 shadow-sm z-20 uppercase tracking-widest">
                  Workflow: RAG Ingestion
                </div>

                <div className="relative w-full h-full mt-10">
                  <div className="absolute top-[30%] left-[5%]">
                    <WorkflowNode icon={FileText} label="Read PDFs" colorClass="text-red-500" delay={0} />
                  </div>
                  <div className="absolute top-[30%] left-[30%]">
                    <WorkflowNode icon={Terminal} label="Text Splitter" colorClass="text-purple-500" delay={0.2} />
                  </div>
                  <div className="absolute top-[10%] left-[60%]">
                    <WorkflowNode icon={Zap} label="OpenAI Embeddings" colorClass="text-emerald-500" delay={0.4} isActive />
                  </div>
                  <div className="absolute top-[60%] left-[60%]">
                    <WorkflowNode icon={Database} label="Pinecone Vector DB" colorClass="text-blue-400" delay={0.6} />
                  </div>
                  <div className="absolute top-[35%] left-[85%]">
                    <WorkflowNode icon={CheckCircle2} label="Log Success" colorClass="text-green-500" delay={0.8} />
                  </div>

                  <AnimatedEdge d="M 50 100 L 145 100" delay={0} />
                  <AnimatedEdge d="M 170 100 Q 220 100 220 65 L 220 50 Q 220 35 290 35" delay={0.2} isActive />
                  <AnimatedEdge d="M 315 35 Q 360 35 360 70 L 360 100 Q 360 115 400 115" delay={0.4} />
                  <AnimatedEdge d="M 170 100 Q 220 100 220 135 L 220 160 Q 220 195 290 195" delay={0.2} />
                  <AnimatedEdge d="M 315 195 Q 360 195 360 160 L 360 130 Q 360 115 400 115" delay={0.6} />
                </div>
              </motion.div>
            )}

            {/* SLIDE 2: Agentic Lead Qualification */}
            {currentSlide === 2 && (
              <motion.div
                key="slide2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 p-6"
              >
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-full text-[10px] font-bold text-slate-500 shadow-sm z-20 uppercase tracking-widest">
                  Workflow: Agentic AI
                </div>

                <div className="relative w-full h-full mt-10">
                  <div className="absolute top-[30%] left-[5%]">
                    <WorkflowNode icon={MessageSquare} label="New Lead Chat" colorClass="text-blue-500" delay={0} />
                  </div>
                  <div className="absolute top-[30%] left-[30%]">
                    <WorkflowNode icon={Zap} label="LLM Classifier" colorClass="text-yellow-500" delay={0.2} isActive />
                  </div>
                  <div className="absolute top-[10%] left-[60%]">
                    <WorkflowNode icon={XCircle} label="Reject (Low Fit)" colorClass="text-red-500" delay={0.4} />
                  </div>
                  <div className="absolute top-[60%] left-[60%]">
                    <WorkflowNode icon={CheckCircle2} label="Qualify (High Fit)" colorClass="text-green-500" delay={0.4} />
                  </div>
                  <div className="absolute top-[60%] left-[85%]">
                    <WorkflowNode icon={UserPlus} label="Create in HubSpot" colorClass="text-orange-500" delay={0.6} isActive />
                  </div>

                  <AnimatedEdge d="M 50 100 L 145 100" delay={0} />
                  <AnimatedEdge d="M 170 100 Q 220 100 220 65 L 220 50 Q 220 35 290 35" delay={0.2} />
                  <AnimatedEdge d="M 170 100 Q 220 100 220 135 L 220 160 Q 220 195 290 195" delay={0.2} isActive />
                  <AnimatedEdge d="M 315 195 L 400 195" delay={0.4} isActive />
                </div>
              </motion.div>
            )}

            </AnimatePresence>
          </div>
        </div>

        {/* Progress Bar & Status */}
        <div className="h-10 border-t border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-md flex items-center px-4 justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Engine Active</span>
          </div>
          
          {/* Dots */}
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <div 
                key={i} 
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${currentSlide === i ? 'bg-yellow-500 w-3' : 'bg-slate-300 dark:bg-slate-600'}`}
              />
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
}
