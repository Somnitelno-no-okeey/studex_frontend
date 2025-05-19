import React from 'react'
import bookIcon from '../../../assets/icons/book.svg'
import styles from './discipline.module.css'
import {
  useGetCriteriaByDisciplineQuery,
  useGetDisciplineInfoQuery,
} from '../../../api/disciplineApi'
import { useParams } from 'react-router'
import CriterionRating from '../../ui/CriterionRating/CriterionRating'
import crownIcon from '../../../assets/icons/crown.svg'
import noteIcon from '../../../assets/icons/note-2.svg'
import teacherIcon from '../../../assets/icons/Icon.svg'
import arrowIcon from '../../../assets/icons/icon2.svg'

export default function Discipline() {
  const { id } = useParams()
  const { disciplineData } = useGetDisciplineInfoQuery(id)
  const { criteriaData } = useGetCriteriaByDisciplineQuery(id)

  return (
    <>
      <div className={styles['card-discipline']}>
        <div className={styles['card-header']}>
          <div>
            <h1 className={styles['card-title']}>
              {disciplineData?.name || 'Название дисциплины'}
            </h1>
          </div>
          <div className={styles['card-rating']}>
            <p>Общая оценка:</p>
            <p>{disciplineData?.['average_rating'] || '3,6'}</p>
          </div>
        </div>
        <div className={styles['card-meta']}>
          <div className={styles.module}>
            <img src={bookIcon} alt="Иконка книги" className={styles.icon} />
            <p>Модуль: {disciplineData?.module || 'название модуля'}</p>
          </div>
          <p>Формат проведения: {disciplineData?.format || 'традиционная'}</p>
          <p>Тип контроля: {disciplineData?.['control_type'] || 'зачет'}</p>
        </div>
      </div>

      <div className={styles['card']}>
        <div className={styles['icon-text']}>
          <img src={crownIcon} alt="Иконка короны" className={styles['icon']} />
          <h3 className={styles['card-subtitle']}>Критерии качества</h3>
        </div>
        <CriterionRating
          rating={3.6}
          showNumberRating={true}
          criterionName="Интересность дисциплины"
        />
        <CriterionRating
          rating={3.6}
          showNumberRating={true}
          criterionName="Уровень сложности"
        />

        {/* {criteriaData.map(({ average_rating, criterion }, index) => (
          <CriterionRating
            key={index}
            rating={average_rating}
            showNumberRating={true}
            criterionName={criterion}
          />
        ))} */}
      </div>

      <div className={styles.card}>
        <div className={styles['icon-text']}>
          <img src={noteIcon} alt="Иконка страниц" className={styles.icon} />
          <h3 className={styles['card-subtitle']}>Описание</h3>
        </div>
        <p className={styles['description']}>
          {disciplineData?.description ||
            ' Lorem Ipsum - это текст-рыба, часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной рыбой для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.'}
        </p>
        <p className={styles['last-updated']}>
          Дата последнего изменения:{' '}
          {disciplineData?.['last_update'] || '22.04.2025'}
        </p>
      </div>

      <details className={`${styles['card-teachers']} ${styles.card}`}>
        <summary className={styles['icon-text-teachers']}>
          <img src={teacherIcon} alt="Иконка шляпы" className={styles.icon} />
          <h3 className={styles['card-subtitle']}>Преподаватели</h3>
          <span className={styles['toggle-button']}>
            <img src={arrowIcon} alt="Открывающая стрелка вниз" />
          </span>
        </summary>
        <ul className={styles['teachers']}>
          <li>Фамилия Имя Отчество</li>
          <li>Фамилия Имя Отчество</li>
          <li>Фамилия Имя Отчество</li>
          <li>Фамилия Имя Отчество</li>

          {/* {disciplineData?.teachers.map((teacher, index) => (
            <li key={index}>{teacher}</li>
          ))} */}
        </ul>
      </details>
    </>
  )
}
