import React, { useEffect, useState } from 'react'
import arrowLeftIcon from '../../../assets/icons/arrow-circle-left.svg'
import { Link, useNavigate, useParams } from 'react-router'
import {
  useGetDisciplineInfoQuery,
  useLazyGetReviewsByDisciplineQuery,
} from '../../../api/disciplineApi'
import styles from './reviews.module.css'
import ReviewsTitle from '../../ui/ReviewsTitle'
import ReviewCard from '../../ui/ReviewCard'
import ReviewForm from '../../ui/ReviewForm'
import Sorting from '../../ui/Sorting'
import { reviewSorting } from '../../../const'
import { useSelector } from 'react-redux'

export default function Reviews() {
  const { id } = useParams()
  const { data: disciplineData, isLoading: isDisciplineLoading } =
    useGetDisciplineInfoQuery(id)
  const [getReviews, { isLoading: isReviewsLoading }] =
    useLazyGetReviewsByDisciplineQuery()

  const navigate = useNavigate()

  const { isAuthenticated } = useSelector((state) => state.authSlice)

  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false)

  const [reviews, setReviews] = useState([])
  const [next, setNext] = useState(null)
  const [sortParam, setSortParam] = useState(reviewSorting[0].value)
  const [orderSortParam, setOrderSortParam] = useState('desc')

  const handleSortClick = (sort, order) => {
    setSortParam(sort)
    setOrderSortParam(order)
  }

  const getReviewsByPage = async (page) => {
    try {
      const reviewsData = await getReviews({
        sortBy: sortParam,
        order: orderSortParam,
        disciplineId: id,
        page,
      }).unwrap()
      if (reviewsData) {
        setReviews((prev) => [...prev, ...reviewsData.results])
        setNext(reviewsData.next)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const initialReviews = async () => {
    try {
      const reviewsData = await getReviews({
        sortBy: sortParam,
        order: orderSortParam,
        disciplineId: id,
        page: 1,
      }).unwrap()
      if (reviewsData) {
        setReviews(() => [...reviewsData.results])
        setNext(reviewsData.next)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    initialReviews()
  }, [sortParam, orderSortParam])

  async function loadMoreReviews() {
    if (isReviewsLoading || !next) return

    const url = new URL(next)
    const page = url.searchParams.get('page')

    getReviewsByPage(page)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - 300
      ) {
        loadMoreReviews()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loadMoreReviews])

  if (!isDisciplineLoading && !isReviewsLoading) {
    return (
      <>
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
                {disciplineData?.name}
              </h2>
            </div>
          </Link>
          <div className={styles['rating-grade']}>
            <p>Общая оценка:</p>
            <p>{disciplineData?.['avg_rating']}</p>
          </div>
        </section>

        <section className={styles['reviews']}>
          <ReviewsTitle
            commentsCount={disciplineData?.['reviews_count']}
            handleOpenReviewForm={() => {
              if (!isAuthenticated) {
                navigate('/login')
              }
              setIsReviewFormOpen(true)
            }}
            isSecondaryButtonVisible={false}
          />
          <div className={styles['sorting-wrapper']}>
            <Sorting
              sortingData={reviewSorting}
              handleClick={handleSortClick}
            />
          </div>

          <div className={styles['review-cards']}>
            {reviews.map((reviewData, index) => (
              <ReviewCard key={index} reviewData={reviewData} />
            ))}
          </div>
        </section>

        {isReviewFormOpen && (
          <ReviewForm
            disciplineName="Название дисциплины"
            disciplineId={id}
            criteria={disciplineData?.criteria}
            handleCloseReviewForm={() => setIsReviewFormOpen(false)}
          />
        )}

        {isReviewFormOpen && <div className={styles['blur-overlay']} />}
      </>
    )
  }
}
