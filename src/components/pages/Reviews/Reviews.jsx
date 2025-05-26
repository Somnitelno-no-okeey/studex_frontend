import React, { useState } from 'react'
import arrowLeftIcon from '../../../assets/icons/arrow-circle-left.svg'
import { Link, useParams } from 'react-router'
import {
  mockCriteriaData,
  mockDisciplineData,
  mockReviewsData,
} from '../../../mocks/reviews.mock'
// import {
//   useGetCriteriaByDisciplineQuery,
//   useGetDisciplineInfoQuery,
//   useGetReviewsByDisciplineQuery,
// } from '../../../api/disciplineApi'
import styles from './reviews.module.css'
import ReviewsTitle from '../../ui/ReviewsTitle'
import ReviewCard from '../../ui/ReviewCard'
import ReviewForm from '../../ui/ReviewForm'
import Sorting from '../../ui/Sorting'
import { reviewSorting } from '../../../const'

export default function Reviews() {
  const { id } = useParams()
  // const { data: disciplineData, error: disciplineError } =
  //   useGetDisciplineInfoQuery(id)
  // const { data: criteriaData } = useGetCriteriaByDisciplineQuery(id)
  // const { data: reviewsData } = useGetReviewsByDisciplineQuery({
  //   disciplineId: id,
  // })
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false)

  return (
    <main>
      <section className={styles['discipline-rating']}>
        <Link
          to={`/discipline/${id}`}
          className={styles['discipline-page-link']}
        >
          <div className={styles['discipline-page']}>
            <img
              src={arrowLeftIcon}
              alt="Стрелка направленная влево"
              className={styles.icon}
            />
            <h2 className={styles['discipline-title']}>
              {mockDisciplineData.name}
            </h2>
          </div>
        </Link>
        <div className={styles['rating-grade']}>
          <p>Общая оценка:</p>
          <p>{mockDisciplineData['average_rating']}</p>
        </div>
      </section>

      <section className="reviews">
        <ReviewsTitle
          commentsCount={mockReviewsData?.['total_comments']}
          handleOpenReviewForm={() => setIsReviewFormOpen(true)}
          isSecondaryButtonVisible={false}
        />
        <Sorting sortingData={reviewSorting} />

        <div className={styles['review-cards']}>
          {mockReviewsData?.comments.map((reviewData, index) => (
            <ReviewCard key={index} reviewData={reviewData} />
          ))}
        </div>
      </section>

      {isReviewFormOpen && (
        <ReviewForm
          disciplineName="Название дисциплины"
          disciplineId={id}
          criteria={mockCriteriaData}
          handleCloseReviewForm={() => setIsReviewFormOpen(false)}
        />
      )}

      {isReviewFormOpen && <div className={styles['blur-overlay']} />}
    </main>
  )
}
