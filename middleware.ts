import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const adminToken = request.cookies.get("AdminToken")?.value;
  const teacherToken = request.cookies.get("TeacherToken")?.value;
  const studentToken = request.cookies.get("StudentToken")?.value;

  if (pathname === "/") {
    if (adminToken) return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    if (teacherToken) return NextResponse.redirect(new URL("/teacher/dashboard", request.url));
    if (studentToken) return NextResponse.redirect(new URL("/student/dashboard", request.url));
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login") && !adminToken) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (pathname.startsWith("/teacher") && !pathname.startsWith("/teacher/login") && !teacherToken) {
    return NextResponse.redirect(new URL("/teacher/login", request.url));
  }

  if (pathname.startsWith("/student") && !pathname.startsWith("/student/login") && !studentToken) {
    return NextResponse.redirect(new URL("/student/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/admin/:path*", "/teacher/:path*", "/student/:path*"],
};
