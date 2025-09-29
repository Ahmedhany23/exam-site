"use client";
import axiosInstance from "@/src/lib/axios";
import { School } from "@/src/types/types";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

type SchoolResponse = {
  data: School[];
  meta: {
    total: number;
    page: number;
    per_page: number;
  };
};

export const useGetSchools = (page?: number, pageSize?: number) => {
  return useQuery<SchoolResponse>({
    queryKey: ["school", page, pageSize],
    queryFn: async () => {
      const res = await axiosInstance.get("/v1/admin/schools", {
        params: { page, per_page: pageSize },
      });
      return res.data;
    },
    refetchOnWindowFocus: true,
    placeholderData: keepPreviousData,
  });
};

export const useGetSchoolsByGovernorate = () => {
  const searchParams = useSearchParams();
  const governorate = searchParams.get("governorate_id");

  return useQuery<SchoolResponse>({
    queryKey: ["school", governorate],
    queryFn: async () => {
      const res = await axiosInstance.get("/v1/admin/schools", {
        params: { governorate_id: governorate },
      });
      return res.data;
    },
    refetchOnWindowFocus: true,
    placeholderData: keepPreviousData,
    enabled: !!governorate,
  });
};

export const useGetSchool = (schoolId: string) => {
  return useQuery({
    queryKey: ["school", schoolId],
    queryFn: async () => {
      const res = await axiosInstance
        .get(`/v1/admin/schools/${schoolId}`)
        .then((res) => res.data);
      return res.data;
    },
    refetchOnWindowFocus: true,
    enabled: !!schoolId,
  });
};

export const useAddEditSchool = (schoolId: string) => {
  const queryClient = useQueryClient();

  const PostOrPut = (values: object) => {
    if (schoolId) {
      return axiosInstance.put(`/v1/admin/schools/${schoolId}`, values);
    } else {
      return axiosInstance.post("/v1/admin/schools", values);
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
        schoolId ? "تم تعديل المدرسة بنجاح 🎉" : "تم اضافة المدرسة بنجاح 🎉"
      );
      queryClient.invalidateQueries({ queryKey: ["school"] });
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

export const useDeleteSchool = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: deleteSchoolMutation, isPending: deleteSchoolLoading } =
    useMutation({
      mutationFn: async (schoolId: number) => {
        const res = await axiosInstance.delete(`/v1/admin/schools/${schoolId}`);
        return res.data;
      },
      onSuccess: ({ data }) => {
        queryClient.invalidateQueries({ queryKey: ["school"] });
        toast.success("تم حذف المدرسة بنجاح 🎉");
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message);
      },
    });

  return {
    deleteSchoolMutation,
    deleteSchoolLoading,
  };
};
