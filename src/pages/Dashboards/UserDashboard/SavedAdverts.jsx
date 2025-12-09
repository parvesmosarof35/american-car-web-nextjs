import React, { useState } from "react";
import { MessageCircle, Heart, Trash2 } from "lucide-react";
import { useGetMySavedPlatesQuery, useRemoveFromSavedPlatesMutation } from "../../../Redux/api/PlatesApis/mySavedAdversApi";
import { useNavigate } from "react-router-dom";

export default function SavedAdverts() {
  const { data, isLoading, error } = useGetMySavedPlatesQuery();
  const [removeFromSavedPlates, { isLoading: removing }] = useRemoveFromSavedPlatesMutation();
  const [removingId, setRemovingId] = useState(null);
  const navigate = useNavigate();

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error loading adverts</p>;

  // Extract adverts list from API response
  const savedAdverts = data?.data?.all_save_plates || [];

  const handleContact = (advertId) => {
    console.log("Chat clicked, ID:", advertId);
    navigate(`/plate-details/${advertId}`);
  };

  const toggleFavorite = async (advertId) => {
    console.log("Favorite clicked, ID:", advertId);
    try {
      setRemovingId(advertId);
      await removeFromSavedPlates(advertId).unwrap();
    } catch {
      // optionally, show a toast
      // console.error(e);
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-center font-semibold text-gray-900 mb-6 text-4xl">
            Saved Adverts
          </h1>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Table Header (Hidden on Mobile) */}
          <div className="hidden sm:grid grid-cols-5 gap-4 p-4 bg-gray-50 border-b border-gray-200">
            <div className="text-sm font-medium text-gray-700">Number Plate</div>
            <div className="text-sm font-medium text-gray-700">Price</div>
            <div className="text-sm font-medium text-gray-700">Status</div>
            <div className="text-sm font-medium text-gray-700">Contact Seller</div>
            <div className="text-sm font-medium text-gray-700"></div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-gray-200">
            {savedAdverts.map((advert) => (
              <div
                key={advert._id}
                className="flex flex-col sm:grid sm:grid-cols-5 gap-4 p-4 items-center hover:bg-gray-50 transition-colors"
              >
                {/* Number Plate */}
                <div className="bg-[#fad549] px-4 py-2 rounded shadow-[inset_0_-2px_2px_rgba(0,0,0,0.2)] w-fit">
                  <span className="text-black font-bold text-lg tracking-wider font-mycustom">
                    {advert.platesalesId?.registrationId}
                  </span>
                </div>

                {/* Price */}
                <div className="text-gray-900 font-medium">
                  ${advert.platesalesId?.askingPrice}
                </div>

                {/* Status */}
                <div
                  className={`text-sm font-medium ${
                    advert.platesalesId?.status === "Available"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {advert.platesalesId?.status}
                </div>

                {/* Contact Seller */}
                <div className="w-full sm:w-auto">
                  <button
                    onClick={() => handleContact(advert._id)}
                    className="flex items-center justify-center gap-2 cursor-pointer px-4 py-2 border border-blue-300 rounded-full text-blue-600 hover:bg-blue-50 transition-colors text-sm w-full sm:w-auto"
                    disabled={advert.platesalesId?.status === "Sold"}
                  >
                    <MessageCircle className="w-4 h-4" />
                    {advert.platesalesId?.status === "Sold" ? "Sold" : "Chat"}
                  </button>
                </div>

                {/* Remove Saved */}
                <div className="flex justify-center w-full sm:w-auto">
                  <button
                    onClick={() => toggleFavorite(advert._id)}
                    disabled={removing && removingId === advert._id}
                    className="px-3 py-2 hover:bg-red-100 border border-gray-100 rounded-full transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {removing && removingId === advert._id ? (
                      <>
                        <span className="block w-4 h-4 border-2 border-gray-300 border-t-red-500 rounded-full animate-spin" />
                        <span className="text-sm text-gray-700">Removing...</span>
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-5 h-5 text-red-500" />
                        <span className="text-sm text-red-600">Remove</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {savedAdverts.length === 0 && (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No saved adverts
            </h3>
            <p className="text-gray-500">
              Start browsing plates to save your favorites here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
