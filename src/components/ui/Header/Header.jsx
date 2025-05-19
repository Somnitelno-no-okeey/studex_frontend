import React from 'react'
import styles from './header.module.css'
import userIcon from '../../../assets/icons/Users.svg'

export default function Header() {
  return (
    <header>
      <div className={styles.logo}>ЛОГО</div>
      <button type="button">
        <img
          src={userIcon}
          alt="Иконка профиля"
          className={styles['user-icon']}
        />
      </button>
    </header>
  )
}
