import React, { useEffect } from "react";
import Loader from "../../../shared/Loaders/Loader";
import ErrorPage from "../../../shared/Error/ErrorPage";
import { FaCheck } from "react-icons/fa";
import { useGetAllSubscriptionQuery } from "../../../Redux/api/subscriptionApi";
import { useCreatePaymentSecureMutation } from "../../../Redux/api/PaymentApis/securePaymentApi";
import { useNavigate } from "react-router-dom";
import { useCreateCheckoutMutation } from "../../../Redux/api/PaymentApis/createCheckoutApi";

export default function PricingPlans() {
  const [createPaymentSecure, { isLoading: checkPaymentSequre }] =
    useCreatePaymentSecureMutation();
  const [createCheckout, { isLoading: checkoutLoading }] =
    useCreateCheckoutMutation();
  const navigate = useNavigate();

  const {
    data: specificSubscription,
    isLoading,
    error,
  } = useGetAllSubscriptionQuery({});

  // ✅ Correctly extract subscriptions from response
  const subscriptions = specificSubscription?.data?.all_subscription || [];

  // Save the first subscription ID (or loop if needed) to localStorage
  useEffect(() => {
    if (subscriptions.length > 0) {
      subscriptions.forEach((sub) => {
        if (sub._id) {
          localStorage.setItem("subscriptionId", sub._id);
        }
      });
    }
  }, [subscriptions]);

  const handleStartAdvert = async (subscriptionId) => {
    try {
      // 1️⃣ Call secure payment API
      const secureResponse = await createPaymentSecure().unwrap();
      console.log("Secure Payment Response:", secureResponse);

      // 2️⃣ Check if onboarding is active
      const onboardingUrl = secureResponse?.data?.onboardingUrl;
      if (
        secureResponse?.success &&
        onboardingUrl &&
        onboardingUrl.card_payments === "active" &&
        onboardingUrl.transfers === "active"
      ) {
        // ✅ Call checkout API
        const checkoutBody = {
          price: 10.99,
          subscriptionId: subscriptionId,
          description: "I am interested in this subscription",
        };

        const checkoutResponse = await createCheckout(checkoutBody).unwrap();
        console.log("Checkout Response:", checkoutResponse);

        // 3️⃣ Redirect to checkout URL if available
        const checkoutUrl = checkoutResponse?.data?.checkoutUrl;
        if (checkoutUrl) {
          window.location.href = checkoutUrl;
        } else {
          console.error("Checkout URL not found");
        }
      } else {
        // If onboarding not active, navigate to secure payments page
        navigate("/userdashboard/secure-payments");
      }
    } catch (error) {
      console.error("Error in payment flow:", error);
      navigate("/userdashboard/secure-payments");
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <ErrorPage message={error?.message} />;

  return (
    <div className="bg-white px-5 md:px-0 py-5 md:py-16">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Pricing Plans
          </h1>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            No Commission, Huge Exposure, Deal Directly With Buyers.
          </p>
        </div>

        {/* Pricing Cards */}
        {subscriptions.map((subscription) => (
          <div key={subscription._id} className="flex justify-center mb-5">
            <div className="w-full max-w-[32rem] border-2 border-[#00823A] rounded">
              <div className="text-center mb-8 bg-green-50 p-5">
                <h2 className="text-[#00823A] font-semibold text-base py-5">
                  {subscription.subscriptionName}
                </h2>
                <div className="mb-5 flex items-center justify-center">
                  <span className="text-5xl font-semibold text-[#00823A]">
                    £ {subscription.price} /
                  </span>
                  <span className="text-[#00823A] ml-2 text-2xl font-bold">Months</span>
                </div>
                <div className="text-center pb-10">
                  <p className="text-[#00823A] font-medium">
                    {subscription.description}
                  </p>
                </div>
              </div>

              <div className="space-y-2 px-6 py-5">
                {subscription.featuresList?.map((feature) => (
                  <div key={feature._id} className="flex items-center gap-1">
                    <FaCheck className="size-4 text-[#00823A] flex-shrink-0" />
                    <span className="text-gray-700">{feature.value}</span>
                  </div>
                ))}

                <div className="mt-12">
                  <button
                    onClick={() => handleStartAdvert(subscription._id)}
                    disabled={checkPaymentSequre || checkoutLoading} // disable while loading
                    className={`w-full bg-[#00823A] text-white font-semibold py-3 px-5 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl cursor-pointer ${
                      checkPaymentSequre || checkoutLoading
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {checkPaymentSequre || checkoutLoading ? (
                      <span>Processing...</span>
                    ) : (
                      "Start Your Advert"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
