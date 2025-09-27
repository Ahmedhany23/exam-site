import { AddEditSectionComponent } from "@/src/components/exam/AddEditSectionComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "تعديل قسم ",
};

const page = () => {
  return <AddEditSectionComponent />;
};

export default page;
