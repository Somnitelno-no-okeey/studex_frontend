import React, { useState } from 'react'
import AuthLayout from '../../layouts/AuthLayout'
import { Link, useNavigate } from 'react-router'
import styles from '../../../styles/auth.module.css'
import loading from '../../../assets/icons/loading.svg'
import InputPassword from '../../ui/InputPassword'
import { useLoginMutation } from '../../../api/authApi'

export default function Login() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [login, { error, isLoading }] = useLoginMutation()
  const navigate = useNavigate()

  const handleLogin = async (evt) => {
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
      <form onSubmit={handleLogin}>
        {error && (
          <div className={styles.error}>
            <p>Вход не удался</p>
            <p>Неверный логин или пароль</p>
          </div>
        )}

        <div
          className={`${styles['inputs-container']} ${error ? styles['inputs-error'] : ''}`}
        >
          <input
            type="email"
            placeholder="Почта"
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
            required
          />

          <InputPassword
            textContent="Пароль"
            setPassword={setPassword}
            value={password}
          />

          <Link to="/" className={styles.link}>
            Забыли пароль?
          </Link>
        </div>

        {isLoading && (
          <p className={styles.loading}>Подождите, данные загружаются</p>
        )}

        <button className={styles['submit-button']} disabled={isLoading}>
          {isLoading ? <img src={loading} /> : 'Войти'}
        </button>
      </form>

      <Link to="/register" className={styles['secondary-button']}>
        Создать аккаунт
      </Link>
    </AuthLayout>
  )
}
