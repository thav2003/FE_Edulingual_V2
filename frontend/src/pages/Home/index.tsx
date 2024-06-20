import {
  Avatar,
  Button,
  Card,
  ConfigProvider,
  Flex,
  Collapse,
  List,
  Select,
  Skeleton,
  Space,
  Tag,
  Typography,
  Carousel
} from 'antd'
import {
  EyeFilled,
  HeartFilled,
  HeartOutlined,
  MinusOutlined,
  PlusOutlined,
  SearchOutlined,
  StarFilled,
  UserOutlined
} from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { formatCurrencyVND } from '~/utils/numberUtils'
import { CourseApi, CourseAreaApi, CourseCategoryApi, CourseLanguageApi } from '~/api'
import useFetchData from '~/hooks/useFetch'
const { Title, Text } = Typography
const { Option } = Select
const { Meta } = Card

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
    imageUrl: string
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
}
interface CourseCategory {
  language: string | null
  name: string
  status: number
  id: string
  createdAt: string
  updatedAt: string
  createdBy: string | null
  updatedBy: string | null
  isDeleted: boolean
}

interface CourseLanguage {
  name: string
  status: number
  id: string
  createdAt: string
  updatedAt: string
  createdBy: string | null
  updatedBy: string | null
  isDeleted: boolean
}

interface CourseArea {
  name: string
  status: number
  id: string
  createdAt: string
  updatedAt: string
  createdBy: string | null
  updatedBy: string | null
  isDeleted: boolean
}

interface CourseArea {
  name: string
  status: number
  id: string
  createdAt: string
  updatedAt: string
  createdBy: string | null
  updatedBy: string | null
  isDeleted: boolean
}

