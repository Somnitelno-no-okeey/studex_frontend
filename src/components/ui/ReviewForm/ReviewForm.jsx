import React from 'react'
import InputCriterion from '../inputCriterion'
import { useState } from 'react'
import styles from './review-from.module.css'
import SubmitButton from '../SubmitButton'
import { useSendReviewMutation } from '../../../api/disciplineApi'

const mockCriteria = [
  { criterion: 'Интересность дисциплины', average_rating: 4.5 },
  { criterion: 'Полезность', average_rating: 4.0 },
]

export default function ReviewForm({
  disciplineName,
  criteria,
  disciplineId,
  handleCloseReviewForm,
}) {
  const [userCriteria, setUserCriteria] = useState(
    mockCriteria.map(({ criterion }) => ({ criterion, rating: 0 }))
  )
  const [criteriaErrors, setCriteriaErrors] = useState(
    mockCriteria.map(() => false)
  )
  const [userText, setUserText] = useState('')
  const [isUserAnonymous, setIsUserAnonymous] = useState(false)

  const [sendReview, { isLoading }] = useSendReviewMutation()

  const onSubmit = async (evt) => {
    evt.preventDefault()

    const newErrors = userCriteria.map((criterion) => criterion.rating === 0)
    setCriteriaErrors(newErrors)

    if (!newErrors.some((error) => error)) {
      try {
        await sendReview({
          disciplineId,
          isAnonymous: isUserAnonymous,
          text: userText,
          criteria: userCriteria,
        }).unwrap()
        handleCloseReviewForm()
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <div className={styles['form-container']}>
      <h1>{disciplineName}</h1>
      <p className={styles['hint']}>
        Оцените дисциплину по следующим критериям по шкале от 1 (не согласен) до
        5 (полностью согласен)
      </p>
      <form onSubmit={onSubmit}>
        <div className={styles['criteria-inputs']}>
          {userCriteria.map((criterion, index) => (
            <InputCriterion
              error={criteriaErrors[index]}
              key={index}
              criterion={criterion}
              setCriterion={(evt) => {
                setUserCriteria((prev) =>
                  prev.map((item, i) =>
                    i === index
                      ? { ...item, rating: Number(evt.target.value) }
                      : item
                  )
                )
              }}
            />
          ))}

          {criteriaErrors.some((error) => error) && (
            <p className={styles['error-message']}>
              Необходимо оценить дисциплину по всем предложенным критериям
            </p>
          )}
        </div>

        <div className={styles['text-container']}>
          <p>Оставьте комментарий о дисциплине:</p>
          <textarea
            placeholder="Поле ввода комментария"
            className={userText.length > 0 ? styles['big-textarea'] : ''}
            value={userText}
            onChange={(evt) => setUserText(evt.target.value)}
          ></textarea>
        </div>
        <div className={styles['anonymous-container']}>
          <label className={styles['anonymous-label']}>
            <input
              type="checkbox"
              checked={isUserAnonymous}
              onChange={(evt) => setIsUserAnonymous(evt.target.checked)}
            />
          </label>
          <p>оставить отзыв анонимно</p>
        </div>

        <SubmitButton textContent="Оставить отзыв" isLoading={isLoading} />
        <button
          className={styles['secondary-button']}
          type="button"
          onClick={handleCloseReviewForm}
        >
          Отмена
        </button>
      </form>
    </div>
  )
}
