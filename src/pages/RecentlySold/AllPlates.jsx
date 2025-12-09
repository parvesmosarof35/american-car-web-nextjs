import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetAllPlatesQuery } from "../../Redux/api/PlatesApis/allListedPlatesApi";


export default function AllPlates() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const limit = 30;
  

  const { search } = useLocation();
  let searchTerm = "";

  if (search.startsWith("?")) {
    searchTerm = search.substring(1); // remove "?"
  }

  console.log(searchTerm);


  const { data, isLoading, isError } = useGetAllPlatesQuery({ page, limit, searchTerm });

  // Extract API response safely
  const plates = data?.data?.all_plates || [];
  const meta = data?.data?.meta || {};
  const totalPage = meta?.totalPage || 1;
  const currentPage = meta?.page || page;

  const handlePlateClick = (plateId) => {
    navigate(`/plate-details/${plateId}`);
  };

  if (isLoading) {
    return <div className="text-center py-20 text-lg">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center py-20 text-red-500">Failed to load plates.</div>;
  }

  const formatPlate = (reg) => {
    if (!reg) return "";
    const raw = String(reg);
    if (raw.includes(" ")) {
      return raw.replace(/\s+/g, " ").trim();
    }
    const s = raw.replace(/[^A-Za-z0-9]/g, "");
    const len = s.length;
    if (len <= 2) return s;
    const gapIndex = len === 3 ? 2 : len === 4 ? 2 : len === 5 ? 3 : len === 6 ? 3 : 4;
    return `${s.slice(0, gapIndex)} ${s.slice(gapIndex)}`.trim();
  };

  return (
    <div className="container mx-auto p-8">
      {/* Header */}
      <div className="text-center my-12">
        <h1 className="text-3xl md:text-6xl font-medium text-gray-900 mb-6">
          All Plates
        </h1>
        <div className="max-w-7xl mx-auto">
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Discover the latest number plates added to the marketplace — fresh,
            unique, and available now.
          </p>
        </div>
      </div>

      {/* Plates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plates.map((item) => (
          <div
            key={item._id}
            onClick={() => handlePlateClick(item._id)}
            className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center"
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
                  {/* <span className="text-gray-700">Available</span>
                  <span className="mx-1">at</span> */}
                  <span>£{item.askingPrice}</span>
                </>
              ) : (
                <span className="text-green-600 font-semibold">Make Offer</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPage > 1 && (
        <div className="flex justify-center items-center mt-10 gap-2">
          {/* Prev button */}
          <button
            onClick={() => setPage(currentPage - 1)}
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
                onClick={() => setPage(pageNum)}
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
            onClick={() => setPage(currentPage + 1)}
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
      )}
    </div>
  );
}
