import React, { useState } from 'react'
import styles from './sorting.module.css'

export default function Sorting({ sortingData, handleClick }) {
  const [checkedElement, setCheckedElement] = useState(sortingData[0].value)
  const [orders, setOrders] = useState(sortingData.map(() => 'desc'))

  return (
    <form className={styles['sort-form']}>
      <span className={styles['sort-label']}>Сортировка по:</span>

      {sortingData.map(({ name, value }, index) => (
        <label
          key={value}
          className={`${styles['sort-option']} ${styles[orders[index]]}`}
        >
          <input
            type="radio"
            name="sort"
            value={value}
            onClick={() => {
              setOrders((prev) => {
                const newOrders = [...prev]
                newOrders[index] =
                  newOrders[index] === 'desc' && value === checkedElement
                    ? 'asc'
                    : 'desc'
                handleClick(value, newOrders[index])

                return newOrders
              })
            }}
            onChange={(evt) => setCheckedElement(evt.target.value)}
            checked={value === checkedElement}
          />
          <span className={styles['sort-text']}>{name}</span>
        </label>
      ))}
    </form>
  )
}
