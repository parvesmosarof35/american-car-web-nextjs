import { baseApi } from "./base-api"

interface UpdateAboutUsParams {
  requestData: FormData
}

export const aboutUsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAboutUs: builder.query<unknown, void>({
      query: () => ({
        url: "setting/find_by_about_us",
        method: "GET",
      }),
      providesTags: ["aboutUs"],
    }),
    updateAboutUs: builder.mutation<unknown, UpdateAboutUsParams>({
      query: ({ requestData }) => ({
        url: "setting/about",
        method: "POST",
        body: requestData,
      }),
      invalidatesTags: ["aboutUs"],
    }),
  }),
})

export const { useGetAboutUsQuery, useUpdateAboutUsMutation } = aboutUsApi
