const { default: axios } = require("axios");

import { handleLogout } from "@/src/actions/auth";
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
      const adminToken = cookieStore?.get("AdminToken")?.value;
      const studentToken = cookieStore?.get("StudentToken")?.value;
      const teacherToken = cookieStore?.get("TeacherToken")?.value;

      token = adminToken || studentToken || teacherToken;
    } else {
      // Get token using js-cookie in the client
      const adminToken = Cookies.get("AdminToken");
      const studentToken = Cookies.get("StudentToken");
      const teacherToken = Cookies.get("TeacherToken");

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
