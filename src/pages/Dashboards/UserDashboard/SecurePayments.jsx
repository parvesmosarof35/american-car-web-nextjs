// components/SecurePayments.jsx
import React, { useEffect,  useState } from "react";
import { useCreatePaymentSecureMutation } from "../../../Redux/api/PaymentApis/securePaymentApi";

export default function SecurePayments() {
  const [createPaymentSecure, { data, isLoading, error }] =
    useCreatePaymentSecureMutation();


  const [redirectUrl, setRedirectUrl] = useState(null);
  const [countdown, setCountdown] = useState(5);

  const handleCreatePayment = async () => {
    try {
      const response = await createPaymentSecure().unwrap();
      console.log("Secure Payment Response:", response);

      if (response?.url) {
        // open in new tab
        const newWindow = window.open(response.url, "_blank");

        if (!newWindow || newWindow.closed || typeof newWindow.closed === "undefined") {
          // popup blocked → fallback to countdown redirect
          setRedirectUrl(response.url);
        }
      }
    } catch (err) {
      console.error("Error creating secure payment:", err);
    }
  };

  // Handle API response from Redux
useEffect(() => {
  const url = data?.data?.onboardingUrl?.onboardingUrl || data?.data?.onboardingUrl;
  if (url && typeof url === "string") {
    const newWindow = window.open(url, "_blank");
    if (!newWindow || newWindow.closed || typeof newWindow.closed === "undefined") {
      setRedirectUrl(url);
    }
  }
}, [data]);


  // Countdown effect for fallback redirect
  useEffect(() => {
    if (redirectUrl && countdown > 0) {
      const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    } else if (redirectUrl && countdown === 0) {
      window.location.href = redirectUrl; // redirect current tab
    }
  }, [redirectUrl, countdown]);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="max-w-4xl mx-auto p-8 bg-white shadow rounded-lg">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-center font-semibold text-gray-900 mb-6 text-4xl">
            Secure Payments
          </h1>
        </div>


         {/* Benefits List */}
          <div className="pl-6">
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-gray-900 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                <span className="text-gray-700 leading-relaxed">
                  Protection for buyers and sellers
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-gray-900 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                <span className="text-gray-700 leading-relaxed">
                  Trustworthy transactions
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-gray-900 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                <span className="text-gray-700 leading-relaxed">
                  Transparent process
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-gray-900 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                <span className="text-gray-700 leading-relaxed">
                  Safe & secure payments
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-gray-900 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                <span className="text-gray-700 leading-relaxed">
                  A fair and secure transaction for everyone involved
                </span>
              </li>
            </ul>
          </div>

        {/* Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleCreatePayment}
            disabled={isLoading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isLoading ? "Processing..." : "Create Secure Payment"}
          </button>
        </div>

        {/* Countdown fallback */}
        {redirectUrl && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded text-center">
            <h3 className="font-semibold text-yellow-800 mb-2">
              Redirect blocked by popup blocker
            </h3>
            <p className="text-yellow-700">
              Redirecting in {countdown} seconds...
            </p>
            <button
              onClick={() => (window.location.href = redirectUrl)}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Redirect Now
            </button>
          </div>
        )}

        {/* Show API response */}
        {data && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded">
            <h3 className="font-semibold text-green-800 mb-2">Response:</h3>
            <pre className="text-sm text-green-900">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded">
            <h3 className="font-semibold text-red-800 mb-2">Error:</h3>
            <pre className="text-sm text-red-900">
              {JSON.stringify(error, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
