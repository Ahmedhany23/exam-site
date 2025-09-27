import axiosInstance from "@/src/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Governorate } from "../types/types";

export const useGetGovernorates = () => {
  const { data, isLoading, isError, isFetching } = useQuery<Governorate[]>({
    queryKey: ["governorates"],
    queryFn: async () => {
      const res = await axiosInstance
        .get("/v1/governorates")
        .then((res) => res.data);
      return res.data;
    },
    retry: false,
    refetchOnWindowFocus: true,
   
  });
  return {
    data,
    isLoading,
    isError,
    isFetching,
  };
};
