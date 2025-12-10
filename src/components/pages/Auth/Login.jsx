import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";
import { useLogInMutation } from "../../Redux/api/authApi";
import { setUser } from "../../Redux/Slice/authSlice";
import { useDispatch } from "react-redux";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [logIn, { isLoading, error }] = useLogInMutation();

  // Prefill remembered email and preference
  useEffect(() => {
    try {
      const savedRemember = localStorage.getItem("rememberMe");
      if (savedRemember !== null) {
        setRememberMe(savedRemember === "true");
      }
      if (savedRemember === "true") {
        const savedEmail = localStorage.getItem("rememberEmail");
        if (savedEmail) setEmail(savedEmail);
        const savedPassword = localStorage.getItem("rememberPassword");
        if (savedPassword) setPassword(savedPassword);
      }
    } catch {
      // fail silently if storage is unavailable
    }
  }, []);

  // If URL provides email or redirect, prefill email from query string
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const emailParam = params.get("email");
    if (emailParam) {
      try {
        setEmail(decodeURIComponent(emailParam));
      } catch {
        setEmail(emailParam);
      }
    }
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: !email ? "Email is required!" : "Password is required!",
      });
      return;
    }
    const loginData = { email, password };
    try {
      const response = await logIn(loginData).unwrap();
      // console.log(response);

      if (response?.success && response?.data?.accessToken) {
        // Decode JWT token to check user role first
        try {
          const decodedToken = jwtDecode(response?.data?.accessToken);
          // Check if user role is admin - prevent login
          if (decodedToken.role === "admin") {
            Swal.fire({
              icon: "error",
              title: "Access Denied",
              text: "Admin accounts are not allowed to login to this application. Please use a regular user account.",
              confirmButtonText: "Close",

              confirmButtonColor: "#dc2626"
            });
            return; // Exit early, don't proceed with login
          }
        } catch (decodeError) {
          console.error("Error decoding token:", decodeError);
          // If we can't decode the token, we'll proceed with normal login
        }

        // Only proceed with login if user is not admin
        localStorage.setItem("token", response?.data?.accessToken);
        // Save remember preferences
        try {
          if (rememberMe) {
            localStorage.setItem("rememberMe", "true");
            localStorage.setItem("rememberEmail", email);
            localStorage.setItem("rememberPassword", password);
          } else {
            localStorage.setItem("rememberMe", "false");
            localStorage.removeItem("rememberEmail");
            localStorage.removeItem("rememberPassword");
          }
        } catch {
          // ignore storage failures
        }
        dispatch(
          setUser({
            user: response?.data || {},
            token: response?.data?.accessToken,
          })
        );

        Swal.fire({
          icon: "success",
          title: "Login successful!",
          text: "You are now logged in.",
        });
        // Navigate to redirect path if provided, else home
        const params = new URLSearchParams(location.search);
        const redirect = params.get("redirect");
        if (redirect) {
          let target = redirect;
          try {
            target = decodeURIComponent(redirect);
          } catch {
            // ignore decoding errors
          }
          navigate(target);
        } else {
          navigate("/");
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Login failed!",
        });
      }
    } catch (error) {
      console.log(error);

      // toast.error(` ${error?.data?.message || "Login failed!"}`);
    }
  };

  // if (isLoading) {
  //     return <h1>loading .............</h1>
  // }

  // if (error) {
  //     console.log(error);
  // }

  return (
    <section className="flex items-center justify-center min-h-screen px-5 md:px-0 py-16">
      <div className="w-full container mx-auto">
        <div className="mb-5 text-center space-y-2">
          <h1 className="text-5xl font-bold text-gray-900 text-center">
            Log in to your account
          </h1>
          <p>
            Don't have an account?{" "}
            <Link to="/sign-up" className="font-medium text-gray-600 underline">
              Register here
            </Link>
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-5 space-y-5 max-w-xl mx-auto"
        >
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-bold mb-2 text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-bold mb-2 text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                {showPassword ? (

<svg
xmlns="http://www.w3.org/2000/svg"
fill="none"
viewBox="0 0 24 24"
strokeWidth={1.5}
stroke="currentColor"
className="w-5 h-5"
>
<path
  strokeLinecap="round"
  strokeLinejoin="round"
  d="M2.036 12.322a1.012 1.012 0 010-.644C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .638C20.573 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
/>
<path
  strokeLinecap="round"
  strokeLinejoin="round"
  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
/>
</svg>



              
                ) : (
                

                      // Eye-off icon
                      <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 15.338 6.41 18 12 18c1.834 0 3.41-.318 4.74-.864M6.228 6.228A10.45 10.45 0 0112 6c5.59 0 8.774 2.662 10.066 6-.39 1.029-.996 1.997-1.78 2.852M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243L9.88 9.88"
                      />
                    </svg>
               
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent
                       rounded-md font-medium text-white cursor-pointer
                       bg-[#00823A]
                       focus:outline-none"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>

          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label
                htmlFor="remember"
                className="text-sm text-gray-700 cursor-pointer"
              >
                Remember me
              </label>
            </div>

            <Link
              to="/forgot-password"
              className="text-sm text-gray-600 hover:text-gray-800 underline"
            >
              Forgot password?
            </Link>
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-2">
              {error?.data?.message || "Login failed!"}
            </p>
          )}
        </form>
      </div>

    </section>
  );
}
