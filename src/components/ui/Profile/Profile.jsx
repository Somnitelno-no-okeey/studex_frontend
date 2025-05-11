import React from 'react'
import ProfileLayout from '../../layouts/ProfileLayout'
import userIcon from '../../../assets/icons/Users.svg'
import styles from './profile.module.css'
import ProfileButton from '../ProfileButton'
import EditIcon from '../../../assets/icons/edit-2.svg'
import LockIcon from '../../../assets/icons/lock.svg'
import QuestionIcon from '../../../assets/icons/message-question.svg'
import { ProfileView } from '../../../const'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

export default function Profile({ handleNavigate }) {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.authSlice)

  return (
    <ProfileLayout>
      <div className={styles['profile-info']}>
        <img
          src={userIcon}
          alt="Иконка профиля"
          className={styles['user-icon']}
        />
        <div>
          <p className={styles['user-name']}>{user?.name || 'UserName'}</p>
          <p className={styles['examle-mail']}>
            {user?.email || 'example@gmail.com'}
          </p>
        </div>
      </div>

      <div className="profile-actions">
        <ProfileButton
          textContent="Изменить информацию"
          icon={EditIcon}
          onClick={() => handleNavigate(ProfileView.CHANGE_INFO)}
        />
        <ProfileButton
          textContent="Изменить пароль"
          icon={LockIcon}
          onClick={() => handleNavigate(ProfileView.CHANGE_PASSWORD)}
        />
        <ProfileButton
          textContent="Сбросить пароль"
          icon={QuestionIcon}
          onClick={() => navigate('/reset-password')}
        />
      </div>

      <button type="button" className={styles['logout-button']}>
        Выйти
      </button>
    </ProfileLayout>
  )
}
