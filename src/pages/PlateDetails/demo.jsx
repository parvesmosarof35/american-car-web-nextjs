import React from "react";
import { Heart, Share2, Facebook, Twitter, MessageCircle } from "lucide-react";
import { FiMessageSquare } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSimilarPlatesQuery,
  useGetSinglePlateQuery,
} from "../../Redux/api/PlatesApis/singlePlateApi";
import { getImageUrl } from "../../config/envConfig";
import {
  useAddToSavedPlatesMutation,
  useGetMySavedPlatesQuery,
  useRemoveFromSavedPlatesMutation,
} from "../../Redux/api/PlatesApis/mySavedAdversApi";
import { useCreateBuyerSellerCheckoutSessionMutation } from "../../Redux/api/PaymentApis/buyAPlate";
import { useIssubscribedMutation } from "../../Redux/api/Issubscribed/IssubscribedApi";
import ShareButtons from "./ShareButtons";

export default function PlateDetails() {
  const [checkSubscribed] = useIssubscribedMutation();
  const { data: savedPlates, isLoading: loadingSaved } =
    useGetMySavedPlatesQuery();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, error, isLoading } = useGetSinglePlateQuery(id);
  
  const [addToSavedPlates, { isLoading: addingFavorite }] = useAddToSavedPlatesMutation();
  const [removeFromSavedPlates, { isLoading: removingFavorite }] = useRemoveFromSavedPlatesMutation();
  const { data: similarplatesData } = useGetSimilarPlatesQuery(id);
  const [createCheckout, { isLoading: checkoutLoading }] =
    useCreateBuyerSellerCheckoutSessionMutation();
    

  console.log(checkoutLoading);

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (error)
    return (
      <p className="text-center py-10 text-red-500">
        Failed to load plate details
      </p>
    );

  const toggleFavorite = async (advertId) => {
    console.log("Favorite clicked, ID:", advertId);
    try {
      if (isSaved && savedEntryId) {
        // API expects saved advert _id, not the plate id
        await removeFromSavedPlates(savedEntryId).unwrap();
      } else {
        await addToSavedPlates(advertId).unwrap();
      }
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
    }
  };

  const plate = data?.data;

  // Find the saved entry for this plate (needed to remove by saved advert ID)
  const savedEntry = savedPlates?.data?.all_save_plates?.find(
    (item) => item.platesalesId?._id === plate?._id
  );
  const savedEntryId = savedEntry?._id;
  const isSaved = Boolean(savedEntryId);

  // Use dynamic similar plates from API
  const similarPlates =
    similarplatesData?.data?.result?.map((item) => ({
      id: item._id,
      plate: item.registrationId,
      price: item.askingPrice ? `£${item.askingPrice}` : "",
      status: item.status?.toLowerCase() || "available",
    })) || [];

  const handleSimilarPlateClick = (plateId) => {
    navigate(`/plate-details/${plateId}`);
  };

  const handleBuyAPlate = async (plateId) => {
    const subscriptionId = localStorage.getItem("subscriptionId");

    if (!subscriptionId) {
      navigate("/please-subscribe");
      return;
    }

    try {
      const response = await checkSubscribed({ id: subscriptionId }).unwrap();
      console.log("Subscription check response:", response);

      if (response?.data?.isAvailable) {
        // proceed to checkout
        const buydata = {
          sellerId: plate?.sellerId?.id,
          price: plate?.askingPrice,
          platesalesId: plateId,
        };

        const checkoutRes = await createCheckout(buydata).unwrap();
        if (checkoutRes?.data?.checkoutUrl) {
          window.location.href = checkoutRes.data.checkoutUrl;
        }
      } else {
        navigate("/please-subscribe");
      }
    } catch (error) {
      console.error("Subscription check failed:", error);

      navigate("/please-subscribe");
    }
  };

  return (
    <div className="container mx-auto py-16">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-6xl font-medium text-gray-900 mb-6">
            Number Plate Details
          </h1>
          <p className="text-gray-900">
            View complete information about your number plate, including format,
            value, and listing status.
          </p>
        </div>

        {/* Main Image */}
        <div className="relative mb-8">
          <div className="relative bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={getImageUrl(plate?.photo) || "/black-mclaren-p1-oov.png"}
              alt={plate?.registrationId || "Car number plate"}
              className="w-full h-96 object-cover"
            />
            <button
              onClick={() => toggleFavorite(plate?._id)}
              disabled={loadingSaved || addingFavorite || removingFavorite}
              aria-label={isSaved ? "Remove from saved" : "Save plate"}
              className="absolute top-4 right-4 bg-white border border-gray-200 bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all hover:bg-gray-50 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {addingFavorite || removingFavorite ? (
                <span className="block w-5 h-5 border-2 border-gray-300 border-t-red-500 rounded-full animate-spin" />
              ) : (
                <Heart
                  className={`w-6 h-6 ${
                    isSaved ? "text-red-500 fill-red-500" : "text-gray-600"
                  }`}
                />
              )}
            </button>
          </div>
        </div>

        {/* Plate Display and Details */}
        <div className="text-center mb-8">
          {/* License Plate */}
          <div className="flex justify-center my-4">
            <div className="bg-[#fad549]  px-16 py-2 rounded shadow-[inset_0_-2px_2px_rgba(0,0,0,0.2)] text-center">
              <span className="text-black font-bold text-5xl tracking-wider font-mycustom">
                {plate?.registrationId || "N/A"}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mb-6">
            <button className="flex items-center uppercase gap-2 px-4 py-2 hover:bg-gray-200 rounded-md text-xl border text-gray-700 transition-colors">
              <img
                src="https://i.ibb.co.com/35Gdvj1M/image.png"
                alt="responsive"
                className="size-8"
              />
              VERY RESPONSIVE
            </button>
            <button className="flex items-center uppercase gap-2 px-4 py-2 hover:bg-gray-200 rounded-md text-xl border text-gray-700 transition-colors">
              <img
                src="https://i.ibb.co.com/LdvtTXjj/image.png"
                alt="useful"
                className="size-8"
              />
              HIGHLY USEFUL
            </button>
          </div>

          {/* Price */}
          <div className="mb-4 font-medium flex justify-center gap-2 items-center">
            <span className="text-xl text-gray-800 mr-2">Asking Price</span>
            <span className="text-xl text-gray-800">
              £{plate?.askingPrice || 0}
            </span>
            <div
            onClick={() => {
               navigate(
      `/userdashboard/message-center/${plate?.sellerId?._id}?plate=${plate?.registrationId}`
    );
            }}
            className="flex items-center space-x-2 bg-gray-200 hover:bg-gray-400 hover:text-white p-2 rounded-md ml-4 cursor-pointer">
              <FiMessageSquare className="text-2xl text-indigo-600" />
              <span className="text-xl text-gray-800 ">Chat With Seller</span>
            </div>
          </div>

          {/* Share Buttons */}
          <ShareButtons />

          {/* Buy Now Button */}
          <div className="flex justify-center my-4">
            <button
  onClick={() => handleBuyAPlate(plate?._id)}
  className="bg-[#00823A] max-w-2xl px-12 py-4 rounded-md shadow-md 
             text-center font-sans cursor-pointer 
             hover:bg-[#006f2e] active:scale-95 
             focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 
             transition transform"
>
  <span className="text-white font-bold text-xl tracking-wide">
    Buy Now
  </span>
</button>

          </div>
        </div>

        {/* Plate Details Section */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            Plate Details:
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Asking Price:</span>
              <span className="font-medium">£{plate?.askingPrice || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date Advert Placed:</span>
              <span className="font-medium">
                {new Date(plate?.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Seller Name:</span>
              <span className="font-medium">
                {plate?.sellerId?.fastname} {plate?.sellerId?.lastname}{" "}
                ⭐⭐⭐⭐⭐
              </span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 leading-relaxed">
              <strong>Status:</strong> {plate?.status}
            </p>
            <p className="text-sm text-gray-600 leading-relaxed mt-2">
              <strong>Description:</strong> {plate?.description}
            </p>
          </div>
        </div>
      </div>

      {/* Similar Plates Section */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-6 ">
          Similar Plates:
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {similarPlates.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSimilarPlateClick(item.id)}
              className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="bg-[#fad549] w-full px-3 py-2 rounded shadow-[inset_0_-2px_2px_rgba(0,0,0,0.2)] mb-3 inline-block">
                <span className="text-black font-bold text-2xl tracking-wider font-mycustom">
                  {item.plate}
                </span>
              </div>
              <div className="text-xl">
                {item.status === "sold" ? (
                  <>
                    <span>Sold</span>
                    {item.price && (
                      <>
                        <span className="mx-1">for</span>
                        <span>{item.price}</span>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <span className="text-green-600">{item.status}</span>
                    {item.price && <span className="ml-2">{item.price}</span>}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
