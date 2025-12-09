import React, { useState } from "react";
import { useCreateCheckoutForValuedMutation } from "../../../Redux/api/PaymentApis/getAPlateValuedApi";
import { useNavigate } from "react-router-dom";
import { useIssubscribedMutation } from "../../../Redux/api/Issubscribed/IssubscribedApi";


export default function GetPlateValued() {

    const [createCheckoutForValued, {isLoading}] = useCreateCheckoutForValuedMutation();
  const [formData, setFormData] = useState({
    registration: "",
    meaning: "",
    notes: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



  const navigate = useNavigate();
    const [checkSubscribed] = useIssubscribedMutation();

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Form submitted:", formData);

  const subscriptionId = localStorage.getItem("subscriptionId");

  if (!subscriptionId) {
    navigate("/please-subscribe");
    return;
  }

  try {
    // Verify subscription
    const response = await checkSubscribed({ id: subscriptionId }).unwrap();
    console.log("Subscription check response:", response);

    if (response?.data?.isAvailable) {
      // Prepare submission data
      const submissionData = {
        plate: formData.registration,
        price: 10, // fixed price for demo
        represent: formData.meaning,
        notes: formData.notes,
      };

      // Create checkout
      const checkoutRes = await createCheckoutForValued(submissionData).unwrap();
      console.log("Checkout Response:", checkoutRes);

      if (checkoutRes?.data?.checkoutUrl) {
        // Redirect to Stripe Checkout
        window.location.href = checkoutRes.data.checkoutUrl;
      } else {
        console.error("Checkout URL not found in response");
        navigate("/please-subscribe");
      }
    } else {
      navigate("/please-subscribe");
    }
  } catch (error) {
    console.error("Error during checkout flow:", error);
    navigate("/please-subscribe");
  }
};


  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="max-w-xl w-full p-6 bg-gray-50 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          Know Your Number Plate’s Value
        </h1>

        {/* Registration Plate Display */}
        <div className="flex justify-center my-4">
          <div className="bg-[#fad549] px-16 py-2 rounded shadow-[inset_0_-2px_2px_rgba(0,0,0,0.2)] text-center">
            <span className="text-[#1B1B1B] font-bold text-5xl tracking-wider font-mycustom">
              {formData.registration || "PL00V"}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Registration Input */}
          <div>
            <label
              htmlFor="registration"
              className="block mb-2 font-bold text-[#1B1B1B] text-lg"
            >
              Registration:
            </label>
            <input
              type="text"
              id="registration"
              name="registration"
              value={formData.registration}
              onChange={handleInputChange}
              placeholder="Enter registration number"
              className="w-full p-4 border-2 border-gray-700 rounded-md text-base bg-gray-50 focus:outline-none focus:border-blue-500 focus:bg-white focus:-translate-y-1 focus:shadow-lg transition-all duration-300"
            />
          </div>

          {/* Meaning */}
          <div>
            <label
              htmlFor="meaning"
              className="block mb-2 font-bold text-[#1B1B1B] text-lg"
            >
              What does/could it represent? (optional)
            </label>
            <textarea
              id="meaning"
              name="meaning"
              value={formData.meaning}
              onChange={handleInputChange}
              placeholder="Does it spell a word, name, initials?"
              className="w-full p-4 border-2 border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-blue-500 focus:bg-white focus:-translate-y-1 focus:shadow-lg transition-all duration-300"
            />
          </div>

          {/* Notes */}
          <div>
            <label
              htmlFor="notes"
              className="block mb-2 font-bold text-[#1B1B1B] text-lg"
            >
              Any additional notes? (optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="If there is any information that you think would be valuable for our team to know about this registration, please enter it here."
              className="w-full p-4 border-2 border-gray-300 rounded-md text-base bg-gray-50 focus:outline-none focus:border-blue-500 focus:bg-white focus:-translate-y-1 focus:shadow-lg transition-all duration-300"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-700 text-white font-semibold py-3 px-5 rounded-md shadow-md hover:bg-green-800 transition"
          >
             {isLoading ? "...Loading" : "Get my Valuation"}
          </button>
        </form>
      </div>
    </div>
  );
}
