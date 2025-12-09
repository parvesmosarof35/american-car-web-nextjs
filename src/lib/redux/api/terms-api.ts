import { baseApi } from "./base-api"

interface UpdateTermsAndConditionsParams {
  requestData: FormData
}

export const termsAndConditionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTermsAndConditions: builder.query<unknown, void>({
      query: () => ({
        url: "setting/find_by_terms_conditions",
        method: "GET",
      }),
      providesTags: ["termsAndConditions"],
    }),
    updateTermsAndConditions: builder.mutation<unknown, UpdateTermsAndConditionsParams>({
      query: ({ requestData }) => ({
        url: "setting/terms_conditions",
        method: "POST",
        body: requestData,
      }),
      invalidatesTags: ["termsAndConditions"],
    }),
  }),
})

export const { useGetTermsAndConditionsQuery, useUpdateTermsAndConditionsMutation } = termsAndConditionsApi
