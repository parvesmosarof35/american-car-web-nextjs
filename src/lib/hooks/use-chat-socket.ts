"use client"

import { useEffect, useRef, useState } from "react"
import { wsUrl } from "../config/env-config"

interface Message {
  type: string
  data?: unknown
}

interface ChatSocketReturn {
  messages: Message[]
  sendMessage: (message: string, file?: File | null) => void
}

export function useChatSocket(channelName: string, senderId: string): ChatSocketReturn {
  const socketRef = useRef<WebSocket | null>(null)
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    socketRef.current = new WebSocket(wsUrl)

    socketRef.current.onopen = () => {
      console.log("✅ Connected to WebSocket server")

      // subscribe to channel
      const subscribePayload = {
        type: "subscribe",
        channelName,
      }
      socketRef.current?.send(JSON.stringify(subscribePayload))

      console.log(`📡 Subscribed to channel: ${channelName}`)
    }

    socketRef.current.onmessage = (event) => {
      try {
        const data: Message = JSON.parse(event.data)
        console.log("📥 Incoming WS message:", data)

        if (data.type === "message" && data.data) {
          // unwrap payload
          setMessages((prev) => [...prev, data])
        }
      } catch (err) {
        console.error("❌ Failed to parse WS message:", event.data, err)
      }
    }

    socketRef.current.onerror = (err) => {
      console.error("❌ WebSocket error:", err)
    }

    socketRef.current.onclose = () => {
      console.log(`🔌 WebSocket closed (unsubscribed from ${channelName})`)
    }

    // cleanup on unmount
    return () => {
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.close()
      }
    }
  }, [channelName])

  // send message via socket
  const sendMessage = (message: string, file: File | null = null) => {
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      console.warn("⚠️ WebSocket not open, message not sent")
      return
    }

    const msgData = {
      type: "message",
      channelName,
      senderId,
      message,
      files: file ? [file.name] : [],
    }

    console.log("📤 Sending message:", msgData)
    socketRef.current.send(JSON.stringify(msgData))
  }

  return { messages, sendMessage }
}
