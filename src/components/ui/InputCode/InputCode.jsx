import React, { useRef } from 'react'
import styles from './code.module.css'

export default function InputCode({ code, setCode, error }) {
  const inputsRef = useRef([])

  const handleChange = (index, value) => {
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, key) => {
    if (key === 'Backspace') {
      if (!code[index] && index > 0) {
        inputsRef.current[index - 1]?.focus()
      }
    }
  }

  return (
    <div className={`${styles['code-wrapper']} ${error && styles.error}`}>
      <div className={styles['code-container']}>
        {code.map((value, index) => (
          <input
            key={index}
            type="number"
            ref={(el) => (inputsRef.current[index] = el)}
            value={value}
            onChange={(evt) => handleChange(index, evt.target.value)}
            onKeyDown={(evt) => handleKeyDown(index, evt.key)}
          />
        ))}
      </div>
      {error && (
        <p>
          Неверный код подтверждения Попробуйте еще раз или запросите код
          повторно
        </p>
      )}
    </div>
  )
}
