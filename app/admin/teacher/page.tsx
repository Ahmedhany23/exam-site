
import { TeachersComponent } from "@/src/components/admin/teacher/TeachersComponent";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Teacher",
};

const page = () => {
  return <TeachersComponent />;
};

export default page;
