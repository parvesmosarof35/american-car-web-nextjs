"use client"
import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import ScrollToTop from "@/components/shared/scroll-to-top";

import React from "react";
import UserSidebar from "./UserSidebar";

interface UserDashboardLayoutProps {
  children: React.ReactNode;
}

export default function UserDashboardLayout({
  children,
}: UserDashboardLayoutProps) {
  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen">
        <ScrollToTop />
        <UserSidebar />
        <div className="flex-1 ">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
