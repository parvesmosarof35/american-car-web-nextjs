import React, { useState } from "react";
import Input from "../../shared/Input/Input";
import { IoIosStar } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function BuyAPlateHero() {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    // console.log("Searching for:", searchTerm);
  };
  const navigate = useNavigate();




  return (
    <div className=" px-5 md:px-0 py-16">
      {/* Header Section */}
      <div className="text-center mb-16 text-4xl md:text-6xl font-semibold">
        <h1 className="  text-gray-800 mb-2 leading-tight">
          Buy Affordable Private Number
        </h1>
        <h2 className=" text-gray-800 mb-8">
          <span>Plates </span>
          <span className="text-custom-yellow px-2 py-1 rounded relative">
            Directly from Sellers.
            <img
              className="absolute -bottom-3 right-0"
              src="https://i.ibb.co.com/4Z8jPdts/image.png"
              alt="yellow-line"
            />
          </span>{" "}
        </h2>
      </div>

      {/* Search Section */}
      <div className="bg-[#ecedef] rounded-lg shadow-sm py-10 px-4 mb-5 max-w-[550px] mx-auto">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2 md:gap-1">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="SEARCH A PLATE"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="md:flex-1 px-4 py-3 border border-gray-300 rounded-l-md focus:outline-none text-xs md:text-lg text-center font-medium text-gray-700"
            />
          </div>

          <button
          onClick={()=> {
            navigate("/all-plates");
          }}
            type="submit"
            className="md:ml-5 bg-yellow-300 text-black font-bold px-6 py-3 rounded-r-md transition-colors duration-200 flex items-center justify-center cursor-pointer"
          >
            View All
          </button>
        </form>
        {/* Trustpilot Reviews */}
        <div className="mt-6 flex items-center justify-center">
          <IoIosStar className="size-10 text-[#00823a] fill-current" />
          <span className="text-lg font-medium ml-1 mr-2">Trustpilot</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <div className="bg-[#00823A] mx-1 p-0.5 rounded-xs">
                <IoIosStar key={i} className=" text-[#ffffff] fill-current" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-16"></div>
    </div>
  );
}
