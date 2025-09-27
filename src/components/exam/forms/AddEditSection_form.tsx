"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";

import { useParams, useRouter } from "next/navigation";
import {
  useAddOrEditExamSection,
  useGetExamSection,
} from "../hooks/useExamApi";
import { FormError } from "@/src/lib/FormError";
import { Loader2Icon } from "lucide-react";
import { sectionSchema } from "../schemas/sectionSchema";

type SectionSchema = z.infer<typeof sectionSchema>;

export function AddEditSection_form() {
  // Initialize router
  const router = useRouter();

  // Get sectionId from URL params (for edit mode)
  const { sectionId, examId } = useParams<{
    sectionId: string;
    examId: string;
  }>();

  // Initialize react-hook-form with zod schema
  const form = useForm<SectionSchema>({
    resolver: zodResolver(sectionSchema),
    defaultValues: {
      code: "",
      name: "",
      order_number: 1,
    },
  });

  // Custom hook to handle add/edit API call
  const { addExamSectionMutation, addExamSectionLoading } =
    useAddOrEditExamSection(sectionId);

  // Custom hook to Get Section data if sectionId exists (edit mode)
  const { data: sectionData } = useGetExamSection(sectionId);

  // Handle form submit
  const onSubmit = (values: SectionSchema) => {
    addExamSectionMutation({ ...values, exam_id: examId })
      .then(() => {
        // Reset form after successful submit
        form.reset();
        // Redirect to previous page
        router.back();
      })
      .catch((err) => {
        // Map backend errors to form fields
        FormError<SectionSchema>(err, form);
      });
  };

  // Populate form with existing data in edit mode

  React.useEffect(() => {
    if (sectionData) {
      form.reset({
        code: sectionData.code,
        name: sectionData.name,
        order_number: sectionData.order_number,
      });
    }
  }, [sectionData]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-md mx-auto"
      >
        {/* Code field */}
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الكود</FormLabel>
              <FormControl>
                <Input placeholder="مثال: SEC-A" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Name field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>اسم القسم</FormLabel>
              <FormControl>
                <Input placeholder="مثال: قسم الرياضيات" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Order number field */}
        <FormField
          control={form.control}
          name="order_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>رقم الترتيب</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="مثال: 1"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit button */}
        <Button
          type="submit"
          className="w-full"
          disabled={addExamSectionLoading}
        >
          {sectionId ? "تحديث القسم" : "إضافة القسم"}{" "}
          {addExamSectionLoading && (
            <Loader2Icon className="ml-2 h-4 w-4 animate-spin" />
          )}
        </Button>
      </form>
    </Form>
  );
}
