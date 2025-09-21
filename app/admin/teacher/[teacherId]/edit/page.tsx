
import { AddEditTeacherComponent } from "@/src/components/admin/teacher/AddEditTeacherComponent";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Edit Teacher",
};

const page = () => {
  return <AddEditTeacherComponent />;
};

export default page;
