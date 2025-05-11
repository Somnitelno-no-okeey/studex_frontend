import React from 'react'
import ProfileLayout from '../../layouts/ProfileLayout'
import styles from './change-password.module.css'
import InputPassword from '../InputPassword'
import SubmitButton from '../SubmitButton'
import { useChangePasswordMutation } from '../../../api/changeDataApi'
import { useState } from 'react'
import {
  checkPasswordMatch,
  validatePassword,
} from '../../../utils/validator.util'
import { ProfileView } from '../../../const'

export default function ChangePassword({ handleNavigate }) {
  const [changePassord, { isLoading }] = useChangePasswordMutation()
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  })
  const [passwordsError, setPasswordsError] = useState({
    oldPasswordError: '',
    passwordsMatchError: '',
    passwordValidateError: '',
  })

  const onSubmit = async (evt) => {
    evt.preventDefault()

    setPasswordsError({
      oldPasswordError: '',
      passwordsMatchError: '',
      passwordValidateError: '',
    })

    const isSamePasswords = checkPasswordMatch(
      passwords.newPassword,
      passwords.confirmNewPassword
    )
    const isValidPassword = validatePassword(passwords.newPassword)

    if (isSamePasswords && isValidPassword) {
      try {
        await changePassord({
          oldPassord: passwords.oldPassword,
          newPassword: passwords.newPassword,
        }).unwrap()
        handleNavigate(ProfileView.PROFILE_INFO)
      } catch (err) {
        setPasswordsError((prev) => ({
          ...prev,
          oldPasswordError: err,
        }))
      }
    }

    if (!isSamePasswords) {
      setPasswordsError((prev) => ({
        ...prev,
        passwordsMatchError: 'Пароли не совпадают',
      }))
    }

    if (!isValidPassword) {
      setPasswordsError((prev) => ({
        ...prev,
        passwordValidateError: 'Пароль не соответствует требования',
      }))
    }
  }

  return (
    <ProfileLayout>
      <h3>Изменить пароль</h3>
      <form
        onSubmit={onSubmit}
        className={`${passwordsError.oldPasswordError && styles['old-password-error']} 
        ${passwordsError.passwordsMatchError && styles['passwords-match-error']} 
        ${passwordsError.passwordValidateError && styles['password-validate-error']}`}
      >
        {passwordsError.oldPasswordError ||
        passwordsError.passwordsMatchError ||
        passwordsError.passwordValidateError ? (
          <div className={styles['error-message']}>
            {passwordsError.oldPasswordError && <p>Неправильный пароль</p>}
            {passwordsError.passwordsMatchError && <p>Пароли не совпадают</p>}
            {passwordsError.passwordValidateError && (
              <p>Пароль не соответствует требования</p>
            )}
          </div>
        ) : (
          ''
        )}
        <div className={styles['inputs-container']}>
          <InputPassword
            placeholder="Введите старый пароль"
            value={passwords.oldPassword}
            setPassword={(password) =>
              setPasswords((prev) => ({
                ...prev,
                oldPassword: password,
              }))
            }
          />
          <InputPassword
            placeholder="Придумайте новый пароль"
            value={passwords.newPassword}
            setPassword={(password) =>
              setPasswords((prev) => ({
                ...prev,
                newPassword: password,
              }))
            }
          />
          <InputPassword
            placeholder="Повторите новый пароль"
            value={passwords.confirmNewPassword}
            setPassword={(password) =>
              setPasswords((prev) => ({
                ...prev,
                confirmNewPassword: password,
              }))
            }
          />
        </div>
        <p className={styles.hint}>
          Пароль должен содержать не менее 8 символов, включая латинские буквы
          (a-z, A-Z), как минимум одну заглавную букву и одну цифру
        </p>
        <SubmitButton textContent="Сохранить" isLoading={isLoading} />
      </form>
    </ProfileLayout>
  )
}
