import { AddEditExamComponent } from "@/src/components/exam/AddEditExamComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "إضافة امتحان جديد",
};

const page = () => {
  return <AddEditExamComponent />;
};

export default page;
