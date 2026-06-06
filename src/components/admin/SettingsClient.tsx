/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, Loader2, Plus, Settings, User, ShieldAlert, Key, Globe, Sparkles, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface UserAdmin {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

interface AgencyFormState {
  email: string;
  phone: string;
  location: string;
  instagram: string;
  linkedin: string;
  twitter: string;
  facebook: string;
}

interface SettingsClientProps {
  currentUser: UserProfile;
  initialUsers: UserAdmin[];
}

export default function SettingsClient({ currentUser, initialUsers }: SettingsClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"profile" | "admins" | "agency">("profile");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Profile Form state
  const [profileForm, setProfileForm] = useState<{
    name: string;
    email: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }>({
    name: currentUser.name || "",
    email: currentUser.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Admin Registration Modal state
  const [showModal, setShowModal] = useState(false);
  const [adminSaving, setAdminSaving] = useState(false);
  const [adminForm, setAdminForm] = useState<{
    name: string;
    email: string;
    password: string;
  }>({
    name: "",
    email: "",
    password: "",
  });

  // Agency settings — loaded from DB via /api/settings
  const [agencyForm, setAgencyForm] = useState<AgencyFormState>({
    email: "strategy@alphadigify.com",
    phone: "",
    location: "Islamabad, Pakistan & Global Remote",
    instagram: "",
    linkedin: "",
    twitter: "",
    facebook: "",
  });

  // Load live settings from database on mount
  useState(() => {
    fetch("/api/settings")
      .then(r => r.json())
      .then(data => {
        if (data.settings) {
          setAgencyForm({
            email: data.settings.email || "",
            phone: data.settings.phone || "",
            location: data.settings.location || "",
            instagram: data.settings.instagram || "",
            linkedin: data.settings.linkedin || "",
            twitter: data.settings.twitter || "",
            facebook: data.settings.facebook || "",
          });
        }
      })
      .catch(() => {});
  });

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!profileForm.name.trim() || !profileForm.email.trim()) {
      setError("Name and Email address are required fields.");
      return;
    }

    if (profileForm.newPassword) {
      if (!profileForm.currentPassword) {
        setError("You must enter your current password to authorize a password change.");
        return;
      }
      if (profileForm.newPassword !== profileForm.confirmPassword) {
        setError("New passwords do not match.");
        return;
      }
      if (profileForm.newPassword.length < 6) {
        setError("Your new password must be at least 6 characters.");
        return;
      }
    }

    setSaving(true);
    try {
      const res = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: profileForm.name,
          email: profileForm.email,
          currentPassword: profileForm.currentPassword || undefined,
          newPassword: profileForm.newPassword || undefined,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Failed to update profile.");

      setSuccess("Profile settings updated successfully!");
      setProfileForm(prev => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleAdminRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!adminForm.name.trim() || !adminForm.email.trim() || !adminForm.password) {
      setError("Please fill in all fields to register an administrator.");
      return;
    }

    setAdminSaving(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adminForm),
      });

      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Registration failed.");

      setSuccess(`Admin account for ${adminForm.name} registered successfully!`);
      setShowModal(false);
      setAdminForm({ name: "", email: "", password: "" });
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setAdminSaving(false);
    }
  };

  const handleAdminDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to revoke admin access for ${name}? they will immediately lose dashboard login privileges.`)) return;
    setError("");
    setSuccess("");
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Failed to delete.");

      setSuccess(`Admin access for ${name} has been successfully revoked.`);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const handleAgencySave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(agencyForm),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Failed to save.");
      setSuccess("Agency contact details updated! Footer and Contact page will now reflect these changes.");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="bg-white dark:bg-[#111111] p-6 rounded-xl border border-slate-200 dark:border-white/[0.06] shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-colors duration-300">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-1 flex items-center gap-2">
            <Settings className="w-6 h-6 text-yellow-400" /> Settings Hub
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Configure personal profile details, manage administrator security access, and set dynamic configurations.</p>
        </div>
      </div>

      {error && (
        <div className="text-red-400 text-sm bg-red-400/10 p-3 rounded-xl border border-red-400/20 max-w-5xl">
          {error}
        </div>
      )}

      {success && (
        <div className="text-emerald-400 text-sm bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20 max-w-5xl flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-450" /> {success}
        </div>
      )}

      {/* Dynamic Settings Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Navigation Tabs */}
        <div className="md:col-span-1 space-y-1">
          <button
            onClick={() => { setActiveTab("profile"); setError(""); setSuccess(""); }}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 transition-all ${
              activeTab === "profile"
                ? "bg-yellow-400 text-black shadow-lg"
                : "text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-zinc-900 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <User className="w-4 h-4" /> My Account
          </button>
          <button
            onClick={() => { setActiveTab("admins"); setError(""); setSuccess(""); }}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 transition-all ${
              activeTab === "admins"
                ? "bg-yellow-400 text-black shadow-lg"
                : "text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-zinc-900 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <ShieldAlert className="w-4 h-4" /> Team Admins
          </button>
          <button
            onClick={() => { setActiveTab("agency"); setError(""); setSuccess(""); }}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 transition-all ${
              activeTab === "agency"
                ? "bg-yellow-400 text-black shadow-lg"
                : "text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-zinc-900 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Globe className="w-4 h-4" /> Agency Profile
          </button>
        </div>

        {/* Content Panel */}
        <div className="md:col-span-3 bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/[0.06] rounded-2xl p-6 shadow-sm transition-colors duration-300">
          {/* Tab 1: Personal Account Settings */}
          {activeTab === "profile" && (
            <form onSubmit={handleProfileSave} className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-yellow-400" /> Account Profile Details
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Manage your administrator account info, email verification, and master login passwords securely.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Display Name *</label>
                  <input
                    value={profileForm.name}
                    onChange={(e) => setProfileForm(p => ({ ...p, name: e.target.value }))}
                    className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email Address *</label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm(p => ({ ...p, email: e.target.value }))}
                    className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
                  />
                </div>
              </div>

              {/* Password Section */}
              <div className="border-t border-slate-150 dark:border-white/[0.06] pt-5 space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <Key className="w-4 h-4 text-yellow-400" /> Security Credentials Change
                  </h4>
                  <p className="text-slate-500 text-xs mt-0.5">Leave blank if you do not want to alter your security credentials password.</p>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Current Password</label>
                    <input
                      type="password"
                      value={profileForm.currentPassword}
                      onChange={(e) => setProfileForm(p => ({ ...p, currentPassword: e.target.value }))}
                      placeholder="Enter your current password"
                      className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">New Password</label>
                      <input
                        type="password"
                        value={profileForm.newPassword}
                        onChange={(e) => setProfileForm(p => ({ ...p, newPassword: e.target.value }))}
                        placeholder="Minimum 6 characters"
                        className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Confirm New Password</label>
                      <input
                        type="password"
                        value={profileForm.confirmPassword}
                        onChange={(e) => setProfileForm(p => ({ ...p, confirmPassword: e.target.value }))}
                        placeholder="Re-type new password"
                        className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-150 dark:border-white/[0.06] pt-4 flex justify-end">
                <Button
                  type="submit"
                  disabled={saving}
                  className="bg-yellow-400 text-black hover:bg-yellow-500 font-bold min-w-[150px] shadow-[0_0_15px_rgba(250,204,21,0.3)]"
                >
                  {saving ? (
                    <span className="flex items-center"><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</span>
                  ) : "Save Settings"}
                </Button>
              </div>
            </form>
          )}

          {/* Tab 2: Administrators Directory */}
          {activeTab === "admins" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-yellow-400" /> Administrative Team Directory
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Authorized logins that hold access tokens to browse, update, and manage the administrative client database.</p>
                </div>
                <Button
                  onClick={() => setShowModal(true)}
                  className="bg-yellow-400 text-black hover:bg-yellow-500 font-bold text-xs"
                >
                  <Plus className="mr-1.5 h-3.5 w-3.5" /> Add Admin
                </Button>
              </div>

              <div className="bg-slate-50 dark:bg-black rounded-xl border border-slate-200 dark:border-white/[0.06] overflow-x-auto transition-colors">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-200 dark:border-zinc-800 hover:bg-transparent">
                      <TableHead className="text-slate-500 dark:text-slate-400 text-xs">Name</TableHead>
                      <TableHead className="text-slate-500 dark:text-slate-400 text-xs">Email</TableHead>
                      <TableHead className="text-slate-500 dark:text-slate-400 text-xs">Access Level</TableHead>
                      <TableHead className="text-slate-500 dark:text-slate-400 text-xs">Registered Date</TableHead>
                      <TableHead className="text-slate-500 dark:text-slate-400 text-xs text-right">Revoke Access</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {initialUsers.map((user) => {
                      const isSelf = user.id === currentUser.id;
                      return (
                        <TableRow key={user.id} className="border-slate-200 dark:border-zinc-800 hover:bg-slate-100/50 dark:hover:bg-zinc-900/40">
                          <TableCell className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                            {user.name}
                            {isSelf && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] bg-yellow-400/20 text-yellow-400 font-bold border border-yellow-400/30 uppercase tracking-widest">
                                You
                              </span>
                            )}
                          </TableCell>
                          <TableCell className="text-slate-600 dark:text-slate-350">{user.email}</TableCell>
                          <TableCell className="text-yellow-600 dark:text-yellow-400 font-semibold font-mono text-xs uppercase tracking-wider">
                            {user.role}
                          </TableCell>
                          <TableCell className="text-slate-500 dark:text-slate-450 text-xs">
                            {format(new Date(user.createdAt), "MMM d, yyyy")}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              disabled={isSelf || deletingId === user.id}
                              onClick={() => handleAdminDelete(user.id, user.name)}
                              className={`h-8 w-8 transition-colors ${
                                isSelf
                                  ? "text-slate-400 dark:text-slate-700 cursor-not-allowed"
                                  : "text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-500/10"
                              }`}
                              title={isSelf ? "You cannot remove your own admin access" : "Revoke Dashboard Access"}
                            >
                              {deletingId === user.id ? (
                                <Loader2 className="w-4 h-4 animate-spin text-red-500 dark:text-red-400" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {/* Tab 3: Dynamic Branding / Contacts (Simulated Preferences) */}
          {activeTab === "agency" && (
            <form onSubmit={handleAgencySave} className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Globe className="w-5 h-5 text-yellow-400" /> Core Agency Profile
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Configure global public metadata preferences, dynamic social linkages, and headquarter office addresses.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Contact Email</label>
                  <input
                    type="email"
                    value={agencyForm.email}
                    onChange={(e) => setAgencyForm(p => ({ ...p, email: e.target.value }))}
                    className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Contact Phone</label>
                  <input
                    value={agencyForm.phone}
                    onChange={(e) => setAgencyForm(p => ({ ...p, phone: e.target.value }))}
                    placeholder="e.g. +92 300 0000000"
                    className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
                  />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Office Headquarters / Location</label>
                  <input
                    value={agencyForm.location}
                    onChange={(e) => setAgencyForm(p => ({ ...p, location: e.target.value }))}
                    placeholder="e.g. Islamabad, Pakistan & Global Remote"
                    className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
                  />
                </div>
              </div>

              {/* Social Channels */}
              <div className="border-t border-slate-150 dark:border-white/[0.06] pt-5 space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-yellow-400" /> Brand Social Handles
                  </h4>
                  <p className="text-slate-500 text-xs mt-0.5">These URLs power the footer social icons and contact page links site-wide.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Instagram</label>
                    <input
                      value={agencyForm.instagram}
                      onChange={(e) => setAgencyForm(p => ({ ...p, instagram: e.target.value }))}
                      placeholder="https://instagram.com/..."
                      className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">LinkedIn</label>
                    <input
                      value={agencyForm.linkedin}
                      onChange={(e) => setAgencyForm(p => ({ ...p, linkedin: e.target.value }))}
                      placeholder="https://linkedin.com/company/..."
                      className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Twitter / X</label>
                    <input
                      value={agencyForm.twitter}
                      onChange={(e) => setAgencyForm(p => ({ ...p, twitter: e.target.value }))}
                      placeholder="https://twitter.com/..."
                      className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Facebook</label>
                    <input
                      value={agencyForm.facebook}
                      onChange={(e) => setAgencyForm(p => ({ ...p, facebook: e.target.value }))}
                      placeholder="https://facebook.com/..."
                      className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-150 dark:border-white/[0.06] pt-4 flex justify-end">
                <Button
                  type="submit"
                  disabled={saving}
                  className="bg-yellow-400 text-black hover:bg-yellow-500 font-bold min-w-[150px] shadow-[0_0_15px_rgba(250,204,21,0.3)]"
                >
                  {saving ? (
                    <span className="flex items-center"><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</span>
                  ) : "Save Preferences"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Admin Addition Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4">
          <form onSubmit={handleAdminRegister} className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/[0.06] rounded-2xl w-full max-w-md p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in duration-150 transition-colors">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-yellow-400" /> Register Administrator
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">This will register a new admin record. Registered admin profiles can manage and browse database entities fully.</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Full Name *</label>
                <input
                  required
                  value={adminForm.name}
                  onChange={(e) => setAdminForm(p => ({ ...p, name: e.target.value }))}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email Address *</label>
                <input
                  required
                  type="email"
                  value={adminForm.email}
                  onChange={(e) => setAdminForm(p => ({ ...p, email: e.target.value }))}
                  placeholder="sarah@alphadigify.com"
                  className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Initial Account Password *</label>
                <input
                  required
                  type="password"
                  value={adminForm.password}
                  onChange={(e) => setAdminForm(p => ({ ...p, password: e.target.value }))}
                  placeholder="At least 6 characters"
                  className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowModal(false)}
                className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={adminSaving}
                className="bg-yellow-400 text-black hover:bg-yellow-500 font-bold min-w-[120px]"
              >
                {adminSaving ? (
                  <span className="flex items-center"><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Creating...</span>
                ) : "Register Admin"}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
