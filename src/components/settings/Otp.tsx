import React from 'react'
import bgs from '../../assets/qrcodeno.jpg'
import { IoMdRefresh } from "react-icons/io";

export default function Otp() {
  
  
  return (
    <div className='md:pt-16'>
      <div className="flex justify-center">
        <img src={bgs} className='w-[270px] h-[270px] rounded-2xl' />

      </div>
      <div className="flex items-center justify-center py-5">
          <button className='btn-blue  rounded-2xl gap-3 w-full md:w-[270px] text-lg '>
            <IoMdRefresh/>
            تازه سازی
          </button>
      </div>
    </div>
  )
}
