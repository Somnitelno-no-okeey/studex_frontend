import { createBrowserRouter } from 'react-router'
import Login from '../components/pages/Login'
import Register from '../components/pages/Register'
import App from '../components/App'
import AppLayout from '../components/layouts/AppLayout'
import Verify from '../components/pages/Verify'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        path: '/',
        Component: AppLayout,
      },
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'register',
        children: [
          {
            index: true,
            Component: Register,
          },
          {
            path: 'verify',
            Component: Verify,
          },
        ],
      },
    ],
  },
])
