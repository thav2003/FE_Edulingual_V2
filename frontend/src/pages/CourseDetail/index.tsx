import { CaretRightOutlined, ProfileOutlined, StarFilled } from '@ant-design/icons'
import { Tabs, Avatar, List, Space, Button, Image } from 'antd'
import type { TabsProps } from 'antd'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { formatCurrencyVND } from '~/utils/numberUtils'

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

const CourseDetailPage: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { course } = useLoaderData() as any

  const data_course = course.data as Course
  console.log(data_course)
  const navigate = useNavigate()
  const onChange = (key: string) => {
    console.log(key)
  }
  const data = [
    {
      title: 'User 1'
    },
    {
      title: 'User 2'
    },
    {
      title: 'User 3'
    },
    {
      title: 'User 4'
    }
  ]
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Description',
      children: (
        <div>
          <div className='pt-[30px] space-y-[30px]'>
            <div>
              <ul className='mb-[20px] space-x-[10px] lg:space-x-[35px] rtl:space-x-reverse'>
                <li className='inline-block text-[13px] lg:text-[17px] transition duration-500 ease-in-out group-hover:text-white'>
                  <div className='flex items-center space-x-[5px] rtl:space-x-reverse'>
                    <div className='text-[#FCA120] text-[15px] sm:text-[20px] space-x-[1px] rtl:space-x-reverse'>
                      <StarFilled />
                      <StarFilled />
                      <StarFilled />
                      <StarFilled />
                      <StarFilled />
                    </div>
                    <p className='relative top-[1px]'>4.9 Reviews</p>
                  </div>
                </li>
                <li className='inline-block text-[13px] lg:text-[17px] font-medium transition duration-500 ease-in-out group-hover:text-white'>
                  <ProfileOutlined className='text-primary text-[17px] lg:text-[22px] mr-[5px] group-hover:text-white' />
                  {data_course?.courseCategory.name}
                </li>
                <li className='inline-block text-[13px] lg:text-[17px] font-medium transition duration-500 ease-in-out group-hover:text-white'>
                  <ProfileOutlined className='text-primary text-[17px] lg:text-[22px] mr-[5px] group-hover:text-white' />
                  {data_course?.duration}
                </li>
                <li className='inline-block text-[13px] lg:text-[17px] font-medium transition duration-500 ease-in-out group-hover:text-white'>
                  <ProfileOutlined className='text-primary text-[17px] lg:text-[22px] mr-[5px] group-hover:text-white' />
                  {data_course?.courseArea.name}
                </li>
              </ul>
              <div className='flex items-center space-x-[15px] rtl:space-x-reverse'>
                <img
                  alt='user'
                  loading='lazy'
                  width='84'
                  height='84'
                  decoding='async'
                  data-nimg='1'
                  className='w-[40px] h-[40px] rounded-full'
                  style={{ color: 'transparent' }}
                  src='/anh2.png'
                />
                <div>
                  <h3 className='text-[17px] lg:text-[19px]'>
                    <a
                      className='transition duration-500 ease-in-out hover:text-[#717FF8] group-hover:text-white'
                      href='#'
                    >
                      {data_course?.center?.fullName}
                    </a>
                  </h3>
                </div>
              </div>
            </div>
            <div
              className='details-content space-y-[20px]'
              dangerouslySetInnerHTML={{ __html: data_course?.description }}
            ></div>
            <div className='sm:flex items-center justify-between space-y-[20px] sm:space-y-[0]'>
              <div>
                <Button type='primary' size='large' onClick={() => navigate(`/checkout/${data_course.id}`)}>
                  Now Buy Course <i className='ri-arrow-right-up-line'></i>
                </Button>
              </div>
              <div className='flex items-center space-x-[10px] rtl:space-x-reverse'>
                <p className='text-black text-[16px] lg:text-[20px]'>Share On:</p>
                <ul className='space-x-[10px] rtl:space-x-reverse'>
                  <li className='inline-block'>
                    <a
                      href='https://www.facebook.com/'
                      target='_black'
                      className='bg-[#051F0D1A] text-[#051F0D] inline-block w-[32px] h-[32px] leading-[32px] text-center rounded-full transition duration-500 ease-in-out hover:bg-[#051F0D] hover:text-[#fff]'
                    >
                      <i className='ri-facebook-fill'></i>
                    </a>
                  </li>
                  <li className='inline-block'>
                    <a
                      href='https://www.twitter.com/'
                      target='_black'
                      className='bg-[#051F0D1A] text-[#051F0D] inline-block w-[32px] h-[32px] leading-[32px] text-center rounded-full transition duration-500 ease-in-out hover:bg-[#051F0D] hover:text-[#fff]'
                    >
                      <i className='ri-twitter-fill'></i>
                    </a>
                  </li>
                  <li className='inline-block'>
                    <a
                      href='https://www.linkedin.com/'
                      target='_black'
                      className='bg-[#051F0D1A] text-[#051F0D] inline-block w-[32px] h-[32px] leading-[32px] text-center rounded-full transition duration-500 ease-in-out hover:bg-[#051F0D] hover:text-[#fff]'
                    >
                      <i className='ri-linkedin-fill'></i>
                    </a>
                  </li>
                  <li className='inline-block'>
                    <a
                      href='https://www.instagram.com/'
                      target='_black'
                      className='bg-[#051F0D1A] text-[#051F0D] inline-block w-[32px] h-[32px] leading-[32px] text-center rounded-full transition duration-500 ease-in-out hover:bg-[#051F0D] hover:text-[#fff]'
                    >
                      <i className='ri-instagram-fill'></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      key: '2',
      label: 'Feedback',
      children: (
        <List
          pagination={{ position: 'bottom', align: 'center' }}
          itemLayout='horizontal'
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                title={
                  <Space>
                    <a href='https://ant.design'>{item.title}</a>
                    <div className='flex items-center space-x-[5px] rtl:space-x-reverse'>
                      <div className='text-[#FCA120] text-[15px] sm:text-[20px] space-x-[1px] rtl:space-x-reverse'>
                        <StarFilled />
                        <StarFilled />
                        <StarFilled />
                        <StarFilled />
                        <StarFilled />
                      </div>
                    </div>
                  </Space>
                }
                description='Tuyệt vời!'
              />
            </List.Item>
          )}
        />
      )
    }
  ]

  return (
    <div className='bg-[#FFFFFF]'>
      <div className='py-[50px]'>
        <div className='container mx-auto'>
          <div className='grid gap-[30px] grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3'>
            <div className='lg:col-span-2'>
              <div className='space-y-[30px]'>
                <div className='relative'>
                  <Image
                    alt='course'
                    className='!w-[900px] !h-[790px]'
                    fallback='data:image/png;base64,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'
                    style={{ color: 'transparent' }}
                    src={data_course?.center.imageUrl}
                  />
                  <div className='headingFontFamily absolute bottom-[20px] left-[20px] rtl:left-auto rtl:right-[20px] z-1 bg-primaryBg text-white font-semibold text-[16px] lg:text-[22px] pt-[14px] pb-[10px] px-[16px] leading-none'>
                    {/* <span className='discount-price line-through text-[13px] lg:text-[18px] mr-2 rtl:mr-0 rtl:ml-2'>
                      $778.00
                    </span> */}
                    {formatCurrencyVND(data_course?.tuitionfee)}
                  </div>
                </div>
                <div>
                  <Tabs defaultActiveKey='1' items={items} onChange={onChange} />
                  {/* <ul className='space-y-[10px] space-x-[20px] sm:space-x-[30px] md:space-x-[40px] lg:space-x-[45px] xl:space-x-[50px] 2xl:space-x-[65px] rtl:space-x-reverse'>
                    <li className='inline-block cursor-pointer font-bold text-[18px] md:text-[22px] hover:text-[#051F0D] text-[#051F0D] border-b border-[#051F0D]'>
                      Overview
                    </li>
                    <li className='inline-block cursor-pointer font-bold text-[18px] md:text-[22px] hover:text-[#051F0D] text-[#859D8B]'>
                      Feedback
                    </li>
                  </ul> */}
                </div>
              </div>
            </div>
            <div>
              <div className='bg-[#E5FFEF] py-[30px] md:py-[45px] lg:py-[30px] xl:py-[45px] px-[20px] md:px-[35px] lg:px-[20px] xl:px-[35px] space-y-[30px] md:space-y-[45px]'>
                <div>
                  <h3 className='text-black font-bold text-[22px] leading-none mb-[15px]'>Search</h3>
                  <form>
                    <input
                      type='text'
                      placeholder='Search your course'
                      className='bg-transparent text-[#4A4E4B] border border-[#051F0D] h-[54px] block w-full py-[5px] px-[25px] focus:outline-none placeholder-[#4A4E4B]'
                    />
                  </form>
                </div>
                <div>
                  <h3 className='text-black font-bold text-[22px] leading-none mb-[15px]'>Popular Courses</h3>
                  <div className='space-y-[15px]'>
                    <div className='flex items-center space-x-[15px] rtl:space-x-reverse'>
                      <div className="shrink-0 bg-cover bg-center h-[90px] w-[90px] bg-[url('https://branco-react.hibootstrap.com/images/course-img1.jpg')]"></div>
                      <div>
                        <h3 className='leading-[1.2] text-[16px] md:text-[18px] lg:text-[16px] xl:text-[18px]'>
                          <a className='hover:text-[#717FF8]' href='/courses/course-details/'>
                            Nutrition Plans: Our experienced nutritionists will
                          </a>
                        </h3>
                        <h3 className='text-[#717FF8] leading-none font-semibold text-[17px] md:text-[20px] lg:text-[17px] xl:text-[20px] mt-[10px]'>
                          $283.00
                        </h3>
                      </div>
                    </div>
                    <div className='flex items-center space-x-[15px] rtl:space-x-reverse'>
                      <div className="shrink-0 bg-cover bg-center h-[90px] w-[90px] bg-[url('https://branco-react.hibootstrap.com/images/course-img2.jpg')]"></div>
                      <div>
                        <h3 className='leading-[1.2] text-[16px] md:text-[18px] lg:text-[16px] xl:text-[18px]'>
                          <a className='hover:text-[#717FF8]' href='/courses/course-details/'>
                            Health Education: We provide you with the knowledge
                          </a>
                        </h3>
                        <h3 className='text-[#717FF8] leading-none font-semibold text-[17px] md:text-[20px] lg:text-[17px] xl:text-[20px] mt-[10px]'>
                          $283.00
                        </h3>
                      </div>
                    </div>
                    <div className='flex items-center space-x-[15px] rtl:space-x-reverse'>
                      <div className="shrink-0 bg-cover bg-center h-[90px] w-[90px] bg-[url('https://branco-react.hibootstrap.com/images/course-img3.jpg')]"></div>
                      <div>
                        <h3 className='leading-[1.2] text-[16px] md:text-[18px] lg:text-[16px] xl:text-[18px]'>
                          <a className='hover:text-[#717FF8]' href='/courses/course-details/'>
                            Health Assessments We begin by conducting
                          </a>
                        </h3>
                        <h3 className='text-[#717FF8] leading-none font-semibold text-[17px] md:text-[20px] lg:text-[17px] xl:text-[20px] mt-[10px]'>
                          $283.00
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className='text-black font-bold text-[22px] leading-none mb-[15px]'>Contact Us</h3>
                  <form className='space-y-[20px]'>
                    <div>
                      <input
                        id='email'
                        type='text'
                        placeholder='Your Email'
                        className='
  bg-transparent 
  text-[#4A4E4B] 
  border 
  border-[#051F0D] 
  h-[54px] 
  block 
  w-full 
  py-[5px] 
  px-[25px] 
  placeholder-[#4A4E4B]
  border-[#82839E]
  focus:outline-none
'
                        name='email'
                      />
                    </div>
                    <div>
                      <input
                        id='name'
                        type='text'
                        placeholder='Your Name'
                        className='
  bg-transparent 
  text-[#4A4E4B] 
  border 
  border-[#051F0D] 
  h-[54px] 
  block 
  w-full 
  py-[5px] 
  px-[25px] 
  placeholder-[#4A4E4B]
  border-[#82839E]
  focus:outline-none
'
                        name='name'
                      />
                    </div>
                    <div>
                      <textarea
                        id='comment'
                        placeholder='Your message...'
                        name='comment'
                        className='
  bg-transparent 
  text-[#4A4E4B] 
  border 
  border-[#051F0D] 
  block 
  w-full 
  py-[10px] 
  px-[25px] 
  placeholder-[#4A4E4B]
  border-[#82839E]
  focus:outline-none
'
                      ></textarea>
                    </div>
                    <div>
                      <button
                        type='submit'
                        className='   bg-[#717FF8]    text-[#fff]    text-[16px]    font-semibold    block    w-full    py-[15px]    sm:py-[17px]    px-[21px]    sm:px-[30px]    leading-none    border    border-[#717FF8]    transition    duration-500    ease-in-out    hover:bg-[#000]    hover:border-[#000]    hover:text-[#fff]   '
                      >
                        Send Message
                        <i className='ri-arrow-right-up-line'></i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetailPage
