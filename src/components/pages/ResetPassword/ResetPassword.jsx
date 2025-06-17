import React, { useEffect } from 'react'
import { VerificationStep, VerifyMode } from '../../../const'
import { useDispatch, useSelector } from 'react-redux'
import CompletedMessage from '../../ui/CompletedMessage'
import Verify from '../../ui/Verify'
import ResetPasswordForm from '../../ui/ResetPasswordForm'
import SetNewPasswordForm from '../../ui/SetNewPasswordForm'
import { useSearchParams } from 'react-router'
import {
  reset,
  setEmail,
  setMode,
  setVerified,
} from '../../../features/verifySlice'

export default function ResetPassword() {
  const { user } = useSelector((state) => state.authSlice)
  console.log(user)
  const { email, isVerified, mode } = useSelector((state) => state.verifySlice)
  const [searchParams, setSearchParams] = useSearchParams()
  const step = searchParams.get('step') || VerificationStep.EMAIL_FORM
  const dispatch = useDispatch()

  useEffect(() => {
    if (mode !== VerifyMode.RESET_PASSWORD) {
      dispatch(reset())
      dispatch(setMode(VerifyMode.RESET_PASSWORD))
    }

    if (user?.email && !isVerified) {
      dispatch(setEmail(user.email))
      goToStep(VerificationStep.EMAIL_VERIFICATION)
    }
  }, [user, mode])

  useEffect(() => {
    if (step === VerificationStep.EMAIL_VERIFICATION && !email) {
      goToStep(VerificationStep.EMAIL_FORM)
    }

    if (step === VerificationStep.SET_PASSWORD && !isVerified) {
      goToStep(VerificationStep.EMAIL_VERIFICATION)
    }

    if (step === VerificationStep.COMPLETED && !isVerified) {
      goToStep(VerificationStep.EMAIL_VERIFICATION)
    }
  }, [step, email, isVerified])

  const goToStep = (nextStep) => {
    setSearchParams({ step: nextStep })
  }

  switch (step) {
    case VerificationStep.EMAIL_VERIFICATION:
      return (
        <Verify
          setStep={() => goToStep(VerificationStep.SET_PASSWORD)}
          handleSubmit={() => dispatch(setVerified())}
          email={email}
          mode={VerifyMode.RESET_PASSWORD}
        />
      )
    case VerificationStep.SET_PASSWORD:
      return (
        <SetNewPasswordForm
          setStep={() => goToStep(VerificationStep.COMPLETED)}
          email={email}
        />
      )

    case VerificationStep.COMPLETED:
      return (
        <CompletedMessage
          message="Пароль успешно изменен"
          handleClick={() => dispatch(reset())}
        />
      )

    default:
      return (
        <ResetPasswordForm
          setStep={() => goToStep(VerificationStep.EMAIL_VERIFICATION)}
          setEmail={(email) => dispatch(setEmail(email))}
          email={email}
        />
      )
  }
}
