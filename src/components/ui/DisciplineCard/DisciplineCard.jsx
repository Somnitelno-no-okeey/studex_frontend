import React from 'react'
import CriterionRating from '../CriterionRating/CriterionRating'
import bookIcon from '../../../assets/icons/book.svg'
import styles from './discipline-card.module.css'
import { Link } from 'react-router'

export default function DisciplineCard({ disciplineData }) {
  return (
    <Link
      to={`/discipline/${disciplineData.id}`}
      className={styles['discipline-card']}
    >
      <div className={styles['discipline-info']}>
        <img src={bookIcon} alt="Иконка книги" className={styles.icon} />
        <p className={styles['discipline-title']}>{disciplineData?.name}</p>
        <div className={styles['main-discipline-rating']}>
          <CriterionRating
            rating={disciplineData?.['avg_rating']}
            showOnlyStars={true}
          />
          <p className={styles['rating-value-medium']}>
            {disciplineData?.['average_rating']}
          </p>
          <div className={styles['review-count']}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 18.4302H11L15.45 21.3902C16.11 21.8302 17 21.3602 17 20.5602V18.4302C20 18.4302 22 16.4302 22 13.4302V7.43018C22 4.43018 20 2.43018 17 2.43018H7C4 2.43018 2 4.43018 2 7.43018V13.4302C2 16.4302 4 18.4302 7 18.4302Z"
                fill="#999999"
              />
            </svg>
            <p>{disciplineData?.['review_count']}</p>
            <p>оценок</p>
          </div>
        </div>
      </div>
      <div className={styles['discipline-meta']}>
        <div className={styles['discipline-details']}>
          <p>Модуль: {disciplineData?.module}</p>
          <div className={styles['additional-option']}>
            <p>Формат проведения: {disciplineData?.format}</p>
            <p>Тип контроля: {disciplineData?.['control_type']}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
