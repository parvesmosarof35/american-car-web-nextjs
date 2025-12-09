import { useEffect, useRef, useState } from "react";
import {wsUrl} from "../config/envConfig";

export default function useChatSocket(channelName, senderId) {
  const socketRef = useRef(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socketRef.current = new WebSocket(wsUrl);

    socketRef.current.onopen = () => {
      console.log("✅ Connected to WebSocket server");

      // subscribe to channel
      const subscribePayload = {
        type: "subscribe",
        channelName,
      };
      socketRef.current.send(JSON.stringify(subscribePayload));

      console.log(`📡 Subscribed to channel: ${channelName}`);
    };

    socketRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("📥 Incoming WS message:", data);

        if (data.type === "message" && data.data) {
          // unwrap payload
          setMessages((prev) => [...prev, data.data]);
        }
      } catch (err) {
        console.error("❌ Failed to parse WS message:", event.data, err);
      }
    };

    socketRef.current.onerror = (err) => {
      console.error("❌ WebSocket error:", err);
    };

    socketRef.current.onclose = () => {
      console.log(`🔌 WebSocket closed (unsubscribed from ${channelName})`);
    };

    // cleanup on unmount
    return () => {
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.close();
      }
    };
  }, [channelName]);

  // send message via socket
  const sendMessage = (message, file = null) => {
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      console.warn("⚠️ WebSocket not open, message not sent");
      return;
    }

    const msgData = {
      type: "message",
      channelName,
      senderId,
      message,
      files: file ? [file.name] : [],
    };

    console.log("📤 Sending message:", msgData);
    socketRef.current.send(JSON.stringify(msgData));
  };

  return { messages, sendMessage };
}
