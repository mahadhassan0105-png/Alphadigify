"use client";

import { ShoppingCart, Video, Share2, Search, Target, MonitorDown, PenTool, Film, ShieldCheck, Bot } from "lucide-react";

const services = [
  {
    title: "Amazon Account Management",
    icon: ShoppingCart,
    desc: "End-to-end seller central management, catalog optimization, and FBA scaling to dominate the marketplace.",
    slug: "amazon-account-management"
  },
  {
    title: "TikTok Shop Account Management",
    icon: Video,
    desc: "Viral affiliate marketing loops and direct-to-consumer video commerce that spikes immediate organic sales.",
    slug: "tiktok-shop"
  },
  {
    title: "Social Media Management",
    icon: Share2,
    desc: "Strategic content distribution and community building that transforms audiences into fiercely loyal buyers.",
    slug: "social-media-management"
  },
  {
    title: "Web SEO Optimization",
    icon: Search,
    desc: "Dominate search engine rankings with data-driven organic strategies and aggressive keyword scaling.",
    slug: "web-seo-optimization"
  },
  {
    title: "Google Ads Management",
    icon: Target,
    desc: "High ROI ad campaigns built on continuous multivariate testing to capture high-intent traffic.",
    slug: "google-ads-management"
  },
  {
    title: "Website Development",
    icon: MonitorDown,
    desc: "We build ultra-fast, premium architectures designed specifically for maximum conversion and zero latency.",
    slug: "website-development"
  },
  {
    title: "Graphics Designing",
    icon: PenTool,
    desc: "Memorable brand identities, comprehensive style guides, and conversion-focused creative assets.",
    slug: "graphics-designing"
  },
  {
    title: "Video Ads Creation",
    icon: Film,
    desc: "High-retention video creatives designed to aggressively stop the scroll and dramatically lower your CPA.",
    slug: "video-ads-creation"
  },
  {
    title: "Account Reinstatement",
    icon: ShieldCheck,
    desc: "Swift appeal engineering and strategic negotiation to rapidly recover suspended digital storefronts.",
    slug: "account-reinstatement"
  },
  {
    title: "AI Solutions & Automation",
    icon: Bot,
    desc: "Intelligent chatbots, specialized AI agents, and frictionless workflow automations to aggressively slash overhead.",
    slug: "ai-solutions-automation"
  }
];



export default function ServicesGrid() {
  return (
    <section className="py-6 sm:py-10 bg-white dark:bg-[#050810] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10 sm:mb-20">
          <h2 
             className="text-2xl sm:text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6"
          >
            Capabilities that scale
          </h2>
          <p 
            className="text-sm sm:text-lg text-slate-500 dark:text-slate-400 max-w-[280px] sm:max-w-2xl mx-auto"
          >
            We deploy specialized talent to execute high-leverage growth strategies across the entire digital spectrum.
          </p>
        </div>

        <div 
          className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-12 gap-y-12 md:gap-y-20 pt-8"
        >
          {services.map((svc, index) => {
            const numText = String(index + 1).padStart(2, '0');
            return (
              <div 
                key={svc.slug} 
                className="relative flex flex-col items-center text-center group"
              >
                {/* Visual Header containing Ghost Number & Icon */}
                <div className="relative w-full flex justify-center items-center mb-4 sm:mb-8 h-16 sm:h-24">
                  {/* Giant Ghost Number */}
                  <div className="absolute inset-0 flex justify-center items-center pointer-events-none select-none -mt-2 sm:-mt-4">
                    {/* Light Mode Number */}
                    <div 
                      className="text-[80px] sm:text-[120px] font-black tracking-tighter leading-none text-white dark:hidden"
                      style={{ textShadow: '-1px -1px 0 #1e293b, 1px -1px 0 #1e293b, -1px 1px 0 #1e293b, 1px 1px 0 #1e293b' }}
                    >
                      {numText}
                    </div>
                    {/* Dark Mode Number */}
                    <div 
                      className="text-[80px] sm:text-[120px] font-black tracking-tighter leading-none text-[#050810] hidden dark:block"
                      style={{ textShadow: '-1px -1px 0 rgba(255, 255, 255, 0.25), 1px -1px 0 rgba(255, 255, 255, 0.25), -1px 1px 0 rgba(255, 255, 255, 0.25), 1px 1px 0 rgba(255, 255, 255, 0.25)' }}
                    >
                      {numText}
                    </div>
                  </div>
                  
                  {/* Centered Icon Container */}
                  <div className="relative z-10 w-12 h-12 sm:w-16 sm:h-16 bg-yellow-400 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                    <svc.icon className="w-6 h-6 sm:w-8 sm:h-8 text-black" strokeWidth={1.5} />
                  </div>
                </div>
                
                {/* Typography */}
                <h3 className="text-sm sm:text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-4 transition-colors">
                  {svc.title}
                </h3>
                
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-[11px] sm:text-xs md:text-sm max-w-[140px] sm:max-w-[280px]">
                  {svc.desc}
                </p>
                
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
