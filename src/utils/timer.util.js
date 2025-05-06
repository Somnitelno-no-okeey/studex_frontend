const saveTimerStart = (storageKey) => {
  localStorage.setItem(storageKey, Date.now())
}

const getRemainingTime = (storageKey) => {
  const savedTime = localStorage.getItem(storageKey)
  if (!savedTime) return 0

  const elapsed = Math.floor((Date.now() - Number(savedTime)) / 1000)
  return Math.max(120 - elapsed, 0)
}

export { saveTimerStart, getRemainingTime }
