import { logout, setAccessToken, setUser } from '../features/authSlice'
import { baseApi } from './baseApi'

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: ({ email, password }) => ({
        url: '/auth/registration/',
        method: 'POST',
        body: { email, password },
      }),
    }),

    sendVerifyCode: builder.mutation({
      query: (email) => ({
        url: '/auth/verify/resend-code/',
        method: 'POST',
        body: { email },
      }),
    }),

    verifyCode: builder.mutation({
      query: ({ email, code }) => ({
        url: '/auth/verify/',
        method: 'POST',
        body: { email, verification_code: code },
      }),
    }),

    sendResetPasswordVerifyCode: builder.mutation({
      query: (email) => ({
        url: '/auth/password-reset/request/',
        method: 'POST',
        body: { email },
      }),
    }),

    resetPasswordVerifyCode: builder.mutation({
      query: ({ email, code }) => ({
        url: '/auth/password-reset/verify/',
        method: 'POST',
        body: { email, password_reset_code: code },
      }),
    }),

    login: builder.mutation({
      query: ({ email, password }) => ({
        url: '/auth/login/',
        method: 'POST',
        body: { email, password },
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled
          dispatch(setAccessToken(result.data.access))
        } catch (err) {
          console.error(err)
        }
      },

      invalidatesTags: ['User'],
    }),

    getProfile: builder.query({
      query: () => '/auth/profile',

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled
          dispatch(setUser(result.data))
        } catch (err) {
          console.error(err)
        }
      },

      providesTags: ['User'],
    }),

    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(logout())
        } catch (err) {
          console.error(err)
        }
      },
    }),

    refresh: builder.mutation({
      query: () => ({
        url: '/auth/refresh/',
        method: 'POST',
      }),
    }),
  }),
})

export const {
  useRegisterMutation,
  useSendVerifyCodeMutation,
  useVerifyCodeMutation,
  useSendResetPasswordVerifyCodeMutation,
  useResetPasswordVerifyCodeMutation,
  useLoginMutation,
  useGetProfileQuery,
  useLogoutMutation,
  useRefreshMutation,
} = authApi
