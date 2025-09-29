
import { ProfileComponent } from "@/src/components/profile/ProfileComponent";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "الملف الشخصي",
};
const page = () => {
  return <ProfileComponent />;
};

export default page;
