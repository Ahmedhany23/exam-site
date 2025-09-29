"use client";
import axiosInstance from "@/src/lib/axios";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { TeacherSchoolAssignment } from "@/src/types/types";

type TeacherSchoolAssignmentDataResponse = {
  data: TeacherSchoolAssignment[];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
};

export const useGetTeacherSchoolAssignments = (
  page: number,
  pageSize: number
) => {
  return useQuery<TeacherSchoolAssignmentDataResponse>({
    queryKey: ["teacher-school-assignments", page, pageSize],
    queryFn: async () => {
      const res = await axiosInstance.get(
        "/v1/admin/teacher-school-assignments",
        {
          params: { page, per_page: pageSize },
        }
      );
      return res.data;
    },
    refetchOnWindowFocus: true,
    placeholderData: keepPreviousData,
  });
};

export const useGetTeacherSchoolAssignment = (
  teacherSchoolAssignmentId: string
) => {
  return useQuery<TeacherSchoolAssignment>({
    queryKey: ["teacher-school-assignments", teacherSchoolAssignmentId],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/v1/admin/teacher-school-assignments/${teacherSchoolAssignmentId}`
      ).then((res) => res.data);
      return res.data;
    },
    refetchOnWindowFocus: true,
    enabled: !!teacherSchoolAssignmentId,
  });
};

export const useAddEditTeacherSchoolAssignment = (
  teacherSchoolAssignmentId: string
) => {
  const PostOrPut = (values: object) => {
    if (teacherSchoolAssignmentId) {
      return axiosInstance.put(
        `/v1/admin/teacher-school-assignments/${teacherSchoolAssignmentId}`,
        values
      );
    } else {
      return axiosInstance.post("/v1/admin/teacher-school-assignments", values);
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
        teacherSchoolAssignmentId
          ? "تم تعديل تعيين المدرس بنجاح 🎉"
          : "تم اضافة تعيين المدرس بنجاح 🎉"
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

export const useDeleteTeacherSchoolAssignment = () => {
  const queryClient = useQueryClient();
  const {
    mutateAsync: deleteTeacherSchoolAssignmentMutation,
    isPending: deleteTeacherSchoolAssignmentLoading,
  } = useMutation({
    mutationFn: async (teacherSchoolAssignmentId: number) => {
      const res = await axiosInstance.delete(
        `/v1/admin/teacher-school-assignments/${teacherSchoolAssignmentId}`
      );
      return res.data;
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({
        queryKey: ["teacher-school-assignments"],
      });
      toast.success("تم حذف مدرس من مدرسة بنجاح 🎉");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });

  return {
    deleteTeacherSchoolAssignmentMutation,
    deleteTeacherSchoolAssignmentLoading,
  };
};
