/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, Loader2, Plus, Edit, Calendar, FolderKanban, Briefcase, CheckCircle2, Search } from "lucide-react";
import { format } from "date-fns";

interface Client {
  id: string;
  name: string;
  company: string | null;
}

interface Project {
  id: string;
  clientId: string;
  client: Client;
  service: string;
  title: string;
  status: string;
  startDate: string;
  deadline: string | null;
  notes: string | null;
}

interface ProjectsClientProps {
  initialItems: Project[];
  clients: Client[];
}

export default function ProjectsClient({ initialItems, clients }: ProjectsClientProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Modal CRUD state
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<Project | null>(null);
  const [saving, setSaving] = useState(false);
  
  const [form, setForm] = useState({
    clientId: "",
    title: "",
    service: "Digital Marketing",
    status: "Discovery",
    startDate: new Date().toISOString().split("T")[0],
    deadline: "",
    notes: "",
  });

  const openCreate = () => {
    setEditItem(null);
    setForm({
      clientId: clients[0]?.id || "",
      title: "",
      service: "Digital Marketing",
      status: "Discovery",
      startDate: new Date().toISOString().split("T")[0],
      deadline: "",
      notes: "",
    });
    setShowModal(true);
  };

  const openEdit = (p: Project) => {
    setEditItem(p);
    setForm({
      clientId: p.clientId,
      title: p.title,
      service: p.service,
      status: p.status,
      startDate: p.startDate ? p.startDate.split("T")[0] : new Date().toISOString().split("T")[0],
      deadline: p.deadline ? p.deadline.split("T")[0] : "",
      notes: p.notes || "",
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.clientId || !form.title.trim() || !form.service.trim()) {
      setError("Please fill in all required fields (Client, Title, Service).");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const url = editItem ? `/api/projects/${editItem.id}` : "/api/projects";
      const method = editItem ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          deadline: form.deadline ? new Date(form.deadline).toISOString() : null,
          startDate: new Date(form.startDate).toISOString(),
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Failed to save project.");
      setShowModal(false);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure? Deleting this project will permanently remove it and all related invoices from the database. This cannot be undone.")) return;
    setDeletingId(id);
    setError("");
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
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

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Discovery": return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
      case "In Progress": return "bg-yellow-400/10 text-yellow-650 dark:text-yellow-400 border-yellow-400/20";
      case "Review": return "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20";
      case "Completed": return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      default: return "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-450 border-slate-250 dark:border-slate-700";
    }
  };

  // Filter items
  const filteredItems = initialItems.filter((project) => {
    const matchesSearch = 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project.client?.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project.client?.company || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "All" || project.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Stats
  const total = initialItems.length;
  const activeCount = initialItems.filter(p => p.status === "In Progress" || p.status === "Review").length;
  const completedCount = initialItems.filter(p => p.status === "Completed").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white dark:bg-[#111111] p-6 rounded-xl border border-slate-200 dark:border-white/[0.06] shadow-sm gap-4 transition-colors duration-300">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-1">Projects Hub</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Track milestones, status updates, and deadlines for all active client workloads.</p>
        </div>
        <Button
          onClick={openCreate}
          disabled={clients.length === 0}
          className="bg-yellow-400 text-black hover:bg-yellow-500 font-semibold shadow-[0_0_15px_rgba(250,204,21,0.3)] hover:shadow-[0_0_25px_rgba(250,204,21,0.5)] transition-all"
        >
          <Plus className="mr-2 h-4 w-4" /> New Project
        </Button>
      </div>

      {clients.length === 0 && (
        <div className="text-yellow-600 dark:text-yellow-400 text-sm bg-yellow-400/10 p-4 rounded-xl border border-yellow-450/20">
          ⚠️ <strong>Notice:</strong> You need to create at least one client in the <a href="/admin/clients" className="underline font-bold">Clients CRM</a> before you can create projects.
        </div>
      )}

      {error && (
        <div className="text-red-400 text-sm bg-red-400/10 p-3 rounded border border-red-400/20">
          {error}
        </div>
      )}

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/[0.06] p-5 rounded-xl flex items-center justify-between transition-colors duration-300 shadow-sm">
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Total Projects</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{total}</h3>
          </div>
          <div className="p-3 rounded-lg bg-yellow-400/10 text-yellow-600 dark:text-yellow-400">
            <FolderKanban className="w-5 h-5" />
          </div>
        </div>
        <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/[0.06] p-5 rounded-xl flex items-center justify-between transition-colors duration-300 shadow-sm">
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Active Deliveries</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{activeCount}</h3>
          </div>
          <div className="p-3 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <Briefcase className="w-5 h-5" />
          </div>
        </div>
        <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/[0.06] p-5 rounded-xl flex items-center justify-between transition-colors duration-300 shadow-sm">
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Completed Works</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{completedCount}</h3>
          </div>
          <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white dark:bg-[#111111] p-4 rounded-xl border border-slate-200 dark:border-white/[0.06] transition-colors">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search projects, client, service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-lg pl-9 pr-3 py-2 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400 transition-colors"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto justify-end">
          {["All", "Discovery", "In Progress", "Review", "Completed"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all whitespace-nowrap ${
                statusFilter === status
                  ? "bg-yellow-400 text-black border-yellow-400 font-bold"
                  : "bg-slate-50 dark:bg-black border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm transition-colors duration-300">
        {filteredItems.length === 0 ? (
          <div className="p-12 text-center">
            <FolderKanban className="w-12 h-12 mx-auto mb-4 text-slate-400 dark:text-slate-700" />
            <h3 className="text-lg font-semibold text-slate-850 dark:text-slate-300">No projects found</h3>
            <p className="text-slate-500 dark:text-slate-450 text-sm mt-1">Refine your search or create a new project above.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200 dark:border-slate-800 hover:bg-transparent">
                <TableHead className="text-slate-500 dark:text-slate-400">Project Info</TableHead>
                <TableHead className="text-slate-500 dark:text-slate-400">Client</TableHead>
                <TableHead className="text-slate-500 dark:text-slate-400">Service Category</TableHead>
                <TableHead className="text-slate-500 dark:text-slate-400">Status</TableHead>
                <TableHead className="text-slate-500 dark:text-slate-400">Deadline</TableHead>
                <TableHead className="text-slate-500 dark:text-slate-400 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((project) => (
                <TableRow key={project.id} className="border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <TableCell className="font-medium text-slate-900 dark:text-slate-100">
                    <div className="flex flex-col">
                      <span className="font-semibold">{project.title}</span>
                      <span className="text-xs text-slate-500 font-mono mt-0.5">#{project.id.slice(-6).toUpperCase()}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-700 dark:text-slate-300 font-medium">
                    {project.client?.company || project.client?.name || "—"}
                  </TableCell>
                  <TableCell className="text-slate-700 dark:text-slate-300">
                    <span className="px-2 py-1 rounded-md text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300">
                      {project.service}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(project.status)}`}>
                      {project.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-slate-500 dark:text-slate-400 text-sm">
                    {project.deadline ? (
                      <span className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1.5 text-yellow-500 dark:text-yellow-400" />
                        {format(new Date(project.deadline), "MMM d, yyyy")}
                      </span>
                    ) : (
                      <span className="text-slate-400 dark:text-slate-600">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEdit(project)}
                        className="h-8 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 transition-colors"
                      >
                        <Edit className="h-4 w-4 mr-1.5" /> Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        disabled={deletingId === project.id}
                        onClick={() => handleDelete(project.id)}
                        className="h-8 w-8 text-slate-450 dark:text-slate-500 hover:text-red-550 dark:hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        {deletingId === project.id ? (
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
              {editItem ? "Edit Project Details" : "Create New Project"}
            </h2>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Client *</label>
                <select
                  value={form.clientId}
                  onChange={(e) => setForm(p => ({ ...p, clientId: e.target.value }))}
                  className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
                >
                  <option value="" disabled>Select associated client</option>
                  {clients.map((c) => (
                    <option key={c.id} value={c.id} className="text-slate-900 dark:text-slate-100 bg-white dark:bg-black">
                      {c.company ? `${c.company} (${c.name})` : c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Project Title *</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm(p => ({ ...p, title: e.target.value }))}
                  placeholder="e.g. TikTok UGC Ads Q3"
                  className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
                />
              </div>

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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Start Date *</label>
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) => setForm(p => ({ ...p, startDate: e.target.value }))}
                    className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Deadline</label>
                  <input
                    type="date"
                    value={form.deadline}
                    onChange={(e) => setForm(p => ({ ...p, deadline: e.target.value }))}
                    className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Project Status *</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm(p => ({ ...p, status: e.target.value }))}
                  className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
                >
                  <option value="Discovery" className="bg-white dark:bg-black">Discovery</option>
                  <option value="In Progress" className="bg-white dark:bg-black">In Progress</option>
                  <option value="Review" className="bg-white dark:bg-black">Review</option>
                  <option value="Completed" className="bg-white dark:bg-black">Completed</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Notes</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm(p => ({ ...p, notes: e.target.value }))}
                  placeholder="Notes, briefs, scope details..."
                  rows={3}
                  className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none transition-colors"
                />
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
