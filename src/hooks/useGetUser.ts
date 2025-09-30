import { cookies } from "next/headers";
import { userType } from "../types/types";
import axiosInstance from "../lib/axios";
import { AxiosError } from "axios";
export type responseUserType = {
  success: boolean;
  data: userType | null;
};

export const useGetUser = async (): Promise<responseUserType | null> => {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    const response = await axiosInstance.get<responseUserType>("/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (err) {
    const error = err as AxiosError;

  /*   if (error.response?.status === 401) {
      // Unauthorized → token invalid/expired
      console.log("Unauthorized, token might be expired");
      return null;
    } */

    console.error("Unexpected error:", error);
    return null;
  }
};
