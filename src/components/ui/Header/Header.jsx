import React, { useState } from 'react'
import styles from './header.module.css'
import userIcon from '../../../assets/icons/Users.svg'
import { Link } from 'react-router'
import ProfileMenu from '../ProfileMenu'

export default function Header() {
  const [isProfileMenuVisible, setIsProfileMenuVisible] = useState(false)
  return (
    <>
      <header>
        <Link to="/" className={styles.logo}>
          STUDEX
        </Link>
        <button
          type="button"
          onClick={() => setIsProfileMenuVisible((prev) => !prev)}
        >
          <img
            src={userIcon}
            alt="Иконка профиля"
            className={styles['user-icon']}
          />
        </button>
        {isProfileMenuVisible && <ProfileMenu />}
      </header>
      {isProfileMenuVisible && <div className={styles['blur-overlay']} />}
    </>
  )
}
