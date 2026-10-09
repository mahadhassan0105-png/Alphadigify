/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Edit, Trash2, Loader2, Newspaper, Plus, Search } from "lucide-react";
import Link from "next/link";

interface ArticleAdminItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  authorName: string;
  readTime: string;
  published: boolean;
  featured: boolean;
  createdAt: string;
}

import ConfirmModal from "@/components/admin/ConfirmModal";

interface ArticlesClientProps {
  initialItems: ArticleAdminItem[];
}

export default function ArticlesClient({ initialItems }: ArticlesClientProps) {
  const router = useRouter();
  const [items, setItems] = useState<ArticleAdminItem[]>(initialItems);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleConfirmDelete = async () => {
    if (!confirmDeleteId) return;
    setIsDeleting(true);
    setError("");
    try {
      const res = await fetch(`/api/articles/${confirmDeleteId}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to delete article.");
      }
      setItems((prev) => prev.filter((item) => item.id !== confirmDeleteId));
      setConfirmDeleteId(null);
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.authorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const total = items.length;
  const publishedCount = items.filter((a) => a.published).length;
  const categoriesCount = new Set(items.map((a) => a.category)).size;

  return (
    <div className="space-y-6">
      
      {/* Header & New Article Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Newspaper className="w-6 h-6 text-yellow-500" />
            Articles &amp; Content Hub
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage, write, and optimize articles for SEO and client education.
          </p>
        </div>
        <Link href="/admin/articles/new">
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-bold shadow-md">
            <Plus className="w-4 h-4 mr-2" /> Write New Article
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Articles</p>
          <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">{total}</p>
        </div>
        <div className="p-5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Published</p>
          <p className="text-3xl font-black text-green-500 mt-1">{publishedCount}</p>
        </div>
        <div className="p-5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Categories</p>
          <p className="text-3xl font-black text-yellow-500 mt-1">{categoriesCount}</p>
        </div>
      </div>

      {/* Error alert */}
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
          {error}
        </div>
      )}

      {/* Filter / Search Bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search articles by title, category, author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
      </div>

      {/* Articles Table */}
      <div className="border border-slate-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900/40 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/80">
              <TableHead className="font-bold">Title</TableHead>
              <TableHead className="font-bold">Category</TableHead>
              <TableHead className="font-bold">Author</TableHead>
              <TableHead className="font-bold">Read Time</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="text-right font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-slate-400">
                  No articles found. Click "Write New Article" to create your first article!
                </TableCell>
              </TableRow>
            ) : (
              filteredItems.map((article) => (
                <TableRow
                  key={article.id}
                  className="border-b border-slate-100 dark:border-zinc-800/60 hover:bg-slate-50 dark:hover:bg-zinc-800/40 transition-colors"
                >
                  <TableCell className="font-semibold text-slate-900 dark:text-white max-w-xs truncate">
                    {article.title}
                  </TableCell>
                  <TableCell>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 border border-yellow-400/20">
                      {article.category}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-slate-600 dark:text-slate-300">
                    {article.authorName}
                  </TableCell>
                  <TableCell className="text-xs text-slate-400">
                    {article.readTime}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        article.published
                          ? "bg-green-500/10 text-green-500 border border-green-500/20"
                          : "bg-slate-500/10 text-slate-400 border border-slate-500/20"
                      }`}
                    >
                      {article.published ? "Published" : "Draft"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/articles/${article.slug}`}
                        target="_blank"
                        className="p-2 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
                        title="View Live Article"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/articles/edit/${article.id}`}
                        className="p-2 rounded-lg text-slate-400 hover:text-yellow-500 hover:bg-yellow-400/10 transition-colors"
                        title="Edit Article"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => setConfirmDeleteId(article.id)}
                        className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                        title="Delete Article"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <ConfirmModal
        isOpen={!!confirmDeleteId}
        onClose={() => setConfirmDeleteId(null)}
        onConfirm={handleConfirmDelete}
        loading={isDeleting}
        title="Delete Article"
        description="Are you sure you want to delete this article? This action cannot be undone and will permanently remove it from the database."
        confirmText="Delete Article"
      />
    </div>
  );
}
