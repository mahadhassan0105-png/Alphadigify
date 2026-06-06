"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Loader2 } from "lucide-react";

export default function AddClientModal() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      company: formData.get("company"),
      service: formData.get("service"),
    };

    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to create client");
      
      setOpen(false);
      router.refresh(); // Refresh the page to show the new client
    } catch (err) {
      setError("An error occurred while creating the client.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-yellow-400 text-black hover:bg-yellow-500 font-semibold shadow-[0_0_15px_rgba(250,204,21,0.3)] hover:shadow-[0_0_25px_rgba(250,204,21,0.5)] transition-all">
          <Plus className="mr-2 h-4 w-4" /> Add Client
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-[#111111] border-slate-200 dark:border-white/[0.06] text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add New Client</DialogTitle>
          <DialogDescription className="text-slate-500 dark:text-slate-400">
            Enter the details of the new client to add them to the agency CRM.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {error && <div className="text-red-400 text-sm bg-red-400/10 p-3 rounded border border-red-400/20">{error}</div>}
          
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-700 dark:text-slate-300">Full Name</Label>
            <Input id="name" name="name" placeholder="John Doe" required className="bg-slate-50 dark:bg-black border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-slate-100 focus-visible:ring-yellow-400" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">Email Address</Label>
            <Input id="email" name="email" type="email" placeholder="john@company.com" required className="bg-slate-50 dark:bg-black border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-slate-100 focus-visible:ring-yellow-400" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company" className="text-slate-700 dark:text-slate-300">Company Name</Label>
            <Input id="company" name="company" placeholder="Acme Corp" className="bg-slate-50 dark:bg-black border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-slate-100 focus-visible:ring-yellow-400" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-slate-700 dark:text-slate-300">Phone Number (Optional)</Label>
            <Input id="phone" name="phone" placeholder="+1 (555) 000-0000" className="bg-slate-50 dark:bg-black border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-slate-100 focus-visible:ring-yellow-400" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="service" className="text-slate-700 dark:text-slate-300">Primary Service</Label>
            <Select name="service" required defaultValue="Digital Marketing">
              <SelectTrigger className="bg-slate-50 dark:bg-black border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-slate-100 focus:ring-yellow-400">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-[#111111] border-slate-200 dark:border-white/[0.06] text-slate-900 dark:text-slate-100">
                <SelectItem value="Digital Marketing" className="focus:bg-slate-100 dark:focus:bg-zinc-900 focus:text-slate-900 dark:focus:text-white cursor-pointer">Digital Marketing</SelectItem>
                <SelectItem value="SEO Mastery" className="focus:bg-slate-100 dark:focus:bg-zinc-900 focus:text-slate-900 dark:focus:text-white cursor-pointer">SEO Mastery</SelectItem>
                <SelectItem value="Web Design" className="focus:bg-slate-100 dark:focus:bg-zinc-900 focus:text-slate-900 dark:focus:text-white cursor-pointer">Web Design</SelectItem>
                <SelectItem value="TikTok Shop Management" className="focus:bg-slate-100 dark:focus:bg-zinc-900 focus:text-slate-900 dark:focus:text-white cursor-pointer">TikTok Shop Management</SelectItem>
                <SelectItem value="Amazon FBA" className="focus:bg-slate-100 dark:focus:bg-zinc-900 focus:text-slate-900 dark:focus:text-white cursor-pointer">Amazon FBA</SelectItem>
                <SelectItem value="AI Solutions" className="focus:bg-slate-100 dark:focus:bg-zinc-900 focus:text-slate-900 dark:focus:text-white cursor-pointer">AI Solutions</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)} className="text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-zinc-800 hover:text-slate-900 dark:hover:text-white">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-yellow-400 text-black hover:bg-yellow-500 font-semibold min-w-[100px]">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Client"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
