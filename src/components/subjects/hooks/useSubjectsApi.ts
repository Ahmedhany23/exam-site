import axiosInstance from "@/src/lib/axios";
import { Subject } from "@/src/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetSubjects = () => {
  const { data, isLoading, isError } = useQuery<Subject[]>({
    queryKey: ["subjects"],
    queryFn: async () => {
      const res = await axiosInstance
        .get("/v1/admin/subjects")
        .then((res) => res.data);
      return res.data.data;
    },
    retry: false,
  });

  return { data, isLoading, isError };
};

export const useGetSubject = (subjectId: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["subjects", subjectId],
    queryFn: async () => {
      const res = await axiosInstance
        .get(`/v1/admin/subjects/${subjectId}`)
        .then((res) => res.data);
      return res.data;
    },
    retry: false,
    enabled: !!subjectId,
  });

  return { data, isLoading, isError };
};

export const useAddOrEditSubject = (subjectId: string) => {
  const queryClient = useQueryClient();

  const PostOrPut = (values: object) => {
    if (subjectId) {
      return axiosInstance.put(`/v1/admin/subjects/${subjectId}`, values);
    } else {
      return axiosInstance.post("/v1/admin/subjects", values);
    }
  };

  const {
    mutateAsync: addOrEditSubjectMutation,
    isPending: addOrEditSubjectLoading,
    error,
  } = useMutation({
    mutationFn: PostOrPut,
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
      toast.success(
        subjectId ? "تم تعديل المادة بنجاح 🎉" : "تم اضافة المادة بنجاح 🎉"
      );
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });

  return {
    addOrEditSubjectMutation,
    addOrEditSubjectLoading,
    error,
  };
};

export const useDeleteSubject = () => {
  const queryClient = useQueryClient();
  const {
    mutateAsync: deleteSubjectMutation,
    isPending: deleteSubjectLoading,
  } = useMutation({
    mutationFn: (subjectId: number) => {
      return axiosInstance.delete(`/v1/admin/subjects/${subjectId}`);
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
      toast.success("تم حذف المادة بنجاح 🎉");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });

  return {
    deleteSubjectMutation,
    deleteSubjectLoading,
  };
};
