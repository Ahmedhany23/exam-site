const { default: axios } = require("axios");
import { handleLogout } from "@/actions/auth";
import Cookies from "js-cookie";


const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    common: {
      platform: "web",
      lang: Cookies.get("NEXT_LOCALE") || "en",
    },
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const isServer = typeof window === "undefined";

    let token;

    if (isServer) {
      // Get token using Next.js server-side cookies()
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      const adminToken = cookieStore?.get("SToken")?.value;
      const studentToken = cookieStore?.get("SStudentToken")?.value;
      const teacherToken = cookieStore?.get("STeacherToken")?.value;

      token = adminToken || studentToken || teacherToken;
    } else {
      // Get token using js-cookie in the client
      const adminToken = Cookies.get("SToken");
      const studentToken = Cookies.get("SStudentToken");
      const teacherToken = Cookies.get("STeacherToken");

      token = adminToken || studentToken || teacherToken;
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // Handle the response error
    if (error.response && error.response.status === 401) {
      handleLogout();
    }
    if (error.response.data.status === false) {
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
