import axiosInstance from "@/lib/axios";
import { userType } from "@/types/types";
import { cookies } from "next/headers";

export type responseUserType = {
    success: boolean;
    data: userType | null
}

export const useGetUser = async () : Promise<responseUserType | null> => {
  const cookieStore = await cookies();

  const adminToken = cookieStore.get("AdminToken")?.value;
  const teacherToken = cookieStore.get("TeacherToken")?.value;
  const studentToken = cookieStore.get("StudentToken")?.value;


  if (!adminToken && !teacherToken && !studentToken) {
    return null;
  }

  const token = adminToken || teacherToken || studentToken;

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