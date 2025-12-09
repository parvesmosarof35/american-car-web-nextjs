import type React from "react"
import PrivateRoute from "@/components/protected/private-route"
import UserDashboardLayout from "@/components/layout/user-dashboard-layout"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <PrivateRoute>
      <UserDashboardLayout>{children}</UserDashboardLayout>
    </PrivateRoute>
  )
}
