"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { slides } from "@/lib/data";
import AnimatedDashboard from "./AnimatedDashboard";

interface MockupShowcaseProps {
  currentIndex: number;
  direction: number;
}

const VIRTUAL_W = 900;
const VIRTUAL_H = 562; // 900 * 10/16

export default function MockupShowcase({ currentIndex }: MockupShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardScale, setCardScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const scaleX = rect.width / VIRTUAL_W;
      const scaleY = rect.height / VIRTUAL_H;
      setCardScale(Math.min(scaleX, scaleY));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const getIndex = (index: number) => {
    const len = slides.length;
    return ((index % len) + len) % len;
  };

  const centerIndex = getIndex(currentIndex);
  const leftIndex = getIndex(currentIndex - 1);
  const rightIndex = getIndex(currentIndex + 1);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[350px] sm:max-w-sm md:max-w-xl lg:max-w-3xl xl:max-w-[900px] aspect-[16/10] flex items-center justify-center -mt-4 -translate-y-12 sm:translate-y-0 sm:mt-[10vh] lg:mt-0 pointer-events-none perspective-[2000px]"
    >
      {slides.map((slide, i) => {
        let zIndex = 0;
        let scale = 0.8;
        let x = "0%";
        let opacity = 0;
        let rotateY = 0;
        let display = "none";

        if (i === centerIndex) {
          zIndex = 30;
          scale = 1;
          x = "0%";
          opacity = 1;
          rotateY = 0;
          display = "block";
        } else if (i === leftIndex) {
          zIndex = 20;
          scale = 0.85;
          x = "-35%";
          opacity = 1;
          rotateY = 15;
          display = "block";
        } else if (i === rightIndex) {
          zIndex = 20;
          scale = 0.85;
          x = "35%";
          opacity = 1;
          rotateY = -15;
          display = "block";
        }

        return (
          <motion.div
            key={slide.id}
            initial={false}
            animate={{
              scale,
              x,
              opacity,
              zIndex,
              rotateY,
            }}
            transition={{
              duration: 0.9,
              ease: [0.25, 1, 0.5, 1],
            }}
            className="absolute top-0 left-0 w-full h-full rounded-xl overflow-hidden dark:shadow-[0_30px_60px_rgba(0,0,0,0.6)] shadow-[0_30px_60px_rgba(0,0,0,0.2)] dark:border-slate-700/80 border-gray-300/30 border dark:bg-slate-900 bg-white"
            style={{
              display,
              transformStyle: "preserve-3d",
              willChange: "transform, opacity",
              backfaceVisibility: "hidden",
            }}
          >
            {/* Overlay to dim side images */}
            <motion.div
              animate={{ opacity: i === centerIndex ? 0 : 0.15 }}
              className="absolute inset-0 bg-black z-20 pointer-events-none"
            />
            {/* Scale wrapper: renders dashboard at fixed virtual size, scales to fit */}
            <div className="w-full h-full relative overflow-hidden">
              <div
                className="absolute top-0 left-0 origin-top-left"
                style={{
                  width: VIRTUAL_W,
                  height: VIRTUAL_H,
                  transform: `scale(${cardScale})`,
                }}
              >
                <AnimatedDashboard key={i === centerIndex ? `active-${slide.id}` : `static-${slide.id}`} theme={slide.theme} isActive={i === centerIndex} layoutId={slide.id} />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
