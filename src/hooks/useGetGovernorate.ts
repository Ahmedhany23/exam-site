import axiosInstance from "@/src/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetGovernorates = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["governorates"],
    queryFn: async () => {
      const res = await axiosInstance
        .get("/v1/governorates")
        .then((res) => res.data);
      return res.data;
    },
    retry: false,
  });
  return {
    data,
    isLoading,
    isError,
  };
};
