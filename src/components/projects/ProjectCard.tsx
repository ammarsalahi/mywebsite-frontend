import React from 'react'
import imgs from '../../assets/bgs.jpg'
import { PiChat, PiClock, PiEye } from 'react-icons/pi'
import { Button } from 'antd'
export default function ProjectCard() {
  return (
    <div className='px-3 shadow-md'>
      <img src={imgs} className='rounded-xl' />
      <div className='p-4'>
        <p className='text-2xl text-blue-600 pb-10'>عنوان !!!</p>
        <div className='static px-4'>
            <div className="flex justify-center gap-4 py-4 text-gray-600 bottom-0">
                <Button block className='rounded-full' size='large' type='primary'>نمایش</Button>
            </div>
        </div>
        </div>
    </div>
  )
}
