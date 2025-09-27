
import { SchoolAdminComponent } from "@/src/components/school-admin/SchoolAdminComponents";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "مدير المدرسة",
};

const page = () => {
  return <SchoolAdminComponent />;
};

export default page;
