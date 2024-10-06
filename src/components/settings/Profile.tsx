import React from 'react'
import { FaCheck } from 'react-icons/fa'
import bgs from '../../assets/bgs.jpg'
import { BiCheckCircle } from 'react-icons/bi'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { PiCameraPlusFill } from 'react-icons/pi'
import { TbCameraPlus } from 'react-icons/tb'

export default function Profile() {
  return (
    <div className='md:px-24'>
         <form>
                  <div className="relative">
                    <div className="flex justify-end pb-7 md:pe-16 items-center gap-10">
                      <div className="flex gap-2 items-center mt-10">
                        <BsFillCheckCircleFill className='text-success text-xl'/>
                        <p className='text-success font-semibold'>کاربر تایید شده است</p>
                      </div>
                      <div className="relative">
                        <img src={bgs} alt="" className='rounded-[50%] w-[130px] h-[130px]'/>
                        <button type='button' className='absolute inset-0 mt-20 me-12 btn btn-ghost text-5xl text-blue-900 bg-transparent hover:bg-transparent'>
                          <PiCameraPlusFill/>
                        </button>
                      </div>
                    
                    </div>

                  </div>
                 <div className='grid md:grid-cols-2 gap-x-5 gap-y-3'>
                    <div>
                      <div className="label">
                        <div className="label-alt text-base">نام (اختیاری)</div>
                      </div>
                      <input type="text" className="input input-bordered rounded-2xl w-full"  />
                    </div>
                    <div>
                      <div className="label">
                        <div className="label-alt text-base">نام خانوادگی (اختیاری)</div>
                      </div>
                      <input type="text" className="input input-bordered rounded-2xl w-full" />
                    </div>
                    <div>
                      <div className="label">
                        <div className="label-alt text-base">نام کاربری</div>
                      </div>
                      <input type="text" className="input input-bordered rounded-2xl w-full" />
                    </div>
                    <div>
                    <div className="label">
                        <div className="label-alt text-base">ایمیل</div>
                      </div>
                      <input type="text" className="input input-bordered rounded-2xl w-full" />
                    </div>
                   
                  </div>
                  <div className="flex justify-end pt-10">
                  <button className='btn-blue rounded-2xl '>
                  <FaCheck/>  

                    تایید
                  </button>

                  </div>
                </form>
    </div>
  )
}
