import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router'
import { useGetProfileQuery } from '../api/authApi'

export default function App() {
  const { accessToken } = useSelector((state) => state.authSlice)

  useGetProfileQuery(undefined, {
    skip: !accessToken,
  })

  return <Outlet />
}
