import { baseApi } from "./base-api"

interface FAQParams {
  [key: string]: unknown
}

interface UpdateFAQParams {
  _id: string
  data: Record<string, unknown>
}

export const faqApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFaq: builder.query<unknown, FAQParams>({
      query: (params) => ({
        url: "faq/findB_by_all_faq",
        method: "GET",
        params,
      }),
      providesTags: ["faq"],
    }),
    getFaqById: builder.query<unknown, string>({
      query: (_id) => ({
        url: `faq/find_by_specific_faq/${_id}`,
        method: "GET",
      }),
      providesTags: ["faq"],
    }),
    createFaq: builder.mutation<unknown, Record<string, unknown>>({
      query: (data) => ({
        url: "faq/create_faq",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["faq"],
    }),
    updateFaq: builder.mutation<unknown, UpdateFAQParams>({
      query: ({ _id, data }) => ({
        url: `faq/update_faq/${_id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["faq"],
    }),
    deleteFaq: builder.mutation<unknown, string>({
      query: (_id) => ({
        url: `faq/delete_faq/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["faq"],
    }),
  }),
})

export const {
  useGetAllFaqQuery,
  useGetFaqByIdQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} = faqApi

export default faqApi
