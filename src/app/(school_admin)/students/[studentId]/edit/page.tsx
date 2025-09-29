import { AddEditStudentComponent } from "@/src/components/students/AddEditStudentComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "تعديل الطالب ",
};

const page = () => {
  return <AddEditStudentComponent />;
};

export default page;
