"use client";
import { Button } from "@/src/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/src/components/ui/alert-dialog";
import { Column, DataTable } from "@/src/tools/Tables/DataTable";
import { Subject } from "@/src/types/types";
import clsx from "clsx";
import { useDeleteSubject, useGetSubjects } from "./hooks/useSubjectsApi";

export const SubjectsComponent = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: subjects, isError, isLoading } = useGetSubjects();

  const { deleteSubjectMutation, deleteSubjectLoading } = useDeleteSubject();

  const columns: Column<Subject>[] = [
    { key: "name", header: "الاسم", align: "right" },
    {
      key: "section",
      header: "الشعبة",
      align: "right",
      render: (row) =>
        row.section === "scientific"
          ? "علمي"
          : row.section === "literature"
          ? "ادبي"
          : "عام",
    },
    {
      key: "code",
      header: "الكود",
      align: "right",
    },
    {
      key: "duration_minutes",
      header: "المدة",
      align: "right",
    },
    {
      key: "max_score",
      header: "الحد الاقصى",
      align: "right",
    },
    {
      key: "has_essay_questions",
      header: "يحتوي على أسئلة مقالية",
      align: "right",
      render: (row) => (row.has_essay_questions === true ? "نعم" : "لا"),
    },
    {
      key: "is_active",
      header: "نشط",
      align: "right",
      render: (row) => (
        <span
          className={`${clsx(
            row.is_active === true ? " bg-green-600" : " bg-red-600"
          )} text-white px-3 py-1 rounded-full text-xs font-medium`}
        >
          {row.is_active === true ? "نشط" : "غير نشط"}
        </span>
      ),
    },
    {
      key: "id",
      header: "إجراءات",
      align: "right",
      render: (row) => (
        <div className="flex gap-2">
          <Link href={`/subjects/${row.id}/edit`}>
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
                  هل أنت متأكد أنك تريد حذف هذا المادة؟ لا يمكن التراجع عن هذه
                  العملية.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>إلغاء</AlertDialogCancel>
                <AlertDialogAction
                  type="submit"
                  disabled={deleteSubjectLoading}
                  onClick={async () => await deleteSubjectMutation(row.id)}
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
        <h1 className="text-2xl font-bold">المواد</h1>
        <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
          <Link href="/subjects/add" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            إضافة مادة
          </Link>
        </Button>
      </div>

      {/* Table */}
      {isError ? (
        <div className="text-red-600">حدث خطأ أثناء جلب البيانات</div>
      ) : (
        <DataTable
          data={subjects ?? []}
          loading={isLoading}
          columns={columns}
          page={page}
          pageSize={pageSize}
          total={subjects?.length ?? 0}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      )}
    </div>
  );
};
