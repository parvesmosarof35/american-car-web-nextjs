import { baseApi } from "../base-api";



const createCheckoutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCheckout: builder.mutation({
      query: (data) => ({
        url: "payment_gateway/create-checkout-session",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateCheckoutMutation } = createCheckoutApi;
export default createCheckoutApi;
