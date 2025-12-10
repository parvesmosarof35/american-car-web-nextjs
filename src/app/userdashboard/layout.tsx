import UserDashboardLayout from "./UserDashboardLayout";
// import PrivateRoute from "@/components/protected/private-route"
import type React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <PrivateRoute>
    <UserDashboardLayout>{children}</UserDashboardLayout>
    // </PrivateRoute>
  );
}
