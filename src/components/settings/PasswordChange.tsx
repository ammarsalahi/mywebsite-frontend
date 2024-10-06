import React from 'react'
import { FaCheck, FaLock } from 'react-icons/fa6'
export default function PasswordChange() {
  return (
    <div className='md:px-28'>
     <form>
        <div className='mb-4'>
            <div className="label">
                <div className="label-alt text-base">گذرواژه قبلی</div>
            </div>
            <label  className="input input-bordered flex items-center gap-2 rounded-2xl w-full">
                <FaLock className='text-gray-500'/>
                <input type="text" className="grow" />
            </label>
        </div> 
        <div className='mb-4'>
            <div className="label">
                <div className="label-alt text-base">گذرواژه جدید</div>
            </div>
            <label  className="input input-bordered flex items-center gap-2 rounded-2xl w-full">
                <FaLock className='text-gray-500'/>
                <input type="text" className="grow" />
            </label>
        </div>
        <div className='mb-4'>
            <div className="label">
                <div className="label-alt text-base">تکرار گذرواژه جدید</div>
            </div>
            <label  className="input input-bordered flex items-center gap-2 rounded-2xl w-full">
            <FaLock className='text-gray-500'/>
            <input type="text" className="grow" />
            </label>
        </div>      
        <div className="flex justify-end pt-5">
            <button className='btn-blue rounded-2xl '>
                <FaCheck/>  
                    تایید
            </button>

        </div> 
     </form>
    </div>
  )
}
