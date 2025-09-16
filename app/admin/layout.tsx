import type { Metadata } from "next";
import { Cairo, Geist_Mono } from "next/font/google";
import "./../globals.css";
import { Providers } from "@/providers/providers";
import { DashboardLayout } from "@/components/admin/Dashboardlayout/DashboardLayout";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin"],
});



export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
