import React from 'react'
import AuthLayout from '../../layouts/AuthLayout'
import { Link } from 'react-router'
import styles from '../../../styles/auth.module.css'
import InputPassword from '../../ui/InputPassword/InputPassword'

export default function Login() {
  return (
    <AuthLayout>
      <h1>Вход</h1>
      <form>
        <div className={styles['inputs-container']}>
          <input type="email" name="email" placeholder="Почта" required />
          <InputPassword />
          <Link to="/" className={styles.link}>
            Забыли пароль?
          </Link>
        </div>
        <button className={styles['submit-button']}>Войти</button>
      </form>
      <Link to="/register" className={styles['secondary-button']}>
        Создать аккаунт
      </Link>
    </AuthLayout>
  )
}
