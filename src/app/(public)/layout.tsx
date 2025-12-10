import type React from "react"
import Navbar from "@/components/shared/navbar"
import Footer from "@/components/shared/footer"
import ScrollToTop from "@/components/shared/scroll-to-top"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="font-sans overflow-hidden">
      <ScrollToTop />
      <Navbar />
      <div className="min-h-screen bg-[#f5f5f5] pt-[60px]">{children}</div>
      <Footer />
    </main>
  )
}
