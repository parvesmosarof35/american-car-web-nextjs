import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
// import BrandLogo from "../../Components/Shared/BrandLogo";

import Swal from "sweetalert2";
import { useForgotPasswordMutation, useVerifyEmailMutation } from "../../Redux/api/authApi";

function VerificationCode() {
  const [code, setCode] = useState(new Array(6).fill(""));
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const navigate = useNavigate();

  // resend
  const [
    forgotPassword,
    {
      isLoading: isResending,
      isSuccess: resendSuccess,
      isError: resendError,
      error: resendErr,
    },
  ] = useForgotPasswordMutation();

  // verify
  const [
    verifyEmail,
    {
      data: verifyData, // ✅ this contains your API response
      isLoading: isVerifying,
      isSuccess: verifySuccess,
      isError: verifyError,
      error: verifyErr,
    },
  ] = useVerifyEmailMutation();

  // handle resend toast
  useEffect(() => {
    if (resendSuccess) {
      Swal.fire({
        icon: "success",
        title: "OTP Resent",
        text: "A new OTP has been sent to your email.",
      });
    }
    if (resendError) {
      Swal.fire({
        icon: "error",
        title: "Resend Failed",
        text: resendErr?.data?.message || "Could not resend OTP.",
      });
    }
  }, [resendSuccess, resendError, resendErr]);

  // handle verify toast + token save
  useEffect(() => {
    if (verifySuccess && verifyData) {
      const token = verifyData?.data; // ✅ correct token
      console.log("Received token:", token);

      if (token) {
        localStorage.setItem("accessToken", token);
        navigate("/reset-password");
      }

      Swal.fire({
        icon: "success",
        title: "Verification successful!",
        text: "Your email has been successfully verified.",
      });
    }

    if (verifyError) {
      Swal.fire({
        icon: "error",
        title: "Verification Failed",
        text: verifyErr?.data?.message || "Invalid code. Please try again.",
      });
    }
  }, [verifySuccess, verifyError, verifyErr, verifyData, navigate]);

  const handleChange = (value, index) => {
    // accept only digits, one character per box
    const digit = value.replace(/\D/g, "").slice(-1);
    const newCode = [...code];
    newCode[index] = digit || "";
    setCode(newCode);
    if (digit && index < 5) {
      const next = document.getElementById(`code-${index + 1}`);
      if (next) next.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newCode = [...code];
      if (newCode[index]) {
        newCode[index] = "";
        setCode(newCode);
      } else if (index > 0) {
        newCode[index - 1] = "";
        setCode(newCode);
        const prev = document.getElementById(`code-${index - 1}`);
        if (prev) prev.focus();
      }
      return;
    }
    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      const prev = document.getElementById(`code-${index - 1}`);
      if (prev) prev.focus();
    }
    if (e.key === "ArrowRight" && index < 5) {
      e.preventDefault();
      const next = document.getElementById(`code-${index + 1}`);
      if (next) next.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = (e.clipboardData || window.clipboardData)
      .getData("text")
      .replace(/\D/g, "");
    if (!pasted) return;

    const active = document.activeElement?.id || "code-0";
    const startIndex = Number(active?.split("-")[1]) || 0;
    const newCode = [...code];
    for (let i = 0; i < 6 - startIndex && i < pasted.length; i++) {
      newCode[startIndex + i] = pasted[i];
    }
    setCode(newCode);

    const nextIndex = Math.min(startIndex + pasted.length, 5);
    const next = document.getElementById(`code-${nextIndex}`);
    if (next) next.focus();
  };

  const enteredCode = code.join("");

  const handleVerifyCode = () => {
    if (enteredCode.length !== 6) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter a valid 6-digit code.",
      });
      return;
    }

    const numberedCode = parseInt(enteredCode, 10);

    const payload = { verificationCode: numberedCode };
    console.log("sending payload:", payload);

    verifyEmail(payload); // ✅ trigger mutation
  };

  const handleResend = () => {
    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No email found. Please go back and try again.",
      });
      return;
    }
    // clear input boxes on resend
    setCode(new Array(6).fill(""));
    setTimeout(() => {
      const first = document.getElementById("code-0");
      if (first) first.focus();
    }, 0);
    forgotPassword({ email });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f0f6ff] p-5">
      <div className="bg-white relative shadow-lg rounded-2xl px-10 py-20 w-full max-w-xl text-center">
        <div className="flex mb-5 flex-col items-center justify-center w-full">
          {/* <BrandLogo img="/logo.png" /> */}
        </div>
        <div className="flex mb-5 flex-col items-center justify-center w-full">
          <h2 className="text-gray-800 text-2xl font-bold text-center mb-5">
            Check your email
          </h2>
          <p className="text-gray-800 text-base text-center mb-5">
            Please enter the 6-digit verification code we sent to your email.
          </p>
        </div>
        <form className="space-y-5">
          <div className="flex justify-center gap-2" onPaste={handlePaste}>
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="shadow-xs w-12 h-12 text-2xl text-center border border-[#00823b] text-[#00823b] rounded-lg focus:outline-none"
              />
            ))}
          </div>

          <div className="flex flex-col gap-5 justify-center items-center text-white">
            <button
              onClick={handleVerifyCode}
              disabled={isVerifying}
              type="button"
              className="whitespace-nowrap w-full bg-[#00823b] text-white font-semibold py-3 rounded-lg shadow-lg cursor-pointer my-5"
            >
              {isVerifying ? "Verifying..." : "Continue"}
            </button>
            <p className="text-[#6A6D76] text-center mt-10">
              Didn’t receive the email?{" "}
              <span
                className="text-[#00823b] cursor-pointer"
                onClick={handleResend}
              >
                {isResending ? "Resending..." : "Resend"}
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VerificationCode;
