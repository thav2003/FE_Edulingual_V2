import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'

import { Fallback, Layout, RootErrorBoundary, Project, ProjectErrorBoundary, projectLoader } from './routes'
import { ForgetPasswordPage, LoginPage, RegisterPage, ResetPasswordPage, VerifyPage } from './pages'
import CommonLayout from './layouts/CommonLayout'
import HomePage from './pages/Home'

const router = createBrowserRouter([
  {
    path: '/',
    element: <CommonLayout />,
    children: [
      {
        path: '',
        element: <Outlet />,
        errorElement: <RootErrorBoundary />,
        children: [
          {
            index: true,
            element: <HomePage />
          },
          {
            path: 'projects/:projectId',
            element: <Project />,
            errorElement: <ProjectErrorBoundary />,
            loader: projectLoader
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    path: '/forgetpassword',
    element: <ForgetPasswordPage />
  },
  {
    path: '/verify',
    element: <VerifyPage />
  },
  {
    path: '/resetpassword',
    element: <ResetPasswordPage />
  }
])

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose())
}

export default function App() {
  return <RouterProvider router={router} fallbackElement={<Fallback />} />
}
