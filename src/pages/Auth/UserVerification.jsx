// src/pages/Auth/UserVerification.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useUserVarificationMutation } from "../../Redux/api/authApi";
// import BrandLogo from "../../components/Shared/brandLogo";

export default function UserVerification() {
  const [code, setCode] = useState(new Array(6).fill(""));
  const [userVarification, { isLoading, isSuccess, isError, error }] =
    useUserVarificationMutation();
  const navigate = useNavigate();

  // Handle API response
  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        icon: "success",
        title: "Verification successful!",
        text: "Your account has been successfully verified.",
      });
      navigate("/login"); // redirect to login or dashboard
    }

    if (isError) {
      Swal.fire({
        icon: "error",
        title: "Verification failed",
        text: error?.data?.message || "Invalid code. Please try again.",
      });
    }
  }, [isSuccess, isError, error, navigate]);

  const handleChange = (value, index) => {
    if (!isNaN(value) && value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // auto-focus next input
      if (value && index < 5) {
        document.getElementById(`code-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const newCode = [...code];
      
      if (code[index]) {
        // Clear current field if it has value
        newCode[index] = '';
        setCode(newCode);
      } else if (index > 0) {
        // Move to previous field and clear it
        newCode[index - 1] = '';
        setCode(newCode);
        document.getElementById(`code-${index - 1}`).focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      document.getElementById(`code-${index - 1}`).focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      document.getElementById(`code-${index + 1}`).focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, ''); // Remove non-digits
    
    if (pastedData.length <= 6) {
      const newCode = new Array(6).fill('');
      for (let i = 0; i < pastedData.length; i++) {
        newCode[i] = pastedData[i];
      }
      setCode(newCode);
      
      // Focus the next empty field or the last field
      const nextIndex = Math.min(pastedData.length, 5);
      document.getElementById(`code-${nextIndex}`).focus();
    }
  };

  const handleSubmit = () => {
    const enteredCode = code.join("");
    if (enteredCode.length !== 6) {
      Swal.fire({
        icon: "error",
        title: "Invalid code",
        text: "Please enter a 6-digit code.",
      });
      return;
    }

    userVarification({ verificationCode: parseInt(enteredCode, 10) });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f0f6ff] p-5">
      <div className="bg-white relative shadow-lg rounded-2xl px-10 py-20 w-full max-w-xl text-center">
        {/* Logo */}
        <div className="flex mb-5 flex-col items-center justify-center w-full">
          {/* <BrandLogo img="/logo.png" /> */}
        </div>

        <h2 className="text-gray-800 text-2xl font-bold mb-5">
          Enter Verification Code
        </h2>
        <p className="text-gray-600 text-base mb-10">
          Please enter the 6-digit code sent to your email or phone.
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-2 mb-10">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              className="w-12 h-12 text-2xl text-center border border-[#00823b] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-[#00823b] text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-[#006f2e] transition-colors"
        >
          {isLoading ? "Verifying..." : "Verify"}
        </button>
      </div>
    </div>
  );
}
