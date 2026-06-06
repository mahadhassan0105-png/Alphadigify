/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Loader2, UploadCloud, X, Image as ImageIcon, Play, ToggleLeft, ToggleRight } from "lucide-react";

interface AddPortfolioModalProps {
  onSuccess?: () => void;
}

interface SelectedFile {
  file: File;
  title: string;
  type: "image" | "video";
  sizeText: string;
}

export default function AddPortfolioModal({ onSuccess }: AddPortfolioModalProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadStep, setUploadStep] = useState("");
  const [error, setError] = useState("");
  
  // Tab controller: "upload" or "url"
  const [activeTab, setActiveTab] = useState<"upload" | "url">("upload");

  // Files upload states
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const [groupAsProject, setGroupAsProject] = useState(false);
  const [projectTitle, setProjectTitle] = useState("");
  const [uploadTitle, setUploadTitle] = useState("");

  // Reset modal states
  const resetForm = () => {
    setSelectedFiles([]);
    setGroupAsProject(false);
    setProjectTitle("");
    setUploadTitle("");
    setError("");
    setLoading(false);
    setUploadStep("");
  };


  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFiles = (files: FileList) => {
    const newFiles: SelectedFile[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const mime = file.type;
      let mediaType: "image" | "video" = "image";
      
      if (mime.startsWith("image/")) {
        mediaType = "image";
      } else if (mime.startsWith("video/")) {
        mediaType = "video";
      } else {
        setError("Only image and video files are supported.");
        continue;
      }

      // Prettify original name for default title input
      const dotIndex = file.name.lastIndexOf(".");
      const baseName = dotIndex !== -1 ? file.name.substring(0, dotIndex) : file.name;
      const defaultTitle = baseName
        .replace(/[-_]+/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

      newFiles.push({
        file,
        title: defaultTitle,
        type: mediaType,
        sizeText: formatSize(file.size),
      });
    }

    if (newFiles.length > 0) {
      setSelectedFiles((prev) => {
        const updated = [...prev, ...newFiles];
        if (updated.length === 1) {
          if (!uploadTitle) {
            setUploadTitle(updated[0].title);
            setProjectTitle(updated[0].title);
          } else {
            updated[0].title = uploadTitle;
          }
        }
        return updated;
      });
      setError("");
    }
  };

  // Drag and Drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleTitleChange = (index: number, newTitle: string) => {
    setSelectedFiles((prev) => {
      const copy = [...prev];
      copy[index].title = newTitle;
      return copy;
    });
  };

  const handleUploadTitleChange = (newTitle: string) => {
    setUploadTitle(newTitle);
    setProjectTitle(newTitle);
    setSelectedFiles((prev) => {
      const copy = [...prev];
      if (copy.length === 1) {
        copy[0].title = newTitle;
      }
      return copy;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const category = formData.get("category") as string;

    if (activeTab === "url") {
      setUploadStep("Saving portfolio asset...");
      const title = formData.get("title");
      const type = formData.get("type");
      const url = formData.get("url");

      try {
        const res = await fetch("/api/portfolio", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, category, type, url, images: [url] }),
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || "Failed to add portfolio item");
        }
        
        setOpen(false);
        resetForm();
        if (onSuccess) onSuccess();
        router.refresh();
      } catch (err: any) {
        setError(err.message || "An error occurred while adding the portfolio item.");
        setLoading(false);
      }
    } else {
      // Local File upload mode
      if (selectedFiles.length === 0) {
        setError("Please select at least one photo or video to upload.");
        setLoading(false);
        return;
      }

      if (groupAsProject && !projectTitle.trim()) {
        setError("Please enter a Title for this grouped showcase project.");
        setLoading(false);
        return;
      }

      if (!groupAsProject && selectedFiles.length === 1 && !uploadTitle.trim()) {
        setError("Please enter a Title for this portfolio item.");
        setLoading(false);
        return;
      }

      setUploadStep(`Uploading ${selectedFiles.length} file(s) to server...`);
      
      const uploadFormData = new FormData();
      selectedFiles.forEach((selected) => {
        uploadFormData.append("files", selected.file);
      });

      try {
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: uploadFormData,
        });

        if (!uploadRes.ok) {
          const errData = await uploadRes.json();
          throw new Error(errData.error || "Failed to upload files.");
        }

        const uploadData = await uploadRes.json();
        const uploadedItems = uploadData.uploadedItems;

        setUploadStep("Saving items to database...");

        // Generate payload based on Group toggle
        let portfolioPayload;
        if (groupAsProject) {
          portfolioPayload = {
            title: projectTitle,
            category: category,
            type: uploadedItems[0].type, // Thumbnail's type
            url: uploadedItems[0].url, // Primary thumbnail
            images: uploadedItems.map((item: any) => item.url), // Array list of all uploaded media urls
          };
        } else {
          // Multiple separate items
          portfolioPayload = uploadedItems.map((item: any, idx: number) => ({
            url: item.url,
            type: item.type,
            title: selectedFiles[idx].title || item.title,
            category: category,
            images: [item.url],
          }));
        }

        const dbRes = await fetch("/api/portfolio", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(portfolioPayload),
        });

        if (!dbRes.ok) {
          const dbErr = await dbRes.json();
          throw new Error(dbErr.error || "Failed to save portfolio items.");
        }

        setOpen(false);
        resetForm();
        if (onSuccess) onSuccess();
        router.refresh();
      } catch (err: any) {
        setError(err.message || "An error occurred during file upload.");
        setLoading(false);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
      setOpen(val);
      if (!val) resetForm();
    }}>
      <DialogTrigger asChild>
        <Button className="bg-yellow-400 text-black hover:bg-yellow-500 font-semibold shadow-[0_0_15px_rgba(250,204,21,0.3)] hover:shadow-[0_0_25px_rgba(250,204,21,0.5)] transition-all">
          <Plus className="mr-2 h-4 w-4" /> Add Item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-white dark:bg-[#111111] border-slate-200 dark:border-white/[0.06] text-slate-900 dark:text-slate-100 max-h-[90vh] flex flex-col p-6 overflow-hidden">
        <DialogHeader className="shrink-0 mb-4">
          <DialogTitle className="text-xl font-bold">Add Portfolio Item</DialogTitle>
          <DialogDescription className="text-slate-500 dark:text-slate-400">
            Publish dynamic photos and video showcases directly to your public digital gallery.
          </DialogDescription>
        </DialogHeader>

        {/* Tab Headers */}
        <div className="flex border-b border-slate-200 dark:border-white/[0.06] pb-2 mb-4 gap-4 shrink-0">
          <button
            type="button"
            onClick={() => {
              setActiveTab("upload");
              setError("");
            }}
            className={`pb-2 text-sm font-semibold transition-all relative ${
              activeTab === "upload" ? "text-yellow-600 dark:text-yellow-400 font-bold" : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            Upload Files
            {activeTab === "upload" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-600 dark:bg-yellow-400 rounded-full" />
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("url");
              setError("");
            }}
            className={`pb-2 text-sm font-semibold transition-all relative ${
              activeTab === "url" ? "text-yellow-600 dark:text-yellow-400 font-bold" : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            External URL
            {activeTab === "url" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-600 dark:bg-yellow-400 rounded-full" />
            )}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0 space-y-4">
          {error && (
            <div className="text-red-400 text-xs bg-red-400/10 p-3 rounded border border-red-400/20 shrink-0">
              {error}
            </div>
          )}

          {/* Form Scroll Content */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-4 min-h-0">
            
            {/* Common Category Selector */}
            <div className="space-y-1">
              <Label htmlFor="category" className="text-slate-700 dark:text-slate-300 text-xs font-semibold">Showcase Category</Label>
              <Select name="category" required defaultValue="Web Development">
                <SelectTrigger className="bg-slate-50 dark:bg-black border-slate-200 dark:border-zinc-800 focus:ring-yellow-400 text-slate-900 dark:text-slate-100 h-9 text-sm">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-[#111111] border-slate-200 dark:border-white/[0.06] text-slate-900 dark:text-slate-100">
                  <SelectItem value="Amazon" className="focus:bg-slate-100 dark:focus:bg-zinc-900 focus:text-slate-900 dark:focus:text-white cursor-pointer">Amazon</SelectItem>
                  <SelectItem value="TikTok Shop" className="focus:bg-slate-100 dark:focus:bg-zinc-900 focus:text-slate-900 dark:focus:text-white cursor-pointer">TikTok Shop</SelectItem>
                  <SelectItem value="Social Media" className="focus:bg-slate-100 dark:focus:bg-zinc-900 focus:text-slate-900 dark:focus:text-white cursor-pointer">Social Media</SelectItem>
                  <SelectItem value="Web SEO" className="focus:bg-slate-100 dark:focus:bg-zinc-900 focus:text-slate-900 dark:focus:text-white cursor-pointer">Web SEO</SelectItem>
                  <SelectItem value="Google Ads" className="focus:bg-slate-100 dark:focus:bg-zinc-900 focus:text-slate-900 dark:focus:text-white cursor-pointer">Google Ads</SelectItem>
                  <SelectItem value="Web Development" className="focus:bg-slate-100 dark:focus:bg-zinc-900 focus:text-slate-900 dark:focus:text-white cursor-pointer">Web Development</SelectItem>
                  <SelectItem value="Graphics Designing" className="focus:bg-slate-100 dark:focus:bg-zinc-900 focus:text-slate-900 dark:focus:text-white cursor-pointer">Graphics Designing</SelectItem>
                  <SelectItem value="Video Ads" className="focus:bg-slate-100 dark:focus:bg-zinc-900 focus:text-slate-900 dark:focus:text-white cursor-pointer">Video Ads</SelectItem>
                  <SelectItem value="Account Reinstatement" className="focus:bg-slate-100 dark:focus:bg-zinc-900 focus:text-slate-900 dark:focus:text-white cursor-pointer">Account Reinstatement</SelectItem>
                  <SelectItem value="AI Solutions" className="focus:bg-slate-100 dark:focus:bg-zinc-900 focus:text-slate-900 dark:focus:text-white cursor-pointer">AI Solutions</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Render Upload Files Tab */}
            {activeTab === "upload" ? (
              <div className="space-y-4">
                {/* Unified Title Input for single upload or grouped upload */}
                {(selectedFiles.length <= 1 || groupAsProject) && (
                  <div className="space-y-1.5">
                    <Label htmlFor="uploadTitle" className="text-slate-700 dark:text-slate-300 text-xs font-semibold">
                      {groupAsProject ? "Grouped Project Title" : "Title"}
                    </Label>
                    <Input
                      id="uploadTitle"
                      type="text"
                      value={uploadTitle}
                      onChange={(e) => handleUploadTitleChange(e.target.value)}
                      placeholder={groupAsProject ? "e.g. Alphadigify Identity Launch" : "e.g. Creative Dashboard Design"}
                      required={selectedFiles.length === 1 || groupAsProject}
                      className="bg-slate-50 dark:bg-black border-slate-200 dark:border-zinc-800 focus-visible:ring-yellow-400 text-slate-900 dark:text-slate-100 h-9 text-sm"
                    />
                  </div>
                )}

                {/* Drag-and-Drop Area */}
                <div
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-2 group ${
                    isDragActive 
                      ? "border-yellow-400 bg-yellow-400/5 shadow-[0_0_15px_rgba(250,204,21,0.05)]" 
                      : "border-slate-200 dark:border-zinc-800 hover:border-slate-350 dark:hover:border-zinc-700 bg-slate-50 dark:bg-black hover:bg-slate-100 dark:hover:bg-[#111111]/80"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />
                  <UploadCloud className={`w-8 h-8 transition-colors ${
                    isDragActive ? "text-yellow-400" : "text-slate-500 group-hover:text-slate-400"
                  }`} />
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                    Drag & drop files here, or <span className="text-yellow-600 dark:text-yellow-400 hover:underline">browse</span>
                  </p>
                  <p className="text-slate-500 dark:text-slate-500 text-xs">
                    Support multiple photos (up to 10MB) & videos (up to 100MB)
                  </p>
                </div>

                {/* Toggle Grouping option when multiple files are loaded */}
                {selectedFiles.length > 1 && (
                  <div 
                    onClick={() => {
                      const nextVal = !groupAsProject;
                      setGroupAsProject(nextVal);
                      if (nextVal) {
                        const defaultT = uploadTitle || (selectedFiles.length > 0 ? selectedFiles[0].title : "");
                        setProjectTitle(defaultT);
                        setUploadTitle(defaultT);
                      }
                    }}
                    className="flex items-start space-x-3 bg-slate-50 dark:bg-black p-3 rounded-lg border border-slate-200 dark:border-zinc-800 cursor-pointer hover:bg-slate-100 dark:hover:bg-[#111111]/80 transition-colors select-none"
                  >
                    <div className="text-yellow-600 dark:text-yellow-400 shrink-0 mt-0.5">
                      {groupAsProject ? (
                        <ToggleRight className="w-9 h-6" />
                      ) : (
                        <ToggleLeft className="w-9 h-6 text-slate-400 dark:text-slate-500" />
                      )}
                    </div>
                    <div className="flex flex-col space-y-0.5">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Group as a single project showcase</span>
                      <span className="text-[10px] text-slate-500 leading-snug">
                        Combines all files into a single project card with a slider/carousel, rather than creating separate cards.
                      </span>
                    </div>
                  </div>
                )}

                {/* Selected Files List */}
                {selectedFiles.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold tracking-wider px-1">
                      <span>Selected Files ({selectedFiles.length})</span>
                      <button 
                        type="button" 
                        onClick={() => setSelectedFiles([])} 
                        className="hover:text-red-500 dark:hover:text-red-400 transition-colors"
                      >
                        Clear All
                      </button>
                    </div>

                    <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                      {selectedFiles.map((selected, idx) => (
                        <div 
                          key={idx} 
                          className="bg-slate-50 dark:bg-[#111111] border border-slate-200 dark:border-zinc-850 rounded-lg p-3 flex flex-col space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 min-w-0">
                              {selected.type === "video" ? (
                                <div className="p-1.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 rounded">
                                  <Play className="w-3.5 h-3.5" fill="currentColor" />
                                </div>
                              ) : (
                                <div className="p-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded">
                                  <ImageIcon className="w-3.5 h-3.5" />
                                </div>
                              )}
                              <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate min-w-0 flex-1">
                                {selected.file.name} <span className="text-[10px] text-slate-400 dark:text-slate-600">({selected.sizeText})</span>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveFile(idx)}
                              className="text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 p-1 hover:bg-slate-200 dark:hover:bg-zinc-900 rounded transition-colors"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Individual title inputs: show ONLY if NOT grouping into a single project */}
                          {!groupAsProject && (
                            <div className="space-y-1">
                              <Label className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase">Asset Title</Label>
                              <Input
                                type="text"
                                value={selected.title}
                                onChange={(e) => handleTitleChange(idx, e.target.value)}
                                placeholder="Describe your asset"
                                required={!groupAsProject}
                                className="bg-white dark:bg-black border-slate-200 dark:border-zinc-800 focus-visible:ring-yellow-400 text-slate-900 dark:text-slate-100 h-8 text-xs px-2"
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Render External URL Tab */
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-slate-700 dark:text-slate-300 text-xs font-semibold">Title</Label>
                  <Input 
                    id="title" 
                    name="title" 
                    placeholder="e.g. Brand New Dashboard" 
                    required={activeTab === "url"} 
                    className="bg-slate-50 dark:bg-black border-slate-200 dark:border-zinc-800 focus-visible:ring-yellow-400 text-slate-900 dark:text-slate-100 h-9 text-sm" 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type" className="text-slate-700 dark:text-slate-300 text-xs font-semibold">Type</Label>
                  <Select name="type" defaultValue="image">
                    <SelectTrigger className="bg-slate-50 dark:bg-black border-slate-200 dark:border-zinc-800 focus:ring-yellow-400 text-slate-900 dark:text-slate-100 h-9 text-sm">
                      <SelectValue placeholder="Select media type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-[#111111] border-slate-200 dark:border-white/[0.06] text-slate-900 dark:text-slate-100">
                      <SelectItem value="image" className="focus:bg-slate-100 dark:focus:bg-zinc-900 focus:text-slate-900 dark:focus:text-white cursor-pointer">Image</SelectItem>
                      <SelectItem value="video" className="focus:bg-slate-100 dark:focus:bg-zinc-900 focus:text-slate-900 dark:focus:text-white cursor-pointer">Video</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="url" className="text-slate-700 dark:text-slate-300 text-xs font-semibold">Media URL (Unsplash, Video Link, etc.)</Label>
                  <Input 
                    id="url" 
                    name="url" 
                    placeholder="https://images.unsplash.com/..." 
                    required={activeTab === "url"} 
                    className="bg-slate-50 dark:bg-black border-slate-200 dark:border-zinc-800 focus-visible:ring-yellow-400 text-slate-900 dark:text-slate-100 h-9 text-sm" 
                  />
                </div>
              </div>
            )}
          </div>

          {/* Loader Overlay when submitting */}
          {loading && (
            <div className="absolute inset-0 bg-white/85 dark:bg-black/85 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-6 text-center">
              <Loader2 className="w-10 h-10 animate-spin text-yellow-600 dark:text-yellow-400 mb-4" />
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">Processing Creative Showcase</h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 animate-pulse">{uploadStep}</p>
            </div>
          )}

          {/* Footer Actions */}
          <DialogFooter className="pt-4 border-t border-slate-200 dark:border-white/[0.06] shrink-0">
            <Button 
              type="button" 
              variant="ghost" 
              onClick={() => setOpen(false)} 
              className="hover:bg-slate-100 dark:hover:bg-zinc-900 hover:text-slate-900 dark:hover:text-white text-slate-500 dark:text-slate-300 text-xs h-9"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading || (activeTab === "upload" && selectedFiles.length === 0)} 
              className="bg-yellow-400 text-black hover:bg-yellow-500 font-bold min-w-[110px] text-xs h-9"
            >
              {loading ? (
                <span className="flex items-center"><Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" /> Saving...</span>
              ) : activeTab === "upload" ? (
                groupAsProject ? "Save Project" : `Save ${selectedFiles.length} Item(s)`
              ) : (
                "Save Item"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
