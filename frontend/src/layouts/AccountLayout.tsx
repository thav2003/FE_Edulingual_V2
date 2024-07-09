import { UserOutlined, EditOutlined } from '@ant-design/icons'
import {
  Layout,
  Menu,
  ConfigProvider,
  Avatar,
  Typography,
  MenuProps,
  Button,
  Tooltip,
  Upload,
  message,
  notification
} from 'antd'
import { Space } from 'antd'
import { useEffect, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { UserApi } from '~/api'
import useFetchData from '~/hooks/useFetch'
import { Role } from '~/interfaces'
import { useAppStore, useAuthStore } from '~/stores'
import ImgCrop from 'antd-img-crop'
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload'
import axios from 'axios'
import { convertToFormData } from '~/utils/formData'
const { Text } = Typography
const { Sider } = Layout

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}
const userApi = new UserApi()
const AccountLayout: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const logoutUser = useAuthStore((state) => state.logoutUser)

  const refetchApp = useAppStore((state) => state.refetchApp)
  const user = useAuthStore((state) => state.user)
  const pathSegments = location.pathname.split('/')
  const lastSegment = pathSegments[pathSegments.length - 1]
  const [imageUrl, setImageUrl] = useState<string>('error')
  const items: MenuProps['items'] = [
    ...(user?.role === Role.USER
      ? [
          {
            key: 'mycourses',
            label: <Link to='mycourses'>Khóa học</Link>
          },
          {
            key: 'viewexam',
            label: <Link to='viewexam'>Kiểm tra & Kết quả</Link>
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
            key: 'mycourses',
            label: <Link to='mycourses'>Khóa học</Link>
          },
          {
            key: 'createexam',
            label: <Link to='createexam'>Tạo bộ đề</Link>
          },
          {
            key: 'mystudents',
            label: <Link to='mystudents'>Học sinh</Link>
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
  const fetchProfile = () => {
    return userApi.apiV1UsersIdGet(user!.id)
  }
  const [loading, error, response] = useFetchData(fetchProfile, user?.id)
  const user_data = response?.data?.data

  const onChangeAvatar: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    console.log(info)
    getBase64(info.file.originFileObj as RcFile, (url) => {
      setImageUrl(url)
    })
  }

  const props: UploadProps = {
    showUploadList: false,
    onChange: onChangeAvatar,
    customRequest: async (options: any) => {
      try {
        const data = {
          file: options.file
        }
        const response = await axios.post('http://35.240.183.27:10000/api/v1/upload', convertToFormData(data), {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        console.log(response)
        if (response) {
          await userApi.apiV1UsersIdPut(user!.id, { imageUrl: response.data.data.publicLink })
          notification.success({ message: 'Cập nhật thành công' })
          refetchApp()
        } else {
          notification.error({ message: 'Cập nhật thất bại' })
        }
      } catch (err) {
        notification.error({ message: (err as string) || 'Sorry! Something went wrong. App server error' })
      }
    },
    beforeUpload: (file: RcFile) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!')
      }
      return isJpgOrPng && isLt2M
    }
  }
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
        navigate('/account/mycourses')
      }
      if (user?.role === Role.ADMIN) {
        navigate('/admin/dashboard')
      }
    }
  }, [location])

  useEffect(() => {
    if (user_data?.imageUrl) {
      setImageUrl(user_data?.imageUrl)
    }
  }, [user_data?.imageUrl])
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
            <Avatar size={128} icon={<UserOutlined />} src={imageUrl} />

            <Text strong style={{ fontSize: 24 }}>
              {user?.name}
            </Text>
            {user?.role === Role.TEACHER && <Text>English</Text>}

            <ImgCrop
              showGrid
              cropShape='round'
              rotationSlider
              beforeCrop={(file: RcFile) => {
                const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
                if (!isJpgOrPng) {
                  message.error('You can only upload JPG/PNG file!')
                }
                const isLt2M = file.size / 1024 / 1024 < 2
                if (!isLt2M) {
                  message.error('Image must smaller than 2MB!')
                }

                return isJpgOrPng && isLt2M
              }}
            >
              <Upload {...props}>
                <Text type='success' className='cursor-pointer'>
                  <EditOutlined /> Chỉnh sửa
                </Text>
              </Upload>
            </ImgCrop>
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
