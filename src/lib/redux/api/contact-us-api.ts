import { baseApi } from "./base-api"

interface ContactUsData {
  [key: string]: unknown
}

export const contactUsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createContactUs: builder.mutation<unknown, ContactUsData>({
      query: (data) => ({
        url: "contact/create_contact",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["contact"],
    }),
  }),
})

export const { useCreateContactUsMutation } = contactUsApi
export default contactUsApi
