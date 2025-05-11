import React from 'react'
import styles from './profile-layout.module.css'

export default function ProfileLayout({ children }) {
  return <div className={styles['profile-card']}>{children}</div>
}
