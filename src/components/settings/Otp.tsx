import React from 'react'
import bgs from '../../assets/bgs.jpg'
import { IoMdRefresh } from "react-icons/io";

export default function Otp() {
  return (
    <div className='md:pt-20'>
      <div className="flex justify-center">
        <img src={bgs} className='w-[250px] h-[250px] rounded-xl' />

      </div>
      <div className="flex items-center justify-center py-5">
          <button className='btn-blue w-auto rounded-xl gap-3 '>
            <IoMdRefresh/>
            تازه سازی
          </button>
      </div>
    </div>
  )
}
