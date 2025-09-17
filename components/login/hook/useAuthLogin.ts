import { useMutation } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { formSchema } from "../form/Login_form";
import * as z from "zod";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export const useAuthLogin = () => {
  const pathname = usePathname();
  const router = useRouter();

  const role = pathname.includes("/admin")
    ? "admin"
    : pathname.includes("/teacher")
    ? "teacher"
    : "student";

  const loginUrls: Record<string, string> = {
    admin: "/admin/login",
    teacher: "/teacher/login",
    student: "/login",
  };

  const redirectPaths: Record<string, string> = {
    admin: "/admin/dashboard",
    teacher: "/teacher/lectures",
    student: "/student/home",
  };

  const tokenKeys: Record<string, string> = {
    admin: "AdminToken",
    teacher: "TeacherToken",
    student: "StudentToken",
  };

  const {
    mutateAsync: loginMutation,
    isPending: loginLoading,
    error,
  } = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) =>
      axiosInstance.post("/v1/auth/login", values),

    onSuccess: ({ data }) => {
      try {
        const tokenKey = tokenKeys[role];
        const token = data?.data?.access_token;
        const expiresAt = data?.data?.expires_at;

        if (token && expiresAt) {
          const expiresDate = new Date(expiresAt);
          Cookies.set(tokenKey, token, {
            expires: expiresDate,
            secure: true,
            sameSite: "strict",
          });
        }

        toast.success("تم تسجيل الدخول بنجاح 🎉");
        router.push(redirectPaths[role], { scroll: false });
        router.refresh();
      } catch (err) {
        toast.error("حصل خطأ أثناء حفظ بيانات الدخول");
      }
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });

  return {
    loginMutation,
    loginLoading,
    error,
  };
};
