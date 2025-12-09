import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import FAQSection from "../Home/FAQSection/FAQSection";

export default function FaqPage() {
  const [searchTerm, setActiveTab] = useState("valuation");


  return (
    <div className="container mx-auto px-5 md:px-0 py-10 md:py-16">
      {/* Header */}
      <div className="text-center my-12">
        <h1 className="text-3xl md:text-6xl font-medium text-gray-900 mb-6">
          Frequently Asked Questions
        </h1>
        <div className="max-w-7xl mx-auto">
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Your essential guide to buying, selling, and valuing number plates.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {[
          { key: "valuation", label: "Valuation Questions" },
          { key: "buying", label: "Buying Questions" },
          { key: "selling", label: "Selling Questions" },
          { key: "general", label: "General Questions" }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setActiveTab(tab.key);
            }}
            className={`px-6 py-3 rounded-full font-semibold transition cursor-pointer ${
              searchTerm === tab.key
                ? "bg-[#00823A] text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>


      <FAQSection searchTerm={searchTerm} headingShow={false}></FAQSection>
    </div>
  );
}
