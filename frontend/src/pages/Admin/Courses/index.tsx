/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  App,
  Button,
  Col,
  ConfigProvider,
  Flex,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Tabs,
  Typography
} from 'antd'
import type { TableProps, TabsProps, FormProps } from 'antd'

import { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { CourseApi, CourseAreaApi, CourseCategoryApi, CourseLanguageApi } from '~/api'
const { Text } = Typography
const { Option } = Select
interface Course {
  courseArea: {
    name: string
    courseAreaStatus: number
    id: string
    createdAt: string
    updatedAt: string
    createdBy: string | null
    updatedBy: string | null
    isDeleted: boolean
  }
  courseLanguage: {
    name: string
    courseLanguageStatus: number
    id: string
    createdAt: string
    updatedAt: string
    createdBy: string | null
    updatedBy: string | null
    isDeleted: boolean
  }
  courseCategory: {
    name: string
    courseCategoryStatus: number
    id: string
    createdAt: string
    updatedAt: string
    createdBy: string | null
    updatedBy: string | null
    isDeleted: boolean
  }
  center: {
    userName: string
    password: string
    fullName: string
    description: string
    userStatus: number
    id: string
    createdAt: string
    updatedAt: string
    createdBy: string
    updatedBy: string
    isDeleted: boolean
  }
  title: string
  description: string
  duration: string
  tuitionfee: number
  id: string
  createdAt: string
  updatedAt: string
  createdBy: string
  updatedBy: string
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

interface CourseArea {
  name: string
  status: number
  id: string
  createdAt: string
  updatedAt: string
  createdBy: string | null
  updatedBy: string | null
  isDeleted: boolean
}

type FieldCourseLanguageType = {
  name: string
  courseLanguageStatus: 0 | 1
}
type FieldCourseAreaType = {
  name: string
  courseAreaStatus: 0 | 1
}
type FieldCourseCategoryType = {
  name: string
  languageId: string
  courseCategoryStatus: 0 | 1
}
type FieldCourseType = {
  title: string
  description: string
  duration: string
  tuitionfee: number
  centerId: string
  courseAreaId: string
  courseLanguageId: string
  courseCategoryId: string
  courseStatus: 0 | 1
}
interface User {
  userName: string
  password: string
  fullName: string
  description: string
  status: number
  id: string
  createdAt: string
  updatedAt: string
  createdBy: string
  updatedBy: string
  isDeleted: boolean
  role: {
    id: string
    roleName: string
  }
}
const courseLanguageApi = new CourseLanguageApi()
const courseCategoryApi = new CourseCategoryApi()
const courseAreaApi = new CourseAreaApi()
const courseApi = new CourseApi()
const AdminCoursePage: React.FC = () => {
  const { notification } = App.useApp()
  const [createCourseLanguageLoading, setCreateCourseLanguageLoading] = useState(false)
  const [createCourseCategoryLoading, setCreateCourseCategoryLoading] = useState(false)
  const [createCourseAreaLoading, setCreateCourseAreaLoading] = useState(false)
  const [createCourseLoading, setCreateCourseLoading] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { courses, courseCategory, courseLanguage, courseArea, users } = useLoaderData() as any
  const [openModalCourse, setOpenModalCourse] = useState(false)
  const [openModalCourseCategory, setOpenModalCourseCategory] = useState(false)
  const [openModalCourseLanguage, setOpenModalCourseLanguage] = useState(false)
  const [openModalCourseArea, setOpenModalCourseArea] = useState(false)
  const data_courses = courses.data.items as Course[]
  const data_courseCategory = courseCategory.data.items as CourseCategory[]
  const data_courseLanguage = courseLanguage.data.items as CourseLanguage[]
  const data_courseArea = courseArea.data.items as CourseArea[]
  const data_users = users.data.items as User[]

  const handleDelete = async (id: any) => {
    try {
      await courseAreaApi.apiV1KhuVucIdDelete(id)
      notification.info({ message: 'Tạo thành công' })
    } catch (e) {
      notification.error({ message: 'Sorry! Something went wrong. App server error' })
    }
  }
  const options = ['option 1', 'options 2']

  const columns_courses: TableProps<Course>['columns'] = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'Thời gian học',
      dataIndex: 'duration',
      key: 'duration'
    },
    {
      title: 'Học phí',
      dataIndex: 'tuitionfee',
      key: 'tuitionfee'
    },
    {
      title: 'Khu vực khóa học',
      dataIndex: ['courseArea', 'name'],
      key: 'courseArea'
    },
    {
      title: 'Ngôn ngữ khóa học',
      dataIndex: ['courseLanguage', 'name'],
      key: 'courseLanguage'
    },
    {
      title: 'Danh mục khóa học',
      dataIndex: ['courseCategory', 'name'],
      key: 'courseCategory'
    },
    {
      title: 'Trung tâm',
      dataIndex: ['center', 'fullName'],
      key: 'center'
    },
    {
      title: 'Trạng thái',
      key: 'actions',
      render: (_, { id }) => (
        <Button danger type='primary' onClick={() => handleDelete(id)}>
          Delete
        </Button>
      ) // Nút hành động
    }
  ]
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
      render: (_, record) => <Button type='primary'>Chi tiết</Button> // Nút hành động
    }
  ]
  const columns_courseLanguage: TableProps<CourseLanguage>['columns'] = [
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
      render: (_, record) => <Button type='primary'>Chi tiết</Button> // Nút hành động
    }
  ]
  const columns_courseArea: TableProps<CourseLanguage>['columns'] = [
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
      render: (_, record) => <Button type='primary'>Chi tiết</Button> // Nút hành động
    }
  ]
  const onFinishCourse: FormProps<FieldCourseType>['onFinish'] = async (values) => {
    console.log('Success:', values)
    try {
      setCreateCourseLoading(true)
      await courseApi.apiV1KhoaHocPost(values)
    } catch {
      notification.error({ message: 'Sorry! Something went wrong. App server error' })
    } finally {
      setCreateCourseLoading(false)
    }
  }

  const onFinishFailedCourse: FormProps<FieldCourseType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const onFinishCourseLanguage: FormProps<FieldCourseLanguageType>['onFinish'] = async (values) => {
    console.log('Success:', values)
    try {
      setCreateCourseLanguageLoading(true)
      await courseLanguageApi.apiV1NgonNguPost(values)
    } catch {
      notification.error({ message: 'Sorry! Something went wrong. App server error' })
    } finally {
      setCreateCourseLanguageLoading(false)
    }
  }

  const onFinishFailedCourseLanguage: FormProps<FieldCourseLanguageType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const onFinishCourseCategory: FormProps<FieldCourseCategoryType>['onFinish'] = async (values) => {
    console.log('Success:', values)
    try {
      setCreateCourseCategoryLoading(true)
      await courseCategoryApi.apiV1LoaiKhoaHocPost(values)
    } catch {
      notification.error({ message: 'Sorry! Something went wrong. App server error' })
    } finally {
      setCreateCourseCategoryLoading(false)
    }
  }
  const onFinishFailedCourseCategory: FormProps<FieldCourseCategoryType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const onFinishCourseArea: FormProps<FieldCourseAreaType>['onFinish'] = async (values) => {
    console.log('Success:', values)
    try {
      setCreateCourseAreaLoading(true)
      await courseAreaApi.apiV1KhuVucPost(values)
      notification.info({ message: 'Tạo thành công' })
    } catch {
      notification.error({ message: 'Sorry! Something went wrong. App server error' })
    } finally {
      setCreateCourseAreaLoading(false)
    }
  }

  const onFinishFailedCourseArea: FormProps<FieldCourseAreaType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Khóa học',
      children: (
        <Space className='w-full' direction='vertical'>
          <Modal
            title='Thêm khóa học'
            open={openModalCourse}
            onOk={() => setOpenModalCourse(false)}
            onCancel={() => setOpenModalCourse(false)}
            width={1000}
            style={{ top: 20 }}
            footer={null}
          >
            <Form
              layout='vertical'
              name='CreateCourseForm'
              onFinish={onFinishCourse}
              onFinishFailed={onFinishFailedCourse}
              autoComplete='off'
              initialValues={{ courseStatus: 1 }}
            >
              <Form.Item<FieldCourseType>
                label='Title'
                name='title'
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item<FieldCourseType>
                label='Description'
                name='description'
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input.TextArea />
              </Form.Item>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item<FieldCourseType>
                    label='Center'
                    name='centerId'
                    rules={[{ required: true, message: 'Please input your username!' }]}
                  >
                    <Select placeholder='Area' allowClear>
                      {data_users
                        .filter((d) => d.role.roleName === 'Teacher')
                        .map((cl) => (
                          <Option value={cl.id}>{cl.fullName}</Option>
                        ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item<FieldCourseType>
                    label='Duration'
                    name='duration'
                    rules={[{ required: true, message: 'Please input your username!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item<FieldCourseType>
                    label='Tuitionfee'
                    name='tuitionfee'
                    rules={[{ required: true, message: 'Please input your username!' }]}
                  >
                    <InputNumber className='w-full' />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item<FieldCourseType>
                    label='Area'
                    name='courseAreaId'
                    rules={[{ required: true, message: 'Please input your username!' }]}
                  >
                    <Select placeholder='Area' allowClear>
                      {data_courseArea.map((cl) => (
                        <Option value={cl.id}>{cl.name}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item<FieldCourseType>
                    label='Category'
                    name='courseCategoryId'
                    rules={[{ required: true, message: 'Please input your username!' }]}
                  >
                    <Select placeholder='Category' allowClear>
                      {data_courseCategory.map((cl) => (
                        <Option value={cl.id}>{cl.name}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item<FieldCourseType>
                    label='Language'
                    name='courseLanguageId'
                    rules={[{ required: true, message: 'Please input your username!' }]}
                  >
                    <Select placeholder='Language' allowClear>
                      {data_courseLanguage.map((cl) => (
                        <Option value={cl.id}>{cl.name}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item>
                <Button loading={createCourseLoading} type='primary' htmlType='submit'>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Modal>
          <Flex align='center' justify='space-between' gap={20} wrap>
            <Text strong>1,133 Orders</Text>
            <Flex align='center' gap={20}>
              <Input.Search size='large' />
              <Select
                size='large'
                className='!text-left'
                allowClear
                optionLabelProp='label'
                placeholder={
                  <Space>
                    <svg
                      className='inline'
                      width='18'
                      height='13'
                      viewBox='0 0 18 13'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M0 1.54004C0 0.987759 0.44772 0.540039 1 0.540039H17C17.5523 0.540039 18 0.987759 18 1.54004C18 2.09232 17.5523 2.54004 17 2.54004H1C0.44772 2.54004 0 2.09232 0 1.54004ZM3 6.54004C3 5.98774 3.44772 5.54004 4 5.54004H14C14.5523 5.54004 15 5.98774 15 6.54004C15 7.09234 14.5523 7.54004 14 7.54004H4C3.44772 7.54004 3 7.09234 3 6.54004ZM6 11.54C6 10.9877 6.44772 10.54 7 10.54H11C11.5523 10.54 12 10.9877 12 11.54C12 12.0923 11.5523 12.54 11 12.54H7C6.44772 12.54 6 12.0923 6 11.54Z'
                        fill='#A5A9AD'
                      />
                    </svg>
                    Lọc theo
                    <Text strong>Đánh giá cao</Text>
                  </Space>
                }
                style={{ width: 250 }}
              >
                {options.map((data) => (
                  <Select.Option
                    key={data}
                    value={data}
                    label={
                      <Space className='text-[#00000040]'>
                        <svg
                          className='inline'
                          width='18'
                          height='13'
                          viewBox='0 0 18 13'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M0 1.54004C0 0.987759 0.44772 0.540039 1 0.540039H17C17.5523 0.540039 18 0.987759 18 1.54004C18 2.09232 17.5523 2.54004 17 2.54004H1C0.44772 2.54004 0 2.09232 0 1.54004ZM3 6.54004C3 5.98774 3.44772 5.54004 4 5.54004H14C14.5523 5.54004 15 5.98774 15 6.54004C15 7.09234 14.5523 7.54004 14 7.54004H4C3.44772 7.54004 3 7.09234 3 6.54004ZM6 11.54C6 10.9877 6.44772 10.54 7 10.54H11C11.5523 10.54 12 10.9877 12 11.54C12 12.0923 11.5523 12.54 11 12.54H7C6.44772 12.54 6 12.0923 6 11.54Z'
                            fill='#A5A9AD'
                          />
                        </svg>
                        Lọc theo
                        <Text strong>{data}</Text>
                      </Space>
                    }
                  >
                    {data}
                  </Select.Option>
                ))}
              </Select>
              <Button type='primary' size='large' onClick={() => setOpenModalCourse(true)}>
                Thêm khóa học
              </Button>
            </Flex>
          </Flex>
          <Table<Course>
            pagination={{ position: ['bottomLeft'] }}
            columns={columns_courses}
            dataSource={data_courses}
          />
        </Space>
      )
    },
    {
      key: '2',
      label: 'Loại khóa học',
      children: (
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
                  {data_courseLanguage.map((cl) => (
                    <Option value={cl.id}>{cl.name}</Option>
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
            pagination={{ position: ['bottomLeft'] }}
            columns={columns_courseCategory}
            dataSource={data_courseCategory}
          />
        </Space>
      )
    },
    {
      key: '3',
      label: 'Ngôn ngữ',
      children: (
        <Space className='w-full' direction='vertical'>
          <Modal
            title='Thêm ngôn ngữ'
            open={openModalCourseLanguage}
            onOk={() => setOpenModalCourseLanguage(false)}
            onCancel={() => setOpenModalCourseLanguage(false)}
            footer={null}
            width={1000}
            centered
          >
            <Form
              name='CreateCourseLanguageForm'
              onFinish={onFinishCourseLanguage}
              onFinishFailed={onFinishFailedCourseLanguage}
              autoComplete='off'
              initialValues={{ courseLanguageStatus: 1 }}
            >
              <Form.Item<FieldCourseLanguageType>
                label='Name'
                name='name'
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item>
                <Button loading={createCourseLanguageLoading} type='primary' htmlType='submit'>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Modal>
          <Flex align='center' justify='flex-end' gap={20} wrap>
            <Button type='primary' size='large' onClick={() => setOpenModalCourseLanguage(true)}>
              Thêm ngôn ngữ
            </Button>
          </Flex>
          <Table<CourseLanguage>
            pagination={{ position: ['bottomLeft'] }}
            columns={columns_courseLanguage}
            dataSource={data_courseLanguage}
          />
        </Space>
      )
    },
    {
      key: '4',
      label: 'Địa điểm',
      children: (
        <Space className='w-full' direction='vertical'>
          <Modal
            title='Thêm địa điểm'
            open={openModalCourseArea}
            onOk={() => setOpenModalCourseArea(false)}
            onCancel={() => setOpenModalCourseArea(false)}
            footer={null}
            width={1000}
            centered
          >
            <Form
              name='CreateCourseAreaForm'
              onFinish={onFinishCourseArea}
              onFinishFailed={onFinishFailedCourseArea}
              autoComplete='off'
              initialValues={{ courseAreaStatus: 1 }}
            >
              <Form.Item<FieldCourseAreaType>
                label='Name'
                name='name'
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item>
                <Button loading={createCourseAreaLoading} type='primary' htmlType='submit'>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Modal>
          <Flex align='center' justify='flex-end' gap={20} wrap>
            <Button type='primary' size='large' onClick={() => setOpenModalCourseArea(true)}>
              Thêm địa điểm
            </Button>
          </Flex>
          <Table<CourseLanguage>
            pagination={{ position: ['bottomLeft'] }}
            columns={columns_courseArea}
            dataSource={data_courseArea}
          />
        </Space>
      )
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
          <Tabs defaultActiveKey='1' items={items} />
        </div>
      </ConfigProvider>
    </div>
  )
}

export default AdminCoursePage
