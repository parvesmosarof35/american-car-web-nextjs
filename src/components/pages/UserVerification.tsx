"use client"
import React, { useState, useEffect, KeyboardEvent, ChangeEvent, ClipboardEvent } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useUserVarificationMutation } from "@/lib/api/authApi";

export default function UserVerification() {
  const [code, setCode] = useState<string[]>(new Array(6).fill(""));
  const [userVarification, { isLoading, isSuccess, isError, error }] = useUserVarificationMutation();
  const router = useRouter();

  // Handle API response
  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        icon: "success",
        title: "Verification successful!",
        text: "Your account has been successfully verified.",
      });
      router.push("/login");
    }

    if (isError) {
      Swal.fire({
        icon: "error",
        title: "Verification failed",
        text: "Invalid code. Please try again.",
      });
    }
  }, [isSuccess, isError, error, router]);

  const handleChange = (value: string, index: number) => {
    if (!isNaN(Number(value)) && value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`) as HTMLInputElement;
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
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
        const prevInput = document.getElementById(`code-${index - 1}`) as HTMLInputElement;
        if (prevInput) prevInput.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`) as HTMLInputElement;
      if (prevInput) prevInput.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
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
      const nextInput = document.getElementById(`code-${nextIndex}`) as HTMLInputElement;
      if (nextInput) nextInput.focus();
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

    userVarification({ verificationCode: parseInt(enteredCode, 10) })
      .unwrap()
      .catch((error) => {
        console.error("Verification error:", error);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f0f6ff] p-5">
      <div className="bg-white relative shadow-lg rounded-2xl px-10 py-20 w-full max-w-xl text-center">
        <h2 className="text-gray-800 text-2xl font-bold mb-5">
          Enter Verification Code
        </h2>
        <p className="text-gray-600 text-base mb-10">
          Please enter the 6-digit code sent to your email or phone.
        </p>

        <div className="flex justify-center gap-2 mb-10">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.value, index)}
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              className="w-12 h-12 text-2xl text-center border border-[#00823b] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              disabled={isLoading}
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-[#00823b] text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-[#006f2e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Verifying..." : "Verify"}
        </button>
      </div>
    </div>
  );
}