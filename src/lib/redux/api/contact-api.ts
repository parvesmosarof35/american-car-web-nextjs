import { baseApi } from "./base-api"

interface ContactData {
  [key: string]: unknown
}

interface ContactParams {
  [key: string]: unknown
}

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createContact: builder.mutation<unknown, ContactData>({
      query: (data) => ({
        url: "contact/create_contact",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["contact"],
    }),
    getAllContact: builder.query<unknown, ContactParams>({
      query: (params) => ({
        url: "contact/all_contact",
        method: "GET",
        params,
      }),
      providesTags: ["contact"],
    }),
    deleteContact: builder.mutation<unknown, string>({
      query: (_id) => ({
        url: `contact/delete_contact/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["contact"],
    }),
  }),
})

export const { useGetAllContactQuery, useCreateContactMutation, useDeleteContactMutation } = contactApi

export default contactApi
