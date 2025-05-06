import { logout, setAccessToken, setUser } from '../features/authSlice'
import { baseApi } from './baseApi'

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: ({ email, password, confirmedPassword }) => ({
        url: '/auth/',
        method: 'POST',
        body: { email, password, confirm_password: confirmedPassword },
      }),
    }),

    sendVerifyCode: builder.mutation({
      query: (email) => ({
        url: '/auth/resend-code/',
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

    login: builder.mutation({
      query: ({ email, password }) => ({
        url: '/auth/token/',
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
    resetPassword: builder.mutation({
      query: ({ email, newPassword }) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: { email, newPassword },
      }),
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
        url: '/auth/token/refresh/',
        method: 'POST',
      }),
    }),
  }),
})

export const {
  useRegisterMutation,
  useSendVerifyCodeMutation,
  useVerifyCodeMutation,
  useLoginMutation,
  useGetProfileQuery,
  useResetPasswordMutation,
  useLogoutMutation,
  useRefreshMutation,
} = authApi
