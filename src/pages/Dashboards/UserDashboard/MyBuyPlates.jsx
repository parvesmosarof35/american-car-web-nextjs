import React from "react";
import { useGetAllMyBuyPlatesQuery } from "../../../Redux/api/PaymentApis/myBuyedSelledApi";
import { getImageUrl } from "../../../config/envConfig";

export default function MyBuyPlates() {
  const { data, isLoading, isError } = useGetAllMyBuyPlatesQuery();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg font-semibold">
          Something went wrong!
        </p>
      </div>
    );

  const plates = data?.data?.all_payments || [];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-5">
      <h2 className="text-2xl font-bold mb-6 text-center">
        My Purchased Plates
      </h2>

      {plates.length === 0 ? (
        <p className="text-gray-500">No plates purchased yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6 w-full max-w-5xl">
          {plates.map((payment) => {
            const seller = payment.sellerId;
            const plate = payment.platesalesId;

            return (
              <div
                key={payment._id}
                className="border rounded-lg shadow p-4 flex flex-col gap-4 hover:shadow-lg transition"
              >
                {/* Plate Image */}
                {plate?.photo && (
                  <img
                    src={getImageUrl(plate?.photo)}
                    alt={plate.registrationId}
                    className="w-full h-40 object-cover rounded"
                  />
                )}

                {/* Plate Info */}
                <div>
                  <h3 className="text-xl font-semibold">
                    {plate?.registrationId || "N/A"}
                  </h3>
                  <p className="text-gray-600">{plate?.description}</p>
                  <p className="text-green-600 font-bold">
                    Price: ${plate?.askingPrice}
                  </p>
                  <span
                    className={`px-3 py-1 rounded text-white text-sm ${
                      plate?.status === "Sold" ? "bg-red-500" : "bg-green-500"
                    }`}
                  >
                    {plate?.status || "N/A"}
                  </span>
                </div>

                {/* Seller Info */}
                {seller && (
                  <div className="flex items-center gap-3 mt-4 border-t pt-3">
                    {seller?.photo && (
                      <img
                        src={getImageUrl(seller.photo)}
                        alt={seller.fastname}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <p className="font-medium">
                        {seller?.fastname} {seller?.lastname}
                      </p>
                      <p className="text-sm text-gray-500">{seller?.email}</p>
                      <p className="text-sm text-gray-500">
                        {seller?.phoneNumber}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
