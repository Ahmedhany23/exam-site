"use client";
import { useState } from "react";
import { useDeleteExam, useGetExams } from "./hooks/useExamApi";
import { Column, DataTable } from "@/src/components/tables/DataTable";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Exam } from "@/src/types/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@radix-ui/react-alert-dialog";
import { AlertDialogFooter, AlertDialogHeader } from "../ui/alert-dialog";

export const ExamComponent = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, isError } = useGetExams(page, pageSize);
  const { deleteExamMutation, deleteExamLoading } = useDeleteExam();

  const exams = data?.data ?? [];
  const total = data?.meta.total ?? 0;

  const columns: Column<Exam>[] = [
    { key: "title", header: "العنوان", align: "right" },
    { key: "subject_name", header: "المادة", align: "right" },
    {
      key: "exam_type",
      header: "النوع",
      align: "right",
      render: (row) => (row.exam_type === "final" ? "نهائي" : "تجريبي"),
    },
    {
      key: "duration_minutes",
      header: "المدة (دقيقة)",
      align: "right",
    },
    {
      key: "total_score",
      header: "الدرجة الكلية",
      align: "right",
    },
    {
      key: "is_active",
      header: "الحالة",
      align: "right",
      render: (row) => (
        <span
          className={`${
            row.is_active ? "bg-green-600" : "bg-red-600"
          } text-white px-3 py-1 rounded-full text-xs font-medium`}
        >
          {row.is_active ? "نشط" : "غير نشط"}
        </span>
      ),
    },
    {
      key: "start_time",
      header: "تاريخ البداية",
      align: "right",
      render: (row) => new Date(row.start_time).toLocaleString("en-US"),
    },
    {
      key: "end_time",
      header: "تاريخ النهاية",
      align: "right",
      render: (row) => new Date(row.start_time).toLocaleString("en-US"),
    },
    {
      key: "id",
      header: "إجراءات",
      align: "right",
      render: (row) => (
        <div className="flex gap-2">
          <Link href={`/exams/${row.id}/details`}>
            <Button
              size="sm"
              type="button"
              variant={"default"}
              className="bg-blue-600 hover:bg-blue-500 "
            >
              تفاصيل
            </Button>
          </Link>
          <Link href={`/exams/${row.id}/edit`}>
            <Button size="sm" type="button">
              تعديل
            </Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="sm" variant="destructive">
                حذف
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
                <AlertDialogDescription>
                  هل أنت متأكد أنك تريد حذف هذا الامتحان؟ لا يمكن التراجع عن هذه
                  العملية.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>إلغاء</AlertDialogCancel>
                <AlertDialogAction
                  type="submit"
                  disabled={deleteExamLoading}
                  onClick={async () => await deleteExamMutation(row.id)}
                >
                  نعم، احذف
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">الامتحانات</h1>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Link href="/exams/add" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            إضافة امتحان
          </Link>
        </Button>
      </div>

      {/* Table */}
      {isError ? (
        <div className="text-red-600">حدث خطأ أثناء جلب البيانات</div>
      ) : (
        <DataTable
          data={exams}
          loading={isLoading}
          columns={columns}
          page={page}
          pageSize={pageSize}
          total={total}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      )}
    </div>
  );
};
