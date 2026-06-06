import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/public/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

const serviceData = {
  "seo-mastery": {
    title: "SEO Mastery",
    desc: "Dominate search rankings with data-driven organic strategies.",
    features: ["Technical SEO Audits", "Keyword Gap Analysis", "High-DR Backlink Outreach", "Programmatic SEO Builds"],
    steps: ["Phase 1: Deep Technical Audit", "Phase 2: Content Architecture Restructuring", "Phase 3: High-Velocity Link Building", "Phase 4: Optimization & Scaling"]
  },
  "web-development": {
    title: "Next.js Web Engineering",
    desc: "High-performance React & Next.js applications tailored for speed.",
    features: ["Server-Side Rendering", "Headless CMS Integration", "Vercel / AWS Hosting", "Micro-interactions & Framer Motion"],
    steps: ["Phase 1: Architecture Design", "Phase 2: UI/UX Prototyping", "Phase 3: Frontend & Backend Engineering", "Phase 4: QA & Deployment"]
  },
  "amazon-fba": {
    title: "Amazon FBA Management",
    desc: "Scale your e-commerce operations with end-to-end FBA management.",
    features: ["Listing Optimization", "PPC Campaign Scaling", "Inventory Forecasting", "A+ Content Creation"],
    steps: ["Phase 1: Market & Competitor Analysis", "Phase 2: Listing Overhauls", "Phase 3: Aggressive PPC Scaling", "Phase 4: Catalog Expansion"]
  },
  "tiktok-shop": {
    title: "TikTok Commerce",
    desc: "Viral affiliate marketing and direct-to-consumer video commerce.",
    features: ["Creator Outreach (MCN)", "Live Stream Management", "Spark Ads Management", "Viral Hook Scripting"],
    steps: ["Phase 1: Creator Network Seeding", "Phase 2: Viral Content Production", "Phase 3: Ads Amplification", "Phase 4: Daily Live Operations"]
  },
  "social-advertising": {
    title: "Social Advertising",
    desc: "High ROI ad campaigns across Meta, TikTok, and LinkedIn.",
    features: ["Dynamic Creative Testing", "Advanced Pixel Tracking", "Lookalike Audience Scaling", "Retargeting Funnels"],
    steps: ["Phase 1: Pixel Setup & Tracking Check", "Phase 2: Creative A/B Testing", "Phase 3: Winning Ad Scaling", "Phase 4: ROAS Optimization"]
  },
  "branding": {
    title: "Branding & Creative",
    desc: "Memorable brand identities and conversion-focused creatives.",
    features: ["Visual Identity Systems", "Brand Guidelines", "UGC Creative Production", "Package Design"],
    steps: ["Phase 1: Market Positioning", "Phase 2: Identity Concepting", "Phase 3: Asset Production", "Phase 4: Rollout Strategy"]
  },
  "content-marketing": {
    title: "Content Machinery",
    desc: "Compelling storytelling that builds authority and traps attention.",
    features: ["Long-form SEO Articles", "Newsletter Workflows", "LinkedIn Ghostwriting", "Video Repurposing"],
    steps: ["Phase 1: Topic Clustering", "Phase 2: Production Pipeline Setup", "Phase 3: Multi-channel Distribution", "Phase 4: Performance Analytics"]
  },
  "cro": {
    title: "Conversion Rate Optimization",
    desc: "Turn passive traffic into active buyers through A/B testing.",
    features: ["Heatmap Analysis", "Multivariate Testing", "Checkout Flow Optimization", "Cart Abandonment Recovery"],
    steps: ["Phase 1: User Analytics Audit", "Phase 2: Hypothesis Generation", "Phase 3: A/B Test Implementation", "Phase 4: Statistical Evaluation"]
  },
  "email-automation": {
    title: "Email Automation flows",
    desc: "Behavior-triggered automated flows that print money on autopilot.",
    features: ["Klaviyo Flow Builds", "List Cleaning", "Campaign Strategy", "A/B Subject Line Tests"],
    steps: ["Phase 1: Tool Integration", "Phase 2: Core Automations (Welcome, Abandoned)", "Phase 3: Segmentation Setup", "Phase 4: Campaign Sending"]
  }
};

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = serviceData[params.slug as keyof typeof serviceData];

  if (!service) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white flex flex-col">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-400/10 blur-[100px] rounded-full"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-block text-amber-600 dark:text-yellow-400 font-semibold tracking-wider text-sm uppercase bg-yellow-400/10 px-3 py-1 rounded-full mb-6">Service</div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">{service.title}</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed mb-10">{service.desc}</p>
          <Link href="/contact">
            <Button size="lg" className="bg-yellow-400 text-black hover:bg-yellow-500 font-bold h-14 px-8 text-lg">
              Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features & Steps */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold mb-8">Included Features</h2>
            <div className="space-y-4">
              {service.features.map((feat, i) => (
                <div key={i} className="flex items-center space-x-4 bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                  <CheckCircle2 className="w-6 h-6 text-amber-600 dark:text-yellow-400 shrink-0" />
                  <span className="font-medium">{feat}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-8">Our Process</h2>
            <div className="space-y-6">
              {service.steps.map((step, i) => (
                <div key={i} className="relative pl-8 border-l-2 border-slate-200 dark:border-slate-800 pb-2 last:border-0 last:pb-0">
                  <div className="absolute top-0 left-[-9px] w-4 h-4 rounded-full bg-slate-50 dark:bg-slate-900 border-2 border-yellow-400"></div>
                  <h3 className="font-bold text-lg mb-2">{step}</h3>
                  <p className="text-slate-600 dark:text-slate-400">We execute this phase with ruthless precision to guarantee baseline results.</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mini CTA */}
      <section className="py-20 text-center bg-white dark:bg-slate-950 flex-1">
        <h2 className="text-3xl font-bold mb-6">Need a custom approach?</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-lg mx-auto">We routinely deal with complex stacks and multi-channel strategies. Let&apos;s discuss your exact parameters.</p>
        <Link href="/contact">
          <Button variant="outline" className="border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white hover:bg-slate-100 dark:bg-slate-800">Contact Strategist</Button>
        </Link>
      </section>

      <Footer />
    </main>
  );
}
