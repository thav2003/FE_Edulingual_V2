import React, { useEffect, useState } from 'react'
import { DeleteOutlined, EyeOutlined, InfoCircleFilled } from '@ant-design/icons'
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
  Input,
  Flex,
  Modal
} from 'antd'
import type { FormProps } from 'antd'
import axios from 'axios'
import { useAppStore, useAuthStore } from '~/stores'
import { ExamApi, UserApi } from '~/api'
import useFetchData from '~/hooks/useFetch'
import { formatDateToDDMMYYWithTime } from '~/utils/dateUtils'
import { useNavigate } from 'react-router-dom'
import step1 from '../../assets/images/step-1.png'
import step2 from '../../assets/images/step-2.png'
import step3 from '../../assets/images/step-3.png'
import step4 from '../../assets/images/step-4.png'
const { Dragger } = Upload
const { Text } = Typography

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
const userApi = new UserApi()
const examApi = new ExamApi()
const CreateExamPage: React.FC = () => {
  const { notification } = App.useApp()
  const navigate = useNavigate()
  const userId = useAuthStore((state) => state.user?.id)
  const [defaultFileList, setDefaultFileList] = useState([])
  const [progress, setProgress] = useState(0)
  const [selectedCourseId, setSelectedCourseId] = useState<string | undefined>(undefined)
  const refetchApp = useAppStore((state) => state.refetchApp)
  const [searchExam, setSearcExam] = useState('')
  const [dataExam, setDataExam] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [open, setOpen] = useState(false)

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
          `https://localhost:44315/api/v1/exam/upload?teacherId=${userId}&courseId=${selectedCourseId}`,
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
        console.log('Error: ', err)
        const error = new Error('Some error')
        notification.error({ message: err?.response?.data?.Error || 'Tạo thất bại' })
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
    return userApi.apiV1TrungTamIdKhoaHocGet(userId!)
  }
  const [loadingCourses, errorCourses, responseCourses] = useFetchData(fetchCourses)
  const data_courses = responseCourses?.data?.data.items as Course[]
  console.log(responseCourses)
  const fetchExams = () => {
    if (selectedCourseId) return examApi.apiV1ExamCourseIdIdGet(selectedCourseId, '', 1, 10000)
    else return Promise.resolve()
  }
  const [loadingExams, errorExams, responseExams] = useFetchData(fetchExams, selectedCourseId)

  const data_exams = responseExams?.data?.data?.items
  const total_exams = responseExams?.data?.totalCount

  console.log(data_exams)

  const handleDelete = async (id: string) => {
    console.log(id)
    try {
      await examApi.apiV1ExamIdDelete(id)
      notification.info({ message: 'Xóa thành công' })
      refetchApp()
    } catch (e) {
      notification.error({ message: 'Sorry! Something went wrong. App server error' })
    }
  }
  const columns = [
    {
      title: 'STT',
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
      dataIndex: 'totalQuestion',
      key: 'totalQuestion'
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (item, record, index) => <Typography.Text>{formatDateToDDMMYYWithTime(new Date(item))}</Typography.Text>
    },
    {
      title: 'Hành động',
      key: 'actions',
      // dataIndex: 'isDone',
      render: (_, { id }) => (
        <Space>
          <Button onClick={() => navigate(`${id}`)} icon={<EyeOutlined />}></Button>
          <Button danger type='primary' onClick={() => handleDelete(id)} icon={<DeleteOutlined />} />
        </Space>
      )
    }
  ]
  useEffect(() => {
    if (dataExam) {
      const filteredResults = dataExam.filter((result) =>
        result?.title?.toLowerCase().includes(searchExam.toLowerCase())
      )
      setFilteredData(filteredResults)
    }
  }, [searchExam, dataExam])

  useEffect(() => {
    if (data_exams) {
      setDataExam(data_exams)
      setFilteredData(data_exams)
    }
  }, [data_exams])
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
          <Space className='w-full' direction='vertical'>
            <Modal
              className='my-7'
              bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 150px)' }}
              title='Tạo đề thi từ File XLS (Excel)'
              open={open}
              onOk={() => setOpen(false)}
              onCancel={() => setOpen(false)}
              width={850}
              centered
              footer={null}
            >
              <div className='flex flex-col p-3'>
                <Text style={{ color: '#6b707f', marginBottom: '20px', fontSize: '16px' }}>
                  Bước 1: Tại “Tạo bộ đề”, chọn khóa học để tạo bài kiểm tra
                </Text>
                <img src={step1} alt='hero image' />
                <Text style={{ color: '#6b707f', margin: '20px 0px', fontSize: '16px' }}>
                  Bước 2: Mẫu bài kiểm tra phải theo định dạng như sau (Lưu ý: Tổng số điểm các câu phải bằng 10)
                </Text>
                <img src={step2} alt='hero image' />
                <Text style={{ color: '#6b707f', margin: '20px 0px', fontSize: '16px' }}>
                  Bước 3: Click chuột vào ô “Chọn tài liệu Hoặc kéo và thả tập tin vào đây” để tải lên File đề Excel
                </Text>
                <img src={step3} alt='hero image' />
                <Text style={{ color: '#6b707f', margin: '20px 0px', fontSize: '16px' }}>
                  Bước 4: Kiểm tra lại toàn bộ đề
                </Text>
                <img src={step4} alt='hero image' />
              </div>
            </Modal>
            <div>
              <div className='flex items-center justify-between'>
                <Typography.Title level={3}>Chuyển đổi tài liệu sang bộ đề trực tuyến</Typography.Title>
                <Button
                  className='self-end mb-1'
                  style={{ paddingRight: '0' }}
                  size='large'
                  type='link'
                  onClick={() => setOpen(true)}
                >
                  <span className='text-base flex items-center'>
                    Hướng dẫn sử dụng <InfoCircleFilled />
                  </span>
                </Button>
              </div>

              <Select
                value={selectedCourseId}
                onChange={setSelectedCourseId}
                placeholder='Chọn khóa học để tạo bài kiểm tra'
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

              <Dragger {...props}>
                <Button type='primary' size='large'>
                  Chọn tài liệu
                </Button>
                <p className='ant-upload-text'>Hoặc kéo và thả tập tin vào đây</p>
                <p className='ant-upload-hint'>Các định dạng được hỗ trợ: XLS (Excel)</p>

                {progress > 0 ? <Progress percent={progress} /> : null}
              </Dragger>
            </div>

            <div>
              {selectedCourseId && (
                <Space className='w-full' direction='vertical'>
                  <Flex align='center' justify='space-between' gap={20} wrap>
                    <Text strong>{total_exams} bài kiểm tra</Text>
                    <Flex align='center' gap={20}>
                      <Input.Search
                        placeholder='Search exam'
                        value={searchExam}
                        onChange={(e) => setSearcExam(e.target.value)}
                      />
                    </Flex>
                  </Flex>
                  <Table
                    pagination={{
                      position: ['bottomCenter'],
                      pageSize: 5
                    }}
                    columns={columns}
                    dataSource={filteredData}
                  />
                </Space>
              )}
            </div>
          </Space>
        </div>
      </ConfigProvider>
    </div>
  )
}

export default CreateExamPage
