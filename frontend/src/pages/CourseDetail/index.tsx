import { CaretRightOutlined, ProfileOutlined, StarFilled } from '@ant-design/icons'
import { Tabs, Avatar, List, Space, Button } from 'antd'
import type { TabsProps } from 'antd'
import { useNavigate } from 'react-router-dom'

const CourseDetailPage: React.FC = () => {
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
                  Medium
                </li>
                <li className='inline-block text-[13px] lg:text-[17px] font-medium transition duration-500 ease-in-out group-hover:text-white'>
                  <ProfileOutlined className='text-primary text-[17px] lg:text-[22px] mr-[5px] group-hover:text-white' />
                  65 Lessons
                </li>
                <li className='inline-block text-[13px] lg:text-[17px] font-medium transition duration-500 ease-in-out group-hover:text-white'>
                  <ProfileOutlined className='text-primary text-[17px] lg:text-[22px] mr-[5px] group-hover:text-white' />
                  23 Students
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
                      Daimul Samiul
                    </a>
                  </h3>
                </div>
              </div>
            </div>
            <div className='details-content space-y-[20px]'>
              <h1>Nutrition Plans: Our experienced nutritionists will create personalized.</h1>
              <p>
                Our online courses cover a wide range of topics, from personal development and wellness to professional
                skills like leadership, communication, and for the entrepreneurship Our online courses cover a wide
                range of topics, from person and wellness to professional skills like leadership.
              </p>
              <p>
                The goal of this course is to take you, you beautiful front end developer you, from someone with very
                little or no jQuery or JavaScript knowledge and up you to someone who is quite comfortable.
              </p>
              <div className='py-[15px]'>
                <div className="relative h-[450px] bg-cover bg-center bg-[url('https://branco-react.hibootstrap.com/images/promo-video-thumb.jpg')]">
                  <div className='bg-[#717FF8] w-[100px] md:w-[145px] h-[100px] md:h-[145px] leading-[100px] md:leading-[145px] text-center rounded-full text-white text-[60px] md:text-[70px] absolute top-1/2 -translate-y-2/4 left-0 right-0 mx-auto cursor-pointer transition duration-500 ease-in-out hover:bg-[#CD201F]'>
                    <CaretRightOutlined />
                  </div>
                </div>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt.
              </p>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
                rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
                explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
              </p>
            </div>
            <div className='sm:flex items-center justify-between space-y-[20px] sm:space-y-[0]'>
              <div>
                <Button type='primary' size='large' onClick={() => navigate('/checkout/1/')}>
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
                  <img
                    alt='course'
                    loading='lazy'
                    width='900'
                    height='790'
                    decoding='async'
                    data-nimg='1'
                    style={{ color: 'transparent' }}
                    src='/anh1.jpg'
                  />
                  <div className='headingFontFamily absolute bottom-[20px] left-[20px] rtl:left-auto rtl:right-[20px] z-1 bg-primaryBg text-white font-semibold text-[16px] lg:text-[22px] pt-[14px] pb-[10px] px-[16px] leading-none'>
                    <span className='discount-price line-through text-[13px] lg:text-[18px] mr-2 rtl:mr-0 rtl:ml-2'>
                      $778.00
                    </span>
                    $678.00
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
      <div className='pb-[50px] md:pb-[60px] lg:pb-[140px]'>
        <div className='container mx-auto'>
          <h2 className='text-black text-[25px] md:text-[30px] lg:text-[40px] xl:text-[42px] mb-[30px] leading-none'>
            Related Courses
          </h2>
          <div className='grid gap-[25px] grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3'>
            <div className='relative group'>
              <a href='#'>
                <img
                  alt='course'
                  loading='lazy'
                  width='900'
                  height='790'
                  decoding='async'
                  data-nimg='1'
                  style={{ color: 'transparent' }}
                  src='/anh3.jpg'
                />
              </a>
              <div className='headingFontFamily absolute top-[20px] left-[20px] z-1 bg-primaryBg text-white font-semibold text-[16px] lg:text-[22px] pt-[14px] pb-[10px] px-[16px] leading-none'>
                <span className='discount-price line-through text-[13px] lg:text-[18px] mr-2 rtl:mr-0 rtl:ml-2'>
                  $778.00
                </span>
                $678.00
              </div>
              <div className='bg-[#E1F8E6] py-[30px] sm:py-[35px] px-[20px] sm:px-[25px] -mt-[1px] border border-[#051F0D] group-hover:bg-[#717FF8] transition duration-500 ease-in-out group-hover:border-[#717FF8]'>
                <ul className='mb-[20px] space-x-[10px] lg:space-x-[20px] rtl:space-x-reverse'>
                  <li className='inline-block text-[13px] lg:text-[16px] transition duration-500 ease-in-out group-hover:text-white'>
                    <ProfileOutlined className='text-primary text-[17px] lg:text-[22px] mr-[5px] group-hover:text-white' />
                    4.5
                  </li>
                  <li className='inline-block text-[13px] lg:text-[16px] transition duration-500 ease-in-out group-hover:text-white'>
                    <ProfileOutlined className='text-primary text-[17px] lg:text-[22px] mr-[5px] group-hover:text-white' />
                    Medium
                  </li>
                  <li className='inline-block text-[13px] lg:text-[16px] transition duration-500 ease-in-out group-hover:text-white'>
                    <ProfileOutlined className='text-primary text-[17px] lg:text-[22px] mr-[5px] group-hover:text-white' />
                    53(Lessons)
                  </li>
                </ul>
                <h3 className='text-[20px] lg:text-[22px] leading-[1.3] mb-[20px]'>
                  <a
                    className='transition duration-500 ease-in-out hover:text-[#717FF8] group-hover:text-white'
                    href='#'
                  >
                    Hand Shape: career business according people towards For an this
                  </a>
                </h3>
                <div className='flex items-center space-x-[15px] rtl:space-x-reverse border-t border-[#051F0D] pt-[25px]'>
                  <img
                    alt='user'
                    loading='lazy'
                    width='83'
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
                        Samuel Jonson
                      </a>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className='relative group'>
              <a href='#'>
                <img
                  alt='course'
                  loading='lazy'
                  width='900'
                  height='790'
                  decoding='async'
                  data-nimg='1'
                  style={{ color: 'transparent' }}
                  src='/anh3.jpg'
                />
              </a>
              <div className='headingFontFamily absolute top-[20px] left-[20px] z-1 bg-primaryBg text-white font-semibold text-[16px] lg:text-[22px] pt-[14px] pb-[10px] px-[16px] leading-none'>
                $500.00
              </div>
              <div className='bg-[#E1F8E6] py-[30px] sm:py-[35px] px-[20px] sm:px-[25px] -mt-[1px] border border-[#051F0D] group-hover:bg-[#717FF8] transition duration-500 ease-in-out group-hover:border-[#717FF8]'>
                <ul className='mb-[20px] space-x-[10px] lg:space-x-[20px] rtl:space-x-reverse'>
                  <li className='inline-block text-[13px] lg:text-[16px] transition duration-500 ease-in-out group-hover:text-white'>
                    <ProfileOutlined className='text-primary text-[17px] lg:text-[22px] mr-[5px] group-hover:text-white' />
                    4.0
                  </li>
                  <li className='inline-block text-[13px] lg:text-[16px] transition duration-500 ease-in-out group-hover:text-white'>
                    <ProfileOutlined className='text-primary text-[17px] lg:text-[22px] mr-[5px] group-hover:text-white' />
                    Medium
                  </li>
                  <li className='inline-block text-[13px] lg:text-[16px] transition duration-500 ease-in-out group-hover:text-white'>
                    <ProfileOutlined className='text-primary text-[17px] lg:text-[22px] mr-[5px] group-hover:text-white' />
                    50(Lessons)
                  </li>
                </ul>
                <h3 className='text-[20px] lg:text-[22px] leading-[1.3] mb-[20px]'>
                  <a
                    className='transition duration-500 ease-in-out hover:text-[#717FF8] group-hover:text-white'
                    href='#'
                  >
                    Health Education We provide you with the knowledge and resources to make.
                  </a>
                </h3>
                <div className='flex items-center space-x-[15px] rtl:space-x-reverse border-t border-[#051F0D] pt-[25px]'>
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
                        William Jenson
                      </a>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className='relative group'>
              <a href='#'>
                <img
                  alt='course'
                  loading='lazy'
                  width='900'
                  height='790'
                  decoding='async'
                  data-nimg='1'
                  style={{ color: 'transparent' }}
                  src='/anh3.jpg'
                />
              </a>
              <div className='headingFontFamily absolute top-[20px] left-[20px] z-1 bg-primaryBg text-white font-semibold text-[16px] lg:text-[22px] pt-[14px] pb-[10px] px-[16px] leading-none'>
                $399.00
              </div>
              <div className='bg-[#E1F8E6] py-[30px] sm:py-[35px] px-[20px] sm:px-[25px] -mt-[1px] border border-[#051F0D] group-hover:bg-[#717FF8] transition duration-500 ease-in-out group-hover:border-[#717FF8]'>
                <ul className='mb-[20px] space-x-[10px] lg:space-x-[20px] rtl:space-x-reverse'>
                  <li className='inline-block text-[13px] lg:text-[16px] transition duration-500 ease-in-out group-hover:text-white'>
                    <ProfileOutlined className='text-primary text-[17px] lg:text-[22px] mr-[5px] group-hover:text-white' />
                    4.9
                  </li>
                  <li className='inline-block text-[13px] lg:text-[16px] transition duration-500 ease-in-out group-hover:text-white'>
                    <i className='ri-stack-fill primaryText text-[17px] lg:text-[22px] mr-[5px] group-hover:text-white'></i>
                    <ProfileOutlined className='text-primary text-[17px] lg:text-[22px] mr-[5px] group-hover:text-white' />
                    Medium
                  </li>
                  <li className='inline-block text-[13px] lg:text-[16px] transition duration-500 ease-in-out group-hover:text-white'>
                    <ProfileOutlined className='text-primary text-[17px] lg:text-[22px] mr-[5px] group-hover:text-white' />
                    65(Lessons)
                  </li>
                </ul>
                <h3 className='text-[20px] lg:text-[22px] leading-[1.3] mb-[20px]'>
                  <a
                    className='transition duration-500 ease-in-out hover:text-[#717FF8] group-hover:text-white'
                    href='#'
                  >
                    Nutrition Plans: Our experienced nutritionists will create personalized.
                  </a>
                </h3>
                <div className='flex items-center space-x-[15px] rtl:space-x-reverse border-t border-[#051F0D] pt-[25px]'>
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
                        Daimul Samiul
                      </a>
                    </h3>
                  </div>
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
