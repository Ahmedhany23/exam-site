import { AddEditTeacherComponent } from "@/components/admin/teacher/AddEditTeacherComponent";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Add Teacher",
};

const page = () => {
  return <AddEditTeacherComponent />;
};

export default page;
