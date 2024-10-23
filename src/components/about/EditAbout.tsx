import { Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { BsEmojiSunglassesFill } from 'react-icons/bs';
import { FaCheck ,FaPlus} from 'react-icons/fa6';
import { IoClose } from "react-icons/io5";
import { ABOUTS_ID } from '../api/Endpoints';
import { useRecoilValue } from 'recoil';
import { tokenSelector } from '../states/Selectors';
import { Api } from '../api/Index';
import { Spin } from 'antd';


interface aboutProps{
    theme:string;
    id:number
}
export default function EditAbout(props:aboutProps) {

  const [about,setAbout]=useState<any>(null);
  const [isLoad,setisLoad]=useState(false);
  const token=useRecoilValue(tokenSelector) 

  const getAbout=async()=>{
    await Api.get(ABOUTS_ID(token.user)).then((res)=>{
      setAbout(res.data)
      setisLoad(true)
    })
  }
    useEffect(() => {
      getAbout()
    }, [])
    
  return (
    <div>
      {isLoad ?
        <div className={props.theme=="dark"?"card-dark":"card-light"}>
          <div className="card-body py-10 px-20">
            <Formik
             initialValues={{
                    description:about.description||"",
                    skill:about.skill||"",
                    uni_name:about.university_name||"",
                    uni_site:about.university_site||""
             }}
             onSubmit={()=>{

             }}
            >
            {({values,handleSubmit,handleChange,errors})=>(
                <form onSubmit={handleSubmit}>
                        <div className="flex justify-center">
                                <div className="flex gap-2">
                                <BsEmojiSunglassesFill className='text-3xl'/>
                                <p className="text-2xl text-center font-bold mb-10">ویرایش درباره‌ی من</p>
                                </div>
                            
                        </div>
                    <div>
                      <div className="mb-4">
                        <div className="label mb-1">
                            <span className="label-text-alt text-base">توضیحات را وارد کنید</span>
                        </div>
                        <textarea
                            className="textarea textarea-bordered w-full rounded-2xl" rows={3}
                            value={values.description} onChange={handleChange}
                        />
                        {errors.description  &&<div className="label">
                            <span className="label-text-alt text-red-600 text-base">{errors.description?.toString()}</span>
                        </div>}
                                                                
                        </div>
                        <div className="mb-4">
                        <div className="label mb-1">
                            <span className="label-text-alt text-base">مهارت را وارد کنید</span>
                        </div>
                        <input
                            className="input input-bordered w-full rounded-2xl"
                            value={values.skill} onChange={handleChange}
                        />
                        {errors.skill  &&<div className="label">
                            <span className="label-text-alt text-red-600 text-base">{errors.skill?.toString()}</span>
                        </div>}
                                                                
                      </div>
                      <div className="mb-4">
                        <div className="label mb-1">
                            <span className="label-text-alt text-base">نام دانشگاه را وارد کنید</span>
                        </div>
                        <input
                            className="input input-bordered w-full rounded-2xl"
                            value={values.uni_name} onChange={handleChange}
                        />
                        {errors.uni_name  &&<div className="label">
                            <span className="label-text-alt text-red-600 text-base">{errors.uni_name?.toString()}</span>
                        </div>}
                                                                
                      </div>
                      <div className="mb-4">
                        <div className="label mb-1">
                            <span className="label-text-alt text-base">سایت دانشگاه را وارد کنید</span>
                        </div>
                        <input
                            className="input input-bordered w-full rounded-2xl"
                            value={values.uni_site} onChange={handleChange}
                        />
                        {errors.uni_site  &&<div className="label">
                            <span className="label-text-alt text-red-600 text-base">{errors.uni_site?.toString()}</span>
                        </div>}
                                                                
                      </div>
                      <div className="mb-4">
                      <div className="label mb-1">
                            <span className="label-text-alt text-base"> حساب‌های اجتماعی را وارد کنید</span>
                        </div>
                        <div className="flex gap-0 w-full">
                          <input type="text" className="input input-bordered rounded-s-2xl w-52 rounded-e-none" />
                          <input type="text" className="input input-bordered rounded-none w-full" />
                          <button className="btn-blue w-40 rounded-s-none rounded-e-2xl  font-semibold">
                            <FaPlus/>
                            افزودن
                          </button>

                        </div>
                        <div className="pt-7 px-4 flex flex-wrap gap-4">
                          <div className='py-1 px-4 bg-blue-500 text-white rounded-full cursor-pointer flex items-center gap-2'>
                            <button className='btn btn-ghost btn-sm text-xl'>
                              <IoClose/>
                            </button>
                            <p>نام حساب</p>
                          </div>
                         
                        </div>
                      </div>


                        <button 
                            className='btn-blue md:w-80 rounded-2xl text-lg font-semibold mt-4'
                            type='submit'
                        >
                          <FaCheck/>
                           تایید
                        </button>
                    </div>
                   
                </form>
            )}
            </Formik>
          </div>
        </div>
      :
        <div className="h-screen w-screen grid place-items-center">
        <Spin size='large'/>
        </div>
      }
    </div>
  )
}
