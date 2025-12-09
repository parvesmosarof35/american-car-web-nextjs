import React from "react";
import FAQSection from "../Home/FAQSection/FAQSection";
import HelpfulGuides from "../Home/HelpfulGuides/HelpfulGuides";

import PricingPlans from "../Home/PricingPlans/PricingPlans";
import Review from "../Home/Review/Review";
import CustomBanner from "../../shared/CustomBanner/CustomBanner";
import BuyAPlateHero from "./BuyAPlateHero";
import BuyHowItWorks from "./BuyHowItWorks";
import NewlyListedPlates from "../Home/NewlyListedPlates/NewlyListedPlates";
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
