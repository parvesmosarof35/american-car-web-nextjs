"use client";
import HowItWorksCard from "@/components/shared/how-it-works-card";
import { useRouter } from "next/navigation";
import React from "react";

export default function HowItWorks() {
  const navigate = useRouter();
  const steps = [
    {
      title: "Number plate search",
      description:
        "Quickly find the perfect private plate with our streamlined search tool. Whether you're buying for yourself or a loved one, PlateExchange helps you connect directly with sellers — no hassle, no inflated prices.",
      buttonText: "Start your search",
    },
    {
      title: "Make an Enquiry",
      description:
        "Found a plate you like? Send an enquiry directly to the seller. At PlateExchange, there are no middlemen, you're in full control, dealing directly with the person who owns the plate.",
      buttonText: "Enquire now",
    },
    {
      title: "Buy Privately",
      description:
        "Once you agree on a deal, purchase the plate directly from the seller. No hidden charges, no interference — just a clean, private transaction between buyer and seller.",
      buttonText: "Buy a plate",
    },
    {
      title: "Flat Fee — Just £10",
      description:
        "Unlike other platforms charging up to 30% commission, we only charge a flat £10 listing fee — that's it. No commission, no surprises.",
      buttonText: "List your plate",
    },
    {
      title: "Choose from Thousands of Plates",
      description:
        "Discover and trade unique license plates with zero commissions. At PlateExchange, sellers keep 100% of their earnings—no fees, no cuts. A fair, transparent marketplace for collectors and sellers alike.",
      buttonText: "Learn more",
    },
    {
      title: "Deal Direct — No Middlemen",
      description:
        "Say goodbye to brokers. With PlateExchange, buyers and sellers communicate and negotiate directly — for a faster, simpler experience.",
      buttonText: "Get started",
    },
  ];

  const handleClick = (buttonText: any) => {
    // Map each button to its route per requirement
    switch (buttonText) {
      case "Start your search":
      case "Enquire now":
        // Navigate to home; if a search section anchor exists, we can use '/#search'
        navigate.push("/");
        break;
      case "Buy a plate":
        navigate.push("/buy-a-plate");
        break;
      case "List your plate":
        navigate.push("/sell-a-plate");
        break;
      case "Learn more":
        navigate.push("/faq");
        break;
      case "Get started":
        navigate.push("/all-plates");
        break;
      default:
        navigate.push("/");
    }
  };

  return (
    <main className="container mx-auto px-5 md:px-0 py-5 md:py-16">
      {/* Section Header */}
      <div className="text-center mb-10">
        <h2 className="text-5xl md:text-7xl font-semibold text-[#1B1B1B] mb-5">
          How It Works
        </h2>
      </div>

      {/* Steps Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-10">
        {steps.map((step, index) => (
          <HowItWorksCard
            key={index}
            title={step.title}
            description={step.description}
            buttonText={step.buttonText}
            onClick={() => handleClick(step.buttonText)}
          />
        ))}
      </div>
    </main>
  );
}
