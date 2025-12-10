"use client"

import type { ReactNode } from "react"
import Navbar from "../shared/navbar"
import Footer from "../shared/footer"
import ScrollToTop from "../shared/scroll-to-top"

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <main className="font-manrope overflow-hidden">
      <ScrollToTop />
      <Navbar />
      <div className="min-h-screen bg-[#f5f5f5] pt-[60px]">{children}</div>
      <Footer />
    </main>
  )
}
