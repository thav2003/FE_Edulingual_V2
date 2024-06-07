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
  Carousel,
  Input
} from 'antd'
import {
  EyeFilled,
  HeartFilled,
  HeartOutlined,
  MinusOutlined,
  PlusOutlined,
  StarFilled,
  UserOutlined
} from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { formatCurrencyVND } from '~/utils/numberUtils'
import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom'
const { Title, Text } = Typography

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
const CoursesPage: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { courseArea, courseCategory, courseLanguage, courses } = useLoaderData() as any
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedArea, setSelectedArea] = useState<string | undefined>(searchParams.get('area') as string)
  const [selectedLanguage, setSelectedLanguage] = useState<string | undefined>(searchParams.get('language') as string)
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(searchParams.get('category') as string)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const options = ['option 1', 'options 2']

  const data_courses = courses.data.items as Course[]
  const data_courseCategory = courseCategory.data.items as CourseCategory[]
  const data_courseLanguage = courseLanguage.data.items as CourseLanguage[]
  const data_courseArea = courseArea.data.items as CourseArea[]
  const onLoadMore = () => {
    setLoading(true)
    // setList(data.concat([...new Array(3)].map(() => ({ loading: true }))))
    // fetch(fakeDataUrl)
    //   .then((res) => res.json())
    //   .then((res) => {
    //     const newData = data.concat(res.results)
    //     setData(newData)
    //     setList(newData)
    //     setLoading(false)
    //     // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
    //     // In real scene, you can using public method of react-virtualized:
    //     // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
    //     window.dispatchEvent(new Event('resize'))
    //   })
  }

  const loadMore = !loading ? (
    <div
      style={{
        textAlign: 'center',
        marginTop: 12,
        height: 32,
        lineHeight: '32px'
      }}
    >
      <Button type='primary' onClick={onLoadMore}>
        Xem thêm
      </Button>
    </div>
  ) : null

  // useEffect(() => {
  //   fetch(`https://randomuser.me/api/?results=${6}&inc=name,gender,email,nat,picture&noinfo`)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setInitLoading(false)
  //       setData(res.results)
  //       setList(res.results)
  //     })
  // }, [])

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
              {/* <ConfigProvider
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
                    optionLabelProp='label'
                    placeholder={
                      <Space>
                        <Text strong>
                          <SearchOutlined />
                        </Text>

                        <Text strong>Ngôn ngữ</Text>
                      </Space>
                    }
                    style={{ width: 150, height: 60 }}
                    onChange={handleChange}
                    options={options.map((d) => ({ value: d, label: d }))}
                  />

                  <Select
                    size='large'
                    className='!text-left'
                    allowClear
                    optionLabelProp='label'
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
                              stroke-width='2'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                            />
                            <path
                              d='M12.5 13C14.1569 13 15.5 11.6569 15.5 10C15.5 8.34315 14.1569 7 12.5 7C10.8431 7 9.5 8.34315 9.5 10C9.5 11.6569 10.8431 13 12.5 13Z'
                              stroke='#171618'
                              stroke-width='2'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                            />
                          </svg>
                        </Text>

                        <Text strong>Địa điểm</Text>
                      </Space>
                    }
                    style={{ width: 200, height: 60 }}
                    onChange={handleChange}
                    options={options.map((d) => ({ value: d, label: d }))}
                  />
                  <Select
                    size='large'
                    className='!text-left'
                    allowClear
                    optionLabelProp='label'
                    placeholder={
                      <Space>
                        <Text strong>
                          <SearchOutlined />
                        </Text>

                        <Text strong>Loại khóa học</Text>
                      </Space>
                    }
                    style={{ width: 200, height: 60 }}
                    onChange={handleChange}
                    options={options.map((d) => ({ value: d, label: d }))}
                  />
                  <Button type='primary' className='h-[60px]'>
                    Tìm kiếm
                  </Button>
                </Flex>
              </ConfigProvider> */}
            </Flex>
          </div>
        </div>
      </div>
      {/* <img src='/banner.png' className='w-full' /> */}
      <div className='py-10 px-12 xl:px-80 bg-[#FFFFFF]'>
        <Space direction='vertical' className='w-full' size={'large'}>
          <Flex align='center' justify='space-between' gap={20}>
            <Select
              size='large'
              className='!text-left'
              allowClear
              placeholder={<Text strong>Ngôn ngữ</Text>}
              style={{ width: '100%' }}
              value={selectedLanguage}
              onChange={setSelectedLanguage}
            >
              {data_courseLanguage.map((cl) => (
                <Select.Option value={cl.id}>{cl.name}</Select.Option>
              ))}
            </Select>
            <Select
              size='large'
              className='!text-left'
              allowClear
              placeholder={<Text strong>Địa điểm</Text>}
              style={{ width: '100%' }}
              value={selectedArea}
              onChange={setSelectedArea}
            >
              {data_courseArea.map((cl) => (
                <Select.Option value={cl.id}>{cl.name}</Select.Option>
              ))}
            </Select>
            <Select
              size='large'
              className='!text-left'
              allowClear
              placeholder={<Text strong>Khóa học</Text>}
              style={{ width: '100%' }}
              value={selectedCategory}
              onChange={setSelectedCategory}
            >
              {data_courseCategory.map((cl) => (
                <Select.Option value={cl.id}>{cl.name}</Select.Option>
              ))}
            </Select>
            <Button
              type='primary'
              size='large'
              onClick={() => {
                const queryParams = new URLSearchParams({
                  area: selectedArea || '',
                  language: selectedLanguage || '',
                  category: selectedCategory || ''
                }).toString()
                setSearchParams(queryParams)
              }}
            >
              Tìm kiếm
            </Button>
          </Flex>

          <Flex align='center' justify='space-between' gap={20} wrap>
            <Text strong>1,133 Kết quả</Text>
            <Flex align='center' gap={20}>
              <Input.Search size='large' />
              <Select
                size='large'
                className='!text-left'
                allowClear
                optionLabelProp='label'
                placeholder={
                  <Space>
                    <svg
                      className='inline'
                      width='18'
                      height='13'
                      viewBox='0 0 18 13'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fill-rule='evenodd'
                        clip-rule='evenodd'
                        d='M0 1.54004C0 0.987759 0.44772 0.540039 1 0.540039H17C17.5523 0.540039 18 0.987759 18 1.54004C18 2.09232 17.5523 2.54004 17 2.54004H1C0.44772 2.54004 0 2.09232 0 1.54004ZM3 6.54004C3 5.98774 3.44772 5.54004 4 5.54004H14C14.5523 5.54004 15 5.98774 15 6.54004C15 7.09234 14.5523 7.54004 14 7.54004H4C3.44772 7.54004 3 7.09234 3 6.54004ZM6 11.54C6 10.9877 6.44772 10.54 7 10.54H11C11.5523 10.54 12 10.9877 12 11.54C12 12.0923 11.5523 12.54 11 12.54H7C6.44772 12.54 6 12.0923 6 11.54Z'
                        fill='#A5A9AD'
                      />
                    </svg>
                    Lọc theo
                    <Text strong>Đánh giá cao</Text>
                  </Space>
                }
                style={{ width: 250 }}
              >
                {options.map((data) => (
                  <Select.Option
                    key={data}
                    value={data}
                    label={
                      <Space className='text-[#00000040]'>
                        <svg
                          className='inline'
                          width='18'
                          height='13'
                          viewBox='0 0 18 13'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            fill-rule='evenodd'
                            clip-rule='evenodd'
                            d='M0 1.54004C0 0.987759 0.44772 0.540039 1 0.540039H17C17.5523 0.540039 18 0.987759 18 1.54004C18 2.09232 17.5523 2.54004 17 2.54004H1C0.44772 2.54004 0 2.09232 0 1.54004ZM3 6.54004C3 5.98774 3.44772 5.54004 4 5.54004H14C14.5523 5.54004 15 5.98774 15 6.54004C15 7.09234 14.5523 7.54004 14 7.54004H4C3.44772 7.54004 3 7.09234 3 6.54004ZM6 11.54C6 10.9877 6.44772 10.54 7 10.54H11C11.5523 10.54 12 10.9877 12 11.54C12 12.0923 11.5523 12.54 11 12.54H7C6.44772 12.54 6 12.0923 6 11.54Z'
                            fill='#A5A9AD'
                          />
                        </svg>
                        Lọc theo
                        <Text strong>{data}</Text>
                      </Space>
                    }
                  >
                    {data}
                  </Select.Option>
                ))}
              </Select>
            </Flex>
          </Flex>

          <div>
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 1,
                md: 1,
                lg: 1,
                xl: 1,
                xxl: 1
              }}
              loadMore={loadMore}
              dataSource={data_courses}
              renderItem={(item) => (
                <List.Item>
                  <Skeleton avatar title={false} loading={false} active>
                    <Card
                      hoverable
                      className='!bg-[#F7F7F7]'
                      onClick={() => navigate(`/courses/course-detail/${item.id}`)}
                    >
                      <Meta
                        avatar={
                          <Avatar
                            shape='square'
                            src={'https://randomuser.me/api/portraits/med/women/76.jpg'}
                            size={128}
                          />
                        }
                        title={
                          <div className='flex flex-col'>
                            <Flex align='center' justify='space-between'>
                              <Text>{item.center?.fullName}</Text>
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
                              Khóa học: <Text className='font-normal'>{item.courseCategory?.name}</Text>
                            </Text>
                            <Text>
                              Học phí: <Text className='font-normal'>{formatCurrencyVND(item.tuitionfee)}</Text>
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
                        <Tag color='#FFFFFF'>
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
                                  stroke-width='2'
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                />
                                <path
                                  d='M12.5 13C14.1569 13 15.5 11.6569 15.5 10C15.5 8.34315 14.1569 7 12.5 7C10.8431 7 9.5 8.34315 9.5 10C9.5 11.6569 10.8431 13 12.5 13Z'
                                  stroke='#171618'
                                  stroke-width='2'
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                />
                              </svg>
                            </Text>
                            <Text>Hà Nội</Text>
                          </Space>
                        </Tag>
                        <Tag color='#FFFFFF' style={{ marginInlineEnd: 0 }}>
                          <Text>
                            <HeartOutlined />
                          </Text>
                        </Tag>
                      </Flex>
                    </Card>
                  </Skeleton>
                </List.Item>
              )}
            />
          </div>
        </Space>
      </div>
    </div>
  )
}

export default CoursesPage
