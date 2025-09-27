import { useMutation } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import axiosInstance from "@/src/lib/axios";
import { formSchema } from "../form/Login_form";
import * as z from "zod";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export const useAuthLogin = () => {
  const router = useRouter();

  const {
    mutateAsync: loginMutation,
    isPending: loginLoading,
    error,
  } = useMutation({
    mutationFn: (values: object) =>
      axiosInstance.post("/v1/auth/login", values),

    onSuccess: ({ data }) => {
      try {
        const token = data?.data?.access_token;
        const expiresAt = data?.data?.expires_at;
        const userType = data?.data?.user?.user_type;

        if (token && expiresAt && userType) {
          const expiresDate = new Date(expiresAt);
          Cookies.set("token", token, {
            expires: expiresDate,
            secure: true,
            sameSite: "strict",
          });
          Cookies.set("userType", userType, {
            expires: expiresDate,
            secure: true,
            sameSite: "strict",
          });
        }

        toast.success("تم تسجيل الدخول بنجاح 🎉");
        router.push("/dashboard", { scroll: false });
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
