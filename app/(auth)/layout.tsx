import type React from "react"
import ScrollToTop from "@/components/shared/scroll-to-top"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="font-sans overflow-hidden">
      <ScrollToTop />
      <div className="min-h-screen">{children}</div>
    </main>
  )
}
