import { baseApi } from "../base-api"

export const MySubscriptionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    mySubscriptionList: builder.query<unknown, void>({
      query: () => ({
        url: "current_subscribed_buyer/my_subscription_list",
        method: "GET",
      }),
    }),
  }),
})

export const { useMySubscriptionListQuery } = MySubscriptionsApi
export default MySubscriptionsApi
