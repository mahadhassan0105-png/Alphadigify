"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Trash2, Loader2, Info } from "lucide-react";

export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
  loading?: boolean;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you absolutely sure?",
  description = "This action cannot be undone. This will permanently delete this item and remove its data from our servers.",
  confirmText = "Delete",
  cancelText = "Cancel",
  variant = "danger",
  loading = false,
}: ConfirmModalProps) {
  const getIcon = () => {
    switch (variant) {
      case "danger":
        return <Trash2 className="w-5 h-5 text-red-500 dark:text-red-400" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />;
      case "info":
      default:
        return <Info className="w-5 h-5 text-blue-500 dark:text-blue-400" />;
    }
  };

  const getIconBg = () => {
    switch (variant) {
      case "danger":
        return "bg-red-500/10 border-red-500/20";
      case "warning":
        return "bg-yellow-500/10 border-yellow-500/20";
      case "info":
      default:
        return "bg-blue-500/10 border-blue-500/20";
    }
  };

  const getConfirmButtonClasses = () => {
    switch (variant) {
      case "danger":
        return "bg-red-600 hover:bg-red-700 text-white font-bold shadow-md shadow-red-600/20 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-0";
      case "warning":
        return "bg-yellow-400 hover:bg-yellow-500 text-black font-bold shadow-md shadow-yellow-400/20 focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-0";
      case "info":
      default:
        return "bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-600/20 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && !loading && onClose()}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-slate-100 p-6 rounded-2xl shadow-2xl">
        <DialogHeader className="space-y-3">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${getIconBg()}`}>
              {getIcon()}
            </div>
            <DialogTitle className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
              {title}
            </DialogTitle>
          </div>
          <DialogDescription className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
            {description}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-row items-center justify-end gap-3 sm:space-x-0 pt-4 border-t border-slate-150 dark:border-white/[0.06] mt-2">
          {cancelText ? (
            <Button
              type="button"
              variant="ghost"
              disabled={loading}
              onClick={onClose}
              className="bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-300 shadow-sm dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:text-slate-300 dark:hover:text-white dark:border-zinc-800 font-medium px-4 h-10 rounded-xl transition-all focus-visible:ring-2 focus-visible:ring-slate-300 dark:focus-visible:ring-zinc-700 focus-visible:ring-offset-0"
            >
              {cancelText}
            </Button>
          ) : null}
          <Button
            type="button"
            disabled={loading}
            onClick={onConfirm}
            className={`min-w-[100px] h-10 rounded-xl flex items-center justify-center gap-2 ${getConfirmButtonClasses()}`}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <span>{confirmText}</span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
