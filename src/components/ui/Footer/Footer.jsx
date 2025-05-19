import React from 'react'
import styles from './footer.module.css'

export default function Footer() {
  return (
    <footer>
      <div className={styles['footer-col']}>
        <p className={styles['footer-title']}>Узнать больше:</p>
        <p className={styles['footer-text']}>
          <a href="#">FAQ</a>
        </p>
        <p className={styles['footer-text']}>
          <a href="#">О нас</a>
        </p>
      </div>
      <div className={styles['footer-col']}>
        <p className={styles['footer-title']}>Контакты поддержки:</p>
        <p className={styles['footer-text']}>
          <a href="tel:+89999999999">8 999-999-99-99</a>
        </p>
        <p className={styles['footer-text']}>
          <a href="mailto:example@gmail.com">example@gmail.com</a>
        </p>
      </div>
      <div className={styles['footer-col']}>
        <p className={styles['footer-title']}>Обратная связь:</p>
        <p className={styles['footer-text']}>
          <a href="#">Форма оценки сервиса</a>
        </p>
        <p className={styles['footer-text']}>
          <a href="#">Форма обратной связи</a>
        </p>
      </div>
      <div className={styles['footer-col']}>
        <p className={styles['footer-title']}>Правовые ссылки:</p>
        <p className={styles['footer-text']}>
          <a href="#">Политика конфиденциальности</a>
        </p>
        <p className={styles['footer-text']}>
          <a href="#">Пользовательское соглашение</a>
        </p>
      </div>
      <div className={`${styles['footer-col']} ${styles['copyright']}`}>
        <a href="#">Copyright</a>
      </div>
    </footer>
  )
}
