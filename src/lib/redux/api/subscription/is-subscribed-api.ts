import { baseApi } from "../base-api"

interface IsSubscribedParams {
  id: string
}

export const IssubscribedApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    issubscribed: builder.mutation<unknown, IsSubscribedParams>({
      query: ({ id }) => ({
        url: `current_subscribed_buyer/checked_subscribed_buyer/${id}`,
        method: "GET",
      }),
    }),
  }),
})

export const { useIssubscribedMutation } = IssubscribedApi
export default IssubscribedApi
