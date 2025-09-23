"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export async function handleLogout() {
  const cookieStore = await cookies();
  const headersList = await headers();
  const fullUrl = headersList.get("referer") || "";

  const token = cookieStore.get("token")?.value;

  if (token) {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
    } catch {
      // ignore api error
    }
  }

  cookieStore.delete("token");
  cookieStore.delete("userType");

  if (fullUrl) {
    redirect("/login");
  }
}
