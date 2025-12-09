import { baseApi } from "../base-api"

export const securePaymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPaymentSecure: builder.mutation<unknown, void>({
      query: () => ({
        url: "payment_gateway/create-onboarding-link",
        method: "POST",
      }),
    }),
  }),
})

export const { useCreatePaymentSecureMutation } = securePaymentApi
export default securePaymentApi
