
import { StudentsComponent } from "@/src/components/students/StudentsComponents";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الطلاب",
};

const page = () => {
  return <StudentsComponent />;
};

export default page;
