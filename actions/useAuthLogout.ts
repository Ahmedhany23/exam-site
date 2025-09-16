"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { handleLogout } from "./auth"

export function useAuthLogout() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const logout = () => {
    startTransition(async () => {
      await handleLogout()
      router.push("/login")
    })
  }

  return { logout, logoutLoading: isPending }
}
