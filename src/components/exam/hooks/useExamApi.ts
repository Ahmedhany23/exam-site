"use client";
import axiosInstance from "@/src/lib/axios";
import { ExamData } from "@/src/types/types";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetExams = (page: number, pageSize: number) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["exams"],
    queryFn: async () => {
      const res = await axiosInstance.get("/v1/admin/exams", {
        params: { page, per_page: pageSize },
      });

      return res.data;
    },
    retry: false,
    refetchOnWindowFocus: true,
    placeholderData: keepPreviousData,
  });

  return { data, isLoading, isError };
};

export const useGetExam = (examId: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["exams", examId],
    queryFn: async () => {
      const res = await axiosInstance
        .get(`/v1/admin/exams/${examId}`)
        .then((res) => res.data);

      return res.data;
    },
    retry: false,
    enabled: !!examId,
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, isError };
};

export const useAddorEditExam = (examId?: string) => {
  const queryClient = useQueryClient();

  const PostOrPut = (values: object) => {
    if (examId) {
      return axiosInstance.put(`/v1/admin/exams/${examId}`, values);
    } else {
      return axiosInstance.post("/v1/admin/exams", values);
    }
  };

  const {
    mutateAsync: addOrEditExamMutation,
    isPending: addOrEditExamLoading,
    error,
  } = useMutation({
    mutationFn: PostOrPut,

    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
      toast.success(
        examId ? "تم تعديل الامتحان بنجاح 🎉" : "تم اضافة الامتحان بنجاح 🎉"
      );
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });

  return {
    addOrEditExamMutation,
    addOrEditExamLoading,
    error,
  };
};

export const useDeleteExam = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: deleteExamMutation, isPending: deleteExamLoading } =
    useMutation({
      mutationFn: (examId: number) => {
        return axiosInstance.delete(`/v1/admin/exams/${examId}`);
      },
      onSuccess: ({ data }) => {
        queryClient.invalidateQueries({ queryKey: ["exams"] });
        toast.success("تم حذف الامتحان بنجاح 🎉");
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message);
      },
    });

  return {
    deleteExamMutation,
    deleteExamLoading,
  };
};

/* Exams Questions */

export const useGetExamQuestions = (examId: string) => {
  const { data, isLoading, isError } = useQuery<ExamData>({
    queryKey: ["exams-questions", examId],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/v1/admin/exams/${examId}/questions`
      );

      return res.data;
    },
    retry: false,
    enabled: !!examId,
    refetchOnWindowFocus: true,
  });

  return { data, isLoading, isError };
};

export const useGetExamQuestion = (questionId: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["exams-questions", questionId],
    queryFn: async () => {
      const res = await axiosInstance
        .get(`/v1/admin/exam-questions/${questionId}`)
        .then((res) => res.data);
      return res.data;
    },
    retry: false,
    enabled: !!questionId,
  });

  return { data, isLoading, isError };
};
export const useAddorEditExamQuestion = (questionId: string) => {
  const queryClient = useQueryClient();

  const PostOrPut = (values: object) => {
    if (questionId) {
      return axiosInstance.put(
        `/v1/admin/exam-questions/${questionId}`,
        values
      );
    }
    return axiosInstance.post("/v1/admin/exam-questions", values);
  };

  const {
    mutateAsync: addOrEditExamQuestionMutation,
    isPending: addOrEditExamQuestionLoading,
    error,
  } = useMutation({
    mutationFn: PostOrPut,

    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ["exams-questions"] });

      if (questionId) {
        toast.success("تم تعديل السؤال بنجاح ✨");
      } else {
        toast.success("تم إضافة السؤال بنجاح 🎉");
      }
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });

  return {
    addOrEditExamQuestionMutation,
    addOrEditExamQuestionLoading,
    error,
  };
};

export const useDeleteExamQuestion = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: deleteExamQuestionMutation, isPending: deleteLoading } =
    useMutation({
      mutationFn: (questionId: number) => {
        return axiosInstance.delete(`/v1/admin/exam-questions/${questionId}`);
      },
      onSuccess: ({ data }) => {
        queryClient.invalidateQueries({ queryKey: ["exams-questions"] });
        toast.success("تم حذف السؤال بنجاح 🎉");
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message);
      },
    });

  return {
    deleteExamQuestionMutation,
    deleteLoading,
  };
};

/* Sections Exam */

export const useGetExamSections = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["exam-sections"],
    queryFn: async () => {
      const res = await axiosInstance.get("/v1/admin/exam-sections");
      return res.data;
    },
    retry: false,
  });

  return { data, isLoading, isError };
};

export const useAddOrEditExamSection = (sectionId: string) => {
  const queryClient = useQueryClient();

  const PostOrPut = (values: object) => {
    if (sectionId) {
      return axiosInstance.put(`/v1/admin/exam-sections/${sectionId}`, values);
    }
    return axiosInstance.post("/v1/admin/exam-sections", values);
  };

  const {
    mutateAsync: addExamSectionMutation,
    isPending: addExamSectionLoading,
    error,
  } = useMutation({
    mutationFn: PostOrPut,
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ["exam-sections"] });
      queryClient.invalidateQueries({ queryKey: ["exams-questions"] });
      toast.success("تم إضافة القسم بنجاح ");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });

  return {
    addExamSectionMutation,
    addExamSectionLoading,
    error,
  };
};

export const useGetExamSection = (sectionId: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["exam-sections", sectionId],
    queryFn: async () => {
      const res = await axiosInstance
        .get(`/v1/admin/exam-sections/${sectionId}`)
        .then((res) => res.data);
      return res.data;
    },
    retry: false,
  });

  return { data, isLoading, isError };
};

export const useDeleteExamSection = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: deleteExamSectionMutation,
    isPending: deleteExamSectionLoading,
    error,
  } = useMutation({
    mutationFn: (sectionId: number) => {
      return axiosInstance.delete(`/v1/admin/exam-sections/${sectionId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exam-sections"] });
      queryClient.invalidateQueries({ queryKey: ["exams-questions"] });

      toast.success("تم حذف القسم بنجاح ");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });

  return {
    deleteExamSectionMutation,
    deleteExamSectionLoading,
    error,
  };
};
