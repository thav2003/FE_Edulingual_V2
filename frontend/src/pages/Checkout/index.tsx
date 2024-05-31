import { StarFilled, EyeFilled, HeartOutlined } from '@ant-design/icons'
import {
  Card,
  Avatar,
  Flex,
  Space,
  Tag,
  Typography,
  Radio,
  Row,
  Col,
  Divider,
  Input,
  Button,
  ConfigProvider,
  Checkbox
} from 'antd'
import { PatternFormat } from 'react-number-format'
import CreditCardInput from '~/components/CreditCardInput'

const { Title, Text } = Typography

const { Meta } = Card
const CheckoutPage: React.FC = () => {
  return (
    <div>
      <div className='py-10 px-12 lg:px-20 bg-[#FFFFFF]'>
        <Row gutter={32}>
          <Col flex={2}>
            <Card className='!bg-[#F7F7F7]'>
              <Meta
                avatar={<Avatar shape='square' src='	https://randomuser.me/api/portraits/med/women/10.jpg' size={128} />}
                title={
                  <div className='flex flex-col'>
                    <Flex align='center' justify='space-between'>
                      <Text>{`Anh Vu`}</Text>
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

              <Card className='bg-[#FFFFFF] mt-7'>
                <Flex vertical gap={10}>
                  <Text strong className='text-[24px]'>
                    Khóa học
                  </Text>
                  <div>
                    <Text strong>Tên</Text>
                    <Text className='float-right'>Khóa học IELTS 6.0 đến 7.5</Text>
                  </div>
                  <div>
                    <Text strong>Học phí</Text>
                    <Text className='float-right'>6.000.000 VNĐ</Text>
                  </div>
                  <Divider />
                  <div>
                    <Text strong>Tổng cộng</Text>
                    <Text className='float-right'>6.000.000 VNĐ</Text>
                  </div>
                </Flex>
              </Card>
              <Flex gap={20} className='bg-[#FFFFFF] mt-7'>
                <Input placeholder='Nhập mã giới thiệu' size='large' />
                <Button type='primary' size='large' className='px-12'>
                  Xác nhận
                </Button>
              </Flex>
            </Card>
          </Col>
          <Col flex={3}>
            <Title level={3}>Chọn phương thức thanh toán</Title>
            <ConfigProvider
              theme={{
                token: {
                  // colorBorder: 'none'
                  controlHeight: 40
                },
                components: {
                  Radio: {}
                }
              }}
            >
              <Radio.Group buttonStyle='solid' defaultValue={'card'} className='w-full'>
                <Flex gap='middle'>
                  <Radio.Button value='card' className='w-full font-semibold rounded-lg'>
                    <Flex gap='middle' align='center' justify='center'>
                      <svg
                        className='inline'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <rect x='2' y='4' width='20' height='16' rx='5' stroke='black' strokeWidth='1.5' />
                        <path
                          d='M2 9.5H22'
                          stroke='black'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                        <path
                          d='M6 15.5H11'
                          stroke='black'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                      Card
                    </Flex>
                  </Radio.Button>
                  <Radio.Button value='momo' className='w-full font-semibold rounded-lg'>
                    <Flex gap='middle' align='center' justify='center'>
                      <img src='/momo.png' />
                      Momo
                    </Flex>
                  </Radio.Button>
                </Flex>
              </Radio.Group>
              <Card className='!bg-[#F7F7F7] mt-7'>
                <Flex vertical gap={20}>
                  <CreditCardInput />
                  <Flex gap={20}>
                    <PatternFormat customInput={Input} size='large' placeholder='MM' format='##' />
                    <PatternFormat customInput={Input} size='large' placeholder='YY' format='##' />
                    <PatternFormat customInput={Input} size='large' placeholder='CVC' format='###' />
                  </Flex>
                  <Checkbox>Lưu thông tin</Checkbox>
                  <Button type='primary' size='large'>
                    Xác nhận
                  </Button>
                  <Text>Chọn Xác nhận là bạn đã xác nhận các điều khoản của Edu Lingual</Text>
                </Flex>
              </Card>
            </ConfigProvider>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default CheckoutPage
