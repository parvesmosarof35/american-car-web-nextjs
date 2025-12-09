import { baseApi } from "./base-api"

interface BlogParams {
  page?: number
  limit?: number
}

interface UpdateBlogParams {
  id: string
  formData: FormData
}

export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBlog: builder.mutation<unknown, FormData>({
      query: (formData) => ({
        url: "blogs/create_blogs",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["blog"],
    }),
    getAllBlogs: builder.query<unknown, BlogParams>({
      query: (params) => ({
        url: "blogs/find_by_all_blogs",
        method: "GET",
        params,
      }),
      providesTags: ["blog"],
    }),
    getSingleBlog: builder.query<unknown, string>({
      query: (id) => ({
        url: `blogs/find_by_specific_blogs/${id}`,
        method: "GET",
      }),
      providesTags: ["blog"],
    }),
    getRecentBlogs: builder.query<unknown, void>({
      query: () => ({
        url: "blogs/recent_blog",
        method: "GET",
      }),
      providesTags: ["blog"],
    }),
    updateBlog: builder.mutation<unknown, UpdateBlogParams>({
      query: ({ id, formData }) => ({
        url: `blogs/update_blog/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["blog"],
    }),
    deleteBlog: builder.mutation<unknown, string>({
      query: (id) => ({
        url: `blogs/delete_blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blog"],
    }),
  }),
})

export const {
  useCreateBlogMutation,
  useGetAllBlogsQuery,
  useGetSingleBlogQuery,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useGetRecentBlogsQuery,
} = blogApi
