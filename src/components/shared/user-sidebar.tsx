"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAppDispatch } from "@/lib/hooks/use-app-dispatch"
import { logout } from "@/lib/slices/auth-slice"
import { LogOut } from "lucide-react"

interface UserSidebarProps {
  onClose?: () => void
}

export default function UserSidebar({ onClose }: UserSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const dispatch = useAppDispatch()

  const isActiveLink = (href: string) => {
    return pathname.startsWith(href)
  }

  const handleLogout = () => {
    dispatch(logout())
    router.push("/login")
  }

  const dashboardLinks = [
    { href: "/userdashboard", label: "My Profile", icon: "👤" },
    { href: "/userdashboard/list-plate", label: "List Plate for Sale", icon: "📋" },
    { href: "/userdashboard/get-plate-valued", label: "Get Plate Valued", icon: "💰" },
    { href: "/userdashboard/my-adverts", label: "My Adverts", icon: "📢" },
    { href: "/userdashboard/my-subscriptions", label: "My Subscriptions", icon: "🎫" },
    { href: "/userdashboard/my-buyed-plates", label: "My Bought Plates", icon: "🛍️" },
    { href: "/userdashboard/my-selled-plates", label: "My Sold Plates", icon: "💵" },
    { href: "/userdashboard/saved-adverts", label: "Saved Adverts", icon: "⭐" },
    { href: "/userdashboard/message-center", label: "Messages", icon: "💬" },
    { href: "/userdashboard/secure-payments", label: "Secure Payments", icon: "🔒" },
    { href: "/userdashboard/account-security", label: "Account Security", icon: "🛡️" },
    { href: "/userdashboard/communications", label: "Communication Preferences", icon: "📧" },
  ]

  return (
    <div className="flex flex-col h-full p-6">
      <h2 className="text-2xl font-bold mb-8 text-gray-900">Dashboard</h2>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-2">
        {dashboardLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
              isActiveLink(link.href) ? "bg-yellow-400 text-gray-900 font-semibold" : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={onClose}
          >
            <span>{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center gap-3 px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors font-semibold mt-auto"
      >
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </div>
  )
}
