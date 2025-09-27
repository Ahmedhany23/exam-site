const { default: axios } = require("axios");

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

      token = cookieStore?.get("token")?.value;
    } else {
      // Get token using js-cookie in the client
      token = Cookies.get("token");
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
      Cookies.remove("token");
      Cookies.remove("userType");
      window.location.href = "/login";
    }
    if (error.response.data.status === false) {
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
