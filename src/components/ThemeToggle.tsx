"use client";

import { useTheme } from "./ThemeProvider";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center transition-all active:scale-95 group"
      aria-label="Toggle theme"
    >
      <div className="relative w-4 h-4 sm:w-4 sm:h-4 flex items-center justify-center overflow-hidden">
        <motion.div
          animate={{
            rotate: theme === "dark" ? 0 : -90,
            y: theme === "dark" ? 0 : 30,
            opacity: theme === "dark" ? 1 : 0,
          }}
          transition={{ duration: 0.4, ease: [0.175, 0.885, 0.32, 1.275] }}
          className="absolute text-yellow-400 group-hover:text-yellow-300 transition-colors"
        >
          <Moon className="w-4 h-4 fill-yellow-400/20" strokeWidth={2} />
        </motion.div>

        <motion.div
          animate={{
            rotate: theme === "light" ? 0 : 90,
            y: theme === "light" ? 0 : -30,
            opacity: theme === "light" ? 1 : 0,
          }}
          transition={{ duration: 0.4, ease: [0.175, 0.885, 0.32, 1.275] }}
          className="absolute text-amber-500 group-hover:text-amber-600 transition-colors"
        >
          <Sun className="w-4 h-4" strokeWidth={2.5} />
        </motion.div>
      </div>
    </button>
  );
}
