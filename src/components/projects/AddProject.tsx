import React from 'react'
import { FaCheck, FaHammer, FaPlus } from 'react-icons/fa6'
import { PiCameraPlusFill } from 'react-icons/pi'

export default function AddEditProject() {
  return (
    <div className='px-32 py-16'>
        <div className="card border rounded-xl">
          <div className="card-body py-10 px-20">
            <form action="">
              <div className="flex justify-center">
                <div className="flex gap-2 items-center">
                <FaHammer className='text-3xl'/>
                <p className="text-2xl text-center font-bold mb-10">افزودن پروژه جدید</p>
                </div>
               
              </div>
            <div className="mb-5">
              {/* <div className="label label-alt mb-1">عنوان پست را وارد کنید</div> */}
              <input 
                type="text" className="input input-bordered w-full rounded-2xl" 
                placeholder='عنوان پست را وارد کنید...'
              />
            </div>
            <div className="mb-5">
              <div className="dashed-card-gray flex justify-center items-center py-16">
                <button className='btn btn-ghost  text-gray-700 hover:bg-blue-100'>
                  <PiCameraPlusFill className='text-xl'/>
                  افزودن تصویر
                </button>
              </div>
            </div>
            <div className="mb-5">
              {/* <div className="label label-alt mb-1">عنوان پست را وارد کنید</div> */}
              <textarea 
                className="textarea textarea-bordered w-full rounded-2xl" rows={2}
                placeholder='عنوان پست را وارد کنید...'
              />
            </div>
            <div className="mb-5">
              {/* <div className="label label-alt mb-1">عنوان پست را وارد کنید</div> */}
              <textarea 
                className="textarea textarea-bordered w-full rounded-2xl" rows={7}
                placeholder='عنوان پست را وارد کنید...'
              />
            </div>
            <div className="mb-8">
              <div className="md:flex gap-5">
                <label className="input input-bordered flex items-center rounded-2xl w-full gap-2 mb-6">
                  <input type="text" className="grow" placeholder="کلمات کلیدی را اضافه کنید" />
                  <button className='btn bg-green-300  btn-sm'>
                    <FaPlus/>
                    افزودن
                  </button>
                </label>
                <label className="input input-bordered flex items-center rounded-2xl w-full gap-2 mb-6">
                  <input type="text" className="grow" placeholder=" دسته‌بندی را انتخاب کنید" />
                 
                </label>
              </div>
            
            </div>
            <div className="md:flex justify-between items-center mb-5">
                <div className="form-control">
                  <label className="cursor-pointer label">
                      <input
                        type="checkbox"
                        className="checkbox  border-blue-500 [--chkbg:theme(colors.blue.500)] checked:border-blue-500" 
                      />
                      <span className="label-text mx-3 text-lg">این پست قابل مشاهد باشد</span>
                  </label>
                  
                </div>
                <button className='btn-blue md:w-80 rounded-2xl text-lg font-semibold'>
                  <FaCheck/>
                    ایجاد پست
                  </button>
            </div>
            </form>
          </div>
        </div>
    </div>
  )
}
