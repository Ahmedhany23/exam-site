"use client";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import {
  useGetTeacherSchoolAssignments,
  useDeleteTeacherSchoolAssignment,
} from "./hooks/useTeacherSchoolAssignmentApi";
import { Column, DataTable } from "@/src/components/tables/DataTable";
import { TeacherSchoolAssignment } from "@/src/types/types";
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

export const TeacherSchoolAssignmentsComponent = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, error, isLoading } = useGetTeacherSchoolAssignments(
    page,
    pageSize
  );

  const teachers = data?.data ?? [];
  const total = data?.meta.total ?? 0;

  const {
    deleteTeacherSchoolAssignmentMutation,
    deleteTeacherSchoolAssignmentLoading,
  } = useDeleteTeacherSchoolAssignment();

  const columns: Column<TeacherSchoolAssignment>[] = [
    { key: "id", header: "ID", align: "right" },
    {
      key: "teacher_name",
      header: "اسم المدرس",
      align: "right",
    },
    {
      key: "school_name",
      header: "اسم المدرسة",
      align: "right",
    },
    {
      key: "assignment_type",
      header: "نوع التعيين",
      align: "right",
    },
    {
      key: "school_address",
      header: "عنوان المدرسة",
      align: "right",
    },
    {
      key: "teacher_phone",
      header: "رقم الجوال",
      align: "right",
    },

    {
      key: "actions",
      header: "إجراءات",
      render: (row) => (
        <div className="flex gap-2">
          <Link href={`/teacher-school-assignment/${row.id}/edit`}>
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
                  هل أنت متأكد أنك تريد حذف هذا المدرس من المدرسة؟ لا يمكن
                  التراجع عن هذه العملية.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>إلغاء</AlertDialogCancel>
                <AlertDialogAction
                  type="submit"
                  disabled={deleteTeacherSchoolAssignmentLoading}
                  onClick={async () =>
                    await deleteTeacherSchoolAssignmentMutation(row.id)
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
        <h1 className="text-2xl font-bold">المدرسين المدرسة</h1>
        <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
          <Link
            href="/teacher-school-assignment/add"
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            إضافة مدرس الي المدرسة
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
