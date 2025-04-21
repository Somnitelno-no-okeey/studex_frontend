import React from 'react'
import styles from '../../../styles/auth.module.css'

export default function AuthLayout({ children }) {
  return (
    <main>
      <div className={styles.container}>
        {children}
        <p className="caption">
          По всем вопросам можете обращаться: adminexample@gmail.com
        </p>
      </div>
    </main>
  )
}
