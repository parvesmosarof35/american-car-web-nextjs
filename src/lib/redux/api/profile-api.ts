import { baseApi } from "./base-api"

interface UpdateProfileData {
  [key: string]: unknown
}

interface ChangePasswordData {
  currentPassword: string
  newPassword: string
}

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<unknown, void>({
      query: () => ({
        url: "auth/myprofile",
        method: "GET",
      }),
      providesTags: ["auth"],
    }),
    getAdminProfile: builder.query<unknown, void>({
      query: () => ({
        url: "auth/profile",
        method: "GET",
      }),
      providesTags: ["auth"],
    }),
    updateProfile: builder.mutation<unknown, FormData>({
      query: (formData) => ({
        url: "auth/update_my_profile",
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["auth"],
    }),
    changeAdminPassword: builder.mutation<unknown, ChangePasswordData>({
      query: (data) => ({
        url: "user/change_password",
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
    }),
  }),
})

export const { useGetProfileQuery, useGetAdminProfileQuery, useUpdateProfileMutation, useChangeAdminPasswordMutation } =
  profileApi
