import { baseApi } from "./base-api"

interface GetAllplatesSalesParams {
  [key: string]: unknown
}

export const platesSalesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllplatesSales: builder.query<unknown, GetAllplatesSalesParams>({
      query: (params) => ({
        url: "plates_sales/find_by_all_listed_sales_plate",
        method: "GET",
        params: { ...params },
      }),
      providesTags: ["plates_sales"],
    }),
  }),
})

export const { useGetAllplatesSalesQuery } = platesSalesApi

export default platesSalesApi
