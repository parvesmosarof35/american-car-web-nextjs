import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar/Navbar";
import Footer from "../shared/Footer/Footer";
import ScrollToTop from "../components/Shared/ScrollToTop";

export default function Layout() {
  return (
    <main className="font-manrope overflow-hidden">
      <ScrollToTop />
      <Navbar />
      <div className="min-h-screen bg-[#f5f5f5] pt-[60px]">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}
