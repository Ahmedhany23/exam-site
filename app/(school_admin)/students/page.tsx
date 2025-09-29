import { StudentsComponent } from "@/src/components/students/StudentsComponents";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "الطلاب",
};

const page = () => {
  return (
    <Suspense>
      <StudentsComponent />
    </Suspense>
  );
};

export default page;
