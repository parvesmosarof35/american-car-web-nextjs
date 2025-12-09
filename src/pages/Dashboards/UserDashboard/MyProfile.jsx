import React, { useState, useEffect } from 'react';
import { useGetProfileQuery, useUpdateProfileMutation } from '../../../Redux/api/profileApi';
import Swal from 'sweetalert2';

export default function MyProfile() {
  // const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { data, refetch } = useGetProfileQuery();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: 'Male',
    phoneNumber: '',
    emailAddress: '',
    address: ''
  });
  const [photo, setPhoto] = useState(null);

  // 🟢 Populate default form values from API
  useEffect(() => {
    if (data?.data) {
      setFormData({
        firstName: data.data.fastname || '',
        lastName: data.data.lastname || '',
        gender: data.data.male || 'Male',
        phoneNumber: data.data.phoneNumber || '',
        emailAddress: data.data.email || '',
        address: data.data.address || ''
      });
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSave = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('fastname', formData.firstName);
      formDataToSend.append('lastname', formData.lastName);
      formDataToSend.append('male', formData.gender);
      // Phone validation: send empty string if none; require min length 7 when provided
      const phone = (formData.phoneNumber || '').trim();
      if (phone.length === 0) {
        formDataToSend.append('phoneNumber', '');
      } else if (phone.length < 7) {
        Swal.fire({
          icon: 'warning',
          title: 'Invalid Phone Number',
          text: 'Phone number must be at least 7 digits.',
        });
        return;
      } else {
        formDataToSend.append('phoneNumber', phone);
      }
      formDataToSend.append('address', formData.address);

      if (photo) formDataToSend.append('file', photo);

      await updateProfile(formDataToSend).unwrap();

      Swal.fire({
        icon: 'success',
        title: 'Profile Updated',
        text: 'Your profile has been updated successfully!',
      });

      refetch(); // Refresh profile data
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error updating profile',
        text: error?.data?.message || 'Something went wrong!',
      });
    }
  };

  // const handleDeleteAccount = () => setShowDeleteModal(true);
  // const confirmDelete = () => {
  //   alert('Account deletion process initiated.');
  //   setShowDeleteModal(false);
  // };
  // const cancelDelete = () => setShowDeleteModal(false);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="max-w-2xl mx-auto rounded-lg p-8 bg-white shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center justify-center">
          {/* First Name */}
          <div className="form-group">
            <label htmlFor="firstName" className="block mb-2 font-bold text-[#1B1B1B] text-lg">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Your first name"
              className="w-full px-4 py-3 border border-gray-700 rounded-md text-base bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Last Name */}
          <div className="form-group">
            <label htmlFor="lastName" className="block mb-2 font-bold text-[#1B1B1B] text-lg">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Your last name"
              className="w-full px-4 py-3 border border-gray-700 rounded-md text-base bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Gender */}
          <div className="form-group relative">
            <label htmlFor="gender" className="block mb-2 font-bold text-[#1B1B1B] text-lg">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full px-4 pr-10 py-3 border border-gray-700 rounded-md text-base bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
          
            </select>
            {/* Custom dropdown caret shifted 10px from the right */}
            <span
              className="pointer-events-none absolute inset-y-0 flex items-center text-gray-700"
              style={{ right: '10px' , top: '70%', transform: 'translateY(-50%)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </span>
          </div>

          {/* Phone Number */}
          <div className="form-group">
            <label htmlFor="phoneNumber" className="block mb-2 font-bold text-[#1B1B1B] text-lg">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              required={false}
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Your phone number"
              className="w-full px-4 py-3 border border-gray-700 rounded-md text-base bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Address */}
          <div className="form-group md:col-span-2">
            <label htmlFor="address" className="block mb-2 font-bold text-[#1B1B1B] text-lg">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Your address"
              className="w-full px-4 py-3 border border-gray-700 rounded-md text-base bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Profile Image */}
          <div className="form-group md:col-span-2">
            <label htmlFor="photo" className="block mb-2 font-bold text-[#1B1B1B] text-lg">
              Profile Image
            </label>
            <input
              type="file"
              id="photo"
              name="photo"
              onChange={handleFileChange}
              className="w-full px-4 py-3 border border-gray-700 rounded-md text-base bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={isLoading}
          className={`w-full mt-8 py-3 px-4 cursor-pointer text-white font-medium rounded-md transition-colors duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          style={{ backgroundColor: "#00823A" }}
        >
          Save Updated
        </button>

        {/* Footer Links */}
        {/* <div className="flex justify-between items-center mt-6 text-sm">
          <span className="text-gray-600">Want to close your account entirely?</span>
          <button
            onClick={handleDeleteAccount}
            className="text-gray-700 underline hover:text-gray-900 transition-colors duration-200"
          >
            Want to delete your account?
          </button>
        </div> */}

        {/* Delete Confirmation Modal */}
        {/* {showDeleteModal && (
          <div className="fixed inset-0 bg-white/30 backdrop-blur-xs flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl">
              <h2 className="text-xl font-semibold text-gray-900 text-center mb-8">
                Confirm deleting your Account?
              </h2>

              <div className="flex gap-4">
                <button
                  onClick={cancelDelete}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-6 py-3 text-white font-medium rounded-md transition-colors duration-200 hover:opacity-90"
                  style={{ backgroundColor: "#00823A" }}
                >
                  Yes, Confirm
                </button>
              </div>
            </div>
          </div>
        )} */}


      </div>
    </div>
  );
}
