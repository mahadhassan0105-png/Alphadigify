/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, ArrowLeft, Plus, X, Star, StarOff, Upload } from "lucide-react";
import Link from "next/link";

interface Metric {
  label: string;
  value: string;
  iconName: string;
}

interface CaseStudyData {
  id?: string;
  slug: string;
  client: string;
  title: string;
  category: string;
  service: string;
  timeline: string;
  industry: string;
  heroImage: string;
  challenge: string;
  solution: string;
  metrics: Metric[];
  results: string[];
  featured: boolean;
}

interface CaseStudyFormProps {
  initialData?: CaseStudyData;
  mode: "create" | "edit";
}

const categoryOptions = [
  "E-Commerce",
  "B2B SaaS",
  "Local Business",
  "Healthcare",
  "Finance",
  "Education",
  "Real Estate",
  "Technology",
];

const iconOptions = [
  "TrendingUp",
  "DollarSign",
  "Users",
  "ShoppingCart",
  "BarChart3",
  "Target",
  "Zap",
  "Globe",
  "Eye",
  "Heart",
  "Star",
  "ArrowUpRight",
  "Percent",
  "Clock",
  "Award",
];

const defaultFormData: CaseStudyData = {
  slug: "",
  client: "",
  title: "",
  category: "E-Commerce",
  service: "",
  timeline: "",
  industry: "",
  heroImage: "",
  challenge: "",
  solution: "",
  metrics: [{ label: "", value: "", iconName: "TrendingUp" }],
  results: [""],
  featured: false,
};

