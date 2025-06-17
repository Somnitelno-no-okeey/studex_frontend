import React, { useState } from 'react'
import AuthLayout from '../../layouts/AuthLayout'
import InputEmail from '../InputEmail'
import SubmitButton from '../SubmitButton'
import styles from '../../../styles/auth.module.css'
import { useNavigate } from 'react-router'
import { validateEmail } from '../../../utils/validator.util.js'
import { useSendResetPasswordVerifyCodeMutation } from '../../../api/authApi.js'

export default function ResetPasswordForm({ setStep, email, setEmail }) {
  const navigate = useNavigate()
  const [emailError, setEmailError] = useState()
  const [requestCode, { isLoading }] = useSendResetPasswordVerifyCodeMutation()

  const onSubmit = async (evt) => {
    evt.preventDefault()
    setEmailError(null)

    const isValidEmail = validateEmail(email)

    try {
      await requestCode(email).unwrap()
      setStep()
    } catch (err) {
      console.error(err)
    }

    if (!isValidEmail) {
      setEmailError('Некорректный формат email')
    }
  }

  return (
    <AuthLayout>
      <h1>Восстановление пароля</h1>
      <p>
        Введите вашу электронную почту, чтобы получить код подтверждения и
        восстановить доступ к аккаунту
      </p>
      <form className={styles['email-input-form']} onSubmit={onSubmit}>
        <InputEmail
          placeholder="Почта"
          setEmail={setEmail}
          value={email}
          error={emailError}
        />
        <SubmitButton textContent="Отправить код" isLoading={isLoading} />
        <button
          className={styles['secondary-button']}
          onClick={() => navigate(-1)}
          type="button"
        >
          Отмена
        </button>
      </form>
    </AuthLayout>
  )
}
