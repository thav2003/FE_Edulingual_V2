import { Button, ConfigProvider, Flex, Input, Select, Space, Table, Typography } from 'antd'
import type { TableProps } from 'antd'
import { UserApi } from '~/api'
import useFetchData from '~/hooks/useFetch'
import { useAuthStore } from '~/stores'
import { formatDateToDDMMYYWithTime } from '~/utils/dateUtils'
const { Text } = Typography

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
const userApi = new UserApi()
const MyStudentPage: React.FC = () => {
  const options = ['option 1', 'options 2']
  const userId = useAuthStore((state) => state.user?.id)
  const fetchUsers = () => {
    return userApi.apiV1NguoiHocGet(userId!, undefined, 1, 10000)
  }
  const [loadingUsers, errorUsers, responseUsers] = useFetchData(fetchUsers)

  const dataUsers = responseUsers ? responseUsers?.data?.data?.items : []
  const totalUsers = responseUsers?.data?.totalCount

  const columns: TableProps<User>['columns'] = [
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
      title: 'Khóa học',
      dataIndex: 'course',
      key: 'course'
    },
    {
      title: 'Ngày tham gia',
      dataIndex: 'joinedAt',
      key: 'joinedAt',
      render: (_, { joinedAt }) => {
        return formatDateToDDMMYYWithTime(new Date(joinedAt))
      }
    },
    {
      // title: 'Trạng thái',
      key: 'actions',
      // dataIndex: 'isDone',
      render: () => <Button type='primary'>Chi tiết</Button>
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
              <Text strong>{totalUsers} Học sinh</Text>
              <Flex align='center' gap={20}>
                <Input.Search size='large' placeholder='Tìm kiếm theo tên' />
              </Flex>
            </Flex>
            <Table<User> pagination={{ position: ['bottomLeft'] }} columns={columns} dataSource={dataUsers} />
          </Space>
        </div>
      </ConfigProvider>
    </div>
  )
}

export default MyStudentPage
