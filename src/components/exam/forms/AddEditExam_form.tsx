// AddEditExam_form.tsx
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { FormError } from "@/src/lib/FormError";
import { Button } from "@/src/components/ui/button";
import { Form } from "@/src/components/ui/form";
import { useParams, useRouter } from "next/navigation";
import type { Resolver } from "react-hook-form";
import CheckboxField from "../../fields/CheckboxField";
import SelectField from "../../fields/SelectField";
import TextField from "../../fields/TextField";
import { useGetSubjects } from "../../subjects/hooks/useSubjectsApi";
import { useAddorEditExam, useGetExam } from "../hooks/useExamApi";
import { ExamFormValues, ExamSchema } from "../schemas/ExamSchema";
import { useEffect } from "react";

export const AddEditExam_form = () => {
  const router = useRouter();
  const { examId } = useParams<{ examId: string }>();

  const { addOrEditExamMutation, addOrEditExamLoading } =
    useAddorEditExam(examId);

  const { data: subjects, isLoading: subjectsLoading } = useGetSubjects();

  const { data: exam } = useGetExam(examId);

  const form = useForm<ExamFormValues>({
    resolver: zodResolver(ExamSchema) as Resolver<ExamFormValues>,
    defaultValues: {
      require_video_recording: false,
    },
  });

  const onSubmit = async (data: ExamFormValues) => {
    await addOrEditExamMutation(data)
      .then(() => {
        router.back();
        form.reset();
      })
      .catch((err) => FormError<ExamFormValues>(err, form));
  };

  function formatDateForInput(dateString: string) {
    const date = new Date(dateString);

    return date.toISOString().slice(0, 16);
  }

  useEffect(() => {
    if (exam) {
      form.setValue("subject_id", exam.subject_id.toString());
      form.setValue("title", exam.title);
      form.setValue("description", exam.description ?? "");
      form.setValue("require_video_recording", exam.require_video_recording);
      form.setValue("exam_type", exam.exam_type);
      form.setValue("academic_year", exam.academic_year);
      form.setValue("start_time", formatDateForInput(exam.start_time));
      form.setValue("end_time", formatDateForInput(exam.end_time));
      form.setValue("duration_minutes", exam.duration_minutes);
      form.setValue("total_score", exam.total_score);
      form.setValue(
        "minimum_battery_percentage",
        exam.minimum_battery_percentage ?? undefined
      );
      form.setValue("is_published", exam.is_published ?? false);
      form.setValue("is_active", exam.is_active ?? false);
    }
  }, [exam]);

  if (subjectsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-sm border"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            form={form}
            name="subject_id"
            label="المادة *"
            placeholder="اختر المادة"
            options={subjects?.map((s) => ({
              value: s.id.toString(),
              label: s.name,
            }))}
          />
        </div>

        <TextField
          form={form}
          name="title"
          label="العنوان *"
          placeholder="عنوان الامتحان"
        />
        <TextField
          form={form}
          name="description"
          label="الوصف"
          placeholder="وصف الامتحان"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            form={form}
            name="exam_type"
            label="نوع الامتحان *"
            placeholder="اختر النوع"
            options={[
              { value: "practice", label: "تجريبي" },
              { value: "final", label: "نهائي" },
            ]}
          />
          <SelectField
            form={form}
            name="academic_year"
            label="السنة الدراسية *"
            placeholder="اختر السنة"
            options={[
              { value: "first", label: "الأولى" },
              { value: "second", label: "الثانية" },
              { value: "third", label: "الثالثة" },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField
            form={form}
            name="start_time"
            label="تاريخ البداية *"
            type="datetime-local"
          />
          <TextField
            form={form}
            name="end_time"
            label="تاريخ النهاية *"
            type="datetime-local"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField
            form={form}
            name="duration_minutes"
            label="المدة (دقيقة) *"
            type="number"
          />
          <TextField
            form={form}
            name="total_score"
            label="الدرجة الكلية *"
            type="number"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CheckboxField
            form={form}
            name="require_video_recording"
            label="يتطلب تسجيل فيديو"
          />
          <TextField
            form={form}
            name="minimum_battery_percentage"
            label="الحد الأدنى لنسبة البطارية"
            type="number"
          />
        </div>

        {examId && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CheckboxField form={form} name="is_published" label="منشور" />
            <CheckboxField form={form} name="is_active" label="نشط" />
          </div>
        )}

        <div className="flex justify-end gap-4 space-x-reverse pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            disabled={addOrEditExamLoading}
          >
            إعادة تعيين
          </Button>
          <Button
            type="submit"
            disabled={addOrEditExamLoading}
            className="min-w-[120px]"
          >
            {addOrEditExamLoading
              ? "جاري الحفظ..."
              : examId
              ? "تحديث البيانات"
              : "إضافة الامتحان"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
