/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow,
} from "@/components/ui/table";
import { Eye, Edit, Trash2, Loader2, BookOpen, Plus } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

interface CaseStudy {
  id: string;
  slug: string;
  client: string;
  title: string;
  category: string;
  service: string;
  featured: boolean;
  createdAt: string;
}

interface CaseStudiesClientProps {
  initialItems: CaseStudy[];
}

export default function CaseStudiesClient({ initialItems }: CaseStudiesClientProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this case study? This cannot be undone.")) return;
    setDeletingId(id);
    setError("");
    try {
      const res = await fetch(`/api/case-studies/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to delete case study.");
      }
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setDeletingId(null);
    }
  };

  // Stats
  const total = initialItems.length;
  const featured = initialItems.filter((s) => s.featured).length;
  const categories = new Set(initialItems.map((s) => s.category)).size;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white dark:bg-[#111111] p-6 rounded-xl border border-slate-200 dark:border-white/[0.06] shadow-sm gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-1">Case Studies Manager</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Create, edit, and remove case studies displayed on the public site.
          </p>
        </div>
        <Link href="/admin/case-studies/new">
          <Button className="bg-yellow-400 text-black hover:bg-yellow-500 font-semibold shadow-[0_0_15px_rgba(250,204,21,0.3)] hover:shadow-[0_0_25px_rgba(250,204,21,0.5)] transition-all">
            <Plus className="mr-2 h-4 w-4" /> Add Case Study
          </Button>
        </Link>
      </div>

      {error && (
        <div className="text-red-400 text-sm bg-red-400/10 p-3 rounded border border-red-400/20">
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/[0.06] p-5 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Total Studies</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{total}</h3>
          </div>
          <div className="p-3 rounded-lg bg-yellow-400/10 text-yellow-600 dark:text-yellow-400">
            <BookOpen className="w-5 h-5" />
          </div>
        </div>
        <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/[0.06] p-5 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Featured</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{featured}</h3>
          </div>
          <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Eye className="w-5 h-5" />
          </div>
        </div>
        <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/[0.06] p-5 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Categories</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{categories}</h3>
          </div>
          <div className="p-3 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <Edit className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#111111] rounded-xl border border-slate-200 dark:border-white/[0.06] overflow-hidden shadow-sm">
        {initialItems.length === 0 ? (
          <div className="p-12 text-center">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-slate-300 dark:text-slate-700" />
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-300">No case studies yet</h3>
            <p className="text-slate-500 text-sm mt-1">Click "Add Case Study" to create your first one.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200 dark:border-white/[0.06] hover:bg-transparent">
                  <TableHead className="text-slate-500 dark:text-slate-400 w-[110px]">Created</TableHead>
                  <TableHead className="text-slate-500 dark:text-slate-400">Client</TableHead>
                  <TableHead className="text-slate-500 dark:text-slate-400">Title</TableHead>
                  <TableHead className="text-slate-500 dark:text-slate-400">Category</TableHead>
                  <TableHead className="text-slate-500 dark:text-slate-400">Service</TableHead>
                  <TableHead className="text-slate-500 dark:text-slate-400 text-center w-[80px]">Featured</TableHead>
                  <TableHead className="text-slate-500 dark:text-slate-400 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {initialItems.map((cs) => (
                  <TableRow key={cs.id} className="border-slate-200 dark:border-white/[0.06] hover:bg-slate-100/50 dark:hover:bg-white/[0.02]">
                    <TableCell className="text-slate-500 dark:text-slate-400 text-sm">
                      {format(new Date(cs.createdAt), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell className="font-medium text-slate-900 dark:text-slate-100">{cs.client}</TableCell>
                    <TableCell className="text-slate-700 dark:text-slate-300 max-w-[200px] truncate">{cs.title}</TableCell>
                    <TableCell>
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold border bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 border-yellow-400/20">
                        {cs.category}
                      </span>
                    </TableCell>
                    <TableCell className="text-slate-500 dark:text-slate-400 text-sm">{cs.service}</TableCell>
                    <TableCell className="text-center">
                      {cs.featured ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Yes
                        </span>
                      ) : (
                        <span className="text-slate-400 dark:text-slate-600 text-xs">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/case-studies/${cs.slug}`} target="_blank">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 bg-slate-100 dark:bg-zinc-950 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-zinc-900 hover:text-slate-900 dark:hover:text-white border dark:border-zinc-800"
                          >
                            <Eye className="h-4 w-4 mr-1.5" /> View
                          </Button>
                        </Link>
                        <Link href={`/admin/case-studies/edit/${cs.id}`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 bg-slate-100 dark:bg-zinc-950 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-zinc-900 hover:text-slate-900 dark:hover:text-white border dark:border-zinc-800"
                          >
                            <Edit className="h-4 w-4 mr-1.5" /> Edit
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={deletingId === cs.id}
                          onClick={() => handleDelete(cs.id)}
                          className="h-8 w-8 text-slate-500 hover:text-red-400 hover:bg-red-500/10 border dark:border-transparent dark:hover:border-red-500/20 transition-colors"
                        >
                          {deletingId === cs.id ? (
                            <Loader2 className="w-4 h-4 animate-spin text-red-400" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
