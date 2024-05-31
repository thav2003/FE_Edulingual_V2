import React, { useState } from 'react'
import { StyleProvider } from '@ant-design/cssinjs'
import { CheckSquareOutlined, UserOutlined, EditOutlined, CloudDownloadOutlined } from '@ant-design/icons'
import {
  Layout,
  Menu,
  theme,
  ConfigProvider,
  Avatar,
  Typography,
  Card,
  Flex,
  Button,
  Radio,
  Divider,
  Statistic
} from 'antd'
import { Space } from 'antd'
const { Title, Text } = Typography
const { Header, Content, Footer, Sider } = Layout
const cardStyle = {
  width: '100%',
  // background: "#287B62",
  border: 'solid #D1D5DB',
  borderWidth: 0.5,
  overflow: 'hidden',
  borderRadius: 30
}
const imgStyle = {
  display: 'block',
  width: 128
}
const AccountLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()
  const [mode, setMode] = useState(1)

  return (
    <ConfigProvider
      theme={{
        token: {
          lineWidth: 0
        },
        components: {
          Layout: {
            siderBg: '#F7F7F7'
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
      <Layout>
        <Sider
          className={'text-center'}
          width={400}
          style={{ paddingLeft: 100, paddingTop: 30 }}
          breakpoint='lg'
          collapsedWidth='0'
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
              Linh
            </Text>
            <Text>English</Text>
            <Text type='success'>
              <EditOutlined /> Chỉnh sửa
            </Text>
          </Space>

          <Menu
            style={{ marginTop: 30 }}
            className='menuItem'
            mode='inline'
            defaultSelectedKeys={['2']}
            items={[
              {
                key: '1',
                label: 'My Journey'
              },
              {
                key: '2',
                label: 'Kiểm tra & Kết quả'
              },
              {
                key: '3',
                label: 'Tin Nhắn'
              },
              {
                key: '4',
                label: 'Cài đặt'
              },
              {
                key: '5',
                label: 'Đăng xuất'
              }
            ]}
          />
        </Sider>
        <Layout
          style={{
            background: '#FFFFFF'
          }}
        >
          <div
            style={{
              height: '100%'
            }}
          >
            test
          </div>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}
export default AccountLayout
