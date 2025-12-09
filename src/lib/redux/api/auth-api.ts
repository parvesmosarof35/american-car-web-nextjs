import { baseApi } from "./base-api"

interface LoginData {
  email: string
  password: string
}

interface CreateUserData {
  email: string
  password: string
  name: string
}

interface ResetPasswordData {
  userId: string
  password: string
}

interface UserVerificationData {
  [key: string]: unknown
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    logIn: builder.mutation<unknown, LoginData>({
      query: (data) => ({
        url: "auth/login_user",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    createUser: builder.mutation<unknown, CreateUserData>({
      query: (data) => ({
        url: "user/create_user",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    getMyProfile: builder.query<unknown, string>({
      query: (token) => ({
        url: "auth/myprofile",
        method: "GET",
        headers: { Authorization: token },
      }),
      providesTags: ["auth"],
    }),
    forgotPassword: builder.mutation<unknown, { email: string }>({
      query: (data) => ({
        url: "user/forgot_password",
        method: "POST",
        body: data,
      }),
    }),
    verifyEmail: builder.mutation<unknown, { code: string; email: string }>({
      query: (data) => ({
        url: "user/verification_forgot_user",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation<unknown, ResetPasswordData>({
      query: ({ userId, password }) => {
        const token = localStorage.getItem("accessToken")
        return {
          url: "user/reset_password",
          method: "POST",
          body: { userId, password },
          headers: {
            Authorization: `${token}`,
          },
        }
      },
      invalidatesTags: ["user"],
    }),
    userVarification: builder.mutation<unknown, UserVerificationData>({
      query: (data) => ({
        url: "user/user_verification",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
  }),
})

export const {
  useLogInMutation,
  useCreateUserMutation,
  useForgotPasswordMutation,
  useVerifyEmailMutation,
  useResetPasswordMutation,
  useGetMyProfileQuery,
  useUserVarificationMutation,
} = authApi

export default authApi
