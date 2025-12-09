import React from "react";
import HowItWorksCard from "../../shared/HowItWorks/HowItWorksCard";
export default function BuyHowItWorks() {
    const steps = [
        {
            title: "Find Your Perfect Plate",
            description: "Browse thousands of private number plates listed directly by owners. No middlemen, no inflated prices — just the plate you want, at the price it deserves.",
            buttonText: "Start your search",
        },
        {
            title: "Contact the Seller Directly",
            description: "Send enquiries straight to the seller — no dealers involved. Negotiate, ask questions, and make offers with full transparency.",
            buttonText: "Enquire now",
        },
        {
            title: "Buy Privately and Save",
            description: "Skip the dealer markups. Pay only the seller’s asking price and complete your purchase directly — simple, secure, and commission-free.",
            buttonText: "Buy a plate",
        }
    ];
    return (
        <section className="bg-[#f6f6f6] py-16 font-manrope">
            <div className="container mx-auto px-4 sm:px-0 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-10">
                    <h2 className="text-xl md:text-7xl font-[500] text-[#1B1B1B] mb-5">
                        How It Works
                    </h2>
                </div>

                {/* Steps Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {steps.map((step, index) => (
                        <HowItWorksCard
                            key={index}
                            title={step.title}
                            description={step.description}
                            buttonText={step.buttonText}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
