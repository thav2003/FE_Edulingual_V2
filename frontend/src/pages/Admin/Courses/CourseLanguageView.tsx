/* eslint-disable @typescript-eslint/no-unused-vars */
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Space, Modal, Input, Button, Flex, Table, Form, App, Typography, Tag } from 'antd'
import type { FormProps, TableProps } from 'antd'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CourseLanguageApi } from '~/api'
import useFetchData from '~/hooks/useFetch'
import { useAppStore } from '~/stores'
const { Text } = Typography

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
type FieldCourseLanguageType = {
  name: string
  courseLanguageStatus: 0 | 1
}
const courseLanguageApi = new CourseLanguageApi()
const CourseLanguageView: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const refetchApp = useAppStore((state) => state.refetchApp)
  const { notification } = App.useApp()
  const [createCourseLanguageLoading, setCreateCourseLanguageLoading] = useState(false)
  const [openModalCourseLanguage, setOpenModalCourseLanguage] = useState(false)

  const fetchCourseLanguage = () => {
    return courseLanguageApi.apiV1NgonNguGet(
      searchParams.get('page') ? Number(searchParams.get('page')) : 1,
      searchParams.get('size') ? Number(searchParams.get('size')) : 5
    )
  }
  const [loadingCourseLanguage, errorCourseLanguage, responseCourseLanguage] = useFetchData(
    fetchCourseLanguage,
    searchParams.get('page'),
    searchParams.get('size')
  )

  const data_courseLanguage = responseCourseLanguage?.data?.data?.items as CourseLanguage[]
  const data_total_courseLanguage = responseCourseLanguage?.data?.data.total as number
  const handleDelete = async (id: string) => {
    try {
      await courseLanguageApi.apiV1NgonNguIdDelete(id)
      notification.info({ message: 'Xóa thành công' })
      refetchApp()
    } catch (error) {
      notification.error({
        message:
          error?.response?.data?.message ||
          error?.response?.data?.Error ||
          'Sorry! Something went wrong. App server error'
      })
    }
  }
  const onFinishCourseLanguage: FormProps<FieldCourseLanguageType>['onFinish'] = async (values) => {
    console.log('Success:', values)
    try {
      setCreateCourseLanguageLoading(true)
      await courseLanguageApi.apiV1NgonNguPost(values)
      refetchApp()
      notification.info({ message: 'Tạo thành công' })
    } catch (error) {
      notification.error({
        message:
          error?.response?.data?.message ||
          error?.response?.data?.Error ||
          'Sorry! Something went wrong. App server error'
      })
    } finally {
      setCreateCourseLanguageLoading(false)
    }
  }

  const onFinishFailedCourseLanguage: FormProps<FieldCourseLanguageType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const columns_courseLanguage: TableProps<CourseLanguage>['columns'] = [
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
      render: (_, { id }) => (
        <Space>
          <Button
            // onClick={() => {
            //   setOpenModalCourseAreaDetail(true)
            //   setSelectedCourseArea(record)
            // }}
            icon={<EditOutlined />}
          />
        </Space>
      ) // Nút hành động
    }
  ]
  return (
    <Space className='w-full' direction='vertical'>
      <Modal
        title='Thêm ngôn ngữ'
        open={openModalCourseLanguage}
        onOk={() => setOpenModalCourseLanguage(false)}
        onCancel={() => setOpenModalCourseLanguage(false)}
        footer={null}
        width={500}
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
            label='Tên ngôn ngữ'
            name='name'
            rules={[{ required: true, message: 'Vui lòng nhập tên ngôn ngữ!' }]}
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
        pagination={{
          current: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
          position: ['bottomLeft'],
          pageSize: searchParams.get('size') ? Number(searchParams.get('size')) : 5,
          total: data_total_courseLanguage
        }}
        columns={columns_courseLanguage}
        dataSource={data_courseLanguage}
        loading={loadingCourseLanguage}
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

export default CourseLanguageView
