/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow,
} from "@/components/ui/table";
import { Plus, Mail, Trash2, Edit, Loader2, Users } from "lucide-react";
import { format } from "date-fns";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string | null;
  createdAt: string;
}

interface TeamClientProps {
  initialItems: TeamMember[];
}

export default function TeamClient({ initialItems }: TeamClientProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<TeamMember | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    role: "",
    email: "",
    avatar: "",
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setError("Image exceeds 10MB limit.");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("files", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to upload image.");
      }

      const uploadedUrl = json.uploadedItems[0].url;
      setForm((p) => ({ ...p, avatar: uploadedUrl }));
    } catch (err: any) {
      setError(err.message || "Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  const openCreate = () => {
    setEditItem(null);
    setForm({ name: "", role: "", email: "", avatar: "" });
    setShowModal(true);
  };

  const openEdit = (m: TeamMember) => {
    setEditItem(m);
    setForm({ name: m.name, role: m.role, email: m.email, avatar: m.avatar || "" });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.role.trim() || !form.email.trim()) {
      setError("Name, role, and email are required.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const url = editItem ? `/api/team/${editItem.id}` : "/api/team";
      const method = editItem ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
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
    if (!confirm("Remove this team member? This cannot be undone.")) return;
    setDeletingId(id);
    setError("");
    try {
      const res = await fetch(`/api/team/${id}`, { method: "DELETE" });
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-white dark:bg-[#111111] p-6 rounded-xl border border-slate-200 dark:border-white/[0.06] shadow-sm">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-1">Agency Team</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Manage staff access and public profiles.</p>
        </div>
        <Button
          onClick={openCreate}
          className="bg-yellow-400 text-black hover:bg-yellow-500 font-semibold shadow-[0_0_15px_rgba(250,204,21,0.3)] hover:shadow-[0_0_25px_rgba(250,204,21,0.5)] transition-all"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Member
        </Button>
      </div>

      {error && (
        <div className="text-red-400 text-sm bg-red-400/10 p-3 rounded border border-red-400/20">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="bg-white dark:bg-[#111111] rounded-xl border border-slate-200 dark:border-white/[0.06] overflow-hidden shadow-sm">
        {initialItems.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="w-12 h-12 mx-auto mb-4 text-slate-300 dark:text-slate-700" />
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-300">No team members yet</h3>
            <p className="text-slate-500 text-sm mt-1">Click &quot;Add Member&quot; to add your first team member.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200 dark:border-zinc-800 hover:bg-transparent">
                  <TableHead className="text-slate-500 dark:text-slate-400">Team Member</TableHead>
                  <TableHead className="text-slate-500 dark:text-slate-400">Role</TableHead>
                  <TableHead className="text-slate-500 dark:text-slate-400">Joined Date</TableHead>
                  <TableHead className="text-slate-500 dark:text-slate-400 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {initialItems.map((member) => (
                  <TableRow key={member.id} className="border-slate-200 dark:border-zinc-800 hover:bg-slate-50/50 dark:hover:bg-zinc-900/40">
                  <TableCell className="font-medium text-slate-900 dark:text-slate-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-zinc-900 text-yellow-600 dark:text-yellow-400 flex items-center justify-center font-bold overflow-hidden shrink-0">
                        {member.avatar ? (
                          <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                        ) : (
                          member.name.charAt(0)
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span>{member.name}</span>
                        <span className="text-xs text-slate-500 flex items-center mt-0.5">
                          <Mail className="w-3 h-3 mr-1" /> {member.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-700 dark:text-slate-300">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold border bg-slate-50 dark:bg-black border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-slate-300">
                      {member.role}
                    </span>
                  </TableCell>
                  <TableCell className="text-slate-500 dark:text-slate-400 text-sm">
                    {format(new Date(member.createdAt), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEdit(member)}
                        className="h-8 bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-zinc-800 hover:text-slate-900 dark:hover:text-white"
                      >
                        <Edit className="h-4 w-4 mr-1.5" /> Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        disabled={deletingId === member.id}
                        onClick={() => handleDelete(member.id)}
                        className="h-8 w-8 text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        {deletingId === member.id ? (
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/[0.06] rounded-2xl w-full max-w-md p-6 space-y-5 shadow-2xl">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {editItem ? "Edit Team Member" : "Add Team Member"}
            </h2>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Full Name *</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))}
                  placeholder="e.g. Wasim Akram"
                  className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Role *</label>
                <input
                  value={form.role}
                  onChange={(e) => setForm(p => ({ ...p, role: e.target.value }))}
                  placeholder="e.g. CEO, Head of Marketing"
                  className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))}
                  placeholder="e.g. wasim@alphadigify.com"
                  className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              
              {/* Device Image Upload */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Profile Photo</label>
                <div className="flex items-center space-x-4 bg-slate-50 dark:bg-black p-4 rounded-xl border border-slate-200 dark:border-zinc-800">
                  {/* Photo Preview */}
                  <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-zinc-900 border border-slate-300 dark:border-zinc-800 flex items-center justify-center font-bold text-yellow-600 dark:text-yellow-400 text-xl overflow-hidden shrink-0">
                    {form.avatar ? (
                      <img src={form.avatar} alt="Avatar Preview" className="w-full h-full object-cover" />
                    ) : (
                      form.name ? form.name.charAt(0) : "?"
                    )}
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex flex-col space-y-1 flex-1">
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        disabled={uploading}
                        className="hidden"
                        id="avatar-upload"
                      />
                      <label
                        htmlFor="avatar-upload"
                        className={`inline-flex items-center justify-center px-4 py-2 rounded-lg text-xs font-bold text-black bg-yellow-400 hover:bg-yellow-500 cursor-pointer transition-colors ${uploading ? "opacity-50 pointer-events-none" : ""}`}
                      >
                        {uploading ? (
                          <span className="flex items-center">
                            <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> Uploading...
                          </span>
                        ) : (
                          "Upload from device"
                        )}
                      </label>
                    </div>
                    <p className="text-[10px] text-slate-500">Max size: 10MB. Formats: JPG, PNG, GIF, WebP</p>
                  </div>
                </div>

                {/* Optional URL input */}
                <div className="space-y-1 mt-2">
                  <label className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Or enter image URL manually</label>
                  <input
                    value={form.avatar}
                    onChange={(e) => setForm(p => ({ ...p, avatar: e.target.value }))}
                    placeholder="https://..."
                    className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowModal(false)}
                className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-900"
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
                ) : editItem ? "Update" : "Add Member"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
