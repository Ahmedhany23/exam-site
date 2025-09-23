import { ExamComponent } from "@/src/components/exam/ExamComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الامتحانات",
};

const page = () => {
  return <ExamComponent />;
};

export default page;
