import React from 'react'
import AuthLayout from '../../layouts/AuthLayout'
import SubmitButton from '../SubmitButton'
import { useNavigate } from 'react-router'

export default function CompletedMessage({ message, handleClick = null }) {
  const navigate = useNavigate()

  return (
    <AuthLayout>
      <h1>{message}</h1>
      <SubmitButton
        textContent="Перейти ко входу"
        onClick={() => {
          navigate('/login')
          handleClick()
        }}
      />
    </AuthLayout>
  )
}
