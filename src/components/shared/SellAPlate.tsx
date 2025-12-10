import React from 'react'
import CustomBanner from './custom-banner'
import Review from '../pages/Home/Review/Review'
import NewlyListedPlates from '../pages/Home/NewlyListedPlates/NewlyListedPlates'
import PricingPlans from '../pages/Home/PricingPlans/PricingPlans'
import HelpfulGuides from '../pages/Home/HelpfulGuides/HelpfulGuides'
import FAQSection from '../pages/Home/FAQSection/FAQSection'
import HowItWorks from '../pages/Home/HowItWorks/HowItWorks'
import SellAPlateHero from './SellAPlateHero'

export default function SellAPlate() {
  return (
    <div className="bg-[#f6f6f6] px-5 sm:px-6 lg:px-0 py-16">
      <SellAPlateHero />
      <CustomBanner title="Your trusted partner for premium UK number plates" />
      <HowItWorks />
      <Review />
      <NewlyListedPlates />
      <PricingPlans />
      <HelpfulGuides />
      <FAQSection searchTerm={"selling"} />
    </div>
  )
}
