"use client";
import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
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
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FieldValues, Resolver, useForm } from "react-hook-form";

import { FormError } from "@/src/lib/FormError";
import { Loader2Icon, School } from "lucide-react";
import { useRouter } from "next/navigation";

import { useAddEditSchool, useGetSchool } from "../hook/useSchoolApis";
import { useGetGovernorates } from "@/src/hooks/useGetGovernorate";
import { SchoolFormValues, schoolSchema } from "../schema/SchoolSchema";
import { Loader } from "../../ui/loader";

export const AddEditSchool_form = ({ schoolId }: { schoolId: string }) => {
  const router = useRouter();

  const form = useForm<SchoolFormValues>({
    resolver: zodResolver(schoolSchema) as Resolver<
      SchoolFormValues,
      undefined
    >,
    defaultValues: {
      name: "",
      code: "",
      is_active: false,
      address: "",
      phone: "",
    },
  });

  const { AddEditMutation, AddEditLoading } = useAddEditSchool(schoolId);

  const { data: governoratesData, isLoading: governoratesLoading } =
    useGetGovernorates();

  const { data, isLoading } = useGetSchool(schoolId);

  function onSubmit(values: FieldValues) {
    const payload = {
      ...values,
      governorate_id: Number(values.governorate_id),
    };
    AddEditMutation(payload)
      .then(() => {
        form.reset();
        router.back();
      })
      .catch((err) => FormError<SchoolFormValues>(err, form));
  }

  useEffect(() => {
    if (data && governoratesData?.length) {
      form.reset({
        name: data.name ?? "",
        code: data.code ?? "",
        address: data.address ?? "",
        phone: data.phone ?? "",
        is_active: data.is_active ?? false,
        governorate_id: String(data.governorate?.id ?? ""),
      });
    }
  }, [data, governoratesData]);

  if (governoratesLoading && isLoading) {
    return <Loader />;
  }

  return (
    <Form {...form}>
      <form
        className="space-y-6 max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-sm border"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {/*  Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الاسم </FormLabel>
              <Input {...field} placeholder="أدخل الاسم " />
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Code */}
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>كود المدرسة</FormLabel>
              <Input {...field} placeholder="أدخل كود المدرسة" />
              <FormMessage />
            </FormItem>
          )}
        />

        {/*  Address */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>العنوان </FormLabel>
              <Input {...field} placeholder="أدخل العنوان " />
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

        <Button type="submit" className="w-full" disabled={AddEditLoading}>
          {AddEditLoading ? (
            <>
              <Loader2Icon className="animate-spin" />
              برجاء الانتظار
            </>
          ) : schoolId ? (
            "تعديل"
          ) : (
            "اضافة"
          )}
        </Button>
      </form>
    </Form>
  );
};
