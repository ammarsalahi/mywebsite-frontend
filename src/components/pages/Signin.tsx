import React from 'react'
import { FaCheck, FaEye, FaLock, FaSun, FaUser } from 'react-icons/fa6'
import { PiSunFill } from 'react-icons/pi'

export default function Signin() {
  return (
    <div className="grid h-screen place-items-center">
  <div className='p-10'>
    <div className="card border rounded-2xl shadow-lg">
      <div className="card-body p-0">
        <div className="grid grid-cols-2">
          <div className='py-10 px-10'>
            <div className="flex justify-center items-center">
            <button className='btn btn-ghost btn-sm text-2xl'>
                <PiSunFill />
             </button>
            </div>
            <div className='py-10'>
              <p className="text-2xl font-semibold mb-14 text-center">ورود کاربر</p>
            <label className="input input-bordered flex items-center rounded-full gap-2 mb-6">
              <FaUser className='text-gray-500'/>
              <input type="text" className="grow" placeholder="نام کاربری" />
            </label>
            <label className="input input-bordered flex items-center rounded-full gap-2 mb-6">
              <FaLock className='text-gray-500'/>
              <input type="password" className="grow" placeholder="گذرواژه" />
              <FaEye className='text-gray-500 cursor-pointer text-xl'/>
            </label>
            <button className='btn-blue text-lg font-semibold'>
              تایید
              <FaCheck/>
            </button>
            </div>
          </div>
          <div className='p-40 bg-blue-500 border border-blue-500 rounded-e-2xl'>
          
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}
