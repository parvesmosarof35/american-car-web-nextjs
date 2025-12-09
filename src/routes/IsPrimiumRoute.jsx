import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Loader from "../shared/Loaders/Loader";
import { useIssubscribedMutation } from "../Redux/api/Issubscribed/IssubscribedApi";


const IsPremiumRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const [checkSubscribed] = useIssubscribedMutation();

  useEffect(() => {
    const subscriptionId = localStorage.getItem("subscriptionId");

    if (!subscriptionId) {
      setIsAuthorized(false);
      setIsLoading(false);
      return;
    }

    // Call API to check if subscription is active
    const verifySubscription = async () => {
      try {
        const response = await checkSubscribed({ id: subscriptionId }).unwrap();

        console.log("Subscription check response:", response);
        // Check if subscription is available
        if (response?.data?.isAvailable) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error("Subscription check failed:", error);
        setIsAuthorized(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifySubscription();
  }, [checkSubscribed]);

  if (isLoading) {
    return <Loader />;
  }

  return isAuthorized ? children : <Navigate to="/please-subscribe" />;
};

export default IsPremiumRoute;
