"use client";

import { signOut, useSession } from "next-auth/react";
import { LogOut, Bell, User as UserIcon, Menu } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

interface TopbarProps {
  onToggleSidebar?: () => void;
}

export default function Topbar({ onToggleSidebar }: TopbarProps) {
  const { data: session } = useSession();

  return (
    <header className="h-16 border-b border-slate-200 dark:border-zinc-800 bg-white/80 dark:bg-black/50 backdrop-blur-md flex items-center justify-between px-4 md:px-6 shrink-0 sticky top-0 z-10 transition-colors duration-300">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-900 transition-colors focus:outline-none"
          title="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          Alphadigify Admin
        </div>
      </div>

      <div className="flex items-center space-x-4 md:space-x-6">
        <ThemeToggle />

        <button className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-500 rounded-full"></span>
        </button>

        <div className="flex items-center space-x-2 md:space-x-3 pl-4 md:pl-6 border-l border-slate-200 dark:border-zinc-800">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{session?.user?.name || 'Loading...'}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">{session?.user?.role || 'Admin'}</span>
          </div>
          <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-zinc-900 flex items-center justify-center text-slate-600 dark:text-slate-300">
            <UserIcon className="w-5 h-5" />
          </div>
          <button 
            onClick={() => signOut()}
            className="ml-1 md:ml-2 text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors p-2"
            title="Log out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

