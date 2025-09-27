import { cookies } from "next/headers";
import { userType } from "../types/types";
import axiosInstance from "@/src/lib/axios";

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
  } catch {
    return null;
  }
};
