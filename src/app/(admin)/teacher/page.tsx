
import { TeachersComponent } from "@/src/components/teacher/TeachersComponent";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "المدرسين",
};

const page = () => {
  return <TeachersComponent />;
};

export default page;
