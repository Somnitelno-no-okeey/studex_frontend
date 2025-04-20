import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  accessToken: localStorage.getItem('accessToken') || null,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload
      localStorage.setItem('accessToken', action.payload)
    },

    setUser: (state, action) => {
      state.user = action.payload
      state.isAuthenticated = true
    },

    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.accessToken = null
      localStorage.removeItem('accessToken')
    },
  },
})

export const { setAccessToken, setUser, logout } = authSlice.actions
export default authSlice.reducer
