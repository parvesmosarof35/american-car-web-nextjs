import React from "react";
import Hero from "../Home/Hero/Hero";
import FAQSection from "./FAQSection/FAQSection";
import PricingPlans from "./PricingPlans/PricingPlans";
import NewlyListedPlates from "./NewlyListedPlates/NewlyListedPlates";
import Review from "./Review/Review";
import HowItWorks from "./HowItWorks/HowItWorks";
import HelpfulGuides from "./HelpfulGuides/HelpfulGuides";
import CustomBanner from "../../shared/CustomBanner/CustomBanner";

function App() {
  return (
    <>
      <div className="container mx-auto">
        <Hero />
      </div>
      <CustomBanner title="Why pay more? Save up to 30% with direct plate deals." />
      <HowItWorks />
      <Review />
      <div className="container mx-auto">
        <NewlyListedPlates />
      </div>
      <PricingPlans />
      <div className="container mx-auto">
        <HelpfulGuides />
        <FAQSection searchTerm={"general"} />
      </div>
    </>
  );
}

export default App;
