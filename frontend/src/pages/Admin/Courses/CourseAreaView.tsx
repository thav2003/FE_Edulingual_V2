/* eslint-disable @typescript-eslint/no-unused-vars */
import { Space, Modal, Input, Button, Flex, Table, Form, App, Typography, Tag, Select } from 'antd'
import { useEffect, useState } from 'react'
import { CourseAreaApi, CourseAreaStatus } from '~/api'
import type { FormProps, TableProps } from 'antd'
import useFetchData from '~/hooks/useFetch'
import { useSearchParams } from 'react-router-dom'
import { useAppStore } from '~/stores'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
const { Text } = Typography
const { Option } = Select

interface CourseArea {
  name: string
  status: 0 | 1
  id: string
  createdAt: string
  updatedAt: string
  createdBy: string | null
  updatedBy: string | null
  isDeleted: boolean
}
type FieldCourseAreaType = {
  name: string
  courseAreaStatus: 0 | 1
}

const courseAreaApi = new CourseAreaApi()
const CourseAreaView: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const refetchApp = useAppStore((state) => state.refetchApp)
  const { notification } = App.useApp()
  const [openModalCourseArea, setOpenModalCourseArea] = useState(false)
  const [createCourseAreaLoading, setCreateCourseAreaLoading] = useState(false)

  const [selectedCourseArea, setSelectedCourseArea] = useState<CourseArea>()
  const [updateCourseAreaLoading, setUpdateCourseAreaLoading] = useState(false)
  const [updateCourseAreaForm] = Form.useForm<FieldCourseAreaType>()
  const [openModalCourseAreaDetail, setOpenModalCourseAreaDetail] = useState(false)

  const fetchCourseArea = () => {
    return courseAreaApi.apiV1KhuVucGet(
      searchParams.get('page') ? Number(searchParams.get('page')) : 1,
      searchParams.get('size') ? Number(searchParams.get('size')) : 5
    )
  }
  const [loadingCourseArea, errorCourseArea, responseCourseArea] = useFetchData(
    fetchCourseArea,
    searchParams.get('page'),
    searchParams.get('size')
  )

  const data_courseArea = responseCourseArea?.data?.data?.items as CourseArea[]
  const data_total_courseArea = responseCourseArea?.data?.data.total as number
  const handleDelete = async (id: string) => {
    try {
      await courseAreaApi.apiV1KhuVucIdDelete(id)
      notification.info({ message: 'Xóa thành công' })
      refetchApp()
    } catch (e) {
      notification.error({ message: 'Sorry! Something went wrong. App server error' })
    }
  }

  const onFinishCourseArea: FormProps<FieldCourseAreaType>['onFinish'] = async (values) => {
    console.log('Success:', values)
    try {
      setCreateCourseAreaLoading(true)
      await courseAreaApi.apiV1KhuVucPost(values)
      refetchApp()
      notification.info({ message: 'Tạo thành công' })
    } catch {
      notification.error({ message: 'Sorry! Something went wrong. App server error' })
    } finally {
      setCreateCourseAreaLoading(false)
    }
  }

  const onFinishCourseAreaDetail: FormProps<FieldCourseAreaType>['onFinish'] = async (values) => {
    console.log('Success:', values)
    try {
      setUpdateCourseAreaLoading(true)
      //await courseAreaApi.apiV1KhoaHocIdPut(selectedCourseArea!.id, values)
      refetchApp()
    } catch {
      notification.error({ message: 'Sorry! Something went wrong. App server error' })
    } finally {
      setUpdateCourseAreaLoading(false)
    }
  }

  const onFinishFailedCourseAreaDetail: FormProps<FieldCourseAreaType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const onFinishFailedCourseArea: FormProps<FieldCourseAreaType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const columns_courseArea: TableProps<CourseArea>['columns'] = [
    {
      title: 'STT',
      dataIndex: 'id',
      key: 'id',
      render: (item, record, index) => <Text>{++index}</Text>
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
      render: (status: number) => {
        if (status) {
          return (
            <Tag color='green' className='px-4 py-1'>
              HOẠT ĐỘNG
            </Tag>
          )
        } else {
          return (
            <Tag color='red' className='px-4 py-1'>
              NGƯNG HOẠT ĐỘNG
            </Tag>
          )
        }
      } // Giả định: 1 là hoạt động, 0 là không hoạt động
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => {
              setOpenModalCourseAreaDetail(true)
              setSelectedCourseArea(record)
            }}
            icon={<EditOutlined />}
          />
          <Button danger type='primary' onClick={() => handleDelete(record.id)} icon={<DeleteOutlined />} />
        </Space>
      ) // Nút hành động
    }
  ]

  useEffect(() => {
    updateCourseAreaForm.setFieldsValue({
      name: selectedCourseArea?.name,
      courseAreaStatus: selectedCourseArea?.status
    })
  }, [selectedCourseArea, updateCourseAreaForm])

  return (
    <Space className='w-full' direction='vertical'>
      <Modal
        title='Thêm địa điểm'
        open={openModalCourseArea}
        onOk={() => setOpenModalCourseArea(false)}
        onCancel={() => setOpenModalCourseArea(false)}
        footer={null}
        width={500}
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
            rules={[{ required: true, message: 'Vui lòng nhập tên địa điểm!' }]}
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
      <Modal
        title='Chi tiết địa điểm'
        open={openModalCourseAreaDetail}
        onOk={() => setOpenModalCourseAreaDetail(false)}
        onCancel={() => setOpenModalCourseAreaDetail(false)}
        width={500}
        centered
        footer={null}
      >
        <Form
          form={updateCourseAreaForm}
          layout='vertical'
          name='CreateCourseForm'
          onFinish={onFinishCourseAreaDetail}
          onFinishFailed={onFinishFailedCourseAreaDetail}
          autoComplete='off'
          initialValues={{ courseStatus: 1 }}
        >
          <Form.Item<FieldCourseAreaType>
            label='Tên địa điểm'
            name='name'
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldCourseAreaType>
            label='Trạng thái'
            name='courseAreaStatus'
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Select placeholder='Trạng thái' allowClear>
              <Option value={0}>Ngưng hoạt động</Option>
              <Option value={1}>Hoạt động</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button loading={updateCourseAreaLoading} type='primary' htmlType='submit'>
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
      <Table<CourseArea>
        pagination={{
          current: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
          position: ['bottomLeft'],
          pageSize: searchParams.get('size') ? Number(searchParams.get('size')) : 5,
          total: data_total_courseArea
        }}
        columns={columns_courseArea}
        dataSource={data_courseArea}
        loading={loadingCourseArea}
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

export default CourseAreaView
