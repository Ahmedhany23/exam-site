"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/src/components/ui/select";
import {
  AddEditSchoolAdminSchema,
  addSchoolAdminSchema,
  adminPermissionsKeys,
  editSchoolAdminSchema,
} from "../schema/SchoolSchema";
import z from "zod";
import {
  useAddEditSchoolAdmin,
  useGetSchoolAdmin,
} from "../hook/useSchoolAdminApis";
import { useParams, usePathname } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import { FormError } from "@/src/lib/FormError";
import { useRouter } from "next/navigation";
import { useGetGovernorates } from "@/src/hooks/useGetGovernorate";
import {
  useGetSchools,
  useGetSchoolsByGovernorate,
} from "../../schools/hook/useSchoolApis";
import { Loader } from "../../ui/loader";

type AddSchoolAdminFormValues = z.infer<typeof addSchoolAdminSchema>;
type EditSchoolAdminFormValues = z.infer<typeof editSchoolAdminSchema>;
export type SchoolAdminFormValues =
  | AddSchoolAdminFormValues
  | EditSchoolAdminFormValues;

export const AddEditSchoolAdmin_form = ({ adminId }: { adminId: string }) => {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<SchoolAdminFormValues>({
    resolver: zodResolver(
      adminId ? editSchoolAdminSchema : addSchoolAdminSchema
    ),
    defaultValues: {
      is_active: true,
      admin_permissions: {},
    },
  });

  const governorate = form.watch("governorate_id");

  const { AddEditMutation, AddEditLoading } = useAddEditSchoolAdmin(adminId);

  const { data: governoratesData, isLoading: governoratesLoading } =
    useGetGovernorates();

  const { data, isLoading } = useGetSchoolAdmin(adminId);

  const { data: schools, isLoading: schoolsLoading } =
    useGetSchoolsByGovernorate();

  function onSubmit(values: SchoolAdminFormValues) {
    // Merge first_name, second_name, third_name, and fourth_name into a single name
    const fullName = [
      values.first_name,
      values.second_name,
      values.third_name,
      values.fourth_name,
    ]
      .filter(Boolean) // Remove empty strings
      .join(" ");

    // Build base payload
    const payload: any = {
      ...values,
      name: fullName, // Use the merged name
    };

    // If editing (teacherId exists) and password is empty, remove password fields
    delete payload.first_name;
    delete payload.second_name;
    delete payload.third_name;
    delete payload.fourth_name;

    // If editing (teacherId exists) and password is empty, remove password fields
    if (adminId && !values.password) {
      delete payload.password;
      delete payload.password_confirmation;
    }

    AddEditMutation(payload)
      .then(() => {
        form.reset();
        router.back();
      })
      .catch((err) => FormError<SchoolAdminFormValues>(err, form));
  }

  useEffect(() => {
    if (data) {
      let name = data.user.name.split(" ");
      let first_name = name[0];
      let second_name = name[1];
      let third_name = name[2];
      let fourth_name = name[3];
      form.setValue("first_name", first_name);
      form.setValue("second_name", second_name);
      form.setValue("third_name", third_name);
      form.setValue("fourth_name", fourth_name);
      form.setValue("email", data.user.email);
      form.setValue("is_active", data.user.is_active);
      form.setValue("admin_permissions", data.admin_permissions);
      form.setValue("national_id", data.user.national_id);
      form.setValue("phone", data.user.phone);
      form.setValue("governorate_id", data.school.governorate_id);
    }
  }, [data]);

  useEffect(() => {
    if (schools?.data && data?.school_id) {
      const exists = schools.data.some(
        (s) => String(s.id) === String(data.school_id)
      );
      if (exists) {
        form.setValue("school_id", String(data.school_id));
      }
    }
  }, [schools, data]);

  useEffect(() => {
    if (governorate) {
      router.replace(pathname + `?governorate_id=${governorate}`, {
        scroll: false,
      });
    }
  }, [governorate]);

  if (isLoading && governoratesLoading) {
    return <Loader />;
  }

  return (
    <Form {...form}>
      <form
        className="space-y-6 max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-sm border"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* First Name */}
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الاسم الأول</FormLabel>
                <Input {...field} placeholder="أدخل الاسم الأول" />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Second Name */}
          <FormField
            control={form.control}
            name="second_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الاسم الثاني</FormLabel>
                <Input {...field} placeholder="أدخل الاسم الثاني" />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Third Name */}
          <FormField
            control={form.control}
            name="third_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الاسم الثالث</FormLabel>
                <Input {...field} placeholder="أدخل الاسم الثالث" />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Fourth Name */}
          <FormField
            control={form.control}
            name="fourth_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الاسم الرابع</FormLabel>
                <Input {...field} placeholder="أدخل الاسم الرابع" />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>البريد الإلكتروني</FormLabel>
                <Input {...field} placeholder="example@mail.com" />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>رقم الهاتف</FormLabel>
                <Input {...field} placeholder="أدخل رقم الهاتف" />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* National ID */}
        <FormField
          control={form.control}
          name="national_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الرقم القومي</FormLabel>
              <Input {...field} placeholder="أدخل الرقم القومي" />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* password*/}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>كلمة المرور</FormLabel>
                <Input type="password" {...field} placeholder="********" />
                <FormMessage />
              </FormItem>
            )}
          />

          {/*password_confirmation*/}
          <FormField
            control={form.control}
            name="password_confirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>تأكيد كلمة المرور</FormLabel>
                <Input type="password" {...field} placeholder="********" />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* governorate_id */}
        <FormField
          control={form.control}
          name="governorate_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>المحافظة</FormLabel>
              <Select
                dir="rtl"
                {...field}
                onValueChange={field.onChange}
                value={String(field.value)}
                disabled={governoratesLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر المحافظة" />
                </SelectTrigger>
                <SelectContent>
                  {governoratesData?.map((gov) => (
                    <SelectItem key={gov.id} value={String(gov.id)}>
                      {gov.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* school */}
        <FormField
          control={form.control}
          name="school_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>المدرسة</FormLabel>
              <Select
                dir="rtl"
                onValueChange={field.onChange}
                value={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر المدرسة" />
                </SelectTrigger>
                <SelectContent>
                  {schools?.data.map((school) => (
                    <SelectItem key={school.id} value={String(school.id)}>
                      {school.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* status */}
        <FormField
          control={form.control}
          name="is_active"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <FormLabel>نشط</FormLabel>
            </FormItem>
          )}
        />

        {/* permissions */}
        <div>
          <FormLabel>صلاحيات المدير</FormLabel>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {adminPermissionsKeys.map((perm) => (
              <FormField
                key={perm}
                control={form.control}
                name={`admin_permissions.${perm}`}
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <Checkbox
                      checked={!!field.value}
                      onCheckedChange={field.onChange}
                    />
                    <FormLabel>
                      {perm === "manage_students" && "إدارة الطلاب"}
                      {perm === "view_reports" && "عرض التقارير"}
                      {perm === "manage_school_settings" &&
                        "إدارة إعدادات المدرسة"}
                      {perm === "manage_exams" && "إدارة الامتحانات"}
                    </FormLabel>
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={AddEditLoading}>
          {AddEditLoading ? (
            <>
              <Loader2Icon className="animate-spin" />
              برجاء الانتظار
            </>
          ) : adminId ? (
            "تعديل"
          ) : (
            "اضافة"
          )}
        </Button>
      </form>
    </Form>
  );
};
