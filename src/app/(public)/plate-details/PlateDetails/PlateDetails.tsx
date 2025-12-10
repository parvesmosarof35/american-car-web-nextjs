"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { FiMessageSquare } from "react-icons/fi";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import ShareButtons from "./ShareButtons";

import { Heart } from "lucide-react";
import {
  useAddToSavedPlatesMutation,
  useGetMySavedPlatesQuery,
  useRemoveFromSavedPlatesMutation,
} from "@/lib/api/PlatesApis/mySavedAdversApi";
import { useIssubscribedMutation } from "@/lib/api/Issubscribed/IssubscribedApi";
import {
  useGetSimilarPlatesQuery,
  useGetSinglePlateQuery,
} from "@/lib/api/PlatesApis/singlePlateApi";
import { useCreateBuyerSellerCheckoutSessionMutation } from "@/lib/api/PaymentApis/buyAPlate";

interface Car {
  id: number;
  type: "rear" | "front";
  src: string;
  defaultPos: { x: number; y: number; width: number; height: number };
}

interface PlatePosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface SimilarPlate {
  id: string;
  plate: string;
  price: string;
  status: string;
}

// For embedded plate preview (reuse minimal logic from PlateView)
const MOBILE_DEFAULT = { width: 82, height: 17, x: 120, y: 136 };
const BASE = { width: 980, height: 520 }; // reference dimensions used for defaultPos

