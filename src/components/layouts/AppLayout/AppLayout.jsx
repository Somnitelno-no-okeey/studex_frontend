import React from 'react'
import { Outlet } from 'react-router'
import Header from '../../ui/Header'
import Footer from '../../ui/Footer'
import styles from './app-layout.module.css'

export default function AppLayout() {
  return (
    <div className={styles['app-layout']}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
