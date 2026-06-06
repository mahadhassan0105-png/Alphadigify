"use client";

import { motion } from "framer-motion";
import { Users, Briefcase, TrendingUp, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from "@/components/ThemeProvider";

interface DashboardClientProps {
  stats: {
    totalClients: number;
    activeProjects: number;
    newLeads: number;
    revenue: number;
  };
  leadsData: { name: string; leads: number }[];
  projectsData: { name: string; count: number }[];
}

export default function DashboardClient({ stats, leadsData, projectsData }: DashboardClientProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            Dashboard Overview
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Live metrics from your agency operations.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div variants={itemVariants}>
          <Card className="bg-white dark:bg-[#111111] backdrop-blur-md border-slate-200 dark:border-white/[0.06] shadow-sm dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:border-yellow-500/50 transition-colors duration-300 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 relative z-10">
              <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Clients</CardTitle>
              <div className="p-2 bg-yellow-400/10 rounded-lg">
                <Users className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">{stats.totalClients}</div>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-medium flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> Live
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-white dark:bg-[#111111] backdrop-blur-md border-slate-200 dark:border-white/[0.06] shadow-sm dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:border-yellow-500/50 transition-colors duration-300 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 relative z-10">
              <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Projects</CardTitle>
              <div className="p-2 bg-yellow-400/10 rounded-lg">
                <Briefcase className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">{stats.activeProjects}</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Currently in progress</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-white dark:bg-[#111111] backdrop-blur-md border-slate-200 dark:border-white/[0.06] shadow-sm dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:border-yellow-500/50 transition-colors duration-300 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 relative z-10">
              <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Leads</CardTitle>
              <div className="p-2 bg-yellow-400/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">{stats.newLeads}</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Pending follow-up</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-white dark:bg-[#111111] backdrop-blur-md border-slate-200 dark:border-white/[0.06] shadow-sm dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:border-yellow-500/50 transition-colors duration-300 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 relative z-10">
              <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Revenue</CardTitle>
              <div className="p-2 bg-emerald-400/10 rounded-lg">
                <DollarSign className="w-5 h-5 text-emerald-650 dark:text-emerald-400" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">${stats.revenue.toLocaleString()}</div>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-medium flex items-center gap-1">
                Generated from paid invoices
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <motion.div variants={itemVariants} className="col-span-4">
          <Card className="bg-white dark:bg-[#111111] backdrop-blur-md border-slate-200 dark:border-white/[0.06] shadow-sm dark:shadow-xl h-full transition-colors duration-300">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-slate-100">Lead Generation Velocity</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px] w-full">
                {leadsData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={leadsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#27272a" : "#e2e8f0"} vertical={false} />
                      <XAxis dataKey="name" stroke={isDark ? "#71717a" : "#94a3b8"} axisLine={false} tickLine={false} />
                      <YAxis stroke={isDark ? "#71717a" : "#94a3b8"} axisLine={false} tickLine={false} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: isDark ? '#111111' : '#ffffff', 
                          borderColor: isDark ? 'rgba(255, 255, 255, 0.06)' : '#e2e8f0', 
                          color: isDark ? '#fff' : '#0f172a', 
                          borderRadius: '8px' 
                        }} 
                        itemStyle={{ color: '#eab308' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="leads" 
                        stroke="#eab308" 
                        strokeWidth={3} 
                        dot={{ r: 4, fill: isDark ? "#111111" : "#ffffff", stroke: "#eab308", strokeWidth: 2 }} 
                        activeDot={{ r: 6, fill: "#eab308", stroke: "#fff" }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400 dark:text-slate-500">Not enough data to display</div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants} className="col-span-3">
          <Card className="bg-white dark:bg-[#111111] backdrop-blur-md border-slate-200 dark:border-white/[0.06] shadow-sm dark:shadow-xl h-full transition-colors duration-300">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-slate-100">Active Service Distribution</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="h-[300px] w-full">
                {projectsData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={projectsData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#27272a" : "#e2e8f0"} vertical={false} />
                      <XAxis dataKey="name" stroke={isDark ? "#71717a" : "#94a3b8"} axisLine={false} tickLine={false} />
                      <YAxis stroke={isDark ? "#71717a" : "#94a3b8"} axisLine={false} tickLine={false} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: isDark ? '#111111' : '#ffffff', 
                          borderColor: isDark ? 'rgba(255, 255, 255, 0.06)' : '#e2e8f0', 
                          color: isDark ? '#fff' : '#0f172a', 
                          borderRadius: '8px' 
                        }} 
                        cursor={{fill: isDark ? '#27272a' : '#f1f5f9', opacity: 0.4}} 
                      />
                      <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400 dark:text-slate-500">No active projects found</div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
