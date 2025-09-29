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
import {
  useDeleteSchoolAdmin,
  useGetSchoolAdmins,
} from "./hook/useSchoolAdminApis";

export const SchoolAdminComponent = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, error } = useGetSchoolAdmins(page, pageSize);

  const { deleteSchoolAdminMutation, deleteSchoolAdminLoading } =
    useDeleteSchoolAdmin();

  const schoolAdmins = data?.data ?? [];
  const total = data?.meta.total ?? 0;

  const columns: Column<any>[] = [
    {
      key: "name",
      header: "الاسم",
      align: "right",
      render: (row) => `${row.user.name}`,
    },
    {
      key: "email",
      header: "البريد",
      align: "right",
      render: (row) => `${row.user.email}`,
    },
    {
      key: "phone",
      header: "الهاتف",
      align: "right",
      render: (row) => `${row.user.phone}`,
    },
    {
      key: "national_id",
      header: "رقم القومي",
      align: "right",
      render: (row) => `${row.user.national_id}`,
    },
    {
      key: "admin_permissions",
      header: "صلاحيات",
      align: "right",
      render: (row) => {
        const perms = row.admin_permissions;
        return Object.keys(perms)
          .filter((key) => perms[key])
          .map((key) => {
            switch (key) {
              case "manage_exams":
                return "إدارة الامتحانات";
              case "view_reports":
                return "عرض التقارير";
              case "manage_students":
                return "إدارة الطلاب";
              case "manage_school_settings":
                return "إعدادات المدرسة";
              default:
                return key;
            }
          })
          .join("، ");
      },
    },
    {
      key: "actions",
      header: "إجراءات",
      render: (row) => (
        <div className="flex gap-2">
          <Link href={`/school-admins/${row.id}/edit`}>
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
                  هل أنت متأكد أنك تريد حذف هذا المدير؟ لا يمكن التراجع عن هذه
                  العملية.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>إلغاء</AlertDialogCancel>
                <AlertDialogAction
                  type="submit"
                  disabled={deleteSchoolAdminLoading}
                  onClick={async () => await deleteSchoolAdminMutation(row.id)}
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
        <h1 className="text-2xl font-bold">مديرين المدرسة</h1>
        <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
          <Link href="/school-admins/add" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            إضافة مدير
          </Link>
        </Button>
      </div>

      {/* Table */}
      {error ? (
        <div className="text-red-600">حدث خطأ أثناء جلب البيانات</div>
      ) : (
        <DataTable
          data={schoolAdmins}
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
