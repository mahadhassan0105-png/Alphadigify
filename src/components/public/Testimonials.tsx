"use client";

import { useEffect, useState } from "react";

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  initials: string;
  avatarBg: string;
  service: string;
  dotColor: string;
  stars: number;
}

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div 
      className="shrink-0 w-[240px] sm:w-[280px] lg:w-[320px] bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/[0.06] rounded-2xl p-5 sm:p-6 transition-colors duration-300 hover:border-amber-400/50 shadow-md dark:shadow-none"
      aria-hidden="true"
    >
      <div className="relative mb-3">
        {/* Service Dot */}
        <div 
          className="absolute top-0 right-0 w-2 h-2 rounded-full" 
          style={{ backgroundColor: testimonial.dotColor }}
        />
        
        {/* Star Rating */}
        <div 
          className="text-amber-500 text-[11px] tracking-[2px] mb-3 font-serif"
        >
          {"★".repeat(testimonial.stars)}
        </div>
      </div>

      {/* Quote */}
      <div className="mb-4">
        <span className="block text-2xl sm:text-3xl leading-none text-yellow-400 opacity-20 mb-2 font-sans">❝</span>
        <p className="text-[12px] sm:text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed italic transition-colors">
          {testimonial.quote}
        </p>
      </div>

      {/* Author Row */}
      <div className="flex items-center space-x-3 mt-auto">
        <div 
          className="w-[34px] h-[34px] rounded-full flex items-center justify-center shadow-sm"
          style={{ background: testimonial.avatarBg }}
        >
          <span className="text-[11px] font-bold text-white tracking-widest">{testimonial.initials}</span>
        </div>
        <div>
          <div className="text-[12px] font-semibold text-slate-900 dark:text-[#E2E8F0] transition-colors">{testimonial.name}</div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 transition-colors">{testimonial.role}</div>
        </div>
      </div>
    </div>
  );
};

const SkeletonCard = () => (
  <div className="shrink-0 w-[240px] sm:w-[280px] lg:w-[320px] bg-slate-100 dark:bg-[#111111] border border-slate-200 dark:border-white/[0.06] rounded-2xl p-5 sm:p-6 animate-pulse">
    <div className="relative mb-3 flex justify-between">
      <div className="w-16 h-3 bg-slate-200 dark:bg-slate-800 rounded" />
      <div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-800" />
    </div>
    <div className="space-y-2 mb-4">
      <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded" />
      <div className="w-5/6 h-3 bg-slate-200 dark:bg-slate-800 rounded" />
      <div className="w-4/5 h-3 bg-slate-200 dark:bg-slate-800 rounded" />
    </div>
    <div className="flex items-center space-x-3">
      <div className="w-[34px] h-[34px] rounded-full bg-slate-200 dark:bg-slate-800" />
      <div className="space-y-1.5 flex-1">
        <div className="w-2/3 h-3 bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="w-1/2 h-2.5 bg-slate-200 dark:bg-slate-800 rounded" />
      </div>
    </div>
  </div>
);

const MarqueeRow = ({ items, direction }: { items: Testimonial[], direction: 'left' | 'right' }) => {
  const animationClass = direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right';
  
  // Ensure we have enough items for a seamless looping marquee
  const getLoopingItems = (arr: Testimonial[]) => {
    if (arr.length === 0) return [];
    let repeated = [...arr];
    while (repeated.length < 8) {
      repeated = [...repeated, ...arr];
    }
    return repeated;
  };

  const loopingItems = getLoopingItems(items);

  if (loopingItems.length === 0) return null;

  return (
    <div className="flex w-full overflow-hidden relative">
      {/* Side Fade Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-[40px] md:w-[160px] bg-gradient-to-r from-white dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none transition-colors duration-300" />
      <div className="absolute right-0 top-0 bottom-0 w-[40px] md:w-[160px] bg-gradient-to-l from-white dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none transition-colors duration-300" />
      
      <div className={`flex items-center gap-4 w-max ${animationClass}`}>
        {loopingItems.map((t, i) => (
          <TestimonialCard key={`${t.id}-${i}`} testimonial={t} />
        ))}
      </div>
    </div>
  );
};

export default function Testimonials() {
  const [paused, setPaused] = useState(false);
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/api/testimonials");
        if (!res.ok) throw new Error("Failed to fetch");
        const json = await res.json();
        if (json.success && json.testimonials) {
          setItems(json.testimonials);
        }
      } catch (err) {
        console.error("Failed to load testimonials:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  // Split into rows
  const half = Math.ceil(items.length / 2);
  const row1 = items.slice(0, half);
  const row2 = items.slice(half);

  return (
    <section className="py-[30px] md:py-[40px] bg-white dark:bg-[#0a0a0a] overflow-hidden w-full transition-colors duration-300">
      
      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-16 text-center">
        <div className="inline-block bg-yellow-400 text-black text-[10px] sm:text-[11px] font-bold tracking-[1.5px] uppercase py-[4px] px-[10px] sm:py-[5px] sm:px-[14px] rounded-full mb-4 sm:mb-6 font-sans">
          Client Love
        </div>
        
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4">
          <span className="block text-slate-900 dark:text-white transition-colors">Loved by Businesses</span>
          <span className="block whitespace-nowrap text-yellow-400">
            Around the World
          </span>
        </h2>
        
        <p className="text-[16px] text-slate-600 dark:text-slate-400 max-w-lg mx-auto mb-8 font-medium transition-colors">
          500+ happy clients across Amazon, TikTok, SEO, Design & more — hover to pause
        </p>

        {/* Platform Pills */}
        <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
          {['Amazon', 'TikTok', 'Google Ads', 'Social Media', 'Web SEO'].map((platform) => (
            <div 
              key={platform} 
              className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[20px] px-[14px] py-[5px] text-[12px] text-slate-600 dark:text-slate-400 font-medium transition-colors shadow-sm dark:shadow-none"
            >
              {platform}
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Wrapper */}
      {loading ? (
        <div className="w-full flex flex-col gap-4 relative overflow-hidden">
          <div className="flex items-center gap-4 animate-marquee-left">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center text-slate-500 py-8">
          No reviews available at the moment.
        </div>
      ) : (
        <div 
          className={`w-full flex flex-col gap-4 relative z-0 ${paused ? 'marquee-paused' : ''}`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          <MarqueeRow items={row1} direction="left" />
          {row2.length > 0 && (
            <div className="hidden md:block mt-2">
              <MarqueeRow items={row2} direction="right" />
            </div>
          )}
        </div>
      )}
    </section>
  );
}
