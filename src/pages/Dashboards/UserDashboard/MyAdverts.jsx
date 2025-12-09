import React, { useEffect, useState } from "react";
import { Eye, Edit, BarChart3, X } from "lucide-react";
import {
  useDeleteAdvertMutation,
  useGetMyAdvertsQuery,
  useGetMyAdvertStatisticsQuery,
  useUpdateAdvertMutation,
} from "../../../Redux/api/PlatesApis/myAdvartApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function MyAdverts() {
  const { data, error, isLoading } = useGetMyAdvertsQuery();
  const [deleteAdvert] = useDeleteAdvertMutation("");
  const [updateAdvert] = useUpdateAdvertMutation();
  const adverts = data?.data?.my_adversList || [];
  const navigate = useNavigate();

    const [selectedAdvertId, setSelectedAdvertId] = useState(null);

  const { data: statsData, isLoading: statsLoading } = useGetMyAdvertStatisticsQuery(selectedAdvertId, {
    skip: !selectedAdvertId, // only fetch if id is set
  });



    // Show SweetAlert when statsData is updated
  useEffect(() => {
    if (statsData) {
      Swal.fire({
        title: `Advert Statistics`,
        html: `
          <p><strong>Status:</strong> ${statsData.data.status}</p>
          <p><strong>View Count:</strong> ${statsData.data.viewCount}</p>
          <p><strong>Save Count:</strong> ${statsData.data.saveCount}</p>
          <p><strong>Created At:</strong> ${new Date(statsData.data.createdAt).toLocaleString()}</p>
        `,
        icon: "info",
        confirmButtonText: "Close",
      });
    }
  }, [statsData]);



  const handleStats = (advertId) => {
    setSelectedAdvertId(advertId);
    console.log(statsData, "is", statsLoading)
  };



  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (error)
    return (
      <p className="text-center py-10 text-red-500">Failed to load adverts</p>
    );



  const handleView = (advertId) => {
    navigate(`/plate-details/${advertId}`);
  };

  const handleEdit = async (advertId) => {
    const advert = adverts.find((a) => a._id === advertId);
    if (!advert) return;

    const { value: formValues } = await Swal.fire({
      title: "Edit Advert",
      html:
        `<input id="swal-input1" class="swal2-input" placeholder="Registration ID" value="${advert.registrationId}" />` +
        `<input id="swal-input2" class="swal2-input" placeholder="Asking Price" type="number" value="${advert.askingPrice}" />` +
        `<input id="swal-input3" class="swal2-input" placeholder="Description" value="${
          advert.description || ""
        }" />`,
      focusConfirm: false,
      preConfirm: () => {
        return {
          registrationId: document.getElementById("swal-input1").value,
          askingPrice: String(document.getElementById("swal-input2").value),
          description: document.getElementById("swal-input3").value,
        };
      },
      showCancelButton: true,
      confirmButtonText: "Update",
    });

    if (formValues) {
      try {
        const res = await updateAdvert({ advertId, data: formValues }).unwrap();
        // The API response is in res, check for res.success or res.data.status
        if (res.success || res.data?.status) {
          Swal.fire("Updated!", "Your advert has been updated.", "success");
        } else {
          Swal.fire("Error", "Failed to update advert.");
        }
      } catch (err) {
        Swal.fire("Error", "Failed to update advert.", err);
      }
    }
  };

  const handleDelete = (advertId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Call delete API here
        deleteAdvert(advertId).then(() => {
          Swal.fire("Deleted!", "Your advert has been deleted.", "success");
        });
      }
    });
  };

  const handleListNewPlate = () => {
    navigate("/userdashboard/list-plate");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex items-center justify-center">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-center font-semibold text-gray-900 mb-6 text-6xl">
            My Adverts
          </h1>

          {/* Active Adverts Section */}
          <div className="mb-6">
            <h2 className="text-lg mb-2 block font-medium text-[#1B1B1B]">
              Active Adverts
            </h2>
            {/* <p className="text-lg mb-2 block font-medium text-[#1B1B1B]">
              Premium Monthly (£497 4 Months)
            </p> */}
          </div>
        </div>

        {/* Adverts List */}
        <div className="space-y-4 mb-8">
          {adverts.map((advert) => (
            <div
              key={advert._id}
              className="p-4 sm:p-6 bg-white rounded-lg shadow-[2px_2px_8px_rgba(0,0,0,0.20)] hover:shadow-[6px_6px_14px_rgba(0,0,0,0.2)] transition-shadow duration-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* License Plate */}
                <div className="bg-[#fad549] px-6 py-2 rounded shadow-[inset_0_-2px_2px_rgba(0,0,0,0.2)] font-mycustom text-center sm:text-left">
                  <span className="text-black font-bold text-xl tracking-wider text-mycustom">
                    {advert.registrationId}
                  </span>
                </div>

                {/* Price + Date + Status + Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-8 gap-4">
                  {/* Price */}
                  <div className="text-center sm:text-left">
                    <div className="text-[#00823A] font-medium text-xl">
                      £{advert.askingPrice}
                    </div>
                  </div>

                  {/* Date */}
                  <div className="text-center sm:text-left">
                    <div className="text-gray-600 text-sm">
                      {new Date(advert.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Status */}
                  <div className="text-center sm:text-left">
                    <span
                      className={`px-3 py-1 rounded text-sm font-medium ${
                        advert.status === "Available"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {advert.status}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <button
                      onClick={() => handleView(advert._id)}
                      className="p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors cursor-pointer"
                      title="View"
                    >
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>

                    <button
                      onClick={() => handleEdit(advert._id)}
                      className="p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors  cursor-pointer"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4 text-gray-600" />
                    </button>

                    <button
                      onClick={() => handleStats(advert._id)}
                      className="p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors cursor-pointer"
                      title="Statistics"
                    >
                      <BarChart3 className="w-4 h-4 text-gray-600" />
                    </button>

                    <button
                      onClick={() => handleDelete(advert._id)}
                      className="p-2 border border-gray-300 rounded hover:bg-red-50 hover:border-red-300 cursor-pointer transition-colors"
                      title="Delete"
                    >
                      <X className="w-4 h-4 text-gray-600 hover:text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Plate Button */}
        <div className="flex justify-center">
          <button
            onClick={handleListNewPlate}
            className="w-full bg-white py-3 px-6 border-2 border-dashed border-gray-300 cursor-pointer rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors duration-200"
          >
            +List a new plate for sale
          </button>
        </div>
      </div>
    </div>
  );
}
