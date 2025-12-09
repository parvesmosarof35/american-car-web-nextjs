import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/Home/Home";
import PlateView from "../pages/PlateView/PlateView";
import SellAPlate from "../pages/SellAPlate/SellAPlate";
import BuyAPlate from "../pages/BuyAPlate/BuyAPlate";
import ContactUs from "../pages/ContactUs/ContactUs";
import AboutUs from "../pages/AboutUs/AboutUs";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";
import TermsConditions from "../pages/TermsConditions/TermsConditions";
import PlateDetails from "../pages/PlateDetails/PlateDetails";
import RecentlySold from "../pages/RecentlySold/RecentlySold";
import AllPlates from "../pages/RecentlySold/AllPlates";
import GuideAndBlog from "../pages/Guide&Blog/GuideAndBlog";
import FaqPage from "../pages/Faq/FaqPage";
import Reviewsandtestimonials from "../pages/Reviewsandtestimonials/Reviewsandtestimonials";
import BlogDetails from "../pages/Guide&Blog/BlogDetails";
import PrivateRoute from "./PrivateRoute";
import Login from "../pages/Auth/Login";
import ResetPassword from "../pages/Auth/ResetPassword";
import SignUp from "../pages/Auth/SignUp";
import UserDashboardLayout from "../layout/UserDashboardLayout";
import ListPlateForSale from "../pages/Dashboards/UserDashboard/ListPlateForSale";
import MyProfile from "../pages/Dashboards/UserDashboard/MyProfile";
import AccountSecurity from "../pages/Dashboards/UserDashboard/AccountSecurity";
import CommunicationPreferences from "../pages/Dashboards/UserDashboard/CommunicationPreferences";
import MyAdverts from "../pages/Dashboards/UserDashboard/MyAdverts";
import SavedAdverts from "../pages/Dashboards/UserDashboard/SavedAdverts";
import SecurePayments from "../pages/Dashboards/UserDashboard/SecurePayments";
import Chat from "../pages/Chat/Chat";
import VerificationCode from "../pages/Auth/Otp";
import PaymentSuccessful from "../pages/Payment/PaymentSuccessful";
import TransactionSuccess from "../pages/Payment/TransactionSuccess";
import PricingPlans from "../pages/Home/PricingPlans/PricingPlans";
import IsPremiumRoute from "./IsPrimiumRoute";
import MySubscriptions from "../pages/Dashboards/UserDashboard/MySubscriptions";
import GetPlateValued from "../pages/Dashboards/UserDashboard/GetPlateValued";
import MyBuyPlates from "../pages/Dashboards/UserDashboard/MyBuyPlates";
import MySelledPlates from "../pages/Dashboards/UserDashboard/MySelledPlates";
import AllChating from "../pages/Chat/AllChating";
import MessageDetails from "../pages/Dashboards/UserDashboard/messageDetails";
import UserVerification from "../pages/Auth/UserVerification";
import ForgetPassword from "../pages/Auth/ForgetPassword";
import NewlyListedPlatesPage from "../pages/NewlyListedPlates/NewlyListedPlatesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/sell-a-plate",
        element: (
            <SellAPlate />
        ),
      },
      {
        path: "plate-view",
        element: <PlateView />,
      },
      {
        path: "/buy-a-plate",
        element: <BuyAPlate />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms-conditions",
        element: <TermsConditions />,
      },

      {
        path: "plate-details/:id",
        element: <PlateDetails />,
      },
      {
        path: "recently-sold",
        element: <RecentlySold />,
      },
      {
        path: "all-plates",
        element: <AllPlates />,
      },
      {
        path: "newly-listed-plates",
        element: <NewlyListedPlatesPage />,
      },
      {
        path: "guide-and-blog",
        element: <GuideAndBlog />,
      },
      {
        path: "blog/details/:id",
        element: <BlogDetails />,
      },
      {
        path: "faq",
        element: <FaqPage />,
      },
      {
        path: "Reviewsandtestimonials",
        element: <Reviewsandtestimonials />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forget-password",
        element: <ForgetPassword />,
      }, 
      {
        path: "/otp",
        element: <VerificationCode />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/user-verification",
        element: <UserVerification></UserVerification>,
      },
      {
        path: "please-subscribe",
        element: (
          <PrivateRoute>
            <PricingPlans />
          </PrivateRoute>
        ),
      },
      {
        // stripe connect successful onboarding
        path: "/stripe/onboarding/return",
        element: <PaymentSuccessful />,
      },
      // stripe connect failed onboarding
      {
        path: "/stripe/onboarding/failed",
        element: <div>Stripe Onboarding Failed. Please try again.</div>,
      },
      // payment success
      {
        path: `/success`,
        element: <TransactionSuccess />,
      },
    ],
  },
  {
    path: "/userdashboard",
    element: (
      <PrivateRoute>
        <UserDashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/userdashboard",
        element: <MyProfile />,
      },
      {
        path: "list-plate",
        element: (
          <IsPremiumRoute>
            <ListPlateForSale />
          </IsPremiumRoute>
        ),
      },
      {
        path: "get-plate-valued",
        element: <GetPlateValued />,
      },
      {
        path: "profile",
        element: <MyProfile />,
      },
      {
        path: "account-security",
        element: <AccountSecurity />,
      },
      {
        path: "communications",
        element: <CommunicationPreferences />,
      },
      {
        path: "my-adverts",
        element: <MyAdverts />,
      },
      {
        path: "my-subscriptions",
        element: <MySubscriptions />,
      },
      {
        path: "my-buyed-plates",
        element: <MyBuyPlates />,
      },
      {
        path: "my-selled-plates",
        element: <MySelledPlates />,
      },
      {
        path: "saved-adverts",
        element: <SavedAdverts />,
      },
      {
        path: "message-center",
        element: <AllChating />,
      },
      {
        path: "message-center/:id",
        element: <Chat />,
      },
      {
        path: "message-centre/details/:id",
        element: <MessageDetails />,
      },
      {
        path: "secure-payments",
        element: <SecurePayments />,
      },
    ],
  },
]);
export default router;
