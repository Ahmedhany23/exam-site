"use client";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import {
  useDeleteTeacher,
  useGetTeachers,
  useToggleTeacherStatus,
} from "./hooks/useTeacherApi";
import { Column, DataTable } from "@/src/tools/Tables/DataTable";
import { Teacher } from "@/src/types/types";
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

export const TeachersComponent = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, error, isLoading } = useGetTeachers(page, pageSize);

  const teachers = data?.data ?? [];
  const total = data?.meta.total ?? 0;

  const { toggleStatusMutation, toggleStatusLoading } =
    useToggleTeacherStatus();

  const { deleteTeacherMutation, deleteTeacherLoading } = useDeleteTeacher();

  const columns: Column<Teacher>[] = [
    { key: "id", header: "ID", align: "right" },
    { key: "name", header: "الاسم", align: "right" },
    { key: "email", header: "البريد", align: "right" },
    {
      key: "actions",
      header: "إجراءات",
      render: (row) => (
        <div className="flex gap-2">
          {/* تعديل */}
          <Link href={`/teacher/${row.teacher_id}/edit`}>
            <Button size="sm" type="button">
              تعديل
            </Button>
          </Link>

          <Button
            size="sm"
            variant={row.is_active ? "default" : "destructive"}
            disabled={toggleStatusLoading}
            onClick={async () => await toggleStatusMutation(row.teacher_id)}
          >
            {row.is_active ? " نشط" : " غير نشط"}
          </Button>

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
                  هل أنت متأكد أنك تريد حذف هذا المدرس؟ لا يمكن التراجع عن هذه
                  العملية.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>إلغاء</AlertDialogCancel>
                <AlertDialogAction
                  type="submit"
                  disabled={deleteTeacherLoading}
                  onClick={async () =>
                    await deleteTeacherMutation(row.teacher_id)
                  }
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
        <h1 className="text-2xl font-bold">المدرسين</h1>
        <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
          <Link href="/teacher/add" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            إضافة مدرس
          </Link>
        </Button>
      </div>

      {/* Table */}
      {error ? (
        <div className="text-red-600">حدث خطأ أثناء جلب البيانات</div>
      ) : (
        <DataTable
          data={teachers}
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
