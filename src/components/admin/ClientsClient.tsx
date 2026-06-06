/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, Loader2, Building2, Plus, Edit, Mail, Users, ShieldAlert } from "lucide-react";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service: string;
  status: string;
  createdAt: string;
  _count: {
    projects: number;
  };
}

interface ClientsClientProps {
  initialItems: Client[];
}

export default function ClientsClient({ initialItems }: ClientsClientProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  // Modal CRUD state
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<Client | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "Digital Marketing",
    status: "Active",
  });

  const openCreate = () => {
    setEditItem(null);
    setForm({
      name: "",
      email: "",
      company: "",
      phone: "",
      service: "Digital Marketing",
      status: "Active",
    });
    setShowModal(true);
  };

  const openEdit = (c: Client) => {
    setEditItem(c);
    setForm({
      name: c.name,
      email: c.email,
      company: c.company || "",
      phone: c.phone || "",
      service: c.service,
      status: c.status,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.service.trim()) {
      setError("Please fill in all required fields.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const url = editItem ? `/api/clients/${editItem.id}` : "/api/clients";
      const method = editItem ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Failed to save client.");
      setShowModal(false);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure? Deleting this client will permanently remove all their projects and invoices. This cannot be undone.")) return;
    setDeletingId(id);
    setError("");
    try {
      const res = await fetch(`/api/clients/${id}`, { method: "DELETE" });
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

  // Stats calculation
  const total = initialItems.length;
  const activeCount = initialItems.filter(c => c.status === "Active").length;
  const projectSum = initialItems.reduce((acc, c) => acc + c._count.projects, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white dark:bg-[#111111] p-6 rounded-xl border border-slate-200 dark:border-white/[0.06] shadow-sm gap-4 transition-colors duration-300">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-1">Clients CRM</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Manage your agency client list, profiles, and active projects.</p>
        </div>
        <Button
          onClick={openCreate}
          className="bg-yellow-400 text-black hover:bg-yellow-500 font-semibold shadow-[0_0_15px_rgba(250,204,21,0.3)] hover:shadow-[0_0_25px_rgba(250,204,21,0.5)] transition-all"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Client
        </Button>
      </div>

      {error && (
        <div className="text-red-400 text-sm bg-red-400/10 p-3 rounded border border-red-400/20">
          {error}
        </div>
      )}

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/[0.06] p-5 rounded-xl flex items-center justify-between transition-colors duration-300 shadow-sm">
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Total Clients</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{total}</h3>
          </div>
          <div className="p-3 rounded-lg bg-yellow-400/10 text-yellow-600 dark:text-yellow-400">
            <Building2 className="w-5 h-5" />
          </div>
        </div>
        <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/[0.06] p-5 rounded-xl flex items-center justify-between transition-colors duration-300 shadow-sm">
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Active Accounts</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{activeCount}</h3>
          </div>
          <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Users className="w-5 h-5" />
          </div>
        </div>
        <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/[0.06] p-5 rounded-xl flex items-center justify-between transition-colors duration-300 shadow-sm">
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Active Projects</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{projectSum}</h3>
          </div>
          <div className="p-3 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#111111] rounded-xl border border-slate-200 dark:border-white/[0.06] overflow-hidden shadow-sm transition-colors duration-300">
        {initialItems.length === 0 ? (
          <div className="p-12 text-center">
            <Building2 className="w-12 h-12 mx-auto mb-4 text-slate-400 dark:text-slate-700" />
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-300">No clients yet</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Click &quot;Add Client&quot; to register your first agency account.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200 dark:border-zinc-800 hover:bg-transparent">
                <TableHead className="text-slate-500 dark:text-slate-400">Name</TableHead>
                <TableHead className="text-slate-500 dark:text-slate-400">Company</TableHead>
                <TableHead className="text-slate-500 dark:text-slate-400">Primary Service</TableHead>
                <TableHead className="text-slate-500 dark:text-slate-400 text-center w-[100px]">Projects</TableHead>
                <TableHead className="text-slate-500 dark:text-slate-400">Status</TableHead>
                <TableHead className="text-slate-500 dark:text-slate-400 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {initialItems.map((c) => (
                <TableRow key={c.id} className="border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-900/50 transition-colors">
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900 dark:text-slate-100">{c.name}</span>
                      <span className="text-xs text-slate-500 flex items-center mt-1">
                        <Mail className="w-3 h-3 mr-1" /> {c.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-700 dark:text-slate-300 font-medium">{c.company || "—"}</TableCell>
                  <TableCell>
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold border bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 border-yellow-400/20">
                      {c.service}
                    </span>
                  </TableCell>
                  <TableCell className="text-center font-bold text-slate-700 dark:text-slate-300">
                    {c._count.projects}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                      c.status === "Active" 
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" 
                        : "bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-zinc-800"
                    }`}>
                      {c.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEdit(c)}
                        className="h-8 bg-slate-50 dark:bg-zinc-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-zinc-800 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-zinc-800 transition-colors"
                      >
                        <Edit className="h-4 w-4 mr-1.5" /> Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        disabled={deletingId === c.id}
                        onClick={() => handleDelete(c.id)}
                        className="h-8 w-8 text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        {deletingId === c.id ? (
                          <Loader2 className="w-4 h-4 animate-spin text-red-500 dark:text-red-400" />
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
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/[0.06] rounded-2xl w-full max-w-md p-6 space-y-5 shadow-2xl transition-colors duration-300">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {editItem ? "Edit Client Profile" : "Add Client Profile"}
            </h2>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Client Name *</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))}
                  placeholder="e.g. John Doe"
                  className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email Address *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))}
                  placeholder="e.g. john@techflow.com"
                  className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Company</label>
                  <input
                    value={form.company}
                    onChange={(e) => setForm(p => ({ ...p, company: e.target.value }))}
                    placeholder="e.g. TechFlow LLC"
                    className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Phone</label>
                  <input
                    value={form.phone}
                    onChange={(e) => setForm(p => ({ ...p, phone: e.target.value }))}
                    placeholder="e.g. +1 555-0199"
                    className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Service Category *</label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm(p => ({ ...p, service: e.target.value }))}
                    className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
                  >
                    <option value="Digital Marketing" className="bg-white dark:bg-black">Digital Marketing</option>
                    <option value="SEO Mastery" className="bg-white dark:bg-black">SEO Mastery</option>
                    <option value="Web Design" className="bg-white dark:bg-black">Web Design</option>
                    <option value="TikTok Shop Management" className="bg-white dark:bg-black">TikTok Shop Management</option>
                    <option value="Amazon FBA" className="bg-white dark:bg-black">Amazon FBA</option>
                    <option value="AI Solutions" className="bg-white dark:bg-black">AI Solutions</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Account Status *</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm(p => ({ ...p, status: e.target.value }))}
                    className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
                  >
                    <option value="Active" className="bg-white dark:bg-black">Active</option>
                    <option value="Inactive" className="bg-white dark:bg-black">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowModal(false)}
                className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={saving}
                className="bg-yellow-400 text-black hover:bg-yellow-500 font-bold min-w-[120px] shadow-[0_0_15px_rgba(250,204,21,0.3)]"
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
