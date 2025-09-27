import axiosInstance from "@/src/lib/axios";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetSchools = (page: number, pageSize: number) => {
  return useQuery({
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

export const useGetSchool = (adminId: string) => {
  return useQuery({
    queryKey: ["school", adminId],
    queryFn: async () => {
      const res = await axiosInstance
        .get(`/v1/admin/schools/${adminId}`)
        .then((res) => res.data);
      return res.data;
    },
    refetchOnWindowFocus: true,
    enabled: !!adminId,
  });
};

export const useAddEditSchool = (adminId: string) => {
  const queryClient = useQueryClient();

  const PostOrPut = (values: object) => {
    if (adminId) {
      return axiosInstance.put(`/v1/admin/schools/${adminId}`, values);
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
        adminId ? "تم تعديل المدرسة بنجاح 🎉" : "تم اضافة المدرسة بنجاح 🎉"
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
  const {
    mutateAsync: deleteSchoolMutation,
    isPending: deleteSchoolLoading,
  } = useMutation({
    mutationFn: async (adminId: number) => {
      const res = await axiosInstance.delete(
        `/v1/admin/schools/${adminId}`
      );
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
