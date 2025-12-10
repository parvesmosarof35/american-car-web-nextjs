"use client"

import { useAppSelector } from "@/lib/hooks/use-app-selector"
import type { ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const token = useAppSelector((state) => state.auth.token)
  const router = useRouter()
  const pathname = usePathname()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient && !token) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`)
    }
  }, [token, router, pathname, isClient])

  if (!isClient) return null
  if (!token) return null

  return <>{children}</>
}
