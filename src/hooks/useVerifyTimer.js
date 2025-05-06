import { useEffect, useState } from 'react'
import { getRemainingTime, saveTimerStart } from '../utils/timer.util.js'

export const useVerifyTimer = (email) => {
  const storageKey = `verifyCodeSentTime_${email}`
  const [codeTimeout, setCodeTimeout] = useState(0)

  useEffect(() => {
    const remaining = getRemainingTime(storageKey)
    setCodeTimeout(remaining)
  }, [email])

  useEffect(() => {
    if (codeTimeout <= 0) return

    const timeout = setTimeout(() => {
      setCodeTimeout((prev) => prev - 1)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [codeTimeout])

  const resetTimer = () => {
    localStorage.removeItem(storageKey)
    setCodeTimeout(0)
  }

  const startNewTimer = () => {
    saveTimerStart(storageKey)
    setCodeTimeout(120)
  }

  return { codeTimeout, startNewTimer, resetTimer }
}
