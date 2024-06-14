import { ConfigProvider, Tabs } from 'antd'
import type { TabsProps } from 'antd'
import CourseAreaView from './CourseAreaView'
import CourseCategoryView from './CourseCategoryView'
import CourseLanguageView from './CourseLanguageView'
import CoursesView from './CoursesView'

const AdminCoursePage: React.FC = () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Khóa học',
      children: <CoursesView />
    },
    {
      key: '2',
      label: 'Loại khóa học',
      children: <CourseCategoryView />
    },
    {
      key: '3',
      label: 'Ngôn ngữ',
      children: <CourseLanguageView />
    },
    {
      key: '4',
      label: 'Địa điểm',
      children: <CourseAreaView />
    }
  ]

  return (
    <div
      style={{
        height: '100%'
      }}
    >
      <ConfigProvider
        theme={{
          token: {
            lineWidth: 1
          }
        }}
      >
        <div className='h-full p-10 bg-[#FFFFFF]'>
          <Tabs defaultActiveKey='1' items={items} destroyInactiveTabPane={true} />
        </div>
      </ConfigProvider>
    </div>
  )
}

export default AdminCoursePage
