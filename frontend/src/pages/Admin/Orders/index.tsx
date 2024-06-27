import { Button, ConfigProvider, Flex, Input, DatePicker, Space, Table, Typography } from 'antd'
import type { TableProps } from 'antd'
import { useCallback, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PaymentApi } from '~/api'
import useFetchData from '~/hooks/useFetch'
import { useAppStore } from '~/stores'
import debounce from '~/utils'
import { formatDateToDDMMYYWithTime } from '~/utils/dateUtils'
import dayjs from 'dayjs'
const { Text } = Typography
const { RangePicker } = DatePicker
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
  const [searchQuery, setSearchQuery] = useState(searchParams.get('center') ? searchParams.get('center')! : '')
  const [fromQuery, setFromQuery] = useState(searchParams.get('from') ? dayjs(searchParams.get('from')!) : null)
  const [toQuery, setToQuery] = useState(searchParams.get('to') ? dayjs(searchParams.get('to')!) : null)
  const refetchApp = useAppStore((state) => state.refetchApp)

  const options = ['option 1', 'options 2']
  const fetchPayments = () => {
    return paymentApi.apiV1ThanhToanGet(
      searchParams.get('from') ? searchParams.get('from')! : undefined,
      searchParams.get('to') ? searchParams.get('to')! : undefined,
      searchParams.get('center') ? searchParams.get('center')! : undefined,
      searchParams.get('page') ? Number(searchParams.get('page')) : 1,
      searchParams.get('size') ? Number(searchParams.get('size')) : 5
    )
  }
  const [loadingPayments, errorPayments, responsePayments] = useFetchData(
    fetchPayments,
    searchParams.get('from'),
    searchParams.get('to'),
    searchParams.get('center'),
    searchParams.get('size'),
    searchParams.get('title')
  )
  const data_payments = responsePayments?.data?.data?.items as any[]
  const data_total_data_payments = responsePayments?.data?.data.total as number

  const handleSearchCenter = useCallback(
    debounce((query) => {
      console.log(query)
      const queryParams = new URLSearchParams({
        page: searchParams.get('page') || '1',
        size: searchParams.get('size') || '5'
      })
      if (query) {
        queryParams.set('center', query)
      }
      if (searchParams.get('from')) {
        queryParams.set('from', searchParams.get('from')!)
      }
      if (searchParams.get('to')) {
        queryParams.set('to', searchParams.get('to')!)
      }
      setSearchParams(queryParams.toString())
    }, 500),
    [searchParams, setSearchParams]
  )

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
        return user?.fullName
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
      title: 'Trung tâm',
      // dataIndex: 'note',
      key: 'center',
      render: (_, { course }) => {
        return course.center?.fullName
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
      render: (_, { isDone }) => (
        <Space>
          <Button
            // onClick={() => {
            //   setOpenModalCourseAreaDetail(true)
            //   setSelectedCourseArea(record)
            // }}
            icon={<EditOutlined />}
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
          <Space className='w-full' direction='vertical'>
            <Flex align='center' justify='space-between' gap={20} wrap>
              <Text strong>{data_total_data_payments} giao dịch</Text>
              <Flex align='center' gap={20}>
                <Input.Search
                  size='large'
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    handleSearchCenter(e.target.value)
                  }}
                />
                <RangePicker
                  size='large'
                  value={[fromQuery, toQuery]}
                  className='w-full'
                  onChange={(dates, dateStrings) => {
                    console.log(dates)
                    const queryParams = new URLSearchParams({
                      page: searchParams.get('page') || '1',
                      size: searchParams.get('size') || '5'
                    })
                    if (queryParams.get('center')) {
                      queryParams.set('center', queryParams.get('center')!)
                    }
                    if (dates !== null) {
                      if (dates[0]) {
                        setFromQuery(dates[0])
                        const fromDate = dates[0].startOf('day').format('YYYY-MM-DDTHH:mm:ss.SSS')
                        queryParams.set('from', fromDate)
                      }
                      if (dates[1]) {
                        setToQuery(dates[1])
                        const toDate = dates[1].endOf('day').format('YYYY-MM-DDTHH:mm:ss.SSS')
                        queryParams.set('to', toDate)
                      }
                    } else {
                      setFromQuery(null)
                      setToQuery(null)
                    }

                    setSearchParams(queryParams.toString())
                  }}
                />
                <Input.Search size='large' placeholder='Tìm trung tâm' />
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
