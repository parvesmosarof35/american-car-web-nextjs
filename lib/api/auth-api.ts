import { baseApi } from "./base-api"

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfile: builder.query({
      query: () => ({
        url: "auth/me",
        method: "GET",
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (userData) => ({
        url: "auth/signup",
        method: "POST",
        body: userData,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
    }),
  }),
})

export const { useGetMyProfileQuery, useLoginMutation, useSignupMutation, useLogoutMutation } = authApi
