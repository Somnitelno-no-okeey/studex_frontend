import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { router } from './routes/route.js'
import { store } from './app/store'
import { Provider } from 'react-redux'
import './styles/main.css'
import './styles/variables.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)
