"use client";
import React from "react";
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
  AddEditSchoolAdminSchemaType,
  adminPermissionsKeys,
} from "../schema/SchoolSchema";
import z from "zod";
import { useAddEditSchoolAdmin } from "../hook/useSchoolAdminApis";
import { useParams } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import { FormError } from "@/lib/FormError";
import { useRouter } from "next/navigation";

type FormValues = z.infer<typeof AddEditSchoolAdminSchema>;

type Props = {
  adminId: string;
};
export const AddEditSchoolAdmin_form = ({ adminId }: Props) => {
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(AddEditSchoolAdminSchema),
    defaultValues: {
      is_active: true,
      admin_permissions: {},
    },
  });

  const { AddEditMutation, AddEditLoading } = useAddEditSchoolAdmin(adminId);

  function onSubmit(values: FormValues) {
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

    AddEditMutation(values)
      .then(() => {
        form.reset();
        router.back();
      })
      .catch((err) => FormError<FormValues>(err, form));
  }

  return (
    <Form {...form}>
      <form
        className="space-y-6 max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-sm border"
        onSubmit={form.handleSubmit(onSubmit)}
      >
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

        {/* school */}
        <FormField
          control={form.control}
          name="school_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>المدرسة</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر المدرسة" />
                </SelectTrigger>
                <SelectContent>
                  {/* هنا تضيف المدارس من الـ API */}
                  <SelectItem value="1">مدرسة 1</SelectItem>
                  <SelectItem value="2">مدرسة 2</SelectItem>
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
