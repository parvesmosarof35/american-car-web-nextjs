import React, { useState } from "react";
import svg1 from "/1.png";
import svg2 from "/2.svg";
import svg3 from "/3.svg";
import LikeIconAndText from "../../shared/Hero/LikeIconandtext";
import { useGetSoldPlatesQuery } from "../../Redux/api/PlatesApis/soldPlatesApi";
import { useNavigate } from "react-router-dom";

  const formatPlate = (reg) => {
    if (!reg) return "";
    const alnum = String(reg).replace(/[^A-Za-z0-9]/g, "").slice(0, 7);
    const len = alnum.length;
    if (len <= 2) return alnum;
    const gapIndex = len === 3 ? 2 : len === 4 ? 2 : len === 5 ? 3 : len === 6 ? 3 : 4;
    return `${alnum.slice(0, gapIndex)} ${alnum.slice(gapIndex)}`.trim();
  };
export default function RecentlySold() {
  const [page, setPage] = useState(1);
  const limit = 20;
  
  const navigate = useNavigate();

  // Fetch data with page & limit params
  const { data, isLoading, isError } = useGetSoldPlatesQuery({ page, limit });
  const totalPage = data?.data?.meta?.totalPage || 1;
  const currentPage = data?.data?.meta?.page || page;

  const features = [
    {
      imgSrc: svg1,
      text: "We charge only £10.",
    },
    {
      imgSrc: svg2,
      text: "No middleman (save up to 30%).",
    },
    {
      imgSrc: svg3,
      text: "Buyer and Seller deal directly with each other.",
    },
  ];



  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPage) {
      setPage(newPage);
    }
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (isError)
    return (
      <p className="text-center py-10 text-red-500">
        Error fetching sold plates.
      </p>
    );

  return (
    <div className="container mx-auto px-5 md:px-0 py-10 md:py-16 ">
      {/* Header */}
      <div className="text-center my-12">
        <h1 className="text-3xl md:text-6xl font-medium text-gray-900 mb-6">
          Plates Sold Via Plate Xpress
        </h1>
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-10 max-w-9xl mx-auto mt-10">
            {features.map((feature, index) => (
              <LikeIconAndText
                key={index}
                imgSrc={feature.imgSrc}
                text={feature.text}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Recently Sold Plates Section */}
      <div className="min-h-[20rem]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data?.data?.all_sold_plates?.map((item, index) => (
            <div
              key={item._id || index}
              className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow  flex flex-col items-center"
            >
              {/* License Plate */}
              <div
                className="px-2 sm:px-3 md:px-4 lg:px-5 xl:px-6 py-1 sm:py-1.5 md:py-2 lg:py-2.5 xl:py-1 rounded-md shadow-[inset_0_-2px_2px_rgba(0,0,0,0.2)] flex items-center justify-center flex-shrink-0 w-[150px] h-[56px] md:h-[60px] lg:h-[64px] xl:h-[68px] sm:w-auto sm:h-auto sm:min-w-[140px] md:min-w-[160px] lg:min-w-[180px] xl:min-w-[240px] xl:max-w-[260px] mb-3"
                style={{
                  background:
                    "linear-gradient(180deg, #FAD95C 0%, #F9CD27 90.41%, #F9CD27 93.8%, #F9CD26 93.9%, #C09E1D 100%)",
                }}
              >
                <span
                  className="text-black font-mycustom whitespace-nowrap overflow-hidden text-ellipsis text-[35px] leading-[1] tracking-[0] font-medium sm:text-[44.21px] sm:font-medium block text-center"
                >
                  {formatPlate(item.registrationId)}
                </span>
              </div>

              {/* Price / Status */}
              <div className="text-xl font-bold">
                {item.askingPrice ? (
                  <>
                    <span>SOLD</span>
                  </>
                ) : (
                  <span className="text-green-600 font-semibold">Make Offer</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-10 gap-2">
        {/* Prev button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-[#00823A] text-white"
          }`}
        >
          Prev
        </button>

        {/* Page numbers */}
        {[...Array(totalPage)].map((_, index) => {
          const pageNum = index + 1;
          return (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`px-4 py-2 rounded ${
                currentPage === pageNum
                  ? "bg-[#00823A] text-white font-bold"
                  : "bg-white border text-gray-700 hover:bg-gray-100"
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        {/* Next button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPage}
          className={`px-4 py-2 rounded ${
            currentPage === totalPage
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-[#00823A] text-white"
          }`}
        >
          Next
        </button>
      </div>

      {/* Load All */}
      <div
        onClick={() => navigate("/all-plates")}
        className="bg-[#00823A] max-w-xl mx-auto mt-6 cursor-pointer px-8 py-4 rounded shadow-[inset_0_-2px_2px_rgba(0,0,0,0.2)] text-center font-sans"
      >
        <span className="text-white font-bold text-2xl tracking-wider">
          Load all
        </span>
      </div>
    </div>
  );
}
