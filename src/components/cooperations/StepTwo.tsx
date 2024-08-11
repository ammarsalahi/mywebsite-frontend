import { Input,Button } from 'antd'
import { Formik } from 'formik'
import React from 'react'
import { FaUser ,FaPhone, FaHammer} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaChevronRight, FaChevronLeft} from "react-icons/fa6";
import { useRecoilState } from 'recoil';
import { userSelector } from '../states/Selectors';

interface stepprops{
  prev:any;
  next:any;
}

export default function StepTwo(props:stepprops) {

  const [userdata,setUserdata]=useRecoilState(userSelector);


  return (
    <div>
      <div className='flex justify-start gap-10'>
        <button 
          className="btn btn-sm rounded-full btn-error text-white" 
          onClick={props.prev}>
        <FaChevronRight fontSize={20}/>
        </button>
        <p className='text-2xl pb-10 ps-5 text-center'>اطلاعات موردنظر را وارد کنید</p>
      </div>
      <Formik
        initialValues={{
          name:"",
          project:"",
          phone:"",
          email:""
        }}
        onSubmit={(values)=>{
            setUserdata({
              name:values.name,
              email:values.email,
              phone:values.phone,
              project:values.project
            })
            props.next()
        }}
        validate={(values)=>{
          let errors:any={}
          if(!values.name){
              errors.name="این فیلد نمی‌تواند خالی باشد!"
          }
          if(!values.phone){
            errors.phone="این فیلد نمی‌تواند خالی باشد!"
          }
          if(!values.project){
            errors.project="این فیلد نمی‌تواند خالی باشد!"
          }
          return errors
        }}
      >         
      {({handleSubmit,values,handleChange,errors,touched})=>(
          <form onSubmit={handleSubmit}>
            <label className="input input-bordered w-full flex items-center gap-5 rounded-full">
               <FaUser/>
                <input 
                    type="text" className="grow" 
                    placeholder='نام و نام‌خانوادگی' 
                    value={values.name}
                    name="name"
                    onChange={handleChange}
                  />
            </label>
             {errors?.name &&<div class="label">
                <span class="label-text-alt text-red-700">{errors.name}</span>
              </div>}
            <label className="input input-bordered mt-4 w-full flex items-center gap-5 rounded-full">
                 <FaPhone/>
                <input 
                    type="text" className="grow" 
                    placeholder='شماره موبایل'
                    value={values.phone}
                    name="phone"
                    onChange={handleChange}
                  />
            </label>
             {errors?.phone &&<div class="label">
                <span class="label-text-alt text-red-700">{errors.phone}</span>
              </div>}
            <label className="input input-bordered mt-4 w-full flex items-center gap-5 rounded-full">
                 <MdEmail/>
                <input 
                    type="text" className="grow" 
                    placeholder='ایمیل(اختیاری)'
                    value={values.email}
                    name="email"
                    onChange={handleChange}
                  />
            </label>
            <label className="input input-bordered mt-4 w-full flex items-center gap-5 rounded-full">
               <FaHammer/>
                <input 
                    type="text" className="grow" 
                    placeholder='نام پروژه'
                    value={values.project}
                    name="project"
                    onChange={handleChange}
                  />
            </label>
             {errors?.project &&<div class="label">
                <span class="label-text-alt text-red-700">{errors.project}</span>
              </div>}
            <button 
              className='btn w-full bg-blue-600 mt-7 text-white hover:bg-blue-600 border border-blue-600 rounded-full'
              onClick={()=>handleSubmit()}
            >
            ادامه
            <FaChevronLeft/>
          </button>
          
          </form>
      )}
      </Formik>
    </div>
  )
}
