import React from 'react'
import { Typography, Button, Form, Input, Space, App } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import type { FormProps } from 'antd'
import { AuthenticationApi } from '~/api'
import { useAuthStore } from '~/stores'
const { Title, Text } = Typography

type FieldType = {
  userName?: string
  password?: string
  email?: string
  fullName?: string
  description?: string
  confirmPassword?: string
}

const authenticationApi = new AuthenticationApi()
const RegisterForm: React.FC = () => {
  const { notification } = App.useApp()
  const navigate = useNavigate()
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log('Success:', values)
    values.email = values.userName
    values.description = 'This is ' + values.userName
    try {
      await authenticationApi.apiV1RegisterPut(values)
      navigate('/login')
      notification.success({ message: 'Bạn đã đăng kí thành công' })
    } catch (error) {
      console.log(error)
      notification.error({ message: error?.response?.data?.Error || 'Sorry! Something went wrong. App server error' })
    }
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className='mt-2'>
      <Space direction='vertical' className='w-full'>
        <Title className='drop-shadow-lg'>
          Chào mừng đến với <Title className='drop-shadow-lg !text-primary'>Edu Lingual</Title>
        </Title>

        <Form
          layout='vertical'
          name='register_form'
          className='mt-5'
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item<FieldType>
            label={<Text strong>Nhập tài khoản</Text>}
            name='userName'
            rules={[{ required: true, message: 'Vui lòng nhập tài khoản!' }]}
          >
            <Input size='large' placeholder='Tài khoản' />
          </Form.Item>
          <Form.Item<FieldType>
            label={<Text strong>Nhập tên</Text>}
            name='fullName'
            rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
          >
            <Input size='large' placeholder='Full Name' />
          </Form.Item>

          <Form.Item<FieldType>
            label={<Text strong>Mật khẩu</Text>}
            name='password'
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu!' },
              {
                pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/,
                message:
                  'Password must be at least 6 characters long, contain at least one uppercase letter, one number, and one special character'
              }
            ]}
          >
            <Input.Password size='large' placeholder='Password' />
          </Form.Item>

          <Form.Item<FieldType>
            label={<Text strong>Nhập lại mật khẩu</Text>}
            name='confirmPassword'
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'vui lòng nhập lại mật khẩu!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Mật khẩu không khớp!'))
                }
              })
            ]}
          >
            <Input.Password size='large' placeholder='Confirm Password' />
          </Form.Item>

          <Form.Item>
            <Button className='w-full' size='large' type='primary' htmlType='submit'>
              Create
            </Button>
          </Form.Item>

          <Form.Item>
            <Text strong>
              Đã có tài khoản{' '}
              <Link to='/login' className='!text-primary'>
                Đăng nhập
              </Link>
            </Text>
          </Form.Item>
        </Form>
      </Space>
    </div>
  )
}

export default RegisterForm
