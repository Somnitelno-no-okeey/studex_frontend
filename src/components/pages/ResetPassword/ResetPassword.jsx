import React, { useEffect, useState } from 'react'
import { VerificationStep } from '../../../const'
import { useSelector } from 'react-redux'
import CompletedMessage from '../../ui/CompletedMessage'
import Verify from '../../ui/Verify'
import ResetPasswordForm from '../../ui/ResetPasswordForm'
import SetNewPasswordForm from '../../ui/SetNewPasswordForm'

export default function ResetPassword() {
  const [step, setStep] = useState(VerificationStep.EMAIL_FORM)
  const { user, isAuthenticated } = useSelector((state) => state.authSlice)
  const [email, setEmail] = useState(user?.email || '')

  useEffect(() => {
    if (isAuthenticated) {
      setStep(VerificationStep.EMAIL_VERIFICATION)
    }
  }, [])

  switch (step) {
    case VerificationStep.EMAIL_FORM:
      return (
        <ResetPasswordForm
          setStep={() => setStep(VerificationStep.EMAIL_VERIFICATION)}
          setEmail={setEmail}
          email={email}
        />
      )
    case VerificationStep.EMAIL_VERIFICATION:
      return (
        <Verify
          setStep={() => setStep(VerificationStep.SET_PASSWORD)}
          email={email}
        />
      )
    case VerificationStep.SET_PASSWORD:
      return (
        <SetNewPasswordForm
          setStep={() => setStep(VerificationStep.COMPLETED)}
          email={email}
        />
      )

    case VerificationStep.COMPLETED:
      return <CompletedMessage message="Пароль успешно изменен" />
  }
}
