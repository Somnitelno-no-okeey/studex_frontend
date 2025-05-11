import React from 'react'
import styles from './input-text.module.css'

export default function InputText({ placeholder, error, value, setValue }) {
  return (
    <div
      className={`${error && styles['inputs-error']} ${styles['inputs-element']}`}
    >
      <input
        type="text"
        value={value}
        onChange={(evt) => setValue(evt.target.value)}
        placeholder={placeholder}
      />
      {error && <p className={styles['error-message']}>{error}</p>}
    </div>
  )
}
