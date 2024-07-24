import { Input,Button } from 'antd'
import { Formik } from 'formik'
import React from 'react'
import { FaUser ,FaPhone, FaHammer} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaChevronRight, FaChevronLeft} from "react-icons/fa6";

interface stepprops{
  prev:any;
  next:any;
}

export default function StepTwo(props:stepprops) {
  return (
    <div>
      <div className='flex justify-start gap-10'>
        <Button  icon={<FaChevronRight/>} onClick={props.prev} type="primary" danger/>
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

        }}
      >
          <form>
          <Input size='large' className='mb-5 p-2 rounded-full' prefix={<FaUser color={'gray'}/>} placeholder='نام و نام‌خانوادگی'/>
          <Input size='large' className='mb-5 p-2 rounded-full' prefix={<FaPhone color={'gray'}/>} placeholder='شماره موبایل'/>
          <Input size='large' className='mb-5 p-2 rounded-full' prefix={<MdEmail color={'gray'}/>} placeholder='ایمیل(اختیاری)'/>
          <Input size='large' className='mb-5 p-2 rounded-full' prefix={<FaHammer color={'gray'}/>} placeholder='نام پروژه'/>
          <Button size='large' type='primary' block className='my-5 rounded-full' iconPosition="end" icon={<FaChevronLeft/>}
          onClick={props.next}
          >ادامه</Button>
          </form>

      </Formik>
    </div>
  )
}
