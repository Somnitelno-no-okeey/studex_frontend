import React, { useEffect, useState } from 'react'
import RegisterForm from '../../ui/RegisterForm'
import { RegistrationStep } from '../../../const'
import Verify from '../../ui/Verify'
import RegisterCompleted from '../../ui/RegisterCompleted'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

export default function Register() {
  const [step, setStep] = useState(RegistrationStep.FORM_SUBMISSION)
  const { user, accessToken, isAuthenticated } = useSelector(
    (state) => state.authSlice
  )
  const navigate = useNavigate()

  useEffect(() => {
    if (accessToken && !isAuthenticated) {
      if (user && !user.isVerify) {
        setStep(RegistrationStep.EMAIL_VERIFICATION)
      } else {
        navigate('/')
      }
    }
  }, [])

  switch (step) {
    case RegistrationStep.FORM_SUBMISSION:
      return (
        <RegisterForm
          setStep={() => setStep(RegistrationStep.EMAIL_VERIFICATION)}
        />
      )
    case RegistrationStep.EMAIL_VERIFICATION:
      return <Verify setStep={() => setStep(RegistrationStep.COMPLETED)} />
    case RegistrationStep.COMPLETED:
      return <RegisterCompleted />
  }
}