export default function PlateDetails(id: any) {
  // Embedded preview config
  const initialCars: Car[] = [
    {
      id: 1,
      type: "rear",
      src: "/PlateViewmainCar.png",
      defaultPos: { x: 409, y: 295, width: 168, height: 37 },
    },
    {
      id: 2,
      type: "front",
      src: "/car (2).png",
      defaultPos: { x: 384, y: 392, width: 239, height: 59 },
    },
    {
      id: 3,
      type: "rear",
      src: "/car (3).png",
      defaultPos: { x: 358, y: 246, width: 230, height: 52 },
    },
    {
      id: 4,
      type: "rear",
      src: "/car (4).png",
      defaultPos: { x: 338, y: 345, width: 285, height: 58 },
    },
    {
      id: 5,
      type: "rear",
      src: "/car (5).png",
      defaultPos: { x: 376, y: 318, width: 210, height: 47 },
    },
    {
      id: 6,
      type: "front",
      src: "/car (6).png",
      defaultPos: { x: 360, y: 450, width: 235, height: 50 },
    },
  ];

  const [addToSavedPlates, { isLoading: addingFavorite }] =
    useAddToSavedPlatesMutation();
  const [removeFromSavedPlates, { isLoading: removingFavorite }] =
    useRemoveFromSavedPlatesMutation();
  const { data: savedPlates, isLoading: loadingSaved } =
    useGetMySavedPlatesQuery({id});

  const [selectedCar, setSelectedCar] = useState<Car>(initialCars[0]);
  const [platePosition, setPlatePosition] = useState<PlatePosition>(
    initialCars[0].defaultPos
  );
  // No brightness control here; plate text only
  const previewRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Enquiry form state and submit
  const [enquiryMessage, setEnquiryMessage] = useState("");
  const [enquiryEmail, setEnquiryEmail] = useState("");
  const token = useSelector((state: any) => state.auth.token);
  const isLoggedIn = !!token; // here !! means if token exists, isLoggedIn should be true

  const handleSubmitEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryMessage.trim() || !enquiryEmail.trim()) {
      alert("Please provide both message and email.");
      return;
    }
    const draft = {
      plateId: plate?._id,
      plateReg: plate?.registrationId,
      sellerId: plate?.sellerId?._id,
      message: enquiryMessage,
      email: enquiryEmail,
      createdAt: Date.now(),
    };
    localStorage.setItem("enquiryDraft", JSON.stringify(draft));
    const redirect = encodeURIComponent(
      window.location.pathname + window.location.search
    );
    const emailQP = encodeURIComponent(enquiryEmail);
    router.push(`/login?email=${emailQP}&redirect=${redirect}`);
  };

  // Responsively scale the plate position/size to the rendered container
  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;

    const updateScaled = () => {
      const rect = el.getBoundingClientRect();
      const isMobile = rect.width < 640; // container is small; use mobile defaults
      if (isMobile) {
        // Use PlateView's mobile defaults exactly
        setPlatePosition({ ...MOBILE_DEFAULT });
        return;
      }
      const scaleX = rect.width / BASE.width;
      const scaleY = rect.height / BASE.height;
      const d = selectedCar.defaultPos;
      setPlatePosition({
        x: Math.round(d.x * scaleX),
        y: Math.round(d.y * scaleY),
        width: Math.round(d.width * scaleX),
        height: Math.round(d.height * scaleY),
      });
    };

    updateScaled();
    window.addEventListener("resize", updateScaled);
    return () => window.removeEventListener("resize", updateScaled);
  }, [selectedCar]);

  const handleSelectView = (viewType: "rear" | "front") => {
    const found = initialCars.find((c) => c.type === viewType);
    if (found) {
      setSelectedCar(found);
      // position will be recalculated by the responsive effect
    }
  };

  const handleNextCar = () => {
    const idx = initialCars.findIndex((c) => c.id === selectedCar.id);
    const next = initialCars[(idx + 1) % initialCars.length];
    setSelectedCar(next);
  };

  const handlePrevCar = () => {
    const idx = initialCars.findIndex((c) => c.id === selectedCar.id);
    const prev =
      initialCars[(idx - 1 + initialCars.length) % initialCars.length];
    setSelectedCar(prev);
  };
  const [checkSubscribed] = useIssubscribedMutation();
  const params = useParams();
  const { data, error, isLoading } = useGetSinglePlateQuery(params.id);
  const { data: similarplatesData } = useGetSimilarPlatesQuery(params.id);
  const [createCheckout, { isLoading: checkoutLoading }] =
    useCreateBuyerSellerCheckoutSessionMutation();

  console.log(checkoutLoading);

  const plate = data?.data;

  // After login return: if an enquiry draft exists for this plate, go create chat
  useEffect(() => {
    try {
      const raw = localStorage.getItem("enquiryDraft");
      if (!raw) return;
      const draft = JSON.parse(raw);
      if (!draft?.plateId || draft.plateId !== plate?._id) return;
      // Do not clear here; let Chat page consume and clear after send
      router.push(
        `/userdashboard/message-center/${draft.sellerId}?plate=${draft.plateReg}&plateId=${draft.plateId}`
      );
    } catch {
      // ignore parse errors
    }
  }, [plate?._id, router]);

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (error)
    return (
      <p className="text-center py-10 text-red-500">
        Failed to load plate details
      </p>
    );

  const toggleFavorite = async (advertId: string) => {
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

  // Find the saved entry for this plate (needed to remove by saved advert ID)
  const savedEntry = savedPlates?.data?.all_save_plates?.find(
    (item: any) => item.platesalesId?._id === plate?._id
  );
  const savedEntryId = savedEntry?._id;
  const isSaved = Boolean(savedEntryId);

  // Use dynamic similar plates from API
  const similarPlates: SimilarPlate[] =
    similarplatesData?.data?.result?.map((item: any) => ({
      id: item._id,
      plate: item.registrationId,
      price: item.askingPrice ? `£${item.askingPrice}` : "",
      status: item.status?.toLowerCase() || "available",
    })) || [];

  const handleSimilarPlateClick = (plateId: string) => {
    router.push(`/plate-details/${plateId}`);
  };

  // Chat should not require premium subscription; only require auth
  const handleChatWithSeller = () => {
    const target = `/userdashboard/message-center/${plate?.sellerId?._id}?plate=${plate?.registrationId}&plateId=${plate?._id}`;
    const token = localStorage.getItem("token");
    if (!token) {
      const redirect = encodeURIComponent(target);
      router.push(`/login?redirect=${redirect}`);
      return;
    }
    router.push(target);
  };

  const handleBuyAPlate = async (plateId: string) => {
    const subscriptionId = localStorage.getItem("subscriptionId");

    if (!subscriptionId) {
      router.push("/please-subscribe");
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
        router.push("/please-subscribe");
      }
    } catch (error) {
      console.error("Subscription check failed:", error);

      router.push("/please-subscribe");
    }
  };

  return (
    <div className="container mx-auto py-16">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-6xl font-semibold text-gray-900 mb-6">
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
            {/* Embedded Plate Preview (non-draggable) */}
            <div
              ref={previewRef}
              className="relative bg-white overflow-hidden w-full mx-auto rounded-2xl
                         max-w-[320px] sm:max-w-[980px] aspect-[4/3]
                         lg:w-[980px] lg:h-[520px] lg:aspect-auto"
            >
              {/* Heart Save/Unsave */}
              <button
                onClick={() => toggleFavorite(plate?._id)}
                disabled={loadingSaved || addingFavorite || removingFavorite}
                aria-label={isSaved ? "Remove from saved" : "Save plate"}
                className="absolute top-4 right-4 bg-white border border-gray-200 bg-opacity-80 
                         hover:bg-opacity-100 rounded-full p-2 transition-all 
                         hover:bg-gray-50 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
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

              {/* Car Image */}
              <img
                src={selectedCar.src}
                alt="Car with number plate preview"
                className="w-full h-full object-cover"
              />
              {/* Plate Overlay */}
              <div
                className="rounded shadow-md absolute"
                style={{
                  left: `${platePosition.x}px`,
                  top: `${platePosition.y}px`,
                  width: `${platePosition.width}px`,
                  height: `${platePosition.height}px`,
                  backgroundColor:
                    selectedCar.type === "rear" ? "#fad549" : "#ffffff",
                  filter: "brightness(95%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span className="text-black font-mycustom whitespace-nowrap overflow-hidden text-ellipsis text-md leading-[1] tracking-[0] font-medium sm:text-[44.21px] sm:font-medium block text-center">
                  {plate?.registrationId || "N/A"}
                </span>
              </div>
            </div>
            {/* Change image buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 py-3">
              <button
                onClick={handlePrevCar}
                className="px-4 py-1 rounded-full text-sm font-semibold cursor-pointer bg-white text-gray-700 border hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                onClick={() => handleSelectView("rear")}
                className={`px-4 py-1 rounded-full text-sm font-semibold cursor-pointer ${
                  selectedCar.type === "rear"
                    ? "bg-yellow-400 text-black"
                    : "bg-white text-gray-700 border"
                }`}
              >
                Rear
              </button>
              <button
                onClick={() => handleSelectView("front")}
                className={`px-4 py-1 rounded-full text-sm font-semibold cursor-pointer ${
                  selectedCar.type === "front"
                    ? "bg-yellow-400 text-black"
                    : "bg-white text-gray-700 border"
                }`}
              >
                Front
              </button>
              <button
                onClick={handleNextCar}
                className="px-4 py-1 rounded-full text-sm font-semibold cursor-pointer bg-white text-gray-700 border hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Plate Display and Details */}
        <div className="text-center mb-8">
          {/* License Plate */}
          <div className="flex justify-center my-4">
            <div className="bg-[#fad549]  px-16 py-2 rounded shadow-[inset_0_-2px_2px_rgba(0,0,0,0.2)] text-center">
              <span className="text-black font-mycustom whitespace-nowrap overflow-hidden text-ellipsis text-[35px] leading-[1] tracking-[0] font-medium sm:text-[44.21px] sm:font-medium block text-center">
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
              onClick={handleChatWithSeller}
              className="flex items-center space-x-2 bg-gray-200 hover:bg-gray-400 hover:text-white p-2 rounded-md ml-4 cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
            >
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

          {/* Enquiry Form */}
          {!isLoggedIn && (
            <div className="flex justify-center my-6">
              <form
                onSubmit={handleSubmitEnquiry}
                className="w-full max-w-3xl bg-white rounded-2xl shadow p-6 border"
              >
                <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 text-center">
                  Make an enquiry about {plate?.registrationId || "this plate"}:
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Message:
                    </label>
                    <textarea
                      value={enquiryMessage}
                      onChange={(e) => setEnquiryMessage(e.target.value)}
                      rows={4}
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Write your message..."
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Email Address:
                    </label>
                    <input
                      type="email"
                      value={enquiryEmail}
                      onChange={(e) => setEnquiryEmail(e.target.value)}
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
                    >
                      Continue
                      <span aria-hidden>»</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
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
        {similarPlates.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-8 text-center bg-white">
            <div className="text-2xl mb-2">😕</div>
            <p className="text-gray-700 mb-4">
              No similar plates are available right now.
            </p>
            <button
              onClick={() => router.push("/all-plates")}
              className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-black transition-colors"
            >
              Browse all plates
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {similarPlates.map((item: any, index: any) => (
              <div
                key={index}
                onClick={() => handleSimilarPlateClick(item.id)}
                className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1"
              >
                <div className="bg-[#fad549] w-full px-3 py-2 rounded shadow-[inset_0_-2px_2px_rgba(0,0,0,0.2)] mb-3 inline-block">
                  <span className="text-black font-mycustom whitespace-nowrap overflow-hidden text-ellipsis text-[35px] leading-[1] tracking-[0] font-medium sm:text-[44.21px] sm:font-medium block text-center">
                    {item.plate}
                  </span>
                </div>
                <div className="text-xl">
                  {item.status === "sold" ? (
                    <>
                      <span className="inline-block px-2 py-0.5 rounded bg-red-100 text-red-700 text-sm mr-2">
                        Sold
                      </span>
                      {item.price && <span>{item.price}</span>}
                    </>
                  ) : (
                    <>
                      <span className="inline-block px-2 py-0.5 rounded bg-green-100 text-green-700 text-sm mr-2 capitalize">
                        {item.status}
                      </span>
                      {item.price && <span className="">{item.price}</span>}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
