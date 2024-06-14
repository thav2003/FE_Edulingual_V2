/* eslint-disable @typescript-eslint/no-unused-vars */
import { Space, Modal, Input, Select, Button, Flex, Table, Form, App } from 'antd'
import type { FormProps, TableProps } from 'antd'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CourseCategoryApi, CourseLanguageApi } from '~/api'
import useFetchData from '~/hooks/useFetch'
import { useAppStore } from '~/stores'

const { Option } = Select

interface CourseLanguage {
  name: string
  status: number
  id: string
  createdAt: string
  updatedAt: string
  createdBy: string | null
  updatedBy: string | null
  isDeleted: boolean
}
interface CourseCategory {
  language: string | null
  name: string
  status: number
  id: string
  createdAt: string
  updatedAt: string
  createdBy: string | null
  updatedBy: string | null
  isDeleted: boolean
}

type FieldCourseCategoryType = {
  name: string
  languageId: string
  courseCategoryStatus: 0 | 1
}

const courseCategoryApi = new CourseCategoryApi()
const courseLanguageApi = new CourseLanguageApi()
const CourseCategoryView: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const refetchApp = useAppStore((state) => state.refetchApp)
  const { notification } = App.useApp()
  const [createCourseCategoryLoading, setCreateCourseCategoryLoading] = useState(false)
  const [openModalCourseCategory, setOpenModalCourseCategory] = useState(false)

  const fetchCourseLanguage = () => {
    return courseLanguageApi.apiV1NgonNguGet(1, 10000)
  }
  const [loadingCourseLanguage, errorCourseLanguage, responseCourseLanguage] = useFetchData(fetchCourseLanguage)

  const data_courseLanguage = responseCourseLanguage?.data?.data?.items as CourseLanguage[]

  const fetchCourseCategory = () => {
    return courseCategoryApi.apiV1LoaiKhoaHocGet(
      searchParams.get('page') ? Number(searchParams.get('page')) : 1,
      searchParams.get('size') ? Number(searchParams.get('size')) : 5
    )
  }
  const [loadingCourseCategory, errorCourseCategory, responseCourseCategory] = useFetchData(
    fetchCourseCategory,
    searchParams.get('page'),
    searchParams.get('size')
  )

  const data_courseCategory = responseCourseCategory?.data?.data?.items as CourseCategory[]

  const handleDelete = async (id: string) => {
    try {
      await courseCategoryApi.apiV1LoaiKhoaHocIdDelete(id)
      notification.info({ message: 'Delete thành công' })
      refetchApp()
    } catch (e) {
      notification.error({ message: 'Sorry! Something went wrong. App server error' })
    }
  }
  const columns_courseCategory: TableProps<CourseCategory>['columns'] = [
    {
      title: 'Ngôn ngữ',
      dataIndex: 'language',
      key: 'language',
      render: (text: string | null) => (text ? text : 'N/A') // Hiển thị 'N/A' nếu null
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: number) => (status === 1 ? 'Hoạt động' : 'Không hoạt động') // Giả định: 1 là hoạt động, 0 là không hoạt động
    },
    {
      title: 'Người tạo',
      dataIndex: 'createdBy',
      key: 'createdBy',
      render: (text: string | null) => (text ? text : 'N/A') // Hiển thị 'N/A' nếu null
    },
    {
      title: 'Người cập nhật',
      dataIndex: 'updatedBy',
      key: 'updatedBy',
      render: (text: string | null) => (text ? text : 'N/A') // Hiển thị 'N/A' nếu null
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_, { id }) => (
        <Button danger type='primary' onClick={() => handleDelete(id)}>
          Xóa
        </Button>
      ) // Nút hành động
    }
  ]

  const onFinishCourseCategory: FormProps<FieldCourseCategoryType>['onFinish'] = async (values) => {
    console.log('Success:', values)
    try {
      setCreateCourseCategoryLoading(true)
      await courseCategoryApi.apiV1LoaiKhoaHocPost(values)
      refetchApp()
      notification.info({ message: 'Tạo thành công' })
    } catch {
      notification.error({ message: 'Sorry! Something went wrong. App server error' })
    } finally {
      setCreateCourseCategoryLoading(false)
    }
  }
  const onFinishFailedCourseCategory: FormProps<FieldCourseCategoryType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <Space className='w-full' direction='vertical'>
      <Modal
        title='Thêm loại khóa học'
        open={openModalCourseCategory}
        onOk={() => setOpenModalCourseCategory(false)}
        onCancel={() => setOpenModalCourseCategory(false)}
        width={1000}
        centered
        footer={null}
      >
        <Form
          layout='vertical'
          name='CreateCourseCategoryForm'
          onFinish={onFinishCourseCategory}
          onFinishFailed={onFinishFailedCourseCategory}
          autoComplete='off'
          initialValues={{ courseCategoryStatus: 1 }}
        >
          <Form.Item<FieldCourseCategoryType>
            label='Name'
            name='name'
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldCourseCategoryType>
            label='Language'
            name='languageId'
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Select placeholder='Language' allowClear>
              {data_courseLanguage?.map((cl) => (
                <Option key={cl.id} value={cl.id}>
                  {cl.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button loading={createCourseCategoryLoading} type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Flex align='center' justify='flex-end' gap={20} wrap>
        <Button type='primary' size='large' onClick={() => setOpenModalCourseCategory(true)}>
          Thêm loại khóa học
        </Button>
      </Flex>
      <Table<CourseCategory>
        pagination={{
          current: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
          position: ['bottomLeft'],
          pageSize: searchParams.get('size') ? Number(searchParams.get('size')) : 5
        }}
        columns={columns_courseCategory}
        dataSource={data_courseCategory}
        loading={loadingCourseCategory}
        onChange={(pagination) => {
          const queryParams = new URLSearchParams({
            page: pagination.current!.toString(),
            size: pagination.pageSize!.toString()
          })

          setSearchParams(queryParams.toString())
        }}
      />
    </Space>
  )
}

export default CourseCategoryView
