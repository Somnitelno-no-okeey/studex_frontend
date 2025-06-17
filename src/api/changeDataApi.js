import { baseApi } from './baseApi'

export const changeDataApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    resetPassword: builder.mutation({
      query: ({ email, newPassword }) => ({
        url: '/auth/password-reset/confirm/',
        method: 'POST',
        body: { email, new_password: newPassword },
      }),
    }),

    ChangePassword: builder.mutation({
      query: ({ oldPassord, newPassword }) => ({
        url: '/auth/change-password/',
        method: 'POST',
        body: { oldPassord, newPassword },
      }),
    }),

    changeUserInfo: builder.mutation({
      query: ({ name, surname, patronymic = null }) => ({
        url: '/auth/update-fullname/',
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
