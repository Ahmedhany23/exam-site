"use client";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

import { Column, DataTable } from "@/src/tools/Tables/DataTable";
import { Student } from "@/src/types/types";
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
import { useDeleteStudent, useGetStudents } from "./hook/useStudentsApis";
import { useUserStore } from "@/src/hooks/useUserStore";

export const StudentsComponent = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { deleteStudentMutation, deleteStudentLoading } = useDeleteStudent();
  const { data, isLoading, error } = useGetStudents(page, pageSize);

  const students = data?.data ?? [];
  const total = data?.meta.total ?? 0;

  const user = useUserStore((state) => state.user);

  const isSchoolAdmin = user?.user_type === "school_admin";

  const columns: Column<Student>[] = [
    { key: "id", header: "ID", align: "right" },
    { key: "name", header: "الاسم", align: "right" },
    { key: "email", header: "البريد", align: "right" },
    { key: "phone", header: "الهاتف", align: "right" },
    { key: "national_id", header: "الرقم القومي", align: "right" },
    { key: "student_code", header: "كود الطالب", align: "right" },

    {
      key: "actions",
      header: "إجراءات",
      render: (row) => (
        <div className="flex gap-2">
          {isSchoolAdmin && (
            <>
              <Link href={`/students/${row.id}/edit`}>
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
                      هل أنت متأكد أنك تريد حذف هذا المدرس؟ لا يمكن التراجع عن
                      هذه العملية.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>إلغاء</AlertDialogCancel>
                    <AlertDialogAction
                      type="submit"
                      disabled={deleteStudentLoading}
                      onClick={async () => await deleteStudentMutation(row.id)}
                    >
                      نعم، احذف
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold"> الطلاب</h1>
        {isSchoolAdmin && (
          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
            <Link href="/students/add" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              إضافة طالب
            </Link>
          </Button>
        )}
      </div>

      {/* Table */}
      {error ? (
        <div className="text-red-600">حدث خطأ أثناء جلب البيانات</div>
      ) : (
        <DataTable
          data={students}
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
