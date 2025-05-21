import React from 'react'
import styles from './criterion-rating.module.css'
import Star from '../Star'
import criterionIcon from '../../../assets/icons/Question.svg'

export default React.memo(function CriterionRating({
  rating,
  showNumberRating = false,
  criterionName,
}) {
  return (
    <div className={styles['quality-item']}>
      <img src={criterionIcon} className={styles['icon']} />
      <p className={styles['criterion']}>{criterionName}</p>
      <div className={styles['quality-item-rating']}>
        {showNumberRating && (
          <p className={styles['rating-value-mini']}>{rating}</p>
        )}
        <div className={styles['stars']}>
          {Array.from({ length: 5 }).map((_, index) => {
            const percent = (rating - index) * 100

            return <Star key={index} percent={percent} />
          })}
        </div>
      </div>
    </div>
  )
})
