import React from 'react'
import styles from './reviews-title.module.css'
import messageIcon from '../../../assets/icons/message-2.svg'
import SubmitButton from '../../ui/SubmitButton/SubmitButton'
import { Link } from 'react-router'

export default function ReviewsTitle({ commentsCount, handleOpenReviewForm }) {
  return (
    <div className={styles['reviews-title']}>
      <div className={styles['reviews-count']}>
        <img src={messageIcon} />
        <h3>Отзывы</h3>
        <span>{commentsCount?.toLocaleString('RU-ru') || '11 111'}</span>
      </div>

      <div className={styles['reviews-buttons']}>
        <SubmitButton
          textContent="Написать отзыв"
          customClass={styles['button']}
          onClick={handleOpenReviewForm}
        />
        <Link to="reviews" className={styles['secondary-button']}>
          Посмотреть все отзывы
        </Link>
      </div>
    </div>
  )
}
