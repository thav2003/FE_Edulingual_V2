import { Button, ConfigProvider, Flex, Input, Select, Space, Table, Typography } from 'antd'
import type { TableProps } from 'antd'
import { useSearchParams } from 'react-router-dom'
import { PaymentApi } from '~/api'
import useFetchData from '~/hooks/useFetch'
import { useAppStore } from '~/stores'
import { formatDateToDDMMYYWithTime } from '~/utils/dateUtils'
const { Text } = Typography

interface DataType {
  key: string
  name: string
  email: string
  note: string
  isDone: boolean
}
const paymentApi = new PaymentApi()
const AdminOrderPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const refetchApp = useAppStore((state) => state.refetchApp)

  const options = ['option 1', 'options 2']
  const fetchPayments = () => {
    return paymentApi.apiV1ThanhToanGet(
      undefined,
      undefined,
      searchParams.get('page') ? Number(searchParams.get('page')) : 1,
      searchParams.get('size') ? Number(searchParams.get('size')) : 5
    )
  }
  const [loadingPayments, errorPayments, responsePayments] = useFetchData(
    fetchPayments,
    searchParams.get('size'),
    searchParams.get('title')
  )
  const data_payments = responsePayments?.data?.data?.items as any[]
  const data_total_data_payments = responsePayments?.data?.data.total as number
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'STT',
      dataIndex: 'id',
      key: 'id',
      render: (item, record, index) => <Text>{++index}</Text>
    },
    {
      title: 'Học sinh',
      // dataIndex: 'name',
      key: 'student',
      render: (_, { user }) => {
        return user.fullName
      }
    },
    {
      title: 'SĐT',
      // dataIndex: 'name',
      key: 'student',
      render: (_, { phoneNumber }) => {
        return phoneNumber
      }
    },
    {
      title: 'Học phí',
      // dataIndex: 'email',
      key: 'teacher',
      render: (_, { fee }) => {
        return fee.toLocaleString()
      }
    },
    {
      title: 'Khóa học',
      // dataIndex: 'note',
      key: 'course',
      render: (_, { course }) => {
        return course.title
      }
    },
    {
      title: 'Ngày tạo',
      // dataIndex: 'key',
      key: 'createdAt',
      render: (_, { createdAt }) => {
        return formatDateToDDMMYYWithTime(new Date(createdAt))
      }
    },
    {
      title: 'Thanh toán',
      // dataIndex: 'note',
      key: 'course',
      render: (_, { paymentMethod }) => {
        return paymentMethod
      }
    },
    {
      // title: 'Trạng thái',
      key: 'actions',
      // dataIndex: 'isDone',
      render: (_, { isDone }) => <Button type='primary'>Chi tiết</Button>
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
          <Space className='w-full' direction='vertical'>
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
              </Flex>
            </Flex>
            <Table
              pagination={{
                current: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
                position: ['bottomLeft'],
                pageSize: searchParams.get('size') ? Number(searchParams.get('size')) : 5,
                total: data_total_data_payments
              }}
              loading={loadingPayments}
              onChange={(pagination) => {
                const queryParams = new URLSearchParams({
                  page: pagination.current!.toString(),
                  size: pagination.pageSize!.toString()
                })

                setSearchParams(queryParams.toString())
              }}
              columns={columns}
              dataSource={data_payments}
            />
          </Space>
        </div>
      </ConfigProvider>
    </div>
  )
}

export default AdminOrderPage
