import React, { useEffect } from 'react'
import { Flex, Layout, Typography, ConfigProvider, Button, Menu, Dropdown, MenuProps, Avatar } from 'antd'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '~/stores'
import { BellOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Role } from '~/interfaces'

const { Header, Content, Footer } = Layout
const { Text } = Typography
type CommonLayoutTypes = {
  children?: React.ReactNode
}

const CommonLayout: React.FC<CommonLayoutTypes> = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const authStatus = useAuthStore((state) => state.status)
  const user = useAuthStore((state) => state.user)
  const logoutUser = useAuthStore((state) => state.logoutUser)
  const pathSegments = location.pathname.split('/')
  const lastSegment = pathSegments[pathSegments.length - 1]
  const items: MenuProps['items'] = [
    ...(user?.role === Role.ADMIN
      ? [
          {
            key: 'dashboard',
            label: <Link to={'/admin/dashboard'}>Dashboard</Link>
          },
          {
            key: 'courses',
            label: <Link to={'/admin/courses'}>Course</Link>
          },
          {
            key: 'students',
            label: <Link to={'/admin/students'}>Student</Link>
          },
          {
            key: 'teachers',
            label: <Link to={'/admin/teachers'}>Teacher</Link>
          },
          {
            key: 'orders',
            label: <Link to={'/admin/orders'}>Orders</Link>
          }
        ]
      : []),
    ...(user?.role === Role.USER
      ? [
          {
            label: <Link to='/account/mycourses'>Khóa học</Link>,
            key: 'mycourses'
          }
        ]
      : []),
    ...(user?.role === Role.TEACHER
      ? [
          {
            label: <Link to='/account/mycourses'>Khóa học</Link>,
            key: 'mycourses'
          }
        ]
      : []),
    {
      type: 'divider'
    },
    {
      label: 'Đăng xuất',
      key: '4',
      icon: <LogoutOutlined />
    }
  ]
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e)
    if (e.key === '4') {
      logoutUser()
      navigate('/login')
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])
  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            headerBg: '#FFFFFF',
            headerHeight: 60,
            footerBg: '#FFFFFF'
          }
        }
      }}
    >
      <Layout className='h-full min-h-screen'>
        <Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%'
          }}
        >
          <Flex align='center' justify='space-between'>
            <Flex align='center' gap={10} style={{ flex: 1 }}>
              <Link to='/' className='h-[50px]'>
                <img src='/logo.svg' className='h-[50px]' />
              </Link>
              <Link to='/'>
                <Text strong className='text-[24px]'>
                  Edu Lingual
                </Text>
              </Link>
            </Flex>
            <Menu
              mode='horizontal'
              selectedKeys={[`${lastSegment}`]}
              items={[
                {
                  key: 'courses',
                  label: <Link to='/courses'>Tìm kiếm</Link>
                },
                {
                  key: '2',
                  label: `Blog`
                },
                {
                  key: '3',
                  label: `Khác`,
                  children: [
                    { key: '3a', label: 'Tài liệu' },
                    { key: '3b', label: 'Trở thành đối tác' },
                    { key: '3c', label: 'Hỗ trợ' }
                  ]
                }
              ]}
              style={{ flex: 1, minWidth: 0, justifyContent: 'center' }}
            />
            {authStatus === 'unauthorized' && (
              <Flex align='center' justify='flex-end' gap={15} style={{ flex: 1 }}>
                <Button
                  className='h-[48px] !text-[#42464D]'
                  onClick={() => {
                    navigate('/register')
                  }}
                >
                  Đăng kí
                </Button>
                <Button
                  onClick={() => {
                    navigate('/login')
                  }}
                  type='primary'
                  className='h-[48px]'
                >
                  Bắt đầu ngay
                </Button>
              </Flex>
            )}
            {authStatus === 'authorized' && (
              <Flex align='center' justify='flex-end' gap={15} style={{ flex: 1 }}>
                <BellOutlined className='text-[24px]' />
                <Text>{user?.name}</Text>
                <Dropdown menu={{ items, onClick }} trigger={['click']}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Avatar size={'large'} icon={<UserOutlined />} />
                  </a>
                </Dropdown>
              </Flex>
            )}
          </Flex>
        </Header>
        <Content>
          <div
            style={{
              height: '100%',
              width: '100%'
            }}
          >
            {children ? children : <Outlet />}
          </div>
        </Content>
        <Footer>
          <Flex align='center' justify='space-between'>
            <Flex align='flex-start' vertical gap={10} style={{ flex: 1 }}>
              <Flex align='center' gap={10} style={{ flex: 1 }}>
                <Link to='/'>
                  <img src='/logo.svg' />
                </Link>
                <Link to='/'>
                  <Text strong className='text-[24px]'>
                    Edu Lingual
                  </Text>
                </Link>
              </Flex>
              <Text strong>Where the best begin your journey</Text>
            </Flex>
            <Flex align='center' justify='center' gap={30} style={{ flex: 1 }}>
              <Text>FAQ</Text>
              <Text>Terms of Service</Text>
              <Text>Privacy Policy</Text>
            </Flex>
            <Flex align='center' justify='flex-end' gap={15} style={{ flex: 1 }}>
              <img src='/twitter.svg' />
              <img src='/Link.svg' />
              <img src='/ins.svg' />
              <img src='/fb.svg' />
            </Flex>
          </Flex>
          <div className='text-center'>© Edu Lingual. {new Date().getFullYear()} — All rights reserved.</div>
        </Footer>
      </Layout>
    </ConfigProvider>
  )
}

export default CommonLayout
