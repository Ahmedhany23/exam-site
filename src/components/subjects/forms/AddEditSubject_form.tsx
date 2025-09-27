"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/src/components/ui/select";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Button } from "@/src/components/ui/button";
import { Loader2Icon } from "lucide-react";
import {
  AddEditSubjectSchema,
  AddEditSubjectSchemaType,
} from "../schema/SubjectSchema";
import { useAddOrEditSubject, useGetSubject } from "../hooks/useSubjectsApi";
import { useParams, useRouter } from "next/navigation";
import { FormError } from "@/src/lib/FormError";
import { useEffect } from "react";
import { Loader } from "../../ui/loader";

export const AddEditSubject_form = () => {
  const router = useRouter();
  const { subjectId } = useParams<{ subjectId: string }>();

  const { addOrEditSubjectMutation, addOrEditSubjectLoading } =
    useAddOrEditSubject(subjectId);

  const { data: subject, isLoading, isError } = useGetSubject(subjectId);

  const form = useForm<AddEditSubjectSchemaType>({
    resolver: zodResolver(AddEditSubjectSchema),
    defaultValues: {
      name: "",
      code: "",
      section: "scientific",
      duration_minutes: 0,
      max_score: 0,
      has_essay_questions: false,
      is_active: true,
    },
  });

  const onSubmit = async (data: AddEditSubjectSchemaType) => {
    await addOrEditSubjectMutation(data)
      .then(() => {
        form.reset();
        router.back();
      })
      .catch((err) => FormError<AddEditSubjectSchemaType>(err, form));
  };

  useEffect(() => {
    if (subject) {
      form.setValue("name", subject.name);
      form.setValue("code", subject.code);
      form.setValue("section", subject.section);
      form.setValue("duration_minutes", subject.duration_minutes);
      form.setValue("max_score", subject.max_score);
      form.setValue("has_essay_questions", subject.has_essay_questions);
      form.setValue("is_active", subject.is_active);
    }
  }, [subject]);

  if (isError) return <div>Something went wrong</div>;

  if (isLoading) return <Loader />;
  return (
    <Form {...form}>
      <form
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-sm border"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>اسم المادة</FormLabel>
              <Input {...field} placeholder="أدخل اسم المادة" />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>كود المادة</FormLabel>
              <Input {...field} placeholder="أدخل كود المادة" />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="section"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الشعبة</FormLabel>
              <Select dir="rtl" {...field} onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الشعبة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scientific">علمي</SelectItem>
                  <SelectItem value="literature">أدبي</SelectItem>
                  <SelectItem value="common">عام</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="duration_minutes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>مدة الامتحان (بالدقائق)</FormLabel>
              <Input
                type="number"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
                placeholder="أدخل مدة الامتحان"
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="max_score"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الدرجة النهائية</FormLabel>
              <Input
                type="number"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
                placeholder="أدخل الدرجة النهائية"
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="has_essay_questions"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <FormLabel>يحتوي على أسئلة مقالية</FormLabel>
            </FormItem>
          )}
        />

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

        <div className="md:col-span-2 lg:col-span-3">
          <Button
            type="submit"
            className="w-full"
            disabled={addOrEditSubjectLoading}
          >
            {addOrEditSubjectLoading ? (
              <>
                <Loader2Icon className="animate-spin" />
                برجاء الانتظار
              </>
            ) : subjectId ? (
              "تحديث المادة"
            ) : (
              "اضافة مادة"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
