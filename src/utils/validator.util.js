const validatePassword = (password) => {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+=[\]{};':"\\|,.<>/?-]{8,}$/
  return passwordRegex.test(password)
}

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@urfu\.me$/
  return emailRegex.test(email)
}

const checkPasswordMatch = (password, confirmedPassword) => {
  return password === confirmedPassword
}

const validateNotEmpty = (value) => {
  return value.trim().length !== 0
}

const validateRussianLetters = (value) => {
  if (!value) {
    return true
  }
  const russianLettersRegex = /^[А-ЯЁа-яё]+$/
  return russianLettersRegex.test(value)
}

export {
  validatePassword,
  validateEmail,
  checkPasswordMatch,
  validateNotEmpty,
  validateRussianLetters,
}
