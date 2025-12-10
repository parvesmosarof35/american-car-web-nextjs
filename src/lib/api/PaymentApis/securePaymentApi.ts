import { baseApi } from "../base-api";

const securePaymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Explicitly type: response = any, argument = void (no argument required)
    createPaymentSecure: builder.mutation<any, void>({
      query: () => ({
        url: "payment_gateway/create-onboarding-link",
        method: "POST",
      }),
    }),
  }),
});

export const { useCreatePaymentSecureMutation } = securePaymentApi;
export default securePaymentApi;
