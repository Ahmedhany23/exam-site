import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { responseUserType, useGetUser } from "@/src/hooks/useGetUser";
import { Providers } from "@/src/providers/providers";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    absolute: "",
    default: "وزارة التعليم",
    template: "%s | وزارة التعليم",
  },
  description: "وزارة التعليم",
  icons: {
    icon: "/images/logo.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user: responseUserType | null = await useGetUser();

  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" type="image/svg" href="/images/logo.png" />
      </head>
      <body className={`antialiased ${cairo.variable}`}>
        <Providers user={user}>{children}</Providers>
      </body>
    </html>
  );
}
