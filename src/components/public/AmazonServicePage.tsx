"use client";

import { motion, useInView, animate, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import {
  TrendingUp, BarChart3, Search, Package,
  Target, ArrowRight, ChevronDown,
  PenTool, Settings, MousePointerClick, LayoutDashboard, ClipboardCheck, Truck, Edit3
} from "lucide-react";
import { useState } from "react";
import AmazonHeroSlider from "./AmazonHeroSlider";
import ServiceDetailSections from "./ServiceDetailSections";
import DigitalSolutionsCircle from "./DigitalSolutionsCircle";

/* ───── Animated Counter ───── */
function Counter({ from, to, prefix = "", suffix = "" }: { from: number; to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  useEffect(() => {
    if (inView) {
      const c = animate(from, to, {
        duration: 2.5, ease: "easeOut",
        onUpdate(v) { if (ref.current) ref.current.textContent = `${prefix}${Math.round(v)}${suffix}`; },
      });
      return () => c.stop();
    }
  }, [from, to, inView, prefix, suffix]);
  return <span ref={ref} className="font-mono tracking-tight">{prefix}{from}{suffix}</span>;
}



/* ───── Data ───── */
const stats = [
  { from: 0, to: 350, suffix: "+", label: "Brands Managed" },
  { from: 0, to: 97, suffix: "%", label: "Client Retention" },
  { from: 0, to: 40, prefix: "$", suffix: "M+", label: "Revenue Generated" },
  { from: 0, to: 12, suffix: "+", label: "Years Experience" },
];

const features = [
  { icon: Target, title: "PPC", desc: "Boost sales, cut costs. We’re your partner in transparent, high-performing Amazon advertising.", sectionId: "ppc" },
  { icon: Search, title: "SEO", desc: "Watch your search rankings soar with our proven 4-phase Amazon SEO plan. Results in just 90 days.", sectionId: "seo" },
  { icon: PenTool, title: "Design", desc: "CTR-optimized Amazon listing images, compelling A+ Content, and high-converting Brand Stores.", sectionId: "design" },
  { icon: Package, title: "Merchandising", desc: "Your product catalog, perfected. We optimize listings, attributes, and more to ensure customers love what they see.", sectionId: "merchandising" },
  { icon: Settings, title: "Catalog Troubleshooting", desc: "Having trouble with your catalog? We’ll handle it.", sectionId: "catalog-troubleshooting" },
  { icon: MousePointerClick, title: "Main Image CTR Hack", desc: "Ready to increase your Amazon traffic? Our CTR-optimized image design is the key.", sectionId: "main-image-hack" },
  { icon: BarChart3, title: "Reporting and Monitoring", desc: "Stay ahead of the Amazon game. We track updates, monitor your account, and optimize for peak performance.", sectionId: "reporting-monitoring" },
  { icon: LayoutDashboard, title: "Platform Management", desc: "Stress-free Amazon selling. Our Amazon experts take care of everything, from A to Z.", sectionId: "platform-management" },
  { icon: ClipboardCheck, title: "Audit", desc: "A deep dive into your Amazon listing performance. Our audit will pinpoint areas for improvement.", sectionId: "account-audit" },
  { icon: Truck, title: "Shipping Plans", desc: "Avoid FBA pitfalls. Our expert IPI management and strategic planning will keep your inventory flowing smoothly.", sectionId: "shipping-plans" },
  { icon: Edit3, title: "Copywriting", desc: "Want your product to stand out? Our expert copywriting and Amazon SEO services will make it a top contender.", sectionId: "copywriting" },
  { icon: TrendingUp, title: "Market Share Growth", desc: "Win more customers and outpace rivals with optimization, ads, and catalog growth on Amazon.", sectionId: "market-share" },
];

const additionalSupport = [
  { title: "Ads and Catalog Backup", desc: "Never lose crucial data. We back up your Amazon ads and catalog for easy rollbacks and thorough performance analysis." },
  { title: "Amazon Case Log Management", desc: "Your Amazon case management, our expertise. We'll handle communication with seller support and resolve issues efficiently." },
  { title: "Bi-Weekly Client Calls", desc: "No communication gaps. Bi-weekly conference calls and flexible communication options keep you informed and supported." },
  { title: "Proactive Restock Recommendations", desc: "Avoid stockouts and overstock. Our restock reports deliver the data you need to make smart inventory decisions." },
  { title: "Expert Seller Central Assistance", desc: "From crafting FBA reports to monitoring suppressed listings, we handle all the details that drive your Amazon success." },
];

const faqs = [
  { q: "What Amazon marketplaces do you support?", a: "We manage accounts across all major Amazon marketplaces including US, CA, UK, DE, FR, IT, ES, UAE, JP, AU, and IN. Our team handles localization, compliance, and marketplace-specific strategies." },
  { q: "How quickly can I expect results?", a: "Most clients see measurable improvements within 30-60 days. PPC optimizations show results within 2 weeks, while organic ranking improvements typically take 60-90 days to fully materialize." },
  { q: "Do you require long-term contracts?", a: "We operate on month-to-month agreements after an initial 90-day onboarding period. We believe in earning your business every month through performance, not contracts." },
  { q: "What size brands do you work with?", a: "We work with brands generating $50K to $50M+ in annual Amazon revenue. Our strategies scale to fit whether you are launching your first product or managing a 500+ SKU catalog." },
  { q: "How is your pricing structured?", a: "Our pricing is based on your current monthly revenue and scope of services. We offer transparent flat-rate management fees — no percentage-of-ad-spend models that misalign incentives." },
];

/* ───── MAIN COMPONENT ───── */
export default function AmazonServicePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);


  return (
    <>
      {/* ════════ HERO ════════ */}
      <AmazonHeroSlider />

      {/* ════════ STATS ════════ */}
      <section className="pt-24 sm:pt-36 lg:pt-44 pb-10 sm:pb-16 bg-white dark:bg-slate-950 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl sm:text-4xl md:text-5xl font-bold text-yellow-400 mb-1 sm:mb-2">
                  <Counter from={s.from} to={s.to} prefix={s.prefix || ""} suffix={s.suffix} />
                </div>
                <div className="text-[10px] sm:text-xs md:text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ SERVICE CYCLE ════════ */}
      <section className="py-12 sm:py-16 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
            
            {/* Left: Text */}
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight mb-4 sm:mb-6">
                Full service Amazon agency
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed mb-4">
                It takes more than just having a good product to succeed on Amazon. With full service management, you&apos;ll have a holistic approach to growth, and a better chance at achieving your goals on Amazon.
              </p>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                From ads to SEO to operations, we align everything to drive consistent results.
              </p>
            </div>

            {/* Right: Animated Cycle */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative flex items-center justify-center">
              <DigitalSolutionsCircle />
            </motion.div>

          </div>
        </div>
      </section>

      {/* ════════ FEATURES ════════ */}
      <section className="py-12 sm:py-16 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <div>
              <div className="inline-block text-black font-bold tracking-widest text-xs uppercase bg-yellow-400 px-4 py-1.5 rounded-full mb-4 sm:mb-6">What We Do</div>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-3 sm:mb-4">
              Full-spectrum Amazon management
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
              Every lever of your Amazon business — optimized, automated, and scaled by specialists who live inside Seller Central.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
            {features.map((f, i) => (
              <div key={i} className="group flex flex-col bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-3 sm:p-6 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 transition-all duration-300">
                {/* Icon */}
                <div className="mb-3 sm:mb-4 shrink-0">
                  <f.icon className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-500 dark:text-yellow-400" strokeWidth={1.5} />
                </div>
                {/* Title */}
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white mb-2 sm:mb-3">{f.title}</h3>
                {/* Divider */}
                <div className="w-full h-px bg-slate-200 dark:bg-slate-700 mb-2 sm:mb-3" />
                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4 sm:mb-6">{f.desc}</p>
                {/* Learn more */}
                <a
                  href={`#${f.sectionId}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(f.sectionId)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="mt-auto flex items-center text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm cursor-pointer group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors"
                >
                  <span className="w-5 h-5 rounded-full bg-[#E77600] flex items-center justify-center mr-2 shrink-0">
                    <ArrowRight className="w-3 h-3 text-white" />
                  </span>
                  Learn more
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ ADDITIONAL SUPPORT ════════ */}
      <section className="py-12 sm:py-16 bg-white dark:bg-slate-950 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-3 sm:mb-4">
              Additional support for Amazon
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-3xl text-sm sm:text-base leading-relaxed">
              Attention to detail sets our Amazon agency apart from others. We&apos;re not just about the big picture. Every detail counts, and we&apos;re here to maximize your Amazon performance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-8 sm:gap-y-6 lg:gap-y-8">
            {additionalSupport.map((support, i) => (
              <div key={i}
                className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-lg p-5 sm:p-8 relative overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
                {/* Thick yellow left border */}
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-yellow-400" />
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2 pl-2">{support.title}</h3>
                <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed pl-2">{support.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ SERVICE DETAIL SECTIONS ════════ */}
      <ServiceDetailSections />


      {/* ════════ FAQ ════════ */}
      <section className="py-12 md:py-24 bg-white dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-wide">
              Amazon Account<br/>
              <span className="text-yellow-500">Management FAQs</span>
            </h2>
          </div>

          <div className="border-t-[1.5px] border-slate-200 dark:border-slate-800">
            {faqs.map((faq, i) => (
              <div 
                key={i}
                className="border-b-[1.5px] border-slate-200 dark:border-slate-800"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-start justify-between py-6 text-left group"
                >
                  <span className={`text-lg md:text-xl font-bold pr-8 transition-colors duration-300 ${openFaq === i ? 'text-yellow-500' : 'text-slate-900 dark:text-white group-hover:text-yellow-500'}`}>
                    {faq.q}
                  </span>
                  <span className={`shrink-0 ml-4 flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300 ${openFaq === i ? 'bg-yellow-50 dark:bg-yellow-500/10' : 'bg-slate-50 dark:bg-slate-900 group-hover:bg-slate-100 dark:group-hover:bg-slate-800'}`}>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openFaq === i ? 'rotate-180 text-yellow-500' : 'text-slate-400 dark:text-slate-500'}`} />
                  </span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pr-12 text-slate-600 dark:text-slate-400 leading-relaxed md:text-lg">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
