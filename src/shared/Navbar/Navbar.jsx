import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Redux/Slice/authSlice";
import { ChevronDown, Menu, X } from "lucide-react";
import { useGetMyProfileQuery } from "../../Redux/api/authApi";
import Loader from "../Loaders/Loader";
import ErrorPage from "../Error/ErrorPage";
import { getImageUrl } from "../../config/envConfig";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const [isAvatarDropdownOpen, setIsAvatarDropdownOpen] = useState(false);
  const moreRef = useRef(null);
  const avatarRef = useRef(null);
  const hoverTimeoutRef = useRef(null);
  const avatarHoverTimeoutRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const { data, isLoading, refetch } = useGetMyProfileQuery(token, { skip: !token });



//   console.log("User Data:", data);
//     console.log("Auth Token:", token);
    //if token exists, isLoggedIn should be true
// Update login state if token changes
useEffect(() => {
  setIsLoggedIn(!!token);
}, [token]);

// Refetch profile after login
useEffect(() => {
  if (isLoggedIn && token) {
    refetch();
  }
}, [isLoggedIn, token, refetch]);

    // Keep auth state in sync with Redux token
  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  // Close dropdowns on click outside or Escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMoreDropdownOpen && moreRef.current && !moreRef.current.contains(e.target)) {
        setIsMoreDropdownOpen(false);
      }
      if (isAvatarDropdownOpen && avatarRef.current && !avatarRef.current.contains(e.target)) {
        setIsAvatarDropdownOpen(false);
      }
    };
    const handleKeydown = (e) => {
      if (e.key === "Escape") {
        setIsMoreDropdownOpen(false);
        setIsAvatarDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [isMoreDropdownOpen, isAvatarDropdownOpen]);

  // Clear any pending dropdown close timers on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      if (avatarHoverTimeoutRef.current) {
        clearTimeout(avatarHoverTimeoutRef.current);
      }
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleMoreDropdown = () => setIsMoreDropdownOpen(!isMoreDropdownOpen);
  const toggleAvatarDropdown = () =>
    setIsAvatarDropdownOpen(!isAvatarDropdownOpen);

  const handleLogOut = () => {
    dispatch(logout());
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  // Menu items
  const mainMenuItems = [
    { path: "/", name: "Home", end: true },
    { path: "/sell-a-plate", name: "Sell a Plate" },
    { path: "/buy-a-plate", name: "Buy a Plate" },
    { path: "/plate-view", name: "Plate View" },
    { path: "/all-plates", name: "All Plates" },
  ];

  const moreMenuItems = [
    { path: "/recently-sold", name: "Recently Sold" },
    { path: "/newly-listed-plates", name: "Newly Listed Plates" },
    { path: "/guide-and-blog", name: "Guide & Blog" },
    { path: "/faq", name: "FAQ" },
    { path: "/Reviewsandtestimonials", name: "Reviews & Testimonials" },
    { path: "/contact-us", name: "Contact" },
    { path: "/privacy-policy", name: "Privacy Policy" },
    { path: "/terms-conditions", name: "Terms & Conditions" },
    { path: "/about-us", name: "About Us" },
  ];

  const mobileMenuItems = [...mainMenuItems, ...moreMenuItems];

  // ✅ Alternative approach - render loading/error states within the navbar structure
  // This maintains consistent layout and prevents hooks order issues
{isLoading && (
  <div className="flex justify-center items-center h-16">
    <div className="w-6 h-6 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
  </div>
)}



  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#3c3d37] text-white shadow-lg">
      <div className="container mx-auto px-5 md:px-0 py-2 md:py-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to="/" className="flex-shrink-0">
            <img src="/logo.png" alt="website logo" className="w-full h-full" />
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-5">
            {mainMenuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `px-3 py-2 text-base font-semibold ${
                    isActive
                      ? "text-yellow-400"
                      : "text-white hover:text-yellow-400"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            {/* More dropdown */}
            <div
              className="relative"
              ref={moreRef}
              onMouseEnter={() => {
                if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
                setIsMoreDropdownOpen(true);
              }}
              onMouseLeave={() => {
                if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
                hoverTimeoutRef.current = setTimeout(() => setIsMoreDropdownOpen(false), 500);
              }}
            >
              <button
                onClick={() => {
                  if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
                  toggleMoreDropdown();
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
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `block px-4 py-2 text-base ${
                        isActive
                          ? "bg-gray-100 font-medium text-gray-900"
                          : "text-gray-700 hover:bg-gray-100"
                      }`
                    }
                    onClick={() => setIsMoreDropdownOpen(false)}
                  >
                    {item.name}
                  </NavLink>
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
                  if (avatarHoverTimeoutRef.current)
                    clearTimeout(avatarHoverTimeoutRef.current);
                  setIsAvatarDropdownOpen(true);
                }}
                onMouseLeave={() => {
                  if (avatarHoverTimeoutRef.current)
                    clearTimeout(avatarHoverTimeoutRef.current);
                  avatarHoverTimeoutRef.current = setTimeout(
                    () => setIsAvatarDropdownOpen(false),
                    500
                  );
                }}
              >
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      if (avatarHoverTimeoutRef.current)
                        clearTimeout(avatarHoverTimeoutRef.current);
                      toggleAvatarDropdown();
                    }}
                    className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-yellow-400 hover:border-yellow-500 overflow-hidden"
                  >
                    <img
                      src={getImageUrl(data?.data?.photo) || "/man.png"}
                      alt="User Avatar"
                      className="w-full h-full object-cover cursor-pointer"
                    />
                  </button>
                  <div>
                    <p>Welcome</p>
                    <p>
                      {data?.data?.fastname
                        .concat(" ")
                        .concat(data?.data?.lastname)}
                    </p>
                  </div>
                </div>
                <div
                  className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 transform transition-all duration-300 ease-out ${
                    isAvatarDropdownOpen
                      ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                      : "opacity-0 -translate-y-1 scale-95 pointer-events-none"
                  }`}
                >
                  <NavLink
                    to="/userdashboard"
                    className="block px-4 py-2 text-base font-semibold text-gray-600 hover:bg-gray-100"
                    onClick={() => setIsAvatarDropdownOpen(false)}
                  >
                    Dashboard
                  </NavLink>
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
            <button
              onClick={toggleMenu}
              className="text-white hover:text-yellow-400 p-2"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-700 rounded-lg mt-2">
            {mobileMenuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `block px-3 py-2 text-base font-medium ${
                    isActive
                      ? "text-yellow-400"
                      : "text-white hover:text-yellow-400"
                  }`
                }
                onClick={toggleMenu}
              >
                {item.name}
              </NavLink>
            ))}
            <div className="pt-2 border-t border-gray-600">
              {isLoggedIn ? (
                <>
                  <NavLink
                    to="/userdashboard"
                    className="block px-3 py-2 text-base font-medium text-white hover:text-yellow-400"
                    onClick={toggleMenu}
                  >
                    Dashboard
                  </NavLink>
                  <button
                    className="block w-full text-left px-3 py-2 text-base font-medium text-white hover:text-yellow-400"
                    onClick={() => {
                      toggleMenu();
                      handleLogOut();
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  className="block w-full text-left px-3 py-2 text-base font-medium text-white hover:text-yellow-400"
                  onClick={() => {
                    toggleMenu();
                    handleLogin();
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
  );
}
