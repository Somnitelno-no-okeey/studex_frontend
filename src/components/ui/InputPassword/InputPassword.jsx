import React, { useState } from 'react'
import styles from '../../../styles/input-password.module.css'

export default function InputPassword() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  return (
    <div className={styles['password-container']}>
      <input
        type={isPasswordVisible ? 'text' : 'password'}
        name="password"
        placeholder="Пароль"
        required
      />
      <button
        type="button"
        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
        className={styles['eye-button']}
      >
        <img
          src={
            isPasswordVisible
              ? 'src/assets/icons/eye-slash.svg'
              : 'src/assets/icons/eye.svg'
          }
        />
      </button>
    </div>
  )
}
