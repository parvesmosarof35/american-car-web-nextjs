import React, { useEffect, useState } from "react";
import { MapPin, Mail, Clock } from "lucide-react";
import { useCreateContactMutation } from "../../Redux/api/contactApi";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";

export default function ContactUs() {
    const location = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    question: "",
  });
  const [createContact, { isLoading }] = useCreateContactMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

    // parse query params
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const reportedUserId = query.get("reportedUserId") || "";
    const reportedUserName = query.get("reportedUserName") || "";
    const reporterEmail = query.get("reporterEmail") || "";

    //set a message
    let message = `I would like to report this user.\n\nUser ID: ${reportedUserId}\nUser Name: ${reportedUserName}\n\nPlease provide details of the issue here...`;

    setFormData((prev) => ({
      ...prev,
      email: reporterEmail || prev.email,
      reportedUserId,
      question: reportedUserId ? message : prev.question,
    }));
  }, [location.search]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createContact(formData);

    if (res?.data?.success) {
      setFormData({
        name: "",
        email: "",
        question: "",
      });
    } else {
        Swal.fire("Error", res || "Submission failed.", "error");
    }
  };

  return (
    <div className="px-5 md:px-0 py-16 container mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-block  text-gray-900 text-5xl font-semibold">
          Contact Us
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Side */}
        <div className="space-y-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Get In Touch With Us Now
          </h2>

          <div className="border border-gray-300 rounded-lg p-6 space-y-6">
            {/* Office Location */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-gray-600" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Office Location
                </h3>
                <div className="text-gray-600 text-sm space-y-1">
                  <p>PlateXpress Inc.</p>
                  <p>1001 Market Street, Suite 500</p>
                  <p>San Francisco, CA 94103</p>
                  <p>United States</p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-gray-600" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Email</h3>
                <p className="text-gray-600 text-sm">info@platexpress.com</p>
              </div>
            </div>

            {/* Work Time */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-gray-600" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Work Time</h3>
                <div className="text-gray-600 text-sm">
                  <p>Monday To Saturday</p>
                  <p>09:00 AM To 06:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Got A Question? Let's Solve It
          </h2>

          <div className="border border-gray-300 rounded-lg p-6 space-y-6">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              How Can We Help You Today?
            </h3>
            <p className="text-gray-600 text-sm mb-6">
              To Find Answers To Our Most Frequently Asked Questions Or Get In
              Contact With Us, Please Tell Us How We Can Help. For Example, Type
              'edit My Advert'
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <textarea
                name="question"
                placeholder="Enter Your Question"
                value={formData.question}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg px-4 py-2 min-h-[120px] resize-none focus:outline-none w-full"
              />

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#00823A] text-white px-8 py-2 rounded-full cursor-pointer"
                >
                  {isLoading ? "Sending..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
