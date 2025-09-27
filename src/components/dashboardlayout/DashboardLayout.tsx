"use client";

import {
  Book,
  BookUser,
  ChevronDown,
  Home,
  Loader,
  LogOut,
  Menu,
  School,
  School2,
  User,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { useAuthLogout } from "@/src/actions/useAuthLogout";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { useUserStore } from "@/src/hooks/useUserStore";
import Image from "next/image";

type LayoutProps = {
  children: React.ReactNode;
};

export function DashboardLayout({ children }: LayoutProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const { logout, logoutLoading } = useAuthLogout();

  const user = useUserStore((state) => state.user);

  const navItemsMemo = React.useMemo(
    () => [
      { href: "/dashboard", label: "الرئيسية", icon: Home, permission: true },
      {
        href: "/teacher",
        label: "المدرسين",
        icon: Users,
        permission: user?.user_type === "ministry_admin",
      },
      {
        href: "/subjects",
        label: "المواد الدراسية",
        icon: BookUser,
        permission: user?.user_type === "ministry_admin",
      },
      {
        href: "/schools",
        label: "المدارس",
        icon: School2,
        permission: user?.user_type === "ministry_admin",
      },
      {
        href: "/students",
        label: "الطلاب",
        icon: Users,
        permission: user?.user_type === "school_admin" || user?.user_type === "ministry_admin",
      },
      {
        href: "/school-admins",
        label: "مديرين المدرسة",
        icon: School,
        permission: user?.user_type === "ministry_admin",
      },
      {
        href: "/exams",
        label: " الامتحانات",
        icon: Book,
        permission: user?.user_type === "teacher" || user?.user_type === "ministry_admin",
      },
      { href: "/profile", label: "الملف الشخصي", icon: User, permission: true },
    ],
    [user]
  );

  if (pathname === "/login" || pathname === "/not-found") {
    return children;
  }

  return (
    <div className="flex min-h-screen bg-gray-50 font-cairo" dir="rtl">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed inset-y-0 right-0  z-50 w-64 transform bg-white shadow-xl transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 md:shadow-lg
        ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}
      `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between border-b  border-gray-100  px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="h-20 w-20 rounded-xl bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 flex items-center justify-center shadow-sm">
              <Image src="/images/logo.png" alt="Logo" width={80} height={80} />
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex  flex-col gap-1 p-4 sticky top-0 ">
          {navItemsMemo.map(({ href, label, icon: Icon, permission }) => {
            const isActive = pathname.startsWith(href);

            if (!permission) {
              return null;
            }

            return (
              <Link
                key={href}
                href={href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`
                  group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200
                   ${
                     isActive
                       ? "bg-blue-50 text-blue-600 shadow-sm"
                       : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                   }
                `}
              >
                <Icon
                  className={`h-5 w-5 transition-colors ${
                    isActive
                      ? "text-blue-500"
                      : "text-gray-400 group-hover:text-slate-600"
                  }`}
                />
                <span className="font-medium">{label}</span>
                {isActive && (
                  <div className="mr-auto h-2 w-2 rounded-full bg-blue-400"></div>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Enhanced Navbar */}
        <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/90 backdrop-blur-md shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Right side */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden hover:bg-gray-100 rounded-xl"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="فتح القائمة"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>

            {/* Left side */}
            <div className="flex items-center gap-3">
              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-3 hover:bg-gray-100 px-3 py-2 h-auto rounded-xl"
                  >
                    <div className="hidden md:block text-right">
                      <div className="text-sm font-semibold text-gray-900">
                        {user?.name}
                      </div>
                      <div className="text-xs text-gray-500">{user?.email}</div>
                    </div>
                    <Avatar className="h-9 w-9 shadow-sm">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="صورة المستخدم"
                      />
                      <AvatarFallback className="bg-gradient-to-r from-blue-100 to-purple-100 text-slate-700 font-bold">
                        م
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56 shadow-lg">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1 text-right">
                      <p className="text-sm font-semibold leading-none">
                        {user?.name}
                      </p>
                      <p className="text-xs leading-none text-gray-500">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link
                      href={"/profile"}
                      className="cursor-pointer text-right w-full flex gap-2 items-center"
                    >
                      <User className="ml-2 h-4 w-4" />
                      الملف الشخصي
                    </Link>
                  </DropdownMenuItem>
                  {/*     <DropdownMenuItem className="cursor-pointer text-right">
                    <Settings className="ml-2 h-4 w-4" />
                    الإعدادات
                  </DropdownMenuItem> */}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logout}
                    disabled={logoutLoading}
                    className="cursor-pointer text-red-600 text-right"
                  >
                    <LogOut className="ml-2 h-4 w-4" />
                    {logoutLoading ? (
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      "تسجيل الخروج"
                    )}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Enhanced Page content */}
        <main className="flex-1 overflow-y-auto">
          <div className="min-h-full bg-slate-50 p-6">
            <div className="mx-auto max-w-7xl">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
