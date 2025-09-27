import axiosInstance from "@/src/lib/axios";
import { SchoolAdmin } from "@/src/types/types";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

type SchoolAdminResponse = {
  data: SchoolAdmin[];
  meta: {
    total: number;
    per_page: number;
    current_page: number;
    total_pages: number;
  };
};

export const useGetSchoolAdmins = (page: number, pageSize: number) => {
  return useQuery<SchoolAdminResponse>({
    queryKey: ["school-admin", page, pageSize],
    queryFn: async () => {
      const res = await axiosInstance.get("/v1/admin/school-admins", {
        params: { page, per_page: pageSize },
      });
      return res.data;
    },
    refetchOnWindowFocus: true,
    placeholderData: keepPreviousData,
  });
};

export const useGetSchoolAdmin = (adminId: string) => {
  return useQuery<SchoolAdmin>({
    queryKey: ["school-admin", adminId],
    queryFn: async () => {
      const res = await axiosInstance
        .get(`/v1/admin/school-admins/${adminId}`)
        .then((res) => res.data);
      return res.data;
    },
    refetchOnWindowFocus: true,
    enabled: !!adminId,
  });
};

export const useAddEditSchoolAdmin = (adminId: string) => {
  const queryClient = useQueryClient();

  const PostOrPut = (values: object) => {
    if (adminId) {
      return axiosInstance.put(`/v1/admin/school-admins/${adminId}`, values);
    } else {
      return axiosInstance.post("/v1/admin/school-admins", values);
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
      queryClient.invalidateQueries({ queryKey: ["school-admin"] });
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

export const useDeleteSchoolAdmin = () => {
  const queryClient = useQueryClient();
  const {
    mutateAsync: deleteSchoolAdminMutation,
    isPending: deleteSchoolAdminLoading,
  } = useMutation({
    mutationFn: async (adminId: number) => {
      const res = await axiosInstance.delete(
        `/v1/admin/school-admins/${adminId}`
      );
      return res.data;
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ["school-admin"] });
      toast.success("تم حذف المدير بنجاح 🎉");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });

  return {
    deleteSchoolAdminMutation,
    deleteSchoolAdminLoading,
  };
};
