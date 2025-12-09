import React from "react";
import { useNavigate } from "react-router-dom";
import PlateCard from "./PlateCard";
import FireRingButton from "../../../shared/Buttons/FireRingButton";

import Loader from "../../../shared/Loaders/Loader";
import ErrorPage from "../../../shared/Error/ErrorPage";
import { useGetAllplatesSalesQuery } from "../../../Redux/api/platesSalesApi";

export default function NewlyListedPlates() {
  const navigate = useNavigate();

  const { data, isLoading, error, isSuccess } = useGetAllplatesSalesQuery({
    page: 1,
    limit: 12,
  });

  if (isLoading) return <Loader />;
  if (error) return <ErrorPage message={error?.message} />;

  const plates =
    (!isLoading && isSuccess && data?.success && data?.data?.all_plates) || [];


  return (
    <div className="px-4 py-12 bg-[#f6f6f6]">
      <div className="container mx-auto">
        {/* Local animations for shimmer and stars */}
        <style>{`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          @keyframes star-pop {
            0% { transform: translateY(6px) scale(0.4); opacity: 0; }
            40% { opacity: 1; }
            100% { transform: translateY(-6px) scale(1); opacity: 0; }
          }
          .shine::after {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%);
            transform: translateX(-100%);
            animation: shimmer 1.6s infinite;
            opacity: 0;
          }
          .shine:hover::after { opacity: 1; }
          .star {
            position: absolute;
            width: 6px; height: 6px;
            background: radial-gradient(circle, #fff 0%, rgba(255,255,255,0.6) 60%, transparent 70%);
            border-radius: 9999px;
            opacity: 0;
            pointer-events: none;
          }
          .star-1 { left: 18%; top: 10%; animation: star-pop 1.2s ease-in-out infinite; animation-delay: 0.1s; }
          .star-2 { left: 38%; top: 0%; animation: star-pop 1.3s ease-in-out infinite; animation-delay: 0.25s; }
          .star-3 { right: 22%; top: 12%; animation: star-pop 1.1s ease-in-out infinite; animation-delay: 0.4s; }
          .star-4 { right: 8%; top: -4%; animation: star-pop 1.4s ease-in-out infinite; animation-delay: 0.55s; }
        `}</style>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Newly Listed Plates
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover the latest number plates added to the marketplace.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mb-12">
          {plates?.map((plate) => (
            <PlateCard
              key={plate._id}
              plateId={plate._id}
              plateNumber={plate.registrationId}
              originalPrice={plate.askingPrice}
              currentPrice={plate.askingPrice}
            />
          ))}
        </div>

        <div className="w-full flex justify-center">
          <FireRingButton
            text="View all newly listed plates"
            color="green"
            onClick={() => navigate('/newly-listed-plates')}
          />
        </div>

        
      </div>
    </div>
  );
}
