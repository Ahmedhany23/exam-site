"use client";

import React, { useEffect } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Button } from "@/src/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/src/components/ui/select";
import { Checkbox } from "@/src/components/ui/checkbox";
import { useParams, useRouter } from "next/navigation";
import { formSchema } from "../schemas/createQuestionSchema";
import {
  useAddorEditExamQuestion,
  useGetExamQuestion,
} from "../hooks/useExamApi";
import { FormError } from "@/src/lib/FormError";
import { Loader2Icon } from "lucide-react";
import { Loader } from "../../ui/loader";

type FormValues = z.infer<typeof formSchema>;

export const AddEditQuestion_form = () => {
  const { questionId, examId, sectionId } = useParams<{
    questionId: string;
    examId: string;
    sectionId: string;
  }>();

  const router = useRouter();

  const { addOrEditExamQuestionMutation, addOrEditExamQuestionLoading } =
    useAddorEditExamQuestion(questionId);

  const { data: question, isLoading } = useGetExamQuestion(questionId);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question_text: "",
      question_image: "",
      question_type: "multiple_choice",
      points: 1,
      options: [{ value: "" }, { value: "" }],
      correct_answer: "",
      is_required: false,
      help_text: "",
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "options",
  });

  const questionType = form.watch("question_type");
  const currentOptions = form.watch("options") || [];
  const correctAnswer = form.watch("correct_answer");

  // Effect لـ populate البيانات لما الـ question data تيجي
  React.useEffect(() => {
    if (question && questionId) {
      // Reset form with question data
      form.reset({
        question_text: question.question_text,
        question_image: question.question_image || "",
        question_type: question.question_type,
        points: Number(question.points),
        options: question.options?.map((option: string) => ({
          value: option,
        })) || [{ value: "" }, { value: "" }],
        correct_answer: String(question.correct_answer || ""),
        is_required: question.is_required,
        help_text: question.help_text || "",
      });
    }
  }, [question, questionId, form]);

  // Effect منفصل للـ correct_answer validation
  useEffect(() => {
    if (
      questionType === "multiple_choice" &&
      correctAnswer &&
      currentOptions.length > 0
    ) {
      // تأكد إن الـ correct_answer موجود في الـ options
      const isValidAnswer = currentOptions.some(
        (opt) => opt.value === correctAnswer
      );
      if (!isValidAnswer && correctAnswer) {
        // لو الـ correct_answer مش موجود في الـ options، امسحه
        form.setValue("correct_answer", "", { shouldValidate: true });
      }
    }
  }, [currentOptions, correctAnswer, questionType, form]);



  const onSubmit = (values: FormValues) => {
    let finalData = {
      ...values,
      section_id: sectionId,
      exam_id: examId,
      options: values.options?.map((option) => option.value).filter(Boolean), 
    };

    console.log("Submitting data:", finalData);

    addOrEditExamQuestionMutation(finalData)
      .then(() => {
        router.back();
      })
      .catch((err) => FormError<FormValues>(err, form));
  };

  // Handle removing options
  const handleRemoveOption = (index: number) => {
    const optionToRemove = currentOptions[index];

    if (optionToRemove && optionToRemove.value === correctAnswer) {
      form.setValue("correct_answer", "", { shouldValidate: true });
    }

    remove(index);
  };

  if (isLoading) return <Loader />;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 p-8 max-w-2xl mx-auto bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          {questionId ? "تعديل سؤال" : "اضافة سؤال جديد"}
        </h2>

        {/* Question Text */}
        <FormField
          control={form.control}
          name="question_text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نص السؤال</FormLabel>
              <FormControl>
                <Textarea placeholder="اكتب نص السؤال..." {...field} rows={4} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Question Image */}
        <FormField
          control={form.control}
          name="question_image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>صورة السؤال (url)</FormLabel>
              <FormControl>
                <Input
                  placeholder={` https://example.com/image.jpg `}
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Question Type */}
        <FormField
          control={form.control}
          name="question_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نوع السؤال</FormLabel>
              <Select
                dir="rtl"
                onValueChange={(value) => {
                  field.onChange(value);
                  form.setValue("correct_answer", "", { shouldValidate: true });
                }}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر النوع" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="multiple_choice">
                    اختيار من متعدد
                  </SelectItem>
                  <SelectItem value="true_false">صح / خطأ</SelectItem>
                  <SelectItem value="fill_blank">املأ الفراغ</SelectItem>
                  <SelectItem value="essay">مقال</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Options for multiple choice */}
        {questionType === "multiple_choice" && (
          <div className="space-y-3 p-4 border rounded-md bg-gray-50">
            <FormLabel className="font-semibold">الاختيارات</FormLabel>
            <FormDescription>أضف الاختيارات المتاحة للسؤال.</FormDescription>
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <FormField
                  control={form.control}
                  name={`options.${index}.value`}
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormControl>
                        <Input placeholder={`اختيار ${index + 1}`} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemoveOption(index)}
                  disabled={fields.length <= 2}
                >
                  حذف
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => append({ value: "" })}
            >
              إضافة اختيار
            </Button>
          </div>
        )}

        {/* Correct Answer */}
        {["multiple_choice", "true_false", "fill_blank", "essay"].includes(
          questionType
        ) && (
          <FormField
            control={form.control}
            name="correct_answer"
            render={({ field }) => {
              if (questionType === "multiple_choice") {
                const availableOptions = currentOptions.filter(
                  (opt) => opt.value && opt.value.trim()
                );

                return (
                  <FormItem>
                    <FormLabel>الإجابة الصحيحة</FormLabel>
                    <Select
                      key={`correct-answer-${availableOptions
                        .map((o) => o.value)
                        .join("-")}`}
                      dir="rtl"
                      onValueChange={(value) => {
                        field.onChange(value);
                        console.log("Selected correct answer:", value);
                      }}
                      value={field.value || ""}
                      defaultValue={field.value || ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الإجابة الصحيحة" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableOptions.length === 0 ? (
                          <div className="p-2 text-sm text-gray-500">
                            أضف الاختيارات أولاً
                          </div>
                        ) : (
                          availableOptions.map((option, idx) => (
                            <SelectItem
                              key={`${idx}-${option.value}`}
                              value={option.value}
                            >
                              {option.value}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }
              if (questionType === "true_false") {
                return (
                  <FormItem>
                    <FormLabel>الإجابة الصحيحة</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الإجابة" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="true">صح</SelectItem>
                        <SelectItem value="false">خطأ</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }
              return (
                <FormItem>
                  <FormLabel>الإجابة الصحيحة</FormLabel>
                  <FormControl>
                    <Input placeholder="اكتب الإجابة الصحيحة" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        )}

        {/* Points & Required */}
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="points"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>الدرجة</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="is_required"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-2 pt-8">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>سؤال إجباري</FormLabel>
              </FormItem>
            )}
          />
        </div>

        {/* Help Text */}
        <FormField
          control={form.control}
          name="help_text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نص مساعد (اختياري)</FormLabel>
              <FormControl>
                <Input
                  placeholder="اكتب نص مساعد"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full !mt-8" size="lg">
          {addOrEditExamQuestionLoading ? (
            <Loader2Icon className="animate-spin" />
          ) : questionId ? (
            "تحديث"
          ) : (
            "إضافة"
          )}
        </Button>
      </form>
    </Form>
  );
};
