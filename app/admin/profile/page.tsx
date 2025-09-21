
import { ProfileComponent } from "@/src/components/admin/profile/ProfileComponent";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Profile",
};
const page = () => {
  return <ProfileComponent />;
};

export default page;
