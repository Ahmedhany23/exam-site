"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Home,
  Settings,
  User,
  LogOut,
  Bell,
  Search,
  ChevronDown,
  X,
  Users,
  HomeIcon,
  Loader,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthLogout } from "@/actions/useAuthLogout";

type LayoutProps = {
  children: React.ReactNode;
};

const navItems = [
  { href: "/admin/dashboard", label: "الرئيسية", icon: Home },
  { href: "/admin/teacher", label: "المدرسين", icon: Users },
  { href: "/settings", label: "الإعدادات", icon: Settings },
  { href: "/profile", label: "الملف الشخصي", icon: User },
];

export function DashboardLayout({ children }: LayoutProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const { logout, logoutLoading } = useAuthLogout();

  if (pathname === "/admin/login") {
    return children;
  }

  return (
    <div className="flex h-screen bg-gray-50 font-cairo" dir="rtl">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed inset-y-0 right-0 z-50 w-64 transform bg-white shadow-xl transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 md:shadow-lg
        ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}
      `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 flex items-center justify-center shadow-lg">
              <HomeIcon color="white" />
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
        <nav className="flex flex-col gap-1 p-4">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`
                  group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200
                  ${
                    isActive
                      ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-sm border border-blue-100"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }
                `}
              >
                <Icon
                  className={`h-5 w-5 transition-colors ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-400 group-hover:text-gray-600"
                  }`}
                />
                <span className="font-medium">{label}</span>
                {isActive && (
                  <div className="mr-auto h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>
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
                        محمد أحمد
                      </div>
                      <div className="text-xs text-gray-500">
                        mohamed@example.com
                      </div>
                    </div>
                    <Avatar className="h-9 w-9 shadow-sm">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="صورة المستخدم"
                      />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold">
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
                        محمد أحمد
                      </p>
                      <p className="text-xs leading-none text-gray-500">
                        mohamed@example.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-right">
                    <User className="ml-2 h-4 w-4" />
                    الملف الشخصي
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer text-right">
                    <Settings className="ml-2 h-4 w-4" />
                    الإعدادات
                  </DropdownMenuItem>
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
          <div className="min-h-full bg-gradient-to-bl from-gray-50 via-blue-50/30 to-indigo-50/40 p-6">
            <div className="mx-auto max-w-7xl">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
