import React from 'react'
import imgs from '../../assets/bgs.jpg'
import { PiChat, PiClock, PiEye } from 'react-icons/pi'
export default function HorizontalCard() {
  return (
    <div className=' py-5 shadow-sm my-5'>
        <div className="grid grid-cols-3 gap-4 ">
        <div className="col-span-2 ">
            
            <p className='text-md text-gray-400 mb-3'>دسته بندی</p>
            <p className='text-2xl text-blue-600'>عنوان پست!!!</p>
            <p className='text-lg text-gray-500 mt-3'>بخشی از متن پست!!!!!!!!</p>
            <div className='static'>
                <div className="flex justify-start gap-4 py-3 text-gray-500 bottom-0 mt-3">
                <div className='flex items-center'>
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
        <div className=''>
          <img src={imgs} className='w-full h-40 rounded-2xl'  />
        </div>
      </div>
    </div>
  )
}
