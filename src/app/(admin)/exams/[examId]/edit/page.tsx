import { AddEditExamComponent } from "@/src/components/exam/AddEditExamComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "تعديل امتحان ",
};

const page = () => {
  return <AddEditExamComponent />;
};

export default page;
