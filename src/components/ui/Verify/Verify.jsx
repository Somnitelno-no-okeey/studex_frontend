import React, { useEffect } from 'react'
import AuthLayout from '../../layouts/AuthLayout'
import InputCode from '../InputCode/InputCode'
import { useState } from 'react'
import styles from '../../../styles/auth.module.css'
import SubmitButton from '../SubmitButton'
import {
  useSendVerifyCodeMutation,
  useVerifyCodeMutation,
} from '../../../api/authApi'
import { useSelector } from 'react-redux'

export default function Verify({ setStep }) {
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [codeTimeout, setCodeTimeout] = useState(0)
  const [requestCode] = useSendVerifyCodeMutation()
  const [sendCode, { isLoading }] = useVerifyCodeMutation()
  const [codeError, setCodeError] = useState()
  const { user } = useSelector((state) => state.authSlice)

  useEffect(() => {
    if (codeTimeout > 0) {
      const timeoutId = setTimeout(() => {
        setCodeTimeout((prev) => prev - 1)
      }, 1000)

      return () => clearTimeout(timeoutId)
    }
  }, [codeTimeout])

  const requestCodeToEmail = async () => {
    if (!codeTimeout) {
      const email = user.email
      try {
        await requestCode(email).unwrap()
        setCodeError(null)
        setCode(['', '', '', '', '', ''])
        setCodeTimeout(120)
      } catch (err) {
        console.error(err)
      }
    }
  }

  const onSubmit = async (evt) => {
    evt.preventDefault()
    const fullCode = code.join('')

    if (fullCode.length === 6) {
      try {
        await sendCode(fullCode).unwrap()
        setStep()
      } catch (err) {
        console.error(err)
        setCodeError(err)
      }
    }
  }

  return (
    <AuthLayout>
      <h1>Подтвердите регистрацию</h1>
      <p>Введите код подтверждения из письма</p>
      <form onSubmit={onSubmit}>
        <InputCode setCode={setCode} code={code} error={codeError} />
        {codeTimeout > 0 && (
          <p className={styles.hint}>
            Вы можете запросить код повторно через {codeTimeout} секунд
          </p>
        )}
        <button
          className={styles['secondary-button']}
          onClick={() => requestCodeToEmail()}
          type="button"
          disabled={codeTimeout}
        >
          Запросить код повторно
        </button>
        <SubmitButton textContent="Подтвердить" isLoading={isLoading} />
      </form>
    </AuthLayout>
  )
}