export default function CaseStudyForm({ initialData, mode }: CaseStudyFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState<CaseStudyData>(initialData || defaultFormData);

  const updateField = (field: keyof CaseStudyData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleTitleChange = (value: string) => {
    updateField("title", value);
    if (mode === "create") {
      updateField("slug", generateSlug(value));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      setError("");

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

      if (json.uploadedItems && json.uploadedItems.length > 0) {
        updateField("heroImage", json.uploadedItems[0].url);
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during upload.");
    } finally {
      setUploadingImage(false);
      // Reset input
      e.target.value = "";
    }
  };

  // Metrics management
  const addMetric = () => {
    setFormData((prev) => ({
      ...prev,
      metrics: [...prev.metrics, { label: "", value: "", iconName: "TrendingUp" }],
    }));
  };

  const removeMetric = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      metrics: prev.metrics.filter((_, i) => i !== index),
    }));
  };

  const updateMetric = (index: number, field: keyof Metric, value: string) => {
    setFormData((prev) => {
      const updated = [...prev.metrics];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, metrics: updated };
    });
  };

  // Results management
  const addResult = () => {
    setFormData((prev) => ({
      ...prev,
      results: [...prev.results, ""],
    }));
  };

  const removeResult = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      results: prev.results.filter((_, i) => i !== index),
    }));
  };

  const updateResult = (index: number, value: string) => {
    setFormData((prev) => {
      const updated = [...prev.results];
      updated[index] = value;
      return { ...prev, results: updated };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Basic validation
    const requiredFields: (keyof CaseStudyData)[] = [
      "slug", "client", "title", "category", "service",
      "timeline", "industry", "heroImage", "challenge", "solution",
    ];
    for (const field of requiredFields) {
      if (!formData[field] || (typeof formData[field] === "string" && !(formData[field] as string).trim())) {
        setError(`Please fill in the "${field}" field.`);
        setLoading(false);
        return;
      }
    }

    // Filter out empty metrics and results
    const cleanMetrics = formData.metrics.filter((m) => m.label.trim() && m.value.trim());
    const cleanResults = formData.results.filter((r) => r.trim());

    if (cleanMetrics.length === 0) {
      setError("Please add at least one metric.");
      setLoading(false);
      return;
    }

    if (cleanResults.length === 0) {
      setError("Please add at least one result.");
      setLoading(false);
      return;
    }

    const payload = {
      ...formData,
      metrics: cleanMetrics,
      results: cleanResults,
    };

    try {
      const url = mode === "create" ? "/api/case-studies" : `/api/case-studies/${formData.id}`;
      const method = mode === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || `Failed to ${mode} case study.`);
      }

      router.push("/admin/case-studies");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 w-full max-w-none pb-10">
      {/* Header */}
      <div className="bg-white dark:bg-[#111111] p-6 rounded-xl border border-slate-200 dark:border-white/[0.06] shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <Link
            href="/admin/case-studies"
            className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {mode === "create" ? "Create Case Study" : "Edit Case Study"}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              {mode === "create"
                ? "Add a new success story to your public showcase."
                : "Update the details of this case study."}
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="text-red-400 text-sm bg-red-400/10 p-4 rounded-lg border border-red-400/20">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white dark:bg-[#111111] rounded-xl border border-slate-200 dark:border-white/[0.06] p-6 space-y-5">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/[0.06] pb-3">
            Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label className="text-slate-700 dark:text-slate-300 text-xs font-semibold">Title *</Label>
              <Input
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. 500% ROAS in 90 Days"
                required
                className="bg-slate-50 dark:bg-black border-slate-200 dark:border-zinc-800 focus-visible:ring-yellow-400 text-slate-900 dark:text-slate-100 h-10"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-700 dark:text-slate-300 text-xs font-semibold">
                Slug * <span className="text-slate-500 dark:text-slate-600 font-normal">(URL path)</span>
              </Label>
              <Input
                value={formData.slug}
                onChange={(e) => updateField("slug", e.target.value)}
                placeholder="e.g. 500-roas-in-90-days"
                required
                className="bg-slate-50 dark:bg-black border-slate-200 dark:border-zinc-800 focus-visible:ring-yellow-400 text-slate-900 dark:text-slate-100 h-10 font-mono text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-700 dark:text-slate-300 text-xs font-semibold">Client Name *</Label>
              <Input
                value={formData.client}
                onChange={(e) => updateField("client", e.target.value)}
                placeholder="e.g. LuxeThreads Co."
                required
                className="bg-slate-50 dark:bg-black border-slate-200 dark:border-zinc-800 focus-visible:ring-yellow-400 text-slate-900 dark:text-slate-100 h-10"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-700 dark:text-slate-300 text-xs font-semibold">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(val) => updateField("category", val)}
              >
                <SelectTrigger className="bg-slate-50 dark:bg-black border-slate-200 dark:border-zinc-800 focus:ring-yellow-400 text-slate-900 dark:text-slate-100 h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-[#111111] border-slate-200 dark:border-white/[0.06] text-slate-900 dark:text-slate-100">
                  {categoryOptions.map((cat) => (
                    <SelectItem key={cat} value={cat} className="focus:bg-slate-100 dark:focus:bg-white/[0.04] focus:text-slate-900 dark:focus:text-white cursor-pointer">
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-700 dark:text-slate-300 text-xs font-semibold">Service *</Label>
              <Input
                value={formData.service}
                onChange={(e) => updateField("service", e.target.value)}
                placeholder="e.g. TikTok Ads & UGC"
                required
                className="bg-slate-50 dark:bg-black border-slate-200 dark:border-zinc-800 focus-visible:ring-yellow-400 text-slate-900 dark:text-slate-100 h-10"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-700 dark:text-slate-300 text-xs font-semibold">Industry *</Label>
              <Input
                value={formData.industry}
                onChange={(e) => updateField("industry", e.target.value)}
                placeholder="e.g. E-Commerce / Fashion"
                required
                className="bg-slate-50 dark:bg-black border-slate-200 dark:border-zinc-800 focus-visible:ring-yellow-400 text-slate-900 dark:text-slate-100 h-10"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-700 dark:text-slate-300 text-xs font-semibold">Timeline *</Label>
              <Input
                value={formData.timeline}
                onChange={(e) => updateField("timeline", e.target.value)}
                placeholder="e.g. 3 Months (Oct - Dec)"
                required
                className="bg-slate-50 dark:bg-black border-slate-200 dark:border-zinc-800 focus-visible:ring-yellow-400 text-slate-900 dark:text-slate-100 h-10"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-700 dark:text-slate-300 text-xs font-semibold">Hero Image URL *</Label>
              <div className="flex gap-2">
                <Input
                  value={formData.heroImage}
                  onChange={(e) => updateField("heroImage", e.target.value)}
                  placeholder="https://images.unsplash.com/... or upload"
                  required
                  className="bg-slate-50 dark:bg-black border-slate-200 dark:border-zinc-800 focus-visible:ring-yellow-400 text-slate-900 dark:text-slate-100 h-10 flex-1"
                />
                <div className="relative">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" 
                    disabled={uploadingImage}
                    title="Upload image"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    disabled={uploadingImage}
                    className="h-10 bg-slate-100 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 pointer-events-none"
                  >
                    {uploadingImage ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Toggle */}
          <div
            onClick={() => updateField("featured", !formData.featured)}
            className="flex items-center gap-3 bg-slate-50 dark:bg-black p-4 rounded-lg border border-slate-200 dark:border-zinc-800 cursor-pointer hover:bg-slate-100 dark:hover:bg-black/80 transition-colors select-none"
          >
            <div className="text-yellow-600 dark:text-yellow-400 shrink-0">
              {formData.featured ? (
                <Star className="w-5 h-5" fill="currentColor" />
              ) : (
                <StarOff className="w-5 h-5 text-slate-400 dark:text-slate-500" />
              )}
            </div>
            <div>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200 block">
                {formData.featured ? "Featured Case Study" : "Not Featured"}
              </span>
              <span className="text-[11px] text-slate-500">
                Featured studies appear prominently at the top of the case studies page.
              </span>
            </div>
          </div>
        </div>

        {/* Story Content */}
        <div className="bg-white dark:bg-[#111111] rounded-xl border border-slate-200 dark:border-white/[0.06] p-6 space-y-5">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/[0.06] pb-3">
            Story Content
          </h2>

          <div className="space-y-2">
            <Label className="text-slate-700 dark:text-slate-300 text-xs font-semibold">The Challenge *</Label>
            <textarea
              value={formData.challenge}
              onChange={(e) => updateField("challenge", e.target.value)}
              placeholder="Describe the client's pain points and situation before working with you..."
              required
              rows={5}
              className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-y"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-slate-700 dark:text-slate-300 text-xs font-semibold">Strategy & Solution *</Label>
            <textarea
              value={formData.solution}
              onChange={(e) => updateField("solution", e.target.value)}
              placeholder="Explain your approach, methodology, and execution strategy..."
              required
              rows={5}
              className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-y"
            />
          </div>
        </div>

        {/* Metrics */}
        <div className="bg-white dark:bg-[#111111] rounded-xl border border-slate-200 dark:border-white/[0.06] p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.06] pb-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Key Metrics</h2>
            <Button
              type="button"
              onClick={addMetric}
              variant="ghost"
              size="sm"
              className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-500 dark:hover:text-yellow-300 hover:bg-yellow-400/10"
            >
              <Plus className="w-4 h-4 mr-1" /> Add Metric
            </Button>
          </div>

          <div className="space-y-4">
            {formData.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-lg p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Metric #{idx + 1}
                  </span>
                  {formData.metrics.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMetric(idx)}
                      className="text-slate-500 hover:text-red-400 p-1 rounded transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <Label className="text-[10px] text-slate-500 font-bold uppercase">Label</Label>
                    <Input
                      value={metric.label}
                      onChange={(e) => updateMetric(idx, "label", e.target.value)}
                      placeholder="e.g. Revenue Growth"
                      className="bg-white dark:bg-black border-slate-200 dark:border-zinc-800 focus-visible:ring-yellow-400 text-slate-900 dark:text-slate-100 h-9 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] text-slate-500 font-bold uppercase">Value</Label>
                    <Input
                      value={metric.value}
                      onChange={(e) => updateMetric(idx, "value", e.target.value)}
                      placeholder="e.g. +340%"
                      className="bg-white dark:bg-black border-slate-200 dark:border-zinc-800 focus-visible:ring-yellow-400 text-slate-900 dark:text-slate-100 h-9 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] text-slate-500 font-bold uppercase">Icon</Label>
                    <Select
                      value={metric.iconName}
                      onValueChange={(val) => updateMetric(idx, "iconName", val)}
                    >
                      <SelectTrigger className="bg-white dark:bg-black border-slate-200 dark:border-zinc-800 focus:ring-yellow-400 text-slate-900 dark:text-slate-100 h-9 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/[0.06] text-slate-900 dark:text-slate-100 max-h-[200px]">
                        {iconOptions.map((icon) => (
                          <SelectItem
                            key={icon}
                            value={icon}
                            className="focus:bg-slate-100 dark:focus:bg-white/[0.04] focus:text-slate-900 dark:focus:text-white cursor-pointer text-sm"
                          >
                            {icon}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="bg-white dark:bg-[#111111] rounded-xl border border-slate-200 dark:border-white/[0.06] p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.06] pb-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Result Highlights</h2>
            <Button
              type="button"
              onClick={addResult}
              variant="ghost"
              size="sm"
              className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-500 dark:hover:text-yellow-300 hover:bg-yellow-400/10"
            >
              <Plus className="w-4 h-4 mr-1" /> Add Result
            </Button>
          </div>

          <div className="space-y-3">
            {formData.results.map((result, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-xs text-slate-400 dark:text-slate-600 font-bold w-5 shrink-0 text-center">
                  {idx + 1}
                </span>
                <Input
                  value={result}
                  onChange={(e) => updateResult(idx, e.target.value)}
                  placeholder="e.g. Generated $1.2M in revenue within the first quarter"
                  className="bg-slate-50 dark:bg-black border-slate-200 dark:border-zinc-800 focus-visible:ring-yellow-400 text-slate-900 dark:text-slate-100 h-9 text-sm flex-1"
                />
                {formData.results.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeResult(idx)}
                    className="text-slate-500 hover:text-red-400 p-1.5 rounded transition-colors shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-between bg-white dark:bg-[#111111] rounded-xl border border-slate-200 dark:border-white/[0.06] p-6">
          <Link href="/admin/case-studies">
            <Button
              type="button"
              variant="ghost"
              className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 border dark:border-zinc-800"
            >
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={loading}
            className="bg-yellow-400 text-black hover:bg-yellow-500 font-bold min-w-[160px] h-11 shadow-[0_0_15px_rgba(250,204,21,0.3)] hover:shadow-[0_0_25px_rgba(250,204,21,0.5)] transition-all"
          >
            {loading ? (
              <span className="flex items-center">
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
              </span>
            ) : mode === "create" ? (
              "Publish Case Study"
            ) : (
              "Update Case Study"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
