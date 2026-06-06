"use client";

import { motion } from "framer-motion";

const row1Brands = [
  "maxima", "HYDER", "Anupam", "Baby organo", "ROSSO CAFFÈ", "ng", "ARTMENT", "2X",
  "maxima", "HYDER", "Anupam", "Baby organo", "ROSSO CAFFÈ", "ng", "ARTMENT", "2X" // Duplicated for seamless scrolling
];

const row2Brands = [
  "WARMEE", "Panchamrit", "Truthsome.", "ADRO", "the tribe", "Mintree", "GlowUp", "Veda",
  "WARMEE", "Panchamrit", "Truthsome.", "ADRO", "the tribe", "Mintree", "GlowUp", "Veda" // Duplicated for seamless scrolling
];

export default function BrandsMarquee() {
  return (
    <section className="relative py-10 bg-white dark:bg-[#0a0a0a] overflow-hidden transition-colors duration-300">
      {/* Background Geometric Pattern */}
      <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.03] invert dark:invert-0 pointer-events-none" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")', backgroundSize: '30px 30px' }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <div className="inline-flex items-center justify-center space-x-2 bg-yellow-400 text-black font-bold px-5 py-2 rounded-full text-xs tracking-widest mb-6 uppercase">
          Brands Collaborations
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Brands that trust us
        </h2>
      </div>

      <div className="relative z-10 flex flex-col gap-6">
        {/* Row 1 - Scrolling Left */}
        <div className="flex overflow-hidden relative w-full">
          {/* Gradient Fades for Smooth Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-white dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none transition-colors duration-300"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-white dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none transition-colors duration-300"></div>
          
          <motion.div 
            animate={{ x: ["0%", "-50%"] }} 
            transition={{ ease: "linear", duration: 30, repeat: Infinity }}
            className="flex items-center space-x-4 md:space-x-6 w-max pr-4 md:pr-6"
          >
            {row1Brands.map((brand, i) => (
              <div 
                key={i} 
                className="flex-shrink-0 w-32 sm:w-44 md:w-56 h-16 sm:h-20 md:h-24 bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/5 rounded-xl md:rounded-2xl flex items-center justify-center shadow-md dark:shadow-lg"
              >
                <div className="text-slate-400 dark:text-white/60 font-black text-base sm:text-xl md:text-2xl uppercase tracking-wider font-sans">
                  {brand}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2 - Scrolling Right */}
        <div className="flex overflow-hidden relative w-full mt-4 md:mt-2">
          {/* Gradient Fades for Smooth Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-white dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none transition-colors duration-300"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-white dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none transition-colors duration-300"></div>
          
          <motion.div 
            animate={{ x: ["-50%", "0%"] }} 
            transition={{ ease: "linear", duration: 35, repeat: Infinity }}
            className="flex items-center space-x-4 md:space-x-6 w-max pr-4 md:pr-6"
          >
            {row2Brands.map((brand, i) => (
              <div 
                key={i} 
                className="flex-shrink-0 w-40 sm:w-48 md:w-64 h-16 sm:h-20 md:h-24 bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/5 rounded-xl md:rounded-2xl flex items-center justify-center shadow-md dark:shadow-lg"
              >
                <div className="text-slate-400 dark:text-white/60 font-black text-base sm:text-xl md:text-2xl tracking-widest font-sans">
                  {brand}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
