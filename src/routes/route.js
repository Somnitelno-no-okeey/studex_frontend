import { createBrowserRouter } from 'react-router'
import Login from '../components/pages/Login'
import Register from '../components/pages/Register'
import App from '../components/App'
import AppLayout from '../components/layouts/AppLayout'
import ResetPassword from '../components/pages/ResetPassword'
import Discipline from '../components/pages/Discipline'
import Reviews from '../components/pages/Reviews'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        path: '/',
        Component: AppLayout,
        children: [
          {
            path: '/discipline/:id',
            Component: Discipline,
          },
          {
            path: '/discipline/:id/reviews',
            Component: Reviews,
          },
        ],
      },
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'register',
        Component: Register,
      },
      {
        path: 'reset-password',
        Component: ResetPassword,
      },
    ],
  },
])
