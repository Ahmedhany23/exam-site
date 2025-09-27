import { AddEditQuestionComponent } from "@/src/components/exam/AddEditQuestionComponent";
import { ExamComponent } from "@/src/components/exam/ExamComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "تعديل سؤال",
};

const page = () => {
  return <AddEditQuestionComponent />;
};

export default page;
