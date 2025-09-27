import { NextRequest, NextResponse } from "next/server";
import { userType } from "./src/types/types";

type UserType = userType["user_type"];

// Define access rules for each user type
const accessRules: Record<UserType, string[]> = {
  ministry_admin: ["/dashboard", "/school-admins", "/teachers", "/exams"],
  school_admin: ["/dashboard", "/students"],
  teacher: ["/dashboard", "/exams"],
  student: ["/dashboard"],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;
  const userType = request.cookies.get("userType")?.value as
    | UserType
    | undefined;

  // Allow access to login page without token
  if (pathname.startsWith("/login") && !token) {
    return NextResponse.next();
  }

  // If no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect root path to dashboard
  if (pathname === "/" && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If not logged in and trying to access dashboard, redirect to login
  if (pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If logged in and trying to access login page, redirect to dashboard
  if (pathname.startsWith("/login") && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Check role-based access
  if (userType && accessRules[userType]) {
    const allowedPaths = accessRules[userType];
    const isAllowed = allowedPaths.some((path) => pathname.startsWith(path));

    // If the route is not allowed for this user type
    if (!isAllowed && allowedPaths.length > 0) {
      return NextResponse.redirect(new URL("/not-found", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/students",
    "/school-admins",
    "/teachers",
    "/exams",
  ],
};
