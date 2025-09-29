"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import {
  useAddEditTeacherSchoolAssignment,
  useGetTeacherSchoolAssignment,
} from "../hooks/useTeacherSchoolAssignmentApi";
import { useGetTeachers } from "../../teacher/hooks/useTeacherApi";
import { useGetSchools } from "../../schools/hook/useSchoolApis";
import { useForm } from "react-hook-form";
import { Form } from "@/src/components/ui/form";
import {
  TeacherSchoolAssignmentFormValues,
  teacherSchoolAssignmentSchema,
} from "../schema/teacherSchoolAssignmentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormError } from "@/src/lib/FormError";
import { ErrorMessage } from "../../ui/error";
import { Loader } from "../../ui/loader";
import SelectField from "../../fields/SelectField";
import CheckboxField from "../../fields/CheckboxField";
import { Button } from "../../ui/button";

// ================= Main Form =================
export const AddEditTeacherSchoolAssignment_form = () => {
  const router = useRouter();

  const { teacherSchoolAssignmentId } = useParams<{
    teacherSchoolAssignmentId: string;
  }>();

  const { AddEditMutation, AddEditLoading } = useAddEditTeacherSchoolAssignment(
    teacherSchoolAssignmentId
  );

  const { data: teachers, isLoading: teachersLoading } = useGetTeachers();

  const { data: schools, isLoading: schoolsLoading } = useGetSchools();

  const {
    data: teacherSchoolAssignment,
    isLoading,
    isError,
  } = useGetTeacherSchoolAssignment(teacherSchoolAssignmentId);

  const form = useForm<TeacherSchoolAssignmentFormValues>({
    resolver: zodResolver(teacherSchoolAssignmentSchema),
    defaultValues: {
      teacher_id: undefined,
      school_id: undefined,
      is_active: true,
      assignment_type: "teaching",
    },
  });

  const onSubmit = async (data: TeacherSchoolAssignmentFormValues) => {
    let payload = teacherSchoolAssignmentId
      ? { ...data, id: teacherSchoolAssignmentId }
      : data;

    await AddEditMutation(payload)
      .then(() => {
        form.reset();
        router.back();
      })
      .catch((err) => FormError<TeacherSchoolAssignmentFormValues>(err, form));
  };

  useEffect(() => {
    if (teacherSchoolAssignment) {
      const values = {
        teacher_id: String(teacherSchoolAssignment.teacher_id),
        school_id: String(teacherSchoolAssignment.school_id),
        is_active: teacherSchoolAssignment.is_active,
        assignment_type: teacherSchoolAssignment.assignment_type,
      };
      console.log("Resetting form with:", values);
      form.reset(values);
    }
  }, [teacherSchoolAssignment]);

  if (isError) return <ErrorMessage />;

  if (teachersLoading) return <Loader />;

  return (
    <div className="container mx-auto py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {teacherSchoolAssignmentId
            ? "تعديل بيانات المدرس"
            : "إضافة مدرس جديد"}
        </h1>
        <p className="text-gray-600 mt-2">
          {teacherSchoolAssignmentId
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
          <SelectField
            form={form}
            name="teacher_id"
            label="اسم المدرس"
            placeholder="اختر اسم المدرس"
            options={
              teachers?.data?.map((teacher) => ({
                value: teacher.teacher_id.toString(),
                label: teacher.name,
              })) ?? []
            }
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              form={form}
              name="school_id"
              label="اسم المدرسة"
              placeholder="اختر اسم المدرسة"
              options={
                schools?.data?.map((school) => ({
                  value: school.id.toString(),
                  label: school.name,
                })) ?? []
              }
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
                : teacherSchoolAssignmentId
                ? "تحديث البيانات"
                : "إضافة المدرس"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
