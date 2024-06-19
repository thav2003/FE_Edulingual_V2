/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConfigProvider, List, Radio, Space, Typography } from 'antd'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ExamApi } from '~/api'
import useFetchData from '~/hooks/useFetch'

const examApi = new ExamApi()
const CreateDetailPage: React.FC = () => {
  const { id } = useParams()
  const fetch = () => {
    return examApi.apiV1ExamIdGet(id)
  }
  const [loading, error, response] = useFetchData(fetch, id)
  const questions = response?.data?.data?.questions as any

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
          <List
            itemLayout='horizontal'
            dataSource={questions}
            renderItem={(item: any) => (
              <List.Item>
                <List.Item.Meta
                  title={<Typography.Text>{item.content}</Typography.Text>}
                  description={
                    <Radio.Group value={item.answers?.find((a) => a.isCorrect).content}>
                      <Space direction='vertical'>
                        {item.answers?.map((a) => <Radio value={a.content}>{a.content}</Radio>)}
                      </Space>
                    </Radio.Group>
                  }
                />
              </List.Item>
            )}
          />
        </div>
      </ConfigProvider>
    </div>
  )
}

export default CreateDetailPage
