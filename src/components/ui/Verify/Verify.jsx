import React from 'react'
import AuthLayout from '../../layouts/AuthLayout'
import InputCode from '../InputCode/InputCode'
import { useState } from 'react'
import styles from '../../../styles/auth.module.css'
import SubmitButton from '../SubmitButton'
import {
  useSendVerifyCodeMutation,
  useVerifyCodeMutation,
} from '../../../api/authApi'
import { useVerifyTimer } from '../../../hooks/useVerifyTimer'

export default function Verify({ setStep, email, handleSubmit }) {
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const { codeTimeout, startNewTimer, resetTimer } = useVerifyTimer(email)
  const [requestCode] = useSendVerifyCodeMutation()
  const [sendCode, { isLoading }] = useVerifyCodeMutation()
  const [codeError, setCodeError] = useState()

  const requestCodeToEmail = async () => {
    if (!codeTimeout) {
      try {
        await requestCode(email).unwrap()
        setCodeError(null)
        setCode(['', '', '', '', '', ''])
        startNewTimer()
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
        await sendCode({ email, code: fullCode }).unwrap()
        resetTimer()
        handleSubmit()
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
