import { AddEditExamComponent } from "@/src/components/exam/AddEditExamComponent";
import { ExamDetailsComponent } from "@/src/components/exam/ExamDetailsComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "تفاصيل امتحان ",
};

const page = () => {
  return <ExamDetailsComponent />;
};

export default page;