const text = (
  <p style={{ paddingLeft: 24 }}>
    A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest
    in many households across the world.
  </p>
)
const courseLanguageApi = new CourseLanguageApi()
const courseCategoryApi = new CourseCategoryApi()
const courseAreaApi = new CourseAreaApi()
const courseApi = new CourseApi()
const HomePage: React.FC = () => {
  const [selectedArea, setSelectedArea] = useState<string | undefined>(undefined)
  const [selectedLanguage, setSelectedLanguage] = useState<string | undefined>(undefined)
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined)
  const navigate = useNavigate()

  const fetchCourseLanguage = () => {
    return courseLanguageApi.apiV1NgonNguGet(1, 10000)
  }
  const [loadingCourseLanguage, errorCourseLanguage, responseCourseLanguage] = useFetchData(fetchCourseLanguage)

  const data_courseLanguage = responseCourseLanguage?.data?.data?.items as CourseLanguage[]

  const fetchCourseCategory = () => {
    return courseCategoryApi.apiV1LoaiKhoaHocGet(1, 10000)
  }
  const [loadingCourseCategory, errorCourseCategory, responseCourseCategory] = useFetchData(fetchCourseCategory)

  const data_courseCategory = responseCourseCategory?.data?.data?.items as CourseCategory[]

  const fetchCourseArea = () => {
    return courseAreaApi.apiV1KhuVucGet(1, 10000)
  }
  const [loadingCourseArea, errorCourseArea, responseCourseArea] = useFetchData(fetchCourseArea)

  const data_courseArea = responseCourseArea?.data?.data?.items as CourseArea[]

  const fetchCourses = () => {
    return courseApi.apiV1KhoaHocNoiBatGet()
  }
  const [loadingCourses, errorCourses, responseCourses] = useFetchData(fetchCourses)
  const data_courses = responseCourses?.data?.data as Course[]
  return (
    <div>
      <div className='bg-home relative overflow-hidden rounded-lg bg-cover bg-no-repeat p-12 text-center h-[400px]'>
        <div
          className='absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed'
          // style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
        >
          <div className='flex h-full items-center justify-center'>
            <Flex vertical gap={20}>
              <Title className='!mb-0'>
                Tìm kiếm người hướng dẫn <Title className='!text-[#3752EB] !mb-0'>đồng hành cùng bạn</Title>
              </Title>
              <Text>Xây dựng một trang web cho cộng đồng, hoạt động học tập và khóa học của bạn.</Text>
              <ConfigProvider
                theme={{
                  components: {
                    Select: {
                      colorBorder: 'none',
                      controlOutlineWidth: 0
                    }
                  }
                }}
              >
                <Flex justify='space-between' wrap className='bg-[#FFFFFF] p-2 rounded-lg'>
                  <Select
                    size='large'
                    className='!text-left'
                    allowClear
                    placeholder={
                      <Space>
                        <Text strong>
                          <SearchOutlined />
                        </Text>

                        <Text strong>Ngôn ngữ</Text>
                      </Space>
                    }
                    style={{ width: 150, height: 60 }}
                    value={selectedLanguage}
                    onChange={setSelectedLanguage}
                  >
                    {data_courseLanguage?.map((cl) => (
                      <Option key={cl.id} value={cl.id}>
                        {cl.name}
                      </Option>
                    ))}
                  </Select>

                  <Select
                    size='large'
                    className='!text-left'
                    allowClear
                    placeholder={
                      <Space>
                        <Text strong>
                          <svg
                            className='inline'
                            width='20'
                            height='20'
                            viewBox='0 0 25 24'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M12.5 21C16 17.4 19.5 14.1764 19.5 10.2C19.5 6.22355 16.366 3 12.5 3C8.63401 3 5.5 6.22355 5.5 10.2C5.5 14.1764 9 17.4 12.5 21Z'
                              stroke='#171618'
                              strokeWidth='2'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                            <path
                              d='M12.5 13C14.1569 13 15.5 11.6569 15.5 10C15.5 8.34315 14.1569 7 12.5 7C10.8431 7 9.5 8.34315 9.5 10C9.5 11.6569 10.8431 13 12.5 13Z'
                              stroke='#171618'
                              strokeWidth='2'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                          </svg>
                        </Text>

                        <Text strong>Địa điểm</Text>
                      </Space>
                    }
                    style={{ width: 200, height: 60 }}
                    value={selectedArea}
                    onChange={setSelectedArea}
                  >
                    {data_courseArea?.map((cl) => (
                      <Option key={cl.id} value={cl.id}>
                        {cl.name}
                      </Option>
                    ))}
                  </Select>
                  <Select
                    size='large'
                    className='!text-left'
                    allowClear
                    placeholder={
                      <Space>
                        <Text strong>
                          <SearchOutlined />
                        </Text>

                        <Text strong>Loại khóa học</Text>
                      </Space>
                    }
                    style={{ width: 200, height: 60 }}
                    value={selectedCategory}
                    onChange={setSelectedCategory}
                  >
                    {data_courseCategory?.map((cl) => (
                      <Option key={cl.id} value={cl.id}>
                        {cl.name}
                      </Option>
                    ))}
                  </Select>
                  <Button
                    type='primary'
                    className='h-[60px]'
                    onClick={() => {
                      const queryParams = new URLSearchParams()
                      if (selectedArea) {
                        queryParams.set('area', selectedArea)
                      }
                      if (selectedLanguage) {
                        queryParams.set('language', selectedLanguage)
                      }
                      if (selectedCategory) {
                        queryParams.set('category', selectedCategory)
                      }
                      navigate(`/courses?${queryParams.toString()}`)
                    }}
                  >
                    Tìm kiếm
                  </Button>
                </Flex>
              </ConfigProvider>
            </Flex>
          </div>
        </div>
      </div>
      <div className='py-10 px-12 lg:px-20 bg-[#FFFFFF]'>
        <Space direction='vertical' className='w-full' size={'large'}>
          <div className='text-center'>
            <Title>
              Những khoá học <span className='!text-primary'>nổi bật</span>
            </Title>
          </div>

          <div>
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 1,
                md: 2,
                lg: 3,
                xl: 3,
                xxl: 3
              }}
              loading={loadingCourses}
              dataSource={data_courses}
              renderItem={(item) => (
                <List.Item>
                  <Skeleton avatar loading={false} title={false} active>
                    <Card
                      hoverable
                      className='!bg-[#F7F7F7]'
                      onClick={() => navigate(`/courses/course-detail/${item.id}`)}
                    >
                      <Meta
                        avatar={<Avatar shape='square' src={item.center.imageUrl} size={128} />}
                        title={
                          <div className='flex flex-col'>
                            <Text>{item.title}</Text>
                            <Space>
                              <Space align='center'>
                                <Text>
                                  <svg
                                    className='flex'
                                    width='15'
                                    height='11'
                                    viewBox='0 0 15 11'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                  >
                                    <path
                                      d='M1.23145 3.30347L7.80082 0.678467L14.3702 3.30347L7.80082 5.92847L1.23145 3.30347Z'
                                      fill='black'
                                      stroke='black'
                                      stroke-width='1.25'
                                      stroke-linejoin='round'
                                    />
                                    <path
                                      d='M14.3703 3.33783V6.22002M4.21777 4.68627V8.57439C4.21777 8.57439 5.7209 10.0535 7.8009 10.0535C9.88121 10.0535 11.3843 8.57439 11.3843 8.57439V4.68627'
                                      stroke='black'
                                      stroke-width='1.25'
                                      stroke-linecap='round'
                                      stroke-linejoin='round'
                                    />
                                  </svg>
                                </Text>
                                <Text className='font-normal'>{item.courseCategory.name}</Text>
                              </Space>
                              <Space align='center'>
                                <Text>
                                  <svg
                                    className='flex'
                                    width='16'
                                    height='16'
                                    viewBox='0 0 16 16'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                  >
                                    <path
                                      d='M8.10645 2.11597C11.5583 2.11597 14.3564 4.91409 14.3564 8.36597C14.3564 11.8178 11.5583 14.616 8.10645 14.616C4.65457 14.616 1.85645 11.8178 1.85645 8.36597C1.85645 4.91409 4.65457 2.11597 8.10645 2.11597ZM8.10645 3.36597C6.78036 3.36597 5.50859 3.89275 4.57091 4.83043C3.63323 5.76811 3.10645 7.03988 3.10645 8.36597C3.10645 9.69205 3.63323 10.9638 4.57091 11.9015C5.50859 12.8392 6.78036 13.366 8.10645 13.366C9.43253 13.366 10.7043 12.8392 11.642 11.9015C12.5797 10.9638 13.1064 9.69205 13.1064 8.36597C13.1064 7.03988 12.5797 5.76811 11.642 4.83043C10.7043 3.89275 9.43253 3.36597 8.10645 3.36597ZM8.10645 4.61597C8.25953 4.61599 8.40728 4.67219 8.52168 4.77391C8.63608 4.87564 8.70916 5.01581 8.72707 5.16784L8.73145 5.24097V8.10722L10.4233 9.79909C10.5354 9.91157 10.6005 10.0625 10.6053 10.2212C10.6102 10.3799 10.5544 10.5345 10.4494 10.6536C10.3444 10.7727 10.198 10.8474 10.0399 10.8625C9.88182 10.8775 9.72394 10.8318 9.59832 10.7347L9.53957 10.6828L7.66457 8.80784C7.56743 8.71062 7.50505 8.58409 7.48707 8.44784L7.48145 8.36597V5.24097C7.48145 5.07521 7.54729 4.91624 7.6645 4.79903C7.78171 4.68181 7.94068 4.61597 8.10645 4.61597Z'
                                      fill='black'
                                    />
                                  </svg>
                                </Text>
                                <Text className='font-normal'>{item.duration}</Text>
                              </Space>
                            </Space>

                            <Text className='font-normal'>{item.center.fullName}</Text>
                            <Text strong className='font-normal'>
                              {formatCurrencyVND(item.tuitionfee)}
                            </Text>
                          </div>
                        }
                        description={
                          <Space size={'large'}>
                            <div>
                              <StarFilled /> 4.9
                            </div>
                            <div>
                              <EyeFilled />
                              4,090 Theo dõi
                            </div>
                          </Space>
                        }
                      />
                      <Flex align='center' justify='space-between' className='mt-7'>
                        <Tag color='#FFFFFF' className='px-2 py-1'>
                          <Space align='center'>
                            <Text>
                              <svg
                                className='flex'
                                width='21'
                                height='19'
                                viewBox='0 0 21 19'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path
                                  d='M14.5626 15.4551C14.9955 15.2657 15.4134 15.0437 15.8126 14.791V17.8301C15.8126 17.9958 15.7468 18.1548 15.6295 18.272C15.5123 18.3892 15.3534 18.4551 15.1876 18.4551C15.0218 18.4551 14.8629 18.3892 14.7457 18.272C14.6284 18.1548 14.5626 17.9958 14.5626 17.8301V15.4551ZM9.94541 6.28319C9.86971 6.43088 9.85428 6.60219 9.90237 6.76103C9.95046 6.91987 10.0583 7.05385 10.2032 7.13475L13.8595 9.08007L15.1876 8.36913L10.797 6.02538C10.6493 5.94968 10.478 5.93425 10.3191 5.98234C10.1603 6.03043 10.0263 6.13828 9.94541 6.28319ZM20.172 6.02538L10.797 1.02538C10.7048 0.979307 10.6032 0.955322 10.5001 0.955322C10.397 0.955322 10.2954 0.979307 10.2032 1.02538L0.828225 6.02538C0.72884 6.07995 0.645944 6.16022 0.588203 6.2578C0.530463 6.35538 0.5 6.46668 0.5 6.58007C0.5 6.69345 0.530463 6.80475 0.588203 6.90233C0.645944 6.99991 0.72884 7.08018 0.828225 7.13475L2.6876 8.11913V12.0098C2.68642 12.278 2.77436 12.5391 2.9376 12.7519C3.55479 13.5801 5.92979 16.2676 10.5001 16.2676C11.8965 16.2792 13.2801 15.9998 14.5626 15.4473V9.45507L13.8595 9.08007L10.5001 10.8691L3.60948 7.19725L2.45323 6.58007L10.5001 2.291L18.547 6.58007L17.3907 7.19725L15.1876 8.36913L15.4845 8.52538C15.5902 8.5864 15.6767 8.67568 15.7345 8.78319C15.7864 8.87345 15.8134 8.97592 15.8126 9.08007V14.791C16.6759 14.2479 17.4374 13.5578 18.0626 12.7519C18.2258 12.5391 18.3138 12.278 18.3126 12.0098V8.11913L20.172 7.13475C20.2714 7.08018 20.3543 6.99991 20.412 6.90233C20.4697 6.80475 20.5002 6.69345 20.5002 6.58007C20.5002 6.46668 20.4697 6.35538 20.412 6.2578C20.3543 6.16022 20.2714 6.07995 20.172 6.02538Z'
                                  fill='#1C1C1C'
                                />
                              </svg>
                            </Text>
                            <Text className='font-normal'>{item.courseLanguage.name}</Text>
                          </Space>
                        </Tag>
                        <Space align='center'>
                          <Text strong>
                            <svg
                              className='flex'
                              width='20'
                              height='20'
                              viewBox='0 0 25 24'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M12.5 21C16 17.4 19.5 14.1764 19.5 10.2C19.5 6.22355 16.366 3 12.5 3C8.63401 3 5.5 6.22355 5.5 10.2C5.5 14.1764 9 17.4 12.5 21Z'
                                stroke='#171618'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              />
                              <path
                                d='M12.5 13C14.1569 13 15.5 11.6569 15.5 10C15.5 8.34315 14.1569 7 12.5 7C10.8431 7 9.5 8.34315 9.5 10C9.5 11.6569 10.8431 13 12.5 13Z'
                                stroke='#171618'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              />
                            </svg>
                          </Text>
                          <Text>{item.courseArea.name}</Text>
                        </Space>
                      </Flex>
                    </Card>
                  </Skeleton>
                </List.Item>
              )}
            />
          </div>
        </Space>
      </div>

      <div className='py-10 px-12 lg:px-20 bg-[#FFFFFF]'>
        <Space direction='vertical' className='w-full' size={'large'}>
          <div className='text-center'>
            <Title>
              Đa dạng <span className='!text-primary'>ngôn ngữ</span>
            </Title>
          </div>
          <Flex align='center' justify='center'>
            <Flex align='center' justify='space-between' gap={20}>
              <Card className='!bg-[#F7F7F7]'>
                <Flex align='center' vertical>
                  <img src='/Group3.svg' />
                  <Text strong>English</Text>
                  <Text className='text-primary'>134,235 Kết quả</Text>
                </Flex>
              </Card>
              <Card className='!bg-[#F7F7F7]'>
                <Flex align='center' vertical>
                  <img src='/Group5.svg' />
                  <Text strong>Chinese</Text>
                  <Text className='text-primary'>134,235 Kết quả</Text>
                </Flex>
              </Card>
              <Card className='!bg-[#F7F7F7]'>
                <Flex align='center' vertical>
                  <img src='/Group4.svg' />
                  <Text strong>Japanese</Text>
                  <Text className='text-primary'>134,235 Kết quả</Text>
                </Flex>
              </Card>
              <Card className='!bg-[#F7F7F7]'>
                <Flex align='center' vertical>
                  <img src='/Group2751.svg' />
                  <Text strong>Korean</Text>
                  <Text className='text-primary'>134,235 Kết quả</Text>
                </Flex>
              </Card>
              <Card className='!bg-[#F7F7F7]'>
                <Flex align='center' vertical>
                  <img src='/Group6.svg' />
                  <Text strong>French</Text>
                  <Text className='text-primary'>134,235 Kết quả</Text>
                </Flex>
              </Card>
            </Flex>
          </Flex>
        </Space>
      </div>
      <div className='py-10 px-12 lg:px-20 bg-[#FFFFFF]'>
        <Space direction='vertical' className='w-full' size={'large'}>
          <div className='text-center'>
            <Title>
              Giáo viên <span className='!text-primary'>được đánh giá cao</span>
            </Title>
          </div>
          <Card hoverable className='p-5 py-10 rounded-3xl'>
            <ConfigProvider
              theme={{
                token: {
                  colorBgContainer: 'black',
                  marginXXS: 10
                },
                components: {
                  Carousel: {
                    dotOffset: -36
                  }
                }
              }}
            >
              <Carousel slidesToShow={3}>
                <div className='mr-[20px] pr-[20px]'>
                  <Card className='!bg-[#FFFFFF]'>
                    <Meta
                      avatar={
                        <Avatar
                          shape='square'
                          className='!h-40'
                          src='https://randomuser.me/api/portraits/med/men/57.jpg'
                          size={128}
                        />
                      }
                      title={
                        <div className='flex flex-col'>
                          <Flex align='center' justify='space-between'>
                            <Text>{`Bangera Pranit`}</Text>
                            <Space>
                              <Text>
                                <svg
                                  className='inline'
                                  width='21'
                                  height='19'
                                  viewBox='0 0 21 19'
                                  fill='none'
                                  xmlns='http://www.w3.org/2000/svg'
                                >
                                  <path
                                    d='M14.5626 15.4551C14.9955 15.2657 15.4134 15.0437 15.8126 14.791V17.8301C15.8126 17.9958 15.7468 18.1548 15.6295 18.272C15.5123 18.3892 15.3534 18.4551 15.1876 18.4551C15.0218 18.4551 14.8629 18.3892 14.7457 18.272C14.6284 18.1548 14.5626 17.9958 14.5626 17.8301V15.4551ZM9.94541 6.28319C9.86971 6.43088 9.85428 6.60219 9.90237 6.76103C9.95046 6.91987 10.0583 7.05385 10.2032 7.13475L13.8595 9.08007L15.1876 8.36913L10.797 6.02538C10.6493 5.94968 10.478 5.93425 10.3191 5.98234C10.1603 6.03043 10.0263 6.13828 9.94541 6.28319ZM20.172 6.02538L10.797 1.02538C10.7048 0.979307 10.6032 0.955322 10.5001 0.955322C10.397 0.955322 10.2954 0.979307 10.2032 1.02538L0.828225 6.02538C0.72884 6.07995 0.645944 6.16022 0.588203 6.2578C0.530463 6.35538 0.5 6.46668 0.5 6.58007C0.5 6.69345 0.530463 6.80475 0.588203 6.90233C0.645944 6.99991 0.72884 7.08018 0.828225 7.13475L2.6876 8.11913V12.0098C2.68642 12.278 2.77436 12.5391 2.9376 12.7519C3.55479 13.5801 5.92979 16.2676 10.5001 16.2676C11.8965 16.2792 13.2801 15.9998 14.5626 15.4473V9.45507L13.8595 9.08007L10.5001 10.8691L3.60948 7.19725L2.45323 6.58007L10.5001 2.291L18.547 6.58007L17.3907 7.19725L15.1876 8.36913L15.4845 8.52538C15.5902 8.5864 15.6767 8.67568 15.7345 8.78319C15.7864 8.87345 15.8134 8.97592 15.8126 9.08007V14.791C16.6759 14.2479 17.4374 13.5578 18.0626 12.7519C18.2258 12.5391 18.3138 12.278 18.3126 12.0098V8.11913L20.172 7.13475C20.2714 7.08018 20.3543 6.99991 20.412 6.90233C20.4697 6.80475 20.5002 6.69345 20.5002 6.58007C20.5002 6.46668 20.4697 6.35538 20.412 6.2578C20.3543 6.16022 20.2714 6.07995 20.172 6.02538Z'
                                    fill='#1C1C1C'
                                  />
                                </svg>
                              </Text>
                              <Text className='font-normal'>English</Text>
                            </Space>
                          </Flex>

                          <Text>
                            Kinh nghiệm: <Text className='font-normal'>6 năm</Text>
                          </Text>
                          <Text>
                            Khoa học: <Text className='font-normal'>Khóa học IELTS 6.0</Text>
                          </Text>
                          <Text>
                            Học phí: <Text className='font-normal'>10 Triệu VND</Text>
                          </Text>
                        </div>
                      }
                      description={
                        <Space size={'large'}>
                          <div>
                            <StarFilled /> 4.9
                          </div>
                          <div>
                            <EyeFilled />
                            4,090 Theo dõi
                          </div>
                        </Space>
                      }
                    />
                    <Flex align='center' justify='flex-start'>
                      <Text className='mt-7'>
                        Mỗi từ bạn học là một bước gần hơn đến khả năng nói trôi chảy. Chấp nhận thử thách, tôn vinh sự
                        tiến bộ và đừng bao giờ đánh giá thấp sức mạnh của nỗ lực nhất quán.
                      </Text>
                    </Flex>
                  </Card>
                </div>
                <div className='mr-[20px] pr-[20px]'>
                  <Card className='!bg-[#FFFFFF]'>
                    <Meta
                      avatar={
                        <Avatar
                          shape='square'
                          className='!h-40'
                          src='https://randomuser.me/api/portraits/med/men/57.jpg'
                          size={128}
                        />
                      }
                      title={
                        <div className='flex flex-col'>
                          <Flex align='center' justify='space-between'>
                            <Text>{`Bangera Pranit`}</Text>
                            <Space>
                              <Text>
                                <svg
                                  className='inline'
                                  width='21'
                                  height='19'
                                  viewBox='0 0 21 19'
                                  fill='none'
                                  xmlns='http://www.w3.org/2000/svg'
                                >
                                  <path
                                    d='M14.5626 15.4551C14.9955 15.2657 15.4134 15.0437 15.8126 14.791V17.8301C15.8126 17.9958 15.7468 18.1548 15.6295 18.272C15.5123 18.3892 15.3534 18.4551 15.1876 18.4551C15.0218 18.4551 14.8629 18.3892 14.7457 18.272C14.6284 18.1548 14.5626 17.9958 14.5626 17.8301V15.4551ZM9.94541 6.28319C9.86971 6.43088 9.85428 6.60219 9.90237 6.76103C9.95046 6.91987 10.0583 7.05385 10.2032 7.13475L13.8595 9.08007L15.1876 8.36913L10.797 6.02538C10.6493 5.94968 10.478 5.93425 10.3191 5.98234C10.1603 6.03043 10.0263 6.13828 9.94541 6.28319ZM20.172 6.02538L10.797 1.02538C10.7048 0.979307 10.6032 0.955322 10.5001 0.955322C10.397 0.955322 10.2954 0.979307 10.2032 1.02538L0.828225 6.02538C0.72884 6.07995 0.645944 6.16022 0.588203 6.2578C0.530463 6.35538 0.5 6.46668 0.5 6.58007C0.5 6.69345 0.530463 6.80475 0.588203 6.90233C0.645944 6.99991 0.72884 7.08018 0.828225 7.13475L2.6876 8.11913V12.0098C2.68642 12.278 2.77436 12.5391 2.9376 12.7519C3.55479 13.5801 5.92979 16.2676 10.5001 16.2676C11.8965 16.2792 13.2801 15.9998 14.5626 15.4473V9.45507L13.8595 9.08007L10.5001 10.8691L3.60948 7.19725L2.45323 6.58007L10.5001 2.291L18.547 6.58007L17.3907 7.19725L15.1876 8.36913L15.4845 8.52538C15.5902 8.5864 15.6767 8.67568 15.7345 8.78319C15.7864 8.87345 15.8134 8.97592 15.8126 9.08007V14.791C16.6759 14.2479 17.4374 13.5578 18.0626 12.7519C18.2258 12.5391 18.3138 12.278 18.3126 12.0098V8.11913L20.172 7.13475C20.2714 7.08018 20.3543 6.99991 20.412 6.90233C20.4697 6.80475 20.5002 6.69345 20.5002 6.58007C20.5002 6.46668 20.4697 6.35538 20.412 6.2578C20.3543 6.16022 20.2714 6.07995 20.172 6.02538Z'
                                    fill='#1C1C1C'
                                  />
                                </svg>
                              </Text>
                              <Text className='font-normal'>English</Text>
                            </Space>
                          </Flex>

                          <Text>
                            Kinh nghiệm: <Text className='font-normal'>6 năm</Text>
                          </Text>
                          <Text>
                            Khoa học: <Text className='font-normal'>Khóa học IELTS 6.0</Text>
                          </Text>
                          <Text>
                            Học phí: <Text className='font-normal'>10 Triệu VND</Text>
                          </Text>
                        </div>
                      }
                      description={
                        <Space size={'large'}>
                          <div>
                            <StarFilled /> 4.9
                          </div>
                          <div>
                            <EyeFilled />
                            4,090 Theo dõi
                          </div>
                        </Space>
                      }
                    />
                    <Flex align='center' justify='flex-start'>
                      <Text className='mt-7'>
                        Mỗi từ bạn học là một bước gần hơn đến khả năng nói trôi chảy. Chấp nhận thử thách, tôn vinh sự
                        tiến bộ và đừng bao giờ đánh giá thấp sức mạnh của nỗ lực nhất quán.
                      </Text>
                    </Flex>
                  </Card>
                </div>
                <div className='mr-[20px] pr-[20px]'>
                  <Card className='!bg-[#FFFFFF]'>
                    <Meta
                      avatar={
                        <Avatar
                          shape='square'
                          className='!h-40'
                          src='https://randomuser.me/api/portraits/med/men/57.jpg'
                          size={128}
                        />
                      }
                      title={
                        <div className='flex flex-col'>
                          <Flex align='center' justify='space-between'>
                            <Text>{`Bangera Pranit`}</Text>
                            <Space>
                              <Text>
                                <svg
                                  className='inline'
                                  width='21'
                                  height='19'
                                  viewBox='0 0 21 19'
                                  fill='none'
                                  xmlns='http://www.w3.org/2000/svg'
                                >
                                  <path
                                    d='M14.5626 15.4551C14.9955 15.2657 15.4134 15.0437 15.8126 14.791V17.8301C15.8126 17.9958 15.7468 18.1548 15.6295 18.272C15.5123 18.3892 15.3534 18.4551 15.1876 18.4551C15.0218 18.4551 14.8629 18.3892 14.7457 18.272C14.6284 18.1548 14.5626 17.9958 14.5626 17.8301V15.4551ZM9.94541 6.28319C9.86971 6.43088 9.85428 6.60219 9.90237 6.76103C9.95046 6.91987 10.0583 7.05385 10.2032 7.13475L13.8595 9.08007L15.1876 8.36913L10.797 6.02538C10.6493 5.94968 10.478 5.93425 10.3191 5.98234C10.1603 6.03043 10.0263 6.13828 9.94541 6.28319ZM20.172 6.02538L10.797 1.02538C10.7048 0.979307 10.6032 0.955322 10.5001 0.955322C10.397 0.955322 10.2954 0.979307 10.2032 1.02538L0.828225 6.02538C0.72884 6.07995 0.645944 6.16022 0.588203 6.2578C0.530463 6.35538 0.5 6.46668 0.5 6.58007C0.5 6.69345 0.530463 6.80475 0.588203 6.90233C0.645944 6.99991 0.72884 7.08018 0.828225 7.13475L2.6876 8.11913V12.0098C2.68642 12.278 2.77436 12.5391 2.9376 12.7519C3.55479 13.5801 5.92979 16.2676 10.5001 16.2676C11.8965 16.2792 13.2801 15.9998 14.5626 15.4473V9.45507L13.8595 9.08007L10.5001 10.8691L3.60948 7.19725L2.45323 6.58007L10.5001 2.291L18.547 6.58007L17.3907 7.19725L15.1876 8.36913L15.4845 8.52538C15.5902 8.5864 15.6767 8.67568 15.7345 8.78319C15.7864 8.87345 15.8134 8.97592 15.8126 9.08007V14.791C16.6759 14.2479 17.4374 13.5578 18.0626 12.7519C18.2258 12.5391 18.3138 12.278 18.3126 12.0098V8.11913L20.172 7.13475C20.2714 7.08018 20.3543 6.99991 20.412 6.90233C20.4697 6.80475 20.5002 6.69345 20.5002 6.58007C20.5002 6.46668 20.4697 6.35538 20.412 6.2578C20.3543 6.16022 20.2714 6.07995 20.172 6.02538Z'
                                    fill='#1C1C1C'
                                  />
                                </svg>
                              </Text>
                              <Text className='font-normal'>English</Text>
                            </Space>
                          </Flex>

                          <Text>
                            Kinh nghiệm: <Text className='font-normal'>6 năm</Text>
                          </Text>
                          <Text>
                            Khoa học: <Text className='font-normal'>Khóa học IELTS 6.0</Text>
                          </Text>
                          <Text>
                            Học phí: <Text className='font-normal'>10 Triệu VND</Text>
                          </Text>
                        </div>
                      }
                      description={
                        <Space size={'large'}>
                          <div>
                            <StarFilled /> 4.9
                          </div>
                          <div>
                            <EyeFilled />
                            4,090 Theo dõi
                          </div>
                        </Space>
                      }
                    />
                    <Flex align='center' justify='flex-start'>
                      <Text className='mt-7'>
                        Mỗi từ bạn học là một bước gần hơn đến khả năng nói trôi chảy. Chấp nhận thử thách, tôn vinh sự
                        tiến bộ và đừng bao giờ đánh giá thấp sức mạnh của nỗ lực nhất quán.
                      </Text>
                    </Flex>
                  </Card>
                </div>
                <div className='mr-[20px] pr-[20px]'>
                  <Card className='!bg-[#FFFFFF]'>
                    <Meta
                      avatar={
                        <Avatar
                          shape='square'
                          className='!h-40'
                          src='https://randomuser.me/api/portraits/med/men/57.jpg'
                          size={128}
                        />
                      }
                      title={
                        <div className='flex flex-col'>
                          <Flex align='center' justify='space-between'>
                            <Text>{`Bangera Pranit`}</Text>
                            <Space>
                              <Text>
                                <svg
                                  className='inline'
                                  width='21'
                                  height='19'
                                  viewBox='0 0 21 19'
                                  fill='none'
                                  xmlns='http://www.w3.org/2000/svg'
                                >
                                  <path
                                    d='M14.5626 15.4551C14.9955 15.2657 15.4134 15.0437 15.8126 14.791V17.8301C15.8126 17.9958 15.7468 18.1548 15.6295 18.272C15.5123 18.3892 15.3534 18.4551 15.1876 18.4551C15.0218 18.4551 14.8629 18.3892 14.7457 18.272C14.6284 18.1548 14.5626 17.9958 14.5626 17.8301V15.4551ZM9.94541 6.28319C9.86971 6.43088 9.85428 6.60219 9.90237 6.76103C9.95046 6.91987 10.0583 7.05385 10.2032 7.13475L13.8595 9.08007L15.1876 8.36913L10.797 6.02538C10.6493 5.94968 10.478 5.93425 10.3191 5.98234C10.1603 6.03043 10.0263 6.13828 9.94541 6.28319ZM20.172 6.02538L10.797 1.02538C10.7048 0.979307 10.6032 0.955322 10.5001 0.955322C10.397 0.955322 10.2954 0.979307 10.2032 1.02538L0.828225 6.02538C0.72884 6.07995 0.645944 6.16022 0.588203 6.2578C0.530463 6.35538 0.5 6.46668 0.5 6.58007C0.5 6.69345 0.530463 6.80475 0.588203 6.90233C0.645944 6.99991 0.72884 7.08018 0.828225 7.13475L2.6876 8.11913V12.0098C2.68642 12.278 2.77436 12.5391 2.9376 12.7519C3.55479 13.5801 5.92979 16.2676 10.5001 16.2676C11.8965 16.2792 13.2801 15.9998 14.5626 15.4473V9.45507L13.8595 9.08007L10.5001 10.8691L3.60948 7.19725L2.45323 6.58007L10.5001 2.291L18.547 6.58007L17.3907 7.19725L15.1876 8.36913L15.4845 8.52538C15.5902 8.5864 15.6767 8.67568 15.7345 8.78319C15.7864 8.87345 15.8134 8.97592 15.8126 9.08007V14.791C16.6759 14.2479 17.4374 13.5578 18.0626 12.7519C18.2258 12.5391 18.3138 12.278 18.3126 12.0098V8.11913L20.172 7.13475C20.2714 7.08018 20.3543 6.99991 20.412 6.90233C20.4697 6.80475 20.5002 6.69345 20.5002 6.58007C20.5002 6.46668 20.4697 6.35538 20.412 6.2578C20.3543 6.16022 20.2714 6.07995 20.172 6.02538Z'
                                    fill='#1C1C1C'
                                  />
                                </svg>
                              </Text>
                              <Text className='font-normal'>English</Text>
                            </Space>
                          </Flex>

                          <Text>
                            Kinh nghiệm: <Text className='font-normal'>6 năm</Text>
                          </Text>
                          <Text>
                            Khoa học: <Text className='font-normal'>Khóa học IELTS 6.0</Text>
                          </Text>
                          <Text>
                            Học phí: <Text className='font-normal'>10 Triệu VND</Text>
                          </Text>
                        </div>
                      }
                      description={
                        <Space size={'large'}>
                          <div>
                            <StarFilled /> 4.9
                          </div>
                          <div>
                            <EyeFilled />
                            4,090 Theo dõi
                          </div>
                        </Space>
                      }
                    />
                    <Flex align='center' justify='flex-start'>
                      <Text className='mt-7'>
                        Mỗi từ bạn học là một bước gần hơn đến khả năng nói trôi chảy. Chấp nhận thử thách, tôn vinh sự
                        tiến bộ và đừng bao giờ đánh giá thấp sức mạnh của nỗ lực nhất quán.
                      </Text>
                    </Flex>
                  </Card>
                </div>
                <div className='mr-[20px] pr-[20px]'>
                  <Card className='!bg-[#FFFFFF]'>
                    <Meta
                      avatar={
                        <Avatar
                          shape='square'
                          className='!h-40'
                          src='https://randomuser.me/api/portraits/med/men/57.jpg'
                          size={128}
                        />
                      }
                      title={
                        <div className='flex flex-col'>
                          <Flex align='center' justify='space-between'>
                            <Text>{`Bangera Pranit`}</Text>
                            <Space>
                              <Text>
                                <svg
                                  className='inline'
                                  width='21'
                                  height='19'
                                  viewBox='0 0 21 19'
                                  fill='none'
                                  xmlns='http://www.w3.org/2000/svg'
                                >
                                  <path
                                    d='M14.5626 15.4551C14.9955 15.2657 15.4134 15.0437 15.8126 14.791V17.8301C15.8126 17.9958 15.7468 18.1548 15.6295 18.272C15.5123 18.3892 15.3534 18.4551 15.1876 18.4551C15.0218 18.4551 14.8629 18.3892 14.7457 18.272C14.6284 18.1548 14.5626 17.9958 14.5626 17.8301V15.4551ZM9.94541 6.28319C9.86971 6.43088 9.85428 6.60219 9.90237 6.76103C9.95046 6.91987 10.0583 7.05385 10.2032 7.13475L13.8595 9.08007L15.1876 8.36913L10.797 6.02538C10.6493 5.94968 10.478 5.93425 10.3191 5.98234C10.1603 6.03043 10.0263 6.13828 9.94541 6.28319ZM20.172 6.02538L10.797 1.02538C10.7048 0.979307 10.6032 0.955322 10.5001 0.955322C10.397 0.955322 10.2954 0.979307 10.2032 1.02538L0.828225 6.02538C0.72884 6.07995 0.645944 6.16022 0.588203 6.2578C0.530463 6.35538 0.5 6.46668 0.5 6.58007C0.5 6.69345 0.530463 6.80475 0.588203 6.90233C0.645944 6.99991 0.72884 7.08018 0.828225 7.13475L2.6876 8.11913V12.0098C2.68642 12.278 2.77436 12.5391 2.9376 12.7519C3.55479 13.5801 5.92979 16.2676 10.5001 16.2676C11.8965 16.2792 13.2801 15.9998 14.5626 15.4473V9.45507L13.8595 9.08007L10.5001 10.8691L3.60948 7.19725L2.45323 6.58007L10.5001 2.291L18.547 6.58007L17.3907 7.19725L15.1876 8.36913L15.4845 8.52538C15.5902 8.5864 15.6767 8.67568 15.7345 8.78319C15.7864 8.87345 15.8134 8.97592 15.8126 9.08007V14.791C16.6759 14.2479 17.4374 13.5578 18.0626 12.7519C18.2258 12.5391 18.3138 12.278 18.3126 12.0098V8.11913L20.172 7.13475C20.2714 7.08018 20.3543 6.99991 20.412 6.90233C20.4697 6.80475 20.5002 6.69345 20.5002 6.58007C20.5002 6.46668 20.4697 6.35538 20.412 6.2578C20.3543 6.16022 20.2714 6.07995 20.172 6.02538Z'
                                    fill='#1C1C1C'
                                  />
                                </svg>
                              </Text>
                              <Text className='font-normal'>English</Text>
                            </Space>
                          </Flex>

                          <Text>
                            Kinh nghiệm: <Text className='font-normal'>6 năm</Text>
                          </Text>
                          <Text>
                            Khoa học: <Text className='font-normal'>Khóa học IELTS 6.0</Text>
                          </Text>
                          <Text>
                            Học phí: <Text className='font-normal'>10 Triệu VND</Text>
                          </Text>
                        </div>
                      }
                      description={
                        <Space size={'large'}>
                          <div>
                            <StarFilled /> 4.9
                          </div>
                          <div>
                            <EyeFilled />
                            4,090 Theo dõi
                          </div>
                        </Space>
                      }
                    />
                    <Flex align='center' justify='flex-start'>
                      <Text className='mt-7'>
                        Mỗi từ bạn học là một bước gần hơn đến khả năng nói trôi chảy. Chấp nhận thử thách, tôn vinh sự
                        tiến bộ và đừng bao giờ đánh giá thấp sức mạnh của nỗ lực nhất quán.
                      </Text>
                    </Flex>
                  </Card>
                </div>
                <div className='mr-[20px] pr-[20px]'>
                  <Card className='!bg-[#FFFFFF]'>
                    <Meta
                      avatar={
                        <Avatar
                          shape='square'
                          className='!h-40'
                          src='https://randomuser.me/api/portraits/med/men/57.jpg'
                          size={128}
                        />
                      }
                      title={
                        <div className='flex flex-col'>
                          <Flex align='center' justify='space-between'>
                            <Text>{`Bangera Pranit`}</Text>
                            <Space>
                              <Text>
                                <svg
                                  className='inline'
                                  width='21'
                                  height='19'
                                  viewBox='0 0 21 19'
                                  fill='none'
                                  xmlns='http://www.w3.org/2000/svg'
                                >
                                  <path
                                    d='M14.5626 15.4551C14.9955 15.2657 15.4134 15.0437 15.8126 14.791V17.8301C15.8126 17.9958 15.7468 18.1548 15.6295 18.272C15.5123 18.3892 15.3534 18.4551 15.1876 18.4551C15.0218 18.4551 14.8629 18.3892 14.7457 18.272C14.6284 18.1548 14.5626 17.9958 14.5626 17.8301V15.4551ZM9.94541 6.28319C9.86971 6.43088 9.85428 6.60219 9.90237 6.76103C9.95046 6.91987 10.0583 7.05385 10.2032 7.13475L13.8595 9.08007L15.1876 8.36913L10.797 6.02538C10.6493 5.94968 10.478 5.93425 10.3191 5.98234C10.1603 6.03043 10.0263 6.13828 9.94541 6.28319ZM20.172 6.02538L10.797 1.02538C10.7048 0.979307 10.6032 0.955322 10.5001 0.955322C10.397 0.955322 10.2954 0.979307 10.2032 1.02538L0.828225 6.02538C0.72884 6.07995 0.645944 6.16022 0.588203 6.2578C0.530463 6.35538 0.5 6.46668 0.5 6.58007C0.5 6.69345 0.530463 6.80475 0.588203 6.90233C0.645944 6.99991 0.72884 7.08018 0.828225 7.13475L2.6876 8.11913V12.0098C2.68642 12.278 2.77436 12.5391 2.9376 12.7519C3.55479 13.5801 5.92979 16.2676 10.5001 16.2676C11.8965 16.2792 13.2801 15.9998 14.5626 15.4473V9.45507L13.8595 9.08007L10.5001 10.8691L3.60948 7.19725L2.45323 6.58007L10.5001 2.291L18.547 6.58007L17.3907 7.19725L15.1876 8.36913L15.4845 8.52538C15.5902 8.5864 15.6767 8.67568 15.7345 8.78319C15.7864 8.87345 15.8134 8.97592 15.8126 9.08007V14.791C16.6759 14.2479 17.4374 13.5578 18.0626 12.7519C18.2258 12.5391 18.3138 12.278 18.3126 12.0098V8.11913L20.172 7.13475C20.2714 7.08018 20.3543 6.99991 20.412 6.90233C20.4697 6.80475 20.5002 6.69345 20.5002 6.58007C20.5002 6.46668 20.4697 6.35538 20.412 6.2578C20.3543 6.16022 20.2714 6.07995 20.172 6.02538Z'
                                    fill='#1C1C1C'
                                  />
                                </svg>
                              </Text>
                              <Text className='font-normal'>English</Text>
                            </Space>
                          </Flex>

                          <Text>
                            Kinh nghiệm: <Text className='font-normal'>6 năm</Text>
                          </Text>
                          <Text>
                            Khoa học: <Text className='font-normal'>Khóa học IELTS 6.0</Text>
                          </Text>
                          <Text>
                            Học phí: <Text className='font-normal'>10 Triệu VND</Text>
                          </Text>
                        </div>
                      }
                      description={
                        <Space size={'large'}>
                          <div>
                            <StarFilled /> 4.9
                          </div>
                          <div>
                            <EyeFilled />
                            4,090 Theo dõi
                          </div>
                        </Space>
                      }
                    />
                    <Flex align='center' justify='flex-start'>
                      <Text className='mt-7'>
                        Mỗi từ bạn học là một bước gần hơn đến khả năng nói trôi chảy. Chấp nhận thử thách, tôn vinh sự
                        tiến bộ và đừng bao giờ đánh giá thấp sức mạnh của nỗ lực nhất quán.
                      </Text>
                    </Flex>
                  </Card>
                </div>
                <div className='mr-[20px] pr-[20px]'>
                  <Card className='!bg-[#FFFFFF]'>
                    <Meta
                      avatar={
                        <Avatar
                          shape='square'
                          className='!h-40'
                          src='https://randomuser.me/api/portraits/med/men/57.jpg'
                          size={128}
                        />
                      }
                      title={
                        <div className='flex flex-col'>
                          <Flex align='center' justify='space-between'>
                            <Text>{`Bangera Pranit`}</Text>
                            <Space>
                              <Text>
                                <svg
                                  className='inline'
                                  width='21'
                                  height='19'
                                  viewBox='0 0 21 19'
                                  fill='none'
                                  xmlns='http://www.w3.org/2000/svg'
                                >
                                  <path
                                    d='M14.5626 15.4551C14.9955 15.2657 15.4134 15.0437 15.8126 14.791V17.8301C15.8126 17.9958 15.7468 18.1548 15.6295 18.272C15.5123 18.3892 15.3534 18.4551 15.1876 18.4551C15.0218 18.4551 14.8629 18.3892 14.7457 18.272C14.6284 18.1548 14.5626 17.9958 14.5626 17.8301V15.4551ZM9.94541 6.28319C9.86971 6.43088 9.85428 6.60219 9.90237 6.76103C9.95046 6.91987 10.0583 7.05385 10.2032 7.13475L13.8595 9.08007L15.1876 8.36913L10.797 6.02538C10.6493 5.94968 10.478 5.93425 10.3191 5.98234C10.1603 6.03043 10.0263 6.13828 9.94541 6.28319ZM20.172 6.02538L10.797 1.02538C10.7048 0.979307 10.6032 0.955322 10.5001 0.955322C10.397 0.955322 10.2954 0.979307 10.2032 1.02538L0.828225 6.02538C0.72884 6.07995 0.645944 6.16022 0.588203 6.2578C0.530463 6.35538 0.5 6.46668 0.5 6.58007C0.5 6.69345 0.530463 6.80475 0.588203 6.90233C0.645944 6.99991 0.72884 7.08018 0.828225 7.13475L2.6876 8.11913V12.0098C2.68642 12.278 2.77436 12.5391 2.9376 12.7519C3.55479 13.5801 5.92979 16.2676 10.5001 16.2676C11.8965 16.2792 13.2801 15.9998 14.5626 15.4473V9.45507L13.8595 9.08007L10.5001 10.8691L3.60948 7.19725L2.45323 6.58007L10.5001 2.291L18.547 6.58007L17.3907 7.19725L15.1876 8.36913L15.4845 8.52538C15.5902 8.5864 15.6767 8.67568 15.7345 8.78319C15.7864 8.87345 15.8134 8.97592 15.8126 9.08007V14.791C16.6759 14.2479 17.4374 13.5578 18.0626 12.7519C18.2258 12.5391 18.3138 12.278 18.3126 12.0098V8.11913L20.172 7.13475C20.2714 7.08018 20.3543 6.99991 20.412 6.90233C20.4697 6.80475 20.5002 6.69345 20.5002 6.58007C20.5002 6.46668 20.4697 6.35538 20.412 6.2578C20.3543 6.16022 20.2714 6.07995 20.172 6.02538Z'
                                    fill='#1C1C1C'
                                  />
                                </svg>
                              </Text>
                              <Text className='font-normal'>English</Text>
                            </Space>
                          </Flex>

                          <Text>
                            Kinh nghiệm: <Text className='font-normal'>6 năm</Text>
                          </Text>
                          <Text>
                            Khoa học: <Text className='font-normal'>Khóa học IELTS 6.0</Text>
                          </Text>
                          <Text>
                            Học phí: <Text className='font-normal'>10 Triệu VND</Text>
                          </Text>
                        </div>
                      }
                      description={
                        <Space size={'large'}>
                          <div>
                            <StarFilled /> 4.9
                          </div>
                          <div>
                            <EyeFilled />
                            4,090 Theo dõi
                          </div>
                        </Space>
                      }
                    />
                    <Flex align='center' justify='flex-start'>
                      <Text className='mt-7'>
                        Mỗi từ bạn học là một bước gần hơn đến khả năng nói trôi chảy. Chấp nhận thử thách, tôn vinh sự
                        tiến bộ và đừng bao giờ đánh giá thấp sức mạnh của nỗ lực nhất quán.
                      </Text>
                    </Flex>
                  </Card>
                </div>
                <div className='mr-[20px] pr-[20px]'>
                  <Card className='!bg-[#FFFFFF]'>
                    <Meta
                      avatar={
                        <Avatar
                          shape='square'
                          className='!h-40'
                          src='https://randomuser.me/api/portraits/med/men/57.jpg'
                          size={128}
                        />
                      }
                      title={
                        <div className='flex flex-col'>
                          <Flex align='center' justify='space-between'>
                            <Text>{`Bangera Pranit`}</Text>
                            <Space>
                              <Text>
                                <svg
                                  className='inline'
                                  width='21'
                                  height='19'
                                  viewBox='0 0 21 19'
                                  fill='none'
                                  xmlns='http://www.w3.org/2000/svg'
                                >
                                  <path
                                    d='M14.5626 15.4551C14.9955 15.2657 15.4134 15.0437 15.8126 14.791V17.8301C15.8126 17.9958 15.7468 18.1548 15.6295 18.272C15.5123 18.3892 15.3534 18.4551 15.1876 18.4551C15.0218 18.4551 14.8629 18.3892 14.7457 18.272C14.6284 18.1548 14.5626 17.9958 14.5626 17.8301V15.4551ZM9.94541 6.28319C9.86971 6.43088 9.85428 6.60219 9.90237 6.76103C9.95046 6.91987 10.0583 7.05385 10.2032 7.13475L13.8595 9.08007L15.1876 8.36913L10.797 6.02538C10.6493 5.94968 10.478 5.93425 10.3191 5.98234C10.1603 6.03043 10.0263 6.13828 9.94541 6.28319ZM20.172 6.02538L10.797 1.02538C10.7048 0.979307 10.6032 0.955322 10.5001 0.955322C10.397 0.955322 10.2954 0.979307 10.2032 1.02538L0.828225 6.02538C0.72884 6.07995 0.645944 6.16022 0.588203 6.2578C0.530463 6.35538 0.5 6.46668 0.5 6.58007C0.5 6.69345 0.530463 6.80475 0.588203 6.90233C0.645944 6.99991 0.72884 7.08018 0.828225 7.13475L2.6876 8.11913V12.0098C2.68642 12.278 2.77436 12.5391 2.9376 12.7519C3.55479 13.5801 5.92979 16.2676 10.5001 16.2676C11.8965 16.2792 13.2801 15.9998 14.5626 15.4473V9.45507L13.8595 9.08007L10.5001 10.8691L3.60948 7.19725L2.45323 6.58007L10.5001 2.291L18.547 6.58007L17.3907 7.19725L15.1876 8.36913L15.4845 8.52538C15.5902 8.5864 15.6767 8.67568 15.7345 8.78319C15.7864 8.87345 15.8134 8.97592 15.8126 9.08007V14.791C16.6759 14.2479 17.4374 13.5578 18.0626 12.7519C18.2258 12.5391 18.3138 12.278 18.3126 12.0098V8.11913L20.172 7.13475C20.2714 7.08018 20.3543 6.99991 20.412 6.90233C20.4697 6.80475 20.5002 6.69345 20.5002 6.58007C20.5002 6.46668 20.4697 6.35538 20.412 6.2578C20.3543 6.16022 20.2714 6.07995 20.172 6.02538Z'
                                    fill='#1C1C1C'
                                  />
                                </svg>
                              </Text>
                              <Text className='font-normal'>English</Text>
                            </Space>
                          </Flex>

                          <Text>
                            Kinh nghiệm: <Text className='font-normal'>6 năm</Text>
                          </Text>
                          <Text>
                            Khoa học: <Text className='font-normal'>Khóa học IELTS 6.0</Text>
                          </Text>
                          <Text>
                            Học phí: <Text className='font-normal'>10 Triệu VND</Text>
                          </Text>
                        </div>
                      }
                      description={
                        <Space size={'large'}>
                          <div>
                            <StarFilled /> 4.9
                          </div>
                          <div>
                            <EyeFilled />
                            4,090 Theo dõi
                          </div>
                        </Space>
                      }
                    />
                    <Flex align='center' justify='flex-start'>
                      <Text className='mt-7'>
                        Mỗi từ bạn học là một bước gần hơn đến khả năng nói trôi chảy. Chấp nhận thử thách, tôn vinh sự
                        tiến bộ và đừng bao giờ đánh giá thấp sức mạnh của nỗ lực nhất quán.
                      </Text>
                    </Flex>
                  </Card>
                </div>
              </Carousel>
            </ConfigProvider>
          </Card>
        </Space>
      </div>
      <div className='py-10 px-12 lg:px-20 bg-[#FFFFFF]'>
        <Space direction='vertical' className='w-full' size={'large'}>
          <div className='text-center'>
            <Title>
              Học ngôn ngữ <Title className='!text-primary'>không còn là mối lo</Title>
            </Title>
          </div>
          <div className='bg-white dark:bg-gray-900'>
            <div className='grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28'>
              <div className='mr-auto mt-6 lg:col-span-7 w-full'>
                <Collapse
                  expandIcon={(panelProps) => {
                    // console.log(panelProps)
                    return panelProps.isActive ? <MinusOutlined /> : <PlusOutlined />
                  }}
                  expandIconPosition={'end'}
                  ghost
                  className='w-full'
                  items={[
                    {
                      key: '1',
                      label: <Text strong>Tìm kiếm nơi học nhanh chóng và hiệu quả</Text>,
                      children: (
                        <Text>
                          Khám phá nhiều địa điểm học tập lý tưởng thật dễ dàng với ứng dụng Edu Lingual. Sử dụng giao
                          diện trực quan để tìm kiếm các giáo viên bản địa, trung tâm học ngôn ngữ, lọc theo các tiêu
                          chí tốt nhất.{' '}
                        </Text>
                      )
                    },
                    {
                      key: '2',
                      label: <Text strong>Phù hợp nhất với bản thân</Text>,
                      children: text
                    },
                    {
                      key: '3',
                      label: <Text strong>Lộ trình rõ ràng</Text>,
                      children: text
                    },
                    {
                      key: '4',
                      label: <Text strong>Nâng cấp mỗi ngày</Text>,
                      children: text
                    }
                  ]}
                  bordered={false}
                  defaultActiveKey={['1']}
                />
              </div>
              <div className='hidden lg:mt-0 lg:col-span-5 lg:flex'>
                <img src='/banner1.png' alt='hero image' />
              </div>
            </div>
          </div>
        </Space>
      </div>
      <div className='py-10  bg-[#FFFFFF]'>
        <Space direction='vertical' className='w-full' size={'large'}>
          <div className='text-center'>
            <Title>
              Tham gia <span className='!text-primary'>Blog</span>
            </Title>
          </div>
          <ConfigProvider
            theme={{
              token: {
                colorBgContainer: 'black',
                marginXXS: 10
              },
              components: {
                Carousel: {
                  dotOffset: -36
                }
              }
            }}
          >
            <Carousel slidesToShow={4}>
              <div className='mr-[20px] pr-[20px]'>
                <Card className='!bg-[#FFFFFF]'>
                  <Flex justify='space-between' vertical gap={20}>
                    <Flex align='flex-start' vertical gap={5}>
                      <Text strong className='text-[18px]'>
                        Làm sao để nhớ từ vựng...
                      </Text>
                      <Text>Nắm lấy thách thức. Mỗi từ học được là một bước hướng tới sự trôi chảy....</Text>
                      <Space size={'large'}>
                        <div>
                          <HeartFilled /> 190k
                        </div>
                        <div>
                          <EyeFilled />
                          256,091
                        </div>
                      </Space>
                    </Flex>
                    <Flex align='center' gap={10}>
                      <Avatar size='large' icon={<UserOutlined />} />
                      <Flex vertical>
                        <Text strong>Trí Nguyễn</Text>
                        <Text>13 tháng 1, 2024 - 3 phút đọc</Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Card>
              </div>
              <div className='mr-[20px] pr-[20px]'>
                <Card className='!bg-[#FFFFFF]'>
                  <Flex justify='space-between' vertical gap={20}>
                    <Flex align='flex-start' vertical gap={5}>
                      <Text strong className='text-[18px]'>
                        Làm sao để nhớ từ vựng...
                      </Text>
                      <Text>Nắm lấy thách thức. Mỗi từ học được là một bước hướng tới sự trôi chảy....</Text>
                      <Space size={'large'}>
                        <div>
                          <HeartFilled /> 190k
                        </div>
                        <div>
                          <EyeFilled />
                          256,091
                        </div>
                      </Space>
                    </Flex>
                    <Flex align='center' gap={10}>
                      <Avatar size='large' icon={<UserOutlined />} />
                      <Flex vertical>
                        <Text strong>Trí Nguyễn</Text>
                        <Text>13 tháng 1, 2024 - 3 phút đọc</Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Card>
              </div>
              <div className='mr-[20px] pr-[20px]'>
                <Card className='!bg-[#FFFFFF]'>
                  <Flex justify='space-between' vertical gap={20}>
                    <Flex align='flex-start' vertical gap={5}>
                      <Text strong className='text-[18px]'>
                        Làm sao để nhớ từ vựng...
                      </Text>
                      <Text>Nắm lấy thách thức. Mỗi từ học được là một bước hướng tới sự trôi chảy....</Text>
                      <Space size={'large'}>
                        <div>
                          <HeartFilled /> 190k
                        </div>
                        <div>
                          <EyeFilled />
                          256,091
                        </div>
                      </Space>
                    </Flex>
                    <Flex align='center' gap={10}>
                      <Avatar size='large' icon={<UserOutlined />} />
                      <Flex vertical>
                        <Text strong>Trí Nguyễn</Text>
                        <Text>13 tháng 1, 2024 - 3 phút đọc</Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Card>
              </div>
              <div className='mr-[20px] pr-[20px]'>
                <Card className='!bg-[#FFFFFF]'>
                  <Flex justify='space-between' vertical gap={20}>
                    <Flex align='flex-start' vertical gap={5}>
                      <Text strong className='text-[18px]'>
                        Làm sao để nhớ từ vựng...
                      </Text>
                      <Text>Nắm lấy thách thức. Mỗi từ học được là một bước hướng tới sự trôi chảy....</Text>
                      <Space size={'large'}>
                        <div>
                          <HeartFilled /> 190k
                        </div>
                        <div>
                          <EyeFilled />
                          256,091
                        </div>
                      </Space>
                    </Flex>
                    <Flex align='center' gap={10}>
                      <Avatar size='large' icon={<UserOutlined />} />
                      <Flex vertical>
                        <Text strong>Trí Nguyễn</Text>
                        <Text>13 tháng 1, 2024 - 3 phút đọc</Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Card>
              </div>
              <div className='mr-[20px] pr-[20px]'>
                <Card className='!bg-[#FFFFFF]'>
                  <Flex justify='space-between' vertical gap={20}>
                    <Flex align='flex-start' vertical gap={5}>
                      <Text strong className='text-[18px]'>
                        Làm sao để nhớ từ vựng...
                      </Text>
                      <Text>Nắm lấy thách thức. Mỗi từ học được là một bước hướng tới sự trôi chảy....</Text>
                      <Space size={'large'}>
                        <div>
                          <HeartFilled /> 190k
                        </div>
                        <div>
                          <EyeFilled />
                          256,091
                        </div>
                      </Space>
                    </Flex>
                    <Flex align='center' gap={10}>
                      <Avatar size='large' icon={<UserOutlined />} />
                      <Flex vertical>
                        <Text strong>Trí Nguyễn</Text>
                        <Text>13 tháng 1, 2024 - 3 phút đọc</Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Card>
              </div>
              <div className='mr-[20px] pr-[20px]'>
                <Card className='!bg-[#FFFFFF]'>
                  <Flex justify='space-between' vertical gap={20}>
                    <Flex align='flex-start' vertical gap={5}>
                      <Text strong className='text-[18px]'>
                        Làm sao để nhớ từ vựng...
                      </Text>
                      <Text>Nắm lấy thách thức. Mỗi từ học được là một bước hướng tới sự trôi chảy....</Text>
                      <Space size={'large'}>
                        <div>
                          <HeartFilled /> 190k
                        </div>
                        <div>
                          <EyeFilled />
                          256,091
                        </div>
                      </Space>
                    </Flex>
                    <Flex align='center' gap={10}>
                      <Avatar size='large' icon={<UserOutlined />} />
                      <Flex vertical>
                        <Text strong>Trí Nguyễn</Text>
                        <Text>13 tháng 1, 2024 - 3 phút đọc</Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Card>
              </div>
              <div className='mr-[20px] pr-[20px]'>
                <Card className='!bg-[#FFFFFF]'>
                  <Flex justify='space-between' vertical gap={20}>
                    <Flex align='flex-start' vertical gap={5}>
                      <Text strong className='text-[18px]'>
                        Làm sao để nhớ từ vựng...
                      </Text>
                      <Text>Nắm lấy thách thức. Mỗi từ học được là một bước hướng tới sự trôi chảy....</Text>
                      <Space size={'large'}>
                        <div>
                          <HeartFilled /> 190k
                        </div>
                        <div>
                          <EyeFilled />
                          256,091
                        </div>
                      </Space>
                    </Flex>
                    <Flex align='center' gap={10}>
                      <Avatar size='large' icon={<UserOutlined />} />
                      <Flex vertical>
                        <Text strong>Trí Nguyễn</Text>
                        <Text>13 tháng 1, 2024 - 3 phút đọc</Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Card>
              </div>
              <div className='mr-[20px] pr-[20px]'>
                <Card className='!bg-[#FFFFFF]'>
                  <Flex justify='space-between' vertical gap={20}>
                    <Flex align='flex-start' vertical gap={5}>
                      <Text strong className='text-[18px]'>
                        Làm sao để nhớ từ vựng...
                      </Text>
                      <Text>Nắm lấy thách thức. Mỗi từ học được là một bước hướng tới sự trôi chảy....</Text>
                      <Space size={'large'}>
                        <div>
                          <HeartFilled /> 190k
                        </div>
                        <div>
                          <EyeFilled />
                          256,091
                        </div>
                      </Space>
                    </Flex>
                    <Flex align='center' gap={10}>
                      <Avatar size='large' icon={<UserOutlined />} />
                      <Flex vertical>
                        <Text strong>Trí Nguyễn</Text>
                        <Text>13 tháng 1, 2024 - 3 phút đọc</Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Card>
              </div>
              <div className='mr-[20px] pr-[20px]'>
                <Card className='!bg-[#FFFFFF]'>
                  <Flex justify='space-between' vertical gap={20}>
                    <Flex align='flex-start' vertical gap={5}>
                      <Text strong className='text-[18px]'>
                        Làm sao để nhớ từ vựng...
                      </Text>
                      <Text>Nắm lấy thách thức. Mỗi từ học được là một bước hướng tới sự trôi chảy....</Text>
                      <Space size={'large'}>
                        <div>
                          <HeartFilled /> 190k
                        </div>
                        <div>
                          <EyeFilled />
                          256,091
                        </div>
                      </Space>
                    </Flex>
                    <Flex align='center' gap={10}>
                      <Avatar size='large' icon={<UserOutlined />} />
                      <Flex vertical>
                        <Text strong>Trí Nguyễn</Text>
                        <Text>13 tháng 1, 2024 - 3 phút đọc</Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Card>
              </div>
              <div className='mr-[20px] pr-[20px]'>
                <Card className='!bg-[#FFFFFF]'>
                  <Flex justify='space-between' vertical gap={20}>
                    <Flex align='flex-start' vertical gap={5}>
                      <Text strong className='text-[18px]'>
                        Làm sao để nhớ từ vựng...
                      </Text>
                      <Text>Nắm lấy thách thức. Mỗi từ học được là một bước hướng tới sự trôi chảy....</Text>
                      <Space size={'large'}>
                        <div>
                          <HeartFilled /> 190k
                        </div>
                        <div>
                          <EyeFilled />
                          256,091
                        </div>
                      </Space>
                    </Flex>
                    <Flex align='center' gap={10}>
                      <Avatar size='large' icon={<UserOutlined />} />
                      <Flex vertical>
                        <Text strong>Trí Nguyễn</Text>
                        <Text>13 tháng 1, 2024 - 3 phút đọc</Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Card>
              </div>
            </Carousel>
          </ConfigProvider>
        </Space>
      </div>
    </div>
  )
}

export default HomePage
