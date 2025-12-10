import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PaymentSuccessful() {

  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-md">
        <CheckCircle className="mx-auto text-green-500 w-16 h-16 mb-6" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Account Connected Successfully!
        </h1>
        <p className="text-gray-600 mb-6">
          Your account has been linked and your payment was successful. You can now access all features.
        </p>
        <button
        onClick={()=>{
          navigate('/userdashboard');
        }}
        className="bg-green-500 cursor-pointer hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full transition">
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
