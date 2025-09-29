import axiosInstance from "@/src/lib/axios";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Student } from "@/src/types/types";
import { useSearchParams } from "next/navigation";

type StudentDataResponse = {
  data: Student[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
};

export const useGetStudents = (page: number, pageSize: number) => {
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
    const academicYear = searchParams.get("academic_year") || "";

  return useQuery<StudentDataResponse>({
    queryKey: ["students", page, pageSize , search, academicYear],
    queryFn: async () => {
      const res = await axiosInstance.get("/v1/admin/students", {
        params: { page, per_page: pageSize , search , academic_year: academicYear },
      });
      return res.data;
    },
    refetchOnWindowFocus: true,
    placeholderData: keepPreviousData,
  });
};

export const useGetStudent = (studentId: string) => {
  return useQuery<Student>({
    queryKey: ["students", studentId],
    queryFn: async () => {
      const res = await axiosInstance
        .get(`/v1/admin/students/${studentId}`)
        .then((res) => res.data);
      return res.data;
    },
    refetchOnWindowFocus: true,
    enabled: !!studentId,
  });
};

export const useToggleStudentStatus = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: toggleStatusMutation, isPending: toggleStatusLoading } =
    useMutation({
      mutationFn: async (studentId: number) => {
        const res = await axiosInstance.patch(
          `/v1/admin/students/${studentId}/toggle-status`
        );
        return res.data;
      },
      onSuccess: ({ data }) => {
        queryClient.invalidateQueries({ queryKey: ["students"] });
        toast.success("تم تغيير حالة الطالب بنجاح 🎉");
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

export const useDeleteStudent = () => {
  const queryClient = useQueryClient();
  const {
    mutateAsync: deleteStudentMutation,
    isPending: deleteStudentLoading,
  } = useMutation({
    mutationFn: async (studentId: number) => {
      const res = await axiosInstance.delete(`/v1/admin/students/${studentId}`);
      return res.data;
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast.success("تم حذف الطالب بنجاح 🎉");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });

  return {
    deleteStudentMutation,
    deleteStudentLoading,
  };
};

export const useAddEditStudent = (studentId: string) => {
  const PostOrPut = (values: object) => {
    if (studentId) {
      return axiosInstance.put(`/v1/admin/students/${studentId}`, values);
    } else {
      return axiosInstance.post("/v1/admin/students", values);
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
