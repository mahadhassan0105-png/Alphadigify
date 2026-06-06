"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Loader2, 
  ArrowRight, 
  ShieldAlert, 
  Sparkles, 
  Check, 
  Activity, 
  SlidersHorizontal 
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/components/ThemeProvider";

export default function LoginPage() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Force Light Mode by default on this page
  useEffect(() => {
    if (theme === "dark") {
      toggleTheme();
    }
  }, [theme, toggleTheme]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid administrative credentials. Please check your spelling and try again.");
      setLoading(false);
    } else {
      router.push("/admin/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:grid lg:grid-cols-12 bg-white dark:bg-black text-zinc-900 dark:text-white relative overflow-hidden font-sans selection:bg-yellow-400/30 selection:text-zinc-900 dark:selection:text-white transition-colors duration-500">
      
      {/* Background Decorative Mesh Overlays (Subtle, only in dark mode) */}
      <div className="absolute inset-0 bg-transparent dark:bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Left Column: Solid Signature Yellow Brand Spotlight (Hidden on mobile) */}
      <div className="hidden lg:flex lg:col-span-5 relative flex-col justify-between p-12 bg-yellow-400 dark:bg-zinc-950 border-r border-yellow-500/20 dark:border-white/[0.05] overflow-hidden z-20 transition-all duration-500">
        
        {/* Logo and Brand Name */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg overflow-hidden relative shadow-md shrink-0">
            <Image 
              src="/alphadigify-logo.jpg" 
              alt="Alphadigify Logo" 
              fill
              className="object-cover"
              priority
            />
          </div>
          <span className="font-sans font-black tracking-[0.2em] text-sm uppercase text-zinc-950 dark:text-white">
            ALPHADIGIFY
          </span>
        </div>

        {/* Feature Checkpoints */}
        <div className="relative z-10 space-y-8 my-auto">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-950/20 bg-white/40 dark:bg-yellow-400/5 text-zinc-950 dark:text-yellow-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Administrative Layer
            </div>
            <h1 className="text-3xl xl:text-4xl font-black tracking-tight leading-tight text-zinc-950 dark:text-white">
              Unlock Peak <br />
              <span className="underline decoration-zinc-950 decoration-wavy decoration-2 underline-offset-4 dark:bg-clip-text dark:text-transparent dark:bg-gradient-to-r dark:from-yellow-400 dark:via-yellow-500 dark:to-amber-500">
                Digital Velocity
              </span>
            </h1>
            <p className="text-zinc-850 dark:text-zinc-400 text-sm max-w-sm leading-relaxed font-medium">
              Access the secure control center to manage campaigns, monitor client performance, and orchestrate automated slider marketing systems.
            </p>
          </div>

          <div className="space-y-4 border-t border-zinc-950/15 dark:border-white/[0.06] pt-6 max-w-sm">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-md bg-white/50 dark:bg-yellow-400/10 flex items-center justify-center text-zinc-950 dark:text-yellow-400 shrink-0 mt-0.5 shadow-sm">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-950 dark:text-zinc-200">Cryptographic Identity Layer</h4>
                <p className="text-zinc-800 dark:text-zinc-500 text-xs mt-0.5 font-medium">End-to-end encrypted session keys and multi-admin credential handshakes.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-md bg-white/50 dark:bg-yellow-400/10 flex items-center justify-center text-zinc-950 dark:text-yellow-400 shrink-0 mt-0.5 shadow-sm">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-950 dark:text-zinc-200">Dynamic Asset Synchronization</h4>
                <p className="text-zinc-800 dark:text-zinc-500 text-xs mt-0.5 font-medium">Real-time database updates for portfolios, team rosters, and leads.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-md bg-white/50 dark:bg-yellow-400/10 flex items-center justify-center text-zinc-950 dark:text-yellow-400 shrink-0 mt-0.5 shadow-sm">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-950 dark:text-zinc-200">Responsive Telemetry Tools</h4>
                <p className="text-zinc-800 dark:text-zinc-500 text-xs mt-0.5 font-medium">Full console diagnostic compatibility across all standard handheld devices.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 flex items-center justify-between border-t border-zinc-950/15 dark:border-white/[0.05] pt-6 text-zinc-800 dark:text-zinc-500 text-xs font-semibold">
          <span>&copy; {new Date().getFullYear()} Alphadigify</span>
          <div className="flex items-center gap-1">
            <Activity className="w-3.5 h-3.5 text-zinc-950 dark:text-emerald-500 animate-pulse" />
            <span className="text-zinc-900 dark:text-zinc-400 font-bold">Gateway Active</span>
          </div>
        </div>
      </div>

      {/* Right Column: Solid White Interactive Login Area */}
      <div className="col-span-12 lg:col-span-7 flex flex-col justify-center items-center p-4 sm:p-8 md:p-12 bg-white dark:bg-black relative z-10 min-h-screen transition-colors duration-500">
        
        {/* Back Link to Website */}
        <Link 
          href="/" 
          className="absolute top-6 left-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-white/[0.06] bg-slate-50 dark:bg-zinc-900/40 text-xs font-bold text-zinc-650 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-300 dark:hover:border-white/[0.12] hover:bg-slate-100 dark:hover:bg-zinc-900/80 transition-all z-30 shadow-sm"
        >
          <ArrowRight className="w-3.5 h-3.5 rotate-180" /> Back to website
        </Link>

        {/* Floating Topbar display for mobile screens */}
        <div className="lg:hidden flex items-center gap-2 mb-8 mt-12">
          <div className="w-8 h-8 rounded-lg overflow-hidden relative shadow-md shrink-0">
            <Image 
              src="/alphadigify-logo.jpg" 
              alt="Alphadigify Logo" 
              fill
              className="object-cover"
              priority
            />
          </div>
          <span className="font-sans font-black tracking-[0.2em] text-sm uppercase text-zinc-950 dark:text-white">
            ALPHADIGIFY
          </span>
        </div>

        {/* Card Component Container */}
        <div className="w-full max-w-md bg-white dark:bg-zinc-950/70 border border-zinc-200 dark:border-white/[0.06] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative transition-all duration-300 hover:border-zinc-350 dark:hover:border-white/[0.09]">
          
          {/* Subtle Golden Accent Glow Line */}
          <div className="absolute top-0 left-10 right-10 h-[1.5px] bg-gradient-to-r from-transparent via-yellow-400 dark:via-yellow-400/45 to-transparent pointer-events-none" />

          {/* Form Header */}
          <div className="space-y-2 text-center sm:text-left">
            <h2 className="text-2xl font-black tracking-tight text-zinc-950 dark:text-white flex items-center justify-center sm:justify-start gap-2.5">
              <SlidersHorizontal className="w-5 h-5 text-yellow-500 dark:text-yellow-400" /> Admin Console
            </h2>
            <p className="text-zinc-550 dark:text-zinc-400 text-sm font-medium">
              Provide credentials to access operational database boards.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-start gap-3 p-3.5 rounded-xl border border-red-500/20 bg-red-500/5 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-xs sm:text-sm animate-shake">
              <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5 text-red-500 dark:text-red-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-550 dark:text-zinc-400 text-xs font-bold uppercase tracking-wider">
                Email Address
              </Label>
              <div className="relative group">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 group-focus-within:text-yellow-600 dark:group-focus-within:text-yellow-400 transition-colors pointer-events-none">
                  <Mail className="w-4 h-4" />
                </span>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@alphadigify.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-black/60 border border-zinc-200 dark:border-white/[0.08] rounded-xl pl-10 pr-4 py-3 text-zinc-950 dark:text-zinc-100 text-sm placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-yellow-400 focus:dark:border-yellow-400/50 focus:ring-4 focus:ring-yellow-400/15 focus:dark:ring-yellow-400/10 transition-all h-11"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-zinc-550 dark:text-zinc-400 text-xs font-bold uppercase tracking-wider">
                  Password
                </Label>
              </div>
              <div className="relative group">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 group-focus-within:text-yellow-600 dark:group-focus-within:text-yellow-400 transition-colors pointer-events-none">
                  <Lock className="w-4 h-4" />
                </span>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-black/60 border border-zinc-200 dark:border-white/[0.08] rounded-xl pl-10 pr-11 py-3 text-zinc-950 dark:text-zinc-100 text-sm placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-yellow-400 focus:dark:border-yellow-400/50 focus:ring-4 focus:ring-yellow-400/15 focus:dark:ring-yellow-400/10 transition-all h-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
                  title={showPassword ? "Hide Password" : "Show Password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Action Button */}
            <Button 
              type="submit" 
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-zinc-950 font-black h-11 rounded-xl shadow-[0_4px_14px_rgba(250,204,21,0.35)] dark:shadow-[0_0_20px_rgba(250,204,21,0.25)] hover:shadow-[0_6px_20px_rgba(250,204,21,0.55)] dark:hover:shadow-[0_0_30px_rgba(250,204,21,0.45)] transition-all duration-300 mt-6 flex items-center justify-center gap-2 border-none"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authorizing...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4 transition-transform" />
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Footer for mobile devices */}
        <div className="lg:hidden text-center text-zinc-400 dark:text-zinc-600 text-xs mt-12 space-y-2 font-semibold">
          <span>&copy; {new Date().getFullYear()} Alphadigify</span>
          <div className="flex items-center justify-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-zinc-950 dark:text-emerald-500 animate-pulse" />
            <span>Gateway Active</span>
          </div>
        </div>

      </div>
    </div>
  );
}
