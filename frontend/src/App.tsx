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
  AdminOrderPage,
  AdminCoursePage,
  DashboardPage,
  MyStudentPage,
  CreateExamPage,
  CreateDetailPage
} from './pages'
import CommonLayout from './layouts/CommonLayout'
import AccountLayout from './layouts/AccountLayout'
import AdminLayout from './layouts/AdminLayout'
import { CourseApi, CourseAreaApi, CourseCategoryApi, CourseLanguageApi, UserApi } from './api'
import PaymetnSuccessPage from './pages/PaymentSucess'
import ViewExamPage from './pages/ViewExam'
import ExamDetailPage from './pages/ViewExam/ExamDetail'
const courseApi = new CourseApi()
const courseAreaApi = new CourseAreaApi()
const courseCategoryApi = new CourseCategoryApi()
const userApi = new UserApi()
const courseLanguageApi = new CourseLanguageApi()
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
            path: 'payment/success',
            element: <PaymetnSuccessPage />
          },
          {
            path: 'checkout/:courseId',
            loader: async ({ request, params }) => {
              console.log(params.courseId)
              const course_res = await courseApi.apiV1KhoaHocIdGet(params.courseId!, { signal: request.signal })
              const course = course_res.data
              return { course: course }
            },
            element: <CheckoutPage />
          },
          {
            path: 'courses',

            element: <CoursesPage />
          },
          {
            path: 'courses/course-detail/:courseId',
            loader: async ({ request, params }) => {
              const course_res = await courseApi.apiV1KhoaHocIdGet(params.courseId!, { signal: request.signal })
              console.log(params.courseId)
              const course = course_res.data
              return { course: course }
            },
            element: <CourseDetailPage />
          },
          {
            path: 'account',
            element: <AccountLayout />,
            children: [
              {
                path: 'mycourses',
                element: <MyCoursesPage />
              },
              {
                path: 'mystudents',
                element: <MyStudentPage />
              },
              {
                path: 'createexam',
                element: <CreateExamPage />
              },
              {
                path: 'viewexam',
                element: <ViewExamPage />
              },
              {
                path: 'viewexam/:id',
                element: <ExamDetailPage />
              },
              {
                path: 'createexam/:id',
                element: <CreateDetailPage />
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
    errorElement: <RootErrorBoundary />,
    children: [
      {
        path: 'dashboard',
        element: <DashboardPage />
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
      },
      {
        path: 'courses',
        element: <AdminCoursePage />
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
