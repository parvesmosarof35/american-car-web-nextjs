import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { RootState } from "@/lib/store"

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "https://efforts-minnesota-relates-denied.trycloudflare.com/api/v1/",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState
    const token = state?.auth?.token
    if (token) {
      headers.set("Authorization", token)
    }
    return headers
  },
})

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery,
  endpoints: () => ({}),
  tagTypes: ["admin", "dashboard", "user", "subscription", "auth", "plates_sales"],
})
