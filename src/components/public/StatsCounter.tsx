"use client";

import { useInView, animate } from "framer-motion";
import { useEffect, useRef } from "react";

function AnimatedCounter({ from, to, prefix = "", suffix = "" }: { from: number, to: number, prefix?: string, suffix?: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView) {
      const controls = animate(from, to, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent = `${prefix}${Math.round(value)}${suffix}`;
          }
        },
      });
      return () => controls.stop();
    }
  }, [from, to, inView, prefix, suffix]);

  return <span ref={nodeRef} className="font-mono tracking-tight">{prefix}{from}{suffix}</span>;
}

const stats = [
  { from: 0, to: 450, prefix: "", suffix: "+", label: "Projects Completed" },
  { from: 0, to: 12, prefix: "$", suffix: "M+", label: "Client Revenue Generated" },
  { from: 0, to: 98, prefix: "", suffix: "%", label: "Client Retention Rate" },
  { from: 0, to: 50, prefix: "", suffix: "+", label: "In-house Specialists" }
];

export default function StatsCounter() {
  return (
    <section className="py-6 sm:py-8 bg-white dark:bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
          {stats.map((stat, i) => (
            <div 
              key={i}
              className="text-center px-4"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-400 mb-2 tracking-tight flex justify-center items-center">
                <AnimatedCounter from={stat.from} to={stat.to} prefix={stat.prefix} suffix={stat.suffix} />
              </div>
              <div className="text-xs md:text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
