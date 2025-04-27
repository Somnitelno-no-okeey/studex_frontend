import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router'
import { useGetProfileQuery } from '../api/authApi'

export default function App() {
  const { user, accessToken, isAuthenticated } = useSelector(
    (state) => state.authSlice
  )

  if (accessToken && !isAuthenticated) {
    if (user && !user.isVerify) return

    useGetProfileQuery()
  }

  return <Outlet />
}
