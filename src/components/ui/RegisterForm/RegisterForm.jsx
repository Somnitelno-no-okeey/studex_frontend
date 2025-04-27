import React, { useState } from 'react'
import AuthLayout from '../../layouts/AuthLayout'
import InputEmail from '../InputEmail'
import InputPassword from '../InputPassword'
import styles from '../../../styles/auth.module.css'
import { useLoginMutation, useRegisterMutation } from '../../../api/authApi'
import {
  validatePassword,
  validateEmail,
  checkPasswordMatch,
} from '../../../utils/validator.util.js'
import SubmitButton from '../SubmitButton/SubmitButton.jsx'

export default function RegisterForm({ setStep }) {
  const [register, { isLoading }] = useRegisterMutation()
  const [login] = useLoginMutation()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmedPassword, setConfirmedPassword] = useState()
  const [emailError, setEmailError] = useState(null)
  const [passwordsMatchError, setPasswordsMatchError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)

  const onSubmit = async (evt) => {
    evt.preventDefault()
    setPasswordsMatchError(null)
    setPasswordError(null)
    setEmailError(null)

    const isValidEmail = validateEmail(email)
    const isSamePasswords = checkPasswordMatch(password, confirmedPassword)
    const isValidPassword = validatePassword(password)

    if (isValidEmail && isSamePasswords && isValidPassword) {
      try {
        await register({ email, password }).unwrap()
        await login({ email, password }).unwrap()

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

    if (!isValidEmail) {
      setEmailError('Некорректный формат email')
    }
  }

  return (
    <AuthLayout>
      <h1>Регистрация</h1>
      <form onSubmit={onSubmit}>
        <p>
          Введите вашу почту в домене @urfu.me и пароль для создания аккаунта
        </p>

        <InputEmail
          placeholder="Почта"
          value={email}
          setEmail={setEmail}
          error={emailError}
        />

        <div
          className={`${styles['passwords-container']} ${(passwordsMatchError || passwordError) && styles['inputs-error']}`}
        >
          <div className={styles.error}>
            {passwordsMatchError && <p>{passwordsMatchError}</p>}

            {passwordError && <p>{passwordError}</p>}
          </div>

          <InputPassword
            placeholder="Введите пароль"
            value={password}
            setPassword={setPassword}
          />

          <InputPassword
            placeholder="Подтвердите пароль"
            value={confirmedPassword}
            setPassword={setConfirmedPassword}
          />
        </div>

        <p className={`${styles.hint} ${passwordError && styles.error}`}>
          Пароль должен содержать не менее 8 символов, включая латинские буквы
          (a-z, A-Z), как минимум одну заглавную букву и одну цифру
        </p>

        <SubmitButton
          textContent="Получить код подтверждения"
          isLoading={isLoading}
        />
      </form>
    </AuthLayout>
  )
}
