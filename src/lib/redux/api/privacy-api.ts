import { baseApi } from "./base-api"

interface UpdatePrivacyParams {
  requestData: FormData
}

export const privacyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPrivacy: builder.query<unknown, void>({
      query: () => ({
        url: "setting/find_by_privacy_policyss",
        method: "GET",
      }),
      providesTags: ["privacy"],
    }),
    updatePrivacy: builder.mutation<unknown, UpdatePrivacyParams>({
      query: ({ requestData }) => ({
        url: "setting/privacy_policys",
        method: "POST",
        body: requestData,
      }),
      invalidatesTags: ["privacy"],
    }),
  }),
})

export const { useGetPrivacyQuery, useUpdatePrivacyMutation } = privacyApi
