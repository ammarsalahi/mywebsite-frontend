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
            setUserdata({
              name:values.name,
              email:values.email,
              phone:values.phone,
              project:values.project
            })
            props.next()
        }}
      >         
      {({handleSubmit,values,handleChange,errors,touched})=>(
          <form onSubmit={handleSubmit}>
          <Input 
              size='large' className='mb-5 p-2 rounded-full' 
              prefix={<FaUser color={'gray'}/>} placeholder='نام و نام‌خانوادگی'
              value={values.name}
              name="name"
              onChange={handleChange}

          />
          <Input 
              size='large' className='mb-5 p-2 rounded-full' 
              prefix={<FaPhone color={'gray'}/>} placeholder='شماره موبایل'
              value={values.phone}
              name="phone"
              onChange={handleChange}
          />
          <Input 
            size='large' className='mb-5 p-2 rounded-full' 
            prefix={<MdEmail color={'gray'}/>} placeholder='ایمیل(اختیاری)'
            value={values.email}
            name="email"
            onChange={handleChange}

          />
          <Input 
            size='large' className='mb-5 p-2 rounded-full' 
            prefix={<FaHammer color={'gray'}/>} placeholder='نام پروژه'
            value={values.project}
            name='project'
            onChange={handleChange}

          />
          <Button 
              size='large' type='primary' block className='my-5 rounded-full' 
              iconPosition="end" icon={<FaChevronLeft/>}
              onClick={()=>handleSubmit()}
          >ادامه</Button>
          </form>
      )}
      </Formik>
    </div>
  )
}
