/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { slides } from "@/lib/data";
import MockupShowcase from "./MockupShowcase";

const bgImages = [
  "/hero_slide_1.jpg",
  "/hero_slide_2.jpg",
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000); // 5s auto-play
    return () => clearInterval(timer);
  }, [nextSlide]);

  const currentBg = bgImages[currentIndex % bgImages.length];

  return (
    <section className="relative w-full h-auto min-h-0 sm:min-h-[700px] lg:h-[100vh] lg:min-h-[950px] pb-8 sm:pb-0 overflow-x-hidden">
      {/* Preload images to prevent network delay on first cycle */}
      <div className="hidden">
        {bgImages.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={i} src={src} alt="preload" />
        ))}
      </div>

      {/* Animated Slideshow Background Image — rounded bottom */}
      <div className="absolute inset-0 z-0 overflow-hidden" style={{ clipPath: 'ellipse(120% 95% at 50% 0%)', backgroundColor: '#000' }}>
        <AnimatePresence initial={false}>
          <motion.div
            key={currentBg}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
            style={{ willChange: "transform, opacity" }}
          >
            <Image
              src={currentBg}
              alt="Hero Background"
              fill
              priority={currentIndex === 0}
              className="object-cover object-center"
              quality={90}
            />
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Dark gradient overlay — same clip */}
      <div 
        className="absolute inset-0 z-[1] dark:bg-gradient-to-b dark:from-[#1a1a2e]/80 dark:via-[#10101c]/60 dark:to-[#0c0c16]/90 bg-gradient-to-b from-black/10 via-transparent to-black/20"
        style={{ clipPath: 'ellipse(120% 95% at 50% 0%)' }}
      />

      {/* Content — overflows below the hero */}
      <div className="relative z-10 flex flex-col items-center pt-32 sm:pt-24 lg:pt-36">
        {/* Tagline */}
        <header className="text-center mb-6 sm:mb-8 lg:mb-12 px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white tracking-tight leading-[1.1] drop-shadow-lg">
            Build Smarter. <span className="text-yellow-400">Scale Faster.</span>
          </h1>
          <p className="mt-3 sm:mt-5 text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-md">
            Powerful SaaS dashboards that transform your data into actionable insights, helping teams make better decisions every day.
          </p>
        </header>

        {/* Slider — hangs half below the hero */}
        <div className="w-full flex justify-center px-4 sm:px-6 lg:px-12 overflow-hidden">
          <MockupShowcase currentIndex={currentIndex} direction={direction} />
        </div>
      </div>
    </section>
  );
}
