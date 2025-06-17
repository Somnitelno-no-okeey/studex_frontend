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

const VerifyMode = {
  RESET_PASSWORD: 'reset-password',
  REGISTER: 'register',
}

const reviewSorting = [
  { name: 'Дате', value: 'date' },
  { name: 'Рейтингу', value: 'rating' },
]

const disciplineSorting = [
  { name: 'Общей оценке', value: 'rating' },
  { name: 'По количестсву отзывов', value: 'comment_count' },
]

const disciplineFormats = [
  { name: 'Традиционная', value: 'traditional' },
  { name: 'Смешанная', value: 'blended' },
  { name: 'Онлайн', value: 'online' },
]

const disciplineTypes = [
  { name: 'Зачет', value: 'credit' },
  { name: 'Экзамен', value: 'exam' },
]

export {
  RegistrationStep,
  VerificationStep,
  ProfileView,
  VerifyMode,
  reviewSorting,
  disciplineSorting,
  disciplineFormats,
  disciplineTypes,
}
