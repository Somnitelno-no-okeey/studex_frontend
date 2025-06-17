import React, { useEffect } from 'react'
import AuthLayout from '../../layouts/AuthLayout'
import InputCode from '../InputCode/InputCode'
import { useState } from 'react'
import styles from '../../../styles/auth.module.css'
import SubmitButton from '../SubmitButton'
import {
  useResetPasswordVerifyCodeMutation,
  useSendResetPasswordVerifyCodeMutation,
  useSendVerifyCodeMutation,
  useVerifyCodeMutation,
} from '../../../api/authApi'
import { useVerifyTimer } from '../../../hooks/useVerifyTimer'
import verifyStyles from './verify.module.css'
import { VerifyMode } from '../../../const'
import { useSelector } from 'react-redux'

export default function Verify({
  setStep,
  email,
  handleSubmit,
  mode = VerifyMode.REGISTER,
}) {
  const { isAuthenticated } = useSelector((state) => state.authSlice)
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const { codeTimeout, startNewTimer, resetTimer } = useVerifyTimer(email)

  const [requestRegisterCode] = useSendVerifyCodeMutation()
  const [sendRegisterCode, { isLoading: registerCodeLoading }] =
    useVerifyCodeMutation()

  const [requestResetPsswordCode] = useSendResetPasswordVerifyCodeMutation()
  const [sendResetPasswordCode, { isLoading: resetPasswordCodeLoading }] =
    useResetPasswordVerifyCodeMutation()

  const requestCode =
    mode === VerifyMode.REGISTER ? requestRegisterCode : requestResetPsswordCode
  const sendCode =
    mode === VerifyMode.REGISTER ? sendRegisterCode : sendResetPasswordCode
  const isLoading =
    mode === VerifyMode.REGISTER
      ? registerCodeLoading
      : resetPasswordCodeLoading

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

  useEffect(() => {
    if (mode === VerifyMode.RESET_PASSWORD && isAuthenticated) {
      requestCodeToEmail()
    }
  }, [isAuthenticated])

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
      <h1>
        {mode === VerifyMode.REGISTER
          ? 'Подтвердите регистрацию'
          : 'Подтвердите вашу почту'}
      </h1>
      <p>Введите код подтверждения из письма</p>
      <form onSubmit={onSubmit} className={verifyStyles['verify-form']}>
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
