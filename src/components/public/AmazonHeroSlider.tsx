/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { slides } from "@/lib/data";
import AmazonMockupShowcase from "./AmazonMockupShowcase";

const bgImages = [
  "/amazon_bg_1.jpg",
  "/amazon_bg_2.jpg",
];

export default function AmazonHeroSlider() {
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
    <section className="relative w-full h-auto min-h-0 sm:min-h-[700px] lg:h-[100vh] lg:min-h-[950px] [overflow-x:clip]">
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
              alt="Amazon Hero Background"
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
      <div className="relative z-10 flex flex-col items-center pt-16 sm:pt-16 lg:pt-20">
        {/* Tagline */}
        <header className="text-center mb-6 sm:mb-8 lg:mb-12 px-4 sm:px-6">
          {/* Amazon Partner Badges */}
          <div className="flex items-center justify-center gap-6 mb-8">
            {/* Amazon SPN Badge */}
            <div className="flex flex-col items-start">
              <div className="flex items-center text-2xl sm:text-3xl font-bold tracking-tighter text-white">
                amazon<span className="text-yellow-400 font-normal ml-0.5">spn</span>
              </div>
              <div className="w-full h-[2px] bg-yellow-400 rounded-full mt-0.5 mb-1 relative overflow-hidden">
                <div className="absolute left-1/2 -translate-x-1/2 w-1/2 h-full bg-black/40"></div>
              </div>
              <span className="text-xs tracking-wide text-blue-200 font-medium">solution provider network</span>
            </div>

            <div className="w-[1px] h-10 bg-white/30"></div>

            {/* Amazon Ads Badge */}
            <div className="flex flex-col justify-center items-start">
              <div className="flex items-center text-xl sm:text-2xl font-bold tracking-tighter text-white">
                amazon<span className="font-normal ml-1">ads</span>
              </div>
              <div className="text-sm font-bold tracking-wide mt-1">
                <span className="text-[#00A8E1]">Verified</span> <span className="text-blue-200">partner</span>
              </div>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white tracking-tight leading-[1.1] drop-shadow-lg">
            Dominate Amazon. <br className="hidden sm:block" /><span className="text-yellow-400">Scale Relentlessly.</span>
          </h1>
          <p className="mt-3 sm:mt-5 text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-md">
            End-to-end Seller Central management from listing optimization and PPC scaling to inventory forecasting and global marketplace expansion.
          </p>
        </header>

        {/* Slider — hangs half below the hero */}
        <div className="w-full flex justify-center px-4 sm:px-6 lg:px-12 mt-4 sm:mt-0">
          <AmazonMockupShowcase currentIndex={currentIndex} direction={direction} />
        </div>
      </div>
    </section>
  );
}
