import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { App, Button, ConfigProvider, Flex, Form, Input, Modal, Select, Space, Table, Tag, Typography } from 'antd'
import type { TableProps, TabsProps, FormProps } from 'antd'
import { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { UserApi } from '~/api'
import useFetchData from '~/hooks/useFetch'
import { useAppStore } from '~/stores'
import { formatDateToDDMMYYWithTime } from '~/utils/dateUtils'
const { Text, Paragraph } = Typography
const { Option } = Select

interface DataType {
  userName: string
  password: string
  fullName: string
  description: string
  status: 0 | 1
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
type FieldType = {
  userName: string
  password: string
  fullName: string
  description: string
  status: 0 | 1
  roleId: string
}

const userApi = new UserApi()
const AdminTeacherPage: React.FC = () => {
  const refetchApp = useAppStore((state) => state.refetchApp)
  const { notification } = App.useApp()
  const [open, setOpen] = useState(false)
  const [form] = Form.useForm()
  const [updateForm] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const options = ['option 1', 'options 2']

  const fetchUsers = () => {
    return userApi.apiV1UsersGet(1, 10000)
  }
  const [loadingUsers, errorUsers, responseUsers] = useFetchData(fetchUsers)
  const [updateModal, setUpdateModal] = useState(false)

  const [selected, setSelected] = useState<DataType>()
  const data_users = responseUsers?.data?.data?.items as DataType[]
  const roles = [
    ...new Set(
      data_users?.map((user) => {
        if (user.role.roleName === 'Teacher') {
          return user.role
        }
      })
    )
  ]

  const handleDelete = async (id: string) => {
    try {
      await userApi.apiV1UsersIdDelete(id)
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
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'STT',
      dataIndex: 'id',
      key: 'id',
      render: (item, record, index) => <Text>{++index}</Text>
    },
    {
      title: 'Tên',
      dataIndex: 'fullName',
      key: 'fullName'
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_, { createdAt }) => {
        return formatDateToDDMMYYWithTime(new Date(createdAt))
      }
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      width: 300,
      render: (_, { description }) => {
        return (
          <Paragraph ellipsis={{ rows: 2, expandable: 'collapsible', symbol: '', tooltip: true }}>
            {description}
          </Paragraph>
        )
      }
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (_, { status }) => {
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
      }
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => {
              setUpdateModal(true)
              setSelected(record)
            }}
            icon={<EditOutlined />}
          />
          <Button danger type='primary' onClick={() => handleDelete(record.id)} icon={<DeleteOutlined />} />
        </Space>
      )
    }
  ]
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log('Success:', values)
    try {
      setLoading(true)
      await userApi.apiV1UsersPost({
        ...values,
        roleId: roles.find((role) => role?.roleName === 'Teacher')!.id,
        email: 'email',
        imageUrl: 'imageUrl'
      })
      notification.info({ message: 'Tạo thành công' })
      refetchApp()
    } catch (eror) {
      notification.error({
        message:
          error?.response?.data?.message ||
          error?.response?.data?.Error ||
          'Sorry! Something went wrong. App server error'
      })
    } finally {
      setLoading(false)
    }
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  const onFinishUpdate: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log('Success:', values)
    try {
      setLoading(true)
      await userApi.apiV1UsersIdPut(selected!.id, values)
      notification.info({ message: 'Cập nhật thành công' })
      refetchApp()
    } catch (eror) {
      notification.error({
        message:
          error?.response?.data?.message ||
          error?.response?.data?.Error ||
          'Sorry! Something went wrong. App server error'
      })
    } finally {
      setLoading(false)
    }
  }

  const onFinishFailedUpdate: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  useEffect(() => {
    updateForm.setFieldsValue(selected)
  }, [selected, updateForm])
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
          <Space className='w-full' direction='vertical'>
            <Flex align='center' justify='space-between' gap={20} wrap>
              <Text strong>{data_users?.filter((d) => d.role.roleName === 'Teacher').length} Giáo viên</Text>
              <Flex align='center' gap={20}>
                {/* <Input.Search size='large' />
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
                  {options?.map((data) => (
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
                </Select> */}
                <Button type='primary' size='large' onClick={() => setOpen(true)}>
                  Thêm giáo viên
                </Button>
              </Flex>
            </Flex>

            <Table<DataType>
              loading={loadingUsers}
              pagination={{ position: ['bottomLeft'], pageSize: 5 }}
              columns={columns}
              dataSource={data_users?.filter((d) => d.role.roleName === 'Teacher')}
            />
          </Space>
        </div>
        <Modal
          title='Thêm giáo viên'
          open={open}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          width={1000}
          centered
          footer={null}
        >
          <Form
            layout={'vertical'}
            form={form}
            initialValues={{ status: 1 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item<FieldType>
              name='userName'
              label='Tài khoản'
              rules={[{ required: true, message: 'Vui lòng nhập tài khoản!' }]}
            >
              <Input placeholder='Tài khoản' />
            </Form.Item>
            <Form.Item<FieldType>
              name='password'
              label='Mật khẩu'
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            >
              <Input.Password placeholder='Password' />
            </Form.Item>
            <Form.Item<FieldType>
              name='fullName'
              label='Tên trung tâm'
              rules={[{ required: true, message: 'Vui lòng nhập tên trung tâm!' }]}
            >
              <Input placeholder='Tên trung tâm' />
            </Form.Item>
            <Form.Item<FieldType>
              name='description'
              label='Mô tả'
              rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
            >
              {/* <EditorComponent /> */}
              <Input placeholder='Mô tả' />
            </Form.Item>
            <Form.Item>
              <Button loading={loading} type='primary' htmlType='submit'>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title='Chi tiết giáo viên'
          open={updateModal}
          onOk={() => setUpdateModal(false)}
          onCancel={() => setUpdateModal(false)}
          width={1000}
          centered
          footer={null}
        >
          <Form layout={'vertical'} form={updateForm} onFinish={onFinishUpdate} onFinishFailed={onFinishFailedUpdate}>
            <Form.Item<FieldType>
              name='userName'
              label='Tài khoản'
              rules={[{ required: true, message: 'Vui lòng nhập tài khoản!' }]}
            >
              <Input placeholder='Tài khoản' />
            </Form.Item>

            <Form.Item<FieldType>
              name='password'
              label='Mật khẩu'
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            >
              <Input.Password placeholder='Password' />
            </Form.Item>
            <Form.Item<FieldType>
              name='fullName'
              label='Tên trung tâm'
              rules={[{ required: true, message: 'Vui lòng nhập tên trung tâm!' }]}
            >
              <Input placeholder='Full Name' />
            </Form.Item>
            <Form.Item<FieldType>
              name='description'
              label='Mô tả'
              rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
            >
              {/* <EditorComponent /> */}
              <Input placeholder='Description' />
            </Form.Item>
            <Form.Item<FieldType> label='Trạng thái' name='status'>
              <Select placeholder='Trạng thái' allowClear>
                <Option value={0}>Ngưng hoạt động</Option>
                <Option value={1}>Hoạt động</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button loading={loading} type='primary' htmlType='submit'>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </ConfigProvider>
    </div>
  )
}

export default AdminTeacherPage
