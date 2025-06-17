import React from 'react'
import CriterionRating from '../CriterionRating/CriterionRating'
import styles from './review-card.module.css'
import userIcon from '../../../assets/icons/Users.svg'

export default function ReviewCard({ reviewData }) {
  return (
    <div className={styles['review-card']}>
      <div className={styles['review-header']}>
        <img
          src={userIcon}
          alt="Иконка пользователя"
          className={styles['users-icon']}
        />
        <p className={styles['review-author']}>{reviewData?.user}</p>
        <p className={styles['review-rating']}>Общая оценка:</p>
        <p className={styles['rating-value-mini']}>
          {reviewData?.['avg_rating']}
        </p>
      </div>

      <div className={styles['review-criteria']}>
        {reviewData.criteria.map(({ criterion, rating }, index) => (
          <CriterionRating
            key={index}
            rating={rating}
            criterionName={criterion}
          />
        ))}
      </div>

      {reviewData?.text && (
        <p className={styles.description}>{reviewData?.text}</p>
      )}

      <div className={styles['review-footer']}>
        <p className={styles['review-date']}>
          Дата публикации: {reviewData?.['created_at']}
        </p>
        {/* <p className={styles['opinion']}>Был ли отзыв полезен?</p>
        <button>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.38965 18.49V8.32998C8.38965 7.92998 8.50965 7.53998 8.72965 7.20998L11.4596 3.14998C11.8896 2.49998 12.9596 2.03998 13.8696 2.37998C14.8496 2.70998 15.4996 3.80997 15.2896 4.78997L14.7696 8.05998C14.7296 8.35998 14.8096 8.62998 14.9796 8.83998C15.1496 9.02998 15.3996 9.14997 15.6696 9.14997H19.7796C20.5696 9.14997 21.2496 9.46997 21.6496 10.03C22.0296 10.57 22.0996 11.27 21.8496 11.98L19.3896 19.47C19.0796 20.71 17.7296 21.72 16.3896 21.72H12.4896C11.8196 21.72 10.8796 21.49 10.4496 21.06L9.16965 20.07C8.67965 19.7 8.38965 19.11 8.38965 18.49Z"
              fill="#DDDDDD"
            />
            <path
              d="M5.21 6.38H4.18C2.63 6.38 2 6.98 2 8.46V18.52C2 20 2.63 20.6 4.18 20.6H5.21C6.76 20.6 7.39 20 7.39 18.52V8.46C7.39 6.98 6.76 6.38 5.21 6.38Z"
              fill="#DDDDDD"
            />
          </svg>
        </button>
        <button>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.61 5.50002V15.66C15.61 16.06 15.49 16.45 15.27 16.78L12.54 20.84C12.11 21.49 11.04 21.95 10.13 21.61C9.15002 21.28 8.50002 20.18 8.71002 19.2L9.23002 15.93C9.27002 15.63 9.19002 15.36 9.02002 15.15C8.85002 14.96 8.60002 14.84 8.33002 14.84H4.22002C3.43002 14.84 2.75002 14.52 2.35002 13.96C1.97002 13.42 1.90002 12.72 2.15002 12.01L4.61002 4.52002C4.92002 3.28002 6.27002 2.27002 7.61002 2.27002H11.51C12.18 2.27002 13.12 2.50002 13.55 2.93002L14.83 3.92002C15.32 4.30002 15.61 4.88002 15.61 5.50002Z"
              fill="#DDDDDD"
            />
            <path
              d="M18.7904 17.61H19.8204C21.3704 17.61 22.0004 17.01 22.0004 15.53V5.48002C22.0004 4.00002 21.3704 3.40002 19.8204 3.40002H18.7904C17.2404 3.40002 16.6104 4.00002 16.6104 5.48002V15.54C16.6104 17.01 17.2404 17.61 18.7904 17.61Z"
              fill="#DDDDDD"
            />
          </svg>
        </button> */}
      </div>
    </div>
  )
}
