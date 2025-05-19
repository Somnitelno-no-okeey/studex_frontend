import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: localStorage.getItem('verify_email') || '',
  isVerified: localStorage.getItem('is_verified') === 'true',
  mode: localStorage.getItem('verify_mode') || '',
}

const verifySlice = createSlice({
  name: 'verifySlice',
  initialState: initialState,
  reducers: {
    setEmail(state, action) {
      state.email = action.payload
      localStorage.setItem('verify_email', action.payload)
    },
    setVerified(state) {
      state.isVerified = true
      localStorage.setItem('is_verified', 'true')
    },
    setMode(state, action) {
      state.mode = action.payload
      localStorage.setItem('verify_mode', action.payload)
    },
    reset(state) {
      localStorage.removeItem('verify_email')
      localStorage.removeItem('is_verified')
      state.email = ''
      state.isVerified = false
    },
  },
})

export const { setEmail, setVerified, setMode, reset } = verifySlice.actions
export default verifySlice.reducer
