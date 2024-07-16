import React, { useEffect, useState } from 'react'
import Navbar from '../global/Navbar'
import userimg from '../../assets/Remove-bg.ai_1717403474388.png'
import { FaUniversity } from "react-icons/fa";
import { Api } from '../api/Index';
import { ABOUTS_ID } from '../api/Endpoints';

export default function AboutMe() {
  const [about,setABout]=useState<any>([]);
  const getAbout=()=>{
    Api.get(ABOUTS_ID('ammar')).then((res)=>{
      setABout(res.data)
    })
  }
  useEffect(() => {
    getAbout()
  }, [])
  
  return (
    <div>
        <div className="about">
          <div className=" md:grid lg:grid grid-cols-3 h-full">
              <div className='items-center '>
                 <img src={about.user_img} width={300} alt="" />
                 <p className='text-5xl  pt-6'>{about.fullname}</p>
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
