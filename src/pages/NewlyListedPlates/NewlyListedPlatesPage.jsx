import React, { useState } from "react";
import PlateCard from "../Home/NewlyListedPlates/PlateCard";
import Loader from "../../shared/Loaders/Loader";
import ErrorPage from "../../shared/Error/ErrorPage";
import { useGetAllplatesSalesQuery } from "../../Redux/api/platesSalesApi";

export default function NewlyListedPlatesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const { data, isLoading, error, isSuccess } = useGetAllplatesSalesQuery({
    page: currentPage,
    limit: itemsPerPage,
  });

  if (isLoading) return <Loader />;
  if (error) return <ErrorPage message={error?.message} />;

  const { total, totalPage } = data?.data?.meta || {};
  const plates =
    (!isLoading && isSuccess && data?.success && data?.data?.all_plates) || [];

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPage) return;
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getVisiblePages = () => {
    const pages = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPage, currentPage + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="px-4 py-12 bg-[#f6f6f6] min-h-screen">
      <div className="container mx-auto">
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

        {totalPage > 1 && (
          <div className="flex flex-col items-center gap-4">
            <p className="text-sm text-gray-600">
              Page {currentPage} of {totalPage} ({total} total results)
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-[#00823A] text-white cursor-pointer border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed "
              >
                Previous
              </button>

              {currentPage > 3 && (
                <>
                  <button
                    onClick={() => handlePageChange(1)}
                    className="px-3 py-2 bg-white border rounded-lg hover:bg-gray-50"
                  >
                    1
                  </button>
                  {currentPage > 4 && <span className="px-2">...</span>}
                </>
              )}

              {getVisiblePages().map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-2 rounded-lg ${
                    currentPage === page
                      ? "bg-[#00823A] text-white"
                      : "bg-white border hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}

              {currentPage < totalPage - 2 && (
                <>
                  {currentPage < totalPage - 3 && (
                    <span className="px-2">...</span>
                  )}
                  <button
                    onClick={() => handlePageChange(totalPage)}
                    className="px-3 py-2 bg-white border rounded-lg hover:bg-gray-50"
                  >
                    {totalPage}
                  </button>
                </>
              )}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPage}
                className="px-4 py-2 bg-[#00823A] text-white border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed "
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
