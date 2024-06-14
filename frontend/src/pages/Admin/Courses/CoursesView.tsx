/* eslint-disable @typescript-eslint/no-unused-vars */
import { Space, Modal, Input, Row, Col, Select, InputNumber, Button, Flex, Table, Form, App, Typography } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import type { FormProps, TableProps } from 'antd'
import { useSearchParams } from 'react-router-dom'
import { CourseApi, CourseAreaApi, CourseCategoryApi, CourseLanguageApi, UserApi } from '~/api'
import { useAppStore } from '~/stores'
import useFetchData from '~/hooks/useFetch'
import debounce from '~/utils'
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
  status: 0 | 1
  isHighlighted: boolean
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
type FieldCourseType = {
  title: string
  description: string
  duration: string
  tuitionfee: number
  centerId: string
  courseAreaId: string
  courseLanguageId: string
  courseCategoryId: string
  status: 0 | 1
}

const courseLanguageApi = new CourseLanguageApi()
const courseCategoryApi = new CourseCategoryApi()
const courseAreaApi = new CourseAreaApi()
const courseApi = new CourseApi()
const userApi = new UserApi()
const CoursesView: React.FC = () => {
  const refetchApp = useAppStore((state) => state.refetchApp)
  const [searchParams, setSearchParams] = useSearchParams()
  const [createCourseLoading, setCreateCourseLoading] = useState(false)
  const [updateCourseLoading, setUpdateCourseLoading] = useState(false)
  const [openModalCourse, setOpenModalCourse] = useState(false)
  const [openModalCourseDetail, setOpenModalCourseDetail] = useState(false)
  const { notification } = App.useApp()
  const [createCourseForm] = Form.useForm<FieldCourseType>()
  const [updateCourseForm] = Form.useForm<FieldCourseType>()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('title') ? searchParams.get('title')! : '')

  const [selectedCourse, setSelectedCourse] = useState<Course>()
  const options = ['option 1', 'options 2']

  const fetchUsers = () => {
    return userApi.apiV1UsersGet(1, 10000)
  }
  const [loadingUsers, errorUsers, responseUsers] = useFetchData(fetchUsers)

  const data_users = responseUsers?.data?.data?.items as User[]

  const fetchCourseLanguage = () => {
    return courseLanguageApi.apiV1NgonNguGet(1, 10000)
  }
  const [loadingCourseLanguage, errorCourseLanguage, responseCourseLanguage] = useFetchData(fetchCourseLanguage)

  const data_courseLanguage = responseCourseLanguage?.data?.data?.items as CourseLanguage[]

  const fetchCourseCategory = () => {
    return courseCategoryApi.apiV1LoaiKhoaHocGet(1, 10000)
  }
  const [loadingCourseCategory, errorCourseCategory, responseCourseCategory] = useFetchData(fetchCourseCategory)

  const data_courseCategory = responseCourseCategory?.data?.data?.items as CourseCategory[]

  const fetchCourseArea = () => {
    return courseAreaApi.apiV1KhuVucGet(1, 10000)
  }
  const [loadingCourseArea, errorCourseArea, responseCourseArea] = useFetchData(fetchCourseArea)

  const data_courseArea = responseCourseArea?.data?.data?.items as CourseArea[]

  const handleSearchCourses = useCallback(
    debounce((query) => {
      console.log(query)
      const queryParams = new URLSearchParams({
        page: searchParams.get('page') || '1',
        size: searchParams.get('size') || '5'
      })
      if (query) {
        queryParams.set('title', query)
      }
      setSearchParams(queryParams.toString())
    }, 500),
    [searchParams, setSearchParams]
  )
  const fetchCourses = () => {
    return courseApi.apiV1KhoaHocAdminGet(
      searchParams.get('title') ? searchParams.get('title')! : undefined,
      undefined,
      undefined,
      searchParams.get('page') ? Number(searchParams.get('page')) : 1,
      searchParams.get('size') ? Number(searchParams.get('size')) : 5
    )
  }
  const [loadingCourses, errorCourses, responseCourses] = useFetchData(
    fetchCourses,
    searchParams.get('page'),
    searchParams.get('size'),
    searchParams.get('title')
  )
  const data_courses = responseCourses?.data?.data?.items as Course[]
  console.log(responseCourses)
  const onFinishCourse: FormProps<FieldCourseType>['onFinish'] = async (values) => {
    console.log('Success:', values)
    try {
      setCreateCourseLoading(true)
      await courseApi.apiV1KhoaHocPost(values)
      refetchApp()
      createCourseForm.resetFields()
    } catch {
      notification.error({ message: 'Sorry! Something went wrong. App server error' })
    } finally {
      setCreateCourseLoading(false)
    }
  }

  const onFinishFailedCourse: FormProps<FieldCourseType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const onFinishCourseDetail: FormProps<FieldCourseType>['onFinish'] = async (values) => {
    console.log('Success:', values)
    try {
      setUpdateCourseLoading(true)
      await courseApi.apiV1KhoaHocIdPut(selectedCourse!.id, values)
      refetchApp()
    } catch {
      notification.error({ message: 'Sorry! Something went wrong. App server error' })
    } finally {
      setUpdateCourseLoading(false)
    }
  }

  const onFinishFailedCourseDetail: FormProps<FieldCourseType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  const handleDelete = async (id: string) => {
    try {
      await courseApi.apiV1KhoaHocIdDelete(id)
      notification.info({ message: 'Delete thành công' })
      refetchApp()
    } catch (e) {
      notification.error({ message: 'Sorry! Something went wrong. App server error' })
    }
  }
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
      title: 'Khu vực',
      dataIndex: ['courseArea', 'name'],
      key: 'courseArea'
    },
    {
      title: 'Ngôn ngữ',
      dataIndex: ['courseLanguage', 'name'],
      key: 'courseLanguage'
    },
    {
      title: 'Danh mục',
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
      key: 'status',
      render: (_, { status }) => {
        if (status) {
          return 'Hoạt động'
        } else {
          return 'Chờ duyệt'
        }
      }
    },
    {
      title: '',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type='primary'
            onClick={() => {
              setOpenModalCourseDetail(true)
              setSelectedCourse(record)
            }}
          >
            Chi tiết
          </Button>
          <Button danger type='primary' onClick={() => handleDelete(record.id)}>
            Xóa
          </Button>
        </Space>
      )
    }
  ]

  useEffect(() => {
    updateCourseForm.setFieldsValue({
      title: selectedCourse?.title,
      description: selectedCourse?.description,
      duration: selectedCourse?.duration,
      tuitionfee: selectedCourse?.tuitionfee,
      centerId: selectedCourse?.center.id,
      courseAreaId: selectedCourse?.courseArea.id,
      courseLanguageId: selectedCourse?.courseLanguage.id,
      courseCategoryId: selectedCourse?.courseCategory.id,
      status: selectedCourse?.status
    })
  }, [selectedCourse, updateCourseForm])
  return (
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
          form={createCourseForm}
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
                    ?.filter((d) => d.role.roleName === 'Teacher')
                    ?.map((cl) => (
                      <Option key={cl.id} value={cl.id}>
                        {cl.fullName}
                      </Option>
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
                  {data_courseArea?.map((cl) => (
                    <Option key={cl.id} value={cl.id}>
                      {cl.name}
                    </Option>
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
                  {data_courseCategory?.map((cl) => (
                    <Option key={cl.id} value={cl.id}>
                      {cl.name}
                    </Option>
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
                  {data_courseLanguage?.map((cl) => (
                    <Option key={cl.id} value={cl.id}>
                      {cl.name}
                    </Option>
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
      <Modal
        title='Chi tiết khóa học'
        open={openModalCourseDetail}
        onOk={() => setOpenModalCourseDetail(false)}
        onCancel={() => setOpenModalCourseDetail(false)}
        width={1000}
        style={{ top: 20 }}
        footer={null}
      >
        <Form
          form={updateCourseForm}
          layout='vertical'
          name='CreateCourseForm'
          onFinish={onFinishCourseDetail}
          onFinishFailed={onFinishFailedCourseDetail}
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
                    ?.filter((d) => d.role.roleName === 'Teacher')
                    ?.map((cl) => (
                      <Option key={cl.id} value={cl.id}>
                        {cl.fullName}
                      </Option>
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
                  {data_courseArea?.map((cl) => (
                    <Option key={cl.id} value={cl.id}>
                      {cl.name}
                    </Option>
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
                  {data_courseCategory?.map((cl) => (
                    <Option key={cl.id} value={cl.id}>
                      {cl.name}
                    </Option>
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
                  {data_courseLanguage?.map((cl) => (
                    <Option key={cl.id} value={cl.id}>
                      {cl.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item<FieldCourseType>
            label='Status'
            name='status'
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Select placeholder='Language' allowClear>
              <Option value={0}>Chờ duyệt</Option>
              <Option value={1}>Hoạt động</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button loading={updateCourseLoading} type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Flex align='center' justify='space-between' gap={20} wrap>
        <Text strong>{data_courses?.length} Courses</Text>
        <Flex align='center' gap={20}>
          <Input.Search
            size='large'
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              handleSearchCourses(e.target.value)
            }}
          />
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
        pagination={{
          current: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
          position: ['bottomLeft'],
          pageSize: searchParams.get('size') ? Number(searchParams.get('size')) : 5
        }}
        columns={columns_courses}
        dataSource={data_courses}
        loading={loadingCourses}
        onChange={(pagination) => {
          const queryParams = new URLSearchParams({
            page: pagination.current!.toString(),
            size: pagination.pageSize!.toString()
          })
          if (searchParams.get('title')) {
            queryParams.set('title', searchParams.get('title')!)
          }
          setSearchParams(queryParams.toString())
        }}
      />
    </Space>
  )
}

export default CoursesView
