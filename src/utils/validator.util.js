const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/
  return passwordRegex.test(password)
}

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@urfu\.me$/
  return emailRegex.test(email)
}

const checkPasswordMatch = (password, confirmedPassword) => {
  return password === confirmedPassword
}

export { validatePassword, validateEmail, checkPasswordMatch }
