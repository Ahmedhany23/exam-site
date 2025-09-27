"use client";
import axiosInstance from "@/src/lib/axios";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import * as z from "zod";
import { teacherSchema } from "../schema/TeacherSchema";
import { Teacher } from "@/src/types/types";
import { TeacherFormValues } from "../forms/AddEditTeacher_form";

type TeacherDataResponse = {
  data: Teacher[];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
};

export const useGetTeachers = (page: number, pageSize: number) => {
  return useQuery<TeacherDataResponse>({
    queryKey: ["teachers", page, pageSize],
    queryFn: async () => {
      const res = await axiosInstance.get("/v1/admin/teachers", {
        params: { page, per_page: pageSize },
      });
      return res.data;
    },
    refetchOnWindowFocus: true,
    placeholderData: keepPreviousData,
  });
};

export const useGetTeacher = (teacherId: string) => {
  return useQuery({
    queryKey: ["teachers", teacherId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/v1/admin/teachers/${teacherId}`);
      return res.data;
    },
    refetchOnWindowFocus: true,
    enabled: !!teacherId,
  });
};

export const useAddEditTeacher = (teacherId: string) => {
  const PostOrPut = (values: TeacherFormValues) => {
    if (teacherId) {
      return axiosInstance.put(`/v1/admin/teachers/${teacherId}`, values);
    } else {
      return axiosInstance.post("/v1/admin/create-teacher", values);
    }
  };

  const {
    mutateAsync: AddEditMutation,
    isPending: AddEditLoading,
    error,
  } = useMutation({
    mutationFn: PostOrPut,

    onSuccess: ({ data }) => {
      toast.success(
        teacherId ? "تم تعديل المدرس بنجاح 🎉" : "تم اضافة المدرس بنجاح 🎉"
      );
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

export const useToggleTeacherStatus = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: toggleStatusMutation, isPending: toggleStatusLoading } =
    useMutation({
      mutationFn: async (teacherId: number) => {
        const res = await axiosInstance.patch(
          `/v1/admin/teachers/${teacherId}/toggle-status`
        );
        return res.data;
      },
      onSuccess: ({ data }) => {
        queryClient.invalidateQueries({ queryKey: ["teachers"] });
        toast.success("تم تغيير حالة المدرس بنجاح 🎉");
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message);
      },
    });

  return {
    toggleStatusMutation,
    toggleStatusLoading,
  };
};

export const useDeleteTeacher = () => {
  const queryClient = useQueryClient();
  const {
    mutateAsync: deleteTeacherMutation,
    isPending: deleteTeacherLoading,
  } = useMutation({
    mutationFn: async (teacherId: number) => {
      const res = await axiosInstance.delete(`/v1/admin/teachers/${teacherId}`);
      return res.data;
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      toast.success("تم حذف المدرس بنجاح 🎉");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });

  return {
    deleteTeacherMutation,
    deleteTeacherLoading,
  };
};
