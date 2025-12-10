"use client"

import { useAppSelector } from "@/lib/hooks/use-app-selector"
import type { ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export default function PremiumRoute({ children }: { children: ReactNode }) {
  const token = useAppSelector((state) => state.auth.token)
  const user = useAppSelector((state) => state.auth.user)
  const router = useRouter()
  const pathname = usePathname()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient) {
      if (!token) {
        router.push(`/login?redirect=${encodeURIComponent(pathname)}`)
      } else if (!user?.isSubscribed) {
        // Redirect to subscription page if not subscribed
        router.push("/pricing")
      }
    }
  }, [token, user, router, pathname, isClient])

  if (!isClient) return null
  if (!token || !user?.isSubscribed) return null

  return <>{children}</>
}
