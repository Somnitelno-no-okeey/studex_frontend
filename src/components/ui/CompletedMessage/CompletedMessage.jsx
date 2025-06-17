import React from 'react'
import AuthLayout from '../../layouts/AuthLayout'
import SubmitButton from '../SubmitButton'
import { useNavigate } from 'react-router'
import styles from '../../../styles/auth.module.css'

export default function CompletedMessage({ message, handleClick = null }) {
  const navigate = useNavigate()

  return (
    <AuthLayout>
      <form className={styles.form}>
        <h1>{message}</h1>
        <SubmitButton
          textContent="Перейти ко входу"
          onClick={() => {
            navigate('/login')
            handleClick()
          }}
        />
      </form>
    </AuthLayout>
  )
}
