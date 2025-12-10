"use client";
import { useAddAdvertMutation } from "@/lib/api/PlatesApis/myAdvartApi";
import React, { useState } from "react";
import { HiOutlineUpload } from "react-icons/hi";
import { useSearchParams, useRouter } from "next/navigation";

import Swal from "sweetalert2";

export default function ListPlateForSale() {
  const [addAdvert, { isLoading }] = useAddAdvertMutation();
  const searchParams = useSearchParams();
  const router = useRouter();

  const searchTerm = searchParams?.get("plate") || "";
  console.log(searchTerm);

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    registration: (searchTerm || "").replace(/[^A-Za-z0-9]/g, "").slice(0, 7),
    registrationRaw: searchTerm || "",
    askingPrice: 0,
    price: "",
    vat: false,
    noPrice: false,
    description: "",
    keywords: "",
    email: "",
  });
  const [carImage, setCarImage] = useState<string | null>(null); // For top car image

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    if (name === "registration") {
      // Build a raw value that allows at most one space and up to 7 alphanumerics
      let alnumCount = 0;
      let hasSpace = false;
      let built = "";
      for (const ch of value) {
        if (/[A-Za-z0-9]/.test(ch)) {
          if (alnumCount < 7) {
            built += ch;
            alnumCount += 1;
          }
        } else if (ch === " ") {
          if (!hasSpace) {
            built += " ";
            hasSpace = true;
          }
        }
        // ignore other chars
      }
      const sanitized = built.replace(/[^A-Za-z0-9]/g, "");
      setFormData((prev) => ({
        ...prev,
        registration: sanitized,
        registrationRaw: built,
      }));
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const formatRegistrationForDisplay = (raw: string, sanitized: string) => {
    if (!raw && !sanitized) return "PL00V";
    // If user typed a space, respect a single space (compress multiple spaces)
    if (raw && raw.includes(" ")) {
      return raw.replace(/\s+/g, " ").trim();
    }
    const s = sanitized || "";
    const len = s.length;
    if (len <= 2) return s; // no gap yet
    // Insert gap rules: 3→2, 4→2, 5→3, 6→3, 7→4
    const gapIndex =
      len === 3 ? 2 : len === 4 ? 2 : len === 5 ? 3 : len === 6 ? 3 : 4;
    return `${s.slice(0, gapIndex)} ${s.slice(gapIndex)}`.trim();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file); // store the File
      setCarImage(URL.createObjectURL(file)); // for preview
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const askingPriceValue = formData.noPrice
      ? undefined
      : Number(formData.price);

    const payload = new FormData();
    payload.append("registrationId", formData.registration);

    if (askingPriceValue !== undefined) {
      // 👇 stringify the number, server can parse as number
      payload.append("askingPrice", JSON.stringify(askingPriceValue));
    }

    payload.append("description", formData.description);
    payload.append("emailAddress", formData.email);
    if (uploadedFile) payload.append("file", uploadedFile);

    console.log("Submitting FormData:");
    for (let pair of payload.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    console.log("payload", payload);

    try {
      const result = await addAdvert(payload).unwrap();
      console.log("Advert added successfully:", result);

      // Check if result has success property or data structure
      if (result?.success || result?.data?.success || result?.data) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text:
            result?.data?.message ||
            result?.message ||
            "Advert created successfully!",
        });
        // Optionally redirect to my adverts page
        // router.push("/userdashboard/my-adverts");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            result?.message ||
            result?.data?.message ||
            "There was an issue creating your advert.",
        });
      }
    } catch (err: any) {
      console.error("Error adding advert:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          err?.data?.message ||
          err?.message ||
          "Failed to create advert. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f6f6] flex items-center justify-center">
      <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="p-8 text-center">
          <h1 className="text-6xl font-semibold mb-3">Create Your Advert</h1>
          <p className="opacity-90 text-lg">
            Please complete your advert details below. You'll be able to edit
            your advert at any time once it is live.
          </p>
        </div>

        {/* Car Image Section */}
        <div className="relative h-96 bg-gradient-to-br from-blue-800 to-blue-900 flex items-center justify-center overflow-hidden rounded-2xl">
          {carImage ? (
            <>
              <img
                src={carImage}
                alt="Car"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              {/* Cross button to remove image */}
              <button
                onClick={() => {
                  setCarImage(null);
                  setUploadedFile(null);
                }}
                className="absolute top-2 right-2 bg-gray-200 text-gray-800 rounded-full w-8 h-8 flex items-center justify-center shadow hover:bg-gray-100 transition"
              >
                ×
              </button>
            </>
          ) : (
            <label className="cursor-pointer flex flex-col items-center justify-center text-white opacity-80">
              <HiOutlineUpload size={50} />
              <span className="mt-2 text-lg">Upload Car Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          )}

          <div className="absolute top-5 left-5 bg-yellow-400 text-gray-800 px-4 py-2 rounded-lg font-bold text-sm shadow-lg font-mycustom">
            {formatRegistrationForDisplay(
              formData.registrationRaw,
              formData.registration
            )}
          </div>
        </div>

        {/* Form Section */}
        <div className="p-10 max-w-2xl mx-auto">
          <div className="space-y-6">
            {/* Registration */}

            {/* Registration Plate */}
            <div className="flex justify-center my-4">
              <div className="bg-[#fad549] w-full px-16 py-2 rounded shadow-[inset_0_-2px_2px_rgba(0,0,0,0.2)] text-center !font-mycustom">
                <span className="text-[#A6A6A6] font-bold text-5xl tracking-wider font-mycustom">
                  {formatRegistrationForDisplay(
                    formData.registrationRaw,
                    formData.registration
                  )}
                </span>
              </div>
            </div>

            {/* Registration Input */}
            <div className="form-group">
              <label
                htmlFor="registration"
                className="block mb-2 font-bold text-[#1B1B1B] text-lg"
              >
                Registration:
              </label>
              <input
                type="text"
                id="registration"
                name="registration"
                value={formData.registrationRaw}
                onChange={handleInputChange}
                placeholder="Enter registration number"
                maxLength={8}
                pattern="[A-Za-z0-9 ]{1,8}"
                className="w-full p-4 py-4 border-2 border-gray-700 rounded-md text-base transition-all duration-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:bg-white focus:-translate-y-1 focus:shadow-lg"
              />
            </div>

            {/* Price */}
            <div className="form-group">
              <label
                htmlFor="price"
                className="block mb-2 font-bold text-[#1B1B1B] text-lg"
              >
                Asking Price:
              </label>
              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 font-bold text-gray-600 z-10">
                  £
                </span>
                <input
                  type="number"
                  required={!formData.noPrice}
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  disabled={formData.noPrice}
                  placeholder="0"
                  className={`w-full pl-10 pr-24 py-4 border-2 border-gray-700 rounded-md text-base transition-all duration-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:bg-white focus:-translate-y-1 focus:shadow-lg ${
                    formData.noPrice ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                />
                <div className="absolute inset-y-0 right-3 flex items-center space-x-2 text-gray-600">
                  <input
                    type="checkbox"
                    id="vat"
                    name="vat"
                    checked={formData.vat}
                    onChange={handleInputChange}
                    disabled={formData.noPrice}
                    className="appearance-none h-5 w-5 border-1 border-gray-700 rounded-full checked:bg-blue-500 checked:border-blue-500 transition-colors duration-200 cursor-pointer"
                  />
                  <label htmlFor="vat" className="whitespace-nowrap">
                    + VAT
                  </label>
                </div>
              </div>
              <div className="mt-2 flex items-center space-x-2 text-gray-600 text-lg">
                <input
                  type="checkbox"
                  id="noPrice"
                  name="noPrice"
                  checked={formData.noPrice}
                  onChange={handleInputChange}
                  className="size-5"
                />
                <label htmlFor="noPrice">
                  I'm not sure. Allow buyers to make me offers
                </label>
              </div>
            </div>

            {/* Description */}
            <div className="form-group">
              <label
                htmlFor="description"
                className="block mb-2 font-bold text-[#1B1B1B] text-lg"
              >
                Description{" "}
                <span className="text-gray-500 font-normal text-sm">
                  (optional)
                </span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Add this to sell your vehicle to help it sell more quickly, but it is not compulsory on autotrader"
                className="w-full p-4 py-4 border-2 border-gray-700 rounded-md text-base transition-all duration-300 bg-gray-50 min-h-[100px] resize-y focus:outline-none focus:border-blue-500 focus:bg-white focus:-translate-y-1 focus:shadow-lg"
                rows={4}
              />
            </div>

            {/* Keywords */}
            <div className="form-group">
              <label
                htmlFor="keywords"
                className="block mb-2 font-bold text-[#1B1B1B] text-lg"
              >
                Keywords{" "}
                <span className="text-gray-500 font-normal text-sm">
                  (optional)
                </span>
              </label>
              <textarea
                id="keywords"
                name="keywords"
                value={formData.keywords}
                onChange={handleInputChange}
                placeholder="Enter keywords to help buyers find your advert e.g. Performance, leather, climate control, one owner, warranty"
                className="w-full p-4 py-4 border-2 border-gray-700 rounded-md text-base transition-all duration-300 bg-gray-50 min-h-[100px] resize-y focus:outline-none focus:border-blue-500 focus:bg-white focus:-translate-y-1 focus:shadow-lg"
                rows={4}
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label
                htmlFor="email"
                className="block mb-2 font-bold text-[#1B1B1B] text-lg"
              >
                Email Address:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full p-4 py-4 border-2 border-gray-700 rounded-md text-base transition-all duration-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:bg-white focus:-translate-y-1 focus:shadow-lg"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-[#00823A] text-white py-5 px-6 rounded-xl text-xl font-semibold cursor-pointer transition-all duration-300 uppercase tracking-wide mt-8 hover:-translate-y-1 hover:shadow-xl active:-translate-y-0"
            >
              {isLoading ? "Submitting..." : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
