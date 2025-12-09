"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/lib/hooks/use-app-dispatch"
import { logout } from "@/lib/slices/auth-slice"
import { ChevronDown, Menu, X } from "lucide-react"
import { getImageUrl } from "@/lib/config"

// Import your RTK Query hook (we'll need to create this)
// import { useGetMyProfileQuery } from "@/lib/api/auth-api"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false)
  const [isAvatarDropdownOpen, setIsAvatarDropdownOpen] = useState(false)
  const moreRef = useRef<HTMLDivElement>(null)
  const avatarRef = useRef<HTMLDivElement>(null)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const avatarHoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const router = useRouter()
  const pathname = usePathname()
  const dispatch = useAppDispatch()
  const token = useAppSelector((state) => state.auth.token)
  const user = useAppSelector((state) => state.auth.user)
  const [isLoggedIn, setIsLoggedIn] = useState(!!token)

  useEffect(() => {
    setIsLoggedIn(!!token)
  }, [token])

  // Close dropdowns on click outside or Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isMoreDropdownOpen && moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setIsMoreDropdownOpen(false)
      }
      if (isAvatarDropdownOpen && avatarRef.current && !avatarRef.current.contains(e.target as Node)) {
        setIsAvatarDropdownOpen(false)
      }
    }

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMoreDropdownOpen(false)
        setIsAvatarDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleKeydown)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeydown)
    }
  }, [isMoreDropdownOpen, isAvatarDropdownOpen])

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
      if (avatarHoverTimeoutRef.current) clearTimeout(avatarHoverTimeoutRef.current)
    }
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleMoreDropdown = () => setIsMoreDropdownOpen(!isMoreDropdownOpen)
  const toggleAvatarDropdown = () => setIsAvatarDropdownOpen(!isAvatarDropdownOpen)

  const handleLogOut = () => {
    dispatch(logout())
    setIsLoggedIn(false)
    router.push("/login")
  }

  const handleLogin = () => {
    router.push("/login")
  }

  const isActiveLink = (href: string) => {
    if (href === "/" && pathname === "/") return true
    if (href !== "/" && pathname.startsWith(href)) return true
    return false
  }

  const mainMenuItems = [
    { href: "/", name: "Home" },
    { href: "/sell-a-plate", name: "Sell a Plate" },
    { href: "/buy-a-plate", name: "Buy a Plate" },
    { href: "/plate-view", name: "Plate View" },
    { href: "/all-plates", name: "All Plates" },
  ]

  const moreMenuItems = [
    { href: "/recently-sold", name: "Recently Sold" },
    { href: "/newly-listed-plates", name: "Newly Listed Plates" },
    { href: "/guide-and-blog", name: "Guide & Blog" },
    { href: "/faq", name: "FAQ" },
    { href: "/reviews", name: "Reviews & Testimonials" },
    { href: "/contact-us", name: "Contact" },
    { href: "/privacy-policy", name: "Privacy Policy" },
    { href: "/terms-conditions", name: "Terms & Conditions" },
    { href: "/about-us", name: "About Us" },
  ]

  const mobileMenuItems = [...mainMenuItems, ...moreMenuItems]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#3c3d37] text-white shadow-lg">
      <div className="container mx-auto px-5 md:px-0 py-2 md:py-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <img src="/logo.png" alt="website logo" className="w-full h-full" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-5">
            {mainMenuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 text-base font-semibold ${
                  isActiveLink(item.href) ? "text-yellow-400" : "text-white hover:text-yellow-400"
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* More dropdown */}
            <div
              className="relative"
              ref={moreRef}
              onMouseEnter={() => {
                if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
                setIsMoreDropdownOpen(true)
              }}
              onMouseLeave={() => {
                if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
                hoverTimeoutRef.current = setTimeout(() => setIsMoreDropdownOpen(false), 500)
              }}
            >
              <button
                onClick={() => {
                  if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
                  toggleMoreDropdown()
                }}
                className="text-white hover:text-yellow-400 px-3 py-2 text-base font-semibold flex items-center"
              >
                More <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              <div
                className={`absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 transform transition-all duration-300 ease-out ${
                  isMoreDropdownOpen
                    ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                    : "opacity-0 -translate-y-1 scale-95 pointer-events-none"
                }`}
              >
                {moreMenuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-4 py-2 text-base ${
                      isActiveLink(item.href)
                        ? "bg-gray-100 font-medium text-gray-900"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setIsMoreDropdownOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div
                className="relative"
                ref={avatarRef}
                onMouseEnter={() => {
                  if (avatarHoverTimeoutRef.current) clearTimeout(avatarHoverTimeoutRef.current)
                  setIsAvatarDropdownOpen(true)
                }}
                onMouseLeave={() => {
                  if (avatarHoverTimeoutRef.current) clearTimeout(avatarHoverTimeoutRef.current)
                  avatarHoverTimeoutRef.current = setTimeout(() => setIsAvatarDropdownOpen(false), 500)
                }}
              >
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      if (avatarHoverTimeoutRef.current) clearTimeout(avatarHoverTimeoutRef.current)
                      toggleAvatarDropdown()
                    }}
                    className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-yellow-400 hover:border-yellow-500 overflow-hidden"
                  >
                    <img
                      src={getImageUrl(user?.photo as string) || "/man.png"}
                      alt="User Avatar"
                      className="w-full h-full object-cover cursor-pointer"
                    />
                  </button>
                  <div>
                    <p>Welcome</p>
                    <p className="font-semibold">{`${user?.fastname || ""} ${user?.lastname || ""}`.trim()}</p>
                  </div>
                </div>
                <div
                  className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 transform transition-all duration-300 ease-out ${
                    isAvatarDropdownOpen
                      ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                      : "opacity-0 -translate-y-1 scale-95 pointer-events-none"
                  }`}
                >
                  <Link
                    href="/userdashboard"
                    className="block px-4 py-2 text-base font-semibold text-gray-600 hover:bg-gray-100"
                    onClick={() => setIsAvatarDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 text-base font-semibold text-gray-700 hover:bg-gray-100"
                    onClick={handleLogOut}
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-md text-base font-semibold"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white hover:text-yellow-400 p-2">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-700 rounded-lg mt-2">
            {mobileMenuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 text-base font-medium ${
                  isActiveLink(item.href) ? "text-yellow-400" : "text-white hover:text-yellow-400"
                }`}
                onClick={toggleMenu}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2 border-t border-gray-600">
              {isLoggedIn ? (
                <>
                  <Link
                    href="/userdashboard"
                    className="block px-3 py-2 text-base font-medium text-white hover:text-yellow-400"
                    onClick={toggleMenu}
                  >
                    Dashboard
                  </Link>
                  <button
                    className="block w-full text-left px-3 py-2 text-base font-medium text-white hover:text-yellow-400"
                    onClick={() => {
                      toggleMenu()
                      handleLogOut()
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  className="block w-full text-left px-3 py-2 text-base font-medium text-white hover:text-yellow-400"
                  onClick={() => {
                    toggleMenu()
                    handleLogin()
                  }}
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
