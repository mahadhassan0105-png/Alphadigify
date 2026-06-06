/* eslint-disable @next/next/no-img-element */
"use client";


import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string | null;
}

const highlights = [
  "Remote-first team across 8+ countries",
  "Ex-Amazon, Meta, and Google specialists",
  "2,000+ combined hours in e-commerce growth",
  "Agency built by operators, not theorists",
];

export default function TeamSnapshot() {
  const [team, setTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch("/api/team");
        if (!res.ok) throw new Error("Failed to fetch");
        const json = await res.json();
        if (json.success && json.team) {
          setTeam(json.team);
        }
      } catch (err) {
        console.error("Failed to load team:", err);
      }
    };
    fetchTeam();
  }, []);

  return (
    <section className="py-16 bg-white dark:bg-[#0a0a0a] overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-20">

          {/* Image — left column */}
          <div className="flex-1 w-full flex justify-center lg:justify-start">
            <div className="relative w-full">
              <Image
                src="/team.png"
                alt="Alphadigify team members working"
                width={1000}
                height={800}
                className="w-full h-auto object-contain"
                priority={false}
              />
            </div>
          </div>

          {/* Text — right column */}
          <div
            className="flex-1 w-full"
          >
            <div className="inline-block bg-yellow-400 text-black text-[11px] font-bold tracking-[1.5px] uppercase py-[5px] px-[14px] rounded-full mb-6">
              The Team
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-4 sm:mb-6 transition-colors">
              Real people.<br />
              <span className="text-yellow-400">
                Real results.
              </span>
            </h2>

            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-lg leading-relaxed mb-6 sm:mb-8 max-w-lg transition-colors">
              We&apos;re not a faceless agency. We&apos;re a kick-back-and-get-it-done team of specialists who live inside your growth metrics daily — obsessing over every click, sale, and ranking.
            </p>

            <ul className="space-y-3 mb-6">
              {highlights.map((item, i) => (
                <li key={i} className="flex items-center space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300 text-sm font-medium transition-colors">{item}</span>
                </li>
              ))}
            </ul>

            {/* Active Operators Row */}
            {team.length > 0 && (
              <div className="mb-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">Our Operators</p>
                <div className="flex flex-wrap gap-3">
                  {team.slice(0, 3).map((member) => (
                    <div 
                      key={member.id} 
                      className="flex items-center space-x-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-white/[0.04] rounded-xl px-3 py-2 transition-all hover:border-yellow-400/40"
                    >
                      <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 text-yellow-400 flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden">
                        {member.avatar ? (
                          <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                        ) : (
                          member.name.charAt(0)
                        )}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">{member.name}</h4>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">{member.role}</p>
                      </div>
                    </div>
                  ))}
                  {team.length > 3 && (
                    <div className="flex items-center justify-center bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-white/[0.04] rounded-xl px-3 py-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                      +{team.length - 3} More
                    </div>
                  )}
                </div>
              </div>
            )}

            <Link
              href="/about"
              className="inline-flex items-center space-x-2 bg-yellow-400 text-black font-bold px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base rounded-full hover:bg-yellow-500 transition-all duration-300 group"
            >
              <span>Meet the team</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
