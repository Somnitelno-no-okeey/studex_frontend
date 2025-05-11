import React, { useState } from 'react'
import ProfileLayout from '../../layouts/ProfileLayout'
import SubmitButton from '../SubmitButton'
import InputText from '../InputText'
import {
  validateNotEmpty,
  validateRussianLetters,
} from '../../../utils/validator.util'
import { useChangeUserInfoMutation } from '../../../api/changeDataApi'
import { ProfileView } from '../../../const'

export default function ChangeInfo({ handleNavigate }) {
  const [changeUserInfo, { isLoading }] = useChangeUserInfoMutation()
  const [userInfo, setUserInfo] = useState({
    name: '',
    surname: '',
    patronymic: '',
  })

  const [errors, setErrors] = useState({
    nameError: '',
    surnameError: '',
    patronymicError: '',
  })

  const onSubmit = async (evt) => {
    evt.preventDefault()

    setErrors({
      nameError: '',
      surnameError: '',
      patronymicError: '',
    })

    const isNameNotEmpty = validateNotEmpty(userInfo.name)
    const isSurnameNotEmpty = validateNotEmpty(userInfo.surname)
    const isNameValidLetters = validateRussianLetters(userInfo.name)
    const isSurnameValidLetters = validateRussianLetters(userInfo.surname)
    const isPatronymicValidLetters = validateRussianLetters(userInfo.patronymic)

    if (
      isNameNotEmpty &&
      isSurnameNotEmpty &&
      isNameValidLetters &&
      isSurnameValidLetters &&
      isPatronymicValidLetters
    ) {
      try {
        await changeUserInfo({
          name: userInfo.name,
          surname: userInfo.surname,
          patronymic: userInfo.patronymic,
        }).unwrap()
        handleNavigate(ProfileView.PROFILE_INFO)
      } catch (err) {
        console.error(err)
      }
    }

    if (!isNameNotEmpty) {
      setErrors((prev) => ({
        ...prev,
        nameError: 'Поле не может быть пустым',
      }))
    }

    if (!isSurnameNotEmpty) {
      setErrors((prev) => ({
        ...prev,
        surnameError: 'Поле не может быть пустым',
      }))
    }

    if (!isNameValidLetters) {
      setErrors((prev) => ({
        ...prev,
        nameError: 'Имя не может быть на английском',
      }))
    }

    if (!isSurnameValidLetters) {
      setErrors((prev) => ({
        ...prev,
        surnameError: 'Фамилия не может быть на английском',
      }))
    }

    if (!isPatronymicValidLetters) {
      setErrors((prev) => ({
        ...prev,
        patronymicError: 'Отчество не может быть на английском',
      }))
    }
  }
  return (
    <ProfileLayout>
      <h3>Изменить информацию о себе</h3>
      <form onSubmit={onSubmit}>
        <InputText
          placeholder="Фамилия"
          error={errors.surnameError}
          value={userInfo.surname}
          setValue={(value) =>
            setUserInfo((prev) => ({ ...prev, surname: value }))
          }
        />
        <InputText
          placeholder="Имя"
          error={errors.nameError}
          value={userInfo.name}
          setValue={(value) =>
            setUserInfo((prev) => ({ ...prev, name: value }))
          }
        />
        <InputText
          placeholder="Отчество"
          error={errors.patronymicError}
          value={userInfo.patronymic}
          setValue={(value) =>
            setUserInfo((prev) => ({ ...prev, patronymic: value }))
          }
        />
        <SubmitButton textContent="Сохранить" isLoading={isLoading} />
      </form>
    </ProfileLayout>
  )
}
