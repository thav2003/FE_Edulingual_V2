import { Button, ConfigProvider, Flex, Input, Space, Table, Typography, DatePicker } from 'antd'
import { useSearchParams } from 'react-router-dom'
import { PaymentApi } from '~/api'
import useFetchData from '~/hooks/useFetch'
import { useAppStore } from '~/stores'
import { formatDateToDDMMYYWithTime } from '~/utils/dateUtils'

const { Text } = Typography
const { RangePicker } = DatePicker
const paymentApi = new PaymentApi()
export const AdminOrderPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const fetchPayments = () => {
    return paymentApi.apiV1ThanhToanGet(
      undefined,
      undefined,
      undefined,
      searchParams.get('page') ? Number(searchParams.get('page')) : 1,
      searchParams.get('size') ? Number(searchParams.get('size')) : 5
    )
  }
  const [loadingPayments, errorPayments, responsePayments] = useFetchData(
    fetchPayments,
    searchParams.get('page'),
    searchParams.get('size'),
    searchParams.get('title')
  )
  const data_payments = responsePayments?.data?.data?.items as any[]
  const data_total_data_payments = responsePayments?.data?.data.total as number
  const columns = [
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
              <Text strong>{data_total_data_payments} giao dịch</Text>
              <Flex align='center' gap={20}>
                <Input.Search size='large' />
                <RangePicker />
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
                console.log(queryParams.toString())
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
