"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

interface CompanySettings {
  email: string;
  phone?: string | null;
  location: string;
  facebook?: string | null;
  twitter?: string | null;
  instagram?: string | null;
  linkedin?: string | null;
}

const defaultSettings: CompanySettings = {
  email: "strategy@alphadigify.com",
  phone: null,
  location: "Islamabad, Pakistan & Global Remote",
  facebook: null,
  twitter: null,
  instagram: null,
  linkedin: null,
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [settings, setSettings] = useState<CompanySettings>(defaultSettings);

  useEffect(() => {
    fetch("/api/settings?t=" + new Date().getTime())
      .then((r) => r.json())
      .then((data) => { if (data.settings) setSettings(data.settings); })
      .catch(() => {/* keep defaults */});
  }, []);

  return (
    <footer className="bg-black border-t border-white/10 pt-12 md:pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-16">

          <div className="space-y-6">
            <Link href="/" className="inline-block font-bold text-2xl tracking-tight text-white">
              Alphadigify
            </Link>
            <p className="text-slate-400 leading-relaxed text-sm">
              We engineer scalable growth infrastructure for digital-first companies using bleeding-edge tech and elite marketing talent.
            </p>
            <div className="flex space-x-4">
              {settings.twitter && (
                <a href={settings.twitter} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-yellow-500 hover:border-yellow-500/50 transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
              )}
              {settings.instagram && (
                <a href={settings.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-yellow-500 hover:border-yellow-500/50 transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
              )}
              {settings.linkedin && (
                <a href={settings.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-yellow-500 hover:border-yellow-500/50 transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              )}
              {settings.facebook && (
                <a href={settings.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-yellow-500 hover:border-yellow-500/50 transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 tracking-wide">Solutions</h3>
            <ul className="space-y-3 shrink-0">
              <li><Link href="/services/amazon-account-management" className="text-slate-400 hover:text-yellow-500 text-sm transition-colors">Amazon Account Management</Link></li>
              <li><Link href="/services/tiktok-shop" className="text-slate-400 hover:text-yellow-500 text-sm transition-colors">TikTok Shop Management</Link></li>
              <li><Link href="/services/website-development" className="text-slate-400 hover:text-yellow-500 text-sm transition-colors">Website Development</Link></li>
              <li><Link href="/services/web-seo-optimization" className="text-slate-400 hover:text-yellow-500 text-sm transition-colors">Web SEO Optimization</Link></li>
              <li><Link href="/services/account-reinstatement" className="text-slate-400 hover:text-yellow-500 text-sm transition-colors">Account Reinstatement</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 tracking-wide">Company</h3>
            <ul className="space-y-3 shrink-0">
              <li><Link href="/about" className="text-slate-400 hover:text-yellow-500 text-sm transition-colors">About Us</Link></li>
              <li><Link href="/case-studies" className="text-slate-400 hover:text-yellow-500 text-sm transition-colors">Case Studies</Link></li>
              <li><Link href="/careers" className="text-slate-400 hover:text-yellow-500 text-sm transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="text-slate-400 hover:text-yellow-500 text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 tracking-wide">Contact</h3>
            <ul className="space-y-4 shrink-0">
              <li className="flex items-start text-sm text-slate-400">
                <MapPin className="w-5 h-5 mr-3 text-slate-500 shrink-0 mt-0.5" />
                <span className="whitespace-pre-line">{settings.location}</span>
              </li>
              {settings.phone && (
                <li className="flex items-center text-sm text-slate-400">
                  <Phone className="w-5 h-5 mr-3 text-slate-500 shrink-0" />
                  <span>{settings.phone}</span>
                </li>
              )}
              <li className="flex items-center text-sm text-slate-400">
                <Mail className="w-5 h-5 mr-3 text-slate-500 shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-yellow-500 transition-colors">{settings.email}</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-slate-500 text-sm">
            &copy; {currentYear} Alphadigify LLC. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link href="/privacy" className="text-slate-500 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-slate-500 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
