import React from 'react'
import styles from './delete-message.module.css'

export default function DeleteMessage({ onDelete, onClose }) {
  return (
    <form className={styles['delete-message-container']} onSubmit={onDelete}>
      <h1>Удалить отзыв</h1>
      <p>
        Вы действительно хотите удалить отзыв без возможности восстановления
      </p>
      <div className={styles['btn-wrapper']}>
        <button className={styles.cancle} onClick={onClose} type="button">
          Отменить
        </button>
        <button className={styles.delete} type="submit">
          Удалить
        </button>
      </div>
    </form>
  )
}
