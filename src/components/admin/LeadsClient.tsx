/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, Loader2, Mail, MessageSquare, Phone, Eye, UserCheck } from "lucide-react";
import { format } from "date-fns";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string;
  message: string;
  budget: string | null;
  status: string;
  createdAt: string;
}

interface LeadsClientProps {
  initialItems: Lead[];
}

export default function LeadsClient({ initialItems }: LeadsClientProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  // Details Modal state
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    setError("");
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Failed to update status.");
      
      // If we are currently viewing the updated lead, update the modal details too
      if (selectedLead && selectedLead.id === id) {
        setSelectedLead({ ...selectedLead, status: newStatus });
      }

      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this lead inquiry? This cannot be undone.")) return;
    setDeletingId(id);
    setError("");
    try {
      const res = await fetch(`/api/leads/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to delete.");
      }
      setSelectedLead(null);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "New": return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
      case "Contacted": return "bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 border-yellow-400/20";
      case "Converted": return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      case "Rejected": return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20";
      default: return "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-450 border-slate-250 dark:border-slate-700";
    }
  };

  // Stats calculation
  const total = initialItems.length;
  const newCount = initialItems.filter(l => l.status === "New").length;
  const convertedCount = initialItems.filter(l => l.status === "Converted").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-white dark:bg-[#111111] p-6 rounded-xl border border-slate-200 dark:border-white/[0.06] shadow-sm transition-colors duration-300">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-1">Incoming Leads</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Monitor and qualify agency inquiries from the website securely.</p>
        </div>
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
            <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Total Inquiries</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{total}</h3>
          </div>
          <div className="p-3 rounded-lg bg-yellow-400/10 text-yellow-650 dark:text-yellow-400">
            <MessageSquare className="w-5 h-5" />
          </div>
        </div>
        <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/[0.06] p-5 rounded-xl flex items-center justify-between transition-colors duration-300 shadow-sm">
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Unprocessed Leads</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{newCount}</h3>
          </div>
          <div className="p-3 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <Eye className="w-5 h-5" />
          </div>
        </div>
        <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/[0.06] p-5 rounded-xl flex items-center justify-between transition-colors duration-300 shadow-sm">
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Converted Clients</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{convertedCount}</h3>
          </div>
          <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <UserCheck className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#111111] rounded-xl border border-slate-200 dark:border-white/[0.06] overflow-hidden shadow-sm transition-colors duration-300">
        {initialItems.length === 0 ? (
          <div className="p-12 text-center">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-slate-400 dark:text-slate-700" />
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-300">No leads found</h3>
            <p className="text-slate-500 dark:text-slate-450 text-sm mt-1">Incoming inquiries from your site forms will appear here.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200 dark:border-zinc-800 hover:bg-transparent">
                <TableHead className="text-slate-500 dark:text-slate-400 w-[140px]">Date</TableHead>
                <TableHead className="text-slate-500 dark:text-slate-400">Prospect</TableHead>
                <TableHead className="text-slate-500 dark:text-slate-400">Service Inquiry</TableHead>
                <TableHead className="text-slate-500 dark:text-slate-400">Budget</TableHead>
                <TableHead className="text-slate-500 dark:text-slate-400">Status</TableHead>
                <TableHead className="text-slate-500 dark:text-slate-400 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {initialItems.map((lead) => (
                <TableRow key={lead.id} className="border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-900/50 transition-colors">
                  <TableCell className="text-slate-500 dark:text-slate-400 text-sm">
                    {format(new Date(lead.createdAt), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900 dark:text-slate-100">{lead.name}</span>
                      <span className="text-xs text-slate-500 flex items-center mt-1">
                        <Mail className="w-3 h-3 mr-1" /> {lead.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-800 dark:text-slate-300 font-semibold">{lead.service}</TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-400 font-mono text-sm">{lead.budget || "Not specified"}</TableCell>
                  <TableCell>
                    {updatingId === lead.id ? (
                      <span className="flex items-center text-xs text-slate-500">
                        <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" /> Updating...
                      </span>
                    ) : (
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(lead.status)}`}>
                        {lead.status}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedLead(lead)}
                        className="h-8 bg-slate-50 dark:bg-zinc-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-zinc-800 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-zinc-800 transition-colors"
                      >
                        <Eye className="h-4 w-4 mr-1.5" /> View
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        disabled={deletingId === lead.id}
                        onClick={() => handleDelete(lead.id)}
                        className="h-8 w-8 text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        {deletingId === lead.id ? (
                          <Loader2 className="w-4 h-4 animate-spin text-red-500 dark:text-red-450" />
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

      {/* Details View Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/[0.06] rounded-2xl w-full max-w-lg p-6 space-y-6 shadow-2xl transition-colors duration-300">
            <div className="flex justify-between items-start border-b border-slate-200 dark:border-zinc-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{selectedLead.name}</h2>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">Inquiry received on {format(new Date(selectedLead.createdAt), "MMMM d, yyyy h:mm a")}</p>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(selectedLead.status)}`}>
                {selectedLead.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm bg-slate-50 dark:bg-black p-4 rounded-xl border border-slate-200 dark:border-zinc-800">
              <div className="space-y-1">
                <span className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider block">Email Address</span>
                <a href={`mailto:${selectedLead.email}`} className="text-yellow-600 dark:text-yellow-400 hover:underline flex items-center gap-1 font-semibold">
                  <Mail className="w-4 h-4 text-slate-400" /> {selectedLead.email}
                </a>
              </div>
              <div className="space-y-1">
                <span className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider block">Phone Number</span>
                <span className="text-slate-800 dark:text-slate-200 font-semibold flex items-center gap-1">
                  <Phone className="w-4 h-4 text-slate-400" /> {selectedLead.phone || "—"}
                </span>
              </div>
              <div className="space-y-1 mt-2">
                <span className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider block">Service Inquiry</span>
                <span className="text-slate-800 dark:text-slate-200 font-semibold">{selectedLead.service}</span>
              </div>
              <div className="space-y-1 mt-2">
                <span className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider block">Estimated Budget</span>
                <span className="text-yellow-600 dark:text-yellow-400 font-bold font-mono">{selectedLead.budget || "Not specified"}</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider block font-semibold">Message Inquiry</span>
              <div className="bg-slate-50 dark:bg-black p-4 rounded-xl border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-wrap max-h-[160px] overflow-y-auto">
                {selectedLead.message}
              </div>
            </div>

            {/* Actions & Status Selection */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-slate-200 dark:border-zinc-800">
              <div className="flex gap-1 bg-slate-50 dark:bg-black p-1.5 rounded-lg border border-slate-200 dark:border-zinc-800 w-full sm:w-auto justify-center">
                {["New", "Contacted", "Converted", "Rejected"].map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(selectedLead.id, status)}
                    disabled={updatingId !== null}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                      selectedLead.status === status
                        ? "bg-yellow-400 text-black shadow-sm"
                        : "text-slate-500 hover:bg-slate-150 dark:hover:bg-zinc-800 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
              
              <div className="flex gap-2 w-full sm:w-auto justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setSelectedLead(null)}
                  className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-850 w-full sm:w-auto"
                >
                  Close
                </Button>
                <Button
                  onClick={() => handleDelete(selectedLead.id)}
                  disabled={deletingId !== null}
                  className="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-500/20 font-bold w-full sm:w-auto"
                >
                  Delete Lead
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
