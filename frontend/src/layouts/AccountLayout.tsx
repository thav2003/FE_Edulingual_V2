import { UserOutlined, EditOutlined } from '@ant-design/icons'
import { Layout, Menu, ConfigProvider, Avatar, Typography, MenuProps } from 'antd'
import { Space } from 'antd'
import { useEffect } from 'react'
import { Link, Outlet, redirect, useLocation, useNavigate } from 'react-router-dom'
import { Role } from '~/interfaces'
import { useAuthStore } from '~/stores'
const { Text } = Typography
const { Sider } = Layout
const AccountLayout: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const logoutUser = useAuthStore((state) => state.logoutUser)

  const user = useAuthStore((state) => state.user)
  const pathSegments = location.pathname.split('/')
  const lastSegment = pathSegments[pathSegments.length - 1]
  const items: MenuProps['items'] = [
    ...(user?.role === Role.USER
      ? [
          {
            key: '1',
            label: 'My Journey'
          },
          {
            key: '2',
            label: 'Kiểm tra & Kết quả'
          },
          {
            key: 'mycourses',
            label: <Link to='mycourses'>Khóa học</Link>
          },
          {
            key: '4',
            label: 'Tin nhắn'
          }
        ]
      : []),
    ...(user?.role === Role.TEACHER
      ? [
          {
            key: '1',
            label: 'Học sinh'
          },
          {
            key: '2',
            label: 'Tạo bộ đề'
          },
          {
            key: '3',
            label: 'Khóa học'
          },
          {
            key: '4',
            label: 'Tin nhắn'
          }
        ]
      : []),

    {
      key: '5',
      label: 'Đăng xuất'
    }
  ]
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e)
    if (e.key === '5') {
      logoutUser()
      navigate('/login')
    }
  }

  useEffect(() => {
    if (location.pathname === '/account') {
      if (user?.role === Role.USER) {
        navigate('/account/mycourses')
      }
      if (user?.role === Role.TEACHER) {
        // navigate('/account')
      }
      if (user?.role === Role.ADMIN) {
        navigate('/admin/dashboard')
      }
    }
  }, [location])

  return (
    <ConfigProvider
      theme={{
        token: {
          lineWidth: 0
        },
        components: {
          Layout: {
            siderBg: '#F7F7F7',
            triggerColor: 'black',
            headerBg: '#FFFFFF',
            headerHeight: 60,
            footerBg: '#FFFFFF'
          },
          Menu: {
            itemBg: '#F7F7F7',
            itemActiveBg: '#FFFFFF',
            itemSelectedBg: '#FFFFFF',
            itemHoverBg: '#FFFFFF',

            itemColor: '#42464D',
            itemHoverColor: '#42464D',
            itemSelectedColor: '#42464D'
          }
        }
      }}
    >
      <Layout hasSider>
        <Sider
          className={'text-center'}
          width={350}
          style={{ paddingTop: 30 }}
          breakpoint='lg'
          collapsedWidth={0}
          onBreakpoint={(broken) => {
            console.log(broken)
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type)
          }}
        >
          <Space direction='vertical'>
            <Avatar size={128} icon={<UserOutlined />} />

            <Text strong style={{ fontSize: 24 }}>
              {user?.name}
            </Text>
            {user?.role === Role.TEACHER && <Text>English</Text>}

            <Text type='success'>
              <EditOutlined /> Chỉnh sửa
            </Text>
          </Space>

          <Menu
            onClick={onClick}
            style={{ marginTop: 30 }}
            className='menuItem'
            mode='inline'
            selectedKeys={[`${lastSegment}`]}
            items={items}
          />
        </Sider>
        <Layout
          style={{
            background: '#FFFFFF',
            minHeight: '100vh'
          }}
        >
          <Outlet />
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}
export default AccountLayout
