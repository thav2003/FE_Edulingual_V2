/* eslint-disable @typescript-eslint/no-explicit-any */
import { App, Button, ConfigProvider, Form, FormProps, List, Radio, Space, Typography } from 'antd'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ExamApi } from '~/api'
import useFetchData from '~/hooks/useFetch'
import { useAppStore, useAuthStore } from '~/stores'

const examApi = new ExamApi()
const ExamDetailPage: React.FC = () => {
  const navigate = useNavigate()
  const { notification } = App.useApp()
  const userId = useAuthStore((state) => state.user?.id)
  const { id } = useParams()
  const fetch = () => {
    return examApi.apiV1ExamIdGet(id)
  }
  const [loading, error, response] = useFetchData(fetch, id)
  const questions = response?.data?.data?.questions as any
  const onFinish: FormProps<any>['onFinish'] = async (values) => {
    values.userId = userId
    values.examId = id
    console.log('Success:', values)
    try {
      await examApi.apiV1ExamResultPost(values)
      notification.success({ message: 'Bạn đã hoàn thành bài thi' })
      navigate('/account/viewexam')
    } catch {
      notification.error({ message: 'Sorry! Something went wrong. App server error' })
    }
  }

  const onFinishFailed: FormProps<any>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

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
        <div className='h-full w-full p-10 bg-[#FFFFFF]'>
          <Typography.Title>{response?.data?.data?.title}</Typography.Title>
          <Form
            name='basic'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
          >
            <List
              itemLayout='horizontal'
              dataSource={questions}
              renderItem={(item: any, index) => (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <Typography.Text>
                        Question {index + 1}: {item.content}
                      </Typography.Text>
                    }
                    description={
                      <Form.Item name={['results', index]} rules={[{ required: true, message: 'Trả lời câu hỏi' }]}>
                        <Radio.Group>
                          <Space direction='vertical'>
                            {item.answers?.map((a) => <Radio value={a.id}>{a.content}</Radio>)}
                          </Space>
                        </Radio.Group>
                      </Form.Item>
                    }
                  />
                </List.Item>
              )}
            />

            <Button type='primary' htmlType='submit'>
              Nộp bài
            </Button>
          </Form>
        </div>
      </ConfigProvider>
    </div>
  )
}

export default ExamDetailPage
