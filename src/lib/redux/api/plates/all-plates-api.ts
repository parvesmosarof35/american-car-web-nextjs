import { baseApi } from "../base-api"

interface GetAllPlatesParams {
  page: number
  limit: number
  searchTerm: string
}

export const allPlatesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPlates: builder.query<unknown, GetAllPlatesParams>({
      query: ({ page, limit, searchTerm }) => ({
        url: `plates_sales/find_by_all_listed_sales_plate?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
        method: "GET",
      }),
      providesTags: ["listedPlates"],
    }),
  }),
})

export const { useGetAllPlatesQuery } = allPlatesApi
