import React from 'react'
import Navbar from '../global/Navbar'
import userimg from '../../assets/Remove-bg.ai_1717403474388.png'
import { FaUniversity } from "react-icons/fa";

export default function AboutMe() {
  return (
    <div>
        <Navbar/>

        <div className="px-20 py-10">
          <div className="grid grid-cols-3 h-full">
              <div className='items-center'>
                 <img src={userimg} width={300} alt="" />
                 <p className='text-5xl  pt-6'>عمار صلاحی</p>
              </div>
              <div className="col-span-2 text-start lg:pt-10">
                 <p className='text-2xl text-gray-700'>توضیح کوتاه درباره من</p>


                <p className='text-2xl text-gray-700' >تخصص و مهارت</p>
                  <p className='text-lg'></p>
                <div className="flex items-center gap-2">
                  <FaUniversity fontSize={20}/>
                  <p className='text-xl text-gray-700'>دانشگاه</p>
                </div>
                <div className="flex gap-6">
                  <p className='text-lg'>نام دانشگاه: </p>
                  <p className='text-lg'>سایت دانشگاه: </p>
                </div>
                
                <p className='text-2xl text-gray-700'>راه‌های ارتباطی</p>

              </div>
          </div>
        </div>
    </div>
  )
}
