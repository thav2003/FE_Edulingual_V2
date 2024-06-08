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
              const courseCategory_res = await courseCategoryApi.apiV1LoaiKhoaHocGet(1, 10, { signal: request.signal })
              const courseLanguage_res = await courseLanguageApi.apiV1NgonNguGet(1, 10, { signal: request.signal })
              const courseArea_res = await courseAreaApi.apiV1KhuVucGet(1, 10, { signal: request.signal })

              const courses = course_res.data

              const courseCategory = courseCategory_res.data
              const courseLanguage = courseLanguage_res.data
              const courseArea = courseArea_res.data
              return {
                courses: courses,
                courseArea: courseArea,
                courseCategory: courseCategory,
                courseLanguage: courseLanguage
              }
            },
            element: <HomePage />
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
            loader: async ({ request }) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any, react-hooks/rules-of-hooks

              const url = new URL(request.url)
              const areaId = url.searchParams.get('area') as string
              const languageId = url.searchParams.get('language') as string
              const categoryiD = url.searchParams.get('category') as string
              console.log(areaId)
              console.log(languageId)
              console.log(categoryiD)
              const course_res = await courseApi.apiV1KhoaHocGet(areaId, languageId, categoryiD, {
                signal: request.signal
              })
              const courseCategory_res = await courseCategoryApi.apiV1LoaiKhoaHocGet(1, 10, { signal: request.signal })
              const courseLanguage_res = await courseLanguageApi.apiV1NgonNguGet(1, 10, { signal: request.signal })
              const courseArea_res = await courseAreaApi.apiV1KhuVucGet(1, 10, { signal: request.signal })
              // const courses = {
              //   pageNumber: 0,
              //   pageSize: 0,
              //   totalCount: 4,
              //   statusCode: 200,
              //   message: null,
              //   data: {
              //     size: 10,
              //     page: 1,
              //     total: 4,
              //     totalPages: 1,
              //     items: [
              //       {
              //         courseArea: {
              //           name: 'Hồ Chí Minh',
              //           status: 1,
              //           id: '5ba09309-975b-423f-920d-960959c15601',
              //           createdAt: '2024-06-08T01:01:32.3719483+07:00',
              //           updatedAt: '2024-06-08T01:01:32.3719483+07:00',
              //           createdBy: null,
              //           updatedBy: null,
              //           isDeleted: false
              //         },
              //         courseLanguage: {
              //           name: 'Tiếng Anh',
              //           status: 1,
              //           id: 'd8cbffe9-3f51-44b4-941c-4945b3aa96b6',
              //           createdAt: '2024-06-08T01:01:32.3719505+07:00',
              //           updatedAt: '2024-06-08T01:01:32.3719506+07:00',
              //           createdBy: null,
              //           updatedBy: null,
              //           isDeleted: false
              //         },
              //         courseCategory: {
              //           name: 'Giao tiếp',
              //           status: 1,
              //           id: '8d56eb49-ef27-44e9-8dcb-57e2b17de018',
              //           createdAt: '2024-06-08T01:01:32.3719518+07:00',
              //           updatedAt: '2024-06-08T01:01:32.3719518+07:00',
              //           createdBy: null,
              //           updatedBy: null,
              //           isDeleted: false
              //         },
              //         center: {
              //           userName: 'teacher-02',
              //           password: '1',
              //           fullName: 'Trung Tâm Tiếng Anh JOLO',
              //           description:
              //             'Trung Tâm Luyện IELTS Uy Tín — Hệ thống giảng dạy và đánh giá độc lập, chấm thi và khảo thí bằng AI, có kết quả ngay. Khóa IELTS Summer Camp tại JOLO bao gồm 4 cấp độ từ trình độ cơ bản đến nâng cao.',
              //           status: 0,
              //           id: 'c3be14d3-1ba8-4e5a-a403-f0c6768b0c7f',
              //           createdAt: '2024-05-22T20:31:01.365706+07:00',
              //           updatedAt: '2024-05-22T20:31:01.365709+07:00',
              //           createdBy: null,
              //           updatedBy: null,
              //           isDeleted: false
              //         },
              //         title: 'GLOBAL ENGLISH',
              //         description:
              //           'Học viên được học tập tích cực, giao tiếp 100% tiếng Anh với nhiều bài học chuyên đề chất lượng cao, phù hợp ở mỗi cấp độ. Phương pháp “Học qua dự án” (Project-based learning) giúp học viên tăng thêm sự tự tin khi sử dụng tiếng Anh ở đa dạng các lĩnh vực và giúp hoàn thiện 6 kỹ năng vàng của kỷ nguyên số, nắm bắt xu hướng nghề nghiệp.',
              //         duration: '3 tháng',
              //         tuitionFee: 0,
              //         id: '015120a5-1e82-4d48-b019-5cab6860f438',
              //         createdAt: '2024-05-22T20:31:32.445395+07:00',
              //         updatedAt: '2024-05-22T20:31:32.445397+07:00',
              //         createdBy: null,
              //         updatedBy: null,
              //         isDeleted: false
              //       },
              //       {
              //         courseArea: {
              //           name: 'Hồ Chí Minh',
              //           status: 1,
              //           id: '5ba09309-975b-423f-920d-960959c15601',
              //           createdAt: '2024-06-08T01:01:32.3719558+07:00',
              //           updatedAt: '2024-06-08T01:01:32.3719558+07:00',
              //           createdBy: null,
              //           updatedBy: null,
              //           isDeleted: false
              //         },
              //         courseLanguage: {
              //           name: 'Tiếng Anh',
              //           status: 1,
              //           id: 'd8cbffe9-3f51-44b4-941c-4945b3aa96b6',
              //           createdAt: '2024-06-08T01:01:32.371956+07:00',
              //           updatedAt: '2024-06-08T01:01:32.371956+07:00',
              //           createdBy: null,
              //           updatedBy: null,
              //           isDeleted: false
              //         },
              //         courseCategory: {
              //           name: 'Giao tiếp',
              //           status: 1,
              //           id: '8d56eb49-ef27-44e9-8dcb-57e2b17de018',
              //           createdAt: '2024-06-08T01:01:32.3719561+07:00',
              //           updatedAt: '2024-06-08T01:01:32.3719562+07:00',
              //           createdBy: null,
              //           updatedBy: null,
              //           isDeleted: false
              //         },
              //         center: {
              //           userName: 'teacher-01',
              //           password: '1',
              //           fullName: 'Trung tâm tiếng Anh Vicky English',
              //           description:
              //             'VICKY English là Trung tâm Anh ngữ đào tạo chuyên sâu các khóa học Phát âm chuẩn & Giao tiếp phản xạ dành cho Cá nhân và Doanh nghiệp tại TP.HCM.',
              //           status: 1,
              //           id: '07620da0-77f6-48e7-b7f6-7f0c24637a3b',
              //           createdAt: '2024-05-22T14:45:11.889693+07:00',
              //           updatedAt: '2024-05-22T14:45:11.889697+07:00',
              //           createdBy: null,
              //           updatedBy: null,
              //           isDeleted: false
              //         },
              //         title: 'Tiếng Anh cho người mất căn bản',
              //         description:
              //           'Chương trình Tiếng Anh Người Lớn EFL trang bị cho học viên những kiến thức và kỹ năng tiếng Anh cốt yếu, hữu ích cho quá trình học tập và làm việc trong bối cảnh toàn cầu hóa hiện nay. Đồng thời, học viên còn được nâng cao khả năng giao tiếp và tư duy phản biện cũng như làm quen với chiến thuật thi IELTS.',
              //         duration: '52 giờ',
              //         tuitionFee: 0,
              //         id: '3ead2054-4f35-46f7-9d1b-b437ef4f973e',
              //         createdAt: '2024-05-22T20:28:47.681322+07:00',
              //         updatedAt: '2024-05-22T20:28:47.681325+07:00',
              //         createdBy: null,
              //         updatedBy: null,
              //         isDeleted: false
              //       },
              //       {
              //         courseArea: {
              //           name: 'Hồ Chí Minh',
              //           status: 1,
              //           id: '5ba09309-975b-423f-920d-960959c15601',
              //           createdAt: '2024-06-08T01:01:32.3719567+07:00',
              //           updatedAt: '2024-06-08T01:01:32.3719567+07:00',
              //           createdBy: null,
              //           updatedBy: null,
              //           isDeleted: false
              //         },
              //         courseLanguage: {
              //           name: 'Tiếng Anh',
              //           status: 1,
              //           id: 'd8cbffe9-3f51-44b4-941c-4945b3aa96b6',
              //           createdAt: '2024-06-08T01:01:32.3719568+07:00',
              //           updatedAt: '2024-06-08T01:01:32.3719568+07:00',
              //           createdBy: null,
              //           updatedBy: null,
              //           isDeleted: false
              //         },
              //         courseCategory: {
              //           name: 'IELTS',
              //           status: 1,
              //           id: '8be78a0f-87d0-49f6-905e-309653748100',
              //           createdAt: '2024-06-08T01:01:32.371957+07:00',
              //           updatedAt: '2024-06-08T01:01:32.371957+07:00',
              //           createdBy: null,
              //           updatedBy: null,
              //           isDeleted: false
              //         },
              //         center: {
              //           userName: 'teacher-03',
              //           password: '1',
              //           fullName: 'Ngoại ngữ Tuấn Anh TAEC (IZZI English)',
              //           description:
              //             'Trung tâm ngoại ngữ Tuấn Anh (TAEC) chuyên đào tạo tiếng anh TOEIC, IELTS, GIAO TIẾP với cam kết đầu ra. Là cơ sở đào tạo uy tín chất lượng hàng đầu.',
              //           status: 1,
              //           id: '7d6be901-f3bc-4984-9ac0-36ca010d15cc',
              //           createdAt: '2024-05-23T16:51:13.777487+07:00',
              //           updatedAt: '2024-05-23T16:51:13.777819+07:00',
              //           createdBy: null,
              //           updatedBy: null,
              //           isDeleted: false
              //         },
              //         title: 'IELTS Warm up',
              //         description:
              //           'Giáo viên: Việt Nam (có trợ giảng). Yêu cầu đầu vào: 2.0 - 2.5. Đầu ra: 3.0 - 3.5. Thời lượng: 36 giờ (4 tuần). Thời gian học: 3 buổi/tuần, 3 giờ/buổi',
              //         duration: '4 tuần',
              //         tuitionFee: 0,
              //         id: 'f5407456-dcc2-4d03-8e5b-7264572017c9',
              //         createdAt: '2024-05-23T16:56:58.85981+07:00',
              //         updatedAt: '2024-05-23T16:56:58.859812+07:00',
              //         createdBy: null,
              //         updatedBy: null,
              //         isDeleted: false
              //       },
              //       {
              //         courseArea: {
              //           name: 'Hồ Chí Minh',
              //           status: 1,
              //           id: '5ba09309-975b-423f-920d-960959c15601',
              //           createdAt: '2024-06-08T01:01:32.3719577+07:00',
              //           updatedAt: '2024-06-08T01:01:32.3719577+07:00',
              //           createdBy: null,
              //           updatedBy: null,
              //           isDeleted: false
              //         },
              //         courseLanguage: {
              //           name: 'Tiếng Anh',
              //           status: 1,
              //           id: 'd8cbffe9-3f51-44b4-941c-4945b3aa96b6',
              //           createdAt: '2024-06-08T01:01:32.3719578+07:00',
              //           updatedAt: '2024-06-08T01:01:32.3719579+07:00',
              //           createdBy: null,
              //           updatedBy: null,
              //           isDeleted: false
              //         },
              //         courseCategory: {
              //           name: 'TOEIC',
              //           status: 1,
              //           id: '02d11d15-41a7-445c-b8fd-a7286ce2d967',
              //           createdAt: '2024-06-08T01:01:32.371958+07:00',
              //           updatedAt: '2024-06-08T01:01:32.371958+07:00',
              //           createdBy: null,
              //           updatedBy: null,
              //           isDeleted: false
              //         },
              //         center: {
              //           userName: 'teacher-01',
              //           password: '1',
              //           fullName: 'Trung tâm tiếng Anh Vicky English',
              //           description:
              //             'VICKY English là Trung tâm Anh ngữ đào tạo chuyên sâu các khóa học Phát âm chuẩn & Giao tiếp phản xạ dành cho Cá nhân và Doanh nghiệp tại TP.HCM.',
              //           status: 1,
              //           id: '07620da0-77f6-48e7-b7f6-7f0c24637a3b',
              //           createdAt: '2024-05-22T14:45:11.889693+07:00',
              //           updatedAt: '2024-05-22T14:45:11.889697+07:00',
              //           createdBy: null,
              //           updatedBy: null,
              //           isDeleted: false
              //         },
              //         title: 'TOEIC Căn Bản',
              //         description:
              //           'Trong khóa Căn Bản kéo dài 6 tuần này các bạn sẽ được hướng dẫn 1 cách chi tiết, cụ thể các chủ điểm ngữ pháp trọng điểm trong bài thi, học các chiến thuật, mẹo làm bài mặc dù không dịch được nhưng vẫn chọn được đáp án đúng, học chiến thuật nghe một cách tốt nhất, cung cấp các tự vựng sát nhất với bài thi. Khóa này được tổ chức với mục đích lấy lại căn bản cho các bạn và tạo bước đệm để các bạn bước vào lớp giải đề',
              //         duration: '6 tuần',
              //         tuitionFee: 0,
              //         id: 'abc6717c-b0de-45a8-b566-ade35dc834d6',
              //         createdAt: '2024-05-22T15:15:25.640877+07:00',
              //         updatedAt: '2024-05-22T15:15:25.640879+07:00',
              //         createdBy: null,
              //         updatedBy: null,
              //         isDeleted: false
              //       }
              //     ]
              //   }
              // }
              const courses = course_res.data
              const courseCategory = courseCategory_res.data
              const courseLanguage = courseLanguage_res.data
              const courseArea = courseArea_res.data
              return {
                courses: courses,
                courseArea: courseArea,
                courseCategory: courseCategory,
                courseLanguage: courseLanguage
              }
            },
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
          console.log(user_res)
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
          const course_res = await courseApi.apiV1KhoaHocPagingGet(1, 1000, { signal: request.signal })
          const courseCategory_res = await courseCategoryApi.apiV1LoaiKhoaHocGet(1, 10000, { signal: request.signal })
          const courseLanguage_res = await courseLanguageApi.apiV1NgonNguGet(1, 10000, { signal: request.signal })
          const courseArea_res = await courseAreaApi.apiV1KhuVucGet(1, 10000, { signal: request.signal })
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
