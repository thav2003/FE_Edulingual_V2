import React from 'react'
import { Typography, Button, Form, Input, Space, Divider, Flex, App } from 'antd'
import type { FormProps } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '~/stores'

const { Title, Text } = Typography

type FieldType = {
  email: string
  password: string
}

const LoginForm: React.FC = () => {
  const { notification } = App.useApp()
  const navigate = useNavigate()
  const loginUser = useAuthStore((state) => state.loginUser)
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log('Success:', values)
    const { email, password } = values

    try {
      await loginUser(email, password)
      navigate('/')
    } catch (error) {
      console.log(error)
      notification.error({ message: 'Sorry! Something went wrong. App server error' })
    }
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className='mt-2'>
      <Space direction='vertical' className='w-full'>
        <Title className='drop-shadow-lg'>
          Chào mứng đến với <br />
          <span className='drop-shadow-lg !text-primary'>Edu Lingual</span>
        </Title>

        <Text className='text-[#171618] text-[18px]'>Where the best begin your journey</Text>

        <Form
          layout='vertical'
          name='login_form'
          className='mt-5'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item>
            <Button size='large' className='w-full text-[#545861] font-semibold'>
              <Flex gap='middle' align='center' justify='center'>
                <svg className='w-6 inline' viewBox='0 0 533.5 544.3'>
                  <path
                    d='M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z'
                    fill='#4285f4'
                  />
                  <path
                    d='M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z'
                    fill='#34a853'
                  />
                  <path
                    d='M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z'
                    fill='#fbbc04'
                  />
                  <path
                    d='M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z'
                    fill='#ea4335'
                  />
                </svg>
                Login with Google
              </Flex>
            </Button>
          </Form.Item>
          <Divider plain className='!text-[#323232] !font-semibold'>
            or
          </Divider>
          <Form.Item<FieldType>
            label={<Text strong>Nhập Email</Text>}
            name='email'
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input size='large' placeholder='Email address' />
          </Form.Item>

          <Form.Item<FieldType>
            label={<Text strong>Mật khẩu</Text>}
            name='password'
            style={{ position: 'relative' }}
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password size='large' placeholder='Password' />
          </Form.Item>
          <Form.Item>
            <Link className='float-right text-primary' to='/forgetpassword'>
              Forgot password
            </Link>
          </Form.Item>
          <Form.Item>
            <Button className='w-full' size='large' type='primary' htmlType='submit'>
              <Space>
                Đăng nhập
                <svg
                  width='16'
                  className='inline'
                  height='16'
                  viewBox='0 0 16 16'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M1 7H0V9H1V7ZM15.2071 8.70711C15.5976 8.31658 15.5976 7.68342 15.2071 7.29289L8.84315 0.928932C8.45262 0.538408 7.81946 0.538408 7.42893 0.928932C7.03841 1.31946 7.03841 1.95262 7.42893 2.34315L13.0858 8L7.42893 13.6569C7.03841 14.0474 7.03841 14.6805 7.42893 15.0711C7.81946 15.4616 8.45262 15.4616 8.84315 15.0711L15.2071 8.70711ZM1 9H14.5V7H1V9Z'
                    fill='white'
                  />
                </svg>
              </Space>
            </Button>
          </Form.Item>
          <Form.Item>
            <Text strong>
              Chưa có tài khoản{' '}
              <Link to='/register' className='!text-primary'>
                Đăng kí
              </Link>
            </Text>
          </Form.Item>
        </Form>
      </Space>
    </div>
  )
}

export default LoginForm
