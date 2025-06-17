import React from 'react'
import Star from '../Star'
import styles from './input-criterion.module.css'
import questionIcon from '../../../assets/icons/Question.svg'

export default React.memo(function InputCriterion({
  criterion,
  setCriterion,
  error,
}) {
  return (
    <div className={styles['criterion-input-container']}>
      <div className={styles['criterion-name-container']}>
        <img src={questionIcon} />
        <p
          className={`${styles['criterion-name']} ${error ? styles['error-criterion'] : ''}`}
        >
          {criterion.criterion}
          <span>*</span>
        </p>
      </div>
      <div className={styles['inputs-container']}>
        {Array.from({ length: 5 }).map((_, index) => {
          const percent = (criterion.rating - index) * 100
          return (
            <label key={index} className={styles['label-rating']}>
              <Star percent={percent} />
              <input
                type="radio"
                name={criterion.criterion}
                value={index + 1}
                onChange={setCriterion}
              />
            </label>
          )
        })}
      </div>
    </div>
  )
})
