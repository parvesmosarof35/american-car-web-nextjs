import React from "react";
import BuyAPlateHero from "./BuyAPlateHero";
import CustomBanner from "../custom-banner";
import BuyHowItWorks from "./BuyHowItWorks";
import Review from "@/components/pages/Home/Review/Review";
import NewlyListedPlates from "@/components/pages/Home/NewlyListedPlates/NewlyListedPlates";
import PricingPlans from "@/components/pages/Home/PricingPlans/PricingPlans";
import HelpfulGuides from "@/components/pages/Home/HelpfulGuides/HelpfulGuides";
import FAQSection from "@/components/pages/Home/FAQSection/FAQSection";

export default function BuyAPlate() {
    return (
        <div className="bg-[#f6f6f6] px-5 sm:px-6 lg:px-0 py-16">
            <BuyAPlateHero />
            <CustomBanner title="Buy premium UK number plates with confidence" />
            <BuyHowItWorks />
            <Review />
            <NewlyListedPlates />

            <PricingPlans />
            <HelpfulGuides />
            <FAQSection searchTerm={"buying"} />
        </div>
    );
}