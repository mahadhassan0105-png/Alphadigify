"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/public/Footer";
import { ArrowRight, Mail, MapPin, Phone, Calendar, CheckCircle2, ShieldCheck } from "lucide-react";

interface CompanySettings {
  email: string;
  phone?: string | null;
  location: string;
  facebook?: string | null;
  twitter?: string | null;
  instagram?: string | null;
  linkedin?: string | null;
}

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [budget, setBudget] = useState("");
  const [service, setService] = useState("");
  const [settings, setSettings] = useState<CompanySettings>({
    email: "strategy@alphadigify.com",
    phone: null,
    location: "Islamabad, Pakistan & Global Remote",
  });

  useEffect(() => {
    fetch("/api/settings?t=" + new Date().getTime())
      .then(r => r.json())
      .then(data => { if (data.settings) setSettings(data.settings); })
      .catch(() => {/* keep defaults */});
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    
    // Explicitly add the Select values since standard FormData sometimes misses them
    data.budget = budget;
    data.service = service;

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.error || "Failed to submit application. Please make sure your message is at least 10 characters long.");
      }
      
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
      setBudget("");
      setService("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#0B0C10] flex flex-col overflow-hidden selection:bg-yellow-500/30">
      <Navbar />
      
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-yellow-500/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/5 blur-[150px] rounded-full" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-[size:40px_40px] opacity-[0.03] dark:opacity-[0.05]" />
      </div>

      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-12 md:pb-16 grid lg:grid-cols-2 gap-16 lg:gap-24 relative z-10">
        
        {/* ═══════════════════════════════════════
            LEFT SIDE: The Sell
        ═══════════════════════════════════════ */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col justify-center"
        >
          <div className="inline-flex items-center gap-2 bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20 text-yellow-700 dark:text-yellow-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-8 w-fit">
            <ShieldCheck className="w-3.5 h-3.5" /> Client Application
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight leading-[1.05]">
            Let's Build Your <br />
            <span className="text-yellow-500">Unfair Advantage.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed font-medium max-w-xl">
            We don't take on every project. We partner exclusively with ambitious brands ready to scale aggressively. Apply below for a free growth roadmap and technical audit.
          </p>

          <div className="space-y-6 mb-12">
            {[
              "1. We review your current metrics & bottlenecks.",
              "2. We schedule a 30-minute strategy session.",
              "3. We deliver a custom engineering roadmap."
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-4 text-slate-700 dark:text-slate-300 font-medium">
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                  {i + 1}
                </div>
                <span>{step.substring(3)}</span>
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-6 pt-8 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-yellow-500 mt-1" />
              <div>
                <p className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs mb-1">Direct Email</p>
                <a href={`mailto:${settings.email}`} className="text-slate-600 dark:text-slate-400 font-medium hover:text-yellow-500 transition-colors">{settings.email}</a>
              </div>
            </div>
            {settings.phone && (
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-yellow-500 mt-1" />
                <div>
                  <p className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs mb-1">Phone</p>
                  <p className="text-slate-600 dark:text-slate-400 font-medium">{settings.phone}</p>
                </div>
              </div>
            )}
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-yellow-500 mt-1" />
              <div>
                <p className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs mb-1">Headquarters</p>
                <p className="text-slate-600 dark:text-slate-400 font-medium">{settings.location}</p>
              </div>
            </div>
          </div>

        </motion.div>

        {/* ═══════════════════════════════════════
            RIGHT SIDE: The Form
        ═══════════════════════════════════════ */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative"
        >
          <div className="bg-white dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative z-10">
            
            {success ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-16"
              >
                <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-6 border border-emerald-200 dark:border-emerald-500/30 shadow-lg">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tight">Application Received</h3>
                <p className="text-slate-600 dark:text-slate-400 text-lg font-medium mb-8 max-w-sm mx-auto leading-relaxed">
                  Our Director of Strategy is reviewing your file. We will be in touch within 24 hours to schedule your session.
                </p>
                <Button 
                  className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-black dark:hover:bg-slate-200 rounded-full h-12 px-8 font-bold" 
                  onClick={() => setSuccess(false)}
                >
                  Submit Another
                </Button>
              </motion.div>
            ) : (
              <>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Apply for Partnership</h2>
                  <a href="https://calendly.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors">
                    <Calendar className="w-4 h-4" /> Skip the queue. Book directly.
                  </a>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2.5">
                      <Label htmlFor="name" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Full Name</Label>
                      <Input id="name" name="name" required className="h-12 bg-slate-50 dark:bg-[#0B0C10] border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus-visible:ring-yellow-400 rounded-xl" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2.5">
                      <Label htmlFor="email" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Work Email</Label>
                      <Input id="email" name="email" type="email" required className="h-12 bg-slate-50 dark:bg-[#0B0C10] border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus-visible:ring-yellow-400 rounded-xl" placeholder="john@company.com" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2.5">
                      <Label htmlFor="phone" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Phone (Optional)</Label>
                      <Input id="phone" name="phone" type="tel" className="h-12 bg-slate-50 dark:bg-[#0B0C10] border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus-visible:ring-yellow-400 rounded-xl" placeholder="+1 (555) 000-0000" />
                    </div>
                    <div className="space-y-2.5">
                      <Label htmlFor="budget" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Monthly Revenue</Label>
                      <Select name="budget" required value={budget} onValueChange={setBudget}>
                        <SelectTrigger className="h-12 bg-slate-50 dark:bg-[#0B0C10] border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl">
                          <SelectValue placeholder="Select current scale" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-slate-200 dark:border-slate-800 rounded-xl">
                          <SelectItem value="Under $10k/mo">Pre-Scale (Under $10k/mo)</SelectItem>
                          <SelectItem value="$10k - $50k/mo">Scaling ($10k - $50k/mo)</SelectItem>
                          <SelectItem value="$50k - $250k/mo">Growth ($50k - $250k/mo)</SelectItem>
                          <SelectItem value="$250k+/mo">Enterprise ($250k+/mo)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <Label htmlFor="service" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Primary Growth Need</Label>
                    <Select name="service" required value={service} onValueChange={setService}>
                      <SelectTrigger className="h-12 bg-slate-50 dark:bg-[#0B0C10] border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl">
                        <SelectValue placeholder="What is your biggest bottleneck?" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-slate-200 dark:border-slate-800 rounded-xl">
                        <SelectItem value="SEO & Traffic">SEO & Organic Traffic</SelectItem>
                        <SelectItem value="Web Engineering">High-Converting Web Development</SelectItem>
                        <SelectItem value="Paid Ads">Scaling Paid Ads (Meta/Google)</SelectItem>
                        <SelectItem value="E-Com / Amazon">Amazon FBA / TikTok Shop</SelectItem>
                        <SelectItem value="Account Reinstatement">Account Reinstatement</SelectItem>
                        <SelectItem value="Other">Other Strategic Need</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2.5">
                    <Label htmlFor="message" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Project Details</Label>
                    <Textarea 
                      id="message" 
                      name="message" 
                      required 
                      rows={4} 
                      placeholder="Tell us about your brand, your current challenges, and where you want to be in 6 months..."
                      className="bg-slate-50 dark:bg-[#0B0C10] border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus-visible:ring-yellow-400 resize-none rounded-xl p-4" 
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 p-3 rounded-lg">
                      <p className="text-red-600 dark:text-red-400 text-sm font-medium">{error}</p>
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    disabled={loading} 
                    className="w-full bg-yellow-400 text-slate-900 hover:bg-yellow-500 font-black uppercase tracking-widest h-14 rounded-xl shadow-[0_0_30px_rgba(250,204,21,0.2)] hover:shadow-[0_0_40px_rgba(250,204,21,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Transmitting..." : "Submit Application"} <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>

                  <p className="text-center text-xs text-slate-500 dark:text-slate-400 font-medium mt-4">
                    Your data is secure. No spam. No fluff. Just results.
                  </p>
                </form>
              </>
            )}
          </div>
          
          {(settings.twitter || settings.instagram || settings.linkedin || settings.facebook) && (
            <div className="flex justify-center gap-6 mt-8 relative z-10">
              {settings.twitter && (
                <a href={settings.twitter} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800/80 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-yellow-500 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors shadow-lg">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
              )}
              {settings.instagram && (
                <a href={settings.instagram} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800/80 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-yellow-500 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors shadow-lg">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
              )}
              {settings.linkedin && (
                <a href={settings.linkedin} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800/80 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-yellow-500 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors shadow-lg">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              )}
              {settings.facebook && (
                <a href={settings.facebook} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800/80 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-yellow-500 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors shadow-lg">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              )}
            </div>
          )}
        </motion.div>
      </div>
      
      <Footer />
    </main>
  );
}
