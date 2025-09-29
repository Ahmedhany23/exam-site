"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/src/components/ui/button";

interface ErrorMessageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorMessage({
  title = "حدث خطأ",
  message = "عذراً، لم نتمكن من تحميل البيانات.",
  onRetry,
}: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-6 border rounded-xl bg-red-50 text-red-700 shadow-sm">
      <AlertTriangle className="h-10 w-10 mb-3 text-red-500" />
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm text-red-600 mt-1">{message}</p>

      {onRetry && (
        <Button
          onClick={onRetry}
          className="mt-4 bg-red-600 hover:bg-red-700 text-white"
        >
          إعادة المحاولة
        </Button>
      )}
    </div>
  );
}
