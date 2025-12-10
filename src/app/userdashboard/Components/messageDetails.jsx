import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {jwtDecode} from "jwt-decode";
import { useChannelChatDetailsQuery } from "../../../Redux/api/Chat/chatHistoryApi";
import useChatSocket from "../../../hooks/useChatSocket";

export default function MessageDetails() {
  const { id: channelName } = useParams(); // channelName from route
  const token = useSelector((state) => state.auth.token);
  const decoded = token ? jwtDecode(token) : null;
  const myId = decoded?.id; // get senderId from JWT

  // Socket hook for real-time
  const { messages: socketMessages, sendMessage } = useChatSocket(channelName, myId);

  // API query for past messages
  const { data, isLoading } = useChannelChatDetailsQuery(channelName);
  const [messages, setMessages] = useState([]);

  const chatEndRef = useRef(null);

  // Combine API + WebSocket messages
  useEffect(() => {
    if (data?.data?.all_chat) {
      // reverse so latest comes last
      setMessages(data.data.all_chat);
    }
  }, [data]);

  // Append incoming WebSocket messages in real-time
  useEffect(() => {
    if (socketMessages && socketMessages.length > 0) {
      setMessages((prev) => [...prev, ...socketMessages]);
    }
  }, [socketMessages]);

  // Auto scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const tempMessage = {
      _id: `temp-${Date.now()}`,
      message: newMessage,
      senderId: myId,
      createdAt: new Date().toISOString(),
      files: [],
    };
    setMessages((prev) => [...prev, tempMessage]);

    sendMessage(newMessage);
    setNewMessage("");
  };

  if (isLoading) return <div>Loading messages...</div>;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-4 pt-40">
      {/* Chat box */}
      <div className="w-full max-w-2xl h-[70vh] overflow-y-auto border rounded-lg bg-white p-4 flex flex-col gap-2 mb-4">
        {messages.length === 0 && (
          <p className="text-gray-400 text-center">No messages yet</p>
        )}

        {messages.map((msg) => {
          const isMine = msg.senderId?._id === myId || msg.senderId === myId;

          return (
            <div
              key={msg._id}
              className={`flex flex-col p-2 rounded-lg max-w-[70%] break-words ${
                isMine ? "self-end bg-blue-100" : "self-start bg-gray-100"
              }`}
            >
              <span className="text-sm font-semibold mb-1">
                {isMine ? "You" : msg.senderId?.fastname || msg.senderId}
              </span>

              {msg.message && <p>{msg.message}</p>}

              {msg.files && msg.files.length > 0 && (
                <div className="mt-1" ref={chatEndRef}>
                  {msg.files.map((f, idx) => (
                    <span key={idx} className="text-sm text-gray-500 block">
                      📎 {f}
                    </span>
                  ))}
                </div>
              )}

              <span className="text-xs text-gray-400 mt-1">
                {new Date(msg.createdAt).toLocaleString()}
              </span>
            </div>
          );
        })}

        {/* Dummy div to auto-scroll */}
        <div  />
      </div>

      {/* Input box */}
      <div className="flex w-full max-w-2xl gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border p-2 rounded-lg"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
