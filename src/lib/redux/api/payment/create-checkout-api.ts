import { baseApi } from "../base-api"

interface CheckoutData {
  [key: string]: unknown
}

export const createCheckoutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCheckout: builder.mutation<unknown, CheckoutData>({
      query: (data) => ({
        url: "payment_gateway/create-checkout-session",
        method: "POST",
        body: data,
      }),
    }),
  }),
})

export const { useCreateCheckoutMutation } = createCheckoutApi
export default createCheckoutApi
