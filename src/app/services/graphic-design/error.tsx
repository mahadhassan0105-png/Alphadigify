"use client";

import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error("ErrorBoundary active:", error);
  return (
    <div className="min-h-screen bg-[#050810] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#0D1321] border border-[rgba(236,72,153,0.15)] rounded-2xl p-8 text-center shadow-[0_24px_60px_rgba(236,72,153,0.08)]">
        <div className="w-16 h-16 bg-[rgba(236,72,153,0.1)] rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8 text-[#EC4899]" />
        </div>
        <h2 className="text-2xl font-black text-[#E2E8F0] font-[family-name:var(--font-montserrat)] mb-4 tracking-tight">
          Something went wrong
        </h2>
        <p className="text-[#64748B] font-[family-name:var(--font-inter)] mb-8 line-height-relaxed">
          We encountered an issue loading the Graphic Design & Video Editing service details. Please try again.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-[linear-gradient(135deg,#EC4899,#7B2FBE)] text-white font-bold font-[family-name:var(--font-montserrat)] rounded-lg hover:opacity-90 transition-opacity"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 border border-[rgba(255,255,255,0.12)] text-[#E2E8F0] font-bold font-[family-name:var(--font-montserrat)] rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
