import { baseApi } from "../base-api"

export const mySavedPlatesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMySavedPlates: builder.query<unknown, void>({
      query: () => ({
        url: "plates_sales/my_save_plate_sales",
        method: "GET",
      }),
      providesTags: ["savedPlates"],
    }),
    addToSavedPlates: builder.mutation<unknown, string>({
      query: (plateId) => ({
        url: `plates_sales/save_plate_sales/${plateId}`,
        method: "GET",
      }),
      invalidatesTags: ["savedPlates"],
    }),
    removeFromSavedPlates: builder.mutation<unknown, string>({
      query: (plateId) => ({
        url: `plates_sales/delete_save_plates/${plateId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["savedPlates"],
    }),
  }),
})

export const { useGetMySavedPlatesQuery, useAddToSavedPlatesMutation, useRemoveFromSavedPlatesMutation } =
  mySavedPlatesApi
