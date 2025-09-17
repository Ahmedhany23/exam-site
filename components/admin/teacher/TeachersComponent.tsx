"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useGetTeachers } from "./hooks/useTeacherApi";

export const TeachersComponent = () => {
  const { data, isFetching, error } = useGetTeachers();

  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold">المدرسين</h1>
      <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
        <Link href="/admin/teacher/add" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          إضافة مدرس
        </Link>
      </Button>
    </div>
  );
};
