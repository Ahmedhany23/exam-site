import { AddEditSubjectComponent } from "@/src/components/subjects/AddEditSubjectComponent";
import { SubjectsComponent } from "@/src/components/subjects/SubjectsComponent";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "إضافة مادة دراسية جديدة",
};

const page = () => {
  return <AddEditSubjectComponent />;
};

export default page;
