import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function TransactionSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract sessionId from query string
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get("sessionId");

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-4xl">
        <CheckCircle className="mx-auto text-green-500 w-16 h-16 mb-6" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-4">
          Your payment has been processed successfully.
        </p>
        <p className="text-gray-700 font-mono mb-6">
          Session ID: <span className="font-bold">{sessionId}</span>
        </p>
        <button
          onClick={() => navigate("/userdashboard")}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full transition"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
