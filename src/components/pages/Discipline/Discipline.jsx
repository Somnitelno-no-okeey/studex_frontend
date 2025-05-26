import React, { useState } from 'react'
import bookIcon from '../../../assets/icons/book.svg'
import styles from './discipline.module.css'
// import {
//   useGetCriteriaByDisciplineQuery,
//   useGetDisciplineInfoQuery,
//   useGetReviewsByDisciplineQuery,
// } from '../../../api/disciplineApi'
import { useParams } from 'react-router'
import CriterionRating from '../../ui/CriterionRating/CriterionRating'
import crownIcon from '../../../assets/icons/crown.svg'
import noteIcon from '../../../assets/icons/note-2.svg'
import teacherIcon from '../../../assets/icons/Icon.svg'
import arrowIcon from '../../../assets/icons/icon2.svg'
import ReviewsTitle from '../../ui/ReviewsTitle'
import ReviewForm from '../../ui/ReviewForm'
import ReviewCard from '../../ui/ReviewCard'
import {
  mockCriteriaData,
  mockDisciplineData,
  mockReviewsData,
} from '../../../mocks/reviews.mock'

export default function Discipline() {
  const { id } = useParams()
  // const { data: disciplineData, error: disciplineError } =
  //   useGetDisciplineInfoQuery(id)
  // const { data: criteriaData } = useGetCriteriaByDisciplineQuery(id)
  // const { data: reviewsData } = useGetReviewsByDisciplineQuery({
  //   disciplineId: id,
  // })

  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false)

  return (
    <>
      <div className={styles['card-discipline']}>
        <div className={styles['card-header']}>
          <div>
            <h1 className={styles['card-title']}>{mockDisciplineData?.name}</h1>
          </div>
          <div className={styles['card-rating']}>
            <p>Общая оценка:</p>
            <p>{mockDisciplineData?.['average_rating']}</p>
          </div>
        </div>
        <div className={styles['card-meta']}>
          <div className={styles.module}>
            <img src={bookIcon} alt="Иконка книги" className={styles.icon} />
            <p>Модуль: {mockDisciplineData?.module}</p>
          </div>
          <div className={styles['additional-info']}>
            <p className={styles.format}>
              Формат проведения: {mockDisciplineData?.format}
            </p>
            <p className={styles['control-type']}>
              Тип контроля: {mockDisciplineData?.['control_type']}
            </p>
          </div>
        </div>
      </div>

      <div className={styles['card']}>
        <div className={styles['icon-text']}>
          <img src={crownIcon} alt="Иконка короны" className={styles['icon']} />
          <h3 className={styles['card-subtitle']}>Критерии качества</h3>
        </div>
        <div className={styles['criteria-container']}>
          {mockCriteriaData.map(({ average_rating, criterion }, index) => (
            <CriterionRating
              key={index}
              rating={average_rating}
              showNumberRating={true}
              criterionName={criterion}
            />
          ))}
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles['icon-text']}>
          <img src={noteIcon} alt="Иконка страниц" className={styles.icon} />
          <h3 className={styles['card-subtitle']}>Описание</h3>
        </div>
        <p className={styles['description']}>
          {mockDisciplineData?.description}
        </p>
        <p className={styles['last-updated']}>
          Дата последнего изменения: {mockDisciplineData?.['last_update']}
        </p>
      </div>

      <details className={`${styles['card-teachers']} ${styles.card}`}>
        <summary
          className={`${styles['icon-text-teachers']} ${styles['icon-text']}`}
        >
          <img src={teacherIcon} alt="Иконка шляпы" className={styles.icon} />
          <h3 className={styles['card-subtitle']}>Преподаватели</h3>

          {!mockDisciplineData.teachers.length > 0 ? (
            <span className={styles['teachers-error']}>
              Информация о преподавателях временно недоступна
            </span>
          ) : (
            <span className={styles['toggle-button']}>
              <img src={arrowIcon} alt="Открывающая стрелка вниз" />
            </span>
          )}
        </summary>
        {mockDisciplineData.teachers.length > 0 && (
          <ul className={styles['teachers']}>
            {mockDisciplineData?.teachers.map((teacher, index) => (
              <li key={index}>{teacher}</li>
            ))}
          </ul>
        )}
      </details>

      <div className="reviews">
        <ReviewsTitle
          commentsCount={mockReviewsData?.['total_comments']}
          handleOpenReviewForm={() => setIsReviewFormOpen(true)}
        />

        <div className={styles['review-cards']}>
          {mockReviewsData?.comments.slice(0, 3).map((reviewData, index) => (
            <ReviewCard key={index} reviewData={reviewData} />
          ))}
        </div>
      </div>

      {isReviewFormOpen && (
        <ReviewForm
          disciplineName="Название дисциплины"
          disciplineId={id}
          criteria={mockCriteriaData}
          handleCloseReviewForm={() => setIsReviewFormOpen(false)}
        />
      )}

      {isReviewFormOpen && <div className={styles['blur-overlay']} />}
    </>
  )
}
