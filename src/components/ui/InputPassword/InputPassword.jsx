import React, { useState } from 'react'
import eyeIcon from '../../../assets/icons/eye.svg'
import eyeSlashIcon from '../../../assets/icons/eye-slash.svg'
import styles from '../../../styles/input-password.module.css'

export default function InputPassword({ textContent, setPassword, value }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  return (
    <div className={styles['password-container']}>
      <input
        type={isPasswordVisible ? 'text' : 'password'}
        placeholder={textContent}
        onChange={(evt) => setPassword(evt.target.value)}
        value={value}
        required
      />
      <button
        type="button"
        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
        className={styles['eye-button']}
      >
        <img src={isPasswordVisible ? eyeSlashIcon : eyeIcon} />
      </button>
    </div>
  )
}
