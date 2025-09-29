import { HomeComponent } from "@/src/components/home/HomeComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الصفحة الرئيسية",
};
const Page = () => {
  return <HomeComponent />;
};

export default Page;
