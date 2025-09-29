import { SubjectsComponent } from "@/src/components/subjects/SubjectsComponent";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "المواد الدراسية",
};

const page = () => {
  return <SubjectsComponent />;
};

export default page;
