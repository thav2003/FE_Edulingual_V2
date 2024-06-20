import { Result, Button, Card } from 'antd'
import { useNavigate } from 'react-router-dom'

const PaymetnSuccessPage: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className='w-full h-full  items-center flex justify-center'>
      <Card>
        <Result
          status='success'
          title='Successfully Purchased'
          // subTitle='Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait.'
          extra={[
            <Button type='primary' key='console' onClick={() => navigate('/')}>
              Quay lại
            </Button>
            // <Button key='buy'>Buy Again</Button>
          ]}
        />
      </Card>
    </div>
  )
}

export default PaymetnSuccessPage
