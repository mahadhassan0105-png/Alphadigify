"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, UserPlus, MessageSquare, FolderKanban, FileSpreadsheet, Settings, Building2, Image as ImageIcon, BookOpen, MessageSquareQuote, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Leads", href: "/admin/leads", icon: UserPlus },
  { name: "AI Chats", href: "/admin/chats", icon: MessageSquare },
  { name: "Clients", href: "/admin/clients", icon: Building2 },
  { name: "Projects", href: "/admin/projects", icon: FolderKanban },
  { name: "Portfolio", href: "/admin/portfolio", icon: ImageIcon },
  { name: "Case Studies", href: "/admin/case-studies", icon: BookOpen },
  { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
  { name: "Invoices", href: "/admin/invoices", icon: FileSpreadsheet },
  { name: "Team", href: "/admin/team", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

interface SidebarProps {
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen?.(false)}
        />
      )}

      <aside 
        className={cn(
          "h-full w-64 bg-white dark:bg-black border-r border-slate-200 dark:border-zinc-800 flex flex-col shrink-0 transition-all duration-300 z-50",
          "fixed inset-y-0 left-0 md:static md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200 dark:border-zinc-800 relative overflow-hidden">
          <Link href="/" className="flex items-center space-x-2 font-bold text-xl tracking-tight z-10 text-slate-900 dark:text-white relative">
            <div className="w-8 h-8 rounded-lg overflow-hidden relative shadow-lg shrink-0">
              <Image 
                src="/alphadigify-logo.jpg" 
                alt="Alphadigify Logo" 
                fill
                className="object-cover"
                priority
              />
            </div>
            <span>Alphadigify</span>
          </Link>
          <button
            onClick={() => setIsOpen?.(false)}
            className="md:hidden text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            title="Close Menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
          <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 tracking-widest uppercase mb-4 px-2">Menu</div>
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen?.(false)}
                className={cn(
                  "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
                  isActive 
                    ? "bg-yellow-400/10 dark:bg-zinc-900 text-yellow-600 dark:text-yellow-400 shadow-sm font-semibold" 
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-900/50 hover:text-slate-900 dark:hover:text-slate-100"
                )}
              >
                <Icon className={cn("mr-3 h-5 w-5 transition-colors", isActive ? "text-yellow-600 dark:text-yellow-400" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-zinc-300")} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

