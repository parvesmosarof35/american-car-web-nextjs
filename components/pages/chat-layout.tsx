"use client"

import { useState, useRef, useEffect, useMemo, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { FiMenu, FiMoreVertical } from "react-icons/fi"
import { RiSendPlane2Fill } from "react-icons/ri"
import { ImCross } from "react-icons/im"
import { jwtDecode } from "jwt-decode"
import Swal from "sweetalert2"
import { useAppSelector } from "@/lib/hooks"
import type { ChatMessage, ChatChannel } from "@/lib/types/chat"

interface MessageFormats extends ChatMessage {
  files?: string[]
  senderId?: { _id: string } | string
}

export default function ChatLayout() {
  const [showSidebar, setShowSidebar] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [page, setPage] = useState(1)
  const [limit] = useState(20)
  const [hasMore, setHasMore] = useState(true)
  const [messages, setMessages] = useState<MessageFormats[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [activeChannel, setActiveChannel] = useState<string | null>(null)
  const [activePeer, setActivePeer] = useState<{ id: string; name: string; avatar?: string } | null>(null)

  const searchParams = useSearchParams()
  const router = useRouter()
  const listRef = useRef<HTMLDivElement>(null)

  // Get current channel from URL
  const currentChannelName = searchParams.get("channel") || ""

  // Get token from Redux
  const token = useAppSelector((state) => state.auth.token)
  const decoded = token ? jwtDecode<{ id: string; email: string }>(token) : null
  const myId = decoded?.id

  // const { data: chatsData, isLoading: chatsLoading } = useGetChannelChatHistoryQuery()
  // const { data: chatDetailData, refetch } = useChannelChatDetailsQuery([activeChannel, page, limit])

  const allChats: ChatChannel[] = [] // Replace with actual data from RTK Query

  useEffect(() => {
    setPage(1)
    setHasMore(true)
  }, [activeChannel])

  useEffect(() => {
    if (allChats.length === 0) return

    const chatFromUrl = currentChannelName ? allChats.find((c) => c.channelName === currentChannelName) : null

    if (chatFromUrl) {
      setActiveChannel(chatFromUrl.channelName)
      setActivePeer({
        id: chatFromUrl.partnerId,
        name: chatFromUrl.partnerName,
        avatar: chatFromUrl.partnerAvatar,
      })
    } else if (!activeChannel && allChats.length > 0) {
      const first = allChats[0]
      setActiveChannel(first.channelName)
      setActivePeer({
        id: first.partnerId,
        name: first.partnerName,
        avatar: first.partnerAvatar,
      })
    }
  }, [allChats, currentChannelName])

  const sortByCreatedAtAsc = (arr: MessageFormats[]): MessageFormats[] =>
    [...arr].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())

  const formatTime = (ts: string): string => new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

  useEffect(() => {
    if (!listRef.current) return
    const el = listRef.current
    requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight
    })
  }, [messages])

  const handleSend = useCallback(async () => {
    if (!newMessage.trim() && !file) return
    if (!activeChannel || !myId) return

    const tempMessage: MessageFormats = {
      _id: `temp-${Date.now()}`,
      message: newMessage || "",
      senderId: myId,
      createdAt: new Date().toISOString(),
      files: file ? [URL.createObjectURL(file)] : [],
    }
    setMessages((prev) => [...prev, tempMessage])

    // if (file) {
    //   const formData = new FormData()
    //   formData.append("type", "message")
    //   formData.append("channelName", activeChannel)
    //   formData.append("senderId", myId)
    //   formData.append("message", newMessage || "")
    //   formData.append("files", file)
    //   await handleImgMSG(formData).unwrap()
    // } else {
    //   sendMessage(newMessage)
    // }

    setNewMessage("")
    setFile(null)
  }, [newMessage, file, activeChannel, myId])

  const handleDeleteMessage = useCallback(async (messageId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this message?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    })

    if (result.isConfirmed) {
      try {
        // await handleDeleteMSG(messageId).unwrap()
        Swal.fire("Deleted!", "Your message has been deleted.", "success")
      } catch (err) {
        Swal.fire("Error", "Failed to delete message.", "error")
      }
    }
  }, [])

  const handleReportUser = useCallback(
    (userId: string, userName: string, userEmail?: string) => {
      Swal.fire({
        title: `Report ${userName || "this user"}?`,
        text: "Do you want to report this user for inappropriate behavior?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, report",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push(
            `/contact-us?reportedUserId=${userId}&reportedUserName=${userName}&reporterEmail=${userEmail || ""}`,
          )
          Swal.fire("Reported!", "The user has been reported.", "success")
        }
      })
    },
    [router],
  )

  const headerPeer = useMemo(() => {
    if (activePeer) return activePeer
    const found = allChats.find((c) => c.channelName === activeChannel)
    if (!found) return null
    return {
      id: found.partnerId,
      name: found.partnerName,
      avatar: found.partnerAvatar,
    }
  }, [activePeer, allChats, activeChannel])

  return (
    <div className="flex flex-col h-screen bg-white pt-20">
      {/* Top Bar */}
      <div className="p-5 border-b border-gray-200 flex md:flex-row flex-row-reverse items-center justify-between md:justify-start">
        <button
          className="md:hidden mr-3 text-gray-600"
          onClick={() => setShowSidebar(!showSidebar)}
          aria-label="Open conversations"
        >
          {showSidebar ? <ImCross className="text-2xl text-gray-400" /> : <FiMenu className="text-2xl" />}
        </button>
        <h1 className="text-[#3c3d37] text-3xl font-bold">Messages</h1>
      </div>

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div
          className={`absolute md:relative md:top-0 left-0 w-80 md:w-96 bg-white flex flex-col border-r border-gray-200 transition-transform duration-300 z-20 ${
            showSidebar ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="overflow-y-auto flex-1">
            {allChats.map((chat) => {
              const isActive = chat.channelName === activeChannel

              return (
                <div
                  key={chat._id}
                  onClick={() => {
                    setActiveChannel(chat.channelName)
                    setActivePeer({
                      id: chat.partnerId,
                      name: chat.partnerName,
                      avatar: chat.partnerAvatar,
                    })
                    if (window.innerWidth < 768) setShowSidebar(false)
                  }}
                  className={`flex items-center gap-3 p-4 cursor-pointer border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    isActive ? "bg-yellow-50 border-r-4 border-yellow-400" : ""
                  }`}
                >
                  <div className="relative">
                    {chat.partnerAvatar ? (
                      <img
                        src={chat.partnerAvatar || "/placeholder.svg"}
                        alt={chat.partnerName || "user"}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
                        {(chat.partnerName?.[0] || "?").toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">{chat.partnerName}</h3>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          {activeChannel && (
            <div className="px-6 py-4 bg-white border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  {headerPeer?.avatar ? (
                    <img
                      src={headerPeer.avatar || "/placeholder.svg"}
                      alt={headerPeer?.name || "user"}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
                      {(headerPeer?.name?.[0] || "?").toUpperCase()}
                    </div>
                  )}
                </div>
                <h2 className="text-lg font-semibold text-gray-900">{headerPeer?.name || activeChannel}</h2>
              </div>

              <button
                onClick={() => handleReportUser(activePeer?.id || "", headerPeer?.name || "", decoded?.email)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiMoreVertical className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Messages Container */}
          <div ref={listRef} className="flex-1 overflow-auto bg-gray-50 p-4 space-y-4">
            {!activeChannel ? (
              <p className="text-gray-500">Select a conversation to start</p>
            ) : messages.length === 0 ? (
              <p className="text-gray-500">No messages yet.</p>
            ) : (
              messages.map((msg) => {
                const sid = typeof msg.senderId === "string" ? msg.senderId : msg.senderId?._id
                const isMine = sid === myId

                return (
                  <div key={msg._id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-xs lg:max-w-md xl:max-w-lg rounded-2xl p-4 ${
                        isMine ? "bg-[#00823b] text-white" : "bg-white text-gray-900 shadow-sm border border-gray-200"
                      }`}
                    >
                      {msg.files && msg.files.length > 0 && (
                        <div className="mb-2 space-y-2">
                          {msg.files.map((file, idx) => (
                            <img
                              key={idx}
                              src={file || "/placeholder.svg"}
                              alt={`Message attachment ${idx + 1}`}
                              className="rounded max-w-xs"
                            />
                          ))}
                        </div>
                      )}
                      {msg.message && <p>{msg.message}</p>}
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {/* Message Input */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00823b]"
              />
              <button onClick={handleSend} className="px-4 py-2 bg-[#00823b] text-white rounded-lg hover:bg-[#006f2e]">
                <RiSendPlane2Fill className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
