"use client";

import React from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { AlertTriangle, Trash2 } from "lucide-react";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "destructive" | "safe";
  isLoading?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "destructive",
  isLoading = false,
}: ConfirmDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="">
      <div className="flex flex-col items-center text-center gap-4 py-2">
        <div
          className={`rounded-full p-3 ${
            variant === "destructive"
              ? "bg-rose-50 text-rose-600"
              : "bg-amber-50 text-amber-600"
          }`}
        >
          {variant === "destructive" ? (
            <Trash2 className="h-6 w-6" />
          ) : (
            <AlertTriangle className="h-6 w-6" />
          )}
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-800">{title}</h3>
          <p className="text-sm text-slate-500 mt-1 leading-relaxed max-w-xs">
            {description}
          </p>
        </div>
        <div className="flex gap-3 w-full pt-2 border-t">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 cursor-pointer"
            disabled={isLoading}
          >
            {cancelLabel}
          </Button>
          <Button
            variant={variant === "destructive" ? "destructive" : "default"}
            onClick={onConfirm}
            className="flex-1 cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
