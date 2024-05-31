import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'

import { Fallback, RootErrorBoundary, Project, ProjectErrorBoundary, projectLoader } from './routes'
import {
  CourseDetailPage,
  CoursesPage,
  ForgetPasswordPage,
  HomePage,
  LoginPage,
  RegisterPage,
  ResetPasswordPage,
  VerifyPage,
  MyCoursesPage,
  CheckoutPage,
  AdminStudentPage,
  AdminTeacherPage,
  AdminOrderPage
} from './pages'
import CommonLayout from './layouts/CommonLayout'
import AccountLayout from './layouts/AccountLayout'
import AdminLayout from './layouts/AdminLayout'

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
            path: 'checkout/:courseId',
            element: <CheckoutPage />
          },
          {
            path: 'courses',
            element: <CoursesPage />
          },
          {
            path: 'courses/course-detail/:courseId',
            element: <CourseDetailPage />
          },
          {
            path: 'account',
            element: <AccountLayout />,
            children: [
              {
                path: 'mycourses',
                element: <MyCoursesPage />
              }
            ]
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
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        path: 'dashboard',
        element: <div>dashboard</div>
      },
      {
        path: 'students',
        element: <AdminStudentPage />
      },
      {
        path: 'teachers',
        element: <AdminTeacherPage />
      },
      {
        path: 'orders',
        element: <AdminOrderPage />
      }
    ]
  }
])

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose())
}

export default function App() {
  return <RouterProvider router={router} fallbackElement={<Fallback />} />
}
