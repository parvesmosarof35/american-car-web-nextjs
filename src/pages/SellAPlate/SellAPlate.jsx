import React from 'react'
import NewlyListedPlates from '../Home/NewlyListedPlates/NewlyListedPlates'
import PricingPlans from '../Home/PricingPlans/PricingPlans'
import HelpfulGuides from '../Home/HelpfulGuides/HelpfulGuides'
import FAQSection from '../Home/FAQSection/FAQSection'
import Review from '../Home/Review/Review'
import SellAPlateHero from './SellAPlateHero'
import SellsHowItWorks from './SellsHowItWorks'
import CustomBanner from '../../shared/CustomBanner/CustomBanner'
export default function SellAPlate() {
  return (
    <div className="bg-[#f6f6f6] px-5 sm:px-6 lg:px-0 py-16">
      <SellAPlateHero />
      <CustomBanner title="Your trusted partner for premium UK number plates" />
      <SellsHowItWorks />
      <Review />
      <NewlyListedPlates />
      <PricingPlans />
      <HelpfulGuides />
      <FAQSection searchTerm={"selling"} />
    </div>
  )
}
