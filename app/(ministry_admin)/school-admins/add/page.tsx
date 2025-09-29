import { AddEditSchoolAdminComponent } from "@/src/components/school-admin/AddEditSchoolAdminComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "اضافة مدير مدرسة",
};

const page = () => {
  return <AddEditSchoolAdminComponent />;
};

export default page;
