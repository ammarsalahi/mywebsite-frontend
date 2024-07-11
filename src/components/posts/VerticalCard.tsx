import React from 'react'
import imgs from '../../assets/bgs.jpg'
import { PiChat, PiClock, PiEye } from 'react-icons/pi'

export default function VerticalCard() {
  return (
    <div className='px-3 pb-3 shadow-md'>
      <img src={imgs} className='rounded-xl' />
      <div className='p-4'>
        <p className='text-md text-gray-400 my-3'>دسته بندی</p>
        <p className='text-2xl text-blue-600 pb-10'>عنوان پست!!!</p>
        <div className='static px-4'>
            <div className="flex justify-between gap-4 py-3 text-gray-600 bottom-0">
                <div className='flex text-md items-center'>
                <PiClock fontSize={18}/>
                <span>سه روز پیش</span>
                </div>
                <div className='flex items-center'>
                <PiEye fontSize={17}/>
                <span>12</span>
                </div>
               
            </div>
        </div>
        </div>
    </div>
  )
}
