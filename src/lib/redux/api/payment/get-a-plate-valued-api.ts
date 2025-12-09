import { baseApi } from "../base-api"

interface CreateCheckoutForValuedData {
  [key: string]: unknown
}

export const createCheckoutForValuedApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCheckoutForValued: builder.mutation<unknown, CreateCheckoutForValuedData>({
      query: (data) => ({
        url: "payment_gateway/create-plates-valued-checkout-session",
        method: "POST",
        body: data,
      }),
    }),
  }),
})

export const { useCreateCheckoutForValuedMutation } = createCheckoutForValuedApi
export default createCheckoutForValuedApi
