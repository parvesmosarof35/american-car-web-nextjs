import React from 'react';
import HowItWorksCard from '../../shared/HowItWorks/HowItWorksCard';
export default function SellsHowItWorks() {
    const steps = [
        {
            title: "Create Your Advert",
            description: "Your ad will include a built-in contact form, so interested buyers can reach out to you directly.",
            buttonText: "Start your search",
        },
        {
            title: "Get Direct Enquiries",
            description: "Unlike traditional dealers, you’ll receive offers along with full contact details of potential buyers—no filters, no gatekeepers.",
            buttonText: "Enquire now",
        },
        {
            title: "Sell Privately, Keep Everything",
            description: "You handle the sale on your terms and keep 100% of the sale price. No middlemen. No commission. Just pure profit.",
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
