import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (_, action) => {
      localStorage.setItem('accessToken', action.payload)
    },

    setUser: (state, action) => {
      state.user = action.payload
      state.isAuthenticated = true
    },

    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      localStorage.removeItem('accessToken')
    },
  },
})

export const { setAccessToken, setUser, logout } = authSlice.actions
export default authSlice.reducer
