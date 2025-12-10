import React from "react";
import { useRouter } from "next/navigation";

interface PlateCardProps {
  plateNumber: string;
  currentPrice: number | string;
  plateId: string;
  originalPrice?: number | string;
}

export default function PlateCard({
  plateNumber,
  currentPrice,
  plateId,
  originalPrice,
}: PlateCardProps) {
  const router = useRouter();
  return (
    <div className="p-4 bg-white rounded-lg shadow-[2px_2px_8px_rgba(0,0,0,0.20)] hover:shadow-[6px_6px_14px_rgba(0,0,0,0.2)] transition-shadow duration-200 w-full">
      <div className="flex md:flex-row items-center justify-between gap-4 w-full">
        {/* License Plate */}
        <div
          className="px-2 sm:px-3 md:px-4 lg:px-5 xl:px-6 py-1 sm:py-1.5 md:py-2 lg:py-2.5 xl:py-1 rounded-md shadow-[inset_0_-2px_2px_rgba(0,0,0,0.2)] flex items-center justify-center flex-shrink-0 w-[150px] h-[56px] sm:w-auto sm:h-auto sm:min-w-[140px] md:min-w-[160px] lg:min-w-[180px] xl:min-w-[200px]"
          style={{
            background:
              "linear-gradient(180deg, #FAD95C 0%, #F9CD27 90.41%, #F9CD27 93.8%, #F9CD26 93.9%, #C09E1D 100%)",
          }}
        >
          <span className="text-black font-mycustom whitespace-nowrap overflow-hidden text-ellipsis text-[35px] leading-[1] tracking-[0] font-medium sm:text-[44.21px] sm:font-medium block text-center">
            {plateNumber}
          </span>
        </div>

        {/* Pricing and Action */}
        <div className="flex sm:flex-row items-center gap-3 flex-shrink-0">
          <div className="text-center">
            <span className="text-[#00823A] font-semibold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl whitespace-nowrap ">
              £{currentPrice}
            </span>
          </div>
          <button
            onClick={() => router.push(`/plate-details/${plateId}`)}
            className="bg-[#00823B] hover:bg-green-700 text-white px-3 sm:px-3 md:px-4 lg:px-5 xl:px-6 py-2 sm:py-1.5 md:py-2 lg:py-1 xl:py-2 rounded-md text-sm sm:text-sm md:text-base lg:text-lg font-bold sm:font-semibold cursor-pointer transition-colors whitespace-nowrap"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
}
