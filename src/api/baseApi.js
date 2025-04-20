import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'
import { logout, setAccessToken } from '../features/authSlice'

const baseUrl = import.meta.env.VITE_API_URL

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const accessToken = getState().authSlice.accessToken
    if (accessToken) headers.set('Authorization', `Bearer ${accessToken}`)
    return headers
  },
  credentials: 'include',
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result?.error?.status === 401) {
    const refreshResult = await api.dispatch(api.endpoints.refresh.initiate())

    if (refreshResult?.data?.accessToken) {
      api.dispatch(setAccessToken(refreshResult.data.accessToken))
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logout())
    }
  }

  return result
}

export const baseApi = createApi({
  reducerPath: 'api',
  tagTypes: ['User'],
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
})
