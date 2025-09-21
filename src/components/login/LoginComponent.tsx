import React from "react";
import { Login_form } from "./form/Login_form";

export const LoginComponent = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900">مرحباً بعودتك</h1>
          <p className="mt-2 text-sm text-gray-500">
            من فضلك قم بتسجيل الدخول إلى حسابك
          </p>
        </div>
        {/* Login form */}
        <Login_form />
      </div>
    </div>
  );
};
