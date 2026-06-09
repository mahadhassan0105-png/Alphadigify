"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Grip, X, ArrowRight, ArrowDown, PartyPopper } from "lucide-react";
import confetti from "canvas-confetti";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "./ThemeProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "SERVICES", href: "#" },
  { label: "CASE STUDY", href: "/case-studies" },
  { label: "PORTFOLIO", href: "/portfolio" },
  { label: "CONTACT", href: "/contact" },
];

const servicesMenu = [
  { label: "Amazon Account Management", href: "/services/amazon-account-management" },
  { label: "TikTok Shop Management", href: "/services/tiktok-shop" },
  { label: "Social Media Management", href: "/services/social-media-management" },
  { label: "Web SEO Optimization", href: "/services/web-seo-optimization" },
  { label: "Google Ads Management", href: "/services/google-ads-management" },
  { label: "Website Development", href: "/services/website-development" },
  { label: "Graphics Designing", href: "/services/graphic-design" },
  { label: "Video Ads Creation", href: "/services/video-ads-creation" },
  { label: "Account Reinstatement", href: "/services/account-reinstatement" },
  { label: "AI Solutions & Auto Service", href: "/services/ai-solutions-automation" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesHover, setServicesHover] = useState(false);
  const [mobileServicesExpanded, setMobileServicesExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // When scrolled: dark mode → black bg + white text | light mode → white bg + black text
  // When at top: always transparent + white text (hero is always dark/image)
  const navBg = scrolled
    ? isDark
      ? "bg-black/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.4)]"
      : "bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.08)]"
    : "bg-transparent";

  const logoText = scrolled
    ? isDark ? "text-white" : "text-slate-900"
    : "text-white";

  const linkInactive = scrolled
    ? isDark
      ? "text-slate-300 hover:text-yellow-400"
      : "text-slate-700 hover:text-yellow-500"
    : "text-white/80 hover:text-yellow-400";

  const linkActive = "text-yellow-400";

  const iconColor = scrolled
    ? isDark ? "text-slate-300 hover:text-yellow-400" : "text-slate-700 hover:text-yellow-500"
    : "text-white/80 hover:text-yellow-400";

  const hamburgerColor = scrolled
    ? isDark ? "text-white hover:text-yellow-400" : "text-slate-800 hover:text-yellow-500"
    : "text-white hover:text-yellow-400";

  const hamburgerBorder = scrolled
    ? isDark ? "border-white/20 bg-white/5" : "border-slate-300 bg-slate-100"
    : "border-white/20 bg-white/5";

  const handleConfetti = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const duration = 5000;
    const animationEnd = Date.now() + duration;
    
    // Pick a random origin type: 0 = top, 1 = sides, 2 = bottom
    const originType = Math.floor(Math.random() * 3);

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      
      if (timeLeft <= 0) {
        clearInterval(interval);
        setIsAnimating(false);
        return;
      }

      // Increase density of confetti while maintaining performance
      const particleCount = 80 * (timeLeft / duration);

      if (originType === 0) {
        // Come out from top
        confetti({
          particleCount,
          startVelocity: 25,
          spread: 360,
          origin: { x: Math.random(), y: Math.random() * 0.2 - 0.2 },
          zIndex: 100
        });
      } else if (originType === 1) {
        // Come out from left and right side and merge in the middle
        confetti({
          particleCount: particleCount * 1.5,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.8 },
          startVelocity: 70,
          zIndex: 100
        });
        confetti({
          particleCount: particleCount * 1.5,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.8 },
          startVelocity: 70,
          zIndex: 100
        });
      } else {
        // Come out from bottom
        confetti({
          particleCount: particleCount * 2,
          startVelocity: 50,
          spread: 90,
          origin: { x: Math.random(), y: 1 },
          zIndex: 100
        });
      }
    }, 200); // Run every 200ms instead of 60fps (16ms)
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navBg}`}
    >
      {/* Gradient backdrop — only visible when NOT scrolled */}
      {!scrolled && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between h-14 sm:h-16 lg:h-[72px] relative z-10">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <span className={`${logoText} text-xl font-bold tracking-wide group-hover:text-yellow-400 transition-colors duration-300`}>
            Alphadigify
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center space-x-8 xl:space-x-10 h-full relative">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.label === "SERVICES" && pathname.startsWith("/services"));
            
            if (link.label === "SERVICES") {
              return (
                <div 
                  key={link.label} 
                  className="relative h-full flex items-center"
                  onMouseEnter={() => setServicesHover(true)}
                  onMouseLeave={() => setServicesHover(false)}
                >
                  <Link
                    href={link.href}
                    className={`text-[13px] font-semibold tracking-[0.15em] flex items-center gap-1.5 transition-colors duration-300 py-6 ${
                      isActive || servicesHover ? linkActive : linkInactive
                    }`}
                  >
                    {link.label}
                    <ArrowDown className={`w-3.5 h-3.5 transition-transform duration-300 ${servicesHover ? 'rotate-180' : ''}`} strokeWidth={3} />
                  </Link>

                  <AnimatePresence>
                    {servicesHover && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className={`absolute top-full left-1/2 -translate-x-1/2 mt-[-5px] w-[640px] p-6 rounded-2xl border ${isDark ? 'bg-[#0a0a0a]/95 border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)]' : 'bg-white/95 border-slate-200 shadow-[0_10px_40px_rgba(0,0,0,0.1)]'} backdrop-blur-xl`}
                      >
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                          {servicesMenu.map((svc) => (
                            <Link 
                              key={svc.href} 
                              href={svc.href}
                              onClick={() => setServicesHover(false)}
                              className={`block px-4 py-3 rounded-xl transition-all duration-200 group ${isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'}`}
                            >
                              <div className={`text-sm font-bold tracking-wide transition-colors ${isDark ? 'text-slate-200 group-hover:text-yellow-400' : 'text-slate-700 group-hover:text-yellow-500'}`}>
                                {svc.label}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            }

            return (
              <Link
                key={link.label}
                href={link.href}
                className={`text-[13px] font-semibold tracking-[0.15em] transition-colors duration-300 py-6 ${
                  isActive ? linkActive : linkInactive
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-5">
          {/* Confetti Button */}
          <button 
            onClick={handleConfetti}
            disabled={isAnimating}
            className={`${iconColor} transition-all duration-300 ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110 active:scale-95'}`}
            title="Celebrate!"
            aria-label="Celebrate"
          >
            <PartyPopper className="w-[18px] h-[18px] stroke-[1.5]" />
          </button>

          {/* Theme Toggle */}
          <div className="block">
            <ThemeToggle />
          </div>

          {/* Search Placeholder */}
          <button className={`${iconColor} transition-colors hidden sm:block`}>
            <Search className="w-[18px] h-[18px] stroke-[1.5]" />
          </button>

          {/* Modern Mobile Menu Trigger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden flex items-center justify-center p-2 rounded-full border backdrop-blur-md ${hamburgerBorder} ${hamburgerColor} transition-all duration-300 active:scale-95`}
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Grip className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Accordion Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`absolute top-full left-0 w-full overflow-hidden shadow-2xl origin-top ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'}`}
          >
            <div className="flex flex-col px-6 py-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.label === "SERVICES" && pathname.startsWith("/services"));
                
                if (link.label === "SERVICES") {
                  return (
                    <div key={link.label} className={`border-b ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                      <button
                        onClick={() => setMobileServicesExpanded(!mobileServicesExpanded)}
                        className="flex items-center justify-between w-full py-4 transition-colors group"
                      >
                        <span className={`text-[13px] font-bold tracking-[0.1em] ${isActive || mobileServicesExpanded ? (isDark ? 'text-yellow-400' : 'text-[#f5be00]') : (isDark ? 'text-white' : 'text-[#1a1a24]')}`}>
                          {link.label}
                        </span>
                        <ArrowDown className={`w-[14px] h-[14px] transition-transform duration-300 ${mobileServicesExpanded ? 'rotate-180 text-yellow-400' : (isDark ? 'text-white/40' : 'text-slate-400')}`} strokeWidth={2.5} />
                      </button>
                      
                      <AnimatePresence initial={false}>
                        {mobileServicesExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden pl-4 border-l border-yellow-400/20 my-1 space-y-1 pb-3"
                          >
                            {servicesMenu.map((svc) => (
                              <Link
                                key={svc.href}
                                href={svc.href}
                                onClick={() => {
                                  setMobileOpen(false);
                                  setMobileServicesExpanded(false);
                                }}
                                className={`block py-2 text-xs font-semibold tracking-wide transition-colors ${
                                  isDark ? 'text-slate-400 hover:text-yellow-400' : 'text-slate-600 hover:text-[#f5be00]'
                                }`}
                              >
                                {svc.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between py-4 border-b ${isDark ? 'border-white/10' : 'border-slate-200'} transition-colors group`}
                  >
                    <span className={`text-[13px] font-bold tracking-[0.1em] ${isActive ? (isDark ? 'text-yellow-400' : 'text-[#f5be00]') : (isDark ? 'text-white' : 'text-[#1a1a24]')}`}>
                      {link.label}
                    </span>
                    {isActive ? (
                      <ArrowDown className={`w-[14px] h-[14px] ${isDark ? 'text-yellow-400' : 'text-[#f5be00]'}`} strokeWidth={2.5} />
                    ) : (
                      <ArrowRight className={`w-[14px] h-[14px] ${isDark ? 'text-white/40' : 'text-slate-400'} group-hover:translate-x-1 transition-transform`} strokeWidth={2.5} />
                    )}
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
