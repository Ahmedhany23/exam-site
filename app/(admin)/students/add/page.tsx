
import { AddEditStudentComponent } from "@/src/components/students/AddEditStudentComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "إضافة الطالب جديد",
};

const page = () => {
  return <AddEditStudentComponent />;
};

export default page;
