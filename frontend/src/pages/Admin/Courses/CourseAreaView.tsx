/* eslint-disable @typescript-eslint/no-unused-vars */
import { Space, Modal, Input, Button, Flex, Table, Form, App } from 'antd'
import { useState } from 'react'
import { CourseAreaApi } from '~/api'
import type { FormProps, TableProps } from 'antd'
import useFetchData from '~/hooks/useFetch'
import { useSearchParams } from 'react-router-dom'
import { useAppStore } from '~/stores'

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
      notification.info({ message: 'Delete thành công' })
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

  const onFinishFailedCourseArea: FormProps<FieldCourseAreaType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const columns_courseArea: TableProps<CourseArea>['columns'] = [
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

  return (
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
