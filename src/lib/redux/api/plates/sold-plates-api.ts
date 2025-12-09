import { baseApi } from "../base-api"

interface GetSoldPlatesParams {
  page: number
  limit: number
}

export const soldPlatesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSoldPlates: builder.query<unknown, GetSoldPlatesParams>({
      query: ({ page, limit }) => ({
        url: `plates_sales/find_by_all_sold_plate_sales_list?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["soldPlates"],
    }),
  }),
})

export const { useGetSoldPlatesQuery } = soldPlatesApi
