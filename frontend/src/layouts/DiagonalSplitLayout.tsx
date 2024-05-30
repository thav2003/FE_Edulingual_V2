import React from 'react'
import { Outlet } from 'react-router-dom'

type DiagonalSplitLayoutTypes = {
  children?: React.ReactNode
}

const DiagonalSplitLayout: React.FC<DiagonalSplitLayoutTypes> = ({ children }) => {
  return (
    <div className='min-h-screen bg-[#ffffff] text-gray-900 flex justify-center'>
      <div className='flex-1 bg-gradient-to-r from-[#53B748] from-0% to-[#89C3BD] to-100% text-center hidden lg:flex lg:items-center lg:justify-center'>
        <div>
          <img src='/login.png' className='w-mx-auto' />
        </div>
      </div>
      <div className='w-full lg:w-[60%] p-6 sm:p-12 z-20'>
        <div>
          <img src='/logo.svg' className='w-mx-auto' />
        </div>
        {children ? children : <Outlet />}
      </div>
    </div>
  )
}

export default DiagonalSplitLayout
