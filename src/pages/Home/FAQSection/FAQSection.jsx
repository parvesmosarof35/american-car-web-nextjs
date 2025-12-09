import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useGetAllFaqQuery } from "../../../Redux/api/faqApi";

export default function FAQSection({ headingShow = true, searchTerm }) {
  const { data, isLoading } = useGetAllFaqQuery({ searchTerm });
  const [openItems, setOpenItems] = useState([0]);

  const toggleItem = (index) => {
    setOpenItems((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  const faqs = data?.data?.allFaqList || [];

  return (
    <div className="bg-[#5587A7] px-5 md:px-10 py-5 md:py-16 rounded-lg mb-10 container mx-auto">
      <div>
        {/* Header */}
        <div className="text-center mb-12">
          {headingShow && (
            <>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                Frequently Asked Questions
              </h1>
            </>
          )}
          <div className="w-full h-px bg-white/30 mt-8"></div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-1">
          {isLoading ? (
            <p className="text-center text-white">Loading FAQs...</p>
          ) : faqs.length === 0 ? (
            <p className="text-center text-white">No FAQs found.</p>
          ) : (
            faqs.map((faq, index) => (
              <div key={faq._id} className="border-b border-white/20 ">
                {/* Question */}
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full flex items-center justify-between py-6 text-left hover:bg-white/5 transition-colors duration-200 px-2"
                >
                  <span className="text-white text-lg md:text-xl font-medium pr-4">
                    {`${index + 1}. ${faq.question}`}
                  </span>
                  <div className="flex-shrink-0">
                    {openItems.includes(index) ? (
                      <Minus className="w-6 h-6 text-white" />
                    ) : (
                      <Plus className="w-6 h-6 text-white" />
                    )}
                  </div>
                </button>

                {/* Answer */}
                {openItems.includes(index) && (
                  <div className="pb-6 px-2">
                    <div className="text-white/90 text-base md:text-lg leading-relaxed pl-4">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
