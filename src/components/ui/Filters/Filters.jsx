import React, { useState } from 'react'
import styles from './filters.module.css'
import closeIcon from '../../../assets/icons/close-icon.svg'
import { useGetModulesQuery } from '../../../api/disciplineApi'
import { disciplineFormats, disciplineTypes } from '../../../const'

export default function Filters({
  onClose,
  onSubmit,
  filtersParam,
  setFiltersParam,
  onResetClick,
}) {
  const { data: modulesData, isLoading: isModulesLoading } =
    useGetModulesQuery()

  const [visibleModules, setVisibleModules] = useState(3)

  if (!isModulesLoading) {
    return (
      <div className={styles['filter-panel']}>
        <div className={styles.title}>
          <h3>Фильтры</h3>
          <button className={styles['close-btn']} onClick={onClose}>
            <img src={closeIcon} />
          </button>
        </div>

        <div className={styles.section}>
          <div className={styles['mini-title']}>Рейтинг</div>
          <div className={styles['rating-inputs']}>
            <input
              type="number"
              placeholder="От"
              value={filtersParam.rating}
              min={0}
              max={5}
              onChange={(evt) => {
                const val = evt.target.value
                if (val === '' || (Number(val) >= 0 && Number(val) <= 5)) {
                  setFiltersParam((prev) => ({
                    ...prev,
                    rating: val,
                  }))
                }
              }}
            />
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles['mini-title']}>Модуль</div>
          <input className="search-input" type="text" placeholder="Поиск...." />
          {modulesData.slice(0, visibleModules).map(({ id, name }) => (
            <div className={styles['checkbox-row']} key={id}>
              <input
                type="checkbox"
                value={id}
                checked={filtersParam.modules.includes(id)}
                onChange={(evt) => {
                  const isChecked = evt.target.checked

                  if (isChecked) {
                    setFiltersParam((prev) => ({
                      ...prev,
                      modules: [...prev.modules, id],
                    }))
                  } else {
                    setFiltersParam((prev) => ({
                      ...prev,
                      modules: prev.modules.filter((modId) => modId !== id),
                    }))
                  }
                }}
              />
              <p>{name}</p>
            </div>
          ))}

          {modulesData.length > 3 && (
            <button
              className={styles['more-btn']}
              onClick={() => setVisibleModules(10000)}
            >
              Посмотреть все
            </button>
          )}
        </div>

        <div className={styles.section}>
          <div className={styles['mini-title']}>Формат проведения</div>
          {disciplineFormats.map(({ name, value }) => (
            <div className={styles['checkbox-row']} key={value}>
              <input
                type="checkbox"
                value={value}
                checked={filtersParam.discipline_formats.includes(value)}
                onChange={(evt) => {
                  const isChecked = evt.target.checked

                  if (isChecked) {
                    setFiltersParam((prev) => ({
                      ...prev,
                      discipline_formats: [
                        ...prev.discipline_formats,
                        evt.target.value,
                      ],
                    }))
                  } else {
                    setFiltersParam((prev) => ({
                      ...prev,
                      discipline_formats: prev.discipline_formats.filter(
                        (val) => val !== evt.target.value
                      ),
                    }))
                  }
                }}
              />
              <p>{name}</p>
            </div>
          ))}
        </div>

        <div className={styles.section}>
          <div className={styles['mini-title']}>Тип контроля</div>
          {disciplineTypes.map(({ name, value }) => (
            <div className={styles['radio-row']} key={value}>
              <input
                type="radio"
                name="control"
                value={value}
                checked={filtersParam.control_type === value}
                onChange={(evt) =>
                  setFiltersParam((prev) => ({
                    ...prev,
                    control_type: evt.target.value,
                  }))
                }
              />
              <p>{name}</p>
            </div>
          ))}
        </div>

        <div className={styles['button-row']}>
          <button
            className={`${styles.btn} ${styles.apply}`}
            onClick={onSubmit}
          >
            Применить
          </button>
          <button
            className={`${styles.btn} ${styles.reset}`}
            onClick={onResetClick}
          >
            Сбросить
          </button>
        </div>
      </div>
    )
  }
}
