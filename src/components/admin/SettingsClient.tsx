/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, Loader2, Plus, Settings, User, ShieldAlert, Key, Globe, Sparkles, CheckCircle2, Upload } from "lucide-react";
import { format } from "date-fns";
import ConfirmModal from "./ConfirmModal";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string;
}

interface UserAdmin {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string;
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
  const { update: updateSession } = useSession();
  const [activeTab, setActiveTab] = useState<"profile" | "admins" | "agency">("profile");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [removingAvatar, setRemovingAvatar] = useState(false);
  const [deleteTargetAdmin, setDeleteTargetAdmin] = useState<{ id: string; name: string } | null>(null);
  const [isRevoking, setIsRevoking] = useState(false);

  // Profile Form state
  const [profileForm, setProfileForm] = useState<{
    name: string;
    email: string;
    image: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }>({
    name: currentUser.name || "",
    email: currentUser.email || "",
    image: currentUser.image || "",
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

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingAvatar(true);
      setError("");
      setSuccess("");
      const uploadData = new FormData();
      uploadData.append("files", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to upload image.");
      }

      if (json.uploadedItems && json.uploadedItems.length > 0) {
        const uploadedUrl = json.uploadedItems[0].url;
        setProfileForm((prev) => ({ ...prev, image: uploadedUrl }));

        // Immediately persist to user profile and update active session
        try {
          await fetch("/api/admin/profile", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: profileForm.name,
              email: profileForm.email,
              image: uploadedUrl,
            }),
          });

          if (updateSession) {
            await updateSession({
              name: profileForm.name,
              image: uploadedUrl,
            });
          }
          router.refresh();
        } catch (syncErr) {
          console.warn("Avatar auto-sync warning:", syncErr);
        }

        setSuccess("Profile photo uploaded and updated successfully!");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during image upload.");
    } finally {
      setUploadingAvatar(false);
      e.target.value = "";
    }
  };

  const handleAvatarRemove = async () => {
    try {
      setRemovingAvatar(true);
      setError("");
      setSuccess("");
      setProfileForm((prev) => ({ ...prev, image: "" }));

      // Immediately persist removal to database and update session
      await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: profileForm.name,
          email: profileForm.email,
          image: "",
        }),
      });

      if (updateSession) {
        await updateSession({
          name: profileForm.name,
          image: "",
        });
      }

      setSuccess("Profile photo removed successfully.");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to remove profile photo.");
    } finally {
      setRemovingAvatar(false);
    }
  };

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
          image: profileForm.image,
          currentPassword: profileForm.currentPassword || undefined,
          newPassword: profileForm.newPassword || undefined,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Failed to update profile.");

      try {
        if (updateSession) {
          await updateSession({
            name: profileForm.name,
            image: profileForm.image,
          });
        }
      } catch (sessErr) {
        console.warn("Could not update session immediately:", sessErr);
      }

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

  const handleConfirmAdminDelete = async () => {
    if (!deleteTargetAdmin) return;
    setError("");
    setSuccess("");
    setIsRevoking(true);
    try {
      const res = await fetch(`/api/admin/users/${deleteTargetAdmin.id}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Failed to delete.");

      setSuccess(`Admin access for ${deleteTargetAdmin.name} has been successfully revoked.`);
      setDeleteTargetAdmin(null);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsRevoking(false);
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

              {/* Profile Avatar / Photo Section */}
              <div className="p-5 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="relative group shrink-0">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-yellow-400 bg-slate-100 dark:bg-zinc-900 flex items-center justify-center text-slate-500 dark:text-slate-400 shadow-md">
                    {profileForm.image ? (
                      <img
                        src={profileForm.image}
                        alt={profileForm.name || "Admin Profile"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-12 h-12 text-slate-400" />
                    )}
                  </div>
                  {profileForm.image && (
                    <button
                      type="button"
                      disabled={removingAvatar || uploadingAvatar}
                      onClick={handleAvatarRemove}
                      className="absolute top-0 right-0 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-md disabled:opacity-50"
                      title="Remove profile image"
                    >
                      {removingAvatar ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>

                <div className="flex-1 space-y-3 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">Admin Profile Photo</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Upload your photo from your device. It appears on the top navbar and as your author photo on articles.
                      </p>
                    </div>
                    <div>
                      {profileForm.image ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          Custom photo active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-zinc-700">
                          Default avatar
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1">
                    <label className="relative inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-xs rounded-lg cursor-pointer transition-all shadow-sm">
                      {uploadingAvatar ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-black" />
                          <span>Uploading photo...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4 text-black" />
                          <span>{profileForm.image ? "Change Image from Device" : "Upload Image from Device"}</span>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploadingAvatar || removingAvatar}
                        onChange={handleAvatarUpload}
                        className="sr-only"
                      />
                    </label>

                    {profileForm.image && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={removingAvatar || uploadingAvatar}
                        onClick={handleAvatarRemove}
                        className="text-xs text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 border-red-200 dark:border-red-900/50 flex items-center gap-1.5 py-2 px-3 h-auto font-medium"
                      >
                        {removingAvatar ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Removing...</span>
                          </>
                        ) : (
                          <>
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove Image</span>
                          </>
                        )}
                      </Button>
                    )}
                  </div>

                  {/* Direct URL input fallback */}
                  <div className="pt-1">
                    <input
                      type="url"
                      value={profileForm.image}
                      onChange={(e) => setProfileForm((p) => ({ ...p, image: e.target.value }))}
                      placeholder="Or paste an image URL directly (https://...)"
                      className="w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg px-3 py-1.5 text-slate-900 dark:text-slate-100 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
                    />
                  </div>
                </div>
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
                          <TableCell className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full overflow-hidden bg-slate-200 dark:bg-zinc-800 flex items-center justify-center shrink-0 border border-slate-300 dark:border-zinc-700">
                              {user.image ? (
                                <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                              ) : (
                                <User className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                              )}
                            </div>
                            <span>{user.name}</span>
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
                              disabled={isSelf}
                              onClick={() => setDeleteTargetAdmin({ id: user.id, name: user.name })}
                              className={`h-8 w-8 transition-colors ${
                                isSelf
                                  ? "text-slate-400 dark:text-slate-700 cursor-not-allowed"
                                  : "text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-500/10"
                              }`}
                              title={isSelf ? "You cannot remove your own admin access" : "Revoke Dashboard Access"}
                            >
                              <Trash2 className="w-4 h-4" />
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

      {/* Revoke Admin Access Modal */}
      <ConfirmModal
        isOpen={!!deleteTargetAdmin}
        onClose={() => setDeleteTargetAdmin(null)}
        onConfirm={handleConfirmAdminDelete}
        loading={isRevoking}
        title="Revoke Admin Access"
        description={`Are you sure you want to revoke administrator privileges for ${deleteTargetAdmin?.name}? They will immediately lose dashboard login access and administrative rights.`}
        confirmText="Revoke Access"
      />
    </div>
  );
}
