import React from 'react'
import { Typography, Button, Form, Input, Space } from 'antd'
import { Link } from 'react-router-dom'
import type { FormProps } from 'antd'
const { Title, Text } = Typography

type FieldType = {
  email?: string
  password?: string
  confirmPassword?: string
}

const RegisterForm: React.FC = () => {
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values)
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className='mt-2'>
      <Space direction='vertical' className='w-full'>
        <Title className='drop-shadow-lg'>
          Chào mứng đến với <Title className='drop-shadow-lg !text-primary'>Edu Lingual</Title>
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
            label={<Text strong>Nhập Email</Text>}
            name='email'
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input size='large' placeholder='Email address' />
          </Form.Item>

          <Form.Item<FieldType>
            label={<Text strong>Mật khẩu</Text>}
            name='password'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password size='large' placeholder='Password' />
          </Form.Item>

          <Form.Item<FieldType>
            label={<Text strong>Nhập lại mật khẩu</Text>}
            name='confirmPassword'
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('The two passwords do not match!'))
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
