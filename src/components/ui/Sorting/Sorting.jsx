import React, { useState } from 'react'
import styles from './sorting.module.css'

export default function Sorting({ sortingData }) {
  const [checkedElement, setCheckedElement] = useState(sortingData[0].value)

  return (
    <form className={styles['sort-form']}>
      <span className={styles['sort-label']}>Сортировка по:</span>

      {sortingData.map(({ name, value }) => (
        <label key={value} className={styles['sort-option']}>
          <input
            type="radio"
            name="sort"
            value={value}
            onChange={(evt) => setCheckedElement(evt.target.value)}
            checked={value === checkedElement}
          />
          <span className={styles['sort-text']}>{name}</span>
        </label>
      ))}
    </form>
  )
}
