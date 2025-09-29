import { NextRequest, NextResponse } from "next/server";
import { userType } from "./types/types";

type UserType = userType["user_type"];

// Define access rules for each user type
const accessRules: Record<UserType, string[]> = {
  ministry_admin: [
    "/home",
    "/school-admins",
    "/teachers",
    "/exams",
    "/teacher-school-assignment",
  ],
  school_admin: ["/home", "/students"],
  teacher: ["/home", "/exams"],
  student: ["/home"],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;
  const userType = request.cookies.get("userType")?.value as
    | UserType
    | undefined;

  console.log("🔍 Middleware triggered");
  console.log("📍 Pathname:", pathname);
  console.log("🔐 Token:", token);
  console.log("👤 UserType:", userType);

  // Allow access to login page without token
  if (pathname.startsWith("/login") && !token) {
    console.log("✅ Accessing login without token");
    return NextResponse.next();
  }

  // If no token, redirect to login
  if (!token) {
    console.log("⛔ No token, redirecting to /login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect root path to home
  if (pathname === "/" && token) {
    console.log("➡️ Redirecting / to /home");
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // If not logged in and trying to access home, redirect to login
  if (pathname.startsWith("/home") && !token) {
    console.log("⛔ No token for /home, redirecting to /login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If logged in and trying to access login page, redirect to home
  if (pathname.startsWith("/login") && token) {
    console.log("🔁 Already logged in, redirecting from /login to /home");
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // Check role-based access
  if (userType && accessRules[userType]) {
    const allowedPaths = accessRules[userType];
    const isAllowed = allowedPaths.some((path) => pathname.startsWith(path));

    console.log("🔍 Checking access rules for", userType);
    console.log("✅ Allowed paths:", allowedPaths);
    console.log("📌 Is allowed:", isAllowed);

    if (!isAllowed && allowedPaths.length > 0) {
      console.log(
        "🚫 Path not allowed for userType, redirecting to /not-found"
      );
      return NextResponse.redirect(new URL("/not-found", request.url));
    }
  }

  console.log("✅ Middleware passed, continuing to page");
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/home/:path*",
    "/login",
    "/students",
    "/school-admins",
    "/teachers",
    "/exams",
    "/teacher-school-assignment",
  ],
};
