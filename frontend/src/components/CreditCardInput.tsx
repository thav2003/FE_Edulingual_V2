import { Input } from 'antd'
import { PatternFormat } from 'react-number-format'
const CreditCardInput: React.FC = () => {
  return (
    <PatternFormat
      customInput={Input}
      size='large'
      placeholder='xxxx xxxx xxxx xxxx'
      format='#### #### #### ####'
      mask=' '
      suffix={
        <svg
          className='inline'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <rect x='2' y='4' width='20' height='16' rx='5' stroke='#191B1F' stroke-width='1.5' />
          <path d='M2 9.5H22' stroke='#191B1F' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' />
          <path d='M6 15.5H11' stroke='#191B1F' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' />
        </svg>
      }
    />
  )
}

export default CreditCardInput
