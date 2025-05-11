import React from 'react'
import styles from './input-email.module.css'

export default function InputEmail({
  placeholder,
  value,
  setEmail,
  error = null,
}) {
  return (
    <div className={styles['email-container']}>
      <input
        type="email"
        placeholder={placeholder}
        value={value}
        onChange={(evt) => setEmail(evt.target.value)}
        className={error && styles['input-error']}
        required
      />
      {error && <p className={styles['error']}>{error}</p>}
    </div>
  )
}
