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
import { Column, DataTable } from "@/src/components/tables/DataTable";
import { useDeleteSchool, useGetSchools } from "./hook/useSchoolApis";
import { School } from "@/src/types/types";

export const SchoolsComponent = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, error } = useGetSchools(page, pageSize);

  const { deleteSchoolMutation, deleteSchoolLoading } = useDeleteSchool();

  const schools = data?.data ?? [];
  const total = data?.meta.total ?? 0;

  const columns: Column<School>[] = [
    {
      key: "name",
      header: "الاسم",
      align: "right",
    },
    {
      key: "address",
      header: "العنوان",
      align: "right",
    },
    {
      key: "phone",
      header: "الهاتف",
      align: "right",
    },
    {
      key: "governorate",
      header: "المحافظة",
      align: "right",
      render: (row) => `${row.governorate.name}`,
    },

    {
      key: "id",
      header: "إجراءات",
      render: (row) => (
        <div className="flex gap-2">
          <Link href={`/schools/${row.id}/edit`}>
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
                  هل أنت متأكد أنك تريد حذف هذا المدرسة؟ لا يمكن التراجع عن هذه
                  العملية.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>إلغاء</AlertDialogCancel>
                <AlertDialogAction
                  type="submit"
                  disabled={deleteSchoolLoading}
                  onClick={async () => await deleteSchoolMutation(row.id)}
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
        <h1 className="text-2xl font-bold">المدارس </h1>
        <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
          <Link href="/schools/add" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            إضافة مدرسة
          </Link>
        </Button>
      </div>

      {/* Table */}
      {error ? (
        <div className="text-red-600">حدث خطأ أثناء جلب البيانات</div>
      ) : (
        <DataTable
          data={schools}
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
