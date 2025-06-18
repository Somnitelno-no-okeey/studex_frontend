import React, { useState } from 'react'
import styles from './header.module.css'
import userIcon from '../../../assets/icons/Users.svg'
import { Link } from 'react-router'
import ProfileMenu from '../ProfileMenu'
import { useSelector } from 'react-redux'
import loginIcon from '../../../assets/icons/login.svg'

export default function Header() {
  const [isProfileMenuVisible, setIsProfileMenuVisible] = useState(false)
  const { isAuthenticated } = useSelector((state) => state.authSlice)
  return (
    <>
      <header>
        <Link to="/" className={styles.logo}>
          STUDEX
        </Link>
        {isAuthenticated ? (
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
        ) : (
          <Link to="/login" className={styles.link}>
            <img src={loginIcon} />
          </Link>
        )}

        {isProfileMenuVisible && <ProfileMenu />}
      </header>
      {isProfileMenuVisible && <div className={styles['blur-overlay']} />}
    </>
  )
}
