import React, { useState } from 'react'
import AuthLayout from '../../layouts/AuthLayout'
import InputPassword from '../InputPassword'
import styles from '../../../styles/auth.module.css'
import SubmitButton from '../SubmitButton'
import {
  checkPasswordMatch,
  validatePassword,
} from '../../../utils/validator.util'
import { useResetPasswordMutation } from '../../../api/authApi'

export default function SetNewPasswordForm({ setStep, email }) {
  const [password, setPassword] = useState()
  const [resetPassword, { isLoading }] = useResetPasswordMutation()
  const [confirmedPassword, setConfirmedPassword] = useState()
  const [passwordsMatchError, setPasswordsMatchError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)

  const onSubmit = async (evt) => {
    evt.preventDefault()
    setPasswordsMatchError(null)
    setPasswordError(null)

    const isSamePasswords = checkPasswordMatch(password, confirmedPassword)
    const isValidPassword = validatePassword(password)

    if (isSamePasswords && isValidPassword) {
      try {
        await resetPassword({ email, newPassword: password }).unwrap()
        setStep()
      } catch (err) {
        console.error(err)
      }
    }

    if (!isSamePasswords) {
      setPasswordsMatchError('Пароли не совпадают')
    }

    if (!isValidPassword) {
      setPasswordError('Пароль не соответствует требованиям')
    }
  }

  return (
    <AuthLayout>
      <h1>Новый пароль</h1>
      <form onSubmit={onSubmit}>
        <div
          className={`${styles['passwords-container']} ${(passwordsMatchError || passwordError) && styles['inputs-error']}`}
        >
          <div className={styles.error}>
            {passwordsMatchError && <p>{passwordsMatchError}</p>}

            {passwordError && <p>{passwordError}</p>}
          </div>

          <InputPassword
            placeholder="Введите новый пароль"
            value={password}
            setPassword={setPassword}
          />

          <InputPassword
            placeholder="Подтвердите новый пароль"
            value={confirmedPassword}
            setPassword={setConfirmedPassword}
          />

          <p className={`${styles.hint} ${passwordError && styles.error}`}>
            Пароль должен содержать не менее 8 символов, включая латинские буквы
            (a-z, A-Z), как минимум одну заглавную букву и одну цифру
          </p>
        </div>
        <SubmitButton textContent="Сохранить" isLoading={isLoading} />
      </form>
    </AuthLayout>
  )
}
