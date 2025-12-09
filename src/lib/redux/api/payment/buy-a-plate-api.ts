import { baseApi } from "../base-api"

interface BuyPlateData {
  [key: string]: unknown
}

export const buyAPlateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBuyerSellerCheckoutSession: builder.mutation<unknown, BuyPlateData>({
      query: (data) => ({
        url: "payment_gateway/create-buyer-seller-checkout-session",
        method: "POST",
        body: data,
      }),
    }),
  }),
})

export const { useCreateBuyerSellerCheckoutSessionMutation } = buyAPlateApi
export default buyAPlateApi
