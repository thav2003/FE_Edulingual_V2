import React, { useEffect } from 'react'
import { Flex, Layout, Typography, ConfigProvider, Button, Menu, Dropdown, MenuProps, Avatar, Space } from 'antd'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '~/stores'
import { BellOutlined, EditOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
import Sider from 'antd/es/layout/Sider'

const { Header, Content, Footer } = Layout
const { Text } = Typography
type CommonLayoutTypes = {
  children?: React.ReactNode
}

const AdminLayout: React.FC<CommonLayoutTypes> = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const authStatus = useAuthStore((state) => state.status)
  const user = useAuthStore((state) => state.user)
  const logoutUser = useAuthStore((state) => state.logoutUser)
  const pathSegments = location.pathname.split('/')
  const lastSegment = pathSegments[pathSegments.length - 1]
  const items: MenuProps['items'] = [
    {
      label: <Link to='/admin/dashboard'>Dashboard</Link>,
      key: 'dashboard'
    },
    {
      label: <Link to='/admin/courses'>Khóa học</Link>,
      key: 'course'
    },
    {
      label: <Link to='/admin/teachers'>Giáo viên</Link>,
      key: 'teachers'
    },
    {
      label: <Link to='/admin/students'>Học sinh</Link>,
      key: 'students'
    },
    {
      label: <Link to='/admin/orders'>Giao dịch</Link>,
      key: 'orders'
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
              <Link to='/'>
                <img src='/logo.svg' />
              </Link>
              <Link to='/'>
                <Text strong className='text-[24px]'>
                  Edu Lingual
                </Text>
              </Link>
            </Flex>

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
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: 'dashboard',
                        label: <Link to={'/admin/dashboard'}>Bảng điều khiển</Link>
                      },
                      {
                        key: 'courses',
                        label: <Link to={'/admin/courses'}>Khóa học</Link>
                      },
                      {
                        key: 'teachers',
                        label: <Link to={'/admin/teachers'}>Giáo viên</Link>
                      },
                      {
                        key: 'students',
                        label: <Link to={'/admin/students'}>Học sinh</Link>
                      },
                      {
                        key: 'orders',
                        label: <Link to={'/admin/orders'}>Giao dịch</Link>
                      },
                      {
                        type: 'divider'
                      },
                      {
                        label: 'Đăng xuất',
                        key: '4',
                        icon: <LogoutOutlined />
                      }
                    ],
                    onClick
                  }}
                  trigger={['click']}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Avatar size={'large'} icon={<UserOutlined />} />
                  </a>
                </Dropdown>
              </Flex>
            )}
          </Flex>
        </Header>
        <Layout>
          <Sider
            width={250}
            breakpoint='lg'
            collapsedWidth={0}
            onBreakpoint={(broken) => {
              console.log(broken)
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type)
            }}
          >
            <Menu
              selectedKeys={[`${lastSegment}`]}
              style={{ marginTop: 30 }}
              className='menuItem'
              mode='inline'
              items={items}
            />
          </Sider>
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
        </Layout>

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

export default AdminLayout
