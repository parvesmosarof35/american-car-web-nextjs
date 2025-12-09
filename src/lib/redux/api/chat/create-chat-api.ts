import { baseApi } from "../base-api"

interface CreateMessageParams {
  id: string
  formData: FormData
}

export const createChatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createMessage: builder.mutation<unknown, CreateMessageParams>({
      query: ({ id, formData }) => ({
        url: `message/send-message/${id}`,
        method: "POST",
        body: formData,
      }),
    }),
  }),
})

export const { useCreateMessageMutation } = createChatApi
export default createChatApi
