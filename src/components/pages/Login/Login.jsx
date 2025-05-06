import React, { useState } from 'react'
import AuthLayout from '../../layouts/AuthLayout'
import { Link, useNavigate } from 'react-router'
import styles from '../../../styles/auth.module.css'
import InputPassword from '../../ui/InputPassword'
import { useLoginMutation } from '../../../api/authApi'
import InputEmail from '../../ui/InputEmail'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import SubmitButton from '../../ui/SubmitButton'

export default function Login() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [login, { error, isLoading }] = useLoginMutation()
  const navigate = useNavigate()
  const { isAuthenticated } = useSelector((state) => state.authSlice)
  const { email: registerEmail, isVerified } = useSelector(
    (state) => state.verifySlice
  )

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }

    if (registerEmail && !isVerified) {
      navigate('/register')
    }
  }, [])

  const onSubmit = async (evt) => {
    evt.preventDefault()

    try {
      await login({ email, password }).unwrap()
      navigate('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <AuthLayout>
      <h1>Вход</h1>
      <form onSubmit={onSubmit}>
        <div
          className={`${styles['inputs-container']} ${error && styles['inputs-error']}`}
        >
          {error && (
            <div className={styles.error}>
              <p>Вход не удался</p>
              <p>Неверный логин или пароль</p>
            </div>
          )}

          <InputEmail placeholder="Почта" setEmail={setEmail} value={email} />

          <InputPassword
            placeholder="Пароль"
            setPassword={setPassword}
            value={password}
          />

          <Link to="/" className={styles.link}>
            Забыли пароль?
          </Link>
        </div>

        <SubmitButton textContent="Войти" isLoading={isLoading} />
      </form>

      <Link to="/register" className={styles['secondary-button']}>
        Создать аккаунт
      </Link>
    </AuthLayout>
  )
}
