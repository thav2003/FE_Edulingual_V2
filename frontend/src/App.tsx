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
  AdminCoursePage
} from './pages'
import CommonLayout from './layouts/CommonLayout'
import AccountLayout from './layouts/AccountLayout'
import AdminLayout from './layouts/AdminLayout'
import { CourseApi, CourseAreaApi, CourseCategoryApi, CourseLanguageApi, UserApi } from './api'
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
            loader: async ({ request }) => {
              const course_res = await courseApi.apiV1KhoaHocPagingGet(1, 6, { signal: request.signal })
              const area_res = await courseAreaApi.apiV1KhuVucGet(1, 10000, { signal: request.signal })
              const courses = course_res.data
              const areas = area_res.data
              return { courses: courses, areas: areas }
            },
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
    errorElement: <RootErrorBoundary />,
    children: [
      {
        path: 'dashboard',
        element: <div>dashboard</div>
      },
      {
        path: 'students',
        loader: async ({ request }) => {
          const user_res = await userApi.apiV1UsersGet(1, 10000, { signal: request.signal })

          const users = user_res.data
          return { users: users }
        },
        element: <AdminStudentPage />
      },
      {
        path: 'teachers',
        loader: async ({ request }) => {
          const url = new URL(request.url)
          let size
          let page
          const pageParams = url.searchParams.get('page')
          const sizeParams = url.searchParams.get('size')

          if (pageParams !== null) {
            page = Number(pageParams)
          } else {
            page = 1
          }

          if (sizeParams !== null) {
            size = Number(sizeParams)
          } else {
            size = 10
          }

          console.log('page: ' + page)
          console.log('size: ' + size)
          const user_res = await userApi.apiV1UsersGet(page, size, { signal: request.signal })

          const users = user_res.data
          return { users: users }
        },
        element: <AdminTeacherPage />
      },
      {
        path: 'orders',
        element: <AdminOrderPage />
      },
      {
        path: 'courses',
        loader: async ({ request }) => {
          const url = new URL(request.url)
          let size
          let page
          const pageParams = url.searchParams.get('page')
          const sizeParams = url.searchParams.get('size')

          if (pageParams !== null) {
            page = Number(pageParams)
          } else {
            page = 1
          }

          if (sizeParams !== null) {
            size = Number(sizeParams)
          } else {
            size = 10
          }

          console.log('page: ' + page)
          console.log('size: ' + size)
          const course_res = await courseApi.apiV1KhoaHocPagingGet(page, size, { signal: request.signal })
          const courseCategory_res = await courseCategoryApi.apiV1LoaiKhoaHocGet(page, size, { signal: request.signal })
          const courseLanguage_res = await courseLanguageApi.apiV1NgonNguGet(page, size, { signal: request.signal })
          const courseArea_res = await courseAreaApi.apiV1KhuVucGet(page, size, { signal: request.signal })
          const user_res = await userApi.apiV1UsersGet(1, 10000, { signal: request.signal })

          const users = user_res.data
          const courses = course_res.data
          const courseCategory = courseCategory_res.data
          const courseLanguage = courseLanguage_res.data
          const courseArea = courseArea_res.data
          return {
            courses: courses,
            courseCategory: courseCategory,
            courseLanguage: courseLanguage,
            courseArea: courseArea,
            users: users
          }
        },
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
