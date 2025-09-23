import axiosInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AddEditSchoolAdminSchemaType } from "../schema/SchoolSchema";

export const useAddEditSchoolAdmin = (adminId: string) => {
  const PostOrPut = (values: AddEditSchoolAdminSchemaType) => {
    if (adminId) {
      return axiosInstance.put(`/v1/admin/school-admin/${adminId}`, values);
    } else {
      return axiosInstance.post("/v1/admin/create-school-admin", values);
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
        adminId ? "تم تعديل المدير بنجاح 🎉" : "تم اضافة المدير بنجاح 🎉"
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