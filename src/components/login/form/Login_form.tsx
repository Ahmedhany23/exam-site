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

// ✅ Schema
export const formSchema = z.object({
  email: z
    .string()
    .refine(
      (value) => /^\S+@\S+\.\S+$/.test(value),
      "البريد الإلكتروني غير صحيح"
    ),
  password: z.string().min(6, "كلمة المرور لا تقل عن 6 أحرف"),
});

export function Login_form() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  const { loginMutation, loginLoading } = useAuthLogin();

  function onSubmit(values: z.infer<typeof formSchema>) {
    loginMutation(values);
  }

  return (
    <div className="mx-auto max-w-md rounded-lg border p-6 shadow-sm">
      <h2 className="mb-6 text-center text-2xl font-bold">تسجيل الدخول</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>البريد الإلكتروني</FormLabel>
                <FormControl>
                  <Input
                    placeholder="you@example.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          <Button type="submit" className="w-full" disabled={loginLoading}>
            {loginLoading ? (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "دخول"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
