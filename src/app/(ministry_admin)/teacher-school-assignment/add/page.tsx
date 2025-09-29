import { AddEditTeacherSchoolAssignment_form } from "@/src/components/teacherSchoolAssignment/forms/AddEditTeacherSchoolAssignment_form";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "تعيين المدرس للمدرسة",
};

const page = () => {
  return <AddEditTeacherSchoolAssignment_form />;
};

export default page;
