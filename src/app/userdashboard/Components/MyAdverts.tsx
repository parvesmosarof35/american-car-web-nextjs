"use client";

import React, { useState, useEffect } from "react";

interface Advert {
  id: string;
  registration: string;
  price: number;
  status: "active" | "sold" | "pending";
  createdAt: string;
  views: number;
  description: string;
}

export default function MyAdverts() {
  const [adverts, setAdverts] = useState<Advert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "active" | "sold" | "pending">(
    "all"
  );

  useEffect(() => {
    // TODO: Replace with actual API call
    // const fetchAdverts = async () => {
    //   const data = await getMyAdverts().unwrap();
    //   setAdverts(data);
    // };

    // Mock data for now
    const mockAdverts: Advert[] = [
      {
        id: "1",
        registration: "AB12 CDE",
        price: 5000,
        status: "active",
        createdAt: "2024-01-15",
        views: 245,
        description: "Premium registration plate",
      },
      {
        id: "2",
        registration: "XY99 ZZZ",
        price: 12000,
        status: "sold",
        createdAt: "2024-01-10",
        views: 567,
        description: "Rare combination",
      },
    ];

    setTimeout(() => {
      setAdverts(mockAdverts);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredAdverts = adverts.filter(
    (advert) => filter === "all" || advert.status === filter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "sold":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleDeleteAdvert = async (id: string) => {
    if (confirm("Are you sure you want to delete this advert?")) {
      try {
        // TODO: Replace with actual API call
        // await deleteAdvert(id).unwrap();
        setAdverts((prev) => prev.filter((advert) => advert.id !== id));
        alert("Advert deleted successfully!");
      } catch (error: any) {
        alert(error?.data?.message || "Failed to delete advert");
      }
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    try {
      // TODO: Replace with actual API call
      // const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      // await updateAdvertStatus(id, newStatus).unwrap();

      setAdverts((prev) =>
        prev.map((advert) =>
          advert.id === id
            ? {
                ...advert,
                status: advert.status === "active" ? "pending" : "active",
              }
            : advert
        )
      );
    } catch (error: any) {
      alert(error?.data?.message || "Failed to update advert status");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00823A] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your adverts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Adverts</h1>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {(["all", "active", "sold", "pending"] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`py-2 px-4 border-b-2 font-medium text-sm capitalize ${
                    filter === status
                      ? "border-[#00823A] text-[#00823A]"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {status} (
                  {status === "all"
                    ? adverts.length
                    : adverts.filter((a) => a.status === status).length}
                  )
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Adverts List */}
        {filteredAdverts.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="text-gray-400 mb-4">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              No adverts found
            </h3>
            <p className="text-gray-600">
              {filter === "all"
                ? "You haven't created any adverts yet."
                : `No ${filter} adverts found.`}
            </p>
            <button className="mt-4 px-4 py-2 bg-[#00823A] text-white rounded-md hover:bg-green-700">
              Create New Advert
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredAdverts.map((advert) => (
              <div key={advert.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {advert.registration}
                    </h3>
                    <p className="text-gray-600 mb-2">{advert.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>
                        Created:{" "}
                        {new Date(advert.createdAt).toLocaleDateString()}
                      </span>
                      <span>Views: {advert.views}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#00823A] mb-2">
                      £{advert.price.toLocaleString()}
                    </div>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        advert.status
                      )}`}
                    >
                      {advert.status}
                    </span>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors">
                    Edit
                  </button>
                  <button className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors">
                    View Details
                  </button>
                  <button
                    onClick={() => handleToggleStatus(advert.id, advert.status)}
                    className="px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    {advert.status === "active" ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    onClick={() => handleDeleteAdvert(advert.id)}
                    className="px-4 py-2 text-red-600 hover:text-red-800 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
