"use client";
import axiosInstance from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import * as z from "zod";
import { teacherSchema } from "../schema/TeacherSchema";


export const useGetTeachers = () => {
  const { data, isFetching, error } = useQuery({
    queryKey: ["teachers"],
    queryFn: () =>
      axiosInstance.get("/v1/admin/teachers").then((res) => res.data),
    staleTime: 1000 * 60 * 5, // 5 min
    gcTime: 1000 * 60 * 30, // 30 min
    refetchOnWindowFocus: true,
  });

  return { data, isFetching, error };
};
export const useAddEditTeacher = () => {
  const {
    mutateAsync: AddEditMutation,
    isPending: AddEditLoading,
    error,
  } = useMutation({
    mutationFn: (values: z.infer<typeof teacherSchema>) =>
      axiosInstance.post("/v1/admin/create-teacher", values),

    onSuccess: ({ data }) => {
      toast.success("تم اضافة المدرس بنجاح 🎉");
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });

  return {
    AddEditMutation,
    AddEditLoading,
    error,
  };
};
