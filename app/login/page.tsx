
import { LoginComponent } from "@/src/components/login/LoginComponent";
import { Metadata } from "next";
import React from "react";


export const metadata: Metadata = {
  title: "تسجيل الدخول",
  description: "تسجيل الدخول",
};

const page = () => {
  return <LoginComponent />;
};

export default page;
