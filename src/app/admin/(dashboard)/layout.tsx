"use client";

import { ReactNode, useState } from "react";
import Sidebar from "@/components/admin/layout/Sidebar";
import Topbar from "@/components/admin/layout/Topbar";
import { AuthGuard } from "@/components/admin/layout/AuthGuard";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthGuard>
      <div className="fixed inset-0 flex bg-slate-50 dark:bg-black text-slate-900 dark:text-slate-50 overflow-hidden font-sans transition-colors duration-300">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Topbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <main className="flex flex-col flex-1 overflow-y-auto bg-slate-50 dark:bg-black scroll-smooth">
            <div className="flex-1 p-4 md:p-6 min-h-max">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}

