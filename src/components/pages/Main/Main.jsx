import React from 'react'
import styles from './main.module.css'
import Sorting from '../../ui/Sorting'
import { disciplineSorting } from '../../../const'
import filterIcon from '../../../assets/icons/filter.svg'
import DisciplineCard from '../../ui/DisciplineCard'
import { useLazyGetDisciplinesQuery } from '../../../api/disciplineApi'
import { useState } from 'react'
import Filters from '../../ui/Filters'
import { useEffect } from 'react'
import arrowLeftIcon from '../../../assets/icons/arrow-left.svg'
import arrowRightIcon from '../../../assets/icons/arrow-right.svg'

export default function Main() {
  const [sortParam, setSortParam] = useState(disciplineSorting[0].value)
  const [orderSortParam, setOrderSortParam] = useState('desc')
  const [disciplines, setDisciplines] = useState()
  const [page, setPage] = useState(1)

  const [filtersParam, setFiltersParam] = useState({
    rating: '',
    modules: [],
    control_type: '',
    discipline_formats: [],
    search: '',
  })

  const [isFiltersVisible, setIsFiltersVisible] = useState(false)

  const [getDisciplines, { isLoading }] = useLazyGetDisciplinesQuery()

  const getFilteredDisciplines = async () => {
    try {
      const filteredDisciplines = await getDisciplines({
        page,
        ...filtersParam,
        sortBy: sortParam,
        order: orderSortParam,
      }).unwrap()

      setDisciplines(filteredDisciplines)
    } catch (error) {
      console.error(error)
    }
  }

  const handleSortClick = (sort, order) => {
    setPage(1)
    setSortParam(sort)
    setOrderSortParam(order)
  }

  const onFiltersSubmit = async () => {
    setIsFiltersVisible(false)

    getFilteredDisciplines()
  }

  useEffect(() => {
    getFilteredDisciplines()
  }, [])

  useEffect(() => {
    getFilteredDisciplines()
  }, [orderSortParam, sortParam, page])

  useEffect(() => {
    const timer = setTimeout(getFilteredDisciplines, 500)

    return () => clearTimeout(timer)
  }, [filtersParam.search])

  if (!isLoading && disciplines) {
    return (
      <>
        <form className={styles['search-form']}>
          <svg
            className={styles['search-icon']}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.5 21.75C5.85 21.75 1.25 17.15 1.25 11.5C1.25 5.85 5.85 1.25 11.5 1.25C17.15 1.25 21.75 5.85 21.75 11.5C21.75 17.15 17.15 21.75 11.5 21.75ZM11.5 2.75C6.67 2.75 2.75 6.68 2.75 11.5C2.75 16.32 6.67 20.25 11.5 20.25C16.33 20.25 20.25 16.32 20.25 11.5C20.25 6.68 16.33 2.75 11.5 2.75Z"
              fill="#666666"
            />
            <path
              d="M21.9999 22.7499C21.8099 22.7499 21.6199 22.6799 21.4699 22.5299L19.4699 20.5299C19.1799 20.2399 19.1799 19.7599 19.4699 19.4699C19.7599 19.1799 20.2399 19.1799 20.5299 19.4699L22.5299 21.4699C22.8199 21.7599 22.8199 22.2399 22.5299 22.5299C22.3799 22.6799 22.1899 22.7499 21.9999 22.7499Z"
              fill="#666666"
            />
          </svg>
          <input
            type="text"
            className={styles['search-input']}
            value={filtersParam.search}
            onChange={(evt) =>
              setFiltersParam((prev) => ({ ...prev, search: evt.target.value }))
            }
            placeholder="Поиск"
          />
        </form>

        <div className={styles['sorting-wrapper']}>
          <Sorting
            sortingData={disciplineSorting}
            handleClick={handleSortClick}
          />
          <button
            type="button"
            className={styles['filter-button']}
            onClick={() => setIsFiltersVisible((prev) => !prev)}
          >
            <img src={filterIcon} alt="Фильтры" />
            Фильтры
          </button>
        </div>

        <div className={styles['discipline-cards']}>
          {disciplines.results.map((disciplineData, index) => (
            <DisciplineCard key={index} disciplineData={disciplineData} />
          ))}
        </div>

        {(disciplines.prev || disciplines.next) && (
          <div className={styles.pagination}>
            <button
              disabled={!disciplines.prev}
              type="button"
              onClick={() => setPage((prev) => prev - 1)}
            >
              <img src={arrowLeftIcon} />
            </button>
            <button
              disabled={!disciplines.next}
              type="button"
              onClick={() => setPage((prev) => prev + 1)}
            >
              <img src={arrowRightIcon} />
            </button>
          </div>
        )}

        {isFiltersVisible && (
          <Filters
            onClose={() => setIsFiltersVisible(false)}
            onSubmit={onFiltersSubmit}
            filtersParam={filtersParam}
            setFiltersParam={setFiltersParam}
          />
        )}

        {isFiltersVisible && <div className={styles['blur-overlay']} />}
      </>
    )
  }
}
