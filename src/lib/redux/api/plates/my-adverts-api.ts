import { baseApi } from "../base-api"

interface UpdateAdvertParams {
  advertId: string
  data: FormData
}

interface AdvertData {
  [key: string]: unknown
}

export const myAdvertsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyAdverts: builder.query<unknown, void>({
      query: () => ({
        url: "plates_sales/myAdverts",
        method: "GET",
      }),
      providesTags: ["plates"],
    }),
    getMyAdvertStatistics: builder.query<unknown, string>({
      query: (id) => ({
        url: `plates_sales/find_by_statistics/${id}`,
        method: "GET",
      }),
      providesTags: ["plates"],
    }),
    deleteAdvert: builder.mutation<unknown, string>({
      query: (advertId) => ({
        url: `plates_sales/delete_plate_sales/${advertId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["plates"],
    }),
    updateAdvert: builder.mutation<unknown, UpdateAdvertParams>({
      query: ({ advertId, data }) => ({
        url: `plates_sales/update_plate_sales/${advertId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["plates"],
    }),
    addAdvert: builder.mutation<unknown, FormData>({
      query: (formData) => ({
        url: "plates_sales/create_plates_sales",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["plates"],
    }),
  }),
})

export const {
  useGetMyAdvertsQuery,
  useGetMyAdvertStatisticsQuery,
  useDeleteAdvertMutation,
  useUpdateAdvertMutation,
  useAddAdvertMutation,
} = myAdvertsApi
