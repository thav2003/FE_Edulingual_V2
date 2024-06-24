import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import {
  App,
  Button,
  ConfigProvider,
  Flex,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Table,
  Tag,
  Typography,
  notification
} from 'antd'
import type { TableProps } from 'antd'
import { useState, useEffect } from 'react'
import { FormProps, useLoaderData } from 'react-router-dom'
import { UserApi } from '~/api'
import useFetchData from '~/hooks/useFetch'
import { useAppStore } from '~/stores'
import { formatDateToDDMMYYWithTime } from '~/utils/dateUtils'
const { Text } = Typography

interface DataType {
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
type FieldType = {
  email: string
  userName: string
  password: string
  fullName: string
  description: string
  userStatus: 0 | 1
  roleId: string
}
const userApi = new UserApi()
const AdminStudentPage: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const refetchApp = useAppStore((state) => state.refetchApp)
  const [loading, setLoading] = useState(false)
  const { notification } = App.useApp()
  const options = ['option 1', 'options 2']
  const [updateForm] = Form.useForm()

  const fetchUsers = () => {
    return userApi.apiV1UsersGet(1, 10000)
  }
  const [loadingUsers, errorUsers, responseUsers] = useFetchData(fetchUsers)
  const [updateModal, setUpdateModal] = useState(false)

  const [selected, setSelected] = useState<DataType>()
  const data_users = responseUsers?.data?.data?.items as DataType[]
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
      key: 'fullName',
      render: (text) => <a>{text}</a>
    },
    {
      title: 'Email',
      dataIndex: 'userName',
      key: 'userName'
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
  const onFinishUpdate: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log('Success:', values)
    try {
      setLoading(true)
      await userApi.apiV1UsersIdPut(selected!.id, values)
      notification.info({ message: 'Cập nhật thành công' })
      refetchApp()
    } catch (error) {
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
              <Text strong>{data_users?.filter((d) => d.role.roleName === 'User').length} Học sinh</Text>
              {/* <Flex align='center' gap={20}>
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
              </Flex> */}
            </Flex>
            <Table<DataType>
              loading={loadingUsers}
              pagination={{ position: ['bottomLeft'], pageSize: 5 }}
              columns={columns}
              dataSource={data_users?.filter((d) => d.role.roleName === 'User')}
            />
          </Space>
        </div>
        <Modal
          title='Chi tiết học sinh'
          open={updateModal}
          onOk={() => setUpdateModal(false)}
          onCancel={() => setUpdateModal(false)}
          width={1000}
          centered
          footer={null}
        >
          <Form layout={'vertical'} form={updateForm} onFinish={onFinishUpdate} onFinishFailed={onFinishFailedUpdate}>
            <Form.Item<FieldType> name='userName' label='Tài khoản'>
              <Input placeholder='Tài khoản' />
            </Form.Item>
            <Form.Item<FieldType> name='fullName' label='Tên'>
              <Input placeholder='Tên' />
            </Form.Item>
            <Form.Item<FieldType> name='email' label='Email'>
              <Input placeholder='Email' />
            </Form.Item>
            <Form.Item<FieldType> name='description' label='Mô tả'>
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
      </ConfigProvider>
    </div>
  )
}

export default AdminStudentPage
