import { baseApi } from './baseApi'

export const changeDataApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    resetPassword: builder.mutation({
      query: ({ email, newPassword }) => ({
        url: '/reset-password',
        method: 'POST',
        body: { email, newPassword },
      }),
    }),

    ChangePassword: builder.mutation({
      query: ({ oldPassord, newPassword }) => ({
        url: '/change-password',
        method: 'POST',
        body: { oldPassord, newPassword },
      }),
    }),

    changeUserInfo: builder.mutation({
      query: ({ name, surname, patronymic = null }) => ({
        url: '/change-info',
        method: 'POST',
        body: { name, surname, patronymic },
      }),
    }),
  }),
})

export const {
  useResetPasswordMutation,
  useChangePasswordMutation,
  useChangeUserInfoMutation,
} = changeDataApi
