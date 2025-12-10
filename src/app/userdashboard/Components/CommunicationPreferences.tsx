"use client";
import React, { useState } from 'react';

export default function CommunicationPreferences() {
  const [preferences, setPreferences] = useState({
    emailEnquiry: false,
    smsEnquiry: false,
    emailMarketing: false,
    allowBuyersToSee: false,
    emailNews: false
  });

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setPreferences(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSaveChanges = () => {
    alert('Communication preferences saved successfully!');
    // console.log('Preferences saved:', preferences);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-0 py-8 flex items-center justify-center">
      <div className="max-w-4xl mx-auto p-0">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-6xl font-semibold mb-3">
            Communication Preferences
          </h1>
          <p className="opacity-90 text-lg">
            Here you can adjust when we send you messages. If you wish to delete 
            individual search notifications, go to Saved Searches instead.
          </p>
        </div>

        {/* Preferences Form */}
        <div className="space-y-4">
          {/* Email when receive new enquiry */}
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="emailEnquiry"
              name="emailEnquiry"
              checked={preferences.emailEnquiry}
              onChange={handleCheckboxChange}
              className="mt-2 size-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="emailEnquiry" className="text-xl font-semibold text-gray-700 leading-relaxed">
              Send me an email when I receive a new enquiry or message
            </label>
          </div>

          {/* SMS when receive new enquiry */}
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="smsEnquiry"
              name="smsEnquiry"
              checked={preferences.smsEnquiry}
              onChange={handleCheckboxChange}
              className="mt-2 size-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="smsEnquiry" className="text-xl font-semibold text-gray-700 leading-relaxed">
              Send me an SMS when I receive a new enquiry, or when there are unread messages after 3 days
            </label>
          </div>

          {/* Email marketing messages */}
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="emailMarketing"
              name="emailMarketing"
              checked={preferences.emailMarketing}
              onChange={handleCheckboxChange}
              className="mt-2 size-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="emailMarketing" className="text-xl font-semibold text-gray-700 leading-relaxed">
              Enable marketing messages I send and receive
            </label>
          </div>

          {/* Allow potential buyers */}
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="allowBuyersToSee"
              name="allowBuyersToSee"
              checked={preferences.allowBuyersToSee}
              onChange={handleCheckboxChange}
              className="mt-2 size-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="allowBuyersToSee" className="text-xl font-semibold text-gray-700 leading-relaxed">
              Allow potential buyers to see how long ago I last logged in
            </label>
          </div>

          {/* Email news and offers */}
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="emailNews"
              name="emailNews"
              checked={preferences.emailNews}
              onChange={handleCheckboxChange}
              className="mt-2 size-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="emailNews" className="text-xl font-semibold text-gray-700 leading-relaxed">
              Email me occasional news and offers from Plate Trader
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8">
          <button
            onClick={handleSaveChanges}
            className="w-full py-3 px-4 text-white font-medium rounded-md transition-colors duration-200 hover:opacity-90"
            style={{ backgroundColor: '#00823A' }}
          >
            Save Changes
          </button>
        </div>

        {/* Footer Text */}
        <div className="mt-6">
          <p className="text-xs text-gray-500 leading-relaxed">
            You can find out more about how we store and process your personal information in our privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
}