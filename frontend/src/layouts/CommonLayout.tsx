import React from 'react'
import { Flex, Layout, Typography, ConfigProvider, Button, Menu } from 'antd'
import { Outlet } from 'react-router-dom'

const { Header, Content, Footer } = Layout
const { Text } = Typography
type CommonLayoutTypes = {
  children?: React.ReactNode
}

const CommonLayout: React.FC<CommonLayoutTypes> = ({ children }) => {
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
              <img src='/logo.svg' />
              <Text strong className='text-[24px]'>
                Edu Lingual
              </Text>
            </Flex>
            <Menu
              mode='horizontal'
              defaultSelectedKeys={['2']}
              items={[
                {
                  key: '1',
                  label: `Tìm kiếm`
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
            <Flex align='center' justify='flex-end' gap={15} style={{ flex: 1 }}>
              <Button className='h-[48px] !text-[#42464D]'>Đăng kí</Button>
              <Button type='primary' className='h-[48px]'>
                Bắt đầu ngay
              </Button>
            </Flex>
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
                <img src='/logo.svg' />
                <Text strong className='text-[24px]'>
                  Edu Lingual
                </Text>
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
