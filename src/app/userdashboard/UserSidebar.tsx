import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  FileText,
  Lock,
  MessageSquare,
  CreditCard,
  List,
  Pin,
  Mail,
  User,
  X,
} from "lucide-react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { BsBoxSeam } from "react-icons/bs";

export default function UserSidebar() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {/* Mobile toggle button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-[84px] left-0 z-50 p-2 rounded-md bg-[#3c3d37] text-white cursor-pointer transform transition-transform duration-300 ease-in-out"
        >
          {sidebarOpen ? <SlArrowLeft size={24} /> : <SlArrowRight size={24} />}
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`w-70 bg-gray-50 p-4 mt-[100px] ${
          isMobile
            ? `fixed top-0 w-80 pl-10 left-0 h-full z-40 transform ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
              } transition-transform duration-300 ease-in-out`
            : ""
        }`}
      >
        {/* Close button for mobile */}
        {isMobile && (
          <button
            onClick={toggleSidebar}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-200"
          >
            <X size={20} />
          </button>
        )}

        {/* Quick Actions */}
        <Section
          title="Quick Actions"
          className=""
          isActive={isSectionActive(pathname, [
            "/userdashboard/list-plate",
            "/userdashboard/get-plate-valued",
          ])}
        >
          <SidebarButton
            to="/userdashboard/list-plate"
            icon={<FileText size={18} />}
            text="List a Plate for Sale"
            onClick={isMobile ? toggleSidebar : undefined}
          />
          <SidebarButton
            to="/userdashboard/get-plate-valued"
            icon={<FileText size={18} />}
            text="Get Plate Valued"
            onClick={isMobile ? toggleSidebar : undefined}
          />
        </Section>

        {/* Account Management */}
        <Section
          title="Account Management"
          isActive={isSectionActive(pathname, [
            "/userdashboard/profile",
            "/userdashboard/account-security",
            "/userdashboard/communications",
          ])}
        >
          <SidebarButton
            to="/userdashboard/profile"
            icon={<User size={18} />}
            text="My Profile"
            onClick={isMobile ? toggleSidebar : undefined}
          />
          <SidebarButton
            to="/userdashboard/account-security"
            icon={<Lock size={18} />}
            text="Account Security"
            onClick={isMobile ? toggleSidebar : undefined}
          />
          <SidebarButton
            to="/userdashboard/communications"
            icon={<MessageSquare size={18} />}
            text="Communications"
            onClick={isMobile ? toggleSidebar : undefined}
          />
        </Section>

        {/* Marketplace Tools */}
        <Section
          title="Marketplace Tools"
          isActive={isSectionActive(pathname, [
            "/userdashboard/my-adverts",
            "/userdashboard/my-subscriptions",
            "/userdashboard/my-buyed-plates",
            "/userdashboard/my-selled-plates",
            "/userdashboard/saved-adverts",
            "/userdashboard/message-center",
          ])}
        >
          <SidebarButton
            to="/userdashboard/my-adverts"
            icon={<List size={18} />}
            text="My Adverts"
            onClick={isMobile ? toggleSidebar : undefined}
          />
          <SidebarButton
            to="/userdashboard/my-subscriptions"
            icon={<BsBoxSeam size={18} />}
            text="My Subscriptions"
            onClick={isMobile ? toggleSidebar : undefined}
          />
          <SidebarButton
            to="/userdashboard/my-buyed-plates"
            icon={<BsBoxSeam size={18} />}
            text="My purchased plate"
            onClick={isMobile ? toggleSidebar : undefined}
          />
          <SidebarButton
            to="/userdashboard/my-selled-plates"
            icon={<BsBoxSeam size={18} />}
            text="My sold plate"
            onClick={isMobile ? toggleSidebar : undefined}
          />
          <SidebarButton
            to="/userdashboard/saved-adverts"
            icon={<Pin size={18} />}
            text="Saved Adverts"
            onClick={isMobile ? toggleSidebar : undefined}
          />
          <SidebarButton
            to="/userdashboard/message-center"
            icon={<Mail size={18} />}
            text="Message Center"
            onClick={isMobile ? toggleSidebar : undefined}
          />
        </Section>

        {/* Billing */}
        <Section
          title="Billing"
          isActive={isSectionActive(pathname, [
            "/userdashboard/secure-payments",
          ])}
        >
          <SidebarButton
            to="/userdashboard/secure-payments"
            icon={<CreditCard size={18} />}
            text="Secure Payments"
            onClick={isMobile ? toggleSidebar : undefined}
          />
        </Section>
      </div>

      {/* Overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}

function Section({ title , children, isActive }: any) {
  return (
    <div className="mb-6">
      <h3
        className={`flex items-center gap-2 font-semibold mb-2 ${
          isActive ? "text-blue-600" : "text-black"
        }`}
      >
        🔵 {title}:
      </h3>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function SidebarButton({ to, icon, text, onClick }: any) {
  const pathname = usePathname();
  const isActive =
    pathname === to || (to !== "/userdashboard" && pathname.startsWith(to));

  return (
    <Link
      href={to}
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 rounded-md bg-white transition
        ${
          isActive
            ? "!bg-[#00823A] text-white shadow-[inset_0_4px_6px_rgba(0,0,0,0.3)]"
            : "shadow-[inset_0_-4px_6px_rgba(0,0,0,0.05)] hover:bg-green-100 hover:text-black"
        }`}
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
}

function isSectionActive(pathname: any, routes: any) {
  return routes.some((route: any) => pathname.startsWith(route));
}
