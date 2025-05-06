import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: localStorage.getItem('verify_email') || '',
  isVerified: localStorage.getItem('is_verified') === 'true',
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
    reset(state) {
      localStorage.removeItem('verify_email')
      localStorage.removeItem('is_verified')
      state.email = ''
      state.isVerified = false
    },
  },
})

export const { setEmail, setVerified, reset } = verifySlice.actions
export default verifySlice.reducer
