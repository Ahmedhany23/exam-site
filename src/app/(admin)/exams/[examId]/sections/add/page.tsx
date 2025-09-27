import { AddEditExamComponent } from "@/src/components/exam/AddEditExamComponent";
import { AddEditSectionComponent } from "@/src/components/exam/AddEditSectionComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "إضافة قسم جديد",
};

const page = () => {
  return <AddEditSectionComponent />;
};

export default page;
