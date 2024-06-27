/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { CheckSquareOutlined, CloudDownloadOutlined, InboxOutlined, UserOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'
import {
  message,
  Upload,
  ConfigProvider,
  Typography,
  Space,
  Button,
  Form,
  Progress,
  Select,
  App,
  Table,
  Avatar,
  Card,
  Divider,
  Flex,
  Radio,
  List,
  Image,
  Input
} from 'antd'
import type { FormProps } from 'antd'
import axios from 'axios'
import { useAppStore, useAuthStore } from '~/stores'
import { ExamApi, UserApi } from '~/api'
import useFetchData from '~/hooks/useFetch'
import { formatDateToDDMMYYWithTime } from '~/utils/dateUtils'
import { useNavigate } from 'react-router-dom'
const { Text, Title } = Typography

interface Course {
  courseArea: {
    name: string
    courseAreaStatus: number
    id: string
    createdAt: string
    updatedAt: string
    createdBy: string | null
    updatedBy: string | null
    isDeleted: boolean
  }
  courseLanguage: {
    name: string
    courseLanguageStatus: number
    id: string
    createdAt: string
    updatedAt: string
    createdBy: string | null
    updatedBy: string | null
    isDeleted: boolean
  }
  courseCategory: {
    name: string
    courseCategoryStatus: number
    id: string
    createdAt: string
    updatedAt: string
    createdBy: string | null
    updatedBy: string | null
    isDeleted: boolean
  }
  center: {
    userName: string
    password: string
    fullName: string
    description: string
    userStatus: number
    id: string
    createdAt: string
    updatedAt: string
    createdBy: string
    updatedBy: string
    isDeleted: boolean
  }
  title: string
  description: string
  duration: string
  tuitionfee: number
  id: string
  createdAt: string
  updatedAt: string
  createdBy: string
  updatedBy: string
  isDeleted: boolean
  status: 0 | 1
  isHighlighted: boolean
}
const cardStyle = {
  width: '100%',
  // background: "#287B62",
  border: 'solid #D1D5DB',
  borderWidth: 0.5,
  overflow: 'hidden',
  borderRadius: 30
}
const userApi = new UserApi()
const examApi = new ExamApi()
const ViewExamPage: React.FC = () => {
  const { notification } = App.useApp()
  const navigate = useNavigate()
  const userId = useAuthStore((state) => state.user?.id)
  const [defaultFileList, setDefaultFileList] = useState([])
  const [progress, setProgress] = useState(0)
  const [selectedCourseId, setSelectedCourseId] = useState<string | undefined>(undefined)
  const refetchApp = useAppStore((state) => state.refetchApp)
  const [mode, setMode] = useState(1)
  const [searchExam, setSearcExam] = useState('')
  const [dataExamResults, setDataExamResults] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const props: UploadProps = {
    name: 'file',
    multiple: false,
    showUploadList: false,
    fileList: defaultFileList,
    disabled: selectedCourseId ? false : true,
    customRequest: async (options) => {
      const { onSuccess, onError, file, onProgress } = options

      const fmData = new FormData()

      fmData.append('file', file)
      try {
        const res = await axios.post(
          `http://34.16.153.203/api/v1/exam/upload?teacherId=${userId}&courseId=${selectedCourseId}`,
          fmData,
          {
            headers: { 'content-type': 'multipart/form-data' },
            onUploadProgress: (event) => {
              const percent = Math.floor((event.loaded / event.total!) * 100)
              setProgress(percent)
              if (percent === 100) {
                setTimeout(() => setProgress(0), 1000)
              }
              onProgress({ percent: (event.loaded! / event.total) * 100 })
            }
          }
        )

        onSuccess('Ok')
        refetchApp()
        notification.success({ message: 'Tạo thành công' })
        console.log('server res: ', res)
      } catch (err) {
        console.log('Eroor: ', err)
        const error = new Error('Some error')
        notification.error({ message: 'Tạo thất bại' })
        onError({ err })
      } finally {
        setDefaultFileList([])
      }
    },
    onChange: ({ file, fileList, event }) => {
      // console.log(file, fileList, event);
      //Using Hooks to update the state to the current filelist
      setDefaultFileList(fileList)
      //filelist - [{uid: "-1",url:'Some url to image'}]
    }
  }

  const fetchCourses = () => {
    return userApi.apiV1NguoiHocIdKhoaHocGet(userId!)
  }
  const [loadingCourses, errorCourses, responseCourses] = useFetchData(fetchCourses)
  const data_courses = responseCourses?.data?.data.items as Course[]

  const fetchExamResults = () => {
    if (selectedCourseId) return examApi.apiV1ExamGetScorePost(1, 10000, { userId: userId, courseId: selectedCourseId })
    else return Promise.resolve()
  }
  const [loadingExamResults, errorExamResults, responseExamResults] = useFetchData(fetchExamResults, selectedCourseId)

  const data_exam_results = responseExamResults?.data?.data?.items
  console.log(data_exam_results)
  const fetchExams = () => {
    if (selectedCourseId) return examApi.apiV1ExamCourseIdIdGet(selectedCourseId, 1, 10000)
    else return Promise.resolve()
  }
  const [loadingExams, errorExams, responseExams] = useFetchData(fetchExams, selectedCourseId)

  const data_exams = responseExams?.data?.data?.items

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      render: (item, record, index) => <Typography.Text>{++index}</Typography.Text>
    },
    {
      title: 'Tên',
      dataIndex: 'title',
      key: 'name'
    },
    {
      title: 'Số câu',
      // dataIndex: 'tuitionfee',
      key: 'totalQuestion',
      render: (item, record, index) => <Typography.Text>{record?.totalQuestion}</Typography.Text>
    },
    {
      title: 'Tạo bởi',
      dataIndex: 'createdBy',
      key: 'createdBy'
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (item, record, index) => <Typography.Text>{formatDateToDDMMYYWithTime(new Date(item))}</Typography.Text>
    },
    {
      // title: 'Trạng thái',
      key: 'actions',
      // dataIndex: 'isDone',
      render: (_, { id }) => (
        <Button type='primary' onClick={() => navigate(`${id}`)}>
          Làm thử
        </Button>
      )
    }
  ]
  console.log(dataExamResults)
  useEffect(() => {
    if (dataExamResults) {
      const filteredResults = dataExamResults.filter((result) =>
        result?.exam.title?.toLowerCase().includes(searchExam.toLowerCase())
      )
      setFilteredData(filteredResults)
    }
  }, [searchExam, dataExamResults])

  useEffect(() => {
    if (data_exam_results) {
      setDataExamResults(data_exam_results)
      setFilteredData(data_exam_results)
    }
  }, [data_exam_results])
  console.log(data_exam_results)
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
          <Space size={'large'} direction='vertical' style={{ width: '100%' }}>
            <Select
              value={selectedCourseId}
              onChange={setSelectedCourseId}
              placeholder='Khóa học'
              size='large'
              allowClear
              className='w-full mb-5'
            >
              {data_courses?.map((cl) => (
                <Select.Option key={cl.id} value={cl.id}>
                  {cl.title}
                </Select.Option>
              ))}
            </Select>
            <Radio.Group buttonStyle={'solid'} value={mode} onChange={(e) => setMode(e.target.value)}>
              <Space size={'middle'}>
                <Radio.Button
                  value={1}
                  type='primary'
                  style={{
                    borderRadius: 30,
                    paddingLeft: 25,
                    paddingRight: 25,
                    height: 45,
                    lineHeight: '45px',
                    borderWidth: 1
                  }}
                >
                  Kiểm tra
                </Radio.Button>
                <Radio.Button
                  value={2}
                  type='primary'
                  style={{
                    borderRadius: 30,
                    paddingLeft: 25,
                    paddingRight: 25,
                    height: 45,
                    lineHeight: '45px',
                    borderWidth: 1
                  }}
                >
                  Kết quả
                </Radio.Button>
              </Space>
            </Radio.Group>

            {mode === 1 && (
              <>
                <List
                  itemLayout='horizontal'
                  dataSource={data_exams}
                  renderItem={(item: any, index) => (
                    <List.Item>
                      <Card
                        hoverable
                        style={cardStyle}
                        styles={{
                          body: {
                            padding: 20
                          }
                        }}
                      >
                        <Flex
                          gap={30}
                          style={{
                            borderRadius: 100
                          }}
                        >
                          <div
                            style={
                              {
                                // padding: 20,
                                // paddingBottom: 40,
                                // paddingRight: 30,
                              }
                            }
                          >
                            <Image
                              alt='course'
                              fallback='data:image/png;base64,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'
                              style={{ color: 'transparent' }}
                              src={'error'}
                            />
                          </div>
                          <Flex
                            vertical
                            align='flex-start'
                            justify='space-between'
                            gap={20}
                            style={{
                              flexGrow: 1
                            }}
                          >
                            <Space align='start' direction='vertical' style={{ width: '100%' }}>
                              <Text style={{}}>{formatDateToDDMMYYWithTime(new Date(item.createdAt))}</Text>

                              <Text strong style={{ fontSize: 28 }}>
                                {item.title}
                              </Text>
                            </Space>

                            <Flex align='center' gap={10}>
                              <Avatar size={64} icon={<UserOutlined />} />
                              <Space direction='vertical'>
                                <Text strong>Hằng</Text>
                                <Text>English Teacher</Text>
                              </Space>
                            </Flex>
                          </Flex>
                          <Flex
                            vertical
                            align='flex-start'
                            justify='space-between'
                            gap={20}
                            style={
                              {
                                // padding: 24,
                              }
                            }
                          >
                            <div>
                              <Text style={{}}>
                                <Text strong>{item.totalQuestion}</Text> câu hỏi
                              </Text>
                              <Divider type='vertical' style={{ borderWidth: 1 }} />
                              <Text style={{}}>
                                <Text strong>60</Text> phút
                              </Text>
                            </div>

                            <div
                              style={{
                                background: '#53B748',
                                padding: 5,
                                borderRadius: 10
                              }}
                              onClick={() => navigate(`${item.id}`)}
                            >
                              <Button
                                size='large'
                                target='_blank'
                                style={{
                                  // background: "transparent",
                                  border: 'solid',
                                  // borderWidth: 1,
                                  height: 50,
                                  marginRight: 15,
                                  fontWeight: 600
                                }}
                              >
                                Làm kiểm tra
                              </Button>
                              <svg
                                style={{ marginRight: 10 }}
                                width='29'
                                height='16'
                                viewBox='0 0 29 16'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path
                                  d='M21 15L26.25 9.75L27.2929 8.70711C27.6834 8.31658 27.6834 7.68342 27.2929 7.29289L21 1'
                                  stroke='#1C1C1C'
                                  stroke-width='2'
                                  stroke-linecap='round'
                                />
                                <path d='M21 8L1.75 8' stroke='#1C1C1C' stroke-width='2' stroke-linecap='round' />
                              </svg>
                            </div>
                          </Flex>
                        </Flex>
                      </Card>
                    </List.Item>
                  )}
                />
              </>
            )}
            {mode === 2 && (
              <Space direction='vertical' className='w-full'>
                <Text strong className='text-lg'>
                  Tìm kiếm bài kiếm tra
                </Text>
                <Input
                  size='large'
                  placeholder='Search exam'
                  value={searchExam}
                  onChange={(e) => setSearcExam(e.target.value)}
                />
                <List
                  itemLayout='horizontal'
                  dataSource={filteredData}
                  renderItem={(item: any, index) => (
                    <List.Item>
                      <Card
                        hoverable
                        style={cardStyle}
                        styles={{
                          body: {
                            padding: 20
                          }
                        }}
                      >
                        <Flex gap={30} style={{ borderRadius: 100 }}>
                          <div
                            style={{
                              // padding: 20,
                              // paddingBottom: 40,
                              // paddingRight: 30,
                              flexGrow: 0.2,
                              flexDirection: 'column',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center'
                            }}
                          >
                            {/* <img
                            alt="avatar"
                            src="/image/preview.png"
                            //   style={imgStyle}
                          /> */}
                            <Title level={2}>{item.score}</Title>
                            <Text>Điểm</Text>
                          </div>
                          <Flex
                            vertical
                            align='flex-start'
                            justify='space-between'
                            gap={20}
                            style={{
                              flexGrow: 1
                            }}
                          >
                            <Space align='start' direction='vertical' style={{ width: '100%' }}>
                              <Text style={{}}>Ngày 21 tháng 2, 2024</Text>

                              <Text strong style={{ fontSize: 28 }}>
                                {item.exam.title}
                              </Text>
                            </Space>

                            <Flex align='center' gap={10}>
                              <Avatar size={64} icon={<UserOutlined />} />
                              <Space direction='vertical'>
                                <Text strong>{item.center?.name}</Text>
                                <Text>English Teacher</Text>
                              </Space>
                            </Flex>
                          </Flex>
                          <Flex
                            vertical
                            align='flex-start'
                            justify='space-between'
                            gap={20}
                            style={
                              {
                                // padding: 24,
                              }
                            }
                          >
                            <Space direction='vertical'>
                              <div>
                                <Text style={{}}>
                                  <Text strong>{item.exam.totalQuestion}</Text> câu hỏi
                                </Text>
                                <Divider type='vertical' style={{ borderWidth: 1 }} />
                                <Text style={{}}>
                                  <Text strong>60</Text> phút
                                </Text>
                              </div>
                              <Space>
                                <Space
                                  style={{
                                    background: '#3FB335',
                                    padding: 5,
                                    borderRadius: 5,
                                    color: 'white',
                                    width: 60
                                  }}
                                >
                                  <CheckSquareOutlined style={{ fontSize: '16px', color: 'white' }} />
                                  42
                                </Space>
                                <Space
                                  style={{
                                    background: '#EF5B59',
                                    padding: 5,
                                    borderRadius: 5,
                                    color: 'white',
                                    width: 60
                                  }}
                                >
                                  <CheckSquareOutlined style={{ fontSize: '16px', color: 'white' }} />8
                                </Space>
                              </Space>
                            </Space>

                            <Space
                              style={{
                                color: '#53B748',
                                padding: 5,
                                borderRadius: 10
                              }}
                            >
                              <CloudDownloadOutlined />
                              Tải đáp án
                            </Space>
                          </Flex>
                        </Flex>
                      </Card>
                    </List.Item>
                  )}
                />
              </Space>
            )}
          </Space>
        </div>
      </ConfigProvider>
    </div>
  )
}

export default ViewExamPage
