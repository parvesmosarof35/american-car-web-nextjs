import React from "react";
import { useGetAllMySelledPlatesQuery } from "../../../Redux/api/PaymentApis/myBuyedSelledApi";
import { getImageUrl } from "../../../config/envConfig";

export default function MySelledPlates() {
  const { data, isLoading, isError } = useGetAllMySelledPlatesQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        {/* flex দিয়ে wrapper বানানো হলো */}
        {/* justify-center → horizontal center */}
        {/* items-center → vertical center */}
        <div className="w-6 h-6 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-40 text-red-500">
        Failed to load data
      </div>
    );
  }

  const payments = data?.data?.all_payments || [];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-6">My sold plates</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {payments.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center text-center"
          >
            {item.platesalesId?.photo ? (
              <img
                src={getImageUrl(item?.platesalesId?.photo)}
                alt="plate"
                className="w-40 h-28 object-cover rounded-lg mb-3"
              />
            ) : (
              <div className="w-40 h-28 bg-gray-200 flex items-center justify-center rounded-lg mb-3">
                No Image
              </div>
            )}

            <h3 className="text-lg font-semibold">
              {item.platesalesId?.registrationId || "Unknown Plate"}
            </h3>
            <p className="text-sm text-gray-600">
              Price: ${item.platesalesId?.askingPrice || "N/A"}
            </p>
            <p className="text-sm text-gray-500">
              Buyer: {item.buyerId?.fastname} {item.buyerId?.lastname}
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Status: {item.platesalesId?.status || "Pending"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
