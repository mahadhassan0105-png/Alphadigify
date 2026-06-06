/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow,
} from "@/components/ui/table";
import { Trash2, Loader2, MessageSquareQuote, Plus, Edit, Star } from "lucide-react";

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  initials: string;
  avatarBg: string;
  service: string;
  dotColor: string;
  stars: number;
  createdAt: string;
}

interface TestimonialsClientProps {
  initialItems: Testimonial[];
}

export default function TestimonialsClient({ initialItems }: TestimonialsClientProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<Testimonial | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    quote: "",
    name: "",
    role: "",
    initials: "",
    avatarBg: "linear-gradient(135deg, #3B82F6, #1D4ED8)",
    service: "",
    dotColor: "#60A5FA",
    stars: 5,
  });

  const openCreate = () => {
    setEditItem(null);
    setForm({
      quote: "", name: "", role: "", initials: "",
      avatarBg: "linear-gradient(135deg, #3B82F6, #1D4ED8)",
      service: "", dotColor: "#60A5FA", stars: 5,
    });
    setShowModal(true);
  };

  const openEdit = (t: Testimonial) => {
    setEditItem(t);
    setForm({
      quote: t.quote, name: t.name, role: t.role, initials: t.initials,
      avatarBg: t.avatarBg, service: t.service, dotColor: t.dotColor, stars: t.stars,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.quote.trim() || !form.name.trim() || !form.role.trim() || !form.service.trim()) {
      setError("Please fill in all required fields.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const url = editItem ? `/api/testimonials/${editItem.id}` : "/api/testimonials";
      const method = editItem ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          initials: form.initials || form.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2),
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Failed to save.");
      setShowModal(false);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial? This cannot be undone.")) return;
    setDeletingId(id);
    setError("");
    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to delete.");
      }
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const total = initialItems.length;
  const avgStars = total > 0 ? (initialItems.reduce((s, t) => s + t.stars, 0) / total).toFixed(1) : "0";
  const services = new Set(initialItems.map(t => t.service)).size;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white dark:bg-[#111111] p-6 rounded-xl border border-slate-200 dark:border-white/[0.06] shadow-sm gap-4 transition-colors duration-300">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-1">Testimonials Manager</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Add, edit, and remove client reviews displayed on the public site.
          </p>
        </div>
        <Button
          onClick={openCreate}
          className="bg-yellow-400 text-black hover:bg-yellow-500 font-semibold shadow-[0_0_15px_rgba(250,204,21,0.3)] hover:shadow-[0_0_25px_rgba(250,204,21,0.5)] transition-all"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Testimonial
        </Button>
      </div>

      {error && (
        <div className="text-red-400 text-sm bg-red-400/10 p-3 rounded border border-red-400/20">
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/[0.06] p-5 rounded-xl flex items-center justify-between shadow-sm transition-colors duration-300">
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Total Reviews</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{total}</h3>
          </div>
          <div className="p-3 rounded-lg bg-yellow-400/10 text-yellow-600 dark:text-yellow-400">
            <MessageSquareQuote className="w-5 h-5" />
          </div>
        </div>
        <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/[0.06] p-5 rounded-xl flex items-center justify-between shadow-sm transition-colors duration-300">
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Avg Rating</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{avgStars} ★</h3>
          </div>
          <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Star className="w-5 h-5" />
          </div>
        </div>
        <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/[0.06] p-5 rounded-xl flex items-center justify-between shadow-sm transition-colors duration-300">
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Services</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{services}</h3>
          </div>
          <div className="p-3 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <Edit className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#111111] rounded-xl border border-slate-200 dark:border-white/[0.06] overflow-hidden shadow-sm transition-colors duration-300">
        {initialItems.length === 0 ? (
          <div className="p-12 text-center">
            <MessageSquareQuote className="w-12 h-12 mx-auto mb-4 text-slate-300 dark:text-slate-700" />
            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">No testimonials yet</h3>
            <p className="text-slate-500 dark:text-slate-500 text-sm mt-1">Click &quot;Add Testimonial&quot; to create your first one.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200 dark:border-zinc-800 hover:bg-transparent">
                  <TableHead className="text-slate-500 dark:text-slate-400">Client</TableHead>
                  <TableHead className="text-slate-500 dark:text-slate-400">Quote</TableHead>
                  <TableHead className="text-slate-500 dark:text-slate-400">Service</TableHead>
                  <TableHead className="text-slate-500 dark:text-slate-400 text-center w-[80px]">Stars</TableHead>
                  <TableHead className="text-slate-500 dark:text-slate-400 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {initialItems.map((t) => (
                  <TableRow key={t.id} className="border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-900/40 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-sm"
                        style={{ background: t.avatarBg }}
                      >
                        <span className="text-[10px] font-bold text-white tracking-wider">{t.initials}</span>
                      </div>
                      <div>
                        <span className="font-medium text-slate-900 dark:text-slate-100 block">{t.name}</span>
                        <span className="text-xs text-slate-500">{t.role}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-300 max-w-[300px] truncate text-sm italic">
                    &ldquo;{t.quote}&rdquo;
                  </TableCell>
                  <TableCell>
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold border bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 border-yellow-400/20">
                      {t.service}
                    </span>
                  </TableCell>
                  <TableCell className="text-center text-yellow-600 dark:text-yellow-400 text-sm font-bold">
                    {t.stars}★
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEdit(t)}
                        className="h-8 bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-zinc-900 dark:text-slate-300 dark:hover:bg-zinc-800 dark:hover:text-white transition-colors"
                      >
                        <Edit className="h-4 w-4 mr-1.5" /> Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        disabled={deletingId === t.id}
                        onClick={() => handleDelete(t.id)}
                        className="h-8 w-8 text-slate-400 hover:text-red-650 dark:text-slate-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                      >
                        {deletingId === t.id ? (
                          <Loader2 className="w-4 h-4 animate-spin text-red-655 dark:text-red-400" />
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/[0.06] rounded-2xl w-full max-w-lg p-6 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto transition-colors duration-300">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {editItem ? "Edit Testimonial" : "Add Testimonial"}
            </h2>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Client Name *</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))}
                  placeholder="e.g. Ahmed Khan"
                  className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Role *</label>
                  <input
                    value={form.role}
                    onChange={(e) => setForm(p => ({ ...p, role: e.target.value }))}
                    placeholder="e.g. Amazon Seller — UAE"
                    className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Service *</label>
                  <input
                    value={form.service}
                    onChange={(e) => setForm(p => ({ ...p, service: e.target.value }))}
                    placeholder="e.g. Amazon, SEO"
                    className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Quote *</label>
                <textarea
                  value={form.quote}
                  onChange={(e) => setForm(p => ({ ...p, quote: e.target.value }))}
                  placeholder="What did the client say?"
                  rows={4}
                  className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-y"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Initials</label>
                  <input
                    value={form.initials}
                    onChange={(e) => setForm(p => ({ ...p, initials: e.target.value.toUpperCase().slice(0, 3) }))}
                    placeholder="AK"
                    maxLength={3}
                    className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 font-mono text-center"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Dot Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={form.dotColor}
                      onChange={(e) => setForm(p => ({ ...p, dotColor: e.target.value }))}
                      className="w-10 h-10 rounded border border-slate-200 dark:border-zinc-800 cursor-pointer bg-transparent"
                    />
                    <span className="text-xs text-slate-500 font-mono">{form.dotColor}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Stars</label>
                  <select
                    value={form.stars}
                    onChange={(e) => setForm(p => ({ ...p, stars: Number(e.target.value) }))}
                    className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    {[5, 4, 3, 2, 1].map(n => (
                      <option key={n} value={n} className="text-slate-900 bg-white dark:bg-[#111111]">{n} ★</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Avatar Gradient</label>
                <input
                  value={form.avatarBg}
                  onChange={(e) => setForm(p => ({ ...p, avatarBg: e.target.value }))}
                  placeholder="linear-gradient(135deg, #3B82F6, #1D4ED8)"
                  className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 font-mono text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowModal(false)}
                className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-900 transition-colors"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={saving}
                className="bg-yellow-400 text-black hover:bg-yellow-500 font-bold min-w-[120px] shadow-[0_0_15px_rgba(250,204,21,0.3)] transition-all"
              >
                {saving ? (
                  <span className="flex items-center"><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</span>
                ) : editItem ? "Update" : "Publish"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
