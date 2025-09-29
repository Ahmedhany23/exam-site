import { TeacherSchoolAssignmentsComponent } from "@/src/components/teacherSchoolAssignment/TeacherSchoolAssignmentComponent";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "تعيين المدرس للمدرسة",
};

const page = () => {
  return <TeacherSchoolAssignmentsComponent />;
};

export default page;
