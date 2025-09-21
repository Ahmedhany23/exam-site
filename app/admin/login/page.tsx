
import { LoginComponent } from "@/src/components/login/LoginComponent";
import { Metadata } from "next";
import React from "react";


export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

const page = () => {
  return <LoginComponent />;
};

export default page;
