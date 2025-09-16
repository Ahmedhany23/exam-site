"use client";

import { AlertCircle } from "lucide-react";

type FormErrorProps = {
  message?: string;
};

export function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  return (
    <div className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
      <AlertCircle className="h-4 w-4 text-red-500" />
      <span>{message}</span>
    </div>
  );
}
