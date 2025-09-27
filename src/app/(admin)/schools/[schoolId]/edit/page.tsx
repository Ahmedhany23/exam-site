
import { AddEditSchoolComponent } from "@/src/components/schools/AddEditSchoolComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "تعديل مدرسة",
};

const page = () => {
  return <AddEditSchoolComponent />;
};

export default page;
