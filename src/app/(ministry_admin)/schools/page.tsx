
import { SchoolsComponent } from "@/src/components/schools/SchoolsComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "المدارس",
};

const page = () => {
  return <SchoolsComponent />;
};

export default page;
