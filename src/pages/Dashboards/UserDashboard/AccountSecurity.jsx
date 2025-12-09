import React, { useState } from 'react';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';

import Swal from 'sweetalert2';
import { useChangeAdminPasswordMutation } from '../../../Redux/api/profileApi';

export default function AccountSecurity() {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [formValues, setFormValues] = useState({
    old_password: '',
    password: '',
    confirm_password: ''
  });

  const [changeAdminPassword, { isLoading }] = useChangeAdminPasswordMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const toggleShowPassword = (field) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    const { old_password, password, confirm_password } = formValues;

    if (!old_password || !password || !confirm_password) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Fields',
        text: 'Please fill in all required fields.'
      });
      return;
    }

    if (password !== confirm_password) {
      Swal.fire({
        icon: 'error',
        title: 'Password Mismatch',
        text: 'The passwords do not match. Please try again.'
      });
      return;
    }

    try {
      await changeAdminPassword({
        oldpassword: old_password,
        newpassword: password,
        confirm_password
      }).unwrap();

      Swal.fire({
        icon: 'success',
        title: 'Password Updated',
        text: 'Your password has been updated successfully.'
      });

      setFormValues({
        old_password: '',
        password: '',
        confirm_password: ''
      });
    } catch (error) {
      const apiMsg = error?.data?.errorSources?.[0]?.message
        || error?.data?.message
        || 'An error occurred. Please try again.';
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: apiMsg
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="max-w-4xl mx-auto rounded-lg p-8 bg-white shadow-md">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-semibold mb-3">Account Security</h1>
          <p className="opacity-90 text-lg">You can change your account password below.</p>
        </div>

        <form className="space-y-6" onSubmit={handleSaveChanges}>
          {/* Current Password */}
          <div className="form-group relative">
            <label htmlFor="old_password" className="block mb-2 font-bold text-[#1B1B1B] text-lg">
              Current Password
            </label>
            <input
              type={showPassword.current ? 'text' : 'password'}
              id="old_password"
              name="old_password"
              value={formValues.old_password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-base bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span
              className="absolute right-4 top-12 cursor-pointer text-gray-500"
              onClick={() => toggleShowPassword('current')}
            >
              {showPassword.current ? <IoEyeOutline size={20} /> : <IoEyeOffOutline size={20} />}
            </span>
          </div>

          {/* New Password */}
          <div className="form-group relative">
            <label htmlFor="password" className="block mb-2 font-bold text-[#1B1B1B] text-lg">
              New Password
            </label>
            <input
              type={showPassword.new ? 'text' : 'password'}
              id="password"
              name="password"
              value={formValues.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-base bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span
              className="absolute right-4 top-12 cursor-pointer text-gray-500"
              onClick={() => toggleShowPassword('new')}
            >
              {showPassword.new ? <IoEyeOutline size={20} /> : <IoEyeOffOutline size={20} />}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="form-group relative">
            <label htmlFor="confirm_password" className="block mb-2 font-bold text-[#1B1B1B] text-lg">
              Confirm Password
            </label>
            <input
              type={showPassword.confirm ? 'text' : 'password'}
              id="confirm_password"
              name="confirm_password"
              value={formValues.confirm_password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-base bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span
              className="absolute right-4 top-12 cursor-pointer text-gray-500"
              onClick={() => toggleShowPassword('confirm')}
            >
              {showPassword.confirm ? <IoEyeOutline size={20} /> : <IoEyeOffOutline size={20} />}
            </span>
          </div>

          {/* Save Button */}
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 text-white font-medium rounded-md transition-colors duration-200 hover:opacity-90 cursor-pointer ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              style={{ backgroundColor: '#00823A' }}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
