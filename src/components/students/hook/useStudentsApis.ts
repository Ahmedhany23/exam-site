import axiosInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AddEditStudentSchemaType } from "../schema/StudentSchema";

export const useAddEditStudent = (studentId: string) => {
  const PostOrPut = (values: AddEditStudentSchemaType) => {
    if (studentId) {
      return axiosInstance.put(`/v1/admin/students/${studentId}`, values);
    } else {
      return axiosInstance.post("/v1/admin/create-student", values);
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
        studentId ? "تم تعديل الطالب بنجاح 🎉" : "تم اضافة الطالب بنجاح 🎉"
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
