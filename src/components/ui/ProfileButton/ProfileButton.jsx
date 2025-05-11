import React from 'react'
import styles from './profile-button.module.css'

export default function ProfileButton({ textContent, icon, onClick = null }) {
  return (
    <button type="button" onClick={onClick} className={styles.button}>
      <img src={icon} alt={textContent} />
      <span>{textContent}</span>
    </button>
  )
}
