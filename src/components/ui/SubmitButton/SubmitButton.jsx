import React from 'react'
import loading from '../../../assets/icons/loading.svg'
import styles from './submit-button.module.css'

export default function SubmitButton({
  isLoading = null,
  onClick = null,
  textContent,
  customClass = null,
}) {
  return (
    <div className="button-container">
      {isLoading && (
        <p className={styles.loading}>Подождите, данные загружаются</p>
      )}

      <button
        className={`${styles['submit-button']} ${customClass ? customClass : ''}`}
        disabled={isLoading}
        onClick={onClick}
      >
        {isLoading ? <img src={loading} /> : textContent}
      </button>
    </div>
  )
}
