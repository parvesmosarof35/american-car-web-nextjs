import React from "react";
export default function CustomBanner({
    title = "Why pay more? Save up to 30% with direct plate deals.",
    backgroundColor = "bg-[#00823A]",
    textColor = "text-white",
    className = "",
}) {
    return (
        <div className={`${backgroundColor} ${textColor} py-5 w-full font-sans relative overflow-hidden ${className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center">
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <h2 className="text-[24px] font-[600] tracking-tight">
                            {title}
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
}
