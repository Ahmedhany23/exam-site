import { DashboardLayout } from "@/src/components/admin/Dashboardlayout/DashboardLayout";




export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
