/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2, Save, Sparkles, Eye, Upload, X } from "lucide-react";
import Link from "next/link";

interface ArticleFormProps {
  initialData?: {
    id?: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage: string;
    category: string;
    tags: string[];
    authorName: string;
    authorRole: string;
    authorAvatar?: string;
    readTime: string;
    published: boolean;
    featured: boolean;
    seoTitle?: string;
    seoDescription?: string;
  };
  isEdit?: boolean;
}

const CATEGORIES = [
  "Amazon Advertising",
  "Amazon Account Management",
  "Reviews Management",
  "Account Reinstatement",
  "TikTok Shop",
  "Google Ads",
  "Web SEO & Development",
  "E-Commerce Growth",
];

export default function ArticleForm({ initialData, isEdit }: ArticleFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
    coverImage: initialData?.coverImage || "",
    category: initialData?.category || CATEGORIES[0],
    tags: initialData?.tags ? initialData.tags.join(", ") : "",
    authorName: initialData?.authorName || "",
    authorRole: initialData?.authorRole || "",
    authorAvatar: initialData?.authorAvatar || "",
    readTime: initialData?.readTime || "",
    published: initialData?.published !== undefined ? initialData.published : true,
    featured: initialData?.featured || false,
    seoTitle: initialData?.seoTitle || "",
    seoDescription: initialData?.seoDescription || "",
  });

  const handleTitleChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: !isEdit && !prev.slug
        ? val
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
        : prev.slug,
    }));
  };

  const handleCoverImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      setError("");

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
        setFormData((prev) => ({
          ...prev,
          coverImage: json.uploadedItems[0].url,
        }));
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during image upload.");
    } finally {
      setUploadingImage(false);
      e.target.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(",").map((s) => s.trim()).filter(Boolean),
      };

      const url = isEdit ? `/api/articles/${initialData?.id}` : "/api/articles";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to save article.");
      }

      router.push("/admin/articles");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto pb-16">
      
      {/* Top action header */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/articles"
          className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Articles
        </Link>
        <div className="flex items-center gap-3">
          {isEdit && formData.slug && (
            <Link
              href={`/articles/${formData.slug}`}
              target="_blank"
              className="px-4 py-2 text-sm font-semibold rounded-lg border border-slate-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-800 dark:text-slate-200 transition-colors inline-flex items-center gap-2 shadow-sm"
            >
              <Eye className="w-4 h-4" /> Preview Live
            </Link>
          )}
          <Button
            type="submit"
            disabled={loading}
            className="bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-bold shadow-md"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" /> {isEdit ? "Update Article" : "Publish Article"}
              </>
            )}
          </Button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm font-medium">
          {error}
        </div>
      )}

      {/* Main Form Body */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Core Content (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/40 border border-slate-200 dark:border-zinc-800 space-y-5 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Article Content</h3>
            
            {/* Title */}
            <div>
              <Label htmlFor="title" className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
                Article Title *
              </Label>
              <Input
                id="title"
                required
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g., 6 Key Amazon PPC Launch Metrics New Sellers Should Watch"
                className="mt-1.5 text-base font-semibold bg-white dark:bg-zinc-900 border-slate-300 dark:border-zinc-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:ring-yellow-400"
              />
            </div>

            {/* Slug */}
            <div>
              <Label htmlFor="slug" className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
                URL Slug *
              </Label>
              <div className="flex items-center mt-1.5">
                <span className="px-3.5 py-2 text-xs bg-slate-100 dark:bg-zinc-800 border border-r-0 border-slate-300 dark:border-zinc-700 rounded-l-md text-slate-600 dark:text-slate-400 h-10 flex items-center shrink-0">
                  /articles/
                </span>
                <Input
                  id="slug"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="e.g. 6-key-amazon-ppc-launch-metrics"
                  className="rounded-l-none text-xs sm:text-sm font-mono bg-white dark:bg-zinc-900 border-slate-300 dark:border-zinc-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:ring-yellow-400"
                />
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <Label htmlFor="excerpt" className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
                Short Excerpt / Lead Summary
              </Label>
              <Textarea
                id="excerpt"
                rows={3}
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="A compelling 2-3 sentence overview that appears on article cards and search previews..."
                className="mt-1.5 text-sm bg-white dark:bg-zinc-900 border-slate-300 dark:border-zinc-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:ring-yellow-400"
              />
            </div>

            {/* Content Body */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <Label htmlFor="content" className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
                  Article Content (Markdown supported) *
                </Label>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Use ### for subheadings, * for bullets, &gt; for quotes</span>
              </div>
              <Textarea
                id="content"
                required
                rows={16}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Write your article body here... Use Markdown for headings, bullets, and blockquotes."
                className="mt-1.5 font-mono text-sm leading-relaxed bg-white dark:bg-zinc-900 border-slate-300 dark:border-zinc-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:ring-yellow-400"
              />
            </div>

          </div>

          {/* SEO Meta Box */}
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/40 border border-slate-200 dark:border-zinc-800 space-y-4 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-500" /> Google Search SEO Settings
            </h3>
            
            <div>
              <Label htmlFor="seoTitle" className="font-semibold text-xs text-slate-800 dark:text-slate-200">
                SEO Meta Title (Defaults to article title if empty)
              </Label>
              <Input
                id="seoTitle"
                value={formData.seoTitle}
                onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                placeholder="e.g. 6 Key Amazon PPC Launch Metrics | Alphadigify"
                className="mt-1 text-sm bg-white dark:bg-zinc-900 border-slate-300 dark:border-zinc-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:ring-yellow-400"
              />
            </div>

            <div>
              <Label htmlFor="seoDescription" className="font-semibold text-xs text-slate-800 dark:text-slate-200">
                SEO Meta Description
              </Label>
              <Textarea
                id="seoDescription"
                rows={2}
                value={formData.seoDescription}
                onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                placeholder="Search engine snippet description..."
                className="mt-1 text-sm bg-white dark:bg-zinc-900 border-slate-300 dark:border-zinc-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:ring-yellow-400"
              />
            </div>
          </div>

        </div>

        {/* Right Column: Settings & Meta (1 col) */}
        <div className="space-y-6">
          
          {/* Publication Status */}
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/40 border border-slate-200 dark:border-zinc-800 space-y-4 shadow-sm">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">Publishing</h4>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Publish Article</span>
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="w-5 h-5 accent-yellow-400 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Featured Article</span>
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-5 h-5 accent-yellow-400 cursor-pointer"
              />
            </div>

            <div>
              <Label htmlFor="readTime" className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                Estimated Read Time
              </Label>
              <Input
                id="readTime"
                value={formData.readTime}
                onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                placeholder="e.g., 8 mins"
                className="mt-1 text-sm bg-white dark:bg-zinc-900 border-slate-300 dark:border-zinc-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:ring-yellow-400"
              />
            </div>
          </div>

          {/* Categorization */}
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/40 border border-slate-200 dark:border-zinc-800 space-y-4 shadow-sm">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">Category &amp; Tags</h4>
            
            <div>
              <Label htmlFor="category" className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                Category *
              </Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full mt-1 bg-white dark:bg-zinc-900 border border-slate-300 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="tags" className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                Tags (comma-separated)
              </Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="e.g. amazon ads, amazon ppc, e-commerce"
                className="mt-1 text-sm bg-white dark:bg-zinc-900 border-slate-300 dark:border-zinc-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:ring-yellow-400"
              />
            </div>
          </div>

          {/* Media & Cover Image with Device Upload */}
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/40 border border-slate-200 dark:border-zinc-800 space-y-4 shadow-sm">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">Cover Image</h4>
            
            <div className="space-y-3">
              {/* File upload from device */}
              <div>
                <Label className="text-xs font-semibold text-slate-800 dark:text-slate-200 block mb-1.5">
                  Upload Image from Device
                </Label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverImageUpload}
                    disabled={uploadingImage}
                    id="coverImageUpload"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
                    title="Upload cover image from device"
                  />
                  <div className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl border-2 border-dashed border-slate-300 dark:border-zinc-700 hover:border-yellow-400 dark:hover:border-yellow-400 bg-slate-50 dark:bg-zinc-900/50 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer">
                    {uploadingImage ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-yellow-500" />
                        <span>Uploading image...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 text-yellow-500" />
                        <span>Click to choose file from device</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="relative flex items-center justify-center py-0.5">
                <div className="border-t border-slate-200 dark:border-zinc-800 w-full" />
                <span className="bg-white dark:bg-zinc-900 px-2 text-[10px] text-slate-400 uppercase font-bold absolute">
                  Or enter URL
                </span>
              </div>

              <div>
                <Label htmlFor="coverImage" className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Image URL or Path
                </Label>
                <Input
                  id="coverImage"
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  placeholder="https://... or /images/..."
                  className="mt-1 text-xs font-mono bg-white dark:bg-zinc-900 border-slate-300 dark:border-zinc-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:ring-yellow-400"
                />
              </div>
            </div>

            {formData.coverImage && (
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Image Preview
                </span>
                <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-800 group">
                  <img
                    src={formData.coverImage}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, coverImage: "" })}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/70 hover:bg-red-600 text-white transition-colors"
                    title="Remove cover image"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Author Details */}
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/40 border border-slate-200 dark:border-zinc-800 space-y-4 shadow-sm">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">Author Info</h4>
            
            <div>
              <Label htmlFor="authorName" className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                Author Name
              </Label>
              <Input
                id="authorName"
                value={formData.authorName}
                onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                placeholder="e.g., Ken Zhou"
                className="mt-1 text-sm bg-white dark:bg-zinc-900 border-slate-300 dark:border-zinc-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:ring-yellow-400"
              />
            </div>

            <div>
              <Label htmlFor="authorRole" className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                Author Role / Title
              </Label>
              <Input
                id="authorRole"
                value={formData.authorRole}
                onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
                placeholder="e.g., Chief Operating Officer"
                className="mt-1 text-sm bg-white dark:bg-zinc-900 border-slate-300 dark:border-zinc-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:ring-yellow-400"
              />
            </div>
          </div>

        </div>

      </div>

    </form>
  );
}
