import React from "react";
import { useMySubscriptionListQuery } from "../../../Redux/api/Issubscribed/mySubscriptionsApis";
import { FaCheck } from "react-icons/fa";

export default function MySubscriptions() {
  const { data, isLoading, error } = useMySubscriptionListQuery();

  if (isLoading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error.message}</div>;

  const subscriptions = data?.data?.all_subscribed_memeber || [];

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-5">
        <h1 className="text-4xl font-bold text-center mb-10">My Subscriptions</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subscriptions.map((sub) => {
            const { subscriptionId, isAvailable } = sub;
            return (
              <div
                key={sub._id}
                className={`border rounded-2xl p-6 shadow-md transition-transform hover:scale-105 ${
                  isAvailable ? "border-green-500" : "border-gray-300"
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">{subscriptionId.subscriptionName}</h2>
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-semibold ${
                      isAvailable ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {isAvailable ? "Active" : "Inactive"}
                  </span>
                </div>

                <p className="text-gray-600 mb-4">{subscriptionId.description}</p>

                <ul className="mb-4">
                  {subscriptionId.featuresList.map((feature) => (
                    <li key={feature._id} className="flex items-center gap-2 text-gray-700 mb-2">
                      <FaCheck className="text-green-500" /> {feature.value}
                    </li>
                  ))}
                </ul>

                <p className="font-bold text-lg">${subscriptionId.price}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
