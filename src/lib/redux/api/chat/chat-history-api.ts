import { baseApi } from "../base-api"

interface ChannelChatDetailsParams {
  channelName: string
  page?: number
  limit?: number
}

interface HandleImgMSGData {
  [key: string]: unknown
}

export const chatHistoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getChannelChatHistory: builder.query<unknown, void>({
      query: () => "channel/my_channel",
      providesTags: ["ChannelChatHistory"],
    }),
    channelChatDetails: builder.query<unknown, [string, number?, number?]>({
      query: ([channelName, page = 1, limit = 20]) =>
        `message/plate_ways_chat_history/${channelName}?page=${page}&limit=${limit}`,
      providesTags: ["ChannelChatDetails"],
    }),
    handleImgMSG: builder.mutation<unknown, FormData>({
      query: (formData) => ({
        url: "message/send_message",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["ChannelChatDetails"],
    }),
    handleDeleteMSG: builder.mutation<unknown, string>({
      query: (messageId) => ({
        url: `message/delete_message/${messageId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ChannelChatDetails"],
    }),
  }),
})

export const {
  useGetChannelChatHistoryQuery,
  useChannelChatDetailsQuery,
  useHandleImgMSGMutation,
  useHandleDeleteMSGMutation,
} = chatHistoryApi
export default chatHistoryApi
