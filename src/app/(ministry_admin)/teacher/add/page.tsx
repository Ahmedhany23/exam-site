
import { AddEditTeacherComponent } from "@/src/components/teacher/AddEditTeacherComponent";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "أضافة مدرس",
};

const page = () => {
  return <AddEditTeacherComponent />;
};

export default page;
