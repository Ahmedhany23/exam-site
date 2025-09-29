"use client";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

import { Column, DataTable } from "@/src/components/tables/DataTable";
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
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const StudentsComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const academicYear = searchParams.get("academic_year") || "";

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // hooks
  const { deleteStudentMutation, deleteStudentLoading } = useDeleteStudent();
  const { data, isLoading, error } = useGetStudents(page, pageSize);

  const students = data?.data ?? [];
  const total = data?.meta.total ?? 0;

  // user
  const user = useUserStore((state) => state.user);

  // permission
  const isSchoolAdmin = user?.user_type === "school_admin";

  // columns
  const columns: Column<Student>[] = [
    { key: "id", header: "ID", align: "right" },
    { key: "name", header: "الاسم", align: "right" },
    { key: "email", header: "البريد", align: "right" },
    { key: "phone", header: "الهاتف", align: "right" },
    { key: "national_id", header: "الرقم القومي", align: "right" },
    {
      key: "academic_year",
      header: "السنة الدراسية",
      align: "right",
      render: (row) =>
        `${
          row.academic_year === "first"
            ? "السنة الاولى"
            : row.academic_year === "second"
            ? "السنة الثانية"
            : "السنة الثالثة"
        }`,
    },
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

  // filters
  const handleAcademicYearChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") params.delete("academic_year");
    else if (value) params.set("academic_year", value);
    else params.delete("academic_year");
    router.push(`?${params.toString()}`);
  };

  const handleSearchChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    router.push(`?${params.toString()}`);
  };

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
          search={search}
          onSearchChange={handleSearchChange}
          extraFilters={
            <Select
              dir="rtl"
              value={academicYear}
              onValueChange={handleAcademicYearChange}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="اختر السنة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">الكل</SelectItem>
                <SelectItem value="first">السنة الأولى</SelectItem>
                <SelectItem value="second">السنة الثانية</SelectItem>
                <SelectItem value="third">السنة الثالثة</SelectItem>
              </SelectContent>
            </Select>
          }
        />
      )}
    </div>
  );
};
