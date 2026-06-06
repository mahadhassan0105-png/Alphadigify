/* eslint-disable @next/next/no-img-element */
import Navbar from "@/components/Navbar";
import Footer from "@/components/public/Footer";
import { Users, Award, ShieldCheck, ArrowUpRight } from "lucide-react";
import { db } from "@/lib/db";
import { TeamMember } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  let team: TeamMember[] = [];
  try {
    team = await db.teamMember.findMany({
      orderBy: { createdAt: "asc" }
    });
  } catch (err) {
    console.error("Failed to query team:", err);
  }

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white flex flex-col relative overflow-hidden transition-colors duration-300">
      
      {/* Decorative Glow Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-yellow-400/[0.02] dark:bg-yellow-400/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-[20vh] left-1/3 w-[600px] h-[600px] bg-yellow-400/[0.01] dark:bg-yellow-400/3 blur-[150px] rounded-full pointer-events-none -z-10" />

      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-40 pb-24 border-b border-slate-200 dark:border-slate-800 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-yellow-400/20 dark:bg-yellow-400/10 text-yellow-600 dark:text-yellow-500 text-[10px] sm:text-[11px] font-bold tracking-[1.5px] uppercase py-[5px] px-[14px] rounded-full mb-6 border border-yellow-400/30">
            <span>Built Different</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight text-slate-900 dark:text-white">
            Our Philosophy. <br />
            <span className="text-yellow-500 dark:text-yellow-400">
              Your Scaled Growth.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium">
            Alphadigify originated from a frustration with traditional agency models. Too many account managers, too few actual operators. We built a firm exclusively staffed by senior specialists who execute in real-time.
          </p>
        </div>
      </section>

      {/* Core Values / Features */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Value 1 */}
          <div className="flex flex-col items-start p-4 group">
            <div className="w-16 h-16 bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 rounded-2xl flex items-center justify-center mb-6 font-bold group-hover:bg-yellow-400 group-hover:text-black transition-colors duration-300">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white transition-colors">Elite Operators</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              We only hire top 1% talent that has actively built, scaled, and exited businesses. No juniors practicing on your budget, only experts driving results.
            </p>
          </div>

          {/* Value 2 */}
          <div className="flex flex-col items-start p-4 group">
            <div className="w-16 h-16 bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 rounded-2xl flex items-center justify-center mb-6 font-bold group-hover:bg-yellow-400 group-hover:text-black transition-colors duration-300">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white transition-colors">Bias for Action</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Strategies mean nothing without execution. We deploy code, launch campaigns, audit listings, and iterate faster than our competitors to stay ahead.
            </p>
          </div>

          {/* Value 3 */}
          <div className="flex flex-col items-start p-4 group">
            <div className="w-16 h-16 bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 rounded-2xl flex items-center justify-center mb-6 font-bold group-hover:bg-yellow-400 group-hover:text-black transition-colors duration-300">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white transition-colors">Transparent Alignment</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              You see the exact data we see. Full clarity on ROAS, CAC, and LTV metrics. We view ourselves as your dedicated scaling partners, not external vendors.
            </p>
          </div>

        </div>
      </section>

      {/* Team Roster Grid */}
      <section className="py-24 bg-white dark:bg-slate-900/20 border-t border-b border-slate-200 dark:border-slate-800 relative z-10 flex-1 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-slate-900 dark:text-white">
              Meet Our <span className="text-yellow-500 dark:text-yellow-400 font-bold">Elite Operators</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
              The strategists, developers, and designers working behind the scenes to scale your brand.
            </p>
          </div>

          {team.length === 0 ? (
            <div className="text-center text-slate-500 py-16 font-medium bg-white dark:bg-slate-950/20 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
              No team profiles added yet. Visit the Admin Panel to populate.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {team.map((member) => (
                <div 
                  key={member.id}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Photo Container */}
                  <div className="w-32 h-32 rounded-full bg-slate-100 dark:bg-slate-800/50 text-yellow-600 dark:text-yellow-400 flex items-center justify-center font-extrabold text-3xl mx-auto mb-6 overflow-hidden shadow-sm group-hover:scale-105 transition-all duration-300">
                    {member.avatar ? (
                      <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      member.name.charAt(0)
                    )}
                  </div>
                  
                  {/* Member Details */}
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                    {member.name}
                  </h4>
                  
                  <p className="text-sm font-semibold text-yellow-600 dark:text-yellow-500 uppercase tracking-widest mb-4">
                    {member.role}
                  </p>
                  
                  <a 
                    href={`mailto:${member.email}`}
                    className="inline-flex items-center text-xs font-bold text-slate-500 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
                  >
                    <span>Say Hello</span>
                    <ArrowUpRight className="w-3 h-3 ml-1" />
                  </a>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      <Footer />
    </main>
  );
}
