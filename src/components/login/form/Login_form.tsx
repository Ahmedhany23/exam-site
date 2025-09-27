"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/src/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Loader } from "lucide-react";
import { useAuthLogin } from "../hook/useAuthLogin";

// ✅ Zod Schema - unified identifier (email, phone, or national ID) + password
export const formSchema = z.object({
  identifier: z
    .string()
    .min(5, "المعرف مطلوب")
    .refine(
      (value) =>
        /^\S+@\S+\.\S+$/.test(value) || // email
        /^\d{10,15}$/.test(value) || // phone number
        /^\d{14}$/.test(value), // national ID
      "من فضلك أدخل بريد إلكتروني، رقم موبايل، أو رقم قومي صحيح"
    ),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
});

export function Login_form() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const { loginMutation, loginLoading } = useAuthLogin();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    loginMutation(values);
  };

  return (
    <div className="mx-auto max-w-md rounded-lg border p-6 shadow-sm">
      <h2 className="mb-6 text-center text-2xl font-bold">تسجيل الدخول</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Unified Identifier Field (Email / Phone / National ID) */}
          <FormField
            control={form.control}
            name="identifier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  البريد الإلكتروني / رقم الموبايل / الرقم القومي
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@mail.com أو 01012345678 أو 29801010123456"
                    inputMode="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>كلمة المرور</FormLabel>
                <FormControl>
                  <Input placeholder="••••••••" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={loginLoading}>
            {loginLoading ? (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "تسجيل الدخول"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
