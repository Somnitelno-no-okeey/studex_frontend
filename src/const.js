const RegistrationStep = {
  FORM_SUBMISSION: 'form',
  EMAIL_VERIFICATION: 'verification',
  COMPLETED: 'completed',
}

const VerificationStep = {
  EMAIL_FORM: 'form',
  EMAIL_VERIFICATION: 'verification',
  SET_PASSWORD: 'password',
  COMPLETED: 'completed',
}

const ProfileView = {
  PROFILE_INFO: 'profile-info',
  CHANGE_PASSWORD: 'change-password',
  CHANGE_INFO: 'change-info',
}

export { RegistrationStep, VerificationStep, ProfileView }
