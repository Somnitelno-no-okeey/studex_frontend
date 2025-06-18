import React, { useEffect, useState } from 'react'
import bookIcon from '../../../assets/icons/book.svg'
import styles from './discipline.module.css'
import {
  useDeleteReviewMutation,
  useGetDisciplineInfoQuery,
  useGetReviewsByDisciplineQuery,
  useGetUserReviewQuery,
  useLazyGetReviewByIdQuery,
} from '../../../api/disciplineApi'
import { useNavigate, useParams } from 'react-router'
import CriterionRating from '../../ui/CriterionRating/CriterionRating'
import crownIcon from '../../../assets/icons/crown.svg'
import noteIcon from '../../../assets/icons/note-2.svg'
import teacherIcon from '../../../assets/icons/Icon.svg'
import arrowIcon from '../../../assets/icons/icon2.svg'
import ReviewsTitle from '../../ui/ReviewsTitle'
import ReviewForm from '../../ui/ReviewForm'
import ReviewCard from '../../ui/ReviewCard'
import { useSelector } from 'react-redux'
import DeleteMessage from '../../ui/DeleteMessage/DeleteMessage'

export default function Discipline() {
  const { id } = useParams()
  const { data: disciplineData, isLoading: isDisciplineLoading } =
    useGetDisciplineInfoQuery(id)

  const { data: reviewsData, isLoading: isReviewsLoading } =
    useGetReviewsByDisciplineQuery({
      disciplineId: id,
    })

  const { data: userReviewId } = useGetUserReviewQuery({ disciplineId: id })
  const [getReviewById] = useLazyGetReviewByIdQuery()

  const [deleteReview] = useDeleteReviewMutation()

  const navigate = useNavigate()

  const { isAuthenticated } = useSelector((state) => state.authSlice)

  const [userReview, setUserReview] = useState('')

  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false)
  const [isReviewUpdateFormOpen, setIsReviewUpdateFormOpen] = useState(false)
  const [isDeleteMessageOpen, setIsDeleteMessageOpen] = useState(false)

  const getReview = async (reviewId) => {
    try {
      const userReview = await getReviewById({
        disciplineId: id,
        id: reviewId,
      }).unwrap()
      setUserReview(userReview)
    } catch (error) {
      console.error(error)
    }
  }

  const onDeleteReview = async () => {
    try {
      await deleteReview({ disciplineId: id, id: userReviewId['review_id'] })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (userReviewId?.['review_id']) {
      getReview(userReviewId['review_id'])
    }
  }, [userReviewId])

  if (!isDisciplineLoading && !isReviewsLoading) {
    return (
      <>
        <div className={styles['card-discipline']}>
          <div className={styles['card-header']}>
            <div>
              <h1 className={styles['card-title']}>{disciplineData?.name}</h1>
            </div>
            <div className={styles['card-rating']}>
              <p>Общая оценка:</p>
              <p>{disciplineData?.['avg_rating']}</p>
            </div>
          </div>
          <div className={styles['card-meta']}>
            <div className={styles.module}>
              <img src={bookIcon} alt="Иконка книги" className={styles.icon} />
              <p>Модуль: {disciplineData?.module}</p>
            </div>
            <div className={styles['additional-info']}>
              <p className={styles.format}>
                Формат проведения: {disciplineData?.format}
              </p>
              <p className={styles['control-type']}>
                Тип контроля: {disciplineData?.['control_type']}
              </p>
            </div>
          </div>
        </div>

        <div className={styles['card']}>
          <div className={styles['icon-text']}>
            <img
              src={crownIcon}
              alt="Иконка короны"
              className={styles['icon']}
            />
            <h3 className={styles['card-subtitle']}>Критерии качества</h3>
          </div>
          <div className={styles['criteria-container']}>
            {disciplineData?.criteria.map(({ rating, criterion }, index) => (
              <CriterionRating
                key={index}
                rating={rating}
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
          <p className={styles['description']}>{disciplineData?.description}</p>
          <p className={styles['last-updated']}>
            Дата последнего изменения: {disciplineData?.['last_update']}
          </p>
        </div>

        <details className={`${styles['card-teachers']} ${styles.card}`}>
          <summary
            className={`${styles['icon-text-teachers']} ${styles['icon-text']}`}
          >
            <img src={teacherIcon} alt="Иконка шляпы" className={styles.icon} />
            <h3 className={styles['card-subtitle']}>Преподаватели</h3>

            {!disciplineData.teachers.length > 0 ? (
              <span className={styles['teachers-error']}>
                Информация о преподавателях временно недоступна
              </span>
            ) : (
              <span className={styles['toggle-button']}>
                <img src={arrowIcon} alt="Открывающая стрелка вниз" />
              </span>
            )}
          </summary>
          {disciplineData?.teachers.length > 0 && (
            <ul className={styles['teachers']}>
              {disciplineData?.teachers.map((teacher, index) => (
                <li key={index}>{teacher['full_name']}</li>
              ))}
            </ul>
          )}
        </details>

        <div className="reviews">
          <ReviewsTitle
            commentsCount={disciplineData?.['review_count']}
            handleOpenReviewForm={() => {
              if (!isAuthenticated) {
                navigate('/login')
              }
              setIsReviewFormOpen(true)
            }}
          />

          <div className={styles['review-cards']}>
            {userReview && (
              <ReviewCard
                reviewData={userReview}
                isUserReview={true}
                onEditClick={() => setIsReviewUpdateFormOpen(true)}
                onDeleteClick={() => setIsDeleteMessageOpen(true)}
              />
            )}
            {reviewsData?.results
              .slice(0, 3)
              .map(
                (reviewData) =>
                  reviewData.id !== userReviewId['review_id'] && (
                    <ReviewCard key={reviewData.id} reviewData={reviewData} />
                  )
              )}
          </div>
        </div>

        {isReviewFormOpen && (
          <ReviewForm
            disciplineName="Название дисциплины"
            disciplineId={id}
            criteria={disciplineData?.criteria}
            handleCloseReviewForm={() => setIsReviewFormOpen(false)}
          />
        )}

        {isReviewUpdateFormOpen && (
          <ReviewForm
            disciplineName={disciplineData?.name}
            disciplineId={id}
            id={userReviewId['review_id']}
            criteria={userReview?.criteria}
            isUpdateformMode={true}
            reviewData={userReview}
            handleCloseReviewForm={() => setIsReviewUpdateFormOpen(false)}
          />
        )}

        {isDeleteMessageOpen && (
          <DeleteMessage
            onClose={() => setIsDeleteMessageOpen(false)}
            onDelete={onDeleteReview}
          />
        )}

        {(isReviewFormOpen ||
          isReviewUpdateFormOpen ||
          isDeleteMessageOpen) && <div className={styles['blur-overlay']} />}
      </>
    )
  }
}
