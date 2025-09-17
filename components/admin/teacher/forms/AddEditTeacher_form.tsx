"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAddEditTeacher } from "../hooks/useTeacherApi";
import { FormError } from "@/lib/FormError";
import { teacherSchema } from "../schema/TeacherSchema";

// ================= Schema =================


type TeacherFormValues = z.infer<typeof teacherSchema>;

// ================= Helper Components =================
function TextField({
  form,
  name,
  label,
  type = "text",
  placeholder,
}: {
  form: any;
  name: keyof TeacherFormValues;
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type={type} placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function SelectField({
  form,
  name,
  label,
  placeholder,
  options,
}: {
  form: any;
  name: keyof TeacherFormValues;
  label: string;
  placeholder: string;
  options: { value: string; label: string }[];
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function CheckboxField({
  form,
  name,
  label,
}: {
  form: any;
  name: keyof TeacherFormValues;
  label: string;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex items-center space-x-2 space-x-reverse">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <FormLabel className="cursor-pointer">{label}</FormLabel>
        </FormItem>
      )}
    />
  );
}

// ================= Main Form =================
export function AddEditTeacher_form() {
  const router = useRouter();

  const { teacherId } = useParams<{ teacherId: string }>();

  const { AddEditMutation, AddEditLoading } = useAddEditTeacher();

  const form = useForm<TeacherFormValues>({
    resolver: zodResolver(teacherSchema),
    defaultValues: {
      first_name: "",
      second_name: "",
      third_name: "",
      fourth_name: "",
      email: "",
      phone: "",
      national_id: "",
      password: "",
      password_confirmation: "",
      subject_specialization: "",
      teacher_type: "regular",
      can_create_exams: false,
      can_correct_essays: false,
      is_active: true,
      school_ids: [],
      assignment_type: "teaching",
    },
  });

  const onSubmit = async (data: TeacherFormValues) => {
    const payload = {
      ...data,
      name: `${data.first_name} ${data.second_name} ${data.third_name} ${data.fourth_name}`,
    };

    await AddEditMutation(payload)
      .then(() => {
        form.reset();
        router.back();
      })
      .catch((err) => FormError<TeacherFormValues>(err, form));
  };
  return (
    <div className="container mx-auto py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {teacherId ? "تعديل بيانات المدرس" : "إضافة مدرس جديد"}
        </h1>
        <p className="text-gray-600 mt-2">
          {teacherId
            ? "قم بتعديل بيانات المدرس أدناه"
            : "أدخل بيانات المدرس الجديد"}
        </p>
      </div>

      {/* Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-sm border"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <TextField
              form={form}
              name="first_name"
              label="الاسم الأول *"
              placeholder="الاسم الأول"
            />
            <TextField
              form={form}
              name="second_name"
              label="الاسم الثاني *"
              placeholder="الاسم الثاني"
            />
            <TextField
              form={form}
              name="third_name"
              label="الاسم الثالث *"
              placeholder="الاسم الثالث"
            />
            <TextField
              form={form}
              name="fourth_name"
              label="الاسم الرابع *"
              placeholder="الاسم الرابع"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              form={form}
              name="email"
              label="البريد الإلكتروني *"
              placeholder="example@email.com"
            />
            <TextField
              form={form}
              name="phone"
              label="رقم الهاتف *"
              placeholder="0123456789"
            />
          </div>

          <TextField
            form={form}
            name="national_id"
            label="الرقم القومي *"
            placeholder="الرقم القومي"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              form={form}
              name="password"
              label="كلمة المرور *"
              type="password"
              placeholder="********"
            />
            <TextField
              form={form}
              name="password_confirmation"
              label="تأكيد كلمة المرور *"
              type="password"
              placeholder="********"
            />
          </div>

          <TextField
            form={form}
            name="subject_specialization"
            label="التخصص *"
            placeholder="مثال: رياضيات، عربي، إنجليزي، علوم"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              form={form}
              name="teacher_type"
              label="نوع المدرس"
              placeholder="اختر النوع"
              options={[
                { value: "regular", label: "عادي" },
                { value: "supervisor", label: "مشرف" },
              ]}
            />
            <SelectField
              form={form}
              name="assignment_type"
              label="نوع المهمة"
              placeholder="اختر المهمة"
              options={[
                { value: "teaching", label: "تدريس" },
                { value: "supervision", label: "إشراف" },
                { value: "correction", label: "تصحيح" },
              ]}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
              الصلاحيات والإعدادات
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <CheckboxField
                form={form}
                name="can_create_exams"
                label="يمكنه إنشاء الامتحانات"
              />
              <CheckboxField
                form={form}
                name="can_correct_essays"
                label="يمكنه تصحيح المقالي"
              />
              <CheckboxField form={form} name="is_active" label="نشط" />
            </div>
          </div>

          <div className="flex justify-end gap-4 space-x-reverse pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              disabled={AddEditLoading}
            >
              إعادة تعيين
            </Button>
            <Button
              type="submit"
              disabled={AddEditLoading}
              className="min-w-[120px]"
            >
              {AddEditLoading
                ? "جاري الحفظ..."
                : teacherId
                ? "تحديث البيانات"
                : "إضافة المدرس"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
