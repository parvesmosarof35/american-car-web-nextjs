import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { RootState } from "../store"
import { getBaseUrl } from "@/config/env-config"

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: getBaseUrl(),
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState
      const token = state?.auth?.token
      if (token) {
        headers.set("Authorization", token)
      }
      return headers
    },
  }),
  endpoints: () => ({}),
  tagTypes: [
    "admin",
    "dashboard",
    "user",
    "subscription",
    "auth",
    "plates_sales",
    "blog",
    "contact",
    "faq",
    "aboutUs",
    "privacy",
    "termsAndConditions",
    "plates",
    "listedPlates",
    "savedPlates",
    "singlePlate",
    "similarPlates",
    "soldPlates",
    "ChannelChatHistory",
    "ChannelChatDetails",
  ],
})
