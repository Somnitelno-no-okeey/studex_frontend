import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'
import { logout, setAccessToken } from '../features/authSlice'
import { authApi } from './authApi'

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

  const isRefreshingRequest =
    typeof args === 'string'
      ? args.includes('/auth/refresh')
      : typeof args?.url === 'string' && args.url.includes('/auth/refresh')

  if (result?.error?.status === 401 && !isRefreshingRequest) {
    const refreshResult = await api
      .dispatch(authApi.endpoints.refresh.initiate())
      .unwrap()

    if (refreshResult?.access) {
      api.dispatch(setAccessToken(refreshResult.access))
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logout())
    }
  }

  return result
}

export const baseApi = createApi({
  reducerPath: 'api',
  tagTypes: ['User', 'Reviews'],
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
})
