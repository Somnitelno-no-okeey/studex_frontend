import React, { useEffect } from 'react'
import RegisterForm from '../../ui/RegisterForm'
import { RegistrationStep, VerifyMode } from '../../../const'
import Verify from '../../ui/Verify'
import CompletedMessage from '../../ui/CompletedMessage'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router'
import {
  reset,
  setEmail,
  setMode,
  setVerified,
} from '../../../features/verifySlice'

export default function Register() {
  const { isAuthenticated } = useSelector((state) => state.authSlice)
  const { email, isVerified, mode } = useSelector((state) => state.verifySlice)
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const step = searchParams.get('step') || RegistrationStep.FORM_SUBMISSION
  const dispatch = useDispatch()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }

    if (mode !== VerifyMode.REGISTER) {
      dispatch(reset())
      dispatch(setMode(VerifyMode.REGISTER))
    }

    if (email && !isVerified) {
      goToStep(RegistrationStep.EMAIL_VERIFICATION)
    }
  }, [])

  useEffect(() => {
    if (step === RegistrationStep.EMAIL_VERIFICATION && !email) {
      goToStep(RegistrationStep.FORM_SUBMISSION)
    }
    if (step === RegistrationStep.COMPLETED && !isVerified) {
      goToStep(RegistrationStep.EMAIL_VERIFICATION)
    }
  }, [step, email, isVerified])

  const goToStep = (nextStep) => {
    setSearchParams({ step: nextStep })
  }

  switch (step) {
    case RegistrationStep.EMAIL_VERIFICATION:
      return (
        <Verify
          setStep={() => goToStep(RegistrationStep.COMPLETED)}
          handleSubmit={() => dispatch(setVerified())}
          email={email}
        />
      )
    case RegistrationStep.COMPLETED:
      return (
        <CompletedMessage
          message="Поздравляем с успешной регистрацией"
          handleClick={() => dispatch(reset())}
        />
      )
    default:
      return (
        <RegisterForm
          setStep={() => goToStep(RegistrationStep.EMAIL_VERIFICATION)}
          setUserEmail={(email) => dispatch(setEmail(email))}
        />
      )
  }
}
