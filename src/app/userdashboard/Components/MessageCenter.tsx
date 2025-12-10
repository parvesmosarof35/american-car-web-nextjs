"use client";

import React, { useState } from "react";

export default function MessageCenter() {
  const [activeTab, setActiveTab] = useState<"inbox" | "sent">("inbox");
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);

  const mockMessages = [
    {
      id: 1,
      sender: "John Smith",
      subject: "Interest in AB12 CDE plate",
      message:
        "Hi, I'm very interested in your AB12 CDE plate. Is it still available?",
      date: "2024-01-20",
      isRead: false,
    },
    {
      id: 2,
      sender: "Plate Trader Team",
      subject: "Your advert has been approved",
      message: "Your advert for XY99 ZZZ has been approved and is now live.",
      date: "2024-01-19",
      isRead: true,
    },
    {
      id: 3,
      sender: "Sarah Wilson",
      subject: "Offer for your plate",
      message:
        "I would like to make an offer of £8000 for your premium registration plate.",
      date: "2024-01-18",
      isRead: true,
    },
  ];

  const selectedMessageData = mockMessages.find(
    (msg) => msg.id === selectedMessage
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Message Center
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow">
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab("inbox")}
                    className={`flex-1 py-3 px-4 text-center font-medium ${
                      activeTab === "inbox"
                        ? "border-b-2 border-[#00823A] text-[#00823A]"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Inbox
                  </button>
                  <button
                    onClick={() => setActiveTab("sent")}
                    className={`flex-1 py-3 px-4 text-center font-medium ${
                      activeTab === "sent"
                        ? "border-b-2 border-[#00823A] text-[#00823A]"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Sent
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="divide-y divide-gray-200">
                {mockMessages.map((message) => (
                  <div
                    key={message.id}
                    onClick={() => setSelectedMessage(message.id)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedMessage === message.id ? "bg-blue-50" : ""
                    } ${!message.isRead ? "bg-blue-50" : ""}`}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 text-sm">
                          {message.sender}
                        </h3>
                        <p className="text-sm text-gray-900 font-medium truncate">
                          {message.subject}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">{message.date}</p>
                    {!message.isRead && (
                      <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Message Content */}
          <div className="lg:col-span-2">
            {selectedMessageData ? (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="border-b border-gray-200 pb-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {selectedMessageData.subject}
                    </h2>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        From: {selectedMessageData.sender}
                      </p>
                      <p className="text-xs text-gray-500">
                        {selectedMessageData.date}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="prose max-w-none">
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {selectedMessageData.message}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-[#00823A] text-white rounded-md hover:bg-green-700 transition-colors">
                      Reply
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                      Forward
                    </button>
                    <button className="px-4 py-2 text-red-600 hover:text-red-800 transition-colors">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ) : (
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
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Select a message
                </h3>
                <p className="text-gray-600">
                  Choose a message from the list to view its content
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
