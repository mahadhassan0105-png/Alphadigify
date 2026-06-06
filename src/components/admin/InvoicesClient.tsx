/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, Loader2, Plus, Edit, Calendar, FileSpreadsheet, DollarSign, Clock, CheckCircle, Search, DownloadCloud } from "lucide-react";
import { format } from "date-fns";

interface Client {
  id: string;
  name: string;
  company: string | null;
}

interface Project {
  id: string;
  clientId: string;
  title: string;
}

interface Invoice {
  id: string;
  clientId: string;
  client: Client;
  projectId: string | null;
  project: Project | null;
  amount: number;
  currency: string;
  status: string;
  dueDate: string;
  paidAt: string | null;
  notes: string | null;
  createdAt: string;
}

interface InvoicesClientProps {
  initialItems: Invoice[];
  clients: Client[];
  projects: Project[];
}

export default function InvoicesClient({ initialItems, clients, projects }: InvoicesClientProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Modal CRUD state
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<Invoice | null>(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    clientId: "",
    projectId: "",
    amount: "",
    currency: "USD",
    status: "Unpaid",
    dueDate: new Date().toISOString().split("T")[0],
    paidAt: "",
    notes: "",
  });

  // Filtered projects for the modal based on selected client
  const [modalProjects, setModalProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (form.clientId) {
      const filtered = projects.filter(p => p.clientId === form.clientId);
      setModalProjects(filtered);
      // If the selected project is no longer valid, reset it
      if (form.projectId && !filtered.some(p => p.id === form.projectId)) {
        setForm(prev => ({ ...prev, projectId: "" }));
      }
    } else {
      setModalProjects([]);
      setForm(prev => ({ ...prev, projectId: "" }));
    }
  }, [form.clientId, projects, form.projectId]);

  const openCreate = () => {
    setEditItem(null);
    setForm({
      clientId: clients[0]?.id || "",
      projectId: "",
      amount: "",
      currency: "USD",
      status: "Unpaid",
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // 14 days default
      paidAt: "",
      notes: "",
    });
    setShowModal(true);
  };

  const openEdit = (i: Invoice) => {
    setEditItem(i);
    setForm({
      clientId: i.clientId,
      projectId: i.projectId || "",
      amount: i.amount.toString(),
      currency: i.currency,
      status: i.status,
      dueDate: i.dueDate ? i.dueDate.split("T")[0] : "",
      paidAt: i.paidAt ? i.paidAt.split("T")[0] : "",
      notes: i.notes || "",
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.clientId || !form.amount || !form.dueDate) {
      setError("Please fill in all required fields (Client, Amount, Due Date).");
      return;
    }
    if (parseFloat(form.amount) <= 0) {
      setError("Invoice amount must be greater than 0.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const url = editItem ? `/api/invoices/${editItem.id}` : "/api/invoices";
      const method = editItem ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          amount: parseFloat(form.amount),
          projectId: form.projectId || null,
          paidAt: form.status === "Paid" ? (form.paidAt ? new Date(form.paidAt).toISOString() : new Date().toISOString()) : null,
          dueDate: new Date(form.dueDate).toISOString(),
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Failed to save invoice.");
      setShowModal(false);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure? Deleting this invoice is permanent and cannot be undone.")) return;
    setDeletingId(id);
    setError("");
    try {
      const res = await fetch(`/api/invoices/${id}`, { method: "DELETE" });
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
      case "Paid": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Unpaid": return "bg-yellow-400/10 text-yellow-400 border-yellow-400/20";
      case "Overdue": return "bg-red-500/10 text-red-400 border-red-500/20";
      default: return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  const formatMoney = (amount: number, currency = "USD") => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);
  };

  // Filter items
  const filteredItems = initialItems.filter((invoice) => {
    const matchesSearch = 
      (invoice.client?.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (invoice.client?.company || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (invoice.project?.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      `inv-${invoice.id.slice(-6)}`.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "All" || invoice.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Stats calculation
  const totalSum = initialItems.reduce((acc, item) => acc + item.amount, 0);
  const paidSum = initialItems.filter(i => i.status === "Paid").reduce((acc, item) => acc + item.amount, 0);
  const unpaidSum = initialItems.filter(i => i.status !== "Paid").reduce((acc, item) => acc + item.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white dark:bg-[#111111] p-6 rounded-xl border border-slate-200 dark:border-white/[0.06] shadow-sm gap-4 transition-colors duration-300">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-1">Billing & Invoices</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Manage client payments, view overdue accounts, and generate new invoices.</p>
        </div>
        <Button
          onClick={openCreate}
          disabled={clients.length === 0}
          className="bg-yellow-400 text-black hover:bg-yellow-500 font-semibold shadow-[0_0_15px_rgba(250,204,21,0.3)] hover:shadow-[0_0_25px_rgba(250,204,21,0.5)] transition-all"
        >
          <Plus className="mr-2 h-4 w-4" /> Create Invoice
        </Button>
      </div>

      {clients.length === 0 && (
        <div className="text-yellow-400 text-sm bg-yellow-400/10 p-4 rounded-xl border border-yellow-400/20">
          ⚠️ <strong>Notice:</strong> You need to create at least one client in <a href="/admin/clients" className="underline font-bold">Clients CRM</a> before you can issue invoices.
        </div>
      )}

      {error && (
        <div className="text-red-400 text-sm bg-red-400/10 p-3 rounded border border-red-400/20">
          {error}
        </div>
      )}

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/[0.06] p-5 rounded-xl flex items-center justify-between shadow-sm transition-colors duration-300">
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Gross Invoiced</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{formatMoney(totalSum)}</h3>
          </div>
          <div className="p-3 rounded-lg bg-yellow-400/10 text-yellow-600 dark:text-yellow-400">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>
        <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/[0.06] p-5 rounded-xl flex items-center justify-between shadow-sm transition-colors duration-300">
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Collected Payments</p>
            <h3 className="text-2xl font-bold text-emerald-650 dark:text-emerald-450">{formatMoney(paidSum)}</h3>
          </div>
          <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>
        <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/[0.06] p-5 rounded-xl flex items-center justify-between shadow-sm transition-colors duration-300">
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Pending Receivables</p>
            <h3 className="text-2xl font-bold text-yellow-650 dark:text-yellow-400">{formatMoney(unpaidSum)}</h3>
          </div>
          <div className="p-3 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400">
            <Clock className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white dark:bg-[#111111] p-4 rounded-xl border border-slate-200 dark:border-white/[0.06] transition-colors duration-300 shadow-sm">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search Invoice ID, client, project..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-100 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-lg pl-9 pr-3 py-2 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400 transition-colors"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto justify-end">
          {["All", "Paid", "Unpaid", "Overdue"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all whitespace-nowrap ${
                statusFilter === status
                  ? "bg-yellow-400 text-black border-yellow-400 font-bold"
                  : "bg-white dark:bg-black border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#111111] rounded-xl border border-slate-200 dark:border-white/[0.06] overflow-x-auto shadow-sm transition-colors duration-300">
        {filteredItems.length === 0 ? (
          <div className="p-12 text-center">
            <FileSpreadsheet className="w-12 h-12 mx-auto mb-4 text-slate-300 dark:text-slate-700" />
            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">No invoices found</h3>
            <p className="text-slate-500 dark:text-slate-500 text-sm mt-1">Refine your search or create a new invoice above.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200 dark:border-zinc-800 hover:bg-transparent">
                <TableHead className="text-slate-500 dark:text-slate-400">Invoice ID</TableHead>
                <TableHead className="text-slate-500 dark:text-slate-400">Client</TableHead>
                <TableHead className="text-slate-500 dark:text-slate-400">Project / Description</TableHead>
                <TableHead className="text-slate-500 dark:text-slate-400">Amount</TableHead>
                <TableHead className="text-slate-500 dark:text-slate-400">Due Date</TableHead>
                <TableHead className="text-slate-500 dark:text-slate-400">Status</TableHead>
                <TableHead className="text-slate-500 dark:text-slate-400 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((invoice) => (
                <TableRow key={invoice.id} className="border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-900/40 transition-colors">
                  <TableCell className="font-medium text-slate-600 dark:text-slate-300 font-mono text-sm">
                    INV-{invoice.id.slice(-6).toUpperCase()}
                  </TableCell>
                  <TableCell className="font-medium text-slate-900 dark:text-slate-100">
                    {invoice.client?.company || invoice.client?.name || "—"}
                  </TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-300">
                    {invoice.project?.title || invoice.notes || "General Billing"}
                  </TableCell>
                  <TableCell className="font-bold text-slate-900 dark:text-slate-100">
                    {formatMoney(invoice.amount, invoice.currency)}
                  </TableCell>
                  <TableCell className="text-slate-500 dark:text-slate-400 text-sm">
                    <span className="flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400 dark:text-slate-500" />
                      {format(new Date(invoice.dueDate), "MMM d, yyyy")}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          alert(`Receipt Download Simulation:\nInvoice ID: INV-${invoice.id.toUpperCase()}\nClient: ${invoice.client?.name}\nAmount: ${formatMoney(invoice.amount, invoice.currency)}\nStatus: ${invoice.status}`);
                        }}
                        className="h-8 w-8 text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-zinc-900 hover:bg-slate-200 dark:hover:bg-zinc-800 hover:text-slate-900 dark:hover:text-white transition-colors"
                        title="Download Invoice Summary"
                      >
                        <DownloadCloud className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEdit(invoice)}
                        className="h-8 bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-zinc-900 dark:text-slate-300 dark:hover:bg-zinc-800 dark:hover:text-white transition-colors"
                      >
                        <Edit className="h-4 w-4 mr-1.5" /> Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        disabled={deletingId === invoice.id}
                        onClick={() => handleDelete(invoice.id)}
                        className="h-8 w-8 text-slate-400 hover:text-red-650 dark:text-slate-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                      >
                        {deletingId === invoice.id ? (
                          <Loader2 className="w-4 h-4 animate-spin text-red-650 dark:text-red-400" />
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
              {editItem ? "Edit Invoice Details" : "Create New Invoice"}
            </h2>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Client *</label>
                <select
                  value={form.clientId}
                  onChange={(e) => setForm(p => ({ ...p, clientId: e.target.value }))}
                  className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  <option value="" disabled className="text-slate-500">Select client account</option>
                  {clients.map((c) => (
                    <option key={c.id} value={c.id} className="text-slate-900 dark:text-slate-100 bg-white dark:bg-[#111111]">
                      {c.company ? `${c.company} (${c.name})` : c.name}
                    </option>
                  ))}
                </select>
              </div>

              {form.clientId && (
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Project Link (Optional)</label>
                  <select
                    value={form.projectId}
                    onChange={(e) => setForm(p => ({ ...p, projectId: e.target.value }))}
                    className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    <option value="" className="text-slate-900 dark:text-slate-100 bg-white dark:bg-[#111111]">General / None (No associated project)</option>
                    {modalProjects.map((p) => (
                      <option key={p.id} value={p.id} className="text-slate-900 dark:text-slate-100 bg-white dark:bg-[#111111]">
                        {p.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Amount (USD) *</label>
                  <input
                    type="number"
                    step="0.01"
                    min="1"
                    value={form.amount}
                    onChange={(e) => setForm(p => ({ ...p, amount: e.target.value }))}
                    placeholder="0.00"
                    className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Currency *</label>
                  <select
                    value={form.currency}
                    onChange={(e) => setForm(p => ({ ...p, currency: e.target.value }))}
                    className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    <option value="USD" className="text-slate-900 dark:text-slate-100 bg-white dark:bg-[#111111]">USD ($)</option>
                    <option value="EUR" className="text-slate-900 dark:text-slate-100 bg-white dark:bg-[#111111]">EUR (€)</option>
                    <option value="GBP" className="text-slate-900 dark:text-slate-100 bg-white dark:bg-[#111111]">GBP (£)</option>
                    <option value="AUD" className="text-slate-900 dark:text-slate-100 bg-white dark:bg-[#111111]">AUD ($)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Due Date *</label>
                  <input
                    type="date"
                    value={form.dueDate}
                    onChange={(e) => setForm(p => ({ ...p, dueDate: e.target.value }))}
                    className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status *</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm(p => ({ ...p, status: e.target.value }))}
                    className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    <option value="Unpaid" className="text-slate-900 dark:text-slate-100 bg-white dark:bg-[#111111]">Unpaid</option>
                    <option value="Paid" className="text-slate-900 dark:text-slate-100 bg-white dark:bg-[#111111]">Paid</option>
                    <option value="Overdue" className="text-slate-900 dark:text-slate-100 bg-white dark:bg-[#111111]">Overdue</option>
                  </select>
                </div>
              </div>

              {form.status === "Paid" && (
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Payment Received Date</label>
                  <input
                    type="date"
                    value={form.paidAt}
                    onChange={(e) => setForm(p => ({ ...p, paidAt: e.target.value }))}
                    className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Billing Description / Notes</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm(p => ({ ...p, notes: e.target.value }))}
                  placeholder="Billing terms, bank details, invoice scope notes..."
                  rows={3}
                  className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowModal(false)}
                className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
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
