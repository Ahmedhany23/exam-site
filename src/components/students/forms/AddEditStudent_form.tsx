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

import z from "zod";
import { useAddEditStudent, useGetStudent } from "../hook/useStudentsApis";
import { Loader2Icon } from "lucide-react";
import { FormError } from "@/src/lib/FormError";
import { useRouter } from "next/navigation";
import { addStudentSchema, editStudentSchema } from "../schema/StudentSchema";

type Props = {
  studentId: string;
};

// ================= Schema Types =================
type AddStudentFormValues = z.infer<typeof addStudentSchema>;
type EditStudentFormValues = z.infer<typeof editStudentSchema>;
export type StudentFormValues = AddStudentFormValues | EditStudentFormValues;

export const AddEditStudent_form = ({ studentId }: Props) => {
  const router = useRouter();

  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentId ? editStudentSchema : addStudentSchema),
  });

  const { AddEditMutation, AddEditLoading } = useAddEditStudent(studentId);

  const { data: student, isLoading } = useGetStudent(studentId);

  useEffect(() => {
    if (student) {
      // Split the full name into parts
      const nameParts = student.name.split(" ");

      form.reset({
        first_name: nameParts[0] || "",
        second_name: nameParts[1] || "",
        third_name: nameParts[2] || "",
        fourth_name: nameParts[3] || "",
        email: student.email,
        phone: student.phone,
        national_id: student.national_id,
        academic_year: student.academic_year,
        section: student.section,
        birth_date: student.birth_date ? student.birth_date.split("T")[0] : "",
        gender: student.gender,
        guardian_phone: student.guardian_phone,
      });
    }
  }, [student]);
  function onSubmit(values: StudentFormValues) {
    // Merge first_name, second_name, third_name, and fourth_name into a single name
    const fullName = [
      values.first_name,
      values.second_name,
      values.third_name,
      values.fourth_name,
    ]
      .filter(Boolean) // Remove empty strings
      .join(" ");

    const payload: any = {
      ...values,
      name: fullName, // Use the merged name
    };

    // If editing (teacherId exists) and password is empty, remove password fields
    delete payload.first_name;
    delete payload.second_name;
    delete payload.third_name;
    delete payload.fourth_name;

    if (studentId && !values.password) {
      delete payload.password;
      delete payload.password_confirmation;
    }

    AddEditMutation(payload)
      .then(() => {
        form.reset();
        router.back();
      })
      .catch((err) => FormError<StudentFormValues>(err, form));
  }

  return (
    <Form {...form}>
      <form
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-sm border"
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

        {/* Guardian Phone */}
        <FormField
          control={form.control}
          name="guardian_phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>رقم هاتف ولي الأمر</FormLabel>
              <Input {...field} placeholder="أدخل رقم هاتف ولي الأمر" />
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

        {/* Academic Year */}
        <FormField
          control={form.control}
          name="academic_year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الصف الدراسي</FormLabel>
              <Select
                dir="rtl"
                {...field}
                onValueChange={field.onChange}
                value={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر الصف الدراسي" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="first">الأول</SelectItem>
                  <SelectItem value="second">الثاني</SelectItem>
                  <SelectItem value="third">الثالث</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Section */}
        <FormField
          control={form.control}
          name="section"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الشعبة</FormLabel>
              <Select
                dir="rtl"
                {...field}
                onValueChange={field.onChange}
                value={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر الشعبة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scientific">علمي</SelectItem>
                  <SelectItem value="literature">أدبي</SelectItem>
                  <SelectItem value="common"> عام</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Gender */}
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الجنس</FormLabel>
              <Select
                dir="rtl"
                {...field}
                onValueChange={field.onChange}
                value={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر الجنس" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">ذكر</SelectItem>
                  <SelectItem value="female">أنثى</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Birth Date */}
        <FormField
          control={form.control}
          name="birth_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>تاريخ الميلاد</FormLabel>
              <Input dir="rtl" type="date" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
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

        {/* Password Confirmation */}
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

        {/* Submit Button */}
        <div className="md:col-span-2 lg:col-span-4">
          <Button type="submit" className="w-full" disabled={AddEditLoading}>
            {AddEditLoading ? (
              <>
                <Loader2Icon className="animate-spin" />
                برجاء الانتظار
              </>
            ) : studentId ? (
              "تعديل"
            ) : (
              "اضافة"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
